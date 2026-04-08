# SKILL: IMAGE & VISUAL ANALYSIS
## [[Fellowship]] Skill — Vision and Visual Intelligence
### Lives at: /fellowship/skills/image_visual_analysis.md
### Available to: [[mr.robot.id]], [[chinaski.id]], [[archer.id]], [[pippin.id]], [[Fellowship of the Raf .MK1/gandalf.id]]

---

## WHAT THIS SKILL IS

The ability to receive an image — screenshot, photograph, design file, document scan, chart, diagram, brand material — and extract structured intelligence from it. Text via OCR. Layout and composition. Brand elements. Security indicators. Data from charts. UI patterns from screenshots.

Most of what matters in the real world arrives visually at some point. A competitor's landing page is a visual artefact. A client's existing brand materials are visual. A contract photographed on a phone is visual. A screenshot of an error is visual. Without this skill the [[Fellowship]] is blind to an entire class of input. With it, anything Rafael can see, the [[Fellowship]] can process.

---

## AGENTS WITH ACCESS

| Agent | Primary Use |
|---|---|
| [[mr.robot.id]] | Screenshot analysis for security audits, UI vulnerability identification, contract and document scans, error screenshots |
| [[chinaski.id]] | Brand material analysis — voice, tone, visual identity of existing work or competitor creative |
| [[archer.id]] | Competitor visual intelligence — landing pages, ad creative, product screenshots, market positioning signals in visual form |
| [[pippin.id]] | Processing any image Rafael uploads or captures — standard unstructured ingestion for visual inputs |
| [[Fellowship of the Raf .MK1/gandalf.id]] | Direct analysis when no specialist deployed — visual inputs in project briefs |

---

## INPUT TYPES

| Type | Primary Agent | What's Extracted |
|---|---|---|
| Screenshot — UI/product | [[mr.robot.id]], [[archer.id]] | Layout, copy, CTAs, UX patterns, security indicators |
| Screenshot — error/code | [[mr.robot.id]] | Error text, stack trace, code context |
| Photograph — document | [[mr.robot.id]], [[pippin.id]] | Full OCR text extraction, document structure |
| Brand materials | [[chinaski.id]] | Visual identity elements, typography, colour, tone signals |
| Charts and graphs | [[archer.id]], [[Fellowship of the Raf .MK1/gandalf.id]] | Data points, trends, source, date |
| Competitor creative | [[archer.id]], [[chinaski.id]] | Positioning, messaging, audience signals, creative approach |
| Architectural diagrams | [[rick.id]], [[mr.robot.id]] | System components, data flows, security boundaries |
| Handwritten notes | [[pippin.id]] | OCR transcription, content classification |

---

## HOW AGENTS CALL THIS SKILL

```
VISION_CALL:
  Image: [file path or URL]
  Intent: [what the agent is trying to extract — one sentence]
  Mode: [OCR / ANALYSE / BRAND_AUDIT / SECURITY_SCAN / DATA_EXTRACT]
  Output: [STRUCTURED / SUMMARY / RAW_TEXT]
```

---

## ANALYSIS MODES

### OCR
Pure text extraction. Every readable character on the image, preserving layout structure where possible. Used for document scans, handwritten notes, screenshots containing important text.

```
Output:
EXTRACTED TEXT:
[full verbatim text from image]

LAYOUT NOTES:
[structural observations — headers, columns, sections if relevant]

CONFIDENCE: [HIGH / MEDIUM / LOW]
UNCLEAR SECTIONS: [areas where text was ambiguous]
```

### ANALYSE
General visual intelligence. What is this image, what does it contain, what does it mean. Used when the agent doesn't know exactly what they're looking for or when the image is complex.

```
Output:
IMAGE TYPE: [what kind of image this is]
CONTENT SUMMARY: [what the image shows — 2-3 sentences]
KEY ELEMENTS: [bulleted — the specific things that matter]
TEXT PRESENT: [any text extracted]
RELEVANCE: [why this is significant to the current task]
```

### BRAND_AUDIT
[[chinaski.id]]'s primary mode. Extracts brand intelligence from visual materials — competitor creative, client existing work, reference examples.

```
Output:
VISUAL IDENTITY:
  Colour palette: [identified colours with approximate hex if determinable]
  Typography: [font styles, weights, hierarchy]
  Layout approach: [grid, spacing, visual rhythm]
  Image style: [photography vs illustration, tone, subject matter]

COPY & MESSAGING:
  Primary message: [what the brand is saying]
  Tone: [how it's saying it]
  Audience signals: [who this is clearly aimed at]

BRAND POSITIONING SIGNALS:
  [what this visual material reveals about how the brand positions itself]

CHINASKI'S READ:
  [Chinaski's interpretation of the creative voice — is it confident, anxious,
  aspirational, corporate, human? What does the visual language say about
  the brand's relationship to its audience?]
```

### SECURITY_SCAN
[[mr.robot.id]]'s primary mode. Looks at UI, architecture diagrams, screenshots, and document scans through an adversarial lens.

```
Output:
SECURITY OBSERVATIONS:
  [what the image reveals about security posture, data handling,
  system architecture, or potential vulnerabilities]

SENSITIVE DATA VISIBLE:
  [any PII, credentials, internal information, or data that
  shouldn't be visible in this screenshot — flagged immediately]

ARCHITECTURE SIGNALS:
  [what system components, integrations, or infrastructure are visible]

FLAGS:
  [anything that warrants immediate attention before proceeding]
```

### DATA_EXTRACT
Pulls structured data from charts, graphs, tables presented as images. Used by [[archer.id]] when market data or research appears in visual form.

```
Output:
DATA TYPE: [chart type / table / infographic]
SOURCE: [if visible in image]
DATE: [if visible]
EXTRACTED DATA:
  [structured representation of the data — table format where possible]
LIMITATIONS:
  [what couldn't be extracted accurately from the visual format]
```

---

## CHINASKI-SPECIFIC USAGE

[[chinaski.id]] uses visual analysis to read brand materials before writing for or about a client. Before producing any Inspiracy client work, [[chinaski.id]] runs BRAND_AUDIT on the client's existing materials — their website, their current collateral, their social presence — and extracts the visual and tonal intelligence that informs how he writes.

This is not mimicry. [[chinaski.id]] is not producing more of what already exists. He is reading what exists so he knows what to build from, what to preserve, what to disrupt. The brand audit is the briefing that makes the writing land.

---

## MR. ROBOT-SPECIFIC USAGE

[[mr.robot.id]] treats every screenshot as a potential security finding. His specific visual scan priorities:

**In product screenshots:** Visible API endpoints, authentication indicators, data exposure in UI, session tokens in URLs.

**In architecture diagrams:** Security boundaries, data flows, authentication layers, external integrations and the trust they imply.

**In document scans:** PII visible in contracts or correspondence, data classification indicators, signature and authorisation structures.

**Critical rule:** If [[mr.robot.id]] identifies sensitive data — credentials, PII, internal system details — in any image shared in a project context, he flags it to [[Fellowship of the Raf .MK1/gandalf.id]] immediately before processing anything else. The flag comes first.

---

## PIPPIN-SPECIFIC USAGE

[[pippin.id]] handles images the same way he handles all unstructured input. Image arrives via any channel. [[pippin.id]] identifies what type of image it is. Routes to the appropriate analysis mode. Extracts what's useful. Files to Frodo with source and date.

For images Rafael captures on his phone — a whiteboard, a document, a business card, a product he finds interesting — [[pippin.id]] runs ANALYSE mode by default unless the image type clearly indicates a more specific mode (a business card → OCR, a brand piece → BRAND_AUDIT).

Business cards specifically: [[pippin.id]] extracts contact details via OCR and routes to [[harvey.id]] for CRM_WRITE ADD_CONTACT. The physical card becomes a contact record without Rafael typing anything.

---

## WHAT THIS SKILL DOES NOT DO

**It does not identify individuals from photographs.** Privacy protection. No facial recognition, no identity matching from images of people.

**It does not reproduce copyrighted visual works.** Analysis only. [[chinaski.id]] reads brand materials and writes about what they contain. He does not reproduce them.

**It does not process images from unknown or untrusted sources without flagging.** [[mr.robot.id]] reviews the source before any image from an external URL is processed. Some images contain metadata or embedded content that warrants scrutiny.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**API:** Claude's native vision capability — pass images as base64 in the messages array with type: image.
**Supported formats:** JPEG, PNG, GIF, WebP. PDFs route to document processing instead.
**File size:** Maximum 5MB per image. Larger files are resized before processing.
**OCR accuracy:** Claude vision handles printed text well. Handwriting accuracy varies — low confidence sections are flagged.
**Business card pipeline:** OCR → structured contact extraction → CRM_WRITE. Can be triggered automatically when [[Pippin.ID]] identifies an image as a business card.

---

*Image & Visual Analysis — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/image_visual_analysis.md*
