"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const SAMPLE_QUIZ: Question[] = [
  {
    id: 1,
    question: "What is the output of: print(type(3.14))?",
    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
    correct: 1,
  },
  {
    id: 2,
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "func", "def", "define"],
    correct: 2,
  },
  {
    id: 3,
    question: "What does `len([1, 2, 3])` return?",
    options: ["2", "3", "4", "Error"],
    correct: 1,
  },
  {
    id: 4,
    question: "Which of these is a mutable data type?",
    options: ["tuple", "str", "list", "int"],
    correct: 2,
  },
  {
    id: 5,
    question: "What is the correct way to handle exceptions?",
    options: ["catch/throw", "try/except", "if/else", "handle/error"],
    correct: 1,
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Initial page load animation
  useEffect(() => {
    gsap.from(".quiz-header", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.from(".quiz-progress-bar", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });
  }, []);

  // Animate question card + buttons ONLY when question number changes
  useEffect(() => {
    if (finished) return;

    // Card slides in
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    // Buttons stagger in
    const validButtons = buttonsRef.current.filter(Boolean);
    if (validButtons.length > 0) {
      gsap.fromTo(
        validButtons,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.07, ease: "power2.out", delay: 0.2 }
      );
    }

    // Progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((current + 1) / SAMPLE_QUIZ.length) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Animate score on finish
  useEffect(() => {
    if (!finished) return;

    const tl = gsap.timeline();
    tl.from(".result-title", {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from(
      scoreRef.current,
      {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      },
      "-=0.2"
    );
    tl.from(
      ".result-detail",
      { y: 15, opacity: 0, duration: 0.4, ease: "power2.out" },
      "-=0.3"
    );
    tl.from(
      ".result-btn",
      { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );
  }, [finished]);

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === SAMPLE_QUIZ[current].correct) {
      setScore((s) => s + 1);
    }

    // Pulse selected button
    const btn = buttonsRef.current[idx];
    if (btn) {
      gsap.fromTo(btn, { scale: 1.05 }, { scale: 1, duration: 0.3, ease: "power2.out" });
    }
  }

  function next() {
    // Exit animation then transition
    gsap.to(questionRef.current, {
      x: -60,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (current + 1 >= SAMPLE_QUIZ.length) {
          setFinished(true);
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
          setAnswered(false);
        }
      },
    });
  }

  if (finished) {
    const pct = Math.round((score / SAMPLE_QUIZ.length) * 100);
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="result-title text-3xl font-bold mb-4 text-white">Quiz Complete!</h1>
        <p
          ref={scoreRef}
          className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2"
        >
          {pct}%
        </p>
        <p className="result-detail text-gray-400 mb-8 text-lg">
          {score}/{SAMPLE_QUIZ.length} correct
        </p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setFinished(false);
            setSelected(null);
            setAnswered(false);
          }}
          className="result-btn bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent hover:shadow-red-glow transition-all duration-300 text-lg font-medium"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  const q = SAMPLE_QUIZ[current];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="quiz-header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Python Quiz</h1>
        <span className="text-sm text-gray-400 bg-dark-card px-3 py-1 rounded-full border border-gray-700">
          {current + 1}/{SAMPLE_QUIZ.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-dark-card rounded-full h-2 mb-6 overflow-hidden quiz-progress-bar">
        <div
          ref={progressRef}
          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full shadow-red-glow"
          style={{ width: `${((current + 1) / SAMPLE_QUIZ.length) * 100}%` }}
        />
      </div>

      <div ref={questionRef} className="bg-dark-card border border-gray-800 rounded-lg p-6 mb-4">
        <p className="text-lg font-medium mb-4 text-white">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            let classes =
              "bg-dark border border-gray-700 text-white hover:border-primary/50 hover:bg-dark-card";
            if (answered) {
              if (idx === q.correct)
                classes =
                  "bg-green-900/30 border-green-500 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
              else if (idx === selected)
                classes =
                  "bg-red-900/30 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
            }
            return (
              <button
                key={idx}
                ref={(el) => { buttonsRef.current[idx] = el; }}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3 border rounded-lg transition-all duration-200 ${classes}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {answered && (
        <button
          onClick={next}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent hover:shadow-red-glow transition-all duration-300"
        >
          {current + 1 >= SAMPLE_QUIZ.length ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}
