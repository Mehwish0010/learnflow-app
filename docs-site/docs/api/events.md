---
sidebar_position: 3
---

# Event Reference

All events are published to Kafka via Dapr pub/sub.

## Event Schemas

### learning.events

Published when any learning activity occurs.

```json
{
  "user_id": "student-1",
  "agent": "concepts-agent",
  "action": "chat",
  "module": 2,
  "topic": "for_loops",
  "timestamp": "2026-03-17T10:30:00Z"
}
```

### code.submissions

Published when code is submitted for execution or review.

```json
{
  "user_id": "student-1",
  "module": 2,
  "code": "for i in range(10): print(i)",
  "output": "0\n1\n2\n...",
  "is_correct": true,
  "timestamp": "2026-03-17T10:31:00Z"
}
```

### exercise.events

Published when exercises are created or completed.

```json
{
  "user_id": "student-1",
  "exercise_id": "ex-123",
  "action": "completed",
  "score": 0.8,
  "timestamp": "2026-03-17T10:35:00Z"
}
```

### struggle.alerts

Published when struggle is detected.

```json
{
  "student_id": "student-1",
  "trigger": "repeated_error",
  "details": {
    "error_type": "IndexError",
    "count": 3,
    "topic": "list_comprehensions"
  },
  "timestamp": "2026-03-17T10:40:00Z"
}
```

### progress.updates

Published when mastery scores change.

```json
{
  "user_id": "student-1",
  "module": 2,
  "topic": "for_loops",
  "mastery_score": 0.68,
  "level": "learning",
  "timestamp": "2026-03-17T10:45:00Z"
}
```
