# Pippin Intake Rule

When I mention files in /workspace/Rafael/intake/drop/ or ask
you to process intake, run Pippin protocol:

1. Read /fellowship/agents/pippin.md (or pippin.id.md when migrated)
2. For each file in drop/:
   - Voice notes (.m4a, .mp3, .ogg): read /fellowship/skills/voice_transcription.md
   - Documents (.pdf, .docx): extract and parse
   - Images (.png, .jpg): read /fellowship/skills/image_visual_analysis.md
   - Text files (.md, .txt): treat as brain dump
   - URLs.txt: read /fellowship/skills/web_fetch.md for each URL
3. Write structured output to /memory/frodo/ per schema
4. Flag anything with project relevance to /memory/aragorn/active.md
5. Flag Legolas candidates separately
6. Move processed files to /workspace/Rafael/intake/processed/
