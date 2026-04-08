# SKILL: EMAIL DRAFTING & SEND
## [[Fellowship]] Skill — Outreach Loop Completion
### Lives at: /fellowship/skills/email_drafting_send.md
### Available to: [[Chinaski.ID]] (drafting), [[Harvey.ID]] (strategy), [[Merry.ID]] (send), [[Fellowship of the Raf .MK1/Gandalf.ID]] (approval queue)

---

## WHAT THIS SKILL IS

The complete outreach loop — from identifying who to contact and why, to drafting the email in Rafael's voice, to queuing it for bulk approval, to sending it — without Rafael having to touch Gmail for anything below his attention threshold.

The [[Fellowship]] identifies the target. [[Harvey.ID]] determines the angle and what the email needs to achieve. [[Chinaski.ID]] writes it in Rafael's register. It goes into the approval queue. Rafael reviews a summary of everything queued, approves in bulk or edits individually, and [[Merry.ID]] sends. The loop closes.

Without this skill, every piece of outreach requires Rafael to context-switch into Gmail, find the thread, think about what to say, write it, and send it. With it, outreach happens at [[Fellowship]] speed — drafted while Rafael is doing something else, reviewed in a single batch, sent on confirmation.

---

## THE LOOP — HOW IT WORKS END TO END

```
IDENTIFY      Harvey flags outreach opportunity or Rafael brief requests it
    ↓
STRATEGISE    Harvey determines: who, what angle, what outcome needed
    ↓
DRAFT         Chinaski writes the email in Rafael's voice
    ↓
REVIEW        Mr. Robot flags any compliance or legal concerns (if applicable)
    ↓
QUEUE         Email enters the Approval Queue with summary
    ↓
APPROVE       Rafael reviews the queue summary, approves / edits / rejects each
    ↓
SEND          Merry sends approved emails via Gmail
    ↓
LOG           Harvey logs the interaction to CRM
```

---

## AGENTS AND THEIR ROLES

| Agent | Role in Loop |
|---|---|
| [[Harvey.ID]] | Identifies the outreach target, determines the strategic angle, specifies what the email needs to achieve, recommends subject line approach |
| [[Chinaski.ID]] | Writes the email. Rafael's voice. Reads relevant Legolas voice samples and CRM history before drafting. |
| [[Mr. Robot.ID]] | Reviews any email that touches legal, contractual, or compliance-sensitive topics — flags before queueing |
| [[Merry.ID]] | Executes the send via Gmail API. Logs send confirmation. Monitors for replies and routes them back through ingestion. |
| [[Fellowship of the Raf .MK1/Gandalf.ID]] | Manages the approval queue. Generates the summary Rafael reviews. Records decisions. |

---

## EMAIL TYPES

### TYPE 1 — COLD OUTREACH
First contact with a prospect or potential collaborator. No prior relationship in the CRM.

[[Harvey.ID]]'s brief to [[Chinaski.ID]] includes:
- Who this person is and why they're being contacted now
- What Rafael is offering or proposing
- The desired outcome from this specific email
- Tone guidance — how formal, how direct, what to avoid

[[Chinaski.ID]]'s approach: short, specific, human. Cold outreach in Rafael's voice is never corporate. It sounds like a person who has done their homework and has something genuinely relevant to say.

### TYPE 2 — WARM FOLLOW-UP
Following up on a prior interaction — a meeting, a proposal sent, a conversation that went well.

[[Harvey.ID]] reads CRM history first. [[Chinaski.ID]] writes with full knowledge of what was said before and what the relationship looks like. The email references specific prior context — not generically "following up on our conversation" but exactly what was discussed and what the next step is.

### TYPE 3 — CLIENT COMMUNICATION
Communication with an existing Inspiracy or AvenoirTech client. Operational, relational, or about active work.

These require higher accuracy and tone care than outreach. [[Chinaski.ID]] reads the client's communication history in CRM and matches the register of the existing relationship. [[Fellowship of the Raf .MK1/Gandalf.ID]] reviews client communications before they enter the queue — they don't go straight to bulk approval.

### TYPE 4 — OPERATIONAL
Scheduling confirmations, document sends, administrative follow-ups. Low stakes, high volume.

[[Merry.ID]] handles these using templates rather than [[Chinaski.ID]]. [[Chinaski.ID]]'s time is for writing that matters. Operational email templates live in /fellowship/skills/assets/email_templates/.

---

## THE APPROVAL QUEUE

The approval queue is the central mechanism. It is how Rafael maintains control over outreach without being in the loop for every individual email.

**Queue format — what Rafael sees:**

```
APPROVAL QUEUE — [date]
[N] emails pending approval

─────────────────────────────────────
1. TO: [Name] at [Company]
   TYPE: Cold Outreach
   HARVEY'S ANGLE: [one sentence — why this person, why now]
   SUBJECT: [proposed subject line]
   PREVIEW: [first two lines of the email]
   CRM STATUS: [New contact / Prior contact — last spoke X days ago]
   ACTION: [ ] APPROVE  [ ] EDIT  [ ] REJECT
─────────────────────────────────────
2. TO: [Name]
   TYPE: Warm Follow-up
   HARVEY'S ANGLE: [one sentence]
   SUBJECT: [proposed subject line]
   PREVIEW: [first two lines]
   CRM STATUS: [context]
   ACTION: [ ] APPROVE  [ ] EDIT  [ ] REJECT
─────────────────────────────────────
[continues for all queued emails]

BULK ACTION: [ ] APPROVE ALL  [ ] REVIEW INDIVIDUALLY
```

**Approval queue is generated:**
- On demand when Rafael requests it
- Daily at a defined time if emails are queued (default: 09:00, adjustable in preferences)
- Immediately for any email [[Fellowship of the Raf .MK1/Gandalf.ID]] has flagged as time-sensitive

**What APPROVE means:** Email sends exactly as drafted. [[Merry.ID]] sends, CRM logs.

**What EDIT means:** Rafael modifies the email before send. The edited version sends. CRM logs with a note that Rafael edited the draft.

**What REJECT means:** Email does not send. [[Harvey.ID]] logs the rejection with Rafael's reason if provided. The contact remains in CRM with a note that outreach was considered and declined.

---

## [[Chinaski.ID]]'S DRAFTING PROTOCOL

[[Chinaski.ID]] does not write cold emails that sound like cold emails. He does not write follow-ups that begin "I hope this email finds you well." He does not produce the generic output that gets deleted without being read.

Before drafting, [[Chinaski.ID]] reads:
1. [[Harvey.ID]]'s brief — who, angle, desired outcome
2. CRM history — everything logged about this person and their relationship with Rafael
3. Legolas voice samples — Rafael's email register specifically
4. Web fetch on the recipient's recent activity if [[Harvey.ID]] has flagged it as relevant

The email is short. It sounds like Rafael wrote it at his desk without a template. It has a reason for existing. It asks for something specific or offers something specific. It does not try to accomplish too much in one send.

**[[Chinaski.ID]]'s email constraints:**
- Maximum 200 words for cold outreach
- Maximum 300 words for warm follow-up
- Subject line under 8 words, specific not generic
- One clear ask or offer — not multiple
- No attachments on cold outreach — link to a document if needed, never attach

---

## [[Merry.ID]]'S SEND PROTOCOL

[[Merry.ID]] executes sends via the Gmail API after receiving [[Fellowship of the Raf .MK1/Gandalf.ID]]'s approval confirmation.

**Send confirmation:** Every send is confirmed — [[Merry.ID]] verifies delivery status before logging. Failed sends are flagged to [[Fellowship of the Raf .MK1/Gandalf.ID]] immediately, not silently dropped.

**Send timing:** [[Merry.ID]] does not send emails at unusual hours. Business hours only (09:00–18:00 in the recipient's timezone if determinable, otherwise Rafael's timezone). Emails approved outside business hours are queued and sent at 09:00 the next business day unless flagged as urgent.

**Reply monitoring:** [[Merry.ID]] watches for replies to sent emails. When a reply arrives, it is processed through standard ingestion — classified as a client or prospect communication, flagged to [[Harvey.ID]] if deal-related, logged to CRM.

**Thread management:** [[Merry.ID]] sends from the correct email address for the context — Rafael's personal Gmail for personal outreach, Inspiracy address for Inspiracy client work, AvenoirTech address for AvenoirTech outreach. Address profiles stored in /fellowship/skills/assets/email_profiles.md.

---

## CRM INTEGRATION

Every email sent through this skill is automatically logged to the CRM via the CRM Read/Write skill.

**On send:** [[Harvey.ID]] logs INTERACTION — type EMAIL_OUTBOUND, summary of what was sent, deal impact assessment.

**On reply received:** [[Merry.ID]] flags to [[Harvey.ID]]. [[Harvey.ID]] logs INTERACTION — type EMAIL_INBOUND, summary of the reply, updated deal stage if applicable, next action.

The outreach loop and the CRM record are the same record. No separate logging step for Rafael.

---

## COMPLIANCE AND LEGAL FLAGS

[[Mr. Robot.ID]] reviews any email before it enters the queue if it contains:
- References to contracts, agreements, or legal commitments
- Pricing or commercial terms
- Claims about capabilities, results, or guarantees
- Sensitive personal or business information

[[Mr. Robot.ID]]'s flag format for emails:
```
EMAIL COMPLIANCE REVIEW:
  Flag: [what the concern is]
  Severity: [HIGH / MEDIUM / LOW]
  Recommendation: [specific edit that resolves the concern]
  Block send: [YES / NO — HIGH severity blocks, MEDIUM and LOW are advisory]
```

HIGH severity flags block the email from queueing until resolved. Rafael is notified. Medium and low flags appear in the approval queue as advisory notes alongside the email.

---

## WHAT THIS SKILL NEVER DOES

**Never sends without approval.** The approval queue is not optional. Every email — including operational type 4 emails — either goes through the queue or uses a pre-approved template. There is no autonomous send outside these two paths.

**Never uses a generic template for relationship-critical emails.** Cold outreach and warm follow-up are always written fresh by [[Chinaski.ID]]. Templates are for scheduling confirmations and document sends only.

**Never sends to a contact who has unsubscribed or asked not to be contacted.** The CRM blocklist is checked before every send. A contact flagged DO_NOT_CONTACT in the CRM is never queued.

**Never sends from the wrong address.** Address selection is explicit and logged. An Inspiracy email does not go from an AvenoirTech address.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**API:** Gmail API v1. OAuth2 credentials. Scopes: gmail.send + gmail.readonly for reply monitoring.
**Send method:** messages.send with raw MIME message. [[Chinaski.ID]]'s draft converted to MIME format before send.
**Reply monitoring:** Gmail push notifications via Cloud Pub/Sub, or polling every 15 minutes as fallback.
**Approval queue storage:** Airtable table — Email_Queue. Fields: recipient, type, subject, body, Harvey_angle, status (PENDING/APPROVED/EDITED/REJECTED/SENT), send_time, CRM_contact_id.
**Bulk approval:** Single API call updates all APPROVED records to SENT status and triggers the send queue.
**Thread ID tracking:** Gmail thread IDs stored in CRM interaction log. Enables reply detection and thread continuation.

---

*Email Drafting & Send — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/email_drafting_send.md*
