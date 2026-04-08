# [[GANDALF_ROOT]].MD

## The Map — [[Fellowship of the Raf .MK1/Core/Fellowship|Fellowship]] of the Raf

## Read this file first. Every session. No exceptions.

---

## WHAT THIS IS

This is the floor plan. You are entering [[Rafael]] Lodos' AI operating system — the [[Fellowship of the Raf .MK1/Core/Fellowship|Fellowship]] of the Raf. This file tells you what exists, where it lives, how it's named, and where things go. Read it completely before touching anything.

---

## WHAT THIS PROJECT IS

The [[Fellowship of the Raf .MK1/Core/Fellowship|Fellowship]] of the Raf is a multi-agent AI operating system for [[Rafael]] Lodos. It runs across five business and personal workspaces. It uses a three-layer [[The Fellowship of the Raf .MK2/Workspace/Labs/context|context]] architecture:

- **Layer 1 — The Map:** This file. Root level. Read first.
- **Layer 2 — Workspace [[The Fellowship of the Raf .MK2/Workspace/Labs/context|Context]]:** Each workspace has a `context.md` describing what it is, how it works, and what lives inside it.
- **Layer 3 — Skills:** Tools injected per task. Never loaded by default. Wired to workspaces where needed.

Agent identities live in `/fellowship/`. They are character files — who each agent is, their mandate, their constraints. They do not contain workspace knowledge. Workspace knowledge lives in the workspace `context.md` files.

---

## TOP-LEVEL FOLDER STRUCTURE

```
The Fellowship of the Raf/
│
├── gandalf_root.md                    ← YOU ARE HERE
│
├── fellowship/                   ← Agent identity files (Layer 1 per agent)
│   ├── gandalf.id.md
│   ├── rick.id.md
│   ├── harvey.id.md
│   ├── chinaski.id.md
│   ├── archer.id.md
│   ├── mr_robot.id.md
│   ├── socrates.id.md
│   ├── morty.id.md
│   ├── meeseeks.id.md
│   ├── merry.id.md
│   └── pippin.id.md
│
├── workspace/                    ← Business and personal workspaces (Layer 2)
│   ├── Rafael/
│   │   ├── context.md
│   │   ├── Projects/
│   │   ├── Writing/
│   │   ├── Ideas/
│   │   └── Planning/
│   ├── AvenoirTech/
│   │   ├── context.md
│   │   ├── Projects/
│   │   ├── Clients/
│   │   └── Templates/
│   ├── Inspiracy/
│   │   ├── context.md
│   │   ├── Projects/
│   │   ├── Clients/
│   │   └── Templates/
│   ├── ThoughtExperiment/
│   │   ├── context.md
│   │   ├── Projects/
│   │   ├── Episodes/
│   │   └── Templates/
│   └── Labs/
│       ├── context.md
│       ├── Projects/
│       └── Experiments/
│
├── skills/                       ← Pluggable tools (Layer 3)
│   ├── web_search.md
│   ├── web_fetch.md
│   ├── voice_transcription.md
│   ├── document_generation.md
│   ├── crm_read_write.md
│   ├── code_execution.md
│   ├── calendar_scheduling.md
│   ├── email_drafting_send.md
│   ├── image_visual_analysis.md
│   └── structured_reflection.md
│
├── core/                         ← System files
│   ├── fellowship.md             ← Master operations reference
│   ├── project_schema.md         ← Brief and plan file definitions
│   ├── evolution_log.md          ← Agent development record
│   ├── architecture_v2.md        ← This context system specification
│   ├── model_router.md           ← Model selection protocol — read at every dispatch
│   ├── model_registry.md         ← Environment model mapping — update when models change
│   ├── modes.md                  ← SOLO / SQUAD / FELLOWSHIP operating modes
│   └── update.md                 ← Runbook: execute when fellowship structure changes
│
├── memory/                       ← Persistent memory layers
│   ├── frodo/                    ← Episodic: past projects, decisions
│   ├── legolas/                  ← Semantic: voice, knowledge, preferences
│   │   ├── preferences.md
│   │   ├── voice_samples/
│   │   ├── domain/
│   │   └── corrections/          ← Rejection signals and calibration notes
│   │       └── feedback_loop.md
│   └── aragorn/                  ← Working: active session state
│
└── reflections/                  ← Structured reflection outputs
    ├── weekly/
    └── monthly/
```

---

## NAMING CONVENTIONS

**Workspaces:** PascalCase, no spaces. `AvenoirTech/` not `Avenir Tech/`

**Projects:** kebab-case, descriptive, dated where relevant. `2026-03-avenir-voice-agent-pilot` not `new project`

**[[The Fellowship of the Raf .MK2/Workspace/Labs/context|Context]] files:** always named `context.md` — one per workspace, one per project.

**Agent identity files:** `[name].id.md` — lowercase, dot notation. `rick.id.md`

**Skill files:** `snake_case.md`. `web_search.md`

**Deliverables:** `[YYYY-MM-DD]_[descriptor]_[type].[ext]` Example: `2026-03-16_avenir-positioning_proposal.docx`

**Templates:** `[descriptor]_template.[ext]` Example: `project-brief_template.md`

---

## PROJECT FOLDER STRUCTURE

Every project — in every workspace — follows this structure:

```
[workspace]/Projects/[project-name]/
  context.md          ← What this project is, current status, key decisions
  intake/             ← Brief, raw inputs, voice notes, research
  deliverables/       ← Final outputs going to client or into the world
  communications/     ← Emails, messages, meeting notes related to this project
```

For internal projects (no client): drop `communications/`, keep the rest.

---

## WHERE THINGS GO — QUICK REFERENCE

|Thing|Where it goes|
|---|---|
|New client project|`/workspace/[relevant]/Projects/[project-name]/`|
|Personal idea or note|`/workspace/Rafael/Ideas/`|
|YouTube episode|`/workspace/ThoughtExperiment/Episodes/[episode-name]/`|
|AI experiment|`/workspace/Labs/Experiments/[experiment-name]/`|
|Reusable template|`/workspace/[relevant]/Templates/`|
|Agent identity [[Fellowship of the Raf .MK1/Core/update|update]]|`/fellowship/[agent].id.md` — bump version|
|Agent [[Fellowship of the Raf .MK1/Core/update|update]] record|`/core/evolution_log.md`|
|[[Rafael]] rejects or corrects output|Read `/core/update.md` — Procedure H|
|[[Fellowship of the Raf .MK1/Core/Fellowship|Fellowship]] structure change|Read `/core/update.md` — follow the relevant procedure|
|New workspace|Read `/core/update.md` — Procedure D|
|Project brief|`/workspace/[relevant]/Projects/[name]/intake/brief.md`|
|Final deliverable|`/workspace/[relevant]/Projects/[name]/deliverables/`|

---

## HOW TO ORIENT AT SESSION START

1. Read this file — done.
2. Identify which workspace the current task belongs to.
3. Read that workspace's `context.md`.
4. If working on a specific project, read that project's `context.md`.
5. Identify which skills are needed for this task. Read only those skill files.
6. If deploying a [[Fellowship of the Raf .MK1/Core/Fellowship|fellowship]] agent, read their identity file from `/fellowship/`.
7. Proceed.

**If the task involves changing the [[Fellowship of the Raf .MK1/Core/Fellowship|fellowship]] structure** — adding an agent, adding a workspace, modifying an agent, retiring an agent, adding a skill — read `/core/update.md` before making any changes. Follow the relevant procedure completely.

Do not read files outside the relevant workspace unless the task explicitly spans workspaces. Do not load skill files that are not needed for this task.

---

## ACTIVE WORKSPACES — CURRENT STATUS

|Workspace|Status|Primary focus|
|---|---|---|
|AvenoirTech|ACTIVE BUILD|MVP voice agent pilot — Plenty Pavers|
|Inspiracy|ACTIVE|Consulting and strategy client work|
|[[Rafael]]|ACTIVE|Personal planning, writing, ideas|
|ThoughtExperiment|PLANNING|YouTube content brand development|
|Labs|ACTIVE|[[Fellowship of the Raf .MK1/Core/Fellowship|Fellowship]] dashboard build, AI experiments|

---

## THE [[Fellowship of the Raf .MK1/Core/Fellowship|FELLOWSHIP]]

Eleven agents. Each has an identity file in `/fellowship/`. Gandalf orchestrates. Agents do not speak directly — they route through Gandalf.

Full operational protocol: `/core/fellowship.md` Agent evolution record: `/core/evolution_log.md`

---

_gandalf_root.md — The Map_ _Fellowship of the Raf — Root Level_ _Last updated: 2026-03-16_