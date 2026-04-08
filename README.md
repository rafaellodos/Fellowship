---

## Setup

**Prerequisites**
- Node.js 18+
- Python 3.8+
- Docker (optional)
- GPU with 12GB+ VRAM (for local model hosting)

**Dashboard**
```bash
git clone https://github.com/rafaellodos/Fellowship.git
cd Fellowship
cd Workspace/Labs/Projects/Fellowship\ Dashboard/app
npm install
npm run dev
```

**Self-hosted models (optional)**
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:7b-instruct
ollama pull qwen2.5:32b-instruct
ollama serve
```

**Configuration**

Edit `/Core/model_registry.md` with your API keys and routing preferences.

---

## Active Projects

- **Fellowship Dashboard** — React control interface for agents, projects, and workflows
- **Qwen Self-Hosting** — Local Qwen deployment via Ollama with OpenAI-compatible endpoints
- **Whisper Transcription** — Voice-to-text pipeline with speaker identification

---

## License

MIT — open source for educational purposes. Built specifically for Rafael Lodos' workflow.

---

*Fellowship of the Raf — v2.0 — 2026*
