#!/bin/bash
# LearnFlow - Azure Kubernetes Service (AKS) Deployment
set -e

RESOURCE_GROUP="learnflow-rg"
CLUSTER_NAME="learnflow-aks"
LOCATION="eastus"
ACR_NAME="learnflowacr"

echo "=== LearnFlow Azure Deployment ==="

# 1. Create Resource Group
echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# 2. Create Azure Container Registry
echo "Creating container registry..."
az acr create --resource-group $RESOURCE_GROUP --name $ACR_NAME --sku Basic

# 3. Create AKS Cluster
echo "Creating AKS cluster..."
az aks create \
  --resource-group $RESOURCE_GROUP \
  --name $CLUSTER_NAME \
  --node-count 3 \
  --node-vm-size Standard_B2s \
  --attach-acr $ACR_NAME \
  --generate-ssh-keys \
  --enable-addons monitoring

# 4. Get credentials
echo "Getting cluster credentials..."
az aks get-credentials --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME

# 5. Build and push images
echo "Building and pushing images..."
az acr login --name $ACR_NAME

for service in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server frontend; do
  echo "Building $service..."
  docker build -t $ACR_NAME.azurecr.io/learnflow-$service:latest ./services/$service
  docker push $ACR_NAME.azurecr.io/learnflow-$service:latest
done

# 6. Apply Kubernetes configs
echo "Deploying to AKS..."
kubectl apply -f k8s/base/
kubectl apply -f k8s/dapr/
kubectl apply -f k8s/kong/

for service in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server frontend; do
  kubectl apply -f services/$service/k8s/
done

echo "=== Deployment complete ==="
echo "Get external IP: kubectl get svc kong-proxy -n kong"
