---
sidebar_position: 1
---

# Skills Overview

Skills are reusable instructions that teach AI agents how to perform tasks. LearnFlow is built entirely using Skills with the MCP Code Execution pattern.

## What is a Skill?

A Skill consists of:
- **SKILL.md** — Minimal instructions loaded into agent context (~100 tokens)
- **REFERENCE.md** — Deep documentation loaded only when needed (0 tokens)
- **scripts/** — Executable code that runs outside agent context (0 tokens)

## Token Efficiency

| Approach | Tokens Used |
|----------|------------|
| Direct MCP (5 servers) | ~50,000+ |
| Skills + Code Execution | ~110 |
| **Reduction** | **80-98%** |

## Available Skills

| Skill | Purpose |
|-------|---------|
| [kafka-k8s-setup](./kafka-k8s-setup) | Deploy Kafka on Kubernetes |
| [postgres-k8s-setup](./postgres-k8s-setup) | Deploy PostgreSQL on Kubernetes |
| [fastapi-dapr-agent](./fastapi-dapr-agent) | Scaffold FastAPI + Dapr services |
| [nextjs-k8s-deploy](./nextjs-k8s-deploy) | Deploy Next.js frontend |
| [mcp-code-execution](./mcp-code-execution) | MCP wrapper pattern |
| [docusaurus-deploy](./docusaurus-deploy) | Deploy documentation site |

## Cross-Agent Compatibility

All skills work across:
- **Claude Code** — Reads `.claude/skills/` natively
- **Goose** — Reads `.claude/skills/` directly (AAIF standard)
- **OpenAI Codex** — Compatible with skills format
