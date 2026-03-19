---
sidebar_position: 2
---

# Agent APIs

All agent services share the same API interface.

## Common Endpoints

### POST /chat

Every agent implements the `/chat` endpoint with the same request/response format.

**Request Body:**
```json
{
  "user_id": "string",
  "message": "string",
  "context": {}
}
```

**Response Body:**
```json
{
  "response": "string",
  "agent": "string",
  "metadata": {}
}
```

### GET /health

Returns service health status.

## Agent-Specific Behaviors

### Concepts Agent (`/api/concepts/chat`)
- Explains Python concepts with code examples
- Adapts depth to mastery level in context
- Covers Modules 1-8

### Code Review Agent (`/api/code-review/chat`)
- Expects code in the message (fenced code block)
- Returns structured feedback: correctness, style, efficiency, readability

### Debug Agent (`/api/debug/chat`)
- Expects error messages or buggy code
- Uses Socratic method: hints before solutions

### Exercise Agent (`/api/exercise/chat`)
- Generates exercises when asked
- Auto-grades when code is submitted
- Accepts difficulty parameter in context

### Progress Agent (`/api/progress/chat`)
- Returns mastery summary for user
- Calculates weighted score from all inputs
