# SKILL: WEB FETCH & URL PROCESSING
## [[Fellowship]] Skill — Full Page Content Retrieval
### Lives at: /fellowship/skills/web_fetch.md
### Available to: [[archer.id]], [[pippin.id]], [[mr.robot.id]], [[harvey.id]], [[Fellowship of the Raf .MK1/gandalf.id]]

---

## WHAT THIS SKILL IS

The ability to retrieve the full content of a URL — not a search snippet, not a preview, the complete page — and extract what's useful from it. Where web search finds what exists, web fetch reads what it contains.

This skill matters because search results are summaries. Summaries lose nuance, miss context, and occasionally misrepresent what a source actually says. When [[archer.id]] finds a competitor's pricing page, he needs to read the pricing page — not a description of it. When [[pippin.id]] processes a URL Rafael dropped in, he needs the actual article — not the headline.

Web fetch is the difference between intelligence that has been read and intelligence that has been reported on. The [[Fellowship]] reads primary sources.

---

## AGENTS WITH ACCESS

| Agent | Primary Use |
|---|---|
| [[archer.id]] | Reading primary sources identified in opportunity scans — competitor pages, market reports, research papers |
| [[pippin.id]] | Processing URLs Rafael saves or shares — articles, documents, reference material |
| [[mr.robot.id]] | Security intelligence — CVE pages, vendor security advisories, compliance documentation, terms of service |
| [[harvey.id]] | Company research — investor pages, news coverage, executive profiles, product pages |
| [[Fellowship of the Raf .MK1/gandalf.id]] | Direct retrieval when faster than deploying a specialist |

---

## HOW AGENTS CALL THIS SKILL

```
FETCH_CALL:
  URL: [exact URL to retrieve]
  Intent: [what the agent is looking for — one sentence]
  Extract: [FULL / STRUCTURED / TARGETED]
  Output: [what to do with the content — SUMMARISE / EXTRACT / PASS_THROUGH]
```

**FULL** — retrieve everything on the page. Used when the agent doesn't know exactly what they're looking for.
**STRUCTURED** — retrieve and parse into sections. Used for pages with clear structure — pricing pages, product pages, company pages.
**TARGETED** — retrieve only content matching specific criteria. Used when the agent knows exactly what they need. Example: "extract all pricing information" or "extract all dates and timeline references."

---

## EXTRACTION MODES

### SUMMARISE
Returns a structured summary of the page content. Used when [[archer.id]] or [[harvey.id]] needs the intelligence without the full text.

```
Output format:
SOURCE: [URL]
DATE: [publication date if available]
TYPE: [article / product page / research / pricing / profile / other]
KEY POINTS: [bulleted — the substantive content]
DIRECT QUOTES: [any specific claims worth preserving verbatim — under 15 words each]
RELEVANCE: [why this source matters to the current task]
```

### EXTRACT
Returns specific data pulled from the page. Used when the agent needs specific fields — prices, dates, names, specifications.

```
Output format:
SOURCE: [URL]
EXTRACTED DATA:
  [field]: [value]
  [field]: [value]
  ...
CONFIDENCE: [HIGH / MEDIUM / LOW — based on whether the data was explicit or inferred]
```

### PASS_THROUGH
Returns the full cleaned text of the page. Used by [[pippin.id]] when processing a URL Rafael has saved — the full content goes to Frodo, not a summary.

---

## PIPPIN-SPECIFIC USAGE

When Rafael saves or shares a URL — in a voice note, a brain dump, a WhatsApp message — [[pippin.id]] fetches the full content using PASS_THROUGH mode, then processes it through his standard unstructured ingestion protocol.

The URL itself is not what gets filed to Frodo. The content at the URL is filed, with the URL as the source reference. This matters because URLs break. A URL that was live when Rafael shared it may not be live in six months. The content is preserved. The link is noted.

**[[pippin.id]]'s URL processing flow:**
1. Receive URL (from any ingestion channel)
2. Fetch full content — PASS_THROUGH
3. Check if content was successfully retrieved (some pages block bots, require auth, or are paywalled)
4. If retrieved: parse and process as standard unstructured content
5. If blocked: flag to [[fellowship of the raf .mk1/gandalf.id]] with the URL and the reason for failed retrieval
6. Write to Frodo: content + source URL + retrieval date

---

## ARCHER-SPECIFIC USAGE

[[archer.id]] uses web fetch as the second step after web search. Search finds the source. Fetch reads it.

[[archer.id]]'s fetch pattern on competitive intelligence:
1. Web search identifies competitor's pricing page
2. Web fetch retrieves full pricing page content
3. [[archer.id]] extracts pricing structure, tiers, positioning language
4. Finding written to Aragorn with source, extraction, and [[archer.id]]'s cross-domain interpretation

[[archer.id]] never cites a source he hasn't fetched. A search result is a pointer. The fetched content is the source.

---

## MR. ROBOT-SPECIFIC USAGE

[[mr.robot.id]] uses web fetch for technical and legal primary sources. His specific fetch targets:

**Security intelligence:**
- CVE database entries (cve.mitre.org) — fetches full vulnerability details
- Vendor security advisories — fetches the full advisory, not the summary
- NVD entries (nvd.nist.gov) — fetches CVSS scores and technical details

**Legal and compliance:**
- Terms of service pages for any third-party tool the [[Fellowship]] or its clients use
- Regulatory documents — GDPR guidance, sector-specific compliance frameworks
- Privacy policy pages — extracted for data handling implications

[[mr.robot.id]] flags any terms of service or privacy policy that contains unusual data rights, liability clauses, or audit rights before the [[Fellowship]] or a client commits to using a tool.

---

## FAILURE MODES AND HANDLING

**Paywalled content:** Page detected as paywalled. Fetch returns: BLOCKED — PAYWALL. [[Fellowship of the Raf .MK1/gandalf.id]] determines whether the content is worth acquiring through other means.

**Bot-blocked content:** Page actively blocks automated retrieval. Fetch returns: BLOCKED — BOT_PROTECTION. Flagged to [[Fellowship of the Raf .MK1/gandalf.id]]. Content noted as inaccessible to the [[Fellowship]].

**Requires authentication:** Page requires login. Fetch returns: BLOCKED — AUTH_REQUIRED. If this is a tool the [[Fellowship]] uses (Airtable, Gmail, etc.) and credentials are available, the appropriate integration skill handles it instead.

**Page not found / broken link:** Fetch returns: FAILED — 404. Noted in Frodo against the URL. [[pippin.id]] flags broken links in Rafael's saved material to [[Fellowship of the Raf .MK1/gandalf.id]] for cleanup.

**Content too large:** Pages over 100,000 tokens are chunked. First chunk processed immediately, subsequent chunks queued. [[Fellowship of the Raf .MK1/gandalf.id]] notified if a page requires multiple chunks — this may indicate the TARGETED extraction mode would be more efficient.

---

## CONTENT THAT IS NOT FETCHED

The [[Fellowship]] does not fetch:

- Content that requires authentication Rafael has not provided
- Content from sources flagged by [[mr.robot.id]] as security risks
- Paywalled content without explicit authorisation
- Content explicitly excluded by robots.txt where the restriction is intentional (not just automated blocking)

[[mr.robot.id]] maintains a blocklist of domains the [[Fellowship]] does not retrieve content from, stored at /fellowship/skills/assets/fetch_blocklist.md. This list is updated as new problematic domains are identified.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**Primary method:** Anthropic [[web_fetch]] tool (available natively in Claude API).
**Fallback:** Jina Reader API (r.jina.ai/[url]) for pages that resist standard fetch — returns clean markdown from most pages including some bot-protected ones.
**HTML parsing:** Cheerio for Node.js. Extract main content, strip navigation, ads, footers. Return clean article/page content.
**PDF handling:** If URL resolves to a PDF, route to document processing rather than HTML parsing.
**Caching:** Fetched pages cached in Aragorn for the session. Same URL fetched twice in one session returns cached version unless FRESH flag set.
**Rate limiting:** Maximum 10 fetches per minute per project run. Prevents accidental hammering of a single domain.

---

*Web Fetch & URL Processing — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/web_fetch.md*
