"""Pydantic models for Exercise Agent."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserContext(BaseModel):
    user_id: str
    role: str = "student"
    current_module: int = 1
    mastery_level: float = 0.0


class AgentMessage(BaseModel):
    content: str
    agent: str
    timestamp: Optional[datetime] = None
    metadata: dict = {}
