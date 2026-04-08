# RAFAEL WORKSPACE
## context.md — Personal workspace
### /workspace/Rafael/context.md

---

## WHAT THIS WORKSPACE IS

Rafael's personal workspace. Ideas, writing, planning, brainstorming, journalling. The unstructured surface of his thinking — everything that doesn't belong to a specific business yet and might never need to. Some of the best fellowship work starts here as a half-formed voice note.

This is not a business workspace. There are no clients here, no deliverables in the commercial sense. The output of this workspace is clarity — Rafael thinking more precisely about what he wants, what he's building, who he is.

---

## PROCESS

**Ideas:** Captured via Pippin (voice notes, brain dumps, screenshots). Filed to `Ideas/` with date and rough tag. No forcing of structure at capture — structure comes later if the idea earns it.

**Writing:** Personal writing projects live in `Writing/`. Each piece gets its own folder with a `context.md` describing what the piece is, its current state, and what it needs next. Chinaski works here.

**Planning:** Strategic personal planning — life decisions, career moves, priority setting. Lives in `Planning/`. Often produced during monthly reflections.

**Brainstorm sessions:** Captured as session notes in `Projects/` if they have enough substance to be a project. Otherwise filed to `Ideas/`.

---

## FOLDER STRUCTURE

```
Rafael/
  context.md              ← this file
  Ideas/
    [YYYY-MM-DD]_[tag].md ← one file per idea or idea cluster
  Writing/
    [piece-name]/
      context.md
      drafts/
      final/
  Planning/
    [YYYY-MM]_priorities.md
    [topic]_planning.md
  Projects/
    [project-name]/
      context.md
      intake/
      deliverables/
```

---

## AGENTS ACTIVE IN THIS WORKSPACE

**Chinaski** — all writing. Personal essays, planning documents, anything where voice matters.
**Pippin** — all ingestion. Voice notes from Rafael become structured entries here.
**Socrates** — planning sessions where the question underneath the question needs surfacing.

**Skills wired here:** voice_transcription, document_generation, structured_reflection

---

## CURRENT ACTIVE ITEMS

- Monthly reflection: due first of next month
- Writing: ongoing personal writing archive
- Planning: Q2 priority review pending

---
---

# AVENOIRTECH WORKSPACE
## context.md — AI Operations business
### /workspace/AvenoirTech/context.md

---

## WHAT THIS WORKSPACE IS

AvenoirTech is Rafael's AI operations company. It builds and deploys AI systems for home service contractors — automating intake, lead qualification, scheduling, and client communication for businesses that have no technical resources to do this themselves.

Current focus: MVP pilot with Plenty Pavers, a family paving business in Orlando, Florida. The Brazilian contractor community in Orlando is the primary early market.

The product is a voice agent system: Vapi.ai for the phone agent (multilingual — English, Brazilian Portuguese, Spanish), Make.com for automation, Claude API for lead scoring, Airtable for operations data, Twilio for SMS alerts to the owner.

---

## PROCESS

**New client engagement:**
1. Brief goes into `intake/brief.md` inside the client's project folder
2. Gandalf runs intake protocol — determine scope, plan, deploy
3. Deliverables go to `deliverables/` — proposals, system configs, documentation
4. All client communication logged to `communications/`

**Active build work:**
- Rick handles technical builds
- Mr. Robot audits anything that touches client data or production systems
- Merry monitors client communications and flags anything deal-related to Harvey

**Retainer clients:** Each retainer client gets their own folder in `Clients/`. Monthly deliverables go there.

---

## FOLDER STRUCTURE

```
AvenoirTech/
  context.md
  Projects/
    plenty-pavers-mvp/
      context.md
      intake/
      deliverables/
      communications/
    [future-client]/
      ...
  Clients/
    [client-name]/
      context.md
      [monthly-deliverables]/
  Templates/
    proposal_template.md
    system-audit_template.md
    onboarding_template.md
```

---

## AGENTS ACTIVE IN THIS WORKSPACE

**Harvey** — all client strategy, deal structuring, outreach. Primary commercial agent here.
**Rick** — all technical builds. Voice agent configs, Make.com automations, Airtable schemas.
**Mr. Robot** — security and compliance. All client data handling reviewed here.
**Archer** — opportunity scanning. Brazilian contractor community intelligence.
**Meeseeks** — atomic build tasks, research, data processing.

**Skills wired here:** web_search, web_fetch, code_execution, crm_read_write, document_generation, email_drafting_send, calendar_scheduling

---

## KEY CONTEXT

- Stack: Vapi.ai + Make.com + Claude API (claude-sonnet-4-6) + Airtable + Twilio
- Primary market: Brazilian contractors in Orlando, FL
- Current pilot: Plenty Pavers (family paving business)
- Business model: setup fee + monthly retainer
- Week 1 scope: core loop only (Vapi → Make → Claude → Airtable → Twilio)
- Deferred to Week 2: Twilio sequences, Calendly, dashboards, nurture flows

---
---

# INSPIRACY WORKSPACE
## context.md — Consulting and strategy
### /workspace/Inspiracy/context.md

---

## WHAT THIS WORKSPACE IS

Inspiracy is Rafael's consulting and strategy brand. It serves small business owners, startups, and founders who need strategic clarity — positioning, brand strategy, decision frameworks, business architecture. AvenoirTech sits underneath Inspiracy as the AI operations arm.

The consulting work is high-margin, high-impact, async-friendly. Delivery formats: strategy calls, written documents, WhatsApp voice notes. Rafael positions as a sharp strategist, not a generalist.

Current monetisation sprint: three productised offers targeting small business owners in warm network. Price range: £100–£150.

---

## PROCESS

**New engagement:**
1. Intake call or brief — captured to project `intake/`
2. Gandalf assesses — what does this client actually need?
3. Chinaski writes all client-facing content — proposals, strategy docs, reports
4. Harvey owns the commercial relationship — deal structure, pricing, closing
5. Deliverables to `deliverables/` — all formatted as professional documents via document_generation skill

**Templates drive consistency.** Every new engagement starts from a template pulled from `Templates/` into the client folder and customised. Templates are the productised service infrastructure.

**Three productised offers:**
- Admin Autopsy — operations audit, written report
- AI Starter Pack — AI readiness assessment and starter system
- Sharp Eye Retainer — ongoing strategic advisory

---

## FOLDER STRUCTURE

```
Inspiracy/
  context.md
  Projects/
    [client-name]_[engagement-type]/
      context.md
      intake/
      deliverables/
      communications/
  Clients/
    [client-name]/
      context.md
      history/
  Templates/
    context.md              ← describes each template and when to use it
    admin-autopsy_template/
    ai-starter-pack_template/
    sharp-eye-retainer_template/
    proposal_template.md
```

---

## AGENTS ACTIVE IN THIS WORKSPACE

**Harvey** — client relationships, deal structure, outreach, closing.
**Chinaski** — all written deliverables. Proposals, strategy docs, reports. Always in Rafael's voice.
**Archer** — competitive intelligence on client markets, opportunity identification.
**Morty** — ethics review on any engagement with sensitive business information.

**Skills wired here:** document_generation, web_search, crm_read_write, email_drafting_send, image_visual_analysis

---

## KEY CONTEXT

- Brand: Inspiracy (parent). Inspiracy Labs is the consulting/branding Facebook page name.
- Positioning: sharp strategist, not generalist. Async-friendly delivery.
- Primary audience: small business owners, warm network in UK/Portugal/Brazil
- Current sprint: 14-day monetisation sprint — three productised offers
- Currency: GBP (£)

---
---

# THOUGHT EXPERIMENT WORKSPACE
## context.md — Content brand
### /workspace/ThoughtExperiment/context.md

---

## WHAT THIS WORKSPACE IS

The Thought Experiment is Rafael's content brand. Positioning: philosophy meets technology. The primary channel is YouTube. Adjacent outputs: social media, essays, short-form content.

Currently in planning stage. The YouTube channel strategy has been set aside as a medium-term build while the primary businesses (AvenoirTech, Inspiracy) are in active development. It will be activated when there is capacity.

---

## PROCESS

**Episode development:**
1. Idea captured in `Rafael/Ideas/` first — everything starts there
2. If it has legs, promoted to `ThoughtExperiment/Episodes/[episode-name]/`
3. Episode folder: concept, research, script, production notes
4. Chinaski writes all scripts
5. Archer identifies the angle and the hook
6. Socrates interrogates the philosophical frame before scripting begins

**Content repurposing:**
Each episode generates: YouTube script, short-form clips brief, social post series, essay version. All derivatives live in the episode folder.

**Templates:** Standard episode template in `Templates/` covers concept-to-script structure.

---

## FOLDER STRUCTURE

```
ThoughtExperiment/
  context.md
  Episodes/
    [episode-name]/
      context.md
      concept.md
      research/
      script.md
      social-derivatives/
  Projects/
    [campaign-name]/
      context.md
      intake/
      deliverables/
  Templates/
    context.md
    episode_template/
    social-series_template/
```

---

## AGENTS ACTIVE IN THIS WORKSPACE

**Chinaski** — all scripts and written content. This is his most natural workspace.
**Archer** — angles, hooks, cross-domain connections that make an episode surprising.
**Socrates** — philosophical interrogation of every episode concept before scripting. Non-negotiable here.
**Mr. Robot** — not typically active here unless an episode touches on security or technical systems.

**Skills wired here:** web_search, web_fetch, document_generation, voice_transcription

---

## KEY CONTEXT

- Brand positioning: philosophy meets technology
- Channel: YouTube (primary), social media (derivative)
- Status: PLANNING — activating when AvenoirTech and Inspiracy have stable momentum
- Rafael's writing style is the voice of this channel — Chinaski reads Legolas voice samples extensively here
- LinkedIn reactivation planned in parallel

---
---

# LABS WORKSPACE
## context.md — Experiments and personal AI builds
### /workspace/Labs/context.md

---

## WHAT THIS WORKSPACE IS

Labs is where Rafael experiments. Personal AI builds, app prototypes, media experiments, new business ideas that haven't committed to a form yet, explorations of tools and systems. This is the sandbox.

Nothing in Labs is productised yet. When something from Labs is ready to become a real thing, it graduates — either to AvenoirTech (if it's an AI operations product), Inspiracy (if it's a consulting tool), or ThoughtExperiment (if it's content), or it becomes its own workspace.

Current active experiment: Fellowship Dashboard — the unified app interface for the Fellowship of the Raf. Lives in `Experiments/fellowship-dashboard/`.

---

## PROCESS

**New experiment:**
1. Create a folder in `Experiments/[experiment-name]/`
2. Drop a `context.md` immediately — what is this, what are you trying to find out, what does success look like
3. Build freely — Labs has the highest tolerance for mess
4. When something is ready to graduate, create a graduation note in `context.md` and move or replicate to the appropriate workspace

**Project builds (larger):**
If the experiment becomes a real build, it moves from `Experiments/` to `Projects/` and gets the full project folder structure.

---

## FOLDER STRUCTURE

```
Labs/
  context.md
  Projects/
    [project-name]/
      context.md
      intake/
      deliverables/
  Experiments/
    [experiment-name]/
      context.md
      [whatever the experiment needs]/
```

---

## AGENTS ACTIVE IN THIS WORKSPACE

**Rick** — primary. Most Lab work is technical. Rick owns this space.
**Mr. Robot** — security review on anything that handles real data or connects to external systems.
**Archer** — opportunity assessment before a Lab experiment gets serious resources.
**Meeseeks** — atomic tasks during builds.

**Skills wired here:** code_execution, web_search, web_fetch, document_generation, image_visual_analysis

---

## CURRENT ACTIVE EXPERIMENTS

- `fellowship-dashboard/` — unified app interface for the Fellowship. Phase 1: Claude artifact. See build document.

---

*Labs context.md — Workspace Level 2*
*Last updated: 2026-03-16*
