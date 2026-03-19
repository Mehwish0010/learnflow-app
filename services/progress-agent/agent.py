"""AI Agent for Progress Agent."""
from openai import OpenAI
import os


class Agent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
        self.model = os.getenv("AI_MODEL", "gpt-4o-mini")
        self.system_prompt = """You are the LearnFlow Progress Agent. Track and summarize student mastery scores. Calculate mastery using: exercises(40%) + quiz(30%) + code_quality(20%) + streak(10%). Levels: 0-40% Beginner, 41-70% Learning, 71-90% Proficient, 91-100% Mastered."""

    async def process(self, message: str, context: dict = {}) -> dict:
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": message},
        ]

        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7,
            max_tokens=1000,
        )

        return {
            "response": response.choices[0].message.content,
            "metadata": {"model": self.model, "tokens": response.usage.total_tokens},
        }
