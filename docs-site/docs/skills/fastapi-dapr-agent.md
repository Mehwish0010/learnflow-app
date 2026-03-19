---
sidebar_position: 4
---

# fastapi-dapr-agent

Scaffold FastAPI microservices with Dapr sidecar and AI agent capabilities.

## Usage

```bash
# Scaffold a service
python .claude/skills/fastapi-dapr-agent/scripts/scaffold_service.py <service-name>

# Generate Dapr components
python .claude/skills/fastapi-dapr-agent/scripts/generate_dapr_components.py

# Build Docker image
bash .claude/skills/fastapi-dapr-agent/scripts/build.sh <service-name>

# Deploy to K8s
bash .claude/skills/fastapi-dapr-agent/scripts/deploy.sh <service-name>

# Verify
python .claude/skills/fastapi-dapr-agent/scripts/verify.py <service-name>
```

## Available Services

| Service | System Prompt Focus |
|---------|-------------------|
| `triage-agent` | Route queries to specialist agents |
| `concepts-agent` | Explain Python concepts with examples |
| `code-review-agent` | PEP 8 compliance and code quality |
| `debug-agent` | Socratic debugging guidance |
| `exercise-agent` | Generate and grade exercises |
| `progress-agent` | Mastery calculation and tracking |

## Generated Files

Each scaffold creates: `main.py`, `agent.py`, `models.py`, `requirements.txt`, `Dockerfile`, `k8s/deployment.yaml`, `k8s/service.yaml`.
