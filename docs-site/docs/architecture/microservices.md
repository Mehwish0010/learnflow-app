---
sidebar_position: 2
---

# Microservices

LearnFlow consists of 6 specialized AI agent services plus a frontend.

## Service Map

| Service | Port | Dapr App ID | Purpose |
|---------|------|-------------|---------|
| Frontend | 3000 | — | Next.js UI |
| Triage Agent | 8000 | triage-agent | Routes queries to specialists |
| Concepts Agent | 8000 | concepts-agent | Explains Python concepts |
| Code Review Agent | 8000 | code-review-agent | Code analysis + PEP 8 |
| Debug Agent | 8000 | debug-agent | Error parsing + Socratic hints |
| Exercise Agent | 8000 | exercise-agent | Generate + grade exercises |
| Progress Agent | 8000 | progress-agent | Mastery tracking |

## Agent Routing (Triage)

The Triage Agent analyzes student messages and routes to specialists:

| Keyword Pattern | Routed To |
|----------------|-----------|
| "explain", "what is", "how does" | Concepts Agent |
| "error", "bug", "traceback" | Debug Agent |
| "review", "check my code" | Code Review Agent |
| "exercise", "practice", "challenge" | Exercise Agent |
| "progress", "score", "mastery" | Progress Agent |

## Service Template

Every backend service follows the same structure:

```
services/<name>/
├── main.py           # FastAPI app with /health and /chat
├── agent.py          # OpenAI SDK agent with system prompt
├── models.py         # Pydantic request/response models
├── requirements.txt  # Python dependencies
├── Dockerfile        # Container image
└── k8s/
    ├── deployment.yaml  # With Dapr sidecar annotations
    └── service.yaml     # ClusterIP service
```

## Dapr Integration

Each service uses Dapr for:
- **Pub/Sub**: Publish events to Kafka topics via `learnflow-pubsub`
- **State**: Store/retrieve state via `learnflow-statestore` (PostgreSQL)
- **Invocation**: Call other services via Dapr service invocation

```python
# Publishing an event via Dapr
async with httpx.AsyncClient() as client:
    await client.post(
        f"http://localhost:{DAPR_PORT}/v1.0/publish/learnflow-pubsub/learning.events",
        json={"user_id": user_id, "agent": "concepts-agent", "action": "chat"}
    )
```
