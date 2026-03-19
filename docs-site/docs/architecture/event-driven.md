---
sidebar_position: 3
---

# Event-Driven Architecture

LearnFlow uses Kafka for asynchronous, event-driven communication between services.

## Kafka Topics

| Topic | Producer(s) | Consumer(s) | Purpose |
|-------|-------------|-------------|---------|
| `learning.events` | All agents | Progress Agent | Track learning activities |
| `code.submissions` | Code Review, Debug | Exercise Agent | Code execution tracking |
| `exercise.events` | Exercise Agent | Progress Agent | Exercise completion |
| `struggle.alerts` | All agents | Teacher Dashboard | Struggle notifications |
| `progress.updates` | Progress Agent | Frontend | Mastery score changes |

## Event Flow Example

### Student Asks a Question

```
Student → Frontend → Kong → Triage Agent
                              │
                              ├─ Routes to Concepts Agent
                              │
                              ├─ Concepts Agent responds
                              │
                              └─ Publishes to learning.events
                                        │
                                        └─ Progress Agent updates mastery
                                                    │
                                                    └─ Publishes to progress.updates
                                                                │
                                                                └─ Frontend updates dashboard
```

### Struggle Detection

```
Student fails 3+ times
    │
    └─ Debug Agent detects pattern
            │
            ├─ Publishes to struggle.alerts
            │        │
            │        └─ Teacher Dashboard shows alert
            │
            └─ Publishes to learning.events
                     │
                     └─ Progress Agent records struggle
```

## Struggle Detection Rules

An alert is triggered when any of these conditions are met:

| Trigger | Threshold |
|---------|-----------|
| Repeated errors | Same error type 3+ times |
| Stuck on exercise | More than 10 minutes |
| Low quiz score | Below 50% |
| Student confusion | Says "I don't understand" or "I'm stuck" |
| Failed executions | 5+ consecutive failures |

## Mastery Calculation

```
Mastery Score = (Exercises × 0.4) + (Quiz × 0.3) + (Code Quality × 0.2) + (Streak × 0.1)
```

| Score Range | Level | Color |
|------------|-------|-------|
| 0-40% | Beginner | Red |
| 41-70% | Learning | Yellow |
| 71-90% | Proficient | Green |
| 91-100% | Mastered | Blue |
