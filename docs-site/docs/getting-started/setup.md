---
sidebar_position: 2
---

# Environment Setup

## 1. Start Minikube

```bash
minikube start --cpus=4 --memory=8192 --driver=docker
```

Verify the cluster is running:

```bash
kubectl cluster-info
```

## 2. Clone Repositories

```bash
# Skills library
git clone <your-skills-library-repo>
cd skills-library

# LearnFlow application
git clone <your-learnflow-app-repo>
cd learnflow-app
```

## 3. Deploy Infrastructure

Use the skills to deploy Kafka and PostgreSQL:

```bash
# Deploy Kafka
bash .claude/skills/kafka-k8s-setup/scripts/deploy.sh
python .claude/skills/kafka-k8s-setup/scripts/verify.py
python .claude/skills/kafka-k8s-setup/scripts/create_topics.py

# Deploy PostgreSQL
bash .claude/skills/postgres-k8s-setup/scripts/deploy.sh
python .claude/skills/postgres-k8s-setup/scripts/verify.py
python .claude/skills/postgres-k8s-setup/scripts/migrate.py
```

## 4. Deploy Dapr Components

```bash
kubectl apply -f k8s/dapr/
```

## 5. Set Up Secrets

```bash
# Create OpenAI API key secret
kubectl create secret generic openai-secret \
  --from-literal=api-key=YOUR_OPENAI_API_KEY
```

## 6. Build and Deploy Services

```bash
# Build all backend services
for svc in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent; do
  bash .claude/skills/fastapi-dapr-agent/scripts/build.sh $svc
  bash .claude/skills/fastapi-dapr-agent/scripts/deploy.sh $svc
done

# Build and deploy frontend
bash .claude/skills/nextjs-k8s-deploy/scripts/build.sh
bash .claude/skills/nextjs-k8s-deploy/scripts/deploy.sh
```
