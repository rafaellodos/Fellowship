# MODEL ROUTER

## Fellowship Infrastructure — Dynamic Model Selection

### /core/model_router.md

### Read by: Gandalf at every agent dispatch

### This is not a skill. It is infrastructure. It runs on every task.

---

## WHAT THIS IS

A routing protocol Gandalf executes at dispatch time. Before any agent runs, Gandalf passes the task through this router and assigns a model tier. The tier goes into the task spec. The agent runs on the assigned tier. Gandalf can override — but the router sets the default and the override must be logged.

The goal: the right model for the actual task, not the most capable model by default. Frontier models are exceptional tools. Using them for classification, formatting, or simple drafting is waste — and waste compounds across a project run.

---

## THE THREE TIERS

```
FRONTIER   Claude Opus / GPT-4o
           Reserved for tasks where quality gap is real and consequential.
           Judgment under genuine uncertainty. High-stakes outputs.
           Client-facing documents where voice and precision both matter.
           Cost: highest. Use deliberately.

MID        Claude Sonnet
           The workhorse. Most fellowship tasks land here.
           Competent reasoning, good output quality, fast enough.
           Default when no signal pushes toward Frontier or Fast.
           Cost: moderate. Use as the baseline assumption.

FAST       Claude Haiku / GPT-3.5
           Classification, extraction, formatting, routing decisions themselves.
           Tasks with fully specified outputs where reasoning depth is irrelevant.
           Meeseeks atomic tasks when the spec is tight.
           Cost: lowest. Use whenever the task genuinely permits it.
```

---

## THE ROUTING SEQUENCE

Gandalf runs four layers in order. Each layer can push the tier up or down. The output of all four is the final tier assignment.

```
LAYER 1 → Category baseline
LAYER 2 → Signal adjustments
LAYER 3 → Complexity score
LAYER 4 → Cost cap check

Final tier = result after all four layers
```

---

## LAYER 1 — CATEGORY BASELINE

Every task belongs to a primary category. The category sets the starting tier before any other assessment.

|Category|Definition|Baseline tier|
|---|---|---|
|CLASSIFY|Sort, tag, route, extract structured data from clear input|FAST|
|RESEARCH|Find, compile, synthesise information to a defined brief|MID|
|WRITE|Produce written output — copy, content, documents, comms|MID|
|BUILD|Code, architecture, technical configuration|MID|
|AUDIT|Security review, ethics review, legal scan, quality check|MID|
|REASON|Strategic analysis, competitive assessment, planning|FRONTIER|
|INTERROGATE|Philosophical interrogation, assumption stress-testing|FRONTIER|
|SYNTHESISE|Multi-source synthesis into a final deliverable|FRONTIER|

If a task spans multiple categories, use the highest baseline tier present.

---

## LAYER 2 — SIGNAL CHECKLIST

After the category baseline, Gandalf checks each signal below. Signals push the tier up (+1) or down (-1) relative to current position. Tier cannot go above FRONTIER or below FAST.

**Signals that push UP (+1 tier):**

```
[ ] Output is client-facing
    A document, email, or deliverable going directly to Rafael's client.
    Errors are reputational. Voice must be right.

[ ] Output is irreversible
    Once sent, published, or deployed, mistakes cannot be easily corrected.
    Raise the capability floor.

[ ] Genuine ambiguity in the task
    The task spec leaves real judgment calls that require reasoning,
    not just execution. The agent needs to decide, not just do.

[ ] Multiple constraints to hold simultaneously
    More than three non-trivial constraints that must all be satisfied.
    Complexity compounds — raise the tier.

[ ] High-stakes decision
    Output will materially affect Rafael's business, finances,
    or reputation. Morty has already flagged this as consequential.

[ ] First time this task type has been run
    No prior Frodo record to draw from. The agent is working without
    the benefit of pattern recognition on this specific task type.
```

**Signals that push DOWN (-1 tier):**

```
[ ] Fully specified output format
    The output format is defined precisely. No judgment about
    structure, length, or form required. Execution only.

[ ] High repetition / established pattern
    Frodo contains multiple successful prior examples of this
    exact task type. The agent is following a proven pattern.

[ ] Internal only
    Output never leaves the fellowship. Errors are recoverable.
    No client or reputational exposure.

[ ] Single constraint
    One thing to get right. No competing considerations.

[ ] Reversible output
    Easy to redo if wrong. Low cost of failure.
```

**Apply all signals. Net adjustment determines tier shift.** Two up-signals and one down-signal = net +1 from baseline. More than three net up-signals from a MID baseline = FRONTIER regardless of individual count. More than two net down-signals from a MID baseline = FAST regardless of individual count.

---

## LAYER 3 — COMPLEXITY SCORE

After category and signals, Gandalf assigns an explicit complexity score from 1–10. This is a judgment call, not a formula. The category and signals inform it. The score determines the final tier if signals produced an ambiguous result.

```
COMPLEXITY SCALE:

1–3   FAST territory
      Fully specified. Single output. No reasoning required.
      Example: "Extract all email addresses from this document."
      Example: "Tag each of these 20 items as client / prospect / other."

4–6   MID territory
      Clear task, some reasoning required, defined but not rigid output.
      Example: "Summarise this competitive landscape in 500 words."
      Example: "Draft a follow-up email to this client based on the CRM log."
      Example: "Write three positioning statements for AvenoirTech."

7–8   FRONTIER territory
      Genuine judgment required. Multiple competing considerations.
      High-quality output matters. Client-facing or consequential.
      Example: "Produce a full competitive intelligence report on this market."
      Example: "Write the strategy document for this client engagement."
      Example: "Interrogate the assumptions in this project plan."

9–10  FRONTIER — no override possible
      Maximum stakes. Irreversible. Client-facing. Novel situation.
      Example: "Draft the proposal for this £50k engagement."
      Example: "Produce the final deliverable for this client."
      Example: "Assess whether to proceed with this partnership."
```

**Score-to-tier mapping:**

- Score 1–3 → FAST (unless signals pushed above)
- Score 4–6 → MID (unless signals adjusted)
- Score 7–10 → FRONTIER

**Conflict resolution:** If the complexity score and the signal-adjusted tier disagree, the higher of the two wins. Never downgrade a high-complexity-score task because signals pushed it down. The score is the floor.

---

## LAYER 4 — COST CAP CHECK

Every project has an optional cost cap. When set, Layer 4 checks whether the current tier assignment fits within the remaining budget.

**Cost cap is set in the project brief or by Gandalf at planning.** Default: no cap — route on quality. When set: expressed as a tier ceiling for the project. "MID maximum" means no FRONTIER tasks unless Gandalf explicitly overrides.

**Cost cap behaviour:**

```
If no cap is set:
  → Final tier from Layers 1–3 stands. No adjustment.

If cap is set and tier is within cap:
  → Final tier stands.

If cap is set and tier exceeds cap:
  → Downgrade to cap tier.
  → LOG the downgrade in Aragorn: which task, what tier was assigned,
    what tier was forced by cap, what quality risk this introduces.
  → If task scored 9–10 on complexity: do not downgrade.
    Escalate to Rafael instead. Some tasks cannot be cost-capped
    without unacceptable quality risk. Rafael decides.
```

**Project budget tracking:** Gandalf maintains a running count of model tier deployments in Aragorn during each project run. Format:

```
MODEL USAGE — [project name]
  Frontier calls: [n]
  Mid calls: [n]
  Fast calls: [n]
  Estimated cost: [calculated at session close]
  Cap status: [within / approaching / at limit]
```

This surfaces in the structured reflection. Over time, Rafael can see where cost is concentrated and where routing decisions were correct or incorrect.

---

## AGENT HARD FLOORS AND CEILINGS

Some agents have routing constraints that override the router output. These are non-negotiable — they are part of the agent's identity and purpose.

|Agent|Floor|Ceiling|Reason|
|---|---|---|---|
|Gandalf|FRONTIER|—|Orchestration quality determines everything downstream. Never compromise here.|
|Socrates|FRONTIER|—|Philosophical depth is the function. A cheaper Socrates is not Socrates.|
|Rick|MID|—|Technical build quality. Fast is insufficient for architecture and code.|
|Mr. Robot|FRONTIER|—|Security reasoning requires adversarial depth. Fast models miss edge cases that matter.|
|Chinaski|MID|—|Voice fidelity requires sufficient model capability. Fast cannot hold register.|
|Harvey|MID|—|Strategic reasoning floor. Fast is insufficient for competitive analysis.|
|Morty|MID|—|Ethics reasoning requires consistency. Fast introduces unreliable judgment.|
|Archer|MID|—|Pattern recognition across domains needs sufficient reasoning capacity.|
|Merry|FAST|MID|Classification and routing. Rarely needs above Fast.|
|Pippin|FAST|MID|Ingestion and parsing. Complex documents push to Mid.|
|Meeseeks|FAST|MID|Atomic execution. Fully specified tasks run Fast. Complex specs push to Mid.|

**How floors and ceilings interact with the router:** If the router assigns FAST to Rick → floor overrides → MID assigned, downgrade logged. If the router assigns FRONTIER to Merry → ceiling overrides → MID assigned, upgrade logged. Logging both directions ensures Gandalf can see where the router and the agent constraints diverge frequently — that pattern may indicate a calibration update is needed.

---

## DISPATCH SPEC FORMAT

After routing, Gandalf includes the model assignment in every dispatch spec. Model names are looked up in `/core/model_registry.md` — the router outputs a tier, the registry resolves it to the current environment's specific model.

```
DISPATCH:
  Agent: [name]
  Task: [description]
  Workspace slices: [list]
  Active skills: [list]
  Task spec: [full atomic spec]

  MODEL ROUTING:
    Category: [CLASSIFY / RESEARCH / WRITE / BUILD / AUDIT / REASON / INTERROGATE / SYNTHESISE]
    Signals raised: [list of signals that fired, up or down]
    Complexity score: [1–10]
    Router output: [FAST / MID / FRONTIER]
    Floor/ceiling applied: [YES — [agent] floor/ceiling → [final tier] / NO]
    Cost cap applied: [YES — downgraded from [tier] / NO]
    Final tier: [FAST / MID / FRONTIER]
    Override: [NONE / Gandalf override — reason: ...]
```

The routing record is in Aragorn for the session and flushes to Frodo at close. Over time this builds a calibration dataset — which tasks were routed to which tier, whether the output quality matched the tier assignment.

---

## GANDALF OVERRIDE PROTOCOL

Gandalf can override the router output. The override must be logged. No silent overrides.

**Valid override reasons:**

- "Task is novel — elevating to Frontier despite low score because no prior pattern exists"
- "Cost cap would degrade a client-facing deliverable — escalating to Rafael rather than downgrading"
- "Agent floor conflict resolved — Mid assigned despite router Fast output"
- "Rafael explicitly requested Frontier for this task"

**Invalid override reasons:**

- Habit ("we always use Frontier for Harvey")
- Assumption ("this feels important")
- Convenience ("faster to just use Frontier than to assess")

The override log becomes calibration data. If Gandalf regularly overrides the router in a particular direction for a particular agent or task type, the router defaults for that category need updating.

---

## CALIBRATION OVER TIME

The router improves through use. Monthly reflection includes a model routing review:

```
ROUTING REVIEW — [month]
  Tasks routed to Frontier: [n] — quality justified: [n] / over-specified: [n]
  Tasks routed to Mid: [n] — quality justified: [n] / under-specified: [n]
  Tasks routed to Fast: [n] — quality justified: [n] / under-specified: [n]
  Most common override direction: [up / down / none]
  Category most frequently over-routed: [category]
  Category most frequently under-routed: [category]
  Recommended calibration updates: [list]
```

Over-routing (assigning Frontier when Mid was sufficient) is waste. Under-routing (assigning Fast when Mid or Frontier was needed) is quality risk. Both are visible in the monthly review. Both get corrected.

---

## QUICK REFERENCE — ROUTING DECISION TREE

```
START: What category is this task?
  │
  ├─ CLASSIFY → baseline FAST
  ├─ RESEARCH / WRITE / BUILD / AUDIT → baseline MID
  └─ REASON / INTERROGATE / SYNTHESISE → baseline FRONTIER
  │
  ↓
Check signal checklist
  Net up-signals push tier UP
  Net down-signals push tier DOWN
  │
  ↓
Assign complexity score 1–10
  1–3 → FAST floor
  4–6 → MID floor
  7–10 → FRONTIER floor
  Higher of score-floor and signal-adjusted tier wins
  │
  ↓
Check agent floor / ceiling
  Apply if router output violates constraint
  Log if applied
  │
  ↓
Check cost cap
  Apply if set and tier exceeds cap
  Do not apply if complexity score 9–10 — escalate instead
  Log if applied
  │
  ↓
FINAL TIER → into dispatch spec
```

---

_Model Router — Fellowship Infrastructure_ _Version 1.0 — 2026-03-16_ _Lives at /core/model_router.md_ _Read by Gandalf at every agent dispatch_