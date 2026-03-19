"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

export default function ExerciseManager() {
  const [topic, setTopic] = useState("list comprehensions");
  const [difficulty, setDifficulty] = useState("easy");
  const [count, setCount] = useState(3);
  const [exercises, setExercises] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".exercise-header",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ".exercise-form",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      gsap.fromTo(
        ".exercise-results",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [exercises]);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "teacher-1",
          message: `Generate ${count} ${difficulty} exercises on ${topic}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setExercises([data.response]);
      } else {
        setExercises(["Failed to generate exercises."]);
      }
    } catch {
      setExercises(["Cannot connect to exercise service."]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="exercise-header text-2xl font-bold mb-6 text-white">Exercise Generator</h1>

      <div className="exercise-form bg-dark-card border border-gray-800 rounded-lg p-6 mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary input-glow transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-primary input-glow transition-all"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Count</label>
            <input
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-primary input-glow transition-all"
            />
          </div>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent hover:shadow-red-glow disabled:opacity-50 transition-all duration-300 font-medium"
        >
          {loading ? "Generating..." : "Generate Exercises"}
        </button>
      </div>

      {exercises.length > 0 && (
        <div className="exercise-results bg-dark-card border border-gray-800 rounded-lg p-6">
          <h2 className="font-semibold mb-3 text-white">Generated Exercises</h2>
          {exercises.map((ex, i) => (
            <pre key={i} className="whitespace-pre-wrap text-sm bg-dark border border-gray-700 p-4 rounded text-gray-300">
              {ex}
            </pre>
          ))}
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded text-sm hover:bg-accent hover:shadow-red-glow transition-all duration-300">
            Assign to Students
          </button>
        </div>
      )}
    </div>
  );
}
