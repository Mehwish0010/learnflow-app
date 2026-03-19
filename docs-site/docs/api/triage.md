---
sidebar_position: 1
---

# Triage API

The Triage Agent routes student queries to specialist agents.

## Endpoints

### POST /chat

Send a message to the triage agent for routing.

**Request:**
```json
{
  "user_id": "student-1",
  "message": "How do for loops work?",
  "context": {}
}
```

**Response:**
```json
{
  "response": "For loops iterate over sequences...",
  "agent": "triage-agent",
  "metadata": {
    "routed_to": "concepts-agent",
    "model": "gpt-4o-mini",
    "tokens": 150
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "triage-agent"
}
```

## Routing Rules

| Pattern | Target Agent |
|---------|-------------|
| Explain, what is, how does | concepts-agent |
| Error, bug, traceback | debug-agent |
| Review, check my code | code-review-agent |
| Exercise, practice | exercise-agent |
| Progress, score | progress-agent |
