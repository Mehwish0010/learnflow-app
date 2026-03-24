"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".auth-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".auth-form",
      { x: isLogin ? -20 : 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [isLogin]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (isLogin) {
      // Store session
      localStorage.setItem(
        "learnflow_user",
        JSON.stringify({ email, role: email.includes("teacher") ? "teacher" : "student", name: email.split("@")[0] })
      );
      window.location.href = email.includes("teacher") ? "/teacher" : "/dashboard";
    } else {
      if (!name) {
        setError("Please enter your name");
        return;
      }
      localStorage.setItem(
        "learnflow_user",
        JSON.stringify({ email, role, name })
      );
      window.location.href = role === "teacher" ? "/teacher" : "/dashboard";
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-8">
      <div className="auth-card bg-dark-card border border-gray-800 rounded-xl p-8 w-full max-w-md shadow-red-glow">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {isLogin ? "Welcome Back" : "Join LearnFlow"}
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          {isLogin ? "Sign in to continue learning" : "Create your account"}
        </p>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary input-glow transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary input-glow transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary input-glow transition-all"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary input-glow transition-all"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-accent hover:shadow-red-glow transition-all duration-300"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-accent transition-colors"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
