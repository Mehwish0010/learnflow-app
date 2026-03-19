"use client";

import "./globals.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    if (linksRef.current?.children) {
      gsap.fromTo(
        Array.from(linksRef.current.children),
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>LearnFlow - AI Python Tutor</title>
        <meta name="description" content="AI-powered Python tutoring platform" />
      </head>
      <body>
        <nav className="bg-dark text-white px-6 py-3 flex items-center justify-between border-b border-primary/30 shadow-red-glow">
          <a
            ref={logoRef}
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            LearnFlow
          </a>
          <div ref={linksRef} className="flex gap-6 text-sm">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/chat", label: "Chat" },
              { href: "/editor", label: "Editor" },
              { href: "/quiz", label: "Quiz" },
              { href: "/teacher", label: "Teacher" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
