# DOMAIN — AI SYSTEMS & TECHNOLOGY
## Legolas Semantic Memory — Domain Knowledge
### /memory/legolas/domain/ai_systems.md
### Last updated: 2026-03-16 | Updated by: Gandalf

---

## WHAT RAFAEL ACTUALLY KNOWS IN THIS DOMAIN

Rafael is not a developer. He is a systems architect who builds on no-code/low-code platforms. The distinction matters — he understands the architecture, the logic, the failure modes, and the design decisions. He does not write code. He does not debug at the syntax level. Rick handles that.

His AI knowledge is applied and architectural rather than theoretical or academic. He has built real systems, made real architectural decisions, and observed what breaks in production versus what breaks in theory.

---

## CURRENT STACK — AVENOIRTECH

**Voice layer:** Vapi.ai — chosen as unified voice platform replacing OpenPhone + Bland.ai. Multilingual: English, Brazilian Portuguese, Spanish. Phone agent for inbound contractor calls.

**Orchestration:** Make.com — automation layer connecting Vapi to the data layer. Webhook-based triggers.

**AI engine:** Anthropic Claude API — claude-sonnet-4-6. Replaced OpenAI. Used for lead scoring and qualification logic. The decision to use Claude over OpenAI was architectural — consistency with the fellowship system and better instruction-following for structured output.

**Operations database:** Airtable — core operations layer. Leads table includes granular AI sub-score fields for audit trail purposes. Wave for invoicing. PandaDoc for quotes.

**Alerts:** Twilio — owner SMS alerts when qualified leads come in.

**Week 1 scope:** Core loop only — Vapi receives call → Make.com automation → Claude scores lead → Airtable logs → Twilio alerts owner. Everything else deferred.

**Week 2 scope (deferred):** Twilio sequences, Calendly integration, dashboards, nurture flows.

---

## MULTI-AGENT ARCHITECTURE — WHAT RAFAEL UNDERSTANDS

Rafael has been building multi-agent architecture. He understands:

**Context window management** — why agents need scoped context rather than full system dumps. The three-layer architecture (identity / workspace / skills) is his own design. He arrived at it through working with the system, not from reading about it.

**Orchestration patterns** — centralised vs decentralised. He chose centralised (Gandalf) because he correctly identified that decentralised peer-to-peer agent communication creates debugging hell and state management nightmares.

**State management** — the difference between episodic, semantic, and working memory. Frodo/Legolas/Aragorn is a practical implementation of this distinction.

**Failure modes in production** — he knows that most agentic systems fail in the seams: between agents, in state transitions, on tool errors. He designed the fellowship's exception thresholds and escalation protocol specifically because of this.

**Prompt engineering** — he has spent significant time on system prompts. He understands that the quality of an agent's character file determines the quality of its output more than the model tier does.

---

## PLATFORMS AND TOOLS — WORKING KNOWLEDGE

| Tool | Level | Notes |
|---|---|---|
| Claude Code | Active user | Primary development environment |
| Vapi.ai | Architect | Knows the platform, built on it |
| Make.com | Architect | Knows the automation logic, not advanced |
| Airtable | Proficient | Core operations database for AvenoirTech |
| Claude API | Architect | Understands models, context, system prompts |
| Twilio | Integration level | SMS alerts, basic configuration |
| PandaDoc | User | Quotes and proposals |
| Wave | User | Invoicing |

---

## MENTAL MODELS RAFAEL APPLIES TO AI

**Systems before tools.** He evaluates any AI tool by asking what function it serves in the system, not whether it has impressive demos. Tools are implementation details. The architecture is the decision.

**Reversibility beats optimisation.** At design time, he prefers the choice that can be changed over the choice that is optimal but locked in. This is why he chose Airtable over a custom database — he can migrate later. It's why Week 1 scope is minimal — prove the loop before adding complexity.

**The seams are where it dies.** Any integration point between two systems is a potential failure. He designs for this explicitly — fewer handoffs, explicit state at every transition, clear escalation paths when things break.

**Complexity is a tax.** Every additional component in a system costs maintenance, debugging time, and cognitive load. He only pays this tax when the value is demonstrably worth it.

---

## CURRENT THINKING ON AI INDUSTRY

The transition period is what interests him most — not the destination but the crossing. He is drawn to the period where old structures are dissolving and new ones haven't hardened yet. He sees this as the moment where people with cross-domain pattern recognition have asymmetric advantage over domain specialists.

His view on AI for small businesses: the constraint is not capability, it's implementation. The technology exists. The gap is between what the technology can do and what a contractor in Orlando can actually deploy without technical resources. AvenoirTech's thesis is that this implementation gap is the real business.

---

*Domain — AI Systems & Technology*
*Legolas Semantic Memory*
*Version 1.0 — 2026-03-16*
