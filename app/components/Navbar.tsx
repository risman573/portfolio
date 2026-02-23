"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl border-b"
            : "bg-transparent"
        }`}
        style={
          scrolled
            ? { backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)", opacity: 0.95 }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNavClick("hero")} className="flex items-center gap-2 sm:gap-3 group bg-none border-none cursor-pointer p-0 flex-shrink-0">
            <div
              className="relative w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center group-hover:border-accent transition-colors duration-300 flex-shrink-0"
              style={{ border: "1px solid var(--color-accent-border)" }}
            >
              <span className="text-[10px] sm:text-xs font-display font-bold" style={{ color: "var(--color-accent)" }}>RS</span>
              <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: "var(--color-accent-dim)" }} />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xs sm:text-sm tracking-wide" style={{ color: "var(--color-text)" }}>
                Risman
              </span>
              <span className="font-display font-bold text-xs sm:text-sm tracking-wide" style={{ color: "var(--color-accent)" }}>
                _Sambeiga
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 lg:px-4 py-2 text-[11px] lg:text-xs tracking-widest uppercase transition-colors duration-300 font-mono bg-none border-none cursor-pointer`}
                  style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-muted)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0"
                      style={{ backgroundColor: "var(--color-accent-dim)", border: "1px solid var(--color-accent-border)" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDark}
              className="ml-1 lg:ml-2 w-8 lg:w-9 h-8 lg:h-9 flex items-center justify-center border rounded-sm transition-all duration-300 hover:scale-110 flex-shrink-0"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-muted)",
              }}
              aria-label="Toggle dark mode"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <motion.span
                key={darkMode ? "moon" : "sun"}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="text-sm"
              >
                {darkMode ? "☀️" : "🌙"}
              </motion.span>
            </button>

            <a
              href="mailto:sambeigarisman@gmail.com"
              className="ml-2 lg:ml-3 px-3 lg:px-5 py-2 text-[10px] lg:text-xs tracking-widest uppercase font-mono transition-colors duration-300"
              style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile: toggle + burger */}
          <div className="md:hidden flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onToggleDark}
              className="w-7 h-7 flex items-center justify-center border rounded-sm text-xs flex-shrink-0"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
              aria-label="Toggle dark mode"
            >
              <span>{darkMode ? "☀️" : "🌙"}</span>
            </button>
            <button
              className="flex flex-col gap-1 p-1.5 group flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                className="w-5 h-px transition-colors"
                style={{ backgroundColor: "var(--color-text)" }}
              />
              <motion.div
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="w-4 h-px transition-colors"
                style={{ backgroundColor: "var(--color-text)" }}
              />
              <motion.div
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                className="w-5 h-px transition-colors"
                style={{ backgroundColor: "var(--color-text)" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 w-64 sm:w-72 z-40 flex flex-col pt-16 sm:pt-20 pb-6 sm:pb-8 px-6 sm:px-8 border-l"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm tracking-widest uppercase border-l-2 transition-all duration-300 bg-none border-none`}
                      style={{
                        borderColor: isActive ? "var(--color-accent)" : "transparent",
                        color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                        backgroundColor: isActive ? "var(--color-accent-dim)" : "transparent",
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-auto">
              <a
                href="mailto:sambeigarisman@gmail.com"
                className="block text-center py-3 text-xs tracking-widest uppercase font-mono transition-colors duration-300"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
