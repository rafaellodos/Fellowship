# SKILL: CRM READ/WRITE
## [[Fellowship]] Skill — Contact and Deal Intelligence
### Lives at: /fellowship/skills/crm_read_write.md
### Available to: [[Harvey.ID]] (primary), [[Merry.ID]], [[Fellowship of the Raf .MK1/Gandalf.ID]]

---

## WHAT THIS SKILL IS

Direct read and write access to Rafael's contact and deal records across Airtable and Google Sheets. The ability to retrieve relationship history before a conversation, log what happened after one, update deal stages as they move, and surface relationship intelligence that would otherwise sit unseen in a spreadsheet.

Without this skill, [[Harvey.ID]] reasons about relationships and deals from whatever Rafael tells him in the brief. With it, [[Harvey.ID]] reads the actual history — last contact date, prior conversations, deal stage, open items — and the intelligence is grounded in reality rather than memory.

This is the skill that makes [[Harvey.ID]] a functioning business development engine rather than a strategic advisor who has to be manually briefed every time.

---

## AGENTS WITH ACCESS

| Agent | Access Level | Primary Use |
|---|---|---|
| [[Harvey.ID]] | Read + Write | Relationship intelligence, deal tracking, pre-conversation briefings, post-conversation logging |
| [[Merry.ID]] | Read + Write | Logging incoming client communications to contact records, flagging contact-related inputs |
| [[Fellowship of the Raf .MK1/Gandalf.ID]] | Read only | Project context — understanding relationship history when it's relevant to a project plan |

---

## DATA SOURCES

### SOURCE 1 — AIRTABLE
Rafael's operational Airtable base. The [[Fellowship]] reads from and writes to specific tables.

**Tables in scope:**

| Table | Read | Write | Purpose |
|---|---|---|---|
| Contacts | ✓ | ✓ | All contacts — clients, prospects, partners, collaborators |
| Deals | ✓ | ✓ | Active and historical deal records |
| Interactions | ✓ | ✓ | Log of every significant contact interaction |
| Companies | ✓ | ✗ | Company records — read only, updated manually |

**Tables out of scope:**
Anything related to AvenoirTech's operational pipeline for Plenty Pavers — that's a client system, not Rafael's personal CRM. The [[Fellowship]] does not write to client operational data.

### SOURCE 2 — GOOGLE SHEETS
Rafael's contact and pipeline spreadsheets. Read-only access — Sheets is the source of record for data that hasn't been migrated to Airtable yet. Write operations go to Airtable only.

---

## READ OPERATIONS

### CONTACT LOOKUP
Retrieve a contact record by name, company, or email.

```
CRM_READ:
  Operation: CONTACT_LOOKUP
  Query: [name / company / email]
  Returns: Full contact record — name, company, role, last contact date,
           relationship notes, deal history, open items
```

### DEAL STATUS
Retrieve current status of an active deal.

```
CRM_READ:
  Operation: DEAL_STATUS
  Query: [deal name / company name]
  Returns: Deal stage, value, last activity, next action, notes
```

### RELATIONSHIP BRIEF
Pre-conversation intelligence package. [[Harvey.ID]]'s primary read operation.

```
CRM_READ:
  Operation: RELATIONSHIP_BRIEF
  Contact: [name]
  Returns:
    - Who this person is and their role
    - History of interactions — dates, topics, outcomes
    - Current deal status if applicable
    - Open items from prior conversations
    - Last contact date and what was discussed
    - Rafael's notes on this person if any
    - Harvey's recommended approach given the history
```

### PIPELINE OVERVIEW
Full view of active deals and relationship status across all contacts.

```
CRM_READ:
  Operation: PIPELINE_OVERVIEW
  Filter: [ALL / ACTIVE_DEALS / PROSPECTS / CLIENTS / OVERDUE]
  Returns: Structured list with deal stage, last contact, next action per record
```

---

## WRITE OPERATIONS

### LOG INTERACTION
Record a contact interaction after it happens. [[Harvey.ID]] logs this after every significant conversation.

```
CRM_WRITE:
  Operation: LOG_INTERACTION
  Contact: [name]
  Date: [YYYY-MM-DD]
  Type: [CALL / EMAIL / MEETING / MESSAGE / OTHER]
  Summary: [what was discussed — 2-5 sentences]
  Outcome: [what was agreed or what happened]
  Next Action: [what happens next, who does it, by when]
  Deal Impact: [PROGRESSED / STALLED / LOST / NO CHANGE / N/A]
```

### UPDATE DEAL STAGE
Move a deal forward or back in the pipeline.

```
CRM_WRITE:
  Operation: UPDATE_DEAL_STAGE
  Deal: [deal name]
  New Stage: [PROSPECT / QUALIFIED / PROPOSAL / NEGOTIATION / CLOSED_WON / CLOSED_LOST]
  Note: [why the stage changed]
```

### ADD CONTACT
Create a new contact record.

```
CRM_WRITE:
  Operation: ADD_CONTACT
  Name: [full name]
  Company: [company name]
  Role: [their role]
  Source: [how Rafael knows them / where they came from]
  Initial Notes: [anything relevant to the relationship]
  Deal: [associate with existing deal if applicable]
```

### FLAG OPEN ITEM
Mark something that needs to be followed up on.

```
CRM_WRITE:
  Operation: FLAG_OPEN_ITEM
  Contact: [name]
  Item: [what needs to happen]
  Due: [date or timeframe]
  Owner: [Rafael / Fellowship]
```

---

## [[Harvey.ID]]'S CRM WORKFLOW

[[Harvey.ID]] uses this skill in two moments on every commercial project:

**BEFORE a conversation or engagement:**
[[Harvey.ID]] runs RELATIONSHIP_BRIEF on every contact involved. He reads the full history before advising on approach. He never walks Rafael into a conversation cold if there's history in the system. The brief informs his strategic recommendation — what to say, what to avoid, what the prior context means for how this conversation should go.

**AFTER a conversation or engagement:**
[[Harvey.ID]] logs the interaction with LOG_INTERACTION. Stage updates follow if the deal moved. Open items are flagged. The record is current before the next run.

This two-touch workflow — brief before, log after — is what turns a contact database into a living relationship intelligence system. The data compounds. Six months in, [[Harvey.ID]] has genuine longitudinal context on every significant relationship. That context is the asset.

---

## [[Merry.ID]]'S CRM WORKFLOW

[[Merry.ID]] uses this skill to close the loop between incoming communications and contact records.

When [[Merry.ID]] processes an incoming email, message, or call from a known contact, he:
1. Runs CONTACT_LOOKUP to confirm the contact exists
2. Logs the interaction with LOG_INTERACTION (type: inbound, summary of the content)
3. Flags to [[Harvey.ID]] if the interaction is deal-related
4. Flags open items if the contact has raised something that needs a response

This means [[Harvey.ID]]'s RELATIONSHIP_BRIEF always includes recent inbound activity — not just outbound interactions Rafael initiated.

---

## DATA INTEGRITY RULES

**Write what happened, not what should have happened.** CRM records are the honest account of the relationship. Logging a conversation that went poorly as neutral because it's uncomfortable to document is a failure of the system. [[Harvey.ID]] logs what actually occurred.

**Never overwrite prior entries.** All CRM writes are appends. Prior interaction logs are never modified. If something was logged incorrectly, a correction entry is added with a note that it corrects the prior record.

**Contact records are Rafael's relationship capital.** They are treated accordingly. No contact data is shared, exported, or used outside the [[Fellowship]] without explicit authorisation.

**Airtable is the source of truth. Sheets is the legacy source.** When the two conflict, Airtable wins. Data migration from Sheets to Airtable is a background task for [[Meeseeks.ID]] — not a prerequisite for using this skill.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**Airtable:** Airtable REST API. Personal Access Token stored in environment variables — never in agent files or project directories.
**Google Sheets:** Google Sheets API v4. Service account credentials stored in environment variables.
**Rate limiting:** Airtable API rate limit is 5 requests/second per base. Queue writes if running multiple operations.
**Error handling:** Failed writes are logged to Aragorn as errors and flagged to [[Fellowship of the Raf .MK1/Gandalf.ID]]. Never silently dropped.
**Field mapping:** Airtable field names mapped to the schema above in /fellowship/skills/assets/crm_field_map.md — update when Airtable base structure changes.

---

*CRM Read/Write — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/crm_read_write.md*
