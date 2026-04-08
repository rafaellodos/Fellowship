# FELLOWSHIP DASHBOARD — SIMPLE MVP PLAN
## Lowest Cost Approach | 2026-03-22

---

## MVP SCOPE (ABSOLUTE MINIMUM)

**Single View Dashboard:**
- Fellowship health status (active/inactive)
- Active projects count per workspace
- Last reflection date
- Simple text-based status display

**No Features Cut:**
- No interactive drill-down
- No data visualization charts
- No export functionality
- No mobile optimization
- No dark/light mode
- No real-time polling (manual refresh only)

**Tech Stack:**
- Single HTML file + vanilla JavaScript
- No framework, no build step
- Deploy to GitHub Pages (free)
- Read workspace files via GitHub API or local filesystem

**Target:** Functional dashboard in 1 week, under $50 cost

---

## AGENT DEPLOYMENT (MINIMAL)

| Agent | Task | Model Tier | Cost |
|---|---|---|---|---|
| **Gandalf** | Orchestration, planning, synthesis | Frontier | $50 |
| **Rick** | Build single HTML file, basic JS logic | Mid | $15 |
| **Meeseeks** | File creation, GitHub setup | Fast | $2 |

**Total Agent Cost: $67**

**Agents NOT deployed:** Harvey, Socrates, Archer, Mr. Robot, Morty, Merry, Pippin

---

## MODEL TIER STRATEGY (COST-OPTIMIZED)

**Frontier (Claude 3.5 Sonnet - $0.003/1K tokens):**
- Gandalf orchestration only
- ~15K tokens total
- Cost: $45

**Mid (Claude 3 Haiku - $0.001/1K tokens):**
- Rick build work
- ~15K tokens total
- Cost: $15

**Fast (Claude 3 Haiku - $0.0005/1K tokens):**
- Meeseeks atomic tasks
- ~5K tokens total
- Cost: $2.50

**Total LLM Cost: $62.50**

---

## 1-WEEK BUILD PLAN

### DAY 1: PLANNING (2 hours)

**Gandalf:**
1. Define MVP requirements — single view, basic status display
2. Design data structure — what to read from workspace files
3. Plan file reading approach — GitHub API vs local filesystem
4. Create project directory structure

**Cost:** $10 (Gandalf, Frontier)

### DAY 2: DATA LAYER (3 hours)

**Rick (Mid model):**
1. Build file parser — reads workspace context.md files
2. Build project scanner — counts active projects per workspace
3. Build reflection checker — finds latest weekly/monthly reflection
4. Build simple data model — JSON structure for dashboard

**Cost:** $5 (Rick, Mid)

### DAY 3: UI BUILD (4 hours)

**Rick (Mid model):**
1. Create single HTML file with basic layout
2. Build status display cards — one per workspace
3. Build Fellowship health indicator
4. Add manual refresh button
5. Style with basic CSS (no Tailwind, just inline styles)

**Cost:** $6 (Rick, Mid)

### DAY 4: INTEGRATION (3 hours)

**Rick (Mid model):**
1. Connect data layer to UI
2. Add error handling — missing files, parsing errors
3. Test with actual workspace files
4. Deploy to GitHub Pages

**Meeseeks (Fast model):**
1. Create GitHub repository
2. Push initial code
3. Configure GitHub Pages

**Cost:** $4 (Rick, Mid) + $2 (Meeseeks, Fast) = $6

### DAY 5: TESTING & POLISH (2 hours)

**Rick (Mid model):**
1. Test all workspace contexts
2. Fix any parsing issues
3. Add basic documentation (README)
4. Verify deployment works

**Cost:** $4 (Rick, Mid)

---

## BUDGET BREAKDOWN

| Component | Cost |
|---|---|
| Gandalf planning | $10 |
| Rick data layer | $5 |
| Rick UI build | $6 |
| Rick integration | $4 |
| Rick testing | $4 |
| Meeseeks GitHub setup | $2 |
| **Total LLM API** | **$31** |
| GitHub Pages hosting | $0 |
| Domain (optional) | $0 (use github.io subdomain) |
| **TOTAL PROJECT COST** | **$31** |

**vs. Full Plan: $1,477 → 98% cost reduction**

---

## TIMELINE: 1 WEEK

**Day 1:** Planning (2 hours)
**Day 2:** Data layer (3 hours)
**Day 3:** UI build (4 hours)
**Day 4:** Integration (3 hours)
**Day 5:** Testing (2 hours)

**Total:** 14 hours of work spread over 5 days

---

## MVP FEATURES (WHAT YOU GET)

**Dashboard displays:**
- Fellowship overall status (Active/Inactive)
- Rafael workspace: X active projects, last updated [date]
- AvenoirTech workspace: X active projects, last updated [date]
- Inspiracy workspace: X active projects, last updated [date]
- ThoughtExperiment workspace: X active projects, last updated [date]
- Labs workspace: X active projects, last updated [date]
- Latest reflection: Weekly pulse [date] / Monthly deep [date]
- Manual refresh button

**Technical:**
- Single HTML file (~200 lines)
- Vanilla JavaScript (~150 lines)
- Basic CSS styling
- Reads from local filesystem or GitHub API
- Deploys to GitHub Pages
- No build step, no dependencies

---

## WHAT YOU DON'T GET (CUT FOR MVP)

- No interactive drill-down
- No charts or visualizations
- No export functionality
- No mobile optimization
- No dark/light mode
- No real-time polling
- No agent performance metrics
- No memory layer detailed status
- No security audit (acceptable for internal tool)
- No comprehensive testing
- No user documentation beyond README

---

## RISK ASSESSMENT

**High Risk:**
- None. MVP is simple, tech stack is basic, deployment is straightforward.

**Medium Risk:**
- **File parsing fragility:** Workspace file formats may vary → Mitigation: Build robust parser with fallbacks, test all 5 workspaces
- **GitHub API rate limits:** If using GitHub API for file reading → Mitigation: Use local filesystem option if rate-limited

**Low Risk:**
- **Deployment issues:** GitHub Pages is mature and reliable
- **Browser compatibility:** Modern browsers support vanilla JS/CSS

---

## POST-MVP UPGRADE PATH

**If MVP proves valuable, incremental upgrades:**

**Week 2:** Add data visualization (Chart.js, simple charts)
**Week 3:** Add interactive drill-down
**Week 4:** Add export functionality
**Week 5:** Mobile optimization
**Week 6:** Real-time polling
**Week 7:** Security audit (Mr. Robot)
**Week 8:** Comprehensive testing

**Each upgrade:** ~$20-50 depending on complexity

---

## IMMEDIATE NEXT STEPS

1. **Gandalf runs intake protocol** — confirms MVP scope is acceptable
2. **Rick builds data parser** — reads workspace context files
3. **Rick builds single HTML dashboard** — displays basic status
4. **Deploy to GitHub Pages** — free hosting, no infrastructure cost
5. **Test with actual workspaces** — validate data display

**Total cost: $31**
**Total time: 1 week**
**Result:** Functional dashboard showing Fellowship status

**Ready to proceed when you confirm MVP scope.**
