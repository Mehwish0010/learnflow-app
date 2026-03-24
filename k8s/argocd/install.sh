#!/bin/bash
set -e

echo "=== LearnFlow ArgoCD Installation ==="

# 1. Install ArgoCD
echo "Installing Argo CD..."
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for Argo CD to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# 2. Install ArgoCD Image Updater (auto-updates images from container registry)
echo "Installing ArgoCD Image Updater..."
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml
kubectl wait --for=condition=available --timeout=120s deployment/argocd-image-updater -n argocd || true

# 3. Apply LearnFlow ArgoCD applications
echo "Deploying LearnFlow ArgoCD applications..."
kubectl apply -f k8s/argocd/application.yaml

# 4. Get initial admin password
ARGOCD_PASS=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)

echo ""
echo "========================================"
echo "  Argo CD installed successfully"
echo "========================================"
echo "  UI:       kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo "  Username: admin"
echo "  Password: $ARGOCD_PASS"
echo ""
echo "  Applications deployed:"
echo "    - learnflow-infra   (base k8s resources)"
echo "    - learnflow-kong    (API gateway)"
echo "    - learnflow-services (all microservices)"
echo ""
echo "  CD Pipeline:"
echo "    GitHub Actions builds images on push to main"
echo "    ArgoCD Image Updater auto-detects new tags"
echo "    ArgoCD syncs updated manifests to cluster"
echo "========================================"
