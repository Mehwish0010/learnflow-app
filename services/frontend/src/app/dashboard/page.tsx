"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MODULES = [
  { id: 1, name: "Basics", topics: "Variables, Data Types, I/O, Operators", mastery: 0.85 },
  { id: 2, name: "Control Flow", topics: "Conditionals, For/While Loops, Break/Continue", mastery: 0.6 },
  { id: 3, name: "Data Structures", topics: "Lists, Tuples, Dictionaries, Sets", mastery: 0.35 },
  { id: 4, name: "Functions", topics: "Parameters, Return Values, Scope", mastery: 0.1 },
  { id: 5, name: "OOP", topics: "Classes, Methods, Inheritance", mastery: 0 },
  { id: 6, name: "Files", topics: "Read/Write, CSV, JSON", mastery: 0 },
  { id: 7, name: "Errors", topics: "Try/Except, Custom Exceptions", mastery: 0 },
  { id: 8, name: "Libraries", topics: "Packages, APIs, Virtual Envs", mastery: 0 },
];

function masteryColor(score: number) {
  if (score >= 0.91) return "bg-mastered text-white";
  if (score >= 0.71) return "bg-proficient text-white";
  if (score >= 0.41) return "bg-learning text-black";
  return "bg-beginner text-white";
}

function masteryLabel(score: number) {
  if (score >= 0.91) return "Mastered";
  if (score >= 0.71) return "Proficient";
  if (score >= 0.41) return "Learning";
  return "Beginner";
}

export default function Dashboard() {
  const overallMastery = MODULES.reduce((sum, m) => sum + m.mastery, 0) / MODULES.length;
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Header
    gsap.fromTo(
      ".dash-header",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // Progress bar fill
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: 0 },
        { width: `${overallMastery * 100}%`, duration: 1.2, ease: "power2.out", delay: 0.3 }
      );
    }

    // Module cards stagger
    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length > 0) {
      gsap.fromTo(
        validCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.4 }
      );
    }
  }, [overallMastery]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="dash-header text-3xl font-bold mb-2 text-white">Student Dashboard</h1>
      <p className="dash-header text-gray-400 mb-6">
        Overall Progress: <span className="text-primary font-semibold">{Math.round(overallMastery * 100)}%</span>
      </p>

      <div className="w-full bg-dark-card rounded-full h-3 mb-8 overflow-hidden">
        <div
          ref={progressRef}
          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full shadow-red-glow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map((mod, i) => (
          <div
            key={mod.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="bg-dark-card border border-gray-800 rounded-lg p-4 flex justify-between items-center hover:border-primary/50 hover:shadow-red-glow transition-all duration-300 cursor-pointer group"
          >
            <div>
              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                Module {mod.id}: {mod.name}
              </h3>
              <p className="text-sm text-gray-500">{mod.topics}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${masteryColor(mod.mastery)}`}
              >
                {masteryLabel(mod.mastery)}
              </span>
              <p className="text-sm mt-1 text-gray-400">{Math.round(mod.mastery * 100)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
