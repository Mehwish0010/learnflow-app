---
sidebar_position: 3
---

# Quick Start

Get LearnFlow running in 5 steps.

## Step 1: Start Kubernetes

```bash
minikube start --cpus=4 --memory=8192
```

## Step 2: Deploy Infrastructure

```bash
bash .claude/skills/kafka-k8s-setup/scripts/deploy.sh
bash .claude/skills/postgres-k8s-setup/scripts/deploy.sh
python .claude/skills/postgres-k8s-setup/scripts/migrate.py
```

## Step 3: Deploy Services

```bash
# Deploy all agents
for svc in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent; do
  kubectl apply -f services/$svc/k8s/
done
```

## Step 4: Deploy Frontend

```bash
kubectl apply -f services/frontend/k8s/
```

## Step 5: Access LearnFlow

```bash
# Get the frontend URL
minikube service learnflow-frontend --url
```

Open the URL in your browser to start using LearnFlow.

## Demo Scenario

1. **Student Maya** logs in and sees her dashboard: "Module 2: Loops - 60% complete"
2. Maya asks: *"How do for loops work in Python?"*
3. The Concepts Agent explains with code examples
4. Maya writes a for loop in the Monaco editor, runs it successfully
5. Agent offers a quiz — Maya gets 4/5 — Mastery updates to 68%
6. **Student James** struggles with list comprehensions (3 wrong answers)
7. Struggle alert sent to teacher Mr. Rodriguez
8. Teacher generates easy exercises on list comprehensions
9. James completes exercises and confidence is restored
