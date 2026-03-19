"""AI Agent for Triage Agent."""
from openai import OpenAI
import os


ROUTE_MAP = {
    "concepts": "concepts-agent",
    "debug": "debug-agent",
    "code-review": "code-review-agent",
    "exercise": "exercise-agent",
    "progress": "progress-agent",
}


class Agent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
        self.model = os.getenv("AI_MODEL", "gpt-4o-mini")
        self.classify_prompt = """You are a router for a Python tutoring platform. Classify the user's message into exactly one category. Respond with ONLY the category name, nothing else.

Categories:
- concepts: questions about Python concepts, explanations, how things work
- debug: error messages, bugs, code not working, tracebacks
- code-review: requests to review, improve, or critique code
- exercise: requests to generate exercises or practice problems
- progress: questions about progress, scores, mastery levels

Respond with ONLY the category name."""

    async def classify(self, message: str) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": self.classify_prompt},
                {"role": "user", "content": message},
            ],
            temperature=0,
            max_tokens=20,
        )
        category = response.choices[0].message.content.strip().lower()
        for key in ROUTE_MAP:
            if key in category:
                return key
        return "concepts"
