---
sidebar_position: 1
---

# Architecture Overview

LearnFlow is a cloud-native, event-driven microservices platform running on Kubernetes.

## System Diagram

```
┌──────────────────────────────────────────────────────┐
│                  KUBERNETES CLUSTER                   │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Next.js  │  │ FastAPI  │  │ FastAPI  │  ...      │
│  │ Frontend │  │ Triage   │  │ Concepts │          │
│  │ +Monaco  │  │ +Dapr    │  │ +Dapr    │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│       └──────────────┼─────────────┘                │
│              ┌───────┴───────┐                      │
│              │  Kong Gateway │                      │
│              └───────┬───────┘                      │
│                      ▼                              │
│         ┌────────────────────┐                      │
│         │      KAFKA         │                      │
│         └─────────┬──────────┘                      │
│         ┌─────────┴──────────┐                      │
│         ▼                    ▼                      │
│  ┌────────────┐    ┌────────────┐                   │
│  │ PostgreSQL │    │ MCP Server │                   │
│  └────────────┘    └────────────┘                   │
└──────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js + Monaco | UI with code editor |
| Backend | FastAPI + OpenAI SDK | AI tutoring agents |
| Auth | Better Auth | Authentication |
| Service Mesh | Dapr | State, pub/sub, invocation |
| Messaging | Kafka | Async event-driven comms |
| Database | PostgreSQL | Persistent storage |
| API Gateway | Kong | Routing + JWT auth |
| AI Context | MCP Servers | Real-time data for agents |
| Orchestration | Kubernetes | Container management |
| Docs | Docusaurus | This documentation site |

## Design Principles

1. **Skills-First Development** — AI agents build the app using reusable skills
2. **Token Efficiency** — MCP Code Execution pattern keeps context windows lean
3. **Event-Driven** — Services communicate via Kafka topics, not direct calls
4. **Stateless Services** — All state managed via Dapr (PostgreSQL + Kafka)
5. **Single-Prompt Deployment** — Each skill targets autonomous execution
