---
sidebar_position: 2
---

# kafka-k8s-setup

Deploy Apache Kafka on Kubernetes using Helm charts.

## Usage

```bash
# Deploy
bash .claude/skills/kafka-k8s-setup/scripts/deploy.sh

# Verify
python .claude/skills/kafka-k8s-setup/scripts/verify.py

# Create LearnFlow topics
python .claude/skills/kafka-k8s-setup/scripts/create_topics.py
```

## Topics Created

| Topic | Partitions | Purpose |
|-------|-----------|---------|
| learning.events | 3 | Student activities |
| code.submissions | 3 | Code execution |
| exercise.events | 3 | Exercise tracking |
| struggle.alerts | 1 | Struggle notifications |
| progress.updates | 3 | Mastery changes |

## Scripts

| Script | Description | Output |
|--------|-------------|--------|
| `deploy.sh` | Helm install Kafka in `kafka` namespace | "Kafka deployed" |
| `verify.py` | Check all pods Running + services | "All N pods running" |
| `create_topics.py` | Create 5 LearnFlow topics | "N/5 topics created" |
