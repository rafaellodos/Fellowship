# PROJECT STRUCTURE GUIDE

## STANDARD PROJECT STRUCTURE

Every project in the Fellowship of the Raf follows this structure:

```
[workspace]/Projects/[project-name]/
  context.md          ← What this project is, current status, key decisions
  intake/             ← Brief, raw inputs, voice notes, research
  deliverables/       ← Final outputs going to client or into the world
  communications/     ← Emails, messages, meeting notes related to this project
```

## FOLDER PURPOSES

### context.md
- Project overview and purpose
- Current status (PLANNING, ACTIVE, ON HOLD, COMPLETED)
- Primary focus and goals
- Deliverables list
- Stakeholders
- Agent access permissions
- Skills needed
- Timeline
- Key decisions made
- Last updated date

### intake/
- **brief.md** - Project brief template (use project-brief_template.md)
- **research/** - Research materials, web searches, reference documents
- **notes/** - Raw notes, brainstorming, voice transcriptions
- **requirements/** - Client requirements, specifications, constraints

### deliverables/
- Final outputs for clients or public distribution
- Naming convention: `[YYYY-MM-DD]_[descriptor]_[type].[ext]`
- Examples: `2026-03-22_avenir-positioning_proposal.docx`

### communications/
- Client emails and messages
- Meeting notes
- Call summaries
- Correspondence related to the project

## NAMING CONVENTIONS

**Projects:** kebab-case, descriptive, dated where relevant
- Example: `2026-03-fellowship-project-template`
- Example: `2026-03-avenir-voice-agent-pilot`

**Deliverables:** `[YYYY-MM-DD]_[descriptor]_[type].[ext]`
- Example: `2026-03-22_strategy-deck_proposal.pptx`
- Example: `2026-03-22_user-research_report.pdf`

## INTERNAL VS CLIENT PROJECTS

**Internal projects** (no client):
- Keep all folders: context.md, intake/, deliverables/
- Drop communications/ unless there are external stakeholders

**Client projects**:
- Use all four folders
- communications/ is required for client correspondence

## QUICK START

1. Copy `project-brief_template.md` to `intake/brief.md`
2. Fill in the brief with project details
3. Create `context.md` using the brief information
4. Create subfolders in intake/ as needed (research/, notes/, requirements/)
5. Start work, save deliverables to deliverables/
6. Track communications in communications/

## LAST UPDATED
2026-03-22
