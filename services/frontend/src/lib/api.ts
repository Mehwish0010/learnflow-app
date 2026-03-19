const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendChat(agent: string, userId: string, message: string) {
  const res = await fetch(`${API_URL}/api/${agent}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, message }),
  });
  if (!res.ok) throw new Error(`Chat failed: ${res.status}`);
  return res.json();
}

export async function executeCode(userId: string, code: string) {
  const res = await fetch(`${API_URL}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, code }),
  });
  if (!res.ok) throw new Error(`Execution failed: ${res.status}`);
  return res.json();
}

export async function getProgress(userId: string) {
  const res = await fetch(`${API_URL}/api/progress/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, message: "Show my progress summary" }),
  });
  if (!res.ok) throw new Error(`Progress failed: ${res.status}`);
  return res.json();
}
