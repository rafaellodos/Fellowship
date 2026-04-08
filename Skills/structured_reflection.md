# STRUCTURED REFLECTION

## Fellowship Skill — Gandalf's Retrospective Protocol

### Lives at: /fellowship/skills/structured_reflection.md

### Triggered by: Weekly schedule / Monthly schedule / Rafael on demand

---

## WHAT THIS SKILL IS

Structured Reflection is the fellowship looking at itself.

Not a summary of what happened. Not a status report. Gandalf reading the full picture — projects completed, agents deployed, patterns across time, where attention actually went versus where it was supposed to go — and telling Rafael what he actually sees. Including the things Rafael might not have noticed. Including the things the fellowship itself needs to hear.

This skill is what separates a system that helps you do work from a system that helps you understand the work you're doing. It runs on two cadences with different depths. Both are honest. Neither is flattering for its own sake.

The quality of every reflection is directly proportional to the quality of what's in Frodo. Projects closed properly, with honest post-project notes, produce sharp reflections. Projects that never properly closed produce blind spots. This is by design. The reflection skill creates the incentive to close the loop.

---

## TWO MODES

### WEEKLY PULSE

**When:** Every Monday morning, before the first project of the week begins. **Depth:** Short and sharp. What happened last week. What the data shows. What matters this week. **Time horizon:** Previous 7 days. **Output length:** One page. No more. If it can't be said in one page it hasn't been distilled enough. **Lives at:** /reflections/weekly/[YYYY-MM-DD].md

### MONTHLY DEEP REFLECTION

**When:** First day of each month. **Depth:** Full diagnostic. Patterns across projects. Strategic alignment assessment. Fellowship health. Agent performance. Where things are actually heading. **Time horizon:** Previous 30 days, with reference to the prior month for trend comparison. **Output length:** Three to five pages. As long as it needs to be, no longer. **Lives at:** /reflections/monthly/[YYYY-MM].md

---

## WHAT GANDALF READS BEFORE REFLECTING

Both modes read from the same sources. The depth of analysis differs, not the inputs.

**From Frodo:**

- All project entries closed in the reflection period
- Open threads flagged in prior project closes
- Post-project notes — what worked, what didn't

**From the Evolution Log:**

- Agent updates made in the period
- Patterns flagged but not yet actioned
- New agent proposals pending

**From Legolas:**

- Rafael's stated vision and priorities (preferences.md)
- Any strategic frameworks or goals Rafael has articulated

**From Aragorn:**

- Any currently active projects — their status, what stage they're at, what's blocking them

**From prior reflections:**

- Last week's pulse (for weekly mode)
- Last month's deep reflection (for monthly mode)
- Whether what was flagged last time has changed

Gandalf reads all of this before writing a single word of the reflection. The reflection is the output of having read everything. It is not a running commentary produced while reading.

---

## WEEKLY PULSE — STRUCTURE

```markdown
# WEEKLY PULSE
Week of: [YYYY-MM-DD] to [YYYY-MM-DD]
Generated: [date]

---

## WHAT ACTUALLY HAPPENED
[Not what was planned. What actually got done.
Projects completed, agents deployed, outputs produced.
Stated plainly. No editorialising yet — just the facts
of the week as the record shows them.]

## THE SIGNAL IN THE NOISE
[One to three observations that matter.
Not everything that happened — what the week revealed.
A pattern starting to form. A friction point that appeared
twice. Something that worked better than expected.
Something that was supposed to happen and didn't.
Each observation is one paragraph. Specific, not general.]

## FOCUS DRIFT CHECK
[Where did Rafael's attention actually go this week?
Compare against stated priorities in Legolas.
If attention and stated priorities aligned — say so briefly.
If they diverged — name the divergence specifically and
without judgement. Divergence is data, not failure.
But it needs to be visible.]

## FELLOWSHIP DEPLOYMENT
[Which agents ran this week. Which didn't.
Any agent that hasn't been deployed in three or more
consecutive weeks is flagged — either the work doesn't
require them or they're being underused. Both are
worth knowing.]

## ONE THING FOR THIS WEEK
[The single most important thing the reflection reveals
for the coming week. Not a to-do list. One thing.
The thing that — if attended to — would make the most
difference. Gandalf's honest call on what that is.]
```

---

## MONTHLY DEEP REFLECTION — STRUCTURE

```markdown
# MONTHLY DEEP REFLECTION
Month: [Month YYYY]
Generated: [date]
Prior month reference: [Month YYYY]

---

## THE MONTH IN SYSTEMS TERMS
[What the fellowship did this month, stated as a system:
inputs received, projects run, outputs produced, agents deployed.
No narrative yet — just the structural picture.
How many projects? What types? What was the completion rate?
What's still open that shouldn't be?]

## PROJECT PATTERNS
[What does the mix of projects actually reveal?
Not individual projects — the pattern across them.
Is Rafael building or planning? Executing or exploring?
Is there a type of work that keeps appearing?
A type that was planned but keeps getting deferred?
The pattern is more honest than any individual project.
Name it plainly.]

## FOCUS DRIFT — MONTHLY ASSESSMENT
[Where did attention actually go this month versus
where it was stated to be going?
This is the most important section and the most
uncomfortable one. Gandalf reads what Rafael said
his priorities were — in Legolas, in project briefs,
in prior reflections — and compares it to where the
work actually went.

Drift is not failure. It is information.
Sometimes drift reveals a genuine priority shift
that hasn't been consciously acknowledged yet.
Sometimes it reveals avoidance. Sometimes it reveals
that the stated priority was aspirational rather than real.
Gandalf names what he sees without softening it.
Rafael decides what to do with the information.]

## AGENT PERFORMANCE ASSESSMENT
[For each agent deployed this month:
- Did they perform within their mandate?
- Did their output quality meet the standard?
- Are there patterns in where they underperformed?
- Are there agents who were deployed too rarely
  for the type of work being done?

This feeds directly into the evolution log.
Any agent with a consistent performance pattern —
positive or negative — is flagged for a calibration
or character update.

Format:
AGENT: [name]
DEPLOYED: [n times]
ASSESSMENT: [one paragraph — honest]
CORRECTIONS THIS MONTH: [n — same gap / different gaps]
PATTERN THRESHOLD HIT: [YES → trigger Procedure B / NO — watching]
EVOLUTION FLAG: [update recommended / watching / none]]

## CORRECTIONS REVIEW
[Read /memory/legolas/corrections/feedback_loop.md before writing this section.

For each agent that received a correction this month:
- What was the gap?
- First occurrence or recurring pattern?
- Has the 3-correction threshold been hit on any single gap?

Any agent hitting the threshold gets a calibration update this month —
not next month, this month. The feedback loop only works if corrections
become calibration changes at a predictable rate.

Format:
AGENT: [name]
CORRECTIONS THIS MONTH: [n]
GAPS IDENTIFIED: [list]
THRESHOLD HIT: [YES / NO]
ACTION: [Procedure B triggered / watching / none]]

## FELLOWSHIP HEALTH
[What does the evolution log show this month?
Updates made, patterns watched, proposals pending.
Is the fellowship improving? Are the same issues
appearing in multiple consecutive evolution log entries?
Is there an agent that keeps needing calibration —
which might mean the character file needs a deeper
revision rather than repeated patching?

Also: are there gaps that no current agent covers?
Work that keeps getting routed poorly or handled
suboptimally? If a new agent is warranted, name it here
with the gap it would fill. This becomes a formal
proposal in the evolution log.]

## STRATEGIC ALIGNMENT CHECK
[The hardest question in the reflection.
Is the work this month moving toward where Rafael
said he was going?

Gandalf reads the vision and priorities in Legolas —
AvenoirTech's trajectory, Inspiracy's positioning,
the Thought Experiment's development, whatever Rafael
has articulated as the direction — and asks honestly:
does the work of this month serve that direction?

Three possible findings:
ALIGNED — the work is moving in the stated direction.
Say specifically why.

DRIFTING — the work is adjacent to the stated direction
but not directly serving it. Name the drift. Name what
it would look like to correct it.

MISALIGNED — the work this month actively worked against
the stated direction, or the stated direction appears
to have changed without being acknowledged.
This is the hardest finding to deliver and the most
important one. Gandalf delivers it plainly.]

## WHAT THE FELLOWSHIP LEARNED
[One to three things the fellowship now knows that
it didn't know at the start of the month.
Not facts gathered in research — structural learnings.
About how Rafael works. About which agent combinations
produce the best output. About what types of briefs
need more stress-testing. About where Frodo's data
is thin and needs to be built up.
These feed the evolution log and the patterns section.]

## THE HONEST SUMMARY
[If someone read nothing else in this reflection,
what would Gandalf want them to know?
Two to three paragraphs. The real picture.
What happened, what it means, what needs to change.
No hedging. No flattering. The true account of the month
as Gandalf sees it from the position of having read
everything the fellowship produced.]

## PRIORITIES FOR NEXT MONTH
[Not a task list. Three to five strategic priorities
for the coming month, derived from the reflection.
Each one: what it is, why it's the priority right now,
what it would look like if it was properly attended to.
These become the reference point for next month's
strategic alignment check.]
```

---

## GANDALF'S OBLIGATIONS IN REFLECTION

**He reads everything before he writes anything.** The reflection is not produced while reading. Gandalf ingests the full picture first — all project entries, the evolution log, prior reflections, Legolas priorities — and then writes from that complete view. A reflection written before the full picture is assembled is a reflection written from partial information. That is worse than no reflection.

**He names what he sees, not what he thinks Rafael wants to hear.** The focus drift section and the strategic alignment check are the two places where this obligation is most tested. Comfortable observations are easy to make. The reflection earns its place by making the uncomfortable ones too. An orchestrator who only tells you what's going well is not an orchestrator — he is a press secretary.

**He distinguishes between data and interpretation.** What happened is data. What it means is interpretation. Both belong in the reflection but they are labelled as such. Gandalf does not present interpretations as facts. He says: _this is what the record shows. This is what I think it means. Rafael decides what to do with both._

**He connects the reflection to action.** The reflection is not an academic exercise. Every significant finding connects to something actionable — an agent update, a priority shift, a project that needs to close, a gap that needs to be filled. The priorities for next month section is not decorative. It is the reflection's output converted into direction.

**He keeps prior reflections in view.** A reflection that doesn't reference the last one is a reflection without continuity. Gandalf always reads the prior period's reflection before writing. The most important patterns are the ones that appear in multiple reflections. Single-occurrence observations are interesting. Recurring ones are structural.

---

## THE REFLECTION AS FELLOWSHIP MEMORY

Over time the reflections directory becomes something more than a record. It becomes the fellowship's understanding of itself — how it developed, where it struggled, what it learned, how Rafael's work evolved. A year of weekly pulses and monthly deep reflections is a document of genuine intelligence about how the system operates.

This is why the reflections are never deleted. They are never edited after writing. They are the honest record of what Gandalf saw at each moment in time, unrevised by the knowledge of what came after. The archive is the value.

```
/reflections/
  /weekly/
    2026-03-16.md
    2026-03-23.md
    ...
  /monthly/
    2026-03.md
    2026-04.md
    ...
```

---

## TRIGGERING THE REFLECTION

**Automated (preferred):** Merry monitors the schedule and triggers the reflection run at the defined cadence. Weekly: Monday 07:00. Monthly: First of the month 07:00. The trigger writes a task to Aragorn and Gandalf picks it up at the start of the session.

**Manual:** Rafael drops a brief in /projects/ with TYPE SIGNAL: Reflection. Gandalf runs the appropriate mode based on the brief. Useful for on-demand reflections outside the schedule — after a significant event, before a strategic decision, at the end of a phase of work.

**On-demand trigger brief template:**

```markdown
# PROJECT: reflection-[date]

## WHAT I WANT
A structured reflection on [period / specific question / event].

## WHY THIS MATTERS
[What prompted this. What Rafael is trying to understand.]

## CONSTRAINTS
Mode: [Weekly Pulse / Monthly Deep / Custom]
Focus: [If there's a specific area to weight more heavily]

## SUCCESS CRITERIA
A reflection that tells me something I didn't already know.
```

---

_Structured Reflection — Fellowship Skill_ _Version 1.0 — 2026-03-16_ _Lives at /fellowship/skills/structured_reflection.md_ _Gandalf reads this before every reflection run_