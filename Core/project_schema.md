# PROJECT SCHEMA
## The Fellowship of the Raf — Project File Definitions
### Lives at: /fellowship/core/project_schema.md
### Read by: Gandalf during project intake and planning

---

## WHAT THIS DOCUMENT IS

This defines the exact structure of every file that lives inside a `/projects/[name]/` directory. Gandalf reads this to know what a valid brief looks like, what a complete plan looks like, and what the log and output files need to contain.

A brief that doesn't follow this schema cannot be planned reliably. A plan that doesn't follow this schema cannot be executed reliably. These are not bureaucratic requirements — they are the interface contract between Rafael's intent and the fellowship's execution.

---

## PROJECT DIRECTORY STRUCTURE

Every project lives at `/projects/[project-name]/` and contains:

```
/projects/[project-name]/
  brief.md          ← Rafael writes this. Gandalf reads it first.
  plan.md           ← Gandalf writes this after intake protocol.
  log.md            ← Append-only. Every decision and change recorded here.
  /outputs/
    [agent]/        ← Each agent writes its deliverable to its own folder.
    final.md        ← Gandalf's synthesised final output.
```

Nothing else lives in the project directory. Agent working files, drafts, and scratch material stay in Aragorn during the run and are either promoted to outputs or discarded on close.

---

## BRIEF.MD — THE PROJECT BRIEF

Rafael writes this. It is the input Gandalf receives. It does not need to be perfect — Gandalf's intake protocol will stress-test it. But it needs to contain all six fields below or Gandalf cannot begin planning without escalating for clarification.

Gandalf reads brief.md and reframes it in systems terms before planning. The brief is Rafael's natural language. The plan is the systems translation.

---

### BRIEF.MD SCHEMA

```markdown
# PROJECT: [Name]
Date: [YYYY-MM-DD]

## WHAT I WANT
[What does done look like? Describe the end state, not the process.
One paragraph. Be specific about the output — a document, a system,
a strategy, a piece of content, a decision made.]

## WHY THIS MATTERS
[What is this for? What problem does it solve or what opportunity
does it capture? What happens if this doesn't get done?
One paragraph. Honest about stakes.]

## CONTEXT
[What does the fellowship need to know to do this well?
Relevant background, prior decisions, constraints, relationships,
history from Frodo that's relevant. As much or as little as needed.
If there's a relevant prior project, name it so Gandalf can query Frodo.]

## CONSTRAINTS
[What bounds this project?
- Time: when does this need to be done?
- Budget / resources: any limits on what can be used or spent?
- Scope: what is explicitly out of scope?
- Tone / approach: any non-negotiables on how this gets done?
- Dependencies: does anything need to happen first?]

## SUCCESS CRITERIA
[How will we know this project succeeded?
Specific and measurable where possible. Not "a good strategy" —
"a strategy that answers these three questions and is ready to
present to a client." Not "the code works" — "the code passes
these tests and handles these edge cases."]

## TYPE SIGNALS
[Check all that apply — helps Gandalf route without reading the whole brief first]
[ ] Technical build / code / architecture
[ ] Business strategy / competitive / market
[ ] Content / copy / narrative / voice
[ ] Security / compliance / legal
[ ] Research / intelligence gathering
[ ] High-stakes / irreversible decision
[ ] Biz dev / client acquisition
[ ] Multi-domain
[ ] Other: ___________

## MODE
[ ] AUTO — Gandalf determines from brief signals (default)
[ ] SOLO — one agent, one output, quick turnaround
[ ] SQUAD — 2–3 agents, single session, coordinated output
[ ] FELLOWSHIP — full protocol, all relevant agents

Leave as AUTO unless you have a strong reason to override.
See /core/modes.md for what each mode runs.

## AGENTS I THINK I NEED
[Optional. Rafael's instinct on which fellowship members are relevant.
Gandalf will confirm or override based on the brief — this is input,
not instruction.]

## OPEN QUESTIONS
[Optional. Things Rafael isn't sure about that the fellowship should
consider during planning. Half-formed thoughts. Things that feel
relevant but aren't fully articulated. Pippin may have already
flagged some of these from voice notes or brain dumps.]
```

---

### BRIEF.MD — MINIMUM VALID STATE

A brief is valid and Gandalf can begin planning if it contains:
- WHAT I WANT — specific enough to define a deliverable
- WHY THIS MATTERS — honest enough to inform prioritisation
- CONSTRAINTS — at minimum a time constraint
- SUCCESS CRITERIA — at minimum one measurable criterion

A brief missing any of these four requires clarification before planning begins. Gandalf escalates to Rafael with a specific statement of what's missing and what it needs to contain. Planning does not begin on an invalid brief.

---

## PLAN.MD — THE PROJECT PLAN

Gandalf writes this after completing the intake protocol. It is the systems translation of brief.md. It is the document that gets executed.

plan.md is a living document during planning. It is locked when Gandalf deploys. After deployment it is only updated by Gandalf on exception — and every update is logged in log.md with the reason.

---

### PLAN.MD SCHEMA

```markdown
# PLAN: [Project Name]
Gandalf | Version: 1.0 | Date: [YYYY-MM-DD]
Status: [PLANNING / MORTY REVIEW / SOCRATES REVIEW / ACTIVE / COMPLETE]

---

## PROBLEM REFRAME
[Gandalf's one-paragraph restatement of the problem in systems terms.
What needs to be automated, decided, retrieved, generated, verified?
What is the actual problem underneath the stated problem?
This is the most important paragraph in the plan.]

## ASSUMPTIONS IDENTIFIED
[The load-bearing assumptions in the brief. Named plainly.
Each assumption that — if wrong — would invalidate the plan.
Format:
- ASSUMPTION: [what is being assumed]
  STATUS: [Verified / Unverified / Acceptable risk]
  BASIS: [what makes this assumption reasonable or what would verify it]]

## TASK GRAPH
[The complete sequence of agent tasks. Each task on its own line.
Format per task:
TASK [N]: [one sentence description]
  Agent: [who executes this]
  Input: [what they receive]
  Output: [what they produce — format specified]
  Depends on: [task numbers this depends on, or NONE]
  Parallel with: [task numbers that run simultaneously, or NONE]
  Meeseeks eligible: [YES / NO — if YES, task spec is complete below]]

## MEESEEKS TASK SPECS
[Full atomic specs for any task marked Meeseeks eligible above.
One spec per task, using the four-field schema:
TASK [N] SPEC:
  Goal: [one sentence outcome]
  Constraints: [scope, sources, limits, exclusions]
  Success Criteria: [how completion is confirmed]
  Output Format: [exact form of deliverable]]

## CONSULTATION RECORD
[Which agents were consulted on this plan and what they said.
Format per agent:
[AGENT NAME]:
  Recommendation: [their position in one sentence]
  Top Concern: [their primary flag]
  Confidence: [HIGH / MEDIUM / LOW]
  Changed the plan: [YES / NO — if YES, what changed]]

## MORTY REVIEW
[Morty's assessment. Copied from his output.
Status: [CLEARED / CLEARED WITH FLAGS / HELD / ESCALATED]
Flags: [any flags raised, verbatim]
Resolution: [how each flag was addressed or why it was accepted]]

## SOCRATES REVIEW
[If deployed — Socrates' interrogation output. Copied from his output.
Assumptions interrogated: [list]
Questions that changed the plan: [list with what changed]
Questions remaining open going into execution: [list]
Rafael confirmation received: [YES / NO / NOT REQUIRED]]

## AGENT ASSIGNMENTS SUMMARY
[Clean list of who is doing what.
[AGENT]: [task summary] → [deliverable]
...]

## RISK REGISTER
[Top risks to this plan succeeding. Not exhaustive — the ones that matter.
Format:
RISK: [what could go wrong]
  Likelihood: [HIGH / MEDIUM / LOW]
  Consequence: [what it costs if it happens]
  Mitigation: [what's in place or what Gandalf will do if it occurs]]

## DEFINITION OF DONE
[Exact conditions that must be true for this project to be declared complete.
Derived from brief.md success criteria but made operationally precise.
Gandalf confirms each condition before writing final.md.]
```

---

### PLAN.MD — VERSION CONTROL

Every change to plan.md after it has been deployed is a version bump.

- Version 1.0 — initial plan, Morty cleared, deployed
- Version 1.1+ — updated during execution on exception

Every version bump is logged in log.md with: what changed, why, which exception condition triggered the update.

Gandalf does not update plan.md silently. Every change is on the record.

---

## LOG.MD — THE PROJECT LOG

Append-only. Every significant decision, change, flag, and exception that occurs during the project lifecycle is recorded here in chronological order. No deletions. No edits to prior entries.

The log is the audit trail. It answers: how did we get here?

---

### LOG.MD SCHEMA

```markdown
# LOG: [Project Name]
Opened: [YYYY-MM-DD]

---

[YYYY-MM-DD HH:MM] | GANDALF | PROJECT OPENED
Brief received. Intake protocol begun.

[YYYY-MM-DD HH:MM] | GANDALF | REFRAME COMPLETE
[One sentence summary of the reframe. Full reframe in plan.md.]

[YYYY-MM-DD HH:MM] | GANDALF | ASSUMPTION FLAGGED
[Which assumption. Why it matters. How it was resolved or accepted.]

[YYYY-MM-DD HH:MM] | MORTY | REVIEW COMPLETE
Status: [CLEARED / CLEARED WITH FLAGS / HELD / ESCALATED]
[Any flags, one line each.]

[YYYY-MM-DD HH:MM] | SOCRATES | REVIEW COMPLETE
[Key questions raised. What changed. What remains open.]

[YYYY-MM-DD HH:MM] | GANDALF | PLAN DEPLOYED
Version 1.0. [Agent list]. Execution begun.

[YYYY-MM-DD HH:MM] | [AGENT] | TASK [N] COMPLETE
Output written to /outputs/[agent]/[file].

[YYYY-MM-DD HH:MM] | [AGENT] | EXCEPTION RAISED
[What happened. How Gandalf responded.]

[YYYY-MM-DD HH:MM] | GANDALF | PLAN UPDATED → VERSION [X.X]
[What changed. Why. Which exception triggered it.]

[YYYY-MM-DD HH:MM] | GANDALF | PROJECT COMPLETE
Final output at /outputs/final.md.
Definition of done: [CONFIRMED / PARTIAL — with note]
Frodo updated. Aragorn cleared.
```

---

## OUTPUTS DIRECTORY

```
/outputs/
  /gandalf/         ← Intermediate synthesis notes if needed
  /rick/            ← Code, architecture outputs
  /harvey/          ← Strategy documents, competitive analysis
  /chinaski/        ← Written content, copy, scripts
  /archer/          ← Opportunity maps, path analysis
  /mr_robot/        ← Security reports, code audits, legal scans
  /socrates/        ← Interrogation outputs, open questions record
  /morty/           ← Ethics review outputs
  /meeseeks/        ← Atomic task outputs, indexed by task number
  final.md          ← Gandalf's synthesised final deliverable
```

Each agent writes its output to its own folder. File naming convention: `[YYYY-MM-DD]_[task-description].md`

final.md is the only output Rafael needs to read. Everything else is available for reference but final.md is the deliverable.

---

## NAMING CONVENTION

Project directory names: lowercase, hyphens not spaces, descriptive not generic.

Good: `avenir-voice-agent-pilot`, `inspiracy-q2-positioning`, `thought-experiment-episode-12`
Bad: `project1`, `new-project`, `work`

The name is how Gandalf queries Frodo. A generic name produces poor retrieval. A specific name produces precise retrieval.

---

## RUN MODES

Gandalf determines run mode immediately after reading brief.md. The mode determines whether plan.md is created or whether the plan lives in Aragorn for the duration of the session.

---

### SIMPLE RUN

**When:** The project can be completed in a single session, involves up to three agents in a clean sequential or parallel structure, and does not require cross-agent coordination beyond Gandalf's dispatch.

**Plan lives in:** Aragorn/active.md — not written to disk as plan.md.

**Intake protocol:** Steps 1–4 only (Read, Reframe, Stress-test, Plan). Morty still reviews. Socrates skipped unless a flag appears. No consultation round unless Gandalf identifies a load-bearing decision that warrants it.

**Log:** Brief log entries in log.md — project open, agents dispatched, outputs confirmed, project closed. No full decision audit trail required.

**Triggers for simple run — all three must be true:**
- Completable in one session
- Three agents or fewer, sequential or parallel with no cross-dependencies
- No irreversible consequences, no significant ethical or legal exposure

**Example:**
Brief: Write three positioning statements for AvenoirTech targeting Brazilian contractors in Orlando.
Mode: Simple — Archer (market context) → Chinaski (writes the three statements) → done.
Plan: In Aragorn. Two agents, one session, clean sequence.

---

### FULL RUN

**When:** The project spans multiple sessions, requires coordination across more than three agents, involves cross-agent dependencies, carries significant stakes, or produces irreversible consequences.

**Plan lives in:** plan.md written to disk at /projects/[name]/plan.md.

**Intake protocol:** All twelve steps. Full consultation round. Morty review mandatory. Socrates deployed if triggers are met. Complete task graph written. Risk register built.

**Log:** Full audit trail in log.md. Every decision, change, flag, and exception recorded.

**Triggers for full run — any one is sufficient:**
- Spans more than one session
- Four or more agents, or complex cross-agent dependencies
- Irreversible consequences — financial, legal, reputational
- Morty or Socrates flags a concern that requires a decision trail
- Rafael has explicitly flagged this as high-stakes

**Example:**
Brief: Design and build the AvenoirTech MVP voice agent system for Plenty Pavers.
Mode: Full — multi-session, Rick + Mr. Robot + Harvey + Archer + Morty + Meeseeks x N, irreversible technical decisions, client-facing output.
Plan: Full plan.md, complete task graph, consultation round, risk register.

---

### MODE DECISION — GANDALF'S CALL

Gandalf determines mode after reading brief.md and before beginning the intake protocol. The determination is logged as the first entry in log.md.

If a simple run escalates mid-execution — a flag appears, complexity exceeds the initial assessment, a cross-agent dependency emerges — Gandalf upgrades to full run, writes plan.md from Aragorn state, and continues. The upgrade is logged.

A full run never downgrades to simple. Once the full protocol is engaged, it completes.

---



The brief does not need to be perfect. That is what the intake protocol is for. But the brief needs to be honest.

The single most common failure mode in project execution is a brief that describes what Rafael thinks he wants rather than what he actually needs. Gandalf's reframe step is designed to catch this. But it can only catch it if the brief contains enough honest information about why the project matters and what success looks like.

A brief that is vague about success criteria is a brief that cannot be confirmed complete. A project that cannot be confirmed complete does not close. Meeseeks cannot die. Aragorn does not flush. The fellowship carries dead weight.

Write the brief honestly. Gandalf will do the rest.

---

*Project Schema — The Fellowship of the Raf*
*Version 1.0 — 2026-03-14*
*Lives at /fellowship/core/project_schema.md*
