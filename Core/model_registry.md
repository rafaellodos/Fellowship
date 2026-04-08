# MODEL REGISTRY
## Environment-Specific Model Mapping
### /core/model_registry.md
### Read by: Gandalf at session start
### UPDATE THIS FILE when models change — not the router

---

## CURRENT ENVIRONMENT

**Platform:** Windsurf (Cascade)
**Plan:** Free tier + Claude Pro (BYOK)
**Last verified:** 2026-03-16

---

## TIER MAPPINGS

```
FRONTIER → claude-opus-4         (Claude Pro BYOK)
           Best available reasoning. Client-facing, high-stakes,
           irreversible decisions. Use deliberately.
           Cost: Claude Pro allowance (not Windsurf credits)

MID      → claude-sonnet-4-6     (Claude Pro BYOK)  [PRIMARY]
           Workhorse. Most fellowship tasks land here.
           Good reasoning, voice fidelity, structured output.
           Cost: Claude Pro allowance (not Windsurf credits)

FAST     → SWE-1-Lite            [PRIMARY]
           Zero credits. Unlimited. Available on all plans.
           Classification, extraction, routing, atomic tasks.
           Optimised for coding tasks — excellent for Rick's
           simpler builds, Mr. Robot's basic scans, Meeseeks.
           Cost: FREE — use aggressively for eligible tasks
```

---

## AVAILABLE ALTERNATES

```
MID alternate    → SWE-1.5 (FREE until ~2026-06, then paid)
                   Near-frontier coding performance at zero cost
                   while the free period lasts. Use for build
                   tasks (Rick, Mr. Robot) where coding depth
                   matters but voice fidelity does not.
                   NOTE: Free period ends — do not hard-depend on this.

MID alternate    → qwen2.5-32b-instruct (SELF-HOSTED)
                   Strong reasoning and coding capabilities. 
                   Local deployment, privacy-focused, zero API costs.
                   Use for MID-tier tasks when offline or privacy required.
                   Requires local GPU/resources. Good for Rick, Mr. Robot.

MID alternate    → SWE-1 (paid — requires Windsurf Pro credits)
                   Strong coding model. Reserve for when Claude
                   BYOK allowance is running low and task is
                   build/code-specific.

FAST alternate   → qwen2.5-7b-instruct (SELF-HOSTED)
                   Lightweight local model for classification,
                   extraction, routing tasks. Zero cost, offline.
                   Use for Meeseeks, Merry/Pippin basic tasks.

FAST alternate   → SWE-1-mini
                   Powers Tab completions. Ultra-low latency.
                   Not suitable for fellowship agent tasks —
                   too shallow for any reasoning requirement.
                   Do not route fellowship agents here.
```

---

## ROUTING DECISION TREE FOR THIS ENVIRONMENT

```
Task requires FAST tier?
  ├─ Self-hosted Qwen available? → qwen2.5-7b-instruct (offline, zero cost)
  └─ Otherwise → SWE-1-Lite (free, unlimited)

Task requires MID tier?
  ├─ Is it primarily a coding / build task? (Rick, Mr. Robot)
  │   ├─ Privacy/offline needed? → qwen2.5-32b-instruct (self-hosted)
  │   ├─ SWE-1.5 while free → claude-sonnet-4-6 after free period
  │   └─ Claude allowance low? → qwen2.5-32b-instruct (self-hosted)
  └─ Is it writing, strategy, voice, or reasoning? (Harvey, Chinaski, Archer, Morty)
      └─ claude-sonnet-4-6 (BYOK) — voice and reasoning quality matters

Task requires FRONTIER tier?
  └─ claude-opus-4 (BYOK)
     Only when router assigns FRONTIER. Gandalf, Socrates,
     Mr. Robot on high-stakes audits, client-facing final deliverables.
```

---

## AGENT-SPECIFIC NOTES FOR THIS ENVIRONMENT

**Rick:** SWE-1.5 is genuinely excellent for his function — purpose-built for software engineering. Use SWE-1.5 for MID-tier Rick tasks while the free period lasts. Fall back to claude-sonnet-4-6 after.

**Mr. Robot:** SWE-1.5 for code-level security reviews (understands codebases well). claude-sonnet-4-6 or claude-opus-4 for legal/compliance reasoning — SWE models are coding-optimised, not legal-reasoning-optimised.

**Chinaski:** Always claude-sonnet-4-6 at minimum. Voice fidelity requires a model trained on rich language data. SWE models are not appropriate for Chinaski tasks regardless of tier assignment.

**Meeseeks:** SWE-1-Lite for all atomic tasks. He executes fully-specified tasks — zero reasoning overhead required. Free and unlimited is the right profile.

**Merry / Pippin:** SWE-1-Lite for classification and ingestion. Pushes to claude-sonnet-4-6 only when Pippin is interpreting complex unstructured content that requires genuine reasoning.

---

## CREDIT AWARENESS

Windsurf credits apply only to non-BYOK models. Your Claude Pro BYOK usage does not consume Windsurf credits — it consumes your Claude Pro allowance.

```
Claude Pro allowance burns:        Claude Pro BYOK calls (Opus, Sonnet)
Windsurf credits burn:             SWE-1, SWE-1.5, GPT models, Gemini (if used)
Zero cost, no limits:              SWE-1-Lite, SWE-1-mini (Tab only)
```

**Practical implication:** FAST tier tasks on SWE-1-Lite are genuinely free and unlimited. Route aggressively to FAST for every eligible task. This preserves Claude Pro allowance for the tasks that actually require Claude's specific strengths — voice, reasoning, strategy.

**When Claude Pro allowance runs low mid-project:**
- Downgrade MID coding tasks from claude-sonnet-4-6 to SWE-1.5 (while free)
- Do not downgrade voice/reasoning tasks — quality impact is real
- Log the constraint in Aragorn
- Escalate to Rafael if FRONTIER tasks are queued and allowance is near limit

---

## MODELS NOT TO USE FOR FELLOWSHIP TASKS

```
SWE-1-mini     Too shallow. Tab completions only. Not suitable for
               any fellowship agent task.

GPT models     Available in Windsurf but not on your current setup.
               Don't route here unless explicitly added to this registry.

Gemini models  Same — available in Windsurf, not your current setup.
```

---

## HOW TO UPDATE THIS FILE

When any of the following change, update this file only:
- A model is deprecated or renamed
- A new model becomes available in your environment
- The SWE-1.5 free period ends
- You add API keys for additional providers
- You change environments (e.g. move from Windsurf to Claude Code)

Do not update `/core/model_router.md` — the router logic is environment-agnostic.
Do not update agent identity files — they reference tiers, not model names.
This file is the only place model names live.

---

## VERSION HISTORY

| Date | Change |
|---|---|
| 2026-03-16 | Initial registry. Windsurf free + Claude Pro BYOK. |
| 2026-03-29 | Added Qwen self-hosted models (qwen2.5-7b-instruct, qwen2.5-32b-instruct) for offline/privacy operations. |

---

*Model Registry — Fellowship Infrastructure*
*Version 1.0 — 2026-03-16*
*Lives at /core/model_registry.md*
*Update this file when models change. Never update the router.*
