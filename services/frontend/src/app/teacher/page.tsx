"use client";

import { useEffect } from "react";
import gsap from "gsap";

const STUDENTS = [
  { name: "Maya Chen", module: 2, mastery: 0.68, status: "active" },
  { name: "James Rodriguez", module: 3, mastery: 0.32, status: "struggling" },
  { name: "Aisha Patel", module: 4, mastery: 0.75, status: "active" },
  { name: "Tom Wilson", module: 1, mastery: 0.92, status: "active" },
  { name: "Lisa Kim", module: 2, mastery: 0.45, status: "struggling" },
];

const ALERTS = [
  { student: "James Rodriguez", trigger: "Same error type 3+ times", topic: "List comprehensions", time: "5 min ago" },
  { student: "Lisa Kim", trigger: "Quiz score < 50%", topic: "While loops", time: "12 min ago" },
];

function masteryBadge(score: number) {
  if (score >= 0.91) return { label: "Mastered", cls: "bg-mastered text-white" };
  if (score >= 0.71) return { label: "Proficient", cls: "bg-proficient text-white" };
  if (score >= 0.41) return { label: "Learning", cls: "bg-learning text-black" };
  return { label: "Beginner", cls: "bg-beginner text-white" };
}

export default function TeacherDashboard() {
  useEffect(() => {
    gsap.fromTo(
      ".teacher-header",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      ".alert-card",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(
      ".student-row",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="teacher-header text-3xl font-bold mb-6 text-white">Teacher Dashboard</h1>

      {ALERTS.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-primary">
            Struggle Alerts ({ALERTS.length})
          </h2>
          <div className="space-y-2">
            {ALERTS.map((alert, i) => (
              <div
                key={i}
                className="alert-card bg-dark-card border border-primary/30 rounded-lg p-4 flex justify-between items-center animate-pulse-glow"
              >
                <div>
                  <p className="font-medium text-white">{alert.student}</p>
                  <p className="text-sm text-gray-400">
                    {alert.trigger} - {alert.topic}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{alert.time}</p>
                  <a
                    href="/teacher/exercises"
                    className="text-xs text-primary hover:text-accent transition-colors"
                  >
                    Create Exercise
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3 text-white">Class Progress</h2>
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Current Module</th>
              <th className="text-left p-3">Mastery</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, i) => {
              const badge = masteryBadge(s.mastery);
              return (
                <tr key={i} className="student-row border-t border-gray-800 bg-dark-card hover:bg-dark transition-colors">
                  <td className="p-3 font-medium text-white">{s.name}</td>
                  <td className="p-3 text-gray-300">Module {s.module}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${badge.cls}`}
                    >
                      {badge.label} ({Math.round(s.mastery * 100)}%)
                    </span>
                  </td>
                  <td className="p-3">
                    {s.status === "struggling" ? (
                      <span className="text-primary font-medium">Needs Help</span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
