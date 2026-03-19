"""LearnFlow Triage Agent Service."""
from fastapi import FastAPI
from pydantic import BaseModel
from agent import Agent, ROUTE_MAP
import httpx
import subprocess
import tempfile
import os

app = FastAPI(title="Triage Agent", version="1.0.0")
agent = Agent()

DAPR_PORT = os.getenv("DAPR_HTTP_PORT", "3500")
PUBSUB_NAME = "learnflow-pubsub"

# Map agent names to their Docker service URLs
AGENT_URLS = {
    "concepts-agent": "http://concepts-agent:8000",
    "debug-agent": "http://debug-agent:8000",
    "code-review-agent": "http://code-review-agent:8000",
    "exercise-agent": "http://exercise-agent:8000",
    "progress-agent": "http://progress-agent:8000",
}


class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: dict = {}


class ChatResponse(BaseModel):
    response: str
    agent: str = "triage-agent"
    metadata: dict = {}


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "triage-agent"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Step 1: Classify the query
    category = await agent.classify(request.message)
    target_agent = ROUTE_MAP[category]
    target_url = AGENT_URLS[target_agent]

    # Step 2: Forward to the specialist agent
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(
                f"{target_url}/chat",
                json={
                    "user_id": request.user_id,
                    "message": request.message,
                    "context": request.context,
                },
            )
            if res.status_code == 200:
                data = res.json()
                return ChatResponse(
                    response=data["response"],
                    agent=data.get("agent", target_agent),
                    metadata=data.get("metadata", {}),
                )
    except (httpx.ConnectError, httpx.ReadTimeout):
        pass

    # Fallback: if downstream agent is unreachable, respond directly
    return ChatResponse(
        response=f"I'd route this to {target_agent}, but it's currently unavailable. Please try again.",
        agent="triage-agent",
        metadata={"routed_to": target_agent, "fallback": True},
    )


class ExecuteRequest(BaseModel):
    code: str
    user_id: str = "anonymous"


class ExecuteResponse(BaseModel):
    output: str
    error: bool = False


@app.post("/execute", response_model=ExecuteResponse)
async def execute(request: ExecuteRequest):
    try:
        with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as f:
            f.write(request.code)
            f.flush()
            result = subprocess.run(
                ["python", f.name],
                capture_output=True,
                text=True,
                timeout=10,
            )
        os.unlink(f.name)
        output = result.stdout
        if result.returncode != 0:
            output = result.stderr or "Execution failed"
            return ExecuteResponse(output=output, error=True)
        return ExecuteResponse(output=output or "No output")
    except subprocess.TimeoutExpired:
        return ExecuteResponse(output="Execution timed out (10s limit)", error=True)
    except Exception as e:
        return ExecuteResponse(output=str(e), error=True)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
