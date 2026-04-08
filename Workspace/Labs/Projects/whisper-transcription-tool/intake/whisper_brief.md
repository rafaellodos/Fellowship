# PROJECT: whisper-transcription-tool
## Intake Brief — SOLO Run
### /workspace/Labs/Projects/whisper-transcription-tool/intake/brief.md
### Date: 2026-03-16

---

## WHAT I WANT

A local Python script that takes an audio file as input and returns a clean transcript as a text file. It should handle the audio formats Pippin will encounter — .m4a, .mp3, .ogg, .wav — and output both a raw verbatim transcript and a cleaned version with filler words removed. It needs to run from the command line in Windsurf without requiring an external API call.

---

## WHY THIS MATTERS

Pippin's intake protocol handles voice notes as the highest-value input type. Without this script, voice note transcription either requires a paid API call on every file or falls back to Claude attempting direct audio processing — which is unreliable. This script is the reliable local layer that makes voice note ingestion consistent and free after setup.

---

## CONTEXT

The script will be called by Pippin during intake runs. The call pattern from the Windsurf rule is:

```
python whisper_transcribe.py [audio_filepath]
```

Output will be read by Pippin and processed into Frodo entries. The script lives permanently at `/workspace/Labs/tools/whisper_transcribe.py` and is called from any workspace context.

Rafael does not code. The script needs to install its own dependencies cleanly on first run with a setup check — not require Rafael to manually install anything beforehand.

Whisper runs locally via the `openai-whisper` Python package. No API key required. Model size should default to `base` for speed — good enough for clear voice notes. `small` as an optional flag for noisier audio.

---

## CONSTRAINTS

- **Runtime:** Python 3.9+. No exotic dependencies beyond openai-whisper and its requirements (numpy, torch).
- **No API calls:** Must run fully offline after initial model download. The model downloads once on first run, then runs locally.
- **Self-installing:** On first run, script checks for dependencies and installs them if missing. Prints clear instructions if it cannot install automatically.
- **Cross-platform:** Must work on Mac (Rafael's primary environment) and not break on Windows.
- **Output location:** Transcripts written to same directory as input file, with `_raw.txt` and `_clean.txt` suffixes. Example: `voice_note.m4a` → `voice_note_raw.txt` + `voice_note_clean.txt` 
- **Silent on success:** Minimal stdout. Just the transcript path on success, a clear error message on failure. Pippin reads stdout — noise breaks the pipeline.

---

## SUCCESS CRITERIA

1. `python whisper_transcribe.py /path/to/voice_note.m4a` runs without error on a clean Mac with Python installed
2. Produces `voice_note_raw.txt` containing verbatim transcript
3. Produces `voice_note_clean.txt` with filler words (um, uh, like, you know) stripped and run-on sentences broken at natural pause points
4. Handles all four formats: .m4a, .mp3, .ogg, .wav
5. First-run setup installs dependencies without Rafael typing anything extra
6. Fails gracefully with a readable error if the file doesn't exist, is corrupted, or the format is unsupported
7. Runs in under 60 seconds on a standard voice note (2–5 minutes of audio) using the `base` model

---

## TYPE SIGNALS

[x] Technical build / code / architecture

---

## MODE

[x] SOLO — Rick only. Single script. One session.

---

## AGENTS

Rick builds. Mr. Robot reviews before the script touches any file system paths — specifically checking that the output write logic cannot accidentally overwrite existing files and that the dependency installation cannot cause system-level issues.

---

## OPEN QUESTIONS

- Should the script handle batch processing — a folder of files rather than a single file? Rick's call on whether to include this in v1 or defer. Lean toward defer — keep v1 minimal and working.
- ffmpeg is a dependency for some audio format conversions in Whisper. If ffmpeg is not installed, the script should detect this and print a one-line install instruction (`brew install ffmpeg`) rather than failing silently or with a cryptic error.

---

*Brief — whisper-transcription-tool*
*SOLO run — Rick + Mr. Robot review*
*Labs workspace*
