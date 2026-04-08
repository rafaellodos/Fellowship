# SKILL: DOCUMENT GENERATION
## [[Fellowship]] Skill — Formatted .docx Output
### Lives at: /fellowship/skills/document_generation.md
### Available to: [[Chinaski.ID]] (primary), [[Harvey.ID]], [[Rick.ID]], [[Fellowship of the Raf .MK1/Gandalf.ID]]

---

## WHAT THIS SKILL IS

The ability to produce a formatted, professional Word document (.docx) as a final deliverable — not markdown that gets copy-pasted somewhere else, but a document that goes directly to a client, a collaborator, or an archive without a manual production step.

This skill closes the last mile. [[Chinaski.ID]] writes. [[Harvey.ID]] produces strategy documents. [[Rick.ID]] produces technical specifications. Without this skill, every piece of output requires Rafael to take the content and format it manually before it can leave the [[Fellowship]]. With it, the output is the deliverable.

---

## AGENTS WITH ACCESS

| Agent | Primary Output Type |
|---|---|
| [[Chinaski.ID]] | Brand copy, proposals, content pieces, essays, scripts formatted for delivery |
| [[Harvey.ID]] | Strategy documents, competitive analyses, positioning briefs, client-facing reports |
| [[Rick.ID]] | Technical specifications, architecture documents, build plans |
| [[Fellowship of the Raf .MK1/Gandalf.ID]] | Final project deliverables — the synthesised output of a full [[Fellowship]] run |

---

## DOCUMENT TYPES

Each document type has a defined template structure. Agents select the appropriate type when calling this skill.

### TYPE 1 — CLIENT PROPOSAL
For Inspiracy and AvenoirTech client-facing proposals.

```
Structure:
- Cover page (client name, project name, date, Rafael's name/company)
- Executive Summary (1 page)
- The Situation (what we understand about the client's challenge)
- The Approach (what we propose to do)
- The Deliverables (what they receive)
- Investment (pricing — pulled from brief constraints)
- About (brief Inspiracy/AvenoirTech positioning)
- Next Steps
```

### TYPE 2 — STRATEGY DOCUMENT
For [[Harvey.ID]]'s competitive and strategic outputs.

```
Structure:
- Title page
- Strategic Summary (the one-paragraph version of the whole document)
- Situation Analysis
- Key Findings
- Strategic Options (with tradeoffs)
- Recommendation
- Implementation Considerations
- Appendix (supporting data, research citations)
```

### TYPE 3 — CONTENT PIECE
For [[Chinaski.ID]]'s long-form written output — essays, articles, scripts.

```
Structure:
- Title
- Body (Chinaski's content, formatted for readability)
- No imposed section structure — Chinaski's form governs
```

### TYPE 4 — TECHNICAL SPECIFICATION
For [[Rick.ID]]'s build documents.

```
Structure:
- Title and version
- Overview (what this spec covers)
- Architecture (system design, component map)
- Technical Requirements
- Implementation Steps
- Testing Criteria
- Known Risks and Mitigations
```

### TYPE 5 — BRIEF / REPORT
For general purpose documents — meeting outputs, research summaries, internal briefs.

```
Structure:
- Title and date
- Summary
- Body sections (defined by content)
- Conclusions / Next Steps
```

---

## HOW AGENTS CALL THIS SKILL

```
DOCX_CALL:
  Type: [CLIENT_PROPOSAL / STRATEGY / CONTENT / TECHNICAL / BRIEF]
  Title: [document title]
  Author: [agent name — appears in document metadata]
  Content: [the full written content, section by section]
  Branding: [INSPIRACY / AVENOIRTECH / NEUTRAL]
  Recipient: [who this document is for — affects tone and cover page]
  Output path: /projects/[name]/outputs/[agent]/[filename].docx
```

---

## BRANDING PROFILES

**INSPIRACY**
- Colour palette: defined in /fellowship/skills/assets/inspiracy_brand.md
- Logo: /fellowship/skills/assets/inspiracy_logo.png
- Typography: brand fonts as defined
- Tone register: strategic, creative, confident

**AVENOIRTECH**
- Colour palette: defined in /fellowship/skills/assets/avenoirtech_brand.md
- Logo: /fellowship/skills/assets/avenoirtech_logo.png
- Typography: clean, modern, professional
- Tone register: operational, direct, technology-forward

**NEUTRAL**
- Clean white document, no branding
- Georgia or Arial typography
- Used for internal documents, personal writing, non-client outputs

*Brand asset files are populated when brand guidelines are defined. Until then, NEUTRAL is the default for all document types.*

---

## QUALITY STANDARDS

Every document produced by this skill must meet these standards before being written to the output path:

**Structural integrity** — all required sections present for the document type. No empty sections. A section that has no content is removed, not left blank.

**Consistency** — heading hierarchy consistent throughout. Formatting applied uniformly. No mixed styles within a document.

**Recipient-appropriate tone** — a document going to a Brazilian contractor client reads differently from one going to a UK corporate client. The agent specifies the recipient in the call. The document generation layer adjusts register accordingly.

**Length discipline** — documents are as long as they need to be. Not padded to look substantial. Not truncated to look efficient. The content determines the length. A strategy document that needs three pages does not become five because five feels more professional.

---

## CHINASKI-SPECIFIC USAGE

[[Chinaski.ID]]'s output is voice-driven. The document generation skill must not sanitise that voice in the formatting process. When [[Chinaski.ID]] produces a content piece, the formatting layer's job is to present his words cleanly — not to impose corporate structure on material that has its own structure.

For [[Chinaski.ID]] outputs: TYPE 3 (CONTENT PIECE) always. No imposed section headers unless [[Chinaski.ID]] has written them. Typography and spacing that serves readability without imposing editorial voice.

---

## HARVEY-SPECIFIC USAGE

[[Harvey.ID]]'s strategy documents are often time-sensitive — produced for a conversation happening soon, or a decision being made now. The document generation layer prioritises speed on [[Harvey.ID]] outputs. Clean over elaborate. Functional over beautiful. The intelligence in the document is the value, not the production quality.

For [[Harvey.ID]] outputs: TYPE 2 (STRATEGY) or TYPE 1 (CLIENT PROPOSAL). Branding applied from the relevant company profile. Delivered to the output path immediately on generation — no review queue.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**Library:** docx npm package (already proven in this session's architecture document build).
**Template engine:** JavaScript template literals constructing docx Document objects. One template file per document type in /fellowship/skills/assets/templates/.
**Brand assets:** Logo files and colour palettes stored in /fellowship/skills/assets/. Referenced by branding profile name in the docx call.
**Output:** Written to specified output path as .docx. Confirmation written to Aragorn. File path returned to calling agent.
**Validation:** python validate.py run on every generated document before confirmation. Invalid documents flagged to [[Fellowship of the Raf .MK1/Gandalf.ID]] rather than silently delivered.
**Google Docs compatibility:** All documents generated with Google Docs compatibility in mind — DXA units for tables, no percentage widths, Arial fallback fonts.

---

*Document Generation — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/document_generation.md*
