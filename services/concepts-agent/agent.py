"""AI Agent for Concepts Agent."""
from openai import OpenAI
import os


class Agent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
        self.model = os.getenv("AI_MODEL", "gpt-4o-mini")
        self.system_prompt = """You are the LearnFlow Concepts Agent. Explain Python programming concepts clearly with code examples. Adapt your explanation depth based on the student's mastery level. Cover modules: Basics, Control Flow, Data Structures, Functions, OOP, Files, Errors, Libraries."""

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
