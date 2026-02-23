"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import {
  FadeIn,
  SectionLabel,
  SectionHeading,
  Tag,
  Footer,
} from "@/app/components/MotionComponents";

const { projects } = portfolioData;

type Filter = "All" | "Web App" | "Mobile" | "Reporting" | "API";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filters: Filter[] = ["All", "Web App", "Mobile", "Reporting", "API"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  const typeIcons: Record<string, string> = {
    "Web App": "🌐",
    Mobile: "📱",
    Reporting: "📊",
    API: "🔌",
  };

  return (
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="mb-20">
            <SectionLabel index="00" label="Projects" />
            <SectionHeading>What I've Built</SectionHeading>
            <p className="font-mono text-sm max-w-xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Production projects delivered at PT. Focus Inti Solusi — spanning web applications, mobile apps, APIs, and data reporting solutions.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-12">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300"
                  style={{
                    color: filter === f ? "var(--color-bg)" : "var(--color-text-muted)",
                    backgroundColor: filter === f ? "var(--color-accent)" : "transparent",
                    border: filter === f ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                  }}
                >
                  {filter === f && (
                    <motion.div
                      layoutId="proj-filter"
                      className="absolute inset-0"
                      style={{ backgroundColor: "var(--color-accent)" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-4 mb-24"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setHovered(project.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="group relative overflow-hidden flex flex-col transition-all duration-300"
                  style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
                >
                  <div
                    className="flex items-center justify-between px-8 py-5"
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{typeIcons[project.type]}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                        {project.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest" style={{ color: "#22c55e", opacity: 0.8 }}>{project.status}</span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl mb-3 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                      {project.title}
                    </h3>
                    <p className="font-mono text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--color-text-muted)" }}>
                      {project.description}
                    </p>
                    <div className="mb-6 px-4 py-3 flex items-center gap-3" style={{ border: "1px solid var(--color-accent-border)", backgroundColor: "var(--color-accent-dim)" }}>
                      <span className="text-sm" style={{ color: "var(--color-accent)" }}>★</span>
                      <span className="font-mono text-xs" style={{ color: "var(--color-accent)", opacity: 0.8 }}>{project.highlight}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <FadeIn>
            <div className="p-10 md:p-14 text-center" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--color-text-faint)" }}>
                Want to know more?
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: "var(--color-text)" }}>
                Let's discuss your project
              </h3>
              <p className="font-mono text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
                I'm always open to discussing new opportunities, interesting challenges, or just a good technical conversation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 text-xs font-mono font-medium tracking-widest uppercase transition-colors duration-300"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
              >
                Start a Conversation →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </>
  );
}
