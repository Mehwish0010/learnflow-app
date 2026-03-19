"""AI Agent for Exercise Agent."""
from openai import OpenAI
import os


class Agent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
        self.model = os.getenv("AI_MODEL", "gpt-4o-mini")
        self.system_prompt = """You are the LearnFlow Exercise Agent. Generate Python coding exercises appropriate for the student's current module and mastery level. Auto-grade submissions and provide detailed feedback on solutions."""

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
