"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    gsap.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      ".feature-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, delay: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="hero-text text-5xl md:text-6xl font-bold mb-4 text-white">
          Learn Python with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI
          </span>
        </h1>
        <p className="hero-text text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          LearnFlow is an AI-powered Python tutoring platform. Chat with AI
          tutors, write and run code, take quizzes, and track your progress.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/dashboard"
            className="hero-cta bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent hover:shadow-red-glow transition-all duration-300 font-medium"
          >
            Student Dashboard
          </a>
          <a
            href="/teacher"
            className="hero-cta border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-medium"
          >
            Teacher Portal
          </a>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="feature-card p-6 bg-dark-card border border-gray-800 rounded-lg hover:border-primary/50 hover:shadow-red-glow transition-all duration-300 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <span className="text-primary text-xl">&#x1F4AC;</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-primary transition-colors">
            AI Tutoring
          </h3>
          <p className="text-gray-400 text-sm">
            Chat with specialized AI agents that explain concepts, debug code,
            and guide your learning.
          </p>
        </div>
        <div className="feature-card p-6 bg-dark-card border border-gray-800 rounded-lg hover:border-primary/50 hover:shadow-red-glow transition-all duration-300 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <span className="text-primary text-xl">&#x1F4BB;</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-primary transition-colors">
            Code Editor
          </h3>
          <p className="text-gray-400 text-sm">
            Write and run Python code in a Monaco-powered editor with instant
            feedback.
          </p>
        </div>
        <div className="feature-card p-6 bg-dark-card border border-gray-800 rounded-lg hover:border-primary/50 hover:shadow-red-glow transition-all duration-300 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <span className="text-primary text-xl">&#x1F4CA;</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-primary transition-colors">
            Progress Tracking
          </h3>
          <p className="text-gray-400 text-sm">
            Track mastery across 8 modules with exercises, quizzes, and code
            quality scores.
          </p>
        </div>
      </div>
    </div>
  );
}
