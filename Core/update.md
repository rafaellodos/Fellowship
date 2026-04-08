# UPDATE.MD

## Fellowship Change Runbook

### /core/update.md

### Execute this file whenever the fellowship structure changes

---

## WHAT THIS FILE IS

A precise runbook. When the fellowship changes — a new agent, a new workspace, a modified agent, a retired agent — this file tells you exactly what to touch, in what order, with what content. Follow it completely. Partial updates leave the system inconsistent.

Read the relevant procedure below. Execute every step. Do not skip steps because they seem minor. The minor steps are usually the ones that cause problems six weeks later.

---

## TRIGGER INDEX

|Change type|Go to|
|---|---|
|Add a new agent|Procedure A|
|Modify an existing agent|Procedure B|
|Retire an agent|Procedure C|
|Add a new workspace|Procedure D|
|Modify an existing workspace|Procedure E|
|Add a new skill|Procedure F|
|Update gandalf_root.md structure|Procedure G|
|Rafael rejects or corrects an output|Procedure H|

---

## PROCEDURE A — ADD A NEW AGENT

**Trigger:** A new fellowship member is being added. Rafael has confirmed it.

**Step 1 — Create the identity file** Create `/fellowship/[agent].id.md` using the identity file template in `/core/architecture_v2.md`. Required sections: CHARACTER, MANDATE, GOVERNING PRINCIPLE, KEY RELATIONSHIPS, FATAL FLAW, WHAT YOU NEVER DO, OUTPUT FORMAT. Target length: 400–600 words. Hard ceiling: 900 words.

**Step 2 — Update the evolution log** Open `/core/evolution_log.md`. Add a new entry using the entry template at the bottom of that file. Fill in: DATE, AGENT, UPDATE TYPE (New Agent), VERSION (1.0), TRIGGER, CHANGE, RAFAEL REVIEW (Required — do not mark Completed until Rafael has confirmed). Update the ACTIVE ROSTER table — add agent at version 1.0.

**Step 3 — Update fellowship.md** Open `/core/fellowship.md`. Add the agent to the COMPLETE ROSTER table under the appropriate layer (Specialist / Worker / Ingestion). Add the agent to the AGENT VERSION REGISTRY table at version 1.0. Update the AGENT ROUTING TABLE — add the agent to any routing rows where it belongs. Add the agent to the INTER-AGENT RELATIONSHIPS section if it has notable tension or synergy with existing agents.

**Step 4 — Update gandalf_root.md** Open `/gandalf_root.md`. No structural change needed unless the agent introduces a new folder. If the agent operates primarily in a specific workspace, note it in that workspace's agent list in the relevant workspace `context.md`.

**Step 5 — Update relevant workspace context files** Open the `context.md` for every workspace where this agent will operate. Add the agent to the AGENTS ACTIVE IN THIS WORKSPACE section. Note which skills are available to this agent in that workspace.

**Step 6 — Update gandalf.id.md** Open `/fellowship/gandalf.id.md`. Add a one-line entry for the new agent in the KEY RELATIONSHIPS section. Format: `**[Agent]:** [The essential dynamic in one sentence.]` Bump the version number (MAJOR.MINOR+1).

**Step 7 — Rafael review** Flag to Rafael that the new agent is ready for review. Do not mark the evolution log entry RAFAEL REVIEW as Completed until Rafael confirms. Agent is not active until confirmed.

**Checklist:**

- [ ] `/fellowship/[agent].id.md` created
- [ ] `/core/evolution_log.md` updated — new entry + roster table
- [ ] `/core/fellowship.md` updated — roster, version registry, routing table, relationships
- [ ] `/gandalf_root.md` reviewed — no change or minor update
- [ ] Relevant workspace `context.md` files updated
- [ ] `/fellowship/gandalf.id.md` updated — new relationship line, version bumped
- [ ] Rafael review flagged

---

## PROCEDURE B — MODIFY AN EXISTING AGENT

**Trigger:** An agent's identity file needs updating — calibration, character change, or scope expansion. Determined by Gandalf's post-project evolution assessment or by Rafael directly.

**Step 1 — Determine update type** Calibration: refines behaviour, no mandate or character change → MAJOR.MINOR+1, no Rafael review required. Character: changes how agent thinks, prioritises, or relates → MAJOR+1.0, Rafael review required before implementing. Scope Expansion: adds new capability or domain → MAJOR.MINOR+1, Rafael review if substantial.

**Step 2 — Archive current version (Character updates only)** Copy the current identity file to `/fellowship/archive/[agent].id_v[X.X].md` before making any changes. This preserves the prior version for reference.

**Step 3 — Update the identity file** Open `/fellowship/[agent].id.md`. Make the changes. Bump the version number in the file header.

**Step 4 — Update the evolution log** Open `/core/evolution_log.md`. Add a new entry — DATE, AGENT, UPDATE TYPE, VERSION (old → new), TRIGGER, CHANGE, RAFAEL REVIEW status. Update the ACTIVE ROSTER table — new version number, new last-updated date.

**Step 5 — Update fellowship.md version registry** Open `/core/fellowship.md`. Update the AGENT VERSION REGISTRY table — new version number.

**Step 6 — Update gandalf.id.md if relationships changed** If the modification changes the agent's relationship dynamic with Gandalf or other agents, update the relevant line in `/fellowship/gandalf.id.md`. Bump gandalf.id.md version.

**Step 7 — Rafael review (Character updates only)** Flag to Rafael before the update goes live. Mark evolution log entry as Completed when confirmed.

**Checklist:**

- [ ] Update type determined (Calibration / Character / Scope)
- [ ] Prior version archived (Character updates only)
- [ ] `/fellowship/[agent].id.md` updated, version bumped
- [ ] `/core/evolution_log.md` updated — new entry + roster table
- [ ] `/core/fellowship.md` version registry updated
- [ ] `/fellowship/gandalf.id.md` updated if relationships changed
- [ ] Rafael review flagged (Character updates only)

---

## PROCEDURE C — RETIRE AN AGENT

**Trigger:** An agent is no longer needed. Rafael has confirmed retirement.

**Step 1 — Archive the identity file** Copy `/fellowship/[agent].id.md` to `/fellowship/archive/[agent].id_v[X.X]_retired.md`. Remove or rename the original — do not delete, rename to `[agent].id_retired.md` so the reference is clear.

**Step 2 — Update the evolution log** Add an entry: UPDATE TYPE = Retired. Document the reason. Move the agent from ACTIVE ROSTER to RETIRED AGENT ARCHIVE section.

**Step 3 — Update fellowship.md** Remove the agent from the COMPLETE ROSTER table. Remove from AGENT VERSION REGISTRY. Remove from AGENT ROUTING TABLE rows. Remove from INTER-AGENT RELATIONSHIPS. Add a note in the relevant sections: "[Agent] — retired [date], see evolution log."

**Step 4 — Update gandalf.id.md** Remove the agent's line from KEY RELATIONSHIPS. Add a brief note if relevant: "[Agent] retired [date] — [reason in one clause]." Bump version.

**Step 5 — Update workspace context files** Remove the agent from AGENTS ACTIVE IN THIS WORKSPACE in every workspace `context.md` where it appeared.

**Step 6 — Update gandalf_root.md** Remove the agent from the fellowship list if it appears there.

**Checklist:**

- [ ] Identity file archived to `/fellowship/archive/`
- [ ] `/core/evolution_log.md` updated — entry + retired archive section
- [ ] `/core/fellowship.md` — all references updated
- [ ] `/fellowship/gandalf.id.md` updated, version bumped
- [ ] All workspace `context.md` files updated
- [ ] `/gandalf_root.md` updated if needed

---

## PROCEDURE D — ADD A NEW WORKSPACE

**Trigger:** A new business, project area, or personal domain warrants its own workspace. Rafael has confirmed it.

**Step 1 — Create the workspace folder structure** Create `/workspace/[WorkspaceName]/` using PascalCase. Create the standard subdirectories based on workspace type:

Business workspace:

```
[WorkspaceName]/
  context.md
  Projects/
  Clients/
  Templates/
    context.md
```

Personal / creative workspace:

```
[WorkspaceName]/
  context.md
  Projects/
  [domain-specific folders]/
  Templates/
    context.md
```

**Step 2 — Write the workspace context.md** Create `/workspace/[WorkspaceName]/context.md`. Required sections: WHAT THIS WORKSPACE IS, PROCESS, FOLDER STRUCTURE, AGENTS ACTIVE IN THIS WORKSPACE, KEY CONTEXT. Pull from existing workspace `context.md` files as reference for format. Be specific about the process — what happens when a new project starts, what agents are active here, which skills are wired.

**Step 3 — Write the Templates context.md** Create `/workspace/[WorkspaceName]/Templates/context.md`. List every template that exists or is planned for this workspace. Format matches `/core/update.md` Procedure F template format.

**Step 4 — Update gandalf_root.md** Open `/gandalf_root.md`. Add the new workspace to the TOP-LEVEL FOLDER STRUCTURE diagram under `workspace/`. Add the workspace to the ACTIVE WORKSPACES table with its current status and primary focus. Update the WHERE THINGS GO quick reference table if the workspace introduces new content types.

**Step 5 — Update fellowship.md workspace slice table** Open `/core/fellowship.md`. In the workspace injection rules section, add the new workspace to the slice selection logic for relevant agents — which workspace slices does each agent receive when operating in this workspace?

**Step 6 — Note in relevant agent context files** If specific agents are primary in this workspace, note the workspace in any agent identity files where workspace context is referenced. (Most agents do not need updating — this is only for agents whose mandate is significantly shaped by this workspace.)

**Checklist:**

- [ ] `/workspace/[WorkspaceName]/` folder structure created
- [ ] `/workspace/[WorkspaceName]/context.md` written
- [ ] `/workspace/[WorkspaceName]/Templates/context.md` written
- [ ] `/gandalf_root.md` updated — folder map, active workspaces table
- [ ] `/core/fellowship.md` workspace slice table updated
- [ ] Relevant agent files noted if applicable

---

## PROCEDURE E — MODIFY AN EXISTING WORKSPACE

**Trigger:** A workspace's scope, process, folder structure, or active agents have changed.

**Step 1 — Update the workspace context.md** Open `/workspace/[WorkspaceName]/context.md`. Update the relevant sections. Update the "Last updated" date in the file header.

**Step 2 — Update gandalf_root.md if structure changed** If folders were added or removed, update the folder map in `/gandalf_root.md`. If the workspace status or primary focus changed, update the ACTIVE WORKSPACES table.

**Step 3 — Update fellowship.md if agents changed** If active agents in the workspace changed, update the workspace slice table in `/core/fellowship.md`.

**Checklist:**

- [ ] `/workspace/[WorkspaceName]/context.md` updated
- [ ] `/gandalf_root.md` updated if structure changed
- [ ] `/core/fellowship.md` updated if agents changed

---

## PROCEDURE F — ADD A NEW SKILL

**Trigger:** A new capability is being added to the fellowship's skill layer.

**Step 1 — Create the skill file** Create `/skills/[skill_name].md` using snake_case. Required sections: WHAT THIS SKILL IS, AGENTS WITH ACCESS, HOW AGENTS CALL THIS SKILL, OUTPUT FORMAT, IMPLEMENTATION NOTES.

**Step 2 — Update gandalf_root.md** Add the skill to the TOP-LEVEL FOLDER STRUCTURE under `skills/`.

**Step 3 — Wire the skill to relevant workspaces** Open the `context.md` for every workspace where this skill is relevant. Add the skill to the SKILLS WIRED HERE section.

**Step 4 — Update relevant agent identity files** If the skill significantly expands what an agent can do, note it in that agent's OUTPUT FORMAT or MANDATE section. Bump the agent's version (calibration — MAJOR.MINOR+1). Update evolution log.

**Checklist:**

- [ ] `/skills/[skill_name].md` created
- [ ] `/gandalf_root.md` updated
- [ ] Relevant workspace `context.md` files updated
- [ ] Relevant agent identity files updated if applicable
- [ ] Evolution log updated if any agent files changed

---

## PROCEDURE G — UPDATE GANDALF_ROOT.MD STRUCTURE

**Trigger:** The top-level folder structure has changed — new folders added, renamed, or reorganised.

**Step 1 — Update the folder map** Open `/gandalf_root.md`. Update the TOP-LEVEL FOLDER STRUCTURE diagram to reflect the new structure. Update the WHERE THINGS GO quick reference table if new content types are introduced. Update the NAMING CONVENTIONS section if new patterns are introduced.

**Step 2 — Update the Last updated date** Update the date at the bottom of `gandalf_root.md`.

**Step 3 — Verify consistency** Check that every folder referenced in `gandalf_root.md` actually exists. Check that every folder that exists is referenced in `gandalf_root.md`. Inconsistencies between the map and the territory are the most disorienting thing for an agent entering a new session.

**Checklist:**

- [ ] Folder map updated
- [ ] Quick reference table updated
- [ ] Naming conventions updated if needed
- [ ] Date updated
- [ ] Map verified against actual folder structure

---

## PROCEDURE H — LOG A CORRECTION TO LEGOLAS

**Trigger:** Rafael explicitly rejects an output, rewrites a section significantly, or flags that an agent's output was in the wrong register, tone, or depth. This is the feedback loop — the signal that tells the fellowship where its model of Rafael is wrong.

Do not trigger for minor edits (word choice, punctuation) or errors caused by an underspecified brief. Trigger when the correction reveals a systematic gap in how an agent understands Rafael's voice, judgment, or standards.

**Step 1 — Characterise the gap** Before writing the correction entry, identify precisely what the agent got wrong. Not "the tone was off" — what specifically did the agent do that Rafael's voice would not do? What did the rewrite reveal about the difference?

**Step 2 — Write the correction entry** Open `/memory/legolas/corrections/feedback_loop.md`. Append a new entry using the CORRECTION ENTRY FORMAT defined in that file. Fill in all fields: AGENT, TASK TYPE, PROJECT, MODE, WHAT WAS PRODUCED, WHAT RAFAEL DID, THE GAP, CALIBRATION NOTE, PATTERN FLAG. Number sequentially from the last entry.

**Step 3 — Update the calibration notes index** In the same file, add or update the relevant agent's CALIBRATION NOTES section. If this gap is new: add a new numbered calibration note. If this gap has appeared before: update the existing note to reflect the accumulated evidence. Note the correction number that prompted the update.

**Step 4 — Check the pattern threshold** Has this specific gap now appeared in 3 or more corrections for the same agent? If YES: flag for calibration update. Go to Procedure B (Modify Existing Agent). The calibration note becomes the basis for the agent identity file update. If NO: log only. Watch for recurrence.

**Step 5 — Note in Aragorn if mid-project** If this correction occurs during an active project run, note it in Aragorn: `[YYYY-MM-DD] CORRECTION LOGGED — [agent] — [one-line gap description] — see feedback_loop.md entry [n]` This ensures the correction informs the remainder of the current project run, not just future runs.

**Checklist:**

- [ ] Gap characterised precisely — not vague, not "tone"
- [ ] Correction entry written and appended to feedback_loop.md
- [ ] Calibration notes index updated for the relevant agent
- [ ] Pattern threshold checked — 3+ occurrences triggers Procedure B
- [ ] Aragorn noted if mid-project run

---

## GENERAL PRINCIPLES

**The map and the territory must match.** `gandalf_root.md` describes the file system. The file system must match what `gandalf_root.md` says. When they drift, agents waste time searching and make wrong assumptions. Check both when you change either.

**Every change has a log entry.** The evolution log is the institutional memory of the fellowship's development. If a change doesn't have a log entry, it didn't happen in any recoverable sense.

**Rafael reviews character changes.** Calibration and scope expansions are Gandalf's authority. Character changes — anything that changes how an agent fundamentally thinks or decides — require Rafael's eyes before going live.

**Partial updates are worse than no updates.** If you start a procedure and cannot complete it in this session, leave a note in the relevant file: `[UPDATE IN PROGRESS — [date] — paused at step N]`. Do not leave the system in a quietly inconsistent state.

---

_Update.md — Fellowship Change Runbook_ _Version 1.0 — 2026-03-16_ _Lives at /core/update.md_