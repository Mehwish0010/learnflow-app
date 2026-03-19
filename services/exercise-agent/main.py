"""LearnFlow Exercise Agent Service."""
from fastapi import FastAPI
from pydantic import BaseModel
from agent import Agent
import httpx
import os

app = FastAPI(title="Exercise Agent", version="1.0.0")
agent = Agent()

DAPR_PORT = os.getenv("DAPR_HTTP_PORT", "3500")
PUBSUB_NAME = "learnflow-pubsub"


class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: dict = {}


class ChatResponse(BaseModel):
    response: str
    agent: str = "exercise-agent"
    metadata: dict = {}


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "exercise-agent"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    result = await agent.process(request.message, request.context)

    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                f"http://localhost:{DAPR_PORT}/v1.0/publish/{PUBSUB_NAME}/learning.events",
                json={"user_id": request.user_id, "agent": "exercise-agent", "action": "chat"},
            )
    except httpx.ConnectError:
        pass

    return ChatResponse(response=result["response"], metadata=result.get("metadata", {}))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
