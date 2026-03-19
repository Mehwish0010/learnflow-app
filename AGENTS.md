# AGENTS.md - LearnFlow Application

## Project Overview
**LearnFlow** is an AI-powered Python tutoring platform built using agentic development with Claude Code and Goose. It uses a microservices architecture with Kafka, Dapr, and Kubernetes.

## Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Monaco Editor + Tailwind CSS
- **Backend**: FastAPI + OpenAI SDK + Dapr
- **Auth**: Better Auth
- **Messaging**: Apache Kafka on Kubernetes
- **Database**: PostgreSQL (Neon)
- **Service Mesh**: Dapr (state, pub/sub, service invocation)
- **API Gateway**: Kong
- **AI Context**: MCP Servers
- **Orchestration**: Kubernetes (Minikube for dev)
- **Documentation**: Docusaurus

## Directory Structure
```
learnflow-app/
├── services/
│   ├── frontend/            # Next.js + Monaco editor
│   ├── triage-agent/        # Routes queries to specialists
│   ├── concepts-agent/      # Explains Python concepts
│   ├── code-review-agent/   # Code analysis and feedback
│   ├── debug-agent/         # Error parsing and debugging
│   ├── exercise-agent/      # Exercise generation/grading
│   └── progress-agent/      # Mastery tracking
├── k8s/
│   ├── base/                # Base K8s manifests
│   ├── kafka/               # Kafka deployment configs
│   ├── postgres/            # PostgreSQL configs
│   ├── dapr/                # Dapr component configs
│   └── kong/                # API Gateway configs
├── shared/                  # Shared utilities and types
├── .claude/skills/          # Skills (symlinked from skills-library)
├── AGENTS.md                # This file
└── README.md
```

## AI Agent Architecture
| Agent | Routes To | Kafka Topics |
|-------|-----------|--------------|
| Triage | concepts, debug, code-review, exercise, progress | learning.events |
| Concepts | - | learning.events |
| Code Review | - | code.submissions |
| Debug | - | learning.events |
| Exercise | - | exercise.events |
| Progress | - | progress.updates |

## Kafka Topics
- `learning.events` - Student learning activities
- `code.submissions` - Code execution requests
- `exercise.events` - Exercise creation/completion
- `struggle.alerts` - Struggle detection notifications
- `progress.updates` - Mastery score changes

## Business Rules
### Mastery Calculation
- Exercise completion: 40%
- Quiz scores: 30%
- Code quality ratings: 20%
- Consistency (streak): 10%

### Mastery Levels
- 0-40% → Beginner (Red)
- 41-70% → Learning (Yellow)
- 71-90% → Proficient (Green)
- 91-100% → Mastered (Blue)

### Struggle Detection Triggers
- Same error type 3+ times
- Stuck on exercise > 10 minutes
- Quiz score < 50%
- Student says "I don't understand" or "I'm stuck"
- 5+ failed code executions in a row

## Conventions
- FastAPI services use `/health` endpoint for readiness probes
- All services communicate via Dapr sidecar
- Pub/sub uses Kafka via Dapr component `learnflow-pubsub`
- State stored via Dapr component `learnflow-statestore`
- Environment variables for secrets (never hardcoded)
- Docker images tagged as `learnflow/<service-name>:latest`

## Development
1. Start Minikube: `minikube start --cpus=4 --memory=8192`
2. Deploy infrastructure: Use kafka-k8s-setup and postgres-k8s-setup skills
3. Deploy services: Use fastapi-dapr-agent skill for each agent
4. Deploy frontend: Use nextjs-k8s-deploy skill
