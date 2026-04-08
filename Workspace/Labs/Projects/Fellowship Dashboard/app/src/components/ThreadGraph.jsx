/**
 * ThreadGraph — Fellowship of the Raf
 *
 * Thread nodes float in a force-directed layout.
 * Particles orbit each node; colour = workspace colour tinted by agent activity.
 * Linked threads attract each other; some particles drift along the edge.
 * Active thread glows. Drag to reposition. Link-mode: drag node→node to connect.
 */

import { useEffect, useRef, useCallback } from 'react';
import { AGENTS } from '../lib/agents';

const AGENT_KEYS = Object.keys(AGENTS);

function ha(alpha) {
  return Math.max(0, Math.min(255, Math.round(alpha * 255)))
    .toString(16).padStart(2, '0');
}
function d2(ax, ay, bx, by) {
  const dx = ax - bx, dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy) || 0.001;
}

// ── Physics constants ─────────────────────────────────────────────────────
const REPULSION    = 12000;
const SPRING_LEN   = 220;
const SPRING_K     = 0.018;
const CENTER_G     = 0.0008;
const DAMPING      = 0.82;
const NODE_RADIUS  = { min: 18, max: 38 };

// ── Particle class ────────────────────────────────────────────────────────
class Particle {
  constructor(node, wandering = false) {
    this.threadId = node.id;
    this.wanderTo  = null;   // target thread id when drifting along a link
    this.wandering = wandering;
    this.color = node.color;
    // occasionally tint with an agent color for visual richness
    if (Math.random() < 0.3) {
      this.color = AGENTS[AGENT_KEYS[Math.floor(Math.random() * AGENT_KEYS.length)]].color;
    }
    this.baseRadius = 0.7 + Math.random() * 1.8;
    this.orbitR = node.r * (1.4 + Math.random() * 2.2);
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitSpeed = (0.003 + Math.random() * 0.006) * (Math.random() < 0.5 ? 1 : -1);
    this.z = Math.random() * 2 - 1;
    this.vz = (Math.random() - 0.5) * 0.01;
    this.life = 0;
    this.dying = false;
    this.x = node.x;
    this.y = node.y;
  }
}

// ── Component ─────────────────────────────────────────────────────────────
export default function ThreadGraph({
  threads,
  activeThreadId,
  linkMode,
  onSelectThread,
  onLinkThreads,
  onMoveThread,
}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ nodes: [], particles: [], frame: null });
  const interRef  = useRef({ dragging: null, linking: null, mouseX: 0, mouseY: 0, moved: false });
  const propsRef  = useRef({});

  useEffect(() => {
    propsRef.current = { threads, activeThreadId, linkMode, onSelectThread, onLinkThreads, onMoveThread };
  });

  // ── Sync thread data → nodes (add/remove/update, preserve physics vels) ──
  useEffect(() => {
    const existing = new Map(stateRef.current.nodes.map((n) => [n.id, n]));
    const canvas = canvasRef.current;
    const cx = canvas ? canvas.offsetWidth / 2 : 400;
    const cy = canvas ? canvas.offsetHeight / 2 : 300;

    stateRef.current.nodes = threads.map((t) => {
      const old = existing.get(t.id);
      const age = (Date.now() - new Date(t.lastActive).getTime()) / (1000 * 60 * 60 * 24);
      const r   = NODE_RADIUS.max - Math.min(NODE_RADIUS.max - NODE_RADIUS.min, age * 2);
      if (old) return { ...old, title: t.title, color: t.color, workspace: t.workspace, r, linkedTo: t.linkedTo };
      return {
        id: t.id, title: t.title, color: t.color, workspace: t.workspace,
        x: t.position?.x ?? cx + (Math.random() - 0.5) * 300,
        y: t.position?.y ?? cy + (Math.random() - 0.5) * 300,
        vx: 0, vy: 0, r, linkedTo: t.linkedTo,
      };
    });

    // Seed particles for new nodes
    const particleThreadIds = new Set(stateRef.current.particles.map((p) => p.threadId));
    for (const node of stateRef.current.nodes) {
      if (!particleThreadIds.has(node.id)) {
        const count = 8 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
          const p = new Particle(node);
          p.life = 1;
          stateRef.current.particles.push(p);
        }
      }
    }
    // Remove particles for deleted threads
    const liveIds = new Set(stateRef.current.nodes.map((n) => n.id));
    stateRef.current.particles = stateRef.current.particles.filter(
      (p) => liveIds.has(p.threadId) || (p.wanderTo && liveIds.has(p.wanderTo))
    );
  }, [threads]);

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    const inter = interRef.current;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const animate = () => {
      const { activeThreadId } = propsRef.current;
      const { nodes, particles } = state;
      const w = canvas.width, h = canvas.height;
      const cx = w / 2,       cy = h / 2;

      // ── Physics ──────────────────────────────────────────────────────────
      if (nodes.length > 1) {
        for (const a of nodes) {
          if (inter.dragging?.nodeId === a.id) continue;
          // Center gravity
          a.vx += (cx - a.x) * CENTER_G;
          a.vy += (cy - a.y) * CENTER_G;
          // Repulsion
          for (const b of nodes) {
            if (a === b) continue;
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = d2(a.x, a.y, b.x, b.y);
            const f = Math.min(REPULSION / (dist * dist), 8);
            a.vx += (dx / dist) * f;
            a.vy += (dy / dist) * f;
          }
          // Spring along links
          for (const linkedId of a.linkedTo) {
            const b = nodes.find((n) => n.id === linkedId);
            if (!b) continue;
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = d2(a.x, a.y, b.x, b.y);
            const stretch = dist - SPRING_LEN;
            a.vx += (dx / dist) * stretch * SPRING_K;
            a.vy += (dy / dist) * stretch * SPRING_K;
          }
          a.vx *= DAMPING; a.vy *= DAMPING;
          a.x  += a.vx;    a.y  += a.vy;
          a.x   = Math.max(a.r + 10, Math.min(w - a.r - 10, a.x));
          a.y   = Math.max(a.r + 24, Math.min(h - a.r - 10, a.y));
        }
      }

      // ── Particle update ───────────────────────────────────────────────────
      const target = nodes.length > 0 ? nodes.length * 12 : 0;
      // Spawn wandering particles along links
      for (const node of nodes) {
        for (const linkedId of node.linkedTo) {
          if (Math.random() < 0.008) {
            const p = new Particle(node, true);
            p.wanderTo = linkedId;
            p.life = 0;
            particles.push(p);
          }
        }
      }
      // Kill excess
      const alive = particles.filter((p) => !p.dying && !p.wandering);
      if (alive.length > target + 10) alive.slice(0, 3).forEach((p) => { p.dying = true; });

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const node = nodes.find((n) => n.id === p.threadId);
        if (!node) { particles.splice(i, 1); continue; }

        // Lifecycle
        if (!p.dying) p.life = Math.min(1, p.life + 0.03);
        else { p.life -= 0.025; if (p.life <= 0) { particles.splice(i, 1); continue; } }

        if (p.wandering && p.wanderTo) {
          // Drift toward target node
          const target = nodes.find((n) => n.id === p.wanderTo);
          if (!target) { particles.splice(i, 1); continue; }
          const dx = target.x - p.x, dy = target.y - p.y;
          const dist = d2(p.x, p.y, target.x, target.y);
          p.x += (dx / dist) * 1.2;
          p.y += (dy / dist) * 1.2;
          if (dist < target.r + 5) { particles.splice(i, 1); continue; }
        } else {
          // Orbit node
          const isActive = node.id === activeThreadId;
          p.orbitAngle += p.orbitSpeed * (isActive ? 1.6 : 1);
          p.vz += (Math.random() - 0.5) * 0.004;
          p.z   = Math.max(-1, Math.min(1, p.z + p.vz));
          p.vz *= 0.96;
          p.x = node.x + Math.cos(p.orbitAngle) * p.orbitR;
          p.y = node.y + Math.sin(p.orbitAngle) * p.orbitR;
        }
      }

      // ── Render ────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, w, h);

      // Empty state hint
      if (nodes.length === 0) {
        ctx.font      = '11px Courier New';
        ctx.fillStyle = 'rgba(201,168,76,0.2)';
        ctx.textAlign = 'center';
        ctx.fillText('Start a conversation to create your first thread', cx, cy);
        state.frame = requestAnimationFrame(animate);
        return;
      }

      // Draw edges
      for (const a of nodes) {
        for (const linkedId of a.linkedTo) {
          const b = nodes.find((n) => n.id === linkedId);
          if (!b || b.id < a.id) continue; // draw once
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, a.color + '30');
          grad.addColorStop(1, b.color + '30');
          ctx.beginPath();
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 40;
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(mx, my, b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }

      // Draw particle connections (Obsidian-style)
      const CONN = 70;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pa = particles[i], pb = particles[j];
          const dist = d2(pa.x, pa.y, pb.x, pb.y);
          if (dist < CONN) {
            const alpha = (1 - dist / CONN) * 0.14 * pa.life * pb.life;
            const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
            grad.addColorStop(0, pa.color + ha(alpha));
            grad.addColorStop(1, pb.color + ha(alpha));
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = grad; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const zf = (p.z + 1) / 2;
        const r  = p.baseRadius * (0.4 + zf * 0.9);
        const al = (0.25 + zf * 0.75) * p.life;
        if (zf > 0.55 && r > 1.2) {
          ctx.beginPath(); ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + '08'; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + ha(al); ctx.fill();
      }

      // Draw nodes
      for (const node of nodes) {
        const isActive = node.id === activeThreadId;
        const isHovered = node.id === state.hoveredId;

        // Glow
        ctx.shadowBlur  = isActive ? 22 : (isHovered ? 12 : 6);
        ctx.shadowColor = node.color;

        // Circle fill
        ctx.beginPath(); ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle   = node.color + (isActive ? '28' : '14');
        ctx.fill();

        // Circle stroke
        ctx.strokeStyle = node.color + (isActive ? 'cc' : (isHovered ? '88' : '44'));
        ctx.lineWidth   = isActive ? 1.5 : 1;
        ctx.stroke();
        ctx.shadowBlur  = 0;

        // Active pulse ring
        if (isActive) {
          const pulse = 0.12 + Math.sin(Date.now() * 0.002) * 0.05;
          ctx.beginPath(); ctx.arc(node.x, node.y, node.r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = node.color + ha(pulse); ctx.lineWidth = 1; ctx.stroke();
        }

        // Label
        const label = node.title.length > 22 ? node.title.slice(0, 20) + '…' : node.title;
        ctx.font      = `${isActive ? 600 : 400} 10px Courier New`;
        ctx.fillStyle = node.color + (isActive ? 'ee' : '99');
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, node.y + node.r + 14);

        // Workspace tag
        if (node.workspace) {
          ctx.font      = '9px Courier New';
          ctx.fillStyle = node.color + '55';
          ctx.fillText(node.workspace, node.x, node.y + node.r + 25);
        }
      }

      // Draw in-progress link line
      if (inter.linking) {
        const fromNode = nodes.find((n) => n.id === inter.linking.fromId);
        if (fromNode) {
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(inter.mouseX, inter.mouseY);
          ctx.strokeStyle = fromNode.color + '88';
          ctx.lineWidth   = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      state.frame = requestAnimationFrame(animate);
    };

    state.frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(state.frame); ro.disconnect(); };
  }, []);

  // ── Hit test ──────────────────────────────────────────────────────────────
  const nodeAt = useCallback((x, y) => {
    for (const n of stateRef.current.nodes) {
      if (d2(x, y, n.x, n.y) <= n.r + 8) return n;
    }
    return null;
  }, []);

  // ── Mouse events ──────────────────────────────────────────────────────────
  const getXY = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onMouseDown = useCallback((e) => {
    const { x, y } = getXY(e);
    const node = nodeAt(x, y);
    interRef.current.moved = false;
    interRef.current.mouseX = x;
    interRef.current.mouseY = y;

    if (!node) return;
    if (propsRef.current.linkMode) {
      interRef.current.linking = { fromId: node.id };
    } else {
      interRef.current.dragging = { nodeId: node.id, offsetX: x - node.x, offsetY: y - node.y };
    }
  }, [nodeAt]);

  const onMouseMove = useCallback((e) => {
    const { x, y } = getXY(e);
    interRef.current.mouseX = x;
    interRef.current.mouseY = y;

    const node = nodeAt(x, y);
    stateRef.current.hoveredId = node?.id ?? null;

    if (interRef.current.dragging) {
      interRef.current.moved = true;
      const { nodeId, offsetX, offsetY } = interRef.current.dragging;
      const n = stateRef.current.nodes.find((nd) => nd.id === nodeId);
      if (n) { n.x = x - offsetX; n.y = y - offsetY; n.vx = 0; n.vy = 0; }
    }
  }, [nodeAt]);

  const onMouseUp = useCallback((e) => {
    const { x, y } = getXY(e);
    const inter = interRef.current;

    // Finish link
    if (inter.linking) {
      const target = nodeAt(x, y);
      if (target && target.id !== inter.linking.fromId) {
        propsRef.current.onLinkThreads(inter.linking.fromId, target.id);
      }
      inter.linking = null;
      return;
    }

    // Finish drag — save position
    if (inter.dragging) {
      if (inter.moved) {
        const n = stateRef.current.nodes.find((nd) => nd.id === inter.dragging.nodeId);
        if (n) propsRef.current.onMoveThread(n.id, { x: n.x, y: n.y });
      } else {
        // Was a click — select thread
        propsRef.current.onSelectThread(inter.dragging.nodeId);
      }
      inter.dragging = null;
    }
  }, [nodeAt]);

  const onMouseLeave = useCallback(() => {
    interRef.current.linking = null;
    interRef.current.dragging = null;
    stateRef.current.hoveredId = null;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%', height: '100%', display: 'block',
        cursor: propsRef.current?.linkMode ? 'crosshair' : 'default',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    />
  );
}
