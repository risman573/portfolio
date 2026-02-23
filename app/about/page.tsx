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

const { personal, achievements } = portfolioData;

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="mb-20">
            <SectionLabel index="00" label="About" />
            <SectionHeading>Who I Am</SectionHeading>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_400px] gap-16 mb-24">
            <FadeIn direction="left">
              <div className="space-y-6">
                <p className="font-mono text-sm leading-loose" style={{ color: "var(--color-text)" }}>
                  {personal.summary}
                </p>
                <p className="font-mono text-sm leading-loose" style={{ color: "var(--color-text-muted)" }}>
                  I thrive in environments where complex problems meet elegant engineering. With a foundation in full-stack development and a passion for building systems that scale, I bring both technical depth and a results-oriented mindset to every project.
                </p>
                <p className="font-mono text-sm leading-loose" style={{ color: "var(--color-text-muted)" }}>
                  Currently pursuing my degree at UNINDRA while contributing meaningfully as a Software Developer at PT. Focus Inti Solusi — applying academic knowledge directly in production environments.
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                  {[".NET Framework", "React.js", "React Native", "Java", "PHP", "SQL Server", "SSRS", "REST API"].map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="p-8 space-y-6" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                <h3 className="font-display font-bold text-lg mb-6" style={{ color: "var(--color-text)" }}>
                  Quick Info
                </h3>
                {[
                  { label: "Name", value: personal.name },
                  { label: "Title", value: personal.title },
                  { label: "Location", value: personal.location },
                  { label: "Email", value: personal.email },
                  { label: "Phone", value: personal.phone },
                  { label: "Status", value: "Open to opportunities" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 pb-4 last:pb-0" style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--color-text-faint)" }}>{item.label}</span>
                    <span className="text-sm font-mono" style={{ color: "var(--color-text)" }}>{item.value}</span>
                  </div>
                ))}
                <div className="pt-2 flex gap-3">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2.5 text-xs font-mono tracking-widest uppercase transition-colors duration-300"
                    style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent-border)" }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex-1 text-center py-2.5 text-xs font-mono tracking-widest uppercase transition-colors duration-300"
                    style={{ color: "var(--color-bg)", backgroundColor: "var(--color-accent)" }}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mb-10">
            <SectionLabel index="01" label="Key Achievements" />
            <SectionHeading>Impact & Results</SectionHeading>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-24">
            {achievements.map((a) => (
              <motion.div
                key={a.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="p-8 relative overflow-hidden group transition-all duration-300"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="text-3xl mb-4">{a.icon}</div>
                <div className="font-display font-bold text-4xl mb-2 leading-none" style={{ color: "var(--color-accent)" }}>
                  {a.metric}
                </div>
                <div className="text-sm font-mono font-medium mb-3" style={{ color: "var(--color-text)" }}>{a.label}</div>
                <div className="text-xs font-mono leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{a.description}</div>
                <div className="mt-4">
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5" style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent-border)", opacity: 0.7 }}>
                    {a.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn className="mb-10">
            <SectionLabel index="02" label="Core Values" />
            <SectionHeading>What Drives Me</SectionHeading>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "Clean Architecture", desc: "Believe that well-structured, readable code is not a luxury — it's a necessity for long-term software health.", icon: "🏗️" },
              { title: "Continuous Learning", desc: "Technology evolves fast. I stay current by constantly exploring new frameworks, patterns, and best practices.", icon: "📚" },
              { title: "User-Centric Focus", desc: "Every technical decision ultimately exists to serve users. I design and build with the end experience in mind.", icon: "🎯" },
            ].map((val, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-8 transition-all duration-300"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <div className="text-3xl mb-6">{val.icon}</div>
                <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--color-text)" }}>{val.title}</h3>
                <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{val.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}
