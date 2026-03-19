"""AI Agent for Debug Agent."""
from openai import OpenAI
import os


class Agent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
        self.model = os.getenv("AI_MODEL", "gpt-4o-mini")
        self.system_prompt = """You are the LearnFlow Debug Agent. Parse Python error messages, identify root causes, and guide students using the Socratic method - provide hints before full solutions. Help students learn to debug independently."""

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
