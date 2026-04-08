/**
 * SwarmCanvas — Fellowship of the Raf
 *
 * Particle swarm visualisation. Each agent has a unique colour.
 * Particle count and speed scale with active agent count and activity level.
 * Particles orbit the centre. Connections draw between nearby particles.
 * Z-axis creates a 3D depth field (larger + brighter = closer).
 */

import { useEffect, useRef } from 'react';
import { AGENTS } from '../lib/agents';

const AGENT_KEYS = Object.keys(AGENTS);

function hexAlpha(alpha) {
  return Math.max(0, Math.min(255, Math.round(alpha * 255)))
    .toString(16)
    .padStart(2, '0');
}

class Particle {
  constructor(canvas, agentKey) {
    this.agentKey = agentKey;
    this.color = AGENTS[agentKey].color;
    this.life = 0;
    this.dying = false;
    this._spawn(canvas);
  }

  _spawn(canvas) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const r = 40 + Math.random() * 150;

    this.x = cx + Math.cos(angle) * r;
    this.y = cy + Math.sin(angle) * r;
    this.z = Math.random() * 2 - 1; // -1 (back) to 1 (front)

    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.vz = (Math.random() - 0.5) * 0.01;

    this.baseRadius = 0.7 + Math.random() * 2.0;
    // Target orbit radius varies per particle for natural spread
    this.targetR = 50 + Math.random() * 110;
  }
}

export default function SwarmCanvas({ activeAgents, activityLevel }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], frame: null });
  const propsRef = useRef({ activeAgents: new Set(), activityLevel: 0 });

  // Keep propsRef in sync without re-running the animation effect
  useEffect(() => {
    propsRef.current = {
      activeAgents: new Set(activeAgents),
      activityLevel,
    };
  }, [activeAgents, activityLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Seed with resting particles across all agents
    state.particles = AGENT_KEYS.flatMap((key) =>
      Array.from({ length: 3 }, () => {
        const p = new Particle(canvas, key);
        p.life = 1;
        return p;
      })
    );

    const animate = () => {
      const { activeAgents, activityLevel } = propsRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      const activeCount = activeAgents.size;
      // Scale target particle count with active agents + activity
      const target = Math.min(
        280,
        55 + activeCount * 20 + Math.floor(activityLevel * 90)
      );

      // Spawn one particle per frame if below target
      const alive = state.particles.filter((p) => !p.dying);
      if (alive.length < target) {
        const keys =
          activeCount > 0 ? [...activeAgents] : AGENT_KEYS;
        const key = keys[Math.floor(Math.random() * keys.length)];
        state.particles.push(new Particle(canvas, key));
      }

      // Mark excess for death (oldest first)
      if (alive.length > target + 15) {
        const excess = alive.slice(0, alive.length - target);
        excess.slice(0, 4).forEach((p) => {
          p.dying = true;
        });
      }

      ctx.clearRect(0, 0, w, h);

      // Update all particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];

        // Lifecycle fade
        if (!p.dying) {
          p.life = Math.min(1, p.life + 0.03);
        } else {
          p.life -= 0.025;
          if (p.life <= 0) {
            state.particles.splice(i, 1);
            continue;
          }
        }

        // Vector toward centre
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const rx = dx / dist; // radial unit vector
        const ry = dy / dist;
        // Tangential (perpendicular, counter-clockwise)
        const tx = -ry;
        const ty = rx;

        // Radial spring: pull/push toward target orbit radius
        const overshoot = dist - p.targetR;
        p.vx += rx * (-overshoot * 0.0007);
        p.vy += ry * (-overshoot * 0.0007);

        // Orbital spin — faster when agents are active
        const spinSpeed = activeCount > 1 ? 0.004 : 0.0015;
        p.vx += tx * spinSpeed;
        p.vy += ty * spinSpeed;

        // Brownian motion
        p.vx += (Math.random() - 0.5) * 0.045;
        p.vy += (Math.random() - 0.5) * 0.045;

        // Z axis oscillation (depth)
        p.vz += (Math.random() - 0.5) * 0.003;
        p.z = Math.max(-1, Math.min(1, p.z + p.vz));
        p.vz *= 0.96;

        // Velocity damping
        p.vx *= 0.974;
        p.vy *= 0.974;

        // Boost speed when active
        const boost = activeCount > 1 ? 1.35 + activityLevel * 0.4 : 1;
        p.x += p.vx * boost;
        p.y += p.vy * boost;

        // Soft boundary wrap
        const margin = 80;
        if (p.x < -margin) p.x = w + margin;
        if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        if (p.y > h + margin) p.y = -margin;
      }

      // Draw connections (Obsidian-style)
      const CONN_DIST = 88;
      for (let i = 0; i < state.particles.length; i++) {
        for (let j = i + 1; j < state.particles.length; j++) {
          const pa = state.particles[i];
          const pb = state.particles[j];
          const ddx = pa.x - pb.x;
          const ddy = pa.y - pb.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONN_DIST) {
            const alpha =
              (1 - d / CONN_DIST) * 0.2 * pa.life * pb.life;
            const grad = ctx.createLinearGradient(
              pa.x, pa.y, pb.x, pb.y
            );
            grad.addColorStop(0, pa.color + hexAlpha(alpha));
            grad.addColorStop(1, pb.color + hexAlpha(alpha));
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of state.particles) {
        const zFactor = (p.z + 1) / 2; // 0 = back, 1 = front
        const r = p.baseRadius * (0.4 + zFactor * 0.9);
        const alpha = (0.25 + zFactor * 0.75) * p.life;

        // Glow halo for front-facing particles
        if (zFactor > 0.55 && r > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color + '09';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + hexAlpha(alpha);
        ctx.fill();
      }

      // Subtle pulse ring at centre when more than one agent is active
      if (activeCount > 1) {
        const pulse =
          0.08 + Math.sin(Date.now() * 0.0018) * 0.04;
        ctx.beginPath();
        ctx.arc(cx, cy, 32, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 168, 76, ${pulse})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Second outer ring for depth
        const pulse2 =
          0.04 + Math.sin(Date.now() * 0.0012 + 1) * 0.02;
        ctx.beginPath();
        ctx.arc(cx, cy, 58, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 168, 76, ${pulse2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      state.frame = requestAnimationFrame(animate);
    };

    state.frame = requestAnimationFrame(animate);

    return () => {
      if (state.frame) cancelAnimationFrame(state.frame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
