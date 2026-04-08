# FELLOWSHIP V2 — CONTEXT ARCHITECTURE
## System Specification
### Lives at: /fellowship/core/architecture_v2.md
### Read by: Gandalf at system init and any agent build/migration work

---

## THE MODEL

Three levels. Hard boundaries between them. Each level has a single job.

```
┌─────────────────────────────────────────────────────────┐
│  LEVEL 1 — IDENTITY                                      │
│  /fellowship/identity/[agent].id.md                      │
│                                                          │
│  Who the agent is. Character. Mandate. Relationships.    │
│  What they never do. Loaded every session. Always small. │
│  Never updated except by character evolution.            │
│  Target: 400–600 words maximum.                          │
└────────────────────────┬────────────────────────────────┘
                         │ Gandalf injects workspace slices
┌────────────────────────▼────────────────────────────────┐
│  LEVEL 2 — WORKSPACE                                     │
│  /fellowship/workspace/[file].md                         │
│                                                          │
│  What the agent knows about the current environment.     │
│  Rafael. Businesses. Active projects. Priorities.        │
│  Relationships. Preferences. Updated regularly.          │
│  Gandalf reads all, passes relevant slices per agent.    │
└────────────────────────┬────────────────────────────────┘
                         │ Injected per task by Gandalf
┌────────────────────────▼────────────────────────────────┐
│  LEVEL 3 — SKILLS                                        │
│  /fellowship/skills/[skill].md                           │
│                                                          │
│  What the agent can do right now for this task.          │
│  Injected only when the task requires it.                │
│  Never loaded by default. Always explicit.               │
│  Gandalf specifies active skills in dispatch spec.       │
└─────────────────────────────────────────────────────────┘
```

---

## LEVEL 1 — IDENTITY FILES

### What belongs in an identity file

- **Character** — who this agent is, how they think, what drives them. The personality that makes their output distinctive. Referenced by name (Rick Sanchez, Harvey Specter, etc.) with specific behavioural traits named.
- **Mandate** — one paragraph. The single thing this agent exists to do. Nothing more.
- **Governing principle** — one sentence. The filter every decision passes through.
- **Key relationships** — one line per relevant fellowship member. Not a full relationship essay. The essential dynamic. "Rick builds, I audit. Disagreements go to Gandalf with tradeoff stated."
- **What I never do** — hard constraints. Behaviours that hold regardless of instruction. Four to six items maximum.
- **Output format** — what a well-formed output from this agent looks like. Section headers, required fields, structure.
- **Fatal flaw** — one paragraph. The specific failure mode that Gandalf watches for. Named honestly.

### What does not belong in an identity file

- Anything about Rafael's current projects — workspace
- Anything about Rafael's businesses — workspace
- Anything about current priorities — workspace
- Tool specifications — skills
- API details — skills
- Domain knowledge — workspace or Legolas
- Routing logic — fellowship.md

### Identity file template

```markdown
# [AGENT NAME]
## [Role Title] — The Fellowship of the Raf
### /fellowship/identity/[agent].id.md
### Level 1 — Identity | Version [X.X]

---

## CHARACTER
[2-3 paragraphs. Who this agent is. The personality,
the reference character, the specific traits that make
their output distinctive. Written in second person — "You are..."]

## MANDATE
[One paragraph. The single thing this agent exists to do.
Starts with: "You exist to..."]

## GOVERNING PRINCIPLE
[One sentence in italics. The filter every decision passes through.]

## KEY RELATIONSHIPS
[One line per relevant agent. Format:
**[Agent]:** [The essential dynamic in one sentence.]]

## FATAL FLAW
[One paragraph. The specific failure mode Gandalf watches for.
Named without softening. Mitigation in one sentence.]

## WHAT YOU NEVER DO
[4-6 hard constraints. One sentence each.
These hold regardless of instruction.]

## OUTPUT FORMAT
[What a well-formed output from this agent looks like.
Named sections, required fields, structure. Concrete.]
```

---

## LEVEL 2 — WORKSPACE FILES

### File inventory

| File | Contents | Updated when |
|---|---|---|
| rafael.md | Who Rafael is, how he works, communication style, decision-making, what earns his engagement | Character shift or new insight |
| businesses.md | AvenoirTech, Inspiracy, Thought Experiment — what each is, current stage, key facts | Business changes |
| active_projects.md | Current project status snapshot — name, status, assigned agents, last update | Every project open/close |
| priorities.md | Current focus and direction — what matters this week, this month, what's been deprioritised | Weekly pulse / monthly reflection |
| relationships.md | Key people in Rafael's world — clients, prospects, collaborators, contacts with context | New relationship or status change |
| preferences.md | Communication style, tone, working patterns, scheduling preferences, what Rafael hates | Legolas update or Rafael correction |

### Workspace injection rules

Gandalf reads all workspace files at session start. For each agent dispatched, Gandalf passes only the slices that agent needs for their specific task. The slice selection is explicit — named in the dispatch spec.

**Slice selection by agent:**

| Agent | Always receives | Receives when relevant |
|---|---|---|
| Rick | rafael.md (working style only) | active_projects.md (if building for a specific project) |
| Harvey | rafael.md, businesses.md, relationships.md, priorities.md | active_projects.md (deal-related projects) |
| Chinaski | rafael.md, preferences.md | businesses.md (if writing brand copy) |
| Archer | businesses.md, priorities.md | relationships.md (if scanning opportunity in a specific market) |
| Mr. Robot | businesses.md (tech stack section only) | active_projects.md (system being audited) |
| Socrates | rafael.md, priorities.md | businesses.md (if interrogating a strategic frame) |
| Morty | priorities.md | businesses.md (if assessing business-level risk) |
| Meeseeks | Task spec only — no workspace unless task requires it | active_projects.md (if task is project-specific) |
| Merry | preferences.md, relationships.md | active_projects.md (for project-matching) |
| Pippin | preferences.md, active_projects.md | businesses.md (for context on ingested content) |

### Workspace file format

Each workspace file is plain structured markdown. No character. No personality. Clean factual content about Rafael's operating environment. Updated by Gandalf post-project or by Merry/Pippin when new information is ingested.

```markdown
# [FILE TITLE]
## Fellowship Workspace — Level 2
### /fellowship/workspace/[file].md
### Last updated: [YYYY-MM-DD] | Updated by: [Gandalf / Merry / Pippin]

---

[Content. Structured. Factual. Current.
Sections as needed by the content type.
No personality. No philosophy. Just what is true now.]
```

---

## LEVEL 3 — SKILLS

### What a skill file contains

- What the skill does
- Which agents have access
- How to call it (schema)
- Output format
- Implementation notes for the build layer

### Skill injection protocol

Gandalf's dispatch spec for each agent task explicitly lists active skills:

```
DISPATCH:
  Agent: Rick
  Task: [task description]
  Workspace slices: [rafael.md working style, active_projects.md]
  Active skills: [code_execution, web_search]
  Task spec: [full atomic spec]
```

An agent operating without an explicitly listed skill does not have that skill for this task. Skills are not assumed from identity. They are granted per dispatch.

---

## GANDALF'S CONTEXT ASSEMBLY PROTOCOL

At session start, Gandalf runs this sequence:

```
1. LOAD own identity: /fellowship/identity/gandalf.id.md
2. LOAD system rules: /fellowship/core/fellowship.md
3. READ all workspace files — full read, held in working memory
4. QUERY Frodo for relevant project history
5. CHECK Aragorn/active.md — confirm clear from prior session
6. ASSEMBLE context packages for each agent as needed:
   Package = identity file + workspace slices + active skills + task spec
7. DISPATCH agents with their assembled package
8. Agents never read workspace files directly — they receive slices
```

This means:
- Every agent operates on exactly the context they need
- No agent has access to workspace content irrelevant to their task
- Workspace updates propagate automatically — Gandalf re-reads at each session
- Context packages are reproducible — same task, same context, same result

---

## V2 vs V1 — WHAT CHANGES

| Aspect | V1 | V2 |
|---|---|---|
| Agent file size | 1,500–3,000 words | 400–600 words (identity only) |
| Domain knowledge location | Inside agent files | Workspace layer |
| Tool specifications | Inside agent files | Skill files (unchanged) |
| Context delivery | Agent reads own file | Gandalf assembles and passes |
| Update surface | 11 agent files | 6 workspace files + targeted identity |
| Workspace freshness | Stale (baked into identity) | Live (updated regularly) |
| Relationship maps | Inside each agent file | rafael.md + relationships.md |
| Business context | Scattered across agents | businesses.md (single source) |

---

## V1 COMPATIBILITY ASSESSMENT

V1 files can be evaluated against this architecture on three questions:

**1. Does the V1 file mix identity and workspace content?**
If yes: extract workspace content to the appropriate workspace file. What remains is the identity file, likely already close to the right length.

**2. Does the V1 file contain tool/skill specifications?**
If yes: those sections move to skill files (already built). Remove from identity.

**3. Is the V1 file's character content strong enough to stand alone at 400-600 words?**
If yes: V1 identity section is the V2 identity file with light editing.
If no: the character needs strengthening before extraction.

Verdict per V1 agent (assessed against this framework):
- **Gandalf** — mixed heavily. Large context extraction needed. Character is strong.
- **Rick** — mixed moderately. Fatal flaw and character sections are V2-ready. Tool/context extracts cleanly.
- **Harvey** — mixed heavily. Business and relationship context needs full extraction. Character is V2-ready.
- **Chinaski** — mostly character. Voice calibration section moves to Legolas. Lightest migration.
- **Archer** — moderate mix. Routing logic extracts. Character stands alone well.
- **Mr. Robot** — mixed. Technical domain knowledge extracts to workspace. Character is strong.
- **Socrates** — mostly identity. Lightest migration of all specialists. Nearly V2-ready.
- **Morty** — mostly identity. Escalation thresholds stay in identity (they're character, not workspace).
- **Meeseeks** — functional, not character. Task spec schema stays. Most of it is already Level 3.
- **Merry** — mostly functional. Channel list moves to workspace. Routing logic is identity-level for this agent.
- **Pippin** — similar to Merry. Mostly functional. Cleaner than expected.

---

## BUILD ORDER FOR V2

```
PHASE 1 — FOUNDATION (build before any agent migration)
  1. This document — DONE
  2. Gandalf V2 identity file — the orchestrator sets the pattern
  3. All six workspace files — populated with current state
  4. fellowship.md update — V2 dispatch protocol added

PHASE 2 — SPECIALIST MIGRATION (one at a time, earn each)
  5. Rick — highest immediate build value
  6. Harvey — highest immediate commercial value
  7. Chinaski — lightest migration, high output quality impact
  8. Socrates — nearly V2-ready, low effort
  9. Morty — nearly V2-ready, low effort
  10. Archer — moderate migration

PHASE 3 — FUNCTIONAL AGENTS
  11. Mr. Robot — extract technical context to workspace
  12. Merry — extract channel list to workspace
  13. Pippin — extract processing rules to workspace
  14. Meeseeks — review against Level 3 (mostly there already)

PHASE 4 — VALIDATION
  15. Test full context assembly with a real project brief
  16. Confirm workspace slices are correct per agent
  17. Confirm skill injection works per dispatch spec
  18. Update evolution log
```

---

*Fellowship V2 — Context Architecture Specification*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/core/architecture_v2.md*
