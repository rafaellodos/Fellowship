# SKILL: WEB SEARCH & REAL-TIME INTELLIGENCE
## [[Fellowship]] Skill — Live Information Retrieval
### Lives at: /fellowship/skills/web_search.md
### Available to: [[Archer.ID]], [[Harvey.ID]], [[Mr. Robot.ID]], [[Merry.ID]], [[Pippin.ID]], [[Fellowship of the Raf .MK1/Gandalf.ID]]

---

## WHAT THIS SKILL IS

Real-time web search. The ability to retrieve current information — market data, competitor activity, news, pricing, people, companies, regulatory changes — that is not in Frodo or Legolas because it didn't exist or wasn't captured when the [[Fellowship]] last ran.

Without this skill, [[Archer.ID]] scans for opportunities in static knowledge. [[Harvey.ID]] analyses competitive positions from training data that may be months old. With it, both operate on current information. The difference between a strategist working from last quarter's intelligence and one working from today's is the difference between good advice and actionable advice.

This is the highest-leverage Tier 1 skill because it upgrades two of the [[Fellowship]]'s most consequential agents simultaneously.

---

## AGENTS WITH ACCESS

| Agent | Primary Use | Query Type |
|---|---|---|
| [[Archer.ID]] | Opportunity scanning, cross-domain connections, market gaps | Exploratory — broad then narrow |
| [[Harvey.ID]] | Competitive intelligence, market positioning, people research | Targeted — specific entities and signals |
| [[Mr. Robot.ID]] | Security intelligence, CVE lookups, compliance changes, legal updates | Precise — specific technical and legal queries |
| [[Merry.ID]] | Verifying incoming information, fact-checking flagged inputs | Confirmatory — single-fact verification |
| [[Pippin.ID]] | Enriching context on URLs and documents, verifying claims in ingested content | Supplementary — fills gaps in ingested material |
| [[Fellowship of the Raf .MK1/Gandalf.ID]] | Direct research when no specialist is deployed, escalation verification | On-demand — when faster than deploying [[Archer.ID]] |

---

## HOW AGENTS CALL THIS SKILL

When an agent needs to search, they construct a search call using this schema:

```
SEARCH_CALL:
  Query: [specific search string — 2-8 words, no filler]
  Intent: [what the agent is trying to find out — one sentence]
  Depth: [SURFACE / DEEP]
  Max results: [3-10]
  Date filter: [RECENT / ANY — use RECENT for anything where currency matters]
```

**SURFACE** — top results, quick scan, used when the agent needs a signal not a full picture.
**DEEP** — multiple queries, cross-referenced, used when [[Archer.ID]] or [[Harvey.ID]] is building a full intelligence picture.

---

## QUERY CONSTRUCTION RULES

These rules exist because bad queries produce bad results, and bad results fed into agent reasoning produce confident wrong outputs — which is worse than no output.

**Be specific.** "AI voice agent market" is a poor query. "AI voice agent platforms SMB contractors 2025" is a good query. The more specific the query the more signal in the results.

**One intent per query.** Do not try to answer two questions in one search. Split them. Run two searches.

**Use RECENT by default for anything market, competitive, or regulatory.** Information about markets, competitors, pricing, and regulation that is more than six months old is often worse than no information because it creates false confidence.

**Never search for what you already know.** If Frodo or Legolas contains reliable current information on the topic, use it. Search is for what the [[Fellowship]] doesn't already have.

**Verify before presenting as fact.** A single search result is a signal. Two corroborating results from independent sources is a finding. Present the difference accurately.

---

## OUTPUT FORMAT

When an agent uses web search, their output to Aragorn includes:

```
SEARCH RECORD:
  Queries run: [list of queries]
  Sources found: [list of sources with URLs]
  Key findings: [bulleted — what the search actually returned]
  Confidence: [HIGH / MEDIUM / LOW — based on source quality and corroboration]
  Currency: [when the most recent source was published]
  Gaps: [what the search didn't find that would complete the picture]
```

The search record is always included even when findings are negative. A search that found nothing useful is still a finding — it tells the [[Fellowship]] something about information availability on that topic.

---

## SOURCE QUALITY HIERARCHY

Agents weight sources in this order:

1. Primary sources — company websites, official filings, government databases, peer-reviewed research
2. Established journalism — FT, WSJ, Reuters, sector-specific trade publications
3. Analyst reports and research — Gartner, CB Insights, sector analysts
4. Secondary aggregators — news aggregators, industry blogs with named authors
5. Forums, social, anonymous sources — signal only, never cite as evidence

A finding supported only by Tier 5 sources is flagged as unverified. [[Harvey.ID]] and [[Archer.ID]] never present Tier 5 sources as competitive intelligence without explicit uncertainty labelling.

---

## HARVEY-SPECIFIC USAGE

[[Harvey.ID]]'s competitive intelligence function depends on this skill. His specific search patterns:

**Competitor monitoring:** Company name + recent activity signals (funding, hiring, product launch, pricing change)
**Market sizing:** Market + size + year + geography
**People research:** Name + role + company + recent (for relationship intelligence before a conversation)
**Deal intelligence:** Company + funding stage + investors + recent
**Regulatory scanning:** Regulation + industry + geography + recent

[[Harvey.ID]] runs these searches before every significant commercial engagement. Walking into a client conversation without current intelligence is, in [[Harvey.ID]]'s words, the equivalent of showing up unprepared. This skill is what prevents that.

---

## ARCHER-SPECIFIC USAGE

[[Archer.ID]]'s cross-domain connection function depends on this skill. His specific search patterns:

**Analogy hunting:** Problem type + solution + different industry (finds proven solutions from adjacent domains)
**Gap scanning:** Market + underserved + OR unmet + need
**Timing signals:** Trend + emerging + year (finds what's becoming relevant before it's obvious)
**Connection mapping:** Concept A + concept B + intersection (finds where two domains have already been combined)

[[Archer.ID]] runs exploratory searches differently from [[Harvey.ID]]. Where [[Harvey.ID]] targets specific intelligence, [[Archer.ID]] follows tangents deliberately — the unexpected result from a search is often more valuable than the expected one. [[Archer.ID]]'s search sessions are longer and less linear. This is correct behaviour for his function.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**API:** Anthropic web search tool (available natively in Claude API) or Brave Search API as alternative.
**Rate limiting:** Log all searches to prevent redundant queries across agents in the same run.
**Caching:** Results cached in Aragorn for the session duration. Same query in the same session returns cached results unless FRESH flag is set.
**Cost tracking:** Each search call logged with approximate token cost. [[Fellowship of the Raf .MK1/Gandalf.ID]] monitors search volume per project run.

---

*Web Search & Real-Time Intelligence — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/web_search.md*
