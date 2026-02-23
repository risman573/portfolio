"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme from localStorage, default = light
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    if (!mounted) return;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let animFrame: number;

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (dot) {
        dot.style.left = dotX - 3 + "px";
        dot.style.top = dotY - 3 + "px";
      }
      if (ring) {
        ring.style.left = ringX - 16 + "px";
        ring.style.top = ringY - 16 + "px";
      }
      animFrame = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (ring) {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "var(--cursor-color)";
        ring.style.opacity = "0.8";
      }
    };
    const onLeave = () => {
      if (ring) {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "var(--cursor-color)";
        ring.style.opacity = "0.5";
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    animFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animFrame);
    };
  }, [mounted, pathname]);

  return (
    <html lang="en">
      <head>
        <title>Risman Sambeiga — Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer specializing in .NET, React.js, and enterprise solutions" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-mono antialiased overflow-x-hidden" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        {/* Cursor */}
        {mounted && (
          <>
            <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
            <div ref={cursorRingRef} className="cursor-ring hidden md:block" />
          </>
        )}

        {/* Grid Background */}
        <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none z-0" />

        {/* Ambient orbs */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--orb-1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--orb-2) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, var(--orb-3) 0%, transparent 70%)", filter: "blur(60px)" }} />

        {/* Navbar */}
        <Navbar darkMode={darkMode} onToggleDark={toggleDarkMode} />

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Scan line effect */}
        <div
          className="fixed top-0 left-0 w-full h-[2px] pointer-events-none z-50 opacity-[0.04]"
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
            animation: "scanLine 8s linear infinite",
          }}
        />
      </body>
    </html>
  );
}
