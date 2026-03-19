"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Message {
  role: "user" | "assistant";
  content: string;
  agent?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Python tutor. Ask me anything about Python programming.",
      agent: "triage-agent",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(1);

  useEffect(() => {
    gsap.fromTo(
      ".chat-header",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ".chat-container",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    // Only animate if a new message was added
    if (messages.length > prevCountRef.current) {
      const msgs = containerRef.current?.querySelectorAll(".chat-msg");
      if (msgs && msgs.length > 0) {
        const latest = msgs[msgs.length - 1];
        const isUser = latest.classList.contains("msg-user");
        gsap.fromTo(
          latest,
          { x: isUser ? 30 : -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    }
    prevCountRef.current = messages.length;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "student-1", message: input }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response, agent: data.agent },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Cannot connect to the server. Is the backend running?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 flex flex-col h-[calc(100vh-56px)]">
      <h1 className="chat-header text-2xl font-bold mb-4 text-white">AI Python Tutor</h1>

      <div
        ref={containerRef}
        className="chat-container flex-1 overflow-y-auto bg-dark-card border border-gray-800 rounded-lg p-4 mb-4 space-y-4"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg flex ${msg.role === "user" ? "justify-end msg-user" : "justify-start msg-assistant"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-dark border border-gray-700 text-gray-200"
              }`}
            >
              {msg.agent && (
                <p className="text-xs opacity-60 mb-1 text-gray-400">{msg.agent}</p>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark border border-gray-700 p-3 rounded-lg text-sm text-primary thinking-pulse">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Python..."
          className="flex-1 bg-dark-card border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary input-glow transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent hover:shadow-red-glow disabled:opacity-50 transition-all duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
