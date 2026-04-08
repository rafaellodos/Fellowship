# NAMING CONVENTIONS REFERENCE

## OVERVIEW

This document provides the complete naming conventions for the Fellowship of the Raf system. Consistent naming ensures clarity, organization, and efficient file management.

## WORKSPACES

**Format:** PascalCase, no spaces

**Examples:**
- `AvenoirTech/` (not `Avenir Tech/`)
- `Inspiracy/`
- `ThoughtExperiment/`
- `Rafael/`
- `Labs/`

## PROJECTS

**Format:** kebab-case, descriptive, dated where relevant

**Pattern:** `YYYY-MM-DD-project-name`

**Examples:**
- `2026-03-fellowship-project-template`
- `2026-03-avenir-voice-agent-pilot`
- `2026-03-22-client-strategy-engagement`

**Rules:**
- Use lowercase letters
- Separate words with hyphens
- Include date when relevant
- Make name descriptive and clear
- Avoid generic names like "new project"

## CONTEXT FILES

**Format:** Always named `context.md`

**Location:** One per workspace, one per project

**Examples:**
- `Workspace/AvenoirTech/context.md`
- `Workspace/Inspiracy/Projects/2026-03-client-project/context.md`

## AGENT IDENTITY FILES

**Format:** `[name].id.md` - lowercase, dot notation

**Examples:**
- `gandalf.id.md`
- `rick.id.md`
- `harvey.id.md`
- `chinaski.id.md`
- `archer.id.md`

**Rules:**
- Agent name in lowercase
- `.id.md` suffix
- Located in `/fellowship/` folder

## SKILL FILES

**Format:** `snake_case.md`

**Examples:**
- `web_search.md`
- `web_fetch.md`
- `voice_transcription.md`
- `document_generation.md`
- `crm_read_write.md`

**Rules:**
- Use lowercase letters
- Separate words with underscores
- Located in `/skills/` folder

## DELIVERABLES

**Format:** `[YYYY-MM-DD]_[descriptor]_[type].[ext]`

**Examples:**
- `2026-03-22_avenir-positioning_proposal.docx`
- `2026-03-22_user-research_report.pdf`
- `2026-03-22_strategy-deck_presentation.pptx`
- `2026-03-22_client-meeting_notes.md`

**Components:**
- **Date:** `YYYY-MM-DD` format
- **Descriptor:** Descriptive name (kebab-case)
- **Type:** Document type (proposal, report, presentation, notes, etc.)
- **Extension:** File extension

**Rules:**
- Always include date
- Use descriptive name
- Include document type
- Use appropriate file extension
- No spaces in filename

## TEMPLATES

**Format:** `[descriptor]_template.[ext]`

**Examples:**
- `project-brief_template.md`
- `intake-checklist_template.md`
- `proposal_template.docx`

**Rules:**
- Descriptive name in kebab-case
- `_template` suffix
- Appropriate file extension

## FOLDERS

**Format:** lowercase with hyphens for multi-word folders

**Examples:**
- `Projects/`
- `Writing/`
- `Ideas/`
- `deliverables/`
- `communications/`

**Rules:**
- Use lowercase letters
- Use hyphens for multi-word folders
- No spaces in folder names
- No underscores in folder names

## PROJECT SUBFOLDERS

**Standard Structure:**
```
[project-name]/
  context.md
  intake/
    brief.md
    research/
    notes/
    requirements/
  deliverables/
  communications/
```

**Naming Rules:**
- `intake/` - Standard for all projects
- `deliverables/` - Standard for all projects
- `communications/` - For client projects only
- Subfolders within intake/ use lowercase

## MEMORY FOLDERS

**Format:** Character names from LOTR

**Examples:**
- `Frodo/` - Episodic memory
- `Legolas/` - Semantic memory
- `Aragorn/` - Working memory

**Rules:**
- Use LOTR character names
- Capitalize first letter
- Located in `/Memory/` folder

## REFLECTION FOLDERS

**Format:** Time-based organization

**Examples:**
- `Weekly/`
- `Monthly/`

**Rules:**
- Capitalize first letter
- Located in `/Reflections/` folder

## CORE FILES

**Format:** lowercase with underscores where needed

**Examples:**
- `fellowship.md`
- `project_schema.md`
- `evolution_log.md`
- `architecture_v2.md`
- `update.md`

**Rules:**
- Use lowercase letters
- Use underscores for multi-word files
- Located in `/Core/` folder

## QUICK REFERENCE TABLE

| Item Type | Format | Example |
|-----------|--------|---------|
| Workspace | PascalCase | `AvenoirTech/` |
| Project | `YYYY-MM-DD-name` | `2026-03-fellowship-template` |
| Context file | `context.md` | `context.md` |
| Agent file | `[name].id.md` | `gandalf.id.md` |
| Skill file | `snake_case.md` | `web_search.md` |
| Deliverable | `[YYYY-MM-DD]_[name]_[type].[ext]` | `2026-03-22_strategy_proposal.docx` |
| Template | `[name]_template.[ext]` | `brief_template.md` |
| Folder | lowercase | `deliverables/` |

## COMMON MISTAKES TO AVOID

❌ `New Project/` - Generic name, no date
✅ `2026-03-22-client-strategy/` - Descriptive, dated

❌ `Avenir Tech/` - Spaces in name
✅ `AvenoirTech/` - PascalCase, no spaces

❌ `proposal_final_v2.docx` - No date, unclear versioning
✅ `2026-03-22_proposal_final.docx` - Dated, clear

❌ `Rick.Id.Md` - Incorrect capitalization
✅ `rick.id.md` - Lowercase with dot notation

❌ `WebSearch.md` - Incorrect capitalization
✅ `web_search.md` - snake_case

## LAST UPDATED
2026-03-22
