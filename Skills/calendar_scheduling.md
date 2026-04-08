# SKILL: CALENDAR & SCHEDULING INTELLIGENCE
## [[Fellowship]] Skill — Active Time and Availability Management
### Lives at: /fellowship/skills/calendar_scheduling.md
### Available to: [[Fellowship of the Raf .MK1/Gandalf.ID]] (primary), [[Merry.ID]], [[Harvey.ID]]

---

## WHAT THIS SKILL IS

Active scheduling intelligence. The ability to read Rafael's actual calendar, understand his real availability, propose time blocks that fit the work, flag conflicts between project deadlines and scheduled commitments, and surface the scheduling implications of decisions before they become problems.

[[Merry.ID]] already ingests calendar data passively — events arrive, get classified, get filed to Frodo. This skill is different. This is the [[Fellowship]] actively using calendar data as a planning instrument. Not just knowing what's on the calendar but reasoning about it — what time is actually available for deep work, when is the right moment to schedule a client call, what does this project timeline look like against Rafael's actual week.

The difference between a system that knows your calendar and one that thinks with it.

---

## AGENTS WITH ACCESS

| Agent | Primary Use |
|---|---|
| [[Fellowship of the Raf .MK1/Gandalf.ID]] | Project planning against real availability — time-blocking deep work, deadline feasibility assessment, scheduling project milestones |
| [[Merry.ID]] | Flagging scheduling conflicts in incoming requests, processing meeting invitations with context |
| [[Harvey.ID]] | Client meeting scheduling — finding optimal timing for commercial conversations, pre-meeting briefing based on calendar context |

---

## CALENDAR DATA SOURCES

**Google Calendar** — primary. All read and write operations go here.

**Calendars in scope:**

| Calendar | Access | Purpose |
|---|---|---|
| Primary (Rafael's main) | Read + Write | Personal and professional commitments |
| AvenoirTech | Read + Write | Client and operational meetings |
| Inspiracy | Read + Write | Client work and creative sessions |
| Shared / External | Read only | Incoming invitations, shared calendars |

---

## READ OPERATIONS

### AVAILABILITY CHECK
What time is actually free in a given window.

```
CAL_READ:
  Operation: AVAILABILITY_CHECK
  Window: [date range — e.g. "next 5 working days" / "this week" / specific dates]
  Duration: [how long the block needs to be]
  Type: [DEEP_WORK / MEETING / CALL / FLEXIBLE]
  Returns: Available slots ranked by quality
            — morning blocks flagged for deep work
            — afternoon blocks flagged for meetings and calls
```

### WEEK OVERVIEW
Full picture of the coming week. [[Fellowship of the Raf .MK1/Gandalf.ID]] reads this at the start of every project planning session.

```
CAL_READ:
  Operation: WEEK_OVERVIEW
  Week: [current / next / specific date]
  Returns:
    - All committed time — meetings, calls, fixed blocks
    - Free blocks of 90 minutes or more
    - Deadline flags from active projects in Frodo
    - Travel or out-of-office periods
    - Energy map — where deep work is realistic vs where it isn't
```

### DEADLINE FEASIBILITY
Given a project with a deadline and estimated time requirements — can it actually be done?

```
CAL_READ:
  Operation: DEADLINE_FEASIBILITY
  Project: [project name]
  Required hours: [total estimated work hours]
  Deadline: [date]
  Returns:
    - Available hours between now and deadline
    - Feasibility assessment: FEASIBLE / TIGHT / NOT_FEASIBLE
    - If TIGHT or NOT_FEASIBLE: what needs to move or be dropped
    - Recommended schedule: which blocks to assign to this project
```

---

## WRITE OPERATIONS

### BLOCK TIME
Create a time block for focused work on a specific project.

```
CAL_WRITE:
  Operation: BLOCK_TIME
  Title: [what the block is for — project name + task]
  Start: [datetime]
  End: [datetime]
  Calendar: [which calendar]
  Type: [DEEP_WORK / REVIEW / CALL / MEETING / BUFFER]
  Project: [associate with active project in Frodo]
  Note: [any relevant context for that block]
```

### PROPOSE MEETING SLOT
Suggest available times for a client or contact meeting. [[Harvey.ID]] uses this when scheduling commercial conversations.

```
CAL_READ:
  Operation: PROPOSE_MEETING_SLOT
  Duration: [meeting length]
  Participants: [who's involved — Rafael + contact name]
  Window: [when it should happen — "next two weeks" etc]
  Preference: [morning / afternoon / no preference]
  Returns: Three ranked slot options with rationale for each
```

### CLEAR BLOCK
Remove a scheduled block. Used when a project completes early or priorities shift.

```
CAL_WRITE:
  Operation: CLEAR_BLOCK
  Event ID: [calendar event identifier]
  Reason: [why it's being cleared — logged to Frodo]
```

---

## [[Fellowship of the Raf .MK1/Gandalf.ID]]'S SCHEDULING PROTOCOL

When [[Fellowship of the Raf .MK1/Gandalf.ID]] builds a project plan, scheduling is the last step of the planning phase — after the task graph is built and agents are assigned, before deployment.

**Step 1 — WEEK_OVERVIEW** for the project window. Understand the real available time.

**Step 2 — DEADLINE_FEASIBILITY** for the project. Confirm the deadline is achievable before committing to it. If not feasible, flag to Rafael before the plan is deployed — not after execution has started.

**Step 3 — BLOCK_TIME** for the key deep work sessions the project requires. [[Fellowship of the Raf .MK1/Gandalf.ID]] claims the time in the calendar before dispatching agents. A project plan without time blocked for it is a plan that competes with everything else on the calendar.

**Step 4 — Log blocks to Aragorn.** Every scheduled block is noted in the project's Aragorn state. If the project plan changes, the calendar blocks are updated.

---

## [[Harvey.ID]]'S SCHEDULING USAGE

[[Harvey.ID]] uses this skill specifically for commercial conversations — client calls, prospect meetings, deal discussions.

**Pre-scheduling:** Before proposing times to a contact, [[Harvey.ID]] runs PROPOSE_MEETING_SLOT to identify the three best options. He never proposes times Rafael isn't actually free.

**Timing intelligence:** [[Harvey.ID]] considers more than raw availability. He factors in what else is happening that day — a high-stakes negotiation scheduled after a draining internal meeting is suboptimal. He notes this in his recommendation.

**Post-scheduling:** When a meeting is confirmed, [[Harvey.ID]] flags it to [[Fellowship of the Raf .MK1/Gandalf.ID]] for pre-meeting briefing preparation. The meeting goes in the calendar. The CRM interaction log notes it as scheduled. [[Merry.ID]] will pick it up as a calendar event and cross-reference with the contact record.

---

## ENERGY MAPPING

The calendar skill is aware of energy, not just time. Not all available hours are equal for all types of work.

**Deep work preference:** 09:00–13:00 on days without early meetings. [[Fellowship of the Raf .MK1/Gandalf.ID]] blocks deep work here first.

**Meetings and calls:** 14:00–18:00 preferred. Lower cognitive cost, more recoverable from interruption.

**Creative work ([[Chinaski.ID]] tasks):** 09:00–12:00 on clear mornings. Creative output degrades significantly in the afternoon slot.

**Review and admin:** Flexible. These go in the remaining slots.

Rafael can update these preferences in /memory/legolas/preferences.md. The calendar skill reads preferences before proposing blocks. Scheduling that ignores energy is scheduling that produces suboptimal output even when time is technically available.

---

## CONFLICT DETECTION

The skill actively monitors for scheduling conflicts — not just double-bookings, but meaningful conflicts between commitments and project requirements.

**Deadline conflicts:** A project deadline that falls during a period with no available deep work time. Flagged to [[Fellowship of the Raf .MK1/Gandalf.ID]] immediately when detected.

**Back-to-back meeting days:** Three or more consecutive days of heavy meetings with no deep work blocks. Flagged as a risk to project timelines — [[Fellowship of the Raf .MK1/Gandalf.ID]] surfaces this to Rafael proactively.

**Time zone conflicts:** For international calls — the skill checks participant time zones and flags if the proposed time is unreasonable for any participant.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**API:** Google Calendar API v3. OAuth2 credentials stored in environment variables.
**Scopes required:** calendar.readonly + calendar.events for read/write operations.
**Timezone:** All operations in Rafael's local timezone (currently Europe/Lisbon). Converted for display when participants in other timezones.
**Recurring events:** Read but not modified. Recurring event changes flagged to Rafael rather than automated.
**Buffer time:** All BLOCK_TIME operations add 15-minute buffers before and after. Prevents back-to-back blocks with no transition time.
**Free/busy:** For PROPOSE_MEETING_SLOT, free/busy data only — no reading of other participants' event details.

---

*Calendar & Scheduling Intelligence — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/calendar_scheduling.md*
