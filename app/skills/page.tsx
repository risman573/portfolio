"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
  SectionLabel,
  SectionHeading,
  SkillBar,
  Footer,
} from "@/app/components/MotionComponents";

const { skills, techStack } = portfolioData;

type Category = "all" | "frontend" | "backend" | "data" | "tools";

const categoryLabels: Record<Category, string> = {
  all: "All",
  frontend: "Frontend",
  backend: "Backend",
  data: "Data & Reporting",
  tools: "Tools",
};

export default function SkillsPage() {
  const [active, setActive] = useState<Category>("all");

  const allSkills = [
    ...skills.frontend.map((s) => ({ ...s, cat: "frontend" as Category })),
    ...skills.backend.map((s) => ({ ...s, cat: "backend" as Category })),
    ...skills.data.map((s) => ({ ...s, cat: "data" as Category })),
    ...skills.tools.map((s) => ({ ...s, cat: "tools" as Category })),
  ];

  const filtered = active === "all" ? allSkills : allSkills.filter((s) => s.cat === active);

  return (
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="mb-20">
            <SectionLabel index="00" label="Skills" />
            <SectionHeading>Technical Expertise</SectionHeading>
            <p className="font-mono text-sm max-w-xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Proficiency levels across frontend, backend, database, and reporting technologies — built through real production experience.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-12">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300"
                  style={{
                    color: active === cat ? "var(--color-bg)" : "var(--color-text-muted)",
                    backgroundColor: active === cat ? "var(--color-accent)" : "transparent",
                    border: active === cat ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                  }}
                >
                  {active === cat && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0"
                      style={{ backgroundColor: "var(--color-accent)" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative z-10">{categoryLabels[cat]}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-x-16 gap-y-8 mb-24"
            >
              {filtered.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  years={skill.years}
                  delay={i * 0.06}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <FadeIn className="mb-20">
            <div className="p-8" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "var(--color-text-muted)" }}>Proficiency Scale</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { range: "90–100%", label: "Expert", color: "var(--color-accent)" },
                  { range: "75–89%", label: "Advanced", color: "#818cf8" },
                  { range: "60–74%", label: "Proficient", color: "var(--color-gold)" },
                  { range: "< 60%", label: "Learning", color: "var(--color-text-faint)" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <div>
                      <div className="text-xs font-mono" style={{ color: "var(--color-text)" }}>{p.label}</div>
                      <div className="text-[10px] font-mono" style={{ color: "var(--color-text-faint)" }}>{p.range}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mb-10">
            <SectionLabel index="01" label="Technology Stack" />
            <SectionHeading>Tools I Use</SectionHeading>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 p-5 transition-all duration-300 group"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <span className="text-2xl flex-shrink-0">{tech.icon}</span>
                <div className="text-sm font-mono transition-colors" style={{ color: "var(--color-text)" }}>
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}
