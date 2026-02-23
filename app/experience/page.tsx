"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
  SectionLabel,
  SectionHeading,
  Tag,
  Footer,
} from "@/app/components/MotionComponents";

const { experience, education } = portfolioData;

export default function ExperiencePage() {
  return (
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="mb-20">
            <SectionLabel index="00" label="Experience" />
            <SectionHeading>Work History</SectionHeading>
          </FadeIn>

          <div className="relative mb-24">
            <div className="absolute left-0 top-0 bottom-0 w-px hidden sm:block" style={{ backgroundColor: "var(--color-border)" }} />
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <FadeIn key={exp.id} delay={i * 0.1}>
                  <div className="sm:pl-10 relative">
                    <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full hidden sm:block" style={{ border: "2px solid var(--color-accent)", backgroundColor: "var(--color-bg)" }} />
                    <motion.div
                      whileHover={{ borderColor: "var(--color-accent-border)" }}
                      className="p-8 md:p-10 transition-colors duration-300 relative overflow-hidden"
                      style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }} />

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5" style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent-border)" }}>
                              {exp.type}
                            </span>
                            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 flex items-center gap-1.5" style={{ color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse inline-block" />
                              Active
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: "var(--color-text)" }}>
                            {exp.role}
                          </h3>
                          <p className="font-mono text-sm" style={{ color: "var(--color-accent)" }}>{exp.company}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-mono text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>{exp.period}</p>
                          <p className="font-mono text-xs" style={{ color: "var(--color-text-faint)" }}>{exp.location}</p>
                          <div className="mt-3 text-right">
                            <span className="inline-block font-mono text-xs px-3 py-1" style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent-border)", backgroundColor: "var(--color-accent-dim)" }}>
                              {exp.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="font-mono text-sm leading-loose mb-8" style={{ color: "var(--color-text-muted)" }}>
                        {exp.description}
                      </p>

                      <div className="mb-8">
                        <p className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: "var(--color-text-faint)" }}>Key Highlights</p>
                        <ul className="space-y-3">
                          {exp.highlights.map((h, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: j * 0.08, duration: 0.4 }}
                              className="flex items-start gap-3 font-mono text-sm"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent)" }}>›</span>
                              {h}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-text-faint)" }}>Technologies Used</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => <Tag key={t}>{t}</Tag>)}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn className="mb-10">
            <SectionLabel index="01" label="Education" />
            <SectionHeading>Academic Background</SectionHeading>
          </FadeIn>

          <StaggerContainer className="space-y-4 mb-24">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                variants={staggerItem}
                whileHover={{ borderColor: "var(--color-accent-border)" }}
                className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl" style={{ border: "1px solid var(--color-accent-border)", backgroundColor: "var(--color-accent-dim)" }}>
                    🎓
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--color-text)" }}>{edu.degree}</h3>
                    <p className="font-mono text-sm mb-1" style={{ color: "var(--color-accent)" }}>{edu.institution}</p>
                    <p className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>{edu.location}</p>
                    <p className="font-mono text-xs mt-1" style={{ color: "var(--color-text-faint)" }}>Focus: {edu.focus}</p>
                  </div>
                </div>
                <div className="md:text-right flex-shrink-0">
                  <p className="font-mono text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>{edu.period}</p>
                  <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-1" style={{ color: "var(--color-gold)", border: "1px solid var(--color-gold)", opacity: 0.8, backgroundColor: "rgba(160,120,64,0.08)" }}>
                    {edu.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="p-8" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-6" style={{ color: "var(--color-text-faint)" }}>Career Timeline</p>
              <div className="flex items-center gap-0 overflow-x-auto pb-2">
                {[
                  { year: "2022", label: "Started University", dot: "var(--color-text-muted)" },
                  { year: "2023", label: "Joined PT. Focus Inti Solusi", dot: "var(--color-accent)" },
                  { year: "2024", label: "Led Performance Projects", dot: "var(--color-accent)" },
                  { year: "2025+", label: "Present & Growing", dot: "#22c55e" },
                ].map((item, i, arr) => (
                  <div key={i} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: item.dot, backgroundColor: item.dot }} />
                      <div className="text-xs font-mono mt-2 whitespace-nowrap" style={{ color: "var(--color-accent)" }}>{item.year}</div>
                      <div className="text-[10px] font-mono mt-1 whitespace-nowrap max-w-24 text-center" style={{ color: "var(--color-text-muted)" }}>{item.label}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-16 sm:w-24 h-px mx-2 flex-shrink-0" style={{ backgroundColor: "var(--color-border)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </>
  );
}
