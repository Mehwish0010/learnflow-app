---
sidebar_position: 3
---

# postgres-k8s-setup

Deploy PostgreSQL on Kubernetes and run LearnFlow database migrations.

## Usage

```bash
# Deploy
bash .claude/skills/postgres-k8s-setup/scripts/deploy.sh

# Verify
python .claude/skills/postgres-k8s-setup/scripts/verify.py

# Run migrations
python .claude/skills/postgres-k8s-setup/scripts/migrate.py
```

## Tables Created

| Table | Purpose |
|-------|---------|
| `users` | Student and teacher accounts |
| `progress` | Module mastery tracking |
| `code_submissions` | Code execution history |
| `struggle_alerts` | Struggle detection events |

## Connection Details

| Parameter | Value |
|-----------|-------|
| Host | `postgresql.postgres.svc.cluster.local` |
| Port | `5432` |
| Database | `learnflow` |
| User | `learnflow` |
