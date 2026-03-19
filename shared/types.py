"""Shared types for LearnFlow microservices."""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    STUDENT = "student"
    TEACHER = "teacher"


class MasteryLevel(str, Enum):
    BEGINNER = "beginner"      # 0-40%
    LEARNING = "learning"      # 41-70%
    PROFICIENT = "proficient"  # 71-90%
    MASTERED = "mastered"      # 91-100%


class AgentType(str, Enum):
    TRIAGE = "triage"
    CONCEPTS = "concepts"
    CODE_REVIEW = "code-review"
    DEBUG = "debug"
    EXERCISE = "exercise"
    PROGRESS = "progress"


class StruggleTrigger(str, Enum):
    REPEATED_ERROR = "repeated_error"        # Same error 3+ times
    STUCK_ON_EXERCISE = "stuck_on_exercise"  # >10 minutes
    LOW_QUIZ_SCORE = "low_quiz_score"        # <50%
    STUDENT_CONFUSED = "student_confused"     # "I don't understand"
    FAILED_EXECUTIONS = "failed_executions"  # 5+ failed runs


class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: dict = {}


class ChatResponse(BaseModel):
    response: str
    agent: str
    metadata: dict = {}


class MasteryScore(BaseModel):
    user_id: str
    module: int
    topic: str
    exercises_completed: float = 0.0  # 40% weight
    quiz_score: float = 0.0           # 30% weight
    code_quality: float = 0.0         # 20% weight
    streak: float = 0.0               # 10% weight

    @property
    def total(self) -> float:
        return (
            self.exercises_completed * 0.4 +
            self.quiz_score * 0.3 +
            self.code_quality * 0.2 +
            self.streak * 0.1
        )

    @property
    def level(self) -> MasteryLevel:
        score = self.total
        if score <= 0.4:
            return MasteryLevel.BEGINNER
        elif score <= 0.7:
            return MasteryLevel.LEARNING
        elif score <= 0.9:
            return MasteryLevel.PROFICIENT
        return MasteryLevel.MASTERED


class StruggleAlert(BaseModel):
    student_id: str
    trigger: StruggleTrigger
    details: dict = {}
    timestamp: datetime = None


class CodeSubmission(BaseModel):
    user_id: str
    module: int
    code: str
    output: Optional[str] = None
    is_correct: bool = False


class ExerciseRequest(BaseModel):
    module: int
    topic: str
    difficulty: str = "medium"
    count: int = 1
