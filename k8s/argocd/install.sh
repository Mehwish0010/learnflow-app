#!/bin/bash
set -e

echo "Installing Argo CD on Kubernetes..."

kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for Argo CD to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# Get initial admin password
ARGOCD_PASS=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)

echo ""
echo "========================================"
echo "  Argo CD installed successfully"
echo "========================================"
echo "  UI:       kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo "  Username: admin"
echo "  Password: $ARGOCD_PASS"
echo ""
echo "  Deploy LearnFlow:"
echo "    kubectl apply -f k8s/argocd/application.yaml"
echo "========================================"
