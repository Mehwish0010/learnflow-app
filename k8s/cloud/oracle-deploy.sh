#!/bin/bash
# LearnFlow - Oracle Cloud Infrastructure (OKE) Deployment
set -e

COMPARTMENT_ID="ocid1.compartment.oc1..your-compartment-id"
CLUSTER_NAME="learnflow-oke"
REGION="us-ashburn-1"
OCIR_NAMESPACE="your-namespace"

echo "=== LearnFlow Oracle Cloud Deployment ==="

# 1. Create OKE Cluster (assumes OCI CLI configured)
echo "Creating OKE cluster..."
oci ce cluster create \
  --compartment-id $COMPARTMENT_ID \
  --name $CLUSTER_NAME \
  --kubernetes-version v1.28.2

# 2. Get kubeconfig
echo "Getting cluster credentials..."
oci ce cluster create-kubeconfig \
  --cluster-id $(oci ce cluster list --compartment-id $COMPARTMENT_ID --name $CLUSTER_NAME --query 'data[0].id' --raw-output) \
  --file $HOME/.kube/config \
  --region $REGION

# 3. Login to OCIR
echo "Logging into OCIR..."
docker login $REGION.ocir.io -u "$OCIR_NAMESPACE/oracleidentitycloudservice/your-email"

# 4. Build and push images
echo "Building and pushing images..."
for service in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server frontend; do
  echo "Building $service..."
  docker build -t $REGION.ocir.io/$OCIR_NAMESPACE/learnflow-$service:latest ./services/$service
  docker push $REGION.ocir.io/$OCIR_NAMESPACE/learnflow-$service:latest
done

# 5. Apply Kubernetes configs
echo "Deploying to OKE..."
kubectl apply -f k8s/base/
kubectl apply -f k8s/dapr/
kubectl apply -f k8s/kong/

for service in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server frontend; do
  kubectl apply -f services/$service/k8s/
done

echo "=== Deployment complete ==="
echo "Get external IP: kubectl get svc kong-proxy -n kong"
