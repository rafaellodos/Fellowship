# QWEN SELF-HOST
## Local LLM Deployment Skill
### /skills/qwen_self_host.md

---

## WHAT THIS SKILL DOES

Deploys and manages Qwen models locally for privacy-focused, offline AI operations within the Fellowship system.

---

## CAPABILITIES

- **Model Management:** Download, configure, and serve Qwen models locally
- **API Compatibility:** OpenAI-compatible API endpoints for seamless integration
- **Resource Monitoring:** Track GPU/CPU usage and model performance
- **Offline Operation:** Complete local processing without external dependencies

---

## SUPPORTED MODELS

```
FAST TIER:
├─ qwen2.5-7b-instruct
│  └─ Use case: Classification, extraction, routing (Meeseeks, Merry/Pippin)
│  └─ Requirements: 8GB RAM, optional GPU acceleration

MID TIER:
├─ qwen2.5-32b-instruct
│  └─ Use case: Coding, reasoning, analysis (Rick, Mr. Robot)
│  └─ Requirements: 24GB RAM, GPU recommended for good performance
```

---

## DEPLOYMENT OPTIONS

### Option 1: Ollama (Recommended)
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull models
ollama pull qwen2.5:7b-instruct
ollama pull qwen2.5:32b-instruct

# Start server
ollama serve
```

### Option 2: vLLM (High Performance)
```bash
# Install vLLM
pip install vllm

# Run 32B model with GPU
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-32B-Instruct \
  --port 8000 \
  --trust-remote-code
```

### Option 3: llama.cpp (CPU/GPU Flexible)
```bash
# Download GGUF model
wget https://huggingface.co/Qwen/Qwen2.5-32B-Instruct-GGUF/resolve/main/qwen2.5-32b-instruct-q4_K_M.gguf

# Run with GPU acceleration
./main -m qwen2.5-32b-instruct-q4_K_M.gguf \
  --host 0.0.0.0 \
  --port 8000 \
  --n-gpu-layers 35
```

---

## INTEGRATION POINTS

### Model Registry Updates
- Add Qwen models to `/core/model_registry.md`
- Update routing decision tree for offline/privacy scenarios
- Configure fallback logic when external APIs unavailable

### Agent-Specific Configuration
- **Rick:** Use qwen2.5-32b-instruct for coding tasks when privacy required
- **Mr. Robot:** Use qwen2.5-32b-instruct for security audits on sensitive codebases
- **Meeseeks:** Use qwen2.5-7b-instruct for atomic tasks when offline
- **Merry/Pippin:** Use qwen2.5-7b-instruct for classification tasks

---

## API ENDPOINTS

```yaml
Local Endpoints:
  Fast Model: http://localhost:8000/v1 (qwen2.5-7b-instruct)
  Mid Model: http://localhost:8001/v1 (qwen2.5-32b-instruct)
  
Authentication: None required for local deployment
Rate Limits: Limited only by local resources
```

---

## RESOURCE REQUIREMENTS

### Minimum Setup (7B Model)
- RAM: 8GB
- Storage: 5GB
- CPU: 4+ cores
- GPU: Optional but recommended

### Recommended Setup (32B Model)
- RAM: 24GB+
- Storage: 20GB+
- GPU: 12GB+ VRAM (RTX 3060+)
- CPU: 8+ cores

---

## MONITORING COMMANDS

```bash
# Check model status
curl http://localhost:8000/v1/models

# Monitor GPU usage
nvidia-smi -l 1

# Check system resources
htop
```

---

## TROUBLESHOOTING

**Model not loading:** Check RAM availability, reduce context size
**Slow responses:** Enable GPU acceleration, reduce model size
**API errors:** Verify port availability, check firewall settings

---

## SECURITY CONSIDERATIONS

- Local deployment ensures data privacy
- No external API calls for sensitive operations
- Configure firewall to restrict access to local network only
- Regular model updates from official Qwen repository

---

*Qwen Self-Host Skill — Fellowship Infrastructure*
*Version 1.0 — 2026-03-29*
*Lives at /skills/qwen_self_host.md*
