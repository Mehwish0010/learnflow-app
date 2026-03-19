"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-dark-card animate-pulse rounded" />,
});

const DEFAULT_CODE = `# Write your Python code here
def greet(name):
    return f"Hello, {name}! Welcome to LearnFlow."

print(greet("Student"))
`;

export default function Editor() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".editor-header",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ".editor-panel",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  async function runCode() {
    setRunning(true);
    setOutput("Running...");

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, user_id: "student-1" }),
      });

      if (res.ok) {
        const data = await res.json();
        setOutput(data.output || "No output");
      } else {
        setOutput("Execution failed. Is the sandbox service running?");
      }
    } catch {
      setOutput("Cannot connect to execution service.");
    } finally {
      setRunning(false);
    }
  }

  async function reviewCode() {
    setRunning(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "student-1",
          message: `Review this code:\n\`\`\`python\n${code}\n\`\`\``,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOutput(data.response);
      } else {
        setOutput("Review failed.");
      }
    } catch {
      setOutput("Cannot connect to review service.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="editor-header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Code Editor</h1>
        <div className="flex gap-2">
          <button
            onClick={runCode}
            disabled={running}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-accent hover:shadow-red-glow disabled:opacity-50 text-sm transition-all duration-300 font-medium"
          >
            Run Code
          </button>
          <button
            onClick={reviewCode}
            disabled={running}
            className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white disabled:opacity-50 text-sm transition-all duration-300 font-medium"
          >
            AI Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="editor-panel border border-gray-800 rounded-lg overflow-hidden">
          <MonacoEditor
            height="400px"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <div className="editor-panel border border-gray-800 rounded-lg p-4 bg-dark text-red-400 font-mono text-sm overflow-auto h-[400px]">
          <p className="text-gray-500 mb-2">Output:</p>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}
