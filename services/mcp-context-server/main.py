"""LearnFlow MCP Context Server.

Provides AI agents with real-time access to student data,
progress, code submissions, and struggle alerts.
"""
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import httpx
import os
import json

app = FastAPI(title="MCP Context Server", version="1.0.0")

DAPR_PORT = os.getenv("DAPR_HTTP_PORT", "3500")
STATESTORE = "learnflow-statestore"
PUBSUB = "learnflow-pubsub"


class ContextQuery(BaseModel):
    user_id: str
    query_type: str  # "progress", "submissions", "struggles", "profile"
    filters: dict = {}


class ContextResponse(BaseModel):
    data: dict
    source: str = "mcp-context-server"


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "mcp-context-server"}


@app.post("/context", response_model=ContextResponse)
async def get_context(query: ContextQuery):
    """Fetch context data for AI agents. Filters and summarizes
    data so only minimal, relevant info enters agent context."""

    async with httpx.AsyncClient() as client:
        if query.query_type == "progress":
            return await _get_progress(client, query.user_id)
        elif query.query_type == "submissions":
            return await _get_submissions(client, query.user_id, query.filters)
        elif query.query_type == "struggles":
            return await _get_struggles(client, query.user_id)
        elif query.query_type == "profile":
            return await _get_profile(client, query.user_id)
        else:
            return ContextResponse(data={"error": f"Unknown query type: {query.query_type}"})


async def _get_progress(client: httpx.AsyncClient, user_id: str) -> ContextResponse:
    """Get student progress summary — returns mastery per module, not raw records."""
    resp = await client.get(
        f"http://localhost:{DAPR_PORT}/v1.0/state/{STATESTORE}/progress-{user_id}"
    )
    if resp.status_code == 200 and resp.text:
        data = resp.json()
    else:
        data = {"modules": [], "overall_mastery": 0.0}

    return ContextResponse(data={
        "user_id": user_id,
        "progress": data,
        "summary": f"Student has {len(data.get('modules', []))} modules tracked"
    })


async def _get_submissions(client: httpx.AsyncClient, user_id: str, filters: dict) -> ContextResponse:
    """Get recent code submissions — returns count and latest, not all records."""
    resp = await client.get(
        f"http://localhost:{DAPR_PORT}/v1.0/state/{STATESTORE}/submissions-{user_id}"
    )
    if resp.status_code == 200 and resp.text:
        submissions = resp.json()
        if isinstance(submissions, list):
            module_filter = filters.get("module")
            if module_filter:
                submissions = [s for s in submissions if s.get("module") == module_filter]
            total = len(submissions)
            correct = sum(1 for s in submissions if s.get("is_correct"))
            latest = submissions[-1] if submissions else None
        else:
            total, correct, latest = 0, 0, None
    else:
        total, correct, latest = 0, 0, None

    return ContextResponse(data={
        "user_id": user_id,
        "total_submissions": total,
        "correct": correct,
        "success_rate": round(correct / total, 2) if total > 0 else 0,
        "latest": latest,
    })


async def _get_struggles(client: httpx.AsyncClient, user_id: str) -> ContextResponse:
    """Get active struggle alerts for a student."""
    resp = await client.get(
        f"http://localhost:{DAPR_PORT}/v1.0/state/{STATESTORE}/struggles-{user_id}"
    )
    if resp.status_code == 200 and resp.text:
        struggles = resp.json()
        active = [s for s in struggles if not s.get("resolved")] if isinstance(struggles, list) else []
    else:
        active = []

    return ContextResponse(data={
        "user_id": user_id,
        "active_struggles": len(active),
        "triggers": [s.get("trigger_type") for s in active],
    })


async def _get_profile(client: httpx.AsyncClient, user_id: str) -> ContextResponse:
    """Get student profile summary."""
    resp = await client.get(
        f"http://localhost:{DAPR_PORT}/v1.0/state/{STATESTORE}/profile-{user_id}"
    )
    if resp.status_code == 200 and resp.text:
        profile = resp.json()
    else:
        profile = {"name": "Unknown", "role": "student"}

    return ContextResponse(data={
        "user_id": user_id,
        "profile": profile,
    })


@app.post("/context/publish")
async def publish_context_event(event: dict):
    """Publish a context event to Kafka for other services to consume."""
    topic = event.get("topic", "learning.events")
    async with httpx.AsyncClient() as client:
        await client.post(
            f"http://localhost:{DAPR_PORT}/v1.0/publish/{PUBSUB}/{topic}",
            json=event.get("data", {}),
        )
    return {"status": "published", "topic": topic}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
