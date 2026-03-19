---
sidebar_position: 5
---

# nextjs-k8s-deploy

Deploy the LearnFlow Next.js frontend with Monaco editor on Kubernetes.

## Usage

```bash
# Scaffold
python .claude/skills/nextjs-k8s-deploy/scripts/scaffold.py

# Build Docker image
bash .claude/skills/nextjs-k8s-deploy/scripts/build.sh

# Deploy
bash .claude/skills/nextjs-k8s-deploy/scripts/deploy.sh

# Verify
python .claude/skills/nextjs-k8s-deploy/scripts/verify.py
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Student progress overview |
| `/chat` | AI tutor chat interface |
| `/editor` | Monaco code editor |
| `/quiz` | Interactive Python quiz |
| `/teacher` | Teacher dashboard + alerts |
| `/teacher/exercises` | Exercise generator |
