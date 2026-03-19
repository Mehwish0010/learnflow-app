---
sidebar_position: 7
---

# docusaurus-deploy

Deploy the LearnFlow Docusaurus documentation site on Kubernetes.

## Usage

```bash
# Scaffold
python .claude/skills/docusaurus-deploy/scripts/scaffold.py

# Build Docker image
bash .claude/skills/docusaurus-deploy/scripts/build.sh

# Deploy
bash .claude/skills/docusaurus-deploy/scripts/deploy.sh

# Verify
python .claude/skills/docusaurus-deploy/scripts/verify.py
```

## Documentation Sections
- Getting Started (prerequisites, setup, quick start)
- Architecture (overview, microservices, event-driven)
- Skills Reference (all 7 skills documented)
- API Reference (triage, agents, events)
