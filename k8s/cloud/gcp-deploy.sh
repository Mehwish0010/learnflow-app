#!/bin/bash
# LearnFlow - Google Kubernetes Engine (GKE) Deployment
set -e

PROJECT_ID="learnflow-project"
CLUSTER_NAME="learnflow-gke"
ZONE="us-central1-a"
REGION="us-central1"

echo "=== LearnFlow GCP Deployment ==="

# 1. Set project
echo "Setting project..."
gcloud config set project $PROJECT_ID

# 2. Enable APIs
echo "Enabling APIs..."
gcloud services enable container.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 3. Create GKE Cluster
echo "Creating GKE cluster..."
gcloud container clusters create $CLUSTER_NAME \
  --zone $ZONE \
  --num-nodes 3 \
  --machine-type e2-medium \
  --enable-autoscaling --min-nodes 2 --max-nodes 5

# 4. Get credentials
echo "Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE

# 5. Configure Docker for GCR
echo "Configuring Docker..."
gcloud auth configure-docker

# 6. Build and push images
echo "Building and pushing images..."
for service in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server frontend; do
  echo "Building $service..."
  docker build -t gcr.io/$PROJECT_ID/learnflow-$service:latest ./services/$service
  docker push gcr.io/$PROJECT_ID/learnflow-$service:latest
done

# 7. Apply Kubernetes configs
echo "Deploying to GKE..."
kubectl apply -f k8s/base/
kubectl apply -f k8s/dapr/
kubectl apply -f k8s/kong/

for service in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server frontend; do
  kubectl apply -f services/$service/k8s/
done

echo "=== Deployment complete ==="
echo "Get external IP: kubectl get svc kong-proxy -n kong"
