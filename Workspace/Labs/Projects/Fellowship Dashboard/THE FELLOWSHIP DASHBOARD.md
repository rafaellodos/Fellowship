

_Master Build Document_

PROJECT: fellowship-dashboard

  

  

_Processed through the full Fellowship strategy cycle._

_Gandalf · Socrates · Morty · Rick · Mr. Robot · Harvey · Archer · Chinaski_

  

  

  

Version 1.0  ·  2026-03-16

**01 — PROJECT RECORD**

**Project name:** **fellowship-dashboard**

**Type:** **Multi-domain: Build + Strategy + Content + High-stakes decision**

**Run mode:** **FULL — multi-session, multi-agent, consequential technical and strategic decisions**

**Initiated:** **2026-03-16**

**Status:** **PLAN APPROVED — Ready for execution**

  

**Brief Summary**

**Build a unified dashboard application for the Fellowship of the Raf that provides Rafael Lodos with three integrated surfaces: a conversational chat interface to Gandalf, a live dashboard of all active projects and agent status, and a brief submission form that feeds the fellowship intake protocol. The system must feel like a single coherent tool, not a collection of connected services. Gandalf speaks. The fellowship operates in the background. Rafael sees what matters.**

  

**Success Criteria**

- Chat surface: Rafael can converse with Gandalf naturally. Gandalf orchestrates the fellowship in the background and returns synthesised responses. No raw agent output visible unless Rafael explicitly requests it.
- Dashboard surface: Active projects displayed with status, assigned agents, current stage, and last activity. Evolution log and weekly pulse accessible. No manual refresh required.
- Brief surface: Rafael submits a project brief using a structured form. The brief is automatically validated against the project schema, written to the correct directory, and triggers Gandalf's intake protocol.
- Unified: All three surfaces in one application. Single authentication. Single state. Gandalf's voice consistent across all interactions.
- Persistent: Conversation history, project state, and fellowship memory persist across sessions via the storage layer.

**02 — FELLOWSHIP STRATEGY CYCLE**

**The following records the full fellowship consultation as it was run on this project brief. Each agent's input is preserved verbatim as it would appear in the project log.**

  

**Gandalf — Problem Reframe**

**_"The stated problem is: build a dashboard. The actual problem is: Rafael needs a single interface that makes the fellowship feel like one coherent intelligence rather than a file system he has to navigate manually. The dashboard is the product. The real goal is reducing the friction between Rafael's intent and the fellowship's execution to near zero. We are not building a project management tool. We are building the face of a multi-agent operating system. That distinction shapes every decision downstream."_**

  

**Gandalf — Assumption Stress-Test**

- ASSUMPTION: The app needs to be built on external infrastructure. STATUS: Unverified. A Claude artifact with persistent storage may be sufficient for MVP and significantly faster to deploy. Both paths assessed below.
- ASSUMPTION: Gandalf as chat interface means full real-time orchestration. STATUS: Acceptable risk at MVP. Synchronous responses acceptable initially. Streaming and async orchestration deferred to Phase 2.
- ASSUMPTION: All three surfaces (chat, dashboard, brief) must ship together. STATUS: Challenged. Brief + Dashboard can ship without full chat in Phase 1 if necessary. Chat is the highest complexity surface.
- ASSUMPTION: The fellowship file system is the backend. STATUS: Confirmed. Persistent storage maps directly to Frodo, Aragorn, and project directories.

  

**Archer — Opportunity Scan**

**_"The obvious build is a React app calling the Claude API. The non-obvious angle: Claude artifacts with persistent storage already exist and are proven. The fellowship can run inside Claude.ai itself, with the artifact as the interface and the storage API as Frodo. That's a zero-infrastructure path to a working system in hours not weeks. The interesting finding: this also means the fellowship app is self-demonstrating — it runs on the same platform it's built for. Relevance check: HIGH. This is the most relevant and the most interesting find simultaneously."_**

  

**Harvey — Strategic Assessment**

**_"Two paths with real strategic difference. Path A: Claude artifact now — working prototype this week, demonstrates the concept, teaches you what you actually need before committing to infrastructure. Path B: Supabase + Claude API + Cursor — production system, no ceiling, takes longer. The strategic move is Path A first. Not because Path B is wrong but because Path A produces the intelligence that makes Path B better. You don't know what the dashboard needs to be until you've used it for a month. Build the prototype to discover the requirements. Build the production system from informed requirements."_**

  

**Rick — Technical Assessment**

**_"Archer's angle is architecturally correct. Persistent storage in artifacts handles Frodo. Claude API calls handle Gandalf. React handles all three surfaces in a single component. The constraint: no localStorage, state lives in the storage API. The opportunity: the docx skill we already proved in this session means document generation works out of the box. My recommendation: single-file React artifact, Anthropic API for Gandalf, persistent storage for all fellowship state. Phase 1 builds the UI and the chat surface. Phase 2 adds real-time project tracking. Phase 3 migrates to Supabase when the prototype has proven the model."_**

  

**Mr. Robot — Security Assessment**

**_"Three concerns. First: API key exposure — the artifact cannot safely store the Anthropic API key client-side. This requires the API calls to route through a backend proxy in Phase 2. For Phase 1 prototype, user provides their own API key at session start — acceptable for personal use, not for production. Second: persistent storage is user-scoped but not encrypted — do not store sensitive client data in Frodo until encryption is confirmed. Third: the approval queue for email send requires explicit send confirmation in the UI — no auto-send path. All three are addressable. None block Phase 1."_**

  

**Socrates — Interrogation Record**

**_"Before we build the face of the fellowship, I want to ask what we are assuming about the relationship between the interface and the intelligence behind it. The question beneath the question: are we building a tool for Rafael, or are we building a performance of the fellowship for Rafael? The distinction matters because a tool optimises for function. A performance optimises for the feeling of function. The risk in building the chat interface first is that we optimise for Gandalf sounding impressive rather than Gandalf being useful. The question I want answered before execution: what does Rafael actually do in the first five minutes of a session with this app? If we cannot describe that concretely, we are building for a fantasy user. Build the brief submission first. That is where Rafael's actual intent enters the system. Everything else serves that."_**

  

**Socrates' unresolved question carried into execution: What does Rafael actually do in the first five minutes? Brief submission is prioritised accordingly in Phase 1.**

  

**Morty — Ethics Review**

**Status:** **CLEARED WITH FLAGS**

- FLAG (MEDIUM): Email send capability in the UI. The approval queue must be visually prominent — accidental bulk approve is a reputational risk. UI design must make each email's content visible before approval is possible. MITIGATION: Approval queue shows full email content expanded by default. Bulk approve requires a confirmation step.
- FLAG (LOW): Persistent storage holds relationship and project data. Privacy notice to Rafael on first use: what is stored, where, and that it persists across sessions. MITIGATION: First-run modal with storage disclosure.
- FLAG (LOW): Gandalf speaking with authority in the chat interface. Users of this tool (currently only Rafael) should not mistake Gandalf's synthesised outputs for ground truth without verification on high-stakes decisions. MITIGATION: Gandalf includes uncertainty signals in responses when appropriate — already in gandalf.md.

**03 — SYSTEM ARCHITECTURE**

**Phase Structure**

**The build is three phases. Each phase is functional on its own and builds toward the next. No phase starts until the prior one is confirmed working.**

  

|   |   |   |   |
|---|---|---|---|
|**Phase**|**Name**|**What ships**|**Infrastructure**|
|**1**|Prototype|Brief submission + Dashboard + Basic Gandalf chat|Claude Artifact + Persistent Storage|
|**2**|Production|Full Gandalf orchestration + Email queue + Calendar|Supabase + Claude API + Backend proxy|
|**3**|Scale|Semantic search + Deep research + API integration layer|Full fellowship stack|

  

  

**Phase 1 Architecture — Claude Artifact**

**Single React component. All state managed in React hooks and the persistent storage API. Claude API calls made directly from the component using the user's API key (stored in session state only, never persisted). Three views rendered conditionally based on active tab.**

  

**FELLOWSHIP APP — PHASE 1 COMPONENT MAP**

**<FellowshipApp>**

  **├── <NavBar>          ← Tab navigation: Chat | Dashboard | Brief**

  **├── <ChatView>        ← Gandalf conversation interface**

  **│   ├── <MessageThread>  ← Conversation history**

  **│   └── <InputBar>       ← User input + send**

  **├── <DashboardView>   ← Active projects + fellowship status**

  **│   ├── <ProjectCards>   ← One card per active project**

  **│   ├── <AgentStatus>    ← Which agents are active**

  **│   └── <PulsePanel>     ← Latest weekly pulse summary**

  **└── <BriefView>       ← Project brief submission form**

      **├── <BriefForm>      ← All six brief fields + type signals**

      **└── <ValidationBar>  ← Checks minimum valid state before submit**

**STORAGE LAYER (window.storage)**

  **fellowship:projects    ← All project records (Frodo)**

  **fellowship:chat        ← Conversation history**

  **fellowship:pulse       ← Latest weekly pulse**

  **fellowship:agents      ← Agent status + version registry**

  **fellowship:settings    ← User preferences + API key flag**

  

  

**Phase 2 Architecture — Production**

**Supabase as the backend database replacing the storage API. Claude API calls proxied through a serverless backend (Supabase Edge Functions) to protect the API key. The React frontend communicates with the backend rather than calling Anthropic directly. All fellowship memory, project state, and conversation history stored in Supabase tables.**

  

**PHASE 2 STACK**

**Frontend:   React app (Vite) deployed on Vercel**

**Backend:    Supabase Edge Functions (API proxy + auth)**

**Database:   Supabase Postgres**

            **├── projects         ← Frodo episodic store**

            **├── conversations     ← Chat history**

            **├── agents            ← Agent registry + versions**

            **├── evolution_log     ← Agent update history**

            **├── email_queue       ← Approval queue**

            **└── contacts          ← CRM (Harvey + Merry)**

**Auth:       Supabase Auth (single user — Rafael only)**

**AI:         Anthropic Claude API (proxied)**

**Email:      Gmail API via Supabase Edge Function**

**Calendar:   Google Calendar API via Supabase Edge Function**

**04 — PHASE 1 BUILD PLAN**

**Phase 1 is a Claude artifact. It runs inside Claude.ai. It demonstrates the full fellowship interface with persistent memory. Rick builds this. Mr. Robot reviews it. It ships when it passes the definition of done.**

  

**Agent Assignments**

|   |   |   |
|---|---|---|
|**Agent**|**Task**|**Deliverable**|
|**Rick**|Build the complete Phase 1 React artifact — all three views, storage integration, Claude API chat|fellowship_dashboard.jsx — single file, fully functional|
|**Mr. Robot**|Security review of the artifact — API key handling, storage exposure, send confirmation gate|Security report + approved build|
|**Chinaski**|Write all Gandalf UI copy — empty states, loading messages, onboarding text, error states|copy_fellowship_ui.md|
|**Meeseeks x3**|(1) Write storage schema — all keys and data shapes. (2) Write test brief for validation testing. (3) Document all component props.|storage_schema.md, test_brief.md, component_props.md|

  

  

**Task Graph**

**_TASK 1 — Storage Schema (Meeseeks)_**

**_Agent:_** **_Meeseeks_**

**_Input:_** **_Fellowship file system structure, project schema, fellowship.md_**

**_Output:_** **_storage_schema.md — every storage key, data shape, read/write agents_**

**_Depends on:_** **_NONE — runs first_**

**_Success criteria:_** **_Every storage key defined with type, structure, and which agents read/write it_**

  

**_TASK 2 — UI Copy (Chinaski)_**

**_Agent:_** **_Chinaski_**

**_Input:_** **_gandalf.md, fellowship.md, this build document_**

**_Output:_** **_copy_fellowship_ui.md — all UI text in Gandalf's register_**

**_Depends on:_** **_NONE — runs parallel with Task 1_**

**_Notes:_** **_Chinaski writes all empty states, onboarding, loading messages, error states, and Gandalf's greeting. The UI should sound like Gandalf, not like a SaaS product._**

**_Success criteria:_** **_Every UI text element covered. No generic placeholder copy anywhere in the app._**

  

**_TASK 3 — React Artifact Build (Rick)_**

**_Agent:_** **_Rick_**

**_Input:_** **_Tasks 1 + 2 outputs, this build document Section 05 (component specs), Section 06 (UI requirements)_**

**_Output:_** **_fellowship_dashboard.jsx — complete single-file React artifact_**

**_Depends on:_** **_Tasks 1 and 2_**

**_Parallel with:_** **_Nothing — this is the critical path_**

**_Notes:_** **_Rick reads the component specs in Section 05 completely before writing a line. He reads the UI requirements in Section 06 completely before writing a line. He confirms his one-sentence problem restatement before starting. Max five debug iterations before escalating to Gandalf._**

**_Success criteria:_** **_All three views functional. Storage reads and writes confirmed. Claude API chat working. Passes Mr. Robot security review._**

  

**_TASK 4 — Security Review (Mr. Robot)_**

**_Agent:_** **_Mr. Robot_**

**_Input:_** **_Task 3 output_**

**_Output:_** **_security_review_dashboard.md + approved or revised artifact_**

**_Depends on:_** **_Task 3_**

**_Notes:_** **_Mr. Robot reviews specifically: API key handling, storage exposure, email approval gate prominence, any data that should not be persisted. Verification model — not trust._**

**_Success criteria:_** **_No HIGH severity findings unresolved. MEDIUM findings documented with mitigations. Build approved for delivery._**

  

**_TASK 5 — Component Props Documentation (Meeseeks)_**

**_Agent:_** **_Meeseeks_**

**_Input:_** **_Task 3 output (completed artifact)_**

**_Output:_** **_component_props.md — all components, their props, and state dependencies_**

**_Depends on:_** **_Task 3_**

**_Notes:_** **_This documentation enables Phase 2 migration. Without it, every component must be reverse-engineered._**

**_Success criteria:_** **_Every component documented with props, state dependencies, and storage keys it reads/writes._**

**05 — COMPONENT SPECIFICATIONS**

**Rick reads this section completely before building. These are not suggestions. They are the functional requirements for each component.**

  

**App Shell**

- Single React component with three views managed by useState tab navigation
- NavBar: three tabs — Chat, Dashboard, Brief. Active tab highlighted with accent colour. Fellowship name as header.
- First run detection: if fellowship:settings key does not exist in storage, show onboarding modal before rendering any view
- API key: requested on first run, stored in session state (React state only — never in window.storage). If not present, chat is disabled with clear message.
- Responsive: functional at minimum 320px width. Optimised for desktop.

  

**Chat View**

- Message thread: scrollable, newest message at bottom. Auto-scrolls on new message.
- Each message: avatar indicator (G for Gandalf, R for Rafael), timestamp, message content. Gandalf messages render markdown.
- Input bar: textarea (not input — allows multiline), send button, character limit indicator at 2000 chars.
- Loading state: Gandalf avatar with animated indicator while API call in progress. Loading message from Chinaski copy.
- System prompt: full gandalf.md content passed as system prompt on every API call. Conversation history passed as messages array (last 20 exchanges maximum).
- Storage: conversation history written to fellowship:chat on every message. Loaded on mount.
- Empty state: Chinaski-written Gandalf greeting. Not generic. Reads like Gandalf.
- Error state: API failure handled gracefully. Error message in Gandalf's voice. Retry option.

  

**Dashboard View**

- Projects panel: reads fellowship:projects from storage. One card per project.
- Project card: project name, type, status badge (PLANNING / ACTIVE / COMPLETE / HELD), assigned agents as small badges, last updated timestamp, brief summary (first 100 chars of brief).
- Agent status panel: reads fellowship:agents. Shows each agent name, current version, last deployed date. Colour-coded: green = recently active (last 7 days), grey = inactive.
- Weekly pulse panel: reads fellowship:pulse. Shows latest pulse summary if exists. Shows "No pulse yet" state if empty.
- Evolution log link: button that expands evolution log entries from fellowship:agents storage. Sorted newest first.
- Refresh: manual refresh button. No auto-polling in Phase 1.
- Empty state: clean message explaining the dashboard populates as projects are submitted.

  

**Brief View**

- Form with six sections matching project schema: WHAT I WANT, WHY THIS MATTERS, CONTEXT, CONSTRAINTS, SUCCESS CRITERIA, TYPE SIGNALS.
- TYPE SIGNALS: rendered as checkboxes matching the project schema type list.
- Validation bar: real-time validation of minimum required fields (what, why, constraints, success criteria). Shows incomplete fields. Submit button disabled until valid.
- Project name: auto-generated from first five words of WHAT I WANT field. Editable.
- Submit: on submit, write complete brief to fellowship:projects storage under the project name key. Show confirmation. Offer to open Chat view to brief Gandalf directly.
- Draft save: auto-saves draft to fellowship:settings:draft_brief every 30 seconds. Restores draft on return to Brief view.
- Clear: clears form and draft. Requires confirmation.

  

**Onboarding Modal**

- Shown on first run only. Three screens.
- Screen 1: Welcome from Gandalf. Chinaski-written. Sets the register.
- Screen 2: API key entry. Explanation of where to find it and that it stays in session only.
- Screen 3: Storage disclosure (Morty flag mitigation). What is stored, that it persists, how to clear it.
- Completion: writes fellowship:settings with onboarded: true. Modal never shows again.

**06 — UI REQUIREMENTS**

**These requirements come from Chinaski and Archer jointly. The interface must feel like Rafael is talking to an intelligence, not operating a tool. The aesthetic serves that feeling. Nothing generic.**

  

**Visual Design**

- Colour palette: dark background (#1A1A2E), gold accent (#C9A84C), parchment for cards (#F5F0E8). The fellowship palette established in the architecture document.
- Typography: Georgia for all body and heading text. Courier New for code, project names, and system identifiers. Never Inter, Roboto, or system fonts.
- Agent badges: each agent rendered as a small coloured pill with their name. Consistent colour per agent across all views. Colour map defined in the component.
- Status badges: colour-coded. PLANNING (blue), ACTIVE (gold), COMPLETE (green), HELD (red). Clear and immediate.
- Cards: subtle shadow, light parchment fill, gold left border accent. Not flat. Not elevated dramatically. Grounded.
- Animations: message arrival in chat fades in. Tab transitions cross-fade. Loading indicator pulses. Nothing gratuitous.

  

**Voice and Copy**

**Chinaski owns all copy. Every empty state, loading message, error state, onboarding screen, and confirmation message is written by Chinaski before Rick builds. Rick does not write placeholder copy. Placeholder copy ships and never gets replaced.**

  

**The register: direct, dry, occasionally dry-humoured. Gandalf does not say "Loading..." He says something that sounds like him. Chinaski's copy brief is in Task 2. Rick waits for it.**

  

**Interaction Principles**

- Gandalf speaks, not the app. All system messages are in Gandalf's voice. The app is transparent — the intelligence is the experience.
- Brevity in the UI. Labels are minimal. Actions are obvious. Nothing explained that can be shown.
- State is visible. Rafael always knows what's happening: which project is active, which agents are deployed, whether Gandalf is thinking.
- Approval gates are prominent. The email approval queue (Phase 2) will be the most consequential UI in the app. It is never hidden behind a small button. It has its own panel.
- Errors are honest. When something fails, the error message says what failed and what Rafael can do. Not "An error occurred."

**07 — STORAGE SCHEMA**

**All Phase 1 data lives in window.storage via the persistent storage API. This schema is the authoritative definition. Meeseeks Task 1 produces the detailed version. This section is the reference.**

  

|   |   |   |   |
|---|---|---|---|
|**Key**|**Type**|**Written by**|**Contains**|
|fellowship:projects|JSON object|Brief View, Gandalf|All project records — keyed by project name|
|fellowship:chat|JSON array|Chat View|Conversation history — last 100 messages|
|fellowship:agents|JSON object|App init, Evolution log|Agent registry, versions, last deployed|
|fellowship:pulse|JSON object|Reflection skill|Latest weekly pulse content|
|fellowship:evolution|JSON array|Gandalf post-project|Evolution log entries|
|fellowship:settings|JSON object|Onboarding, preferences|onboarded flag, preferences, draft brief|

  

  

**Project Record Schema**

**Each project stored under fellowship:projects:[project-name]**

**{**

  **"name": "project-name",**

  **"created": "ISO timestamp",**

  **"status": "PLANNING | ACTIVE | COMPLETE | HELD",**

  **"type": ["build", "strategy", ...],**

  **"brief": {**

    **"what": "string",**

    **"why": "string",**

    **"context": "string",**

    **"constraints": "string",**

    **"success_criteria": "string",**

    **"type_signals": ["string"]**

  **},**

  **"agents_assigned": ["Gandalf", "Rick", ...],**

  **"last_updated": "ISO timestamp",**

  **"summary": "string — 100 chars for dashboard card",**

  **"log": ["string — log entries array"]**

**}**

**08 — PHASE 2 MIGRATION PLAN**

**Phase 2 migrates the prototype to production infrastructure. This section is the forward plan. It is not executed until Phase 1 is running and has been used for a minimum of two weeks. The two-week requirement is not arbitrary — it is how long it takes to discover what the prototype got wrong.**

  

**Migration Triggers**

**Phase 2 begins when any of the following are true:**

- The fellowship:storage keys exceed 4MB — approaching the storage API limit
- Rafael needs to access the dashboard from outside Claude.ai
- The email send skill (Tier 2) needs to be activated — requires a backend
- The CRM read/write skill needs live Airtable access from the dashboard
- Two weeks have passed and the prototype is in daily use

  

**Phase 2 Stack**

- Frontend: React app (Vite) — same component structure as Phase 1, extracted from artifact format. Deployed on Vercel.
- Backend: Supabase Edge Functions — API proxy for Claude API calls, Gmail API, Calendar API, Airtable API. Credentials live here, never in the frontend.
- Database: Supabase Postgres — tables matching the storage schema above. Row-level security enabled. Single user.
- Auth: Supabase Auth — email/password for Rafael only. No public signup.
- Migration: window.storage data exported as JSON and imported to Supabase tables. Rick writes the migration script in Phase 1 as Task 5 deliverable.

  

**Phase 2 New Features**

- Email approval queue panel — requires backend proxy for Gmail API
- Calendar view integrated into Dashboard — shows Rafael's week alongside active projects
- Real-time project updates — Supabase realtime subscriptions replace manual refresh
- Gandalf streaming responses — Claude API streaming for more responsive chat
- Agent deployment visibility — see which agents Gandalf has dispatched in real time
- Reflection scheduler — weekly pulse auto-generated on Monday morning

**09 — DEFINITION OF DONE**

**Phase 1 — Complete when all of the following are true**

1. Chat view: Rafael sends a message, Gandalf responds in character, response is stored in fellowship:chat, conversation loads on next session.
2. Dashboard view: A submitted brief appears as a project card. Agent status panel shows current versions from fellowship.md. No console errors.
3. Brief view: All six fields complete, type signals selectable, validation prevents submission of incomplete brief, confirmed brief writes to fellowship:projects.
4. Onboarding: First-run modal completes, API key stored in session state, storage disclosure accepted, onboarded flag written to fellowship:settings.
5. Mr. Robot security review: APPROVED status. No HIGH severity findings unresolved.
6. Chinaski copy: Every UI text element replaced with Chinaski's copy. Zero generic placeholder text in the delivered build.
7. Storage: All fellowship:* keys write and read correctly. Data persists across sessions.

  

**Phase 2 — Complete when all of the following are true**

1. Frontend deployed on Vercel. Accessible from any browser without Claude.ai.
2. All Phase 1 functionality working on production infrastructure.
3. Email approval queue: drafts visible, approve / edit / reject functional, send confirmed via Gmail API.
4. Supabase Auth: login functional, session persistent, no unauthenticated access to any data.
5. Data migration: all Phase 1 storage data successfully imported to Supabase.
6. Mr. Robot security review: APPROVED on production build.

  

**Project Complete When**

**Phase 1 has been in daily use for two weeks. Phase 2 migration has been triggered by one of the defined triggers. Or Rafael explicitly signs off that Phase 1 meets his needs and Phase 2 is deferred.**

**Frodo updated. Evolution log updated. Aragorn cleared.**

**10 — RISK REGISTER**

|   |   |   |   |
|---|---|---|---|
|**Risk**|**Likelihood**|**Consequence**|**Mitigation**|
|Storage API limit hit before Phase 2 migration|MEDIUM|HIGH|Monitor storage size in Dashboard. Alert at 3MB. Migration plan already written.|
|API key exposed client-side in Phase 1|LOW|HIGH|API key stored in React state only. Never written to window.storage. Mr. Robot confirms in security review.|
|Gandalf context window exceeded in long conversations|MEDIUM|MEDIUM|Chat view passes last 20 messages only. System prompt is fixed size. Monitor and reduce if quality degrades.|
|Rick solves the wrong problem (fatal flaw)|MEDIUM|MEDIUM|Rick confirms one-sentence problem restatement before building. Gandalf reviews before Mr. Robot security review.|
|Chinaski copy not ready when Rick starts building|LOW|LOW|Tasks 1 and 2 run in parallel before Task 3 starts. Rick cannot start Task 3 without both outputs.|
|Phase 1 prototype never migrated — technical debt accumulates|MEDIUM|MEDIUM|Migration triggers are defined and specific. If any trigger is hit, Phase 2 starts. Not optional.|

**11 — QUICK REFERENCE**

**Agent Assignments at a Glance**

|   |   |   |   |
|---|---|---|---|
|**Agent**|**Task**|**Depends on**|**Deliverable**|
|Meeseeks #1|Storage schema|NONE|storage_schema.md|
|Chinaski|UI copy|NONE|copy_fellowship_ui.md|
|Rick|React artifact build|Tasks 1 + 2|fellowship_dashboard.jsx|
|Mr. Robot|Security review|Task 3|security_review.md + approved build|
|Meeseeks #2|Component props docs|Task 3|component_props.md|

  

  

**File Locations**

**/projects/fellowship-dashboard/**

  **brief.md                          ← Original brief**

  **plan.md                           ← This document (condensed)**

  **log.md                            ← Execution log**

  **/outputs/**

    **/meeseeks/storage_schema.md     ← Task 1**

    **/chinaski/copy_fellowship_ui.md ← Task 2**

    **/rick/fellowship_dashboard.jsx  ← Task 3 — THE DELIVERABLE**

    **/mr_robot/security_review.md    ← Task 4**

    **/meeseeks/component_props.md    ← Task 5**

    **final.md                        ← Gandalf synthesis + Phase 2 brief**

  

  

  

  

**_Fellowship Dashboard — Master Build Document_**

**_Version 1.0  ·  2026-03-16  ·  Approved for execution_**