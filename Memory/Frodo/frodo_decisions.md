# KEY DECISIONS LOG — SEEDS
## Frodo Episodic Memory — Decision History
### /memory/frodo/seeds/decisions_log.md
### Last updated: 2026-03-16 | Written by: Gandalf
### Note: Pre-fellowship decisions that shaped the current configuration.
### Future decisions logged to /memory/frodo/projects/ after each project close.

---

## ARCHITECTURAL DECISIONS — AVENOIRTECH

**Replace OpenAI with Anthropic Claude**
Decision: Switched AI engine from OpenAI to Claude API (claude-sonnet-4-6).
Reason: Consistency with the fellowship system. Better instruction-following for structured output in the lead scoring context. Architectural coherence matters — running two AI providers adds complexity without sufficient benefit.
Status: Confirmed. Locked in.

**Replace OpenPhone + Bland.ai with Vapi.ai**
Decision: Consolidated voice layer onto Vapi.ai as unified platform.
Reason: Simpler architecture. Single platform for multilingual voice agent (English, Brazilian Portuguese, Spanish). Reduced integration surface.
Status: Confirmed. In build.

**Adopt Airtable as core operations database**
Decision: Airtable as the primary operations layer rather than a custom database.
Reason: Reversibility over optimisation. Can migrate later when the system is proven. Rafael can operate it without engineering dependency. The Airtable Leads table includes granular AI sub-score fields specifically for audit trail — a deliberate design choice, not default.
Status: Confirmed. In use.

**Week 1 scope — core loop only**
Decision: Deliberately minimal first build. Vapi → Make.com → Claude → Airtable → Twilio. Everything else deferred.
Reason: Prove the loop before adding complexity. Twilio sequences, Calendly, dashboards, and nurture flows deferred to Week 2. This is the reversibility principle applied to build sequencing.
Status: Active constraint.

---

## ARCHITECTURAL DECISIONS — THE FELLOWSHIP

**Centralised orchestration (Gandalf) over peer-to-peer**
Decision: Single orchestrator. Agents do not communicate directly with each other.
Reason: Peer-to-peer agent networks sound powerful and create debugging hell. State management becomes intractable. Every handoff is a failure point — minimise them or make them explicit.
Status: Core architecture. Not revisable without significant rebuild.

**Three-layer context architecture (V2)**
Decision: Identity files / workspace context files / skills — separate layers, injected separately.
Reason: V1 agent files tried to be everything at once — identity, domain knowledge, tool specs, relationship maps. Expensive and stale. V2 separates concerns so each layer can be updated independently.
Status: Active migration in progress.

**File system as agent brain**
Decision: The fellowship lives in a file system readable by Claude Code, not in a proprietary platform.
Reason: Portability, transparency, version control via git. Files are durable, inspectable, and don't require a vector DB to get started.
Status: Core architecture.

---

## STRATEGIC DECISIONS — INSPIRACY

**Three productised offers at £100-£150**
Decision: Admin Autopsy, AI Starter Pack, Sharp Eye Retainer — all in the £100-£150 comfort zone.
Reason: 14-day monetisation sprint targeting warm network. Price point reduces friction for first engagement. Proof of concept before scaling.
Status: Active sprint.

**Async-friendly delivery formats**
Decision: Calls, written documents, WhatsApp voice notes. No requirement for in-person.
Reason: International network across UK/Portugal/Brazil. Async delivery allows Rafael to work across time zones without scheduling overhead.
Status: Confirmed positioning.

**Inspiracy as parent brand, AvenoirTech underneath**
Decision: Inspiracy is the consulting and strategy brand. AvenoirTech is the AI operations arm underneath it.
Reason: Inspiracy has the broader positioning. AvenoirTech is a specific product within the strategic advisory frame. Clients who come for Inspiracy consulting may become AvenoirTech clients.
Status: Confirmed structure.

---

## DECISIONS ABOUT HOW RAFAEL WORKS

**Fellowship absorbs mechanical execution layer**
Decision: The fellowship's job is to absorb everything that requires sustained mechanical effort so Rafael's attention operates at the architectural and strategic level.
Reason: Rafael has consistent evidence that projects structured for efficiency without accounting for his working style underperform. Work that doesn't engage him at the level of ideas produces diminishing returns. The fellowship is not just a productivity tool — it is a structural fix for a known personal constraint.
Status: Foundational design principle.

**Build with no-code/low-code, earn complexity**
Decision: Start with no-code/low-code platforms. Add complexity only when the simpler version has been proven.
Reason: Reversibility over optimisation. Every layer of complexity added before it's needed is debt. Rafael is not a developer — the stack must be operable at his level of technical access.
Status: Active constraint applied to all builds.

---

*Key Decisions Log — Frodo Seeds*
*Version 1.0 — 2026-03-16*
*Future decisions append to /memory/frodo/projects/ after each project close*
