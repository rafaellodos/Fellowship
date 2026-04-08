# FEEDBACK LOOP
## Legolas Learning System — Output Correction and Voice Calibration
### /memory/legolas/corrections/feedback_loop.md
### Read by: Chinaski before every significant writing task
### Written by: Gandalf when Rafael rejects or corrects an output

---

## WHAT THIS IS

The rejection signal is more informative than the approval signal. When an output lands correctly, it confirms what already works. When Rafael rejects or corrects an output, it reveals where the model is wrong — specifically, in ways that cannot be inferred from the voice samples alone.

This folder is where those signals live. Every significant rejection, correction, or "not quite" from Rafael gets logged here as a structured entry. Chinaski reads this alongside voice samples. Gandalf reads this when assessing agent calibration. The entries compound over time into the most accurate picture of what Rafael's voice and judgment actually require — more accurate than any description of the voice, because it's built from the gaps.

---

## WHEN TO LOG A CORRECTION

Log when Rafael:
- Explicitly rejects a Chinaski output ("this doesn't sound like me")
- Rewrites a section significantly before using it
- Flags that a strategic recommendation missed something important
- Says an agent's output was in the wrong register, tone, or depth
- Provides a correction that reveals a systematic gap rather than a one-off error

Do not log when:
- Rafael makes minor edits (word choice, punctuation) — these are not signal
- The brief was underspecified and the output reflected that — brief quality issue, not agent quality issue
- The error was a factual mistake — log to Frodo project record, not here

---

## CORRECTION ENTRY FORMAT

```markdown
## CORRECTION [number] — [YYYY-MM-DD]

AGENT: [which agent produced the output]
TASK TYPE: [what kind of task — email / strategy doc / positioning / script / etc]
PROJECT: [project name or STANDALONE if not project-specific]
MODE: [SOLO / SQUAD / FELLOWSHIP]

WHAT WAS PRODUCED:
[One paragraph describing what the agent output. Not the full output —
the characterisation of what it did that was wrong.]

WHAT RAFAEL DID:
[REJECTED / REWROTE / FLAGGED — and specifically what he said or did.
If he rewrote it, what did the rewrite do differently? That difference
is the signal.]

THE GAP:
[What this correction reveals about where the agent's model is wrong.
Specific. Not "the tone was off" — "Chinaski used a metaphor to arrive
at the insight rather than the concrete detail. Rafael's voice arrives
at the abstract through the specific, not through the metaphorical."]

CALIBRATION NOTE:
[One sentence instruction for the agent reading this file.
Format: "When [condition], do [this] not [that]."]

PATTERN FLAG:
[YES — this has appeared before (cite prior correction number) /
NO — first occurrence, watch for recurrence]
```

---

## CALIBRATION NOTES INDEX

This section is maintained by Gandalf. It is the distilled instruction set extracted from all corrections — the living document that grows as corrections accumulate. Chinaski reads this section specifically before every writing task.

**Format:** Each entry is a single actionable instruction derived from one or more corrections.

---

### CHINASKI CALIBRATION NOTES

*Populated as corrections accumulate. Initial entries seeded from voice register analysis.*

**C-001:** When arriving at an abstract idea, come through the concrete detail — not through a metaphor or analogy. Rafael's voice finds the universal inside the specific. It does not build a bridge to the specific from the abstract.

**C-002:** The philosophical observation arrives without announcement. Do not write a transition sentence that signals "now we are going somewhere deeper." The depth is already in the room. Just say the thing.

**C-003:** Short sentences after long ones land harder than anything else in the register. If a paragraph has been building, let it land with a short sentence. Do not cushion the landing with another clause.

**C-004:** When in doubt about length, cut. The voice earns its length. It does not assume it.

**C-005:** The narrator's self-awareness is not ironic distance. He is inside everything he writes. The awareness that he is performing does not create detachment — it creates a different kind of presence. Do not write him as though he is above the scene. He is in it and watching himself be in it simultaneously.

*Further entries added as corrections accumulate.*

---

### HARVEY CALIBRATION NOTES

*Populated as corrections accumulate.*

---

### GANDALF CALIBRATION NOTES

*Populated as corrections accumulate.*

---

### ARCHER CALIBRATION NOTES

*Populated as corrections accumulate.*

---

### MORTY CALIBRATION NOTES

*Populated as corrections accumulate.*

---

### MR. ROBOT CALIBRATION NOTES

*Populated as corrections accumulate.*

---

## PATTERN TRACKING

When the same gap appears in three or more corrections, it graduates from a correction note to a formal agent calibration update via the evolution log. Three occurrences is the threshold — a single correction is an observation, three is a pattern, and a pattern warrants a character-level update.

Gandalf tracks this. Monthly reflection includes a corrections review: which agents have accumulated three or more corrections on the same gap, whether any have hit the pattern threshold, and what calibration updates are warranted.

```
PATTERN THRESHOLD: 3 corrections on the same gap
ACTION: Flag for calibration update in evolution log
WHO: Gandalf — monthly reflection review
PROCEDURE: Update.md Procedure B (Modify Existing Agent)
```

---

## CORRECTION LOG

*Entries appended below in chronological order.*
*Most recent at bottom. Never edit prior entries.*

---

*[No corrections logged yet — system initialised 2026-03-16]*

---

*Feedback Loop — Legolas Corrections*
*Version 1.0 — 2026-03-16*
*Lives at /memory/legolas/corrections/feedback_loop.md*
