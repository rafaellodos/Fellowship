# SKILL: VOICE TRANSCRIPTION PIPELINE
## [[Fellowship]] Skill — Audio to Structured Text
### Lives at: /fellowship/skills/voice_transcription.md
### Available to: [[Pippin.ID]] (primary), [[Merry.ID]] (secondary)

---

## WHAT THIS SKILL IS

The ability to receive an audio file — voice note, recorded meeting, phone call, dictated brief — and return accurate, structured text that the [[Fellowship]] can work with.

This skill closes the gap between how Rafael actually thinks and how the [[Fellowship]] receives his thinking. Rafael thinks out loud. He records voice notes while driving, walking, between meetings. Some of his sharpest ideas arrive as a two-minute ramble that contains one genuinely load-bearing thought buried in the middle. Without this skill, that material either never enters the system or enters it in degraded form through manual transcription.

With this skill, the friction between thought and [[Fellowship]] drops to near zero. Speak a brief. [[Pippin.ID]] transcribes it, structures it, routes it. The [[Fellowship]] has it within minutes.

---

## AGENTS WITH ACCESS

| Agent | Role | Usage |
|---|---|---|
| [[Pippin.ID]] | Primary | All unstructured voice input — voice notes, dictated ideas, audio brain dumps |
| [[Merry.ID]] | Secondary | Structured voice inputs — recorded client calls, meeting audio with clear agenda |

---

## SUPPORTED INPUT TYPES

| Format | Max Length | Notes |
|---|---|---|
| .m4a | 30 min | Standard iPhone voice memo format |
| .mp3 | 30 min | Standard compressed audio |
| .wav | 30 min | Uncompressed — larger file, same processing |
| .mp4 (audio) | 30 min | Video file, audio extracted |
| .ogg | 30 min | WhatsApp audio format |

Files longer than 30 minutes are split into segments and processed sequentially. [[Pippin.ID]] reassembles the transcript in order.

---

## [[Pippin.ID]]'S TRANSCRIPTION PROTOCOL

[[Pippin.ID]] handles voice transcription as an extension of his unstructured ingestion function. The protocol runs in four steps:

**STEP 1 — TRANSCRIBE**
Full verbatim transcription. Every word, including false starts, filler words (uh, um, like), self-corrections. Verbatim is preserved because Rafael's verbal rhythm and word choice carry information. [[Chinaski.ID]] reads voice samples from Legolas — a cleaned-up transcription loses the voice.

Verbatim transcript written to: `/projects/[name]/outputs/pippin/raw_transcript_[timestamp].md`

**STEP 2 — CLEAN**
A second pass producing a cleaned version — false starts removed, run-on sentences broken, filler words stripped. The cleaned version is what gets processed for meaning. The raw version is archived.

Cleaned transcript written to: `/projects/[name]/outputs/pippin/clean_transcript_[timestamp].md`

**STEP 3 — PARSE**
[[Pippin.ID]] reads the cleaned transcript and identifies distinct elements — same as his standard brain dump processing:
- Ideas (complete or half-formed)
- Decisions stated
- Tasks mentioned
- Questions raised
- References to people, projects, or prior work
- Emotional register (excited, concerned, uncertain — relevant context)

**STEP 4 — ROUTE**
Standard [[Pippin.ID]] routing:
- Half-formed ideas connecting to active projects → flag to [[Fellowship of the Raf .MK1/Gandalf.ID]]
- Explicit tasks → route to task queue
- Project-relevant content → write to Frodo tagged to project
- Voice samples with strong register → flag as Legolas candidate
- Everything → written to Frodo with full parse

---

## VOICE BRIEF MODE

When Rafael records a voice note as a project brief — "I want to tell [[Fellowship of the Raf .MK1/Gandalf.ID]] about a project I'm thinking about" — [[Pippin.ID]] activates Voice Brief Mode.

In this mode, [[Pippin.ID]]'s parse output produces a structured brief.md draft using the project schema format. The draft is written to `/projects/[name]/brief_draft.md` and flagged to [[Fellowship of the Raf .MK1/Gandalf.ID]] as a brief requiring review before the intake protocol begins.

[[Fellowship of the Raf .MK1/Gandalf.ID]] reviews the draft brief, stress-tests it as normal, and either proceeds or returns it to Rafael with specific questions. The voice note is the input. The structured brief is the output. Rafael never has to fill in a form.

**Trigger phrase for Voice Brief Mode:**
Any voice note that begins with or contains: "brief for...", "I want to start a project...", "[[Fellowship of the Raf .MK1/Gandalf.ID]] I need...", "new project..." — [[Pippin.ID]] recognises these as brief-mode triggers and activates accordingly.

---

## MULTI-SPEAKER AUDIO

For recorded meetings or calls with multiple speakers, [[Pippin.ID]] uses speaker diarisation — labelling who is speaking when. Format:

```
[SPEAKER A — Rafael]: text of what was said
[SPEAKER B — Unknown / Name if identified]: text
```

[[Pippin.ID]] attempts to identify speakers from context (Rafael's voice is known from prior transcriptions in Legolas, names mentioned in conversation). Unidentified speakers are labelled Unknown until context identifies them.

For client calls specifically: [[Merry.ID]] handles these as structured inputs, flags them as client communications, and routes them to [[Harvey.ID]] for relationship intelligence processing in addition to standard Frodo filing.

---

## LEGOLAS VOICE SAMPLE FLAGGING

[[Pippin.ID]] flags transcripts as Legolas candidates when:
- The content contains extended first-person reflection or opinion
- The register is distinctively Rafael's — the rhythm, the digressions, the specific word choices
- The content covers a topic [[Chinaski.ID]] is likely to write about

Flagged transcripts are not indexed automatically. [[Fellowship of the Raf .MK1/Gandalf.ID]] reviews and confirms. The raw transcript, not the cleaned version, is what gets indexed — [[Chinaski.ID]] needs the authentic voice, not the sanitised version.

---

## QUALITY FLAGS

[[Pippin.ID]] flags transcription quality issues in the output:

```
TRANSCRIPTION QUALITY:
  Audio quality: [CLEAR / ACCEPTABLE / DEGRADED]
  Confidence: [HIGH / MEDIUM / LOW]
  Unclear segments: [timestamp ranges where audio was unclear]
  Assumed words: [words Pippin inferred from context — marked [?] in transcript]
```

Low confidence transcriptions are flagged to [[Fellowship of the Raf .MK1/Gandalf.ID]] before being routed further. A transcription [[Pippin.ID]] isn't sure about is worse than no transcription if the content is load-bearing.

---

## IMPLEMENTATION NOTES
*(For Claude Code build — not agent-facing)*

**API:** OpenAI Whisper API (whisper-1 model) or Groq Whisper for faster processing.
**Speaker diarisation:** AssemblyAI if multi-speaker support needed — Whisper alone does not diarise.
**File handling:** Audio files stored temporarily in /tmp/ during processing, deleted after transcript is confirmed written to Frodo. Raw audio is not persisted in the [[Fellowship]] file system — only the transcript.
**WhatsApp integration:** WhatsApp audio (.ogg format) arrives via [[Merry.ID]]'s WhatsApp channel monitor. [[Merry.ID]] detects voice message type and routes to [[Pippin.ID]] rather than processing as text.
**Mobile trigger:** A WhatsApp message to the [[Fellowship]] number that is a voice note automatically triggers this pipeline. This is the primary daily interaction pattern — Rafael speaks, the [[Fellowship]] processes.

---

*Voice Transcription Pipeline — [[Fellowship]] Skill*
*Version 1.0 — 2026-03-16*
*Lives at /fellowship/skills/voice_transcription.md*
