---
sidebar_position: 1
---

# Prerequisites

Before setting up LearnFlow, ensure you have the following installed.

## Required Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Docker | 24+ | Container runtime |
| Minikube | 1.32+ | Local Kubernetes cluster |
| Helm | 3.14+ | Kubernetes package manager |
| kubectl | 1.28+ | Kubernetes CLI |
| Node.js | 20+ | Frontend runtime |
| Python | 3.12+ | Backend services |
| Claude Code | Latest | AI coding agent |
| Goose | Latest | AI coding agent (AAIF) |

## Installation

### Docker
```bash
# macOS
brew install --cask docker

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
```

### Minikube
```bash
# macOS
brew install minikube

# Ubuntu/Debian
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

### Helm
```bash
# macOS
brew install helm

# Ubuntu/Debian
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### Claude Code
```bash
# macOS
brew install --cask claude-code

# Ubuntu/Debian
curl -fsSL https://claude.ai/install.sh | bash
claude auth login
```

### Goose
```bash
# macOS
brew install --cask block-goose

# Ubuntu/Debian
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash
```

## Verify Installation

```bash
docker --version
minikube status
kubectl cluster-info
helm version
claude --version
goose --version
```
