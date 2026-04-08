# FELLOWSHIP DASHBOARD — BUILD PLAN
## Inspiracy Workspace | 2026-03-22

---

## PROJECT DEFINITION

**What:** A visual dashboard interface for the Fellowship of the Raf system

**Purpose:** Provide real-time visibility into Fellowship operations, agent deployments, project status, memory health, and reflection cadence. Enables Rafael to monitor system health, track work patterns, and identify optimization opportunities.

**Target Platform:** Web application (React + TypeScript + TailwindCSS) deployed to Netlify

**Primary Users:** Rafael Lodos (system owner), potentially extended to client-facing views for Inspiracy consulting engagements

---

## SCOPE & FEATURES

### MVP Scope (Phase 1)

**Core Views:**
- System Overview — Fellowship health, active projects, agent deployment status
- Workspace Dashboard — Per-workspace activity (Rafael, AvenoirTech, Inspiracy, ThoughtExperiment, Labs)
- Agent Monitor — Deployment frequency, performance metrics, last activity
- Memory Layer Status — Frodo, Legolas, Aragorn health and population
- Reflection Feed — Weekly pulses, monthly deep reflections, trend visualization

**Key Features:**
- Real-time data refresh (5-minute polling)
- Interactive drill-down from overview to detail
- Export capabilities (CSV for data, PDF for reports)
- Mobile-responsive design
- Dark/light mode toggle

**Data Sources:**
- Workspace context files (status, priorities)
- Project directories (active/completed)
- Memory layers (entry counts, last updates)
- Reflection directories (pulse/deep reflection history)
- Evolution log (agent versions, updates)

### Future Scope (Phase 2+)
- Agent interaction visualization
- Project timeline view
- Client relationship dashboard (Inspiracy-specific)
- Voice transcription integration
- Automated insight generation

---

## AGENT DEPLOYMENT MAP

### Phase 1 — Planning & Architecture (Week 1)

| Agent | Task | Model Tier | Rationale |
|---|---|---|---|
| **Gandalf** | Project planning, agent coordination, synthesis | Frontier | Orchestrator needs full reasoning |
| **Harvey** | Business case, stakeholder analysis, value proposition | Frontier | Strategic framing requires high capability |
| **Socrates** | Interrogate requirements, stress-test assumptions | Frontier | High-stakes planning needs thorough questioning |
| **Archer** | Technology stack research, alternative approaches | Mid | Exploratory research, not critical path |

### Phase 2 — Core Build (Week 2-3)

| Agent | Task | Model Tier | Rationale |
|---|---|---|---|
| **Rick** | Architecture design, core build, React components | Frontier | Complex build work requires highest capability |
| **Mr. Robot** | Security audit, code review, API security | Frontier | Security is non-negotiable |
| **Meeseeks** | Atomic tasks (file creation, dependency installation) | Fast/Mid | Simple execution tasks |
| **Morty** | Risk assessment before deployment | Mid | Ethics gate, not full security audit |

### Phase 3 — Integration & Testing (Week 4)

| Agent | Task | Model Tier | Rationale |
|---|---|---|---|
| **Rick** | Integration testing, bug fixes, optimization | Frontier | Technical refinement |
| **Mr. Robot** | Final security review, deployment checklist | Frontier | Production readiness verification |
| **Merry** | Data ingestion testing (workspace file parsing) | Mid | Structured input processing |
| **Pippin** | User experience testing, feedback capture | Mid | Unstructured testing feedback |

---

## MODEL TIER RATIONALE

**Frontier Models (Claude 3.5 Sonnet/GPT-4o)**
- Used for: Architecture, security, strategy, complex reasoning
- Cost: Higher but justified for critical path work
- When: Any task where wrong output creates rework or security risk

**Mid Models (Claude 3 Haiku/GPT-4o-mini)**
- Used for: Testing, research, structured processing, risk assessment
- Cost: Balanced capability and efficiency
- When: Well-defined tasks with clear success criteria

**Fast Models (Claude 3 Haiku/GPT-3.5-turbo)**
- Used for: Atomic execution, simple file operations, routine tasks
- Cost: Lowest tier for highest efficiency
- When: Task is fully specified, no ambiguity, no decision-making

---

## STEP-BY-STEP BUILD PLAN

### WEEK 1 — PLANNING & ARCHITECTURE

**Day 1-2: Requirements & Architecture**
1. Gandalf runs intake protocol — defines requirements, constraints, success criteria
2. Harvey builds business case — value proposition, stakeholder analysis, ROI projection
3. Socrates interrogates assumptions — stress-tests feature scope, questions technical choices
4. Archer researches tech stack alternatives — React vs Vue, deployment options, data visualization libraries
5. Gandalf synthesizes — final architecture decision, tech stack selection, detailed spec

**Day 3-4: Technical Design**
1. Rick designs system architecture — component hierarchy, state management, data flow
2. Rick designs data schema — what to track, how to structure, update mechanisms
3. Mr. Robot reviews architecture — security implications, API design, data handling
4. Gandalf approves technical design — confirms alignment with requirements

**Day 5: Project Setup**
1. Rick initializes project structure — Next.js app, TypeScript config, Tailwind setup
2. Rick sets up development environment — local dev server, testing framework, linting
3. Meeseeks creates project files — package.json, README, initial component skeleton
4. Gandalf writes project brief to Frodo — baseline for tracking

### WEEK 2 — CORE BUILD

**Day 6-8: Data Layer**
1. Rick builds file system parser — reads workspace context files, project directories
2. Rick builds data models — TypeScript interfaces for all Fellowship entities
3. Rick builds state management — React Context or Zustand for global state
4. Rick builds polling mechanism — 5-minute refresh, error handling, loading states
5. Mr. Robot reviews data layer — validates no sensitive data exposure, proper error handling

**Day 9-11: Core UI Components**
1. Rick builds layout shell — navigation, responsive grid, theme toggle
2. Rick builds System Overview view — Fellowship health card, active projects list
3. Rick builds Workspace Dashboard — per-workspace cards with activity metrics
4. Rick builds Agent Monitor — deployment frequency charts, performance metrics
5. Rick builds Memory Layer Status — Frodo/Legolas/Aragorn health indicators
6. Rick builds Reflection Feed — weekly/monthly reflection timeline

**Day 12-14: Integration**
1. Rick integrates data layer with UI — connects components to live data
2. Rick builds interactive features — drill-down views, export functionality
3. Rick implements responsive design — mobile optimization, breakpoint handling
4. Mr. Robot audits integration — validates no XSS vulnerabilities, proper data sanitization

### WEEK 3 — REFINEMENT & TESTING

**Day 15-17: Feature Completion**
1. Rick builds export functionality — CSV data export, PDF report generation
2. Rick builds error boundaries — graceful failure handling, user feedback
3. Rick builds performance optimization — lazy loading, memoization, bundle optimization
4. Rick builds accessibility features — ARIA labels, keyboard navigation, screen reader support

**Day 18-19: Testing**
1. Rick runs unit tests — component testing, data model validation
2. Rick runs integration tests — end-to-end user flows
3. Merry tests data ingestion — validates parsing of all workspace file types
4. Pippin tests UX — identifies friction points, usability issues
5. Morty assesses deployment risks — production readiness, rollback plan

**Day 20: Bug Fixes & Polish**
1. Rick addresses testing feedback — fixes bugs, refactors problematic code
2. Rick polishes UI — improves visual design, animations, micro-interactions
3. Mr. Robot final security review — production deployment checklist
4. Gandalf synthesizes testing results — confirms readiness for deployment

### WEEK 4 — DEPLOYMENT & HANDOFF

**Day 21-22: Deployment**
1. Rick prepares deployment — Netlify configuration, environment variables, build optimization
2. Mr. Robot validates deployment config — no secrets in code, proper CORS, SSL enforcement
3. Rick deploys to staging — tests production environment
4. Rick deploys to production — monitors initial traffic, error rates
5. Gandalf writes deployment summary to Frodo — documents deployment decisions

**Day 23-25: Documentation & Handoff**
1. Rick writes technical documentation — architecture, data models, component reference
2. Chinaski writes user documentation — getting started guide, feature walkthrough
3. Rick writes maintenance guide — update procedures, troubleshooting, common issues
4. Gandalf writes project close summary — lessons learned, recommendations for Phase 2

---

## BUDGET ESTIMATION

### LLM API Costs (Frontier Models)

**Planning Phase (Week 1):**
- Gandalf orchestration: ~50K tokens × $0.003/1K = $150
- Harvey business case: ~30K tokens × $0.003/1K = $90
- Socrates interrogation: ~20K tokens × $0.003/1K = $60
- Archer research: ~15K tokens × $0.001/1K = $15
- **Subtotal: $315**

**Core Build Phase (Week 2-3):**
- Rick architecture/build: ~200K tokens × $0.003/1K = $600
- Mr. Robot security audits: ~50K tokens × $0.003/1K = $150
- Meeseeks atomic tasks: ~10K tokens × $0.0005/1K = $5
- Morty risk assessment: ~10K tokens × $0.001/1K = $10
- **Subtotal: $765**

**Integration & Testing Phase (Week 4):**
- Rick refinement/testing: ~100K tokens × $0.003/1K = $300
- Mr. Robot final review: ~20K tokens × $0.003/1K = $60
- Merry testing: ~15K tokens × $0.001/1K = $15
- Pippin UX testing: ~10K tokens × $0.001/1K = $10
- **Subtotal: $385**

**Total LLM API Cost: $1,465**

### Infrastructure Costs

**Netlify Hosting (Free Tier):**
- 100GB bandwidth/month
- 300 minutes build time/month
- **Cost: $0**

**Domain (if custom):**
- .com domain registration: $12/year
- **Cost: $12/year**

**Total Infrastructure Cost: $12/year**

### Total Project Budget: **$1,477** (one-time)

---

## TIMELINE PROJECTION

### Conservative Estimate: 4 weeks

**Week 1:** Planning & Architecture
- Risk: Low — well-defined scope, Gandalf orchestrates

**Week 2:** Core Build
- Risk: Medium — technical complexity, potential architectural pivots
- Buffer: 2 days built in for unexpected issues

**Week 3:** Refinement & Testing
- Risk: Low — iterative improvement, clear testing criteria
- Buffer: 1 day for bug fixes

**Week 4:** Deployment & Handoff
- Risk: Low — deployment is straightforward with Netlify
- Buffer: 1 day for documentation polish

**Total: 20 working days**

### Aggressive Estimate: 3 weeks

**Week 1:** Planning + Core Build (accelerated)
- Risk: High — compressed timeline increases error probability

**Week 2:** Refinement + Testing
- Risk: Medium — less time for thorough testing

**Week 3:** Deployment + Handoff
- Risk: Low — deployment is straightforward

**Total: 15 working days**

**Recommendation:** 4-week timeline. The additional week reduces risk significantly and allows for quality work rather than rushed completion.

---

## EXECUTION PROJECTIONS

### Success Metrics

**Technical:**
- All MVP features implemented and functional
- 95%+ test coverage on core components
- Page load time < 2 seconds on 3G
- Zero critical security vulnerabilities

**User Experience:**
- Rafael can navigate all views within 5 minutes of first use
- Data refresh completes within 3 seconds
- Export functionality works for all views
- Mobile-responsive design passes all breakpoint tests

**Business Value:**
- Dashboard provides visibility into Fellowship health previously unavailable
- Enables data-driven decisions about agent deployment priorities
- Identifies patterns in work distribution across workspaces
- Establishes baseline for Phase 2 feature development

### Risk Assessment

**High Risk:**
- None identified. Scope is well-defined, tech stack is mature, deployment is straightforward.

**Medium Risk:**
- **Data parsing complexity:** Workspace file formats may be inconsistent → Mitigation: Build robust parser with error handling, validate against all existing files
- **Performance at scale:** As Fellowship grows, dashboard may slow → Mitigation: Implement pagination, lazy loading, efficient data structures from start

**Low Risk:**
- **LLM API rate limits:** High token usage may hit limits → Mitigation: Use efficient prompting, batch operations where possible
- **Deployment issues:** Netlify configuration problems → Mitigation: Test deployment early, Mr. Robot reviews config

### Post-Launch Considerations

**Maintenance:**
- Weekly monitoring of error logs and performance metrics
- Monthly review of Fellowship structure changes (new agents, workspaces)
- Quarterly optimization and feature refinement

**Phase 2 Opportunities:**
- Agent interaction visualization
- Client relationship dashboard (Inspiracy-specific)
- Automated insight generation
- Voice transcription integration
- Real-time notifications

---

## IMMEDIATE NEXT STEPS

1. **Gandalf runs intake protocol** — formalize requirements, constraints, success criteria
2. **Create project directory** — `/Workspace/Inspiracy/Projects/2026-03-fellowship-dashboard/`
3. **Harvey builds business case** — confirms value proposition, ROI, stakeholder alignment
4. **Socrates interrogates assumptions** — validates feature scope, questions technical choices
5. **Rick begins architecture design** — component hierarchy, state management, data flow

**Ready to proceed when you confirm.**
