"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/app/lib/utils";

// ─── Fade In ───────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Container ─────────────────────────────────
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({ children, className, staggerDelay = 0.08, once = true }: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Animated Counter ─────────────────────────────────
interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, suffix = "", duration = 2, className }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Section Label ─────────────────────────────────────
interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4", className)}>
      <span className="text-[9px] sm:text-xs font-mono tracking-widest" style={{ color: "var(--color-accent)", opacity: 0.6 }}>{index}</span>
      <div className="w-4 sm:w-6 h-px" style={{ backgroundColor: "var(--color-accent)", opacity: 0.3 }} />
      <span className="text-[9px] sm:text-xs font-mono uppercase tracking-widest" style={{ color: "var(--color-accent)", opacity: 0.8 }}>{label}</span>
    </div>
  );
}

// ─── Section Heading ───────────────────────────────────
interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-display font-bold text-2xl sm:text-3xl md:text-5xl leading-[1.05] tracking-tight mb-8 sm:mb-12",
        className
      )}
      style={{ color: "var(--color-text)" }}
    >
      {children}
    </h2>
  );
}

// ─── Skill Bar ─────────────────────────────────────────
interface SkillBarProps {
  name: string;
  level: number;
  years: string;
  delay?: number;
}

export function SkillBar({ name, level, years, delay = 0 }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setAnimated(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2 gap-2">
        <span className="text-xs sm:text-sm font-mono transition-colors truncate" style={{ color: "var(--color-text)" }}>{name}</span>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="text-[10px] sm:text-xs font-mono whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>{years}</span>
          <span className="text-[10px] sm:text-xs font-mono tabular-nums whitespace-nowrap" style={{ color: "var(--color-accent)" }}>{level}%</span>
        </div>
      </div>
      <div className="h-[2px] relative overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            background: `linear-gradient(90deg, var(--color-accent), #818cf8)`,
            boxShadow: "0 0 8px var(--color-accent-dim)",
          }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {animated && (
          <motion.div
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full"
            style={{ left: `${level}%`, transform: `translateX(-50%) translateY(-50%)`, backgroundColor: "var(--color-accent)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Tag Badge ─────────────────────────────────────────
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-mono tracking-wide",
        className
      )}
      style={{
        color: "var(--color-accent)",
        border: "1px solid var(--color-accent-border)",
        backgroundColor: "var(--color-accent-dim)",
      }}
    >
      {children}
    </span>
  );
}

// ─── Footer ────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="relative z-10 mt-16 sm:mt-24 border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid var(--color-accent-border)" }}>
            <span className="text-[8px] sm:text-[9px] font-display font-bold" style={{ color: "var(--color-accent)" }}>RS</span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
            © 2025 Risman Sambeiga
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
          <span className="font-mono" style={{ color: "var(--color-text-faint)" }}>Full Stack Developer</span>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-text-faint)" }} />
          <span className="font-mono" style={{ color: "var(--color-text-faint)" }}>Bekasi, Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
