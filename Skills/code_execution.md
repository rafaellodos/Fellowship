# SKILL: CODE EXECUTION
## [[Fellowship]] Skill — Sandboxed Runtime Environment
### Lives at: /fellowship/skills/code_execution.md
### Available to: [[rick.id]] (primary), [[mr.robot.id]], [[meeseeks.id]]

---

## WHAT THIS SKILL IS

The ability to run code in a sandboxed environment and return the result. Not just write code — execute it, see what happens, debug what fails, iterate until it works, and deliver something confirmed functional rather than something that should work in theory.

Without this skill, [[rick.id]] writes code and hands it over. The gap between written and working is discovered later, downstream, often at the worst possible moment. With it, [[rick.id]] writes, runs, sees the result, fixes what breaks, runs again, and delivers confirmed working code. The build loop closes inside the [[Fellowship]] before anything reaches the real world.

[[mr.robot.id]] uses it to verify that security mitigations actually work — not just that they look correct in the source. [[meeseeks.id]] uses it for atomic data processing and verification tasks that require computation.

---

## AGENTS WITH ACCESS

| Agent | Primary Use |
|---|---|
| [[rick.id]] | Write → run → debug → deliver. The complete build loop in one agent. |
| [[mr.robot.id]] | Security verification — confirm that a patch actually prevents the vulnerability, not just that it looks like it should |
| [[meeseeks.id]] | Atomic computational tasks — data processing, format conversion, calculations, test execution |

---

## SUPPORTED RUNTIMES

| Language | Use Cases |
|---|---|
| Python | Data processing, API calls, automation scripts, analysis, Make.com/Airtable integrations |
| JavaScript / Node.js | Web tooling, Claude API calls, docx generation, JSON processing |
| Bash | File operations, system tasks, CLI tool execution |
| SQL | Data queries against structured datasets |

Additional runtimes added as the stack evolves. [[rick.id]] proposes additions via the evolution log when a project requires a runtime not on this list.

---

## HOW AGENTS CALL THIS SKILL

```
EXECUTE_CALL:
  Runtime: [python / javascript / bash / sql]
  Code: [the code to execute]
  Input: [any input data the code requires]
  Expected output: [what a successful run returns]
  Timeout: [seconds — default 30, max 120]
  Environment: [any environment variables required — names only, not values]
```

---

## [[rick.id]]'S EXECUTION PROTOCOL

[[rick.id]]'s build loop with this skill:

**WRITE** — [[rick.id]] writes the code to spec. One sentence problem restatement first — confirms he's solving the right problem before writing a line.

**RUN** — Execute against the expected input. Check the output against the expected output defined in the task spec.

**RESULT: PASS** — Output matches expected. [[rick.id]] documents what the code does, flags any edge cases to watch, delivers to output path.

**RESULT: FAIL** — Output doesn't match, error thrown, or unexpected behaviour. [[rick.id]] reads the error, identifies the cause — not the symptom — and fixes it. Reruns. Does not deliver until the code passes.

**RESULT: PARTIAL** — Code runs but produces unexpected output that might be acceptable. [[rick.id]] flags the discrepancy explicitly. Does not silently accept partial results as complete. [[fellowship of the raf .mk1/gandalf.id]] decides whether to accept or specify more precisely.

**Maximum iterations:** [[rick.id]] runs a maximum of five debug iterations before escalating to [[fellowship of the raf .mk1/gandalf.id]]. Five failed iterations means either the spec is wrong or the problem is harder than anticipated. Both require [[fellowship of the raf .mk1/gandalf.id]]'s assessment before proceeding.

---

## [[mr.robot.id]]'S EXECUTION PROTOCOL

[[mr.robot.id]] uses code execution for verification — proving that a security measure works, not just that it looks correct.

**Vulnerability verification:** Reproduce the vulnerability in the sandbox first. Confirm it exists. Then apply the mitigation. Run again. Confirm the vulnerability is closed. Both results — the pre-mitigation failure and the post-mitigation pass — are documented.

**This matters because:** A patch that looks correct in code review but doesn't actually close the vulnerability is worse than no patch. It creates false confidence. [[mr.robot.id]] never signs off on a security fix without running the confirmation test.

```
MR. ROBOT SECURITY TEST FORMAT:
PRE-MITIGATION:
  Test: [what was run]
  Result: [VULNERABLE — confirm the problem exists]

POST-MITIGATION:
  Test: [same test after fix applied]
  Result: [SECURE / STILL_VULNERABLE]

VERDICT: [CONFIRMED_FIXED / REQUIRES_FURTHER_WORK]
```

---

## [[meeseeks.id]] EXECUTION PROTOCOL

[[meeseeks.id]] uses code execution for atomic computational tasks — tasks that require a runtime to complete but don't require [[rick.id]]'s architectural judgement.

**Valid [[meeseeks.id]] code execution tasks:**
- Convert a data file from one format to another
- Run a defined calculation on a dataset
- Execute a defined test suite and return pass/fail
- Process a structured input through a defined transformation
- Validate that a data file meets a defined schema

**Invalid [[meeseeks.id]] code execution tasks:**
- Anything requiring architectural decisions
- Anything where the expected output isn't fully specified
- Anything requiring debugging beyond a single obvious fix
- Security-sensitive operations — those go to [[mr.robot.id]]

[[meeseeks.id]] receives the code pre-written by [[rick.id]] or [[fellowship of the raf .mk1/gandalf.id]]. He does not write code. He executes it, returns the result, flags failures. The distinction is critical — [[meeseeks.id]] runs, [[rick.id]] writes.

---

## SANDBOX CONSTRAINTS

The execution environment is sandboxed. Hard limits:

**No network access during execution** — code that requires external API calls during execution is handled differently. The API call is made by the [[Fellowship]]'s API integration layer, not inside the sandbox. This prevents runaway network calls and ensures all external interactions are logged.

**Exception:** API calls to the Claude API itself, the Anthropic platform, and explicitly whitelisted endpoints. [[Rick.ID]] flags when a piece of code requires network access — [[Fellowship of the Raf .MK1/Gandalf.ID]] approves before it runs.

**No persistent file system writes during execution** — code can read from the project directory. It cannot write to it directly. Outputs are returned by the execution environment and written to the project output path by the [[Fellowship]]'s file handling layer.

**No system-level operations** — no process spawning, no system calls that affect the host environment, no privilege escalation.

**Timeout enforced** — any execution that exceeds the specified timeout (default 30 seconds, max 120 seconds) is terminated. [[Rick.ID]] redesigns any solution that requires more than 120 seconds of runtime — that's an architectural problem, not a timeout problem.

---

## OUTPUT FORMAT

Every code execution returns a structured result to Aragorn:

```
EXECUTION RESULT:
  Status: [PASS / FAIL / TIMEOUT / ERROR]
  Runtime: [language and version]
  Execution time: [milliseconds]
  Output: [what the code returned]
  Error: [error message if status is FAIL or ERROR]
  Rick's assessment: [one sentence — what happened and what it means]
  Next action: [DELIVER / DEBUG / ESCALATE]
```

---

## WHAT NEVER RUNS

[[Rick.ID]] does not execute:
- Code that modifies production systems without explicit authorisation
- Code with destructive operations (delete, overwrite) without confirmation
- Code that exfiltrates data outside the [[Fellowship]] environment
- Obfuscated code — if [[Rick.ID]] can't read it, he doesn't run it

[[Mr. Robot.ID]] reviews any code before execution that touches security-sensitive operations, external APIs, or data handling. This is the same Rick-builds-Robot-audits workflow applied to execution, not just static review.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**Environment:** Claude Code's native code execution sandbox.
**Python:** Python 3.11+. Standard library plus: requests, pandas, json, csv, airtable-python-wrapper, anthropic SDK.
**JavaScript:** Node.js 20+. Standard library plus: docx, axios, airtable.js, @anthropic-ai/sdk.
**Output capture:** stdout and stderr both captured and returned in execution result.
**Environment variables:** Passed to sandbox from secure vault — never hardcoded in agent files or code.
**Logging:** Every execution logged to Aragorn with agent, code hash, result, and timestamp. Audit trail for all code runs in a project.

---

*Code Execution — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/code_execution.md*
