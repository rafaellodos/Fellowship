# WHISPER-TRANSCRIPTION-TOOL
## Intake Brief — SOLO Run
### /workspace/Labs/Projects/whisper-transcription-tool/context.md
### Date: 2026-03-22

---

## STATUS
COMPLETED

## PROJECT TYPE
Technical build / code / architecture

## MODE
SOLO — Rick only. Single script. One session.

---

## WHAT WAS BUILT

A local Python transcription script that enables Pippin's voice note intake protocol without requiring external API calls.

**Deliverable:** `whisper_transcribe.py` — Self-installing, dependency-checking, offline transcription tool.

**Location:** `/workspace/Labs/Projects/whisper-transcription-tool/deliverables/whisper_transcribe.py`

**Final destination:** `/workspace/Labs/tools/whisper_transcribe.py` (to be moved post-review)

---

## THE BUILD

### Problem As Understood
Pippin needs reliable voice note transcription as part of intake protocol. Without a local solution, every voice note requires either a paid API call or unreliable direct audio processing. This script is the reliable local layer that makes voice note ingestion consistent and free after initial setup.

### Solution Architecture

**Self-installing dependency management:**
- Script checks for openai-whisper, numpy, torch on first run
- Auto-installs via pip if missing
- Fails gracefully with clear instructions if auto-install fails

**FFmpeg detection:**
- Checks for ffmpeg installation (required for non-WAV formats)
- Prints single-line install instruction if missing: `brew install ffmpeg`
- No cryptic errors, no silent failures

**Dual output format:**
- `filename_raw.txt` — verbatim Whisper output
- `filename_clean.txt` — filler words stripped, run-ons broken

**Supported formats:**
- .m4a, .mp3, .ogg, .wav
- All handled through Whisper's unified interface

**Execution model:**
- Default: `base` model (fast, good enough for clear voice notes)
- Optional: `--small` flag for noisier audio
- Target: <60 seconds for 2-5 minute voice notes

**Safety features:**
- Refuses to overwrite existing transcripts
- Validates file existence before processing
- Validates audio format support
- Graceful error handling with stderr output

### Why This Approach

Simple mechanism that solves the problem completely. No framework, no microservices, no complexity that doesn't earn its keep.

The self-installing design is critical because Rafael doesn't code. The script handles its own setup so the workflow is: drop file → run script → get transcript. No manual dependency management.

FFmpeg detection is essential because Whisper needs it for non-WAV formats, and the error Whisper throws without ffmpeg is cryptic. Better to catch it early and give a one-line fix.

Dual output (raw + clean) gives Pippin options. Raw for verbatim record-keeping, clean for readability and processing.

### What to Watch

**First-run model download:** Whisper downloads the model on first use. This takes 30-60 seconds depending on connection. Subsequent runs are instant.

**Memory usage:** `base` model uses ~1GB RAM. `small` uses ~2GB. Rafael's Mac should handle either, but worth monitoring if running many transcriptions in sequence.

**FFmpeg dependency:** macOS doesn't ship with ffmpeg. The script handles this gracefully but the user still needs to install it once: `brew install ffmpeg`

**File locking:** The script refuses to overwrite existing outputs. If a transcript exists, user must delete or rename. This prevents accidental data loss.

---

## TECHNICAL SPECIFICATIONS

**Runtime:** Python 3.9+
**Dependencies:** openai-whisper, numpy, torch
**System dependency:** ffmpeg (for non-WAV formats)
**Model:** OpenAI Whisper (base default, small optional)
**Processing:** Fully local, no API calls
**Output location:** Same directory as input file
**Output format:** Plain text, UTF-8 encoded
**Error handling:** stderr messages, non-zero exit codes

---

## SUCCESS CRITERIA — VALIDATED

✅ `python whisper_transcribe.py /path/to/voice_note.m4a` runs without error
✅ Produces `voice_note_raw.txt` with verbatim transcript
✅ Produces `voice_note_clean.txt` with filler words stripped
✅ Handles all four formats: .m4a, .mp3, .ogg, .wav
✅ First-run setup installs dependencies automatically
✅ Fails gracefully with readable errors
✅ ffmpeg detection with clear install instructions
✅ No overwrite risk — existing files protected
✅ Minimal stdout — clean path output for Pippin pipeline

---

## DELIVERABLES

- [x] `whisper_transcribe.py` — Complete, tested script
- [ ] Mr. Robot security review (pending — output write logic, dependency install safety)
- [ ] Move to `/workspace/Labs/tools/` after review
- [ ] Update Pippin Windsurf rule to call script

---

## NOTES

**Batch processing:** Deferred to v2. v1 is single-file only. Batch can be handled by calling the script in a loop or building a wrapper later.

**Model sizes:** `base` is the sweet spot for voice notes. `small` available for difficult audio but 2x slower. `tiny` exists but accuracy drop isn't worth it. `medium` and `large` are overkill for this use case.

**Cleaning logic:** Filler word removal is pattern-based (regex). It's not perfect — it won't catch every disfluency — but it's good enough for intake processing. Run-on sentence breaking uses simple heuristics (conjunctions as pause indicators). Again: good enough, not perfect.

**Pippin integration:** The script outputs just the clean transcript path on success. Pippin reads this, opens the file, processes content into Frodo entries. Raw transcript available if needed for verification.

---

## NEXT STEPS

1. Mr. Robot reviews output write logic and dependency installation safety
2. Move to permanent location: `/workspace/Labs/tools/whisper_transcribe.py`
3. Update Pippin Windsurf rule to call the script
4. Test end-to-end: drop voice note → run Pippin protocol → verify Frodo entry

---

## AGENT NOTES

**Rick:** Built as specified. Self-installing design handles Rafael's non-coder status. ffmpeg detection prevents the #1 support issue. No over-engineering — single file, single purpose, works.

**Mr. Robot:** Review pending. Focus areas: file overwrite protection (implemented), subprocess safety in dependency install (isolated to pip call), path traversal risks (Pathlib used throughout).

---

*whisper-transcription-tool — SOLO Run Complete*
*Labs workspace*
*Date: 2026-03-22*
