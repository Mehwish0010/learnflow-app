#!/bin/bash
# LearnFlow Environment Verification Script

PASS=0
FAIL=0

check() {
    if eval "$2" > /dev/null 2>&1; then
        echo "[OK] $1"
        PASS=$((PASS + 1))
    else
        echo "[FAIL] $1"
        FAIL=$((FAIL + 1))
    fi
}

echo "======================================"
echo "  LearnFlow Environment Check"
echo "======================================"
echo ""

# Prerequisites
echo "--- Prerequisites ---"
check "Docker installed" "docker --version"
check "Minikube installed" "minikube version"
check "kubectl installed" "kubectl version --client"
check "Helm installed" "helm version"
check "Python 3 installed" "python3 --version || python --version"
check "Node.js installed" "node --version"

echo ""
echo "--- Cluster Status ---"
check "Minikube running" "minikube status | grep -q Running"
check "kubectl connected" "kubectl cluster-info"

echo ""
echo "--- Infrastructure ---"
check "Kafka namespace exists" "kubectl get namespace kafka"
check "Kafka pods running" "kubectl get pods -n kafka -o jsonpath='{.items[*].status.phase}' | grep -q Running"
check "Postgres namespace exists" "kubectl get namespace postgres"
check "Postgres pods running" "kubectl get pods -n postgres -o jsonpath='{.items[*].status.phase}' | grep -q Running"

echo ""
echo "--- Dapr ---"
check "Dapr components exist" "kubectl get components.dapr.io"

echo ""
echo "--- Services ---"
for svc in triage-agent concepts-agent code-review-agent debug-agent exercise-agent progress-agent mcp-context-server; do
    check "$svc pods" "kubectl get pods -l app=$svc -o jsonpath='{.items[*].status.phase}' | grep -q Running"
done
check "Frontend pods" "kubectl get pods -l app=learnflow-frontend -o jsonpath='{.items[*].status.phase}' | grep -q Running"

echo ""
echo "======================================"
echo "  Results: $PASS passed, $FAIL failed"
echo "======================================"

if [ $FAIL -gt 0 ]; then
    exit 1
fi
echo "All checks passed!"
