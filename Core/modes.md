# MODES
## Fellowship Operating Modes — Reference
### /core/modes.md
### Read by: Gandalf at project intake when MODE is AUTO

---

## THE THREE MODES

The fellowship operates at three levels of engagement. Mode is determined at intake by Gandalf reading the brief signals below. Rafael can override by setting MODE explicitly in `brief.md`. When AUTO, Gandalf logs the mode determination as the first entry in `log.md`.

```
SOLO          One agent. One session. One output.
              Gandalf + one specialist. Fast.
              No consultation round. No Socrates.
              Morty: quick pass only.
              No plan.md. Minimal log.

SQUAD         2–3 agents. One session. Coordinated output.
              Gandalf orchestrates a small team.
              No consultation round. No Socrates.
              Morty: standard review.
              Aragorn holds state. Simple Frodo entry on close.

FELLOWSHIP    Full protocol. All relevant agents.
              Consultation round. Morty full review.
              Socrates when triggered.
              plan.md written. Full log. Full Frodo entry.
              Model router runs on every dispatch.
```

---

## MODE DETERMINATION — SIGNAL LOGIC

Gandalf reads the brief and evaluates these signals in order.

### SOLO — all of the following must be true

```
[ ] Single output, single session — one thing produced, one sitting
[ ] One agent clearly owns the task — no handoff required
[ ] Internal only — output stays inside the fellowship, no client exposure
[ ] Reversible — if wrong, easy to redo with low cost of failure
[ ] No stakes flag — nothing in the brief suggests consequential risk
```

If all five are true → SOLO.
If any one fails → evaluate for SQUAD.

### SQUAD — any of the following is true, none of the FELLOWSHIP signals present

```
[ ] 2–3 agents needed — clear handoff between specialists
[ ] Multi-step but single session — sequential or parallel tasks, done today
[ ] Some client exposure OR moderate stakes — not irreversible, but not trivial
[ ] Output informs a decision — not the decision itself
```

If any SQUAD signal is present and no FELLOWSHIP signal → SQUAD.

### FELLOWSHIP — any of the following is true

```
[ ] Multi-session — work spans more than one sitting
[ ] Client-facing final deliverable — going directly to Rafael's client
[ ] Irreversible action or decision — financial, legal, reputational
[ ] Genuinely high stakes — Morty or Socrates would flag this
[ ] Four or more agents required
[ ] Rafael explicitly requested FELLOWSHIP mode
[ ] SQUAD run that Morty flagged HELD or ESCALATED mid-execution
```

If any FELLOWSHIP signal is present → FELLOWSHIP, regardless of other signals.

---

## WHAT EACH MODE RUNS

### SOLO PROTOCOL

```
1. Gandalf reads brief
2. Gandalf reads relevant workspace context.md
3. Gandalf reads relevant Legolas slices (voice, preferences if needed)
4. Model router assigns tier for the single agent
5. Morty: quick pass — 60 seconds, flags only if a hard-coded
   escalation category is triggered (harm / legal / irreversible / insufficient info)
   If flagged → upgrade to SQUAD or FELLOWSHIP immediately
6. Gandalf dispatches single agent with scoped context + model tier
7. Agent produces output to /outputs/[agent]/
8. Gandalf reviews output — is it complete? Does it meet the brief?
9. If yes → deliver. If no → one revision cycle, then deliver or escalate.
10. Minimal log entry: task, agent, model tier, output path, done.
11. No Frodo entry unless output is reusable knowledge worth indexing.
```

**What SOLO does not run:**
- Consultation round
- Socrates
- plan.md
- Full Morty review
- Aragorn state management (output goes direct to /outputs/)
- Full Frodo close protocol

### SQUAD PROTOCOL

```
1. Gandalf reads brief
2. Gandalf reads relevant workspace context.md + Frodo for prior patterns
3. Gandalf reads relevant Legolas slices
4. Gandalf identifies 2–3 agents and the handoff sequence
5. Model router assigns tier per agent
6. Morty: standard review of the task plan
   CLEARED → proceed
   CLEARED WITH FLAGS → proceed, log flags
   HELD → resolve before dispatch or upgrade to FELLOWSHIP
7. Gandalf dispatches agents in sequence — each receives prior agent's
   output as context input
8. Aragorn holds session state during the run
9. Gandalf synthesises outputs into final deliverable
10. Simple log entry to log.md
11. Simple Frodo close entry: project name, agents, output, one-line outcome
12. Aragorn cleared
```

**What SQUAD does not run:**
- Consultation round
- Socrates (unless Morty flags something that triggers Socrates deployment)
- plan.md (plan lives in Aragorn, not written to disk)
- Full logging protocol
- Evolution assessment (unless an agent performed notably well or poorly)

### FELLOWSHIP PROTOCOL

Full protocol as defined in `/core/fellowship.md`. No abbreviation.

---

## MID-RUN UPGRADES

Modes upgrade. They never downgrade mid-run.

**SOLO → SQUAD triggers:**
- Agent output reveals a second agent is needed to complete the task properly
- Morty's quick pass flags a hard-coded escalation category
- Output quality requires a review agent before delivery

**SQUAD → FELLOWSHIP triggers:**
- Morty returns HELD or ESCALATED
- Task reveals it will require more than one session
- A client deliverable emerges from what looked like internal work
- Four or more agents become necessary
- An irreversible action is required

**On upgrade:**
- Log the upgrade trigger as the next entry in log.md
- Carry forward everything already in Aragorn
- Do not restart — continue from current state under new protocol
- Notify Rafael if upgrading to FELLOWSHIP from SQUAD mid-run

---

## EXAMPLES

**SOLO examples:**
- Draft a follow-up email to a contractor → Chinaski, Mid
- Tag these 20 contacts as client / prospect / other → Meeseeks, Fast
- Summarise this article for my reference → Pippin, Fast
- Write three subject line options for the AvenoirTech campaign → Chinaski, Mid
- Find the pricing for Vapi.ai enterprise tier → Meeseeks + web_search, Fast

**SQUAD examples:**
- Research Orlando AI competitors and draft positioning copy → Archer → Chinaski
- Audit the Make.com automation and fix the broken step → Mr. Robot → Rick
- Pull the CRM log for this client and draft a re-engagement email → Harvey → Chinaski
- Transcribe this voice note and turn it into a project brief → Pippin → Gandalf review

**FELLOWSHIP examples:**
- Build the AvenoirTech client onboarding system
- Produce the Inspiracy proposal for this £10k engagement
- Design the fellowship dashboard (multi-session build)
- Strategic assessment of whether to enter a new market
- Any project where being wrong costs real money or real relationships

---

## COST PROFILE PER MODE

Approximate relative cost per run, assuming typical task size:

```
SOLO        1x       One agent, Fast or Mid tier, minimal overhead
SQUAD       3–5x     2–3 agents, Mid tier, light coordination
FELLOWSHIP  15–30x   Full roster, Frontier where warranted, full protocol
```

The fellowship costs nothing at SOLO scale compared to what it costs at FELLOWSHIP scale. Use this deliberately — SOLO for the daily operational work, FELLOWSHIP for the things that genuinely warrant it. The system pays for itself in the delta between cheap daily tasks and expensive consequential ones.

---

*Modes — Fellowship Operating Reference*
*Version 1.0 — 2026-03-16*
*Lives at /core/modes.md*
