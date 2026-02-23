"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import { FadeIn, StaggerContainer, staggerItem, SectionLabel, SectionHeading, Tag, SkillBar, Footer } from "@/app/components/MotionComponents";

const { personal, stats, techStack, skills, experience, education, projects, achievements } = portfolioData;

type Filter = "All" | "Web App" | "Mobile" | "Reporting" | "API";
type Category = "all" | "frontend" | "backend" | "data" | "tools";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Get current accent color from CSS variable
      const isDark = document.documentElement.classList.contains("dark");
      const particleColor = isDark ? "0, 212, 255" : "0, 153, 204";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16">
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-60"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-5xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 mb-6 sm:mb-10 text-[10px] sm:text-xs"
              style={{ border: "1px solid var(--color-accent-border)", backgroundColor: "var(--color-accent-dim)" }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse-slow" style={{ backgroundColor: "var(--color-accent)" }} />
              <span className="font-mono tracking-widest uppercase" style={{ color: "var(--color-accent)" }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Main heading */}
            <div className="mb-6 sm:mb-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display font-bold leading-[0.92] tracking-tight"
              >
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[clamp(2.5rem,8vw,8rem)]"
                  style={{ color: "var(--color-text)" }}
                >
                  Risman
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[clamp(2.5rem,8vw,8rem)]"
                  style={{
                    WebkitTextStroke: "1px var(--color-text-muted)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  Sambeiga
                </motion.span>
              </motion.h1>
            </div>

            {/* Subtitle line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
            >
              <div className="h-px w-12" style={{ backgroundColor: "var(--color-accent)" }} />
              <span className="text-xs sm:text-sm font-mono tracking-widest uppercase" style={{ color: "var(--color-accent)" }}>
                Full Stack Developer
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="font-mono text-sm sm:text-base leading-relaxed max-w-xl mb-8 sm:mb-12"
              style={{ color: "var(--color-text-muted)" }}
            >
              {personal.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-mono font-medium tracking-widest uppercase group transition-colors duration-300 cursor-pointer border-none bg-none w-full sm:w-auto"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
              >
                Get in Touch
                <span className="hidden sm:inline group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer border-none bg-none w-full sm:w-auto"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text)" }}
              >
                View Experience
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 sm:bottom-10 left-6 sm:left-12 items-center gap-3 hidden sm:flex"
        >
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-10"
              style={{ background: "linear-gradient(to bottom, var(--color-accent), transparent)" }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase -rotate-90 origin-left translate-x-4" style={{ color: "var(--color-text-faint)" }}>
            Scroll
          </span>
        </motion.div>

        {/* Right side location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 sm:bottom-10 right-6 sm:right-12 text-right"
        >
          <p className="text-[10px] sm:text-xs font-mono tracking-widest" style={{ color: "var(--color-text-faint)" }}>
            📍 {personal.location}
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 border-y" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`py-10 px-8 flex flex-col gap-1`}
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
                  borderTop: i >= 2 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <span className="font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--color-text)" }}>
                  {stat.value}
                  <span style={{ color: "var(--color-accent)" }}>{stat.suffix}</span>
                </span>
                <span className="text-xs font-mono tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <SectionLabel index="01" label="Technology Stack" />
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-12" style={{ color: "var(--color-text)" }}>
              Tools & Technologies
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={staggerItem}
                whileHover={{ y: -4, borderColor: "var(--color-accent-border)" }}
                className="flex flex-col items-center gap-3 p-5 transition-all duration-300 cursor-default group"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-[10px] font-mono tracking-wide text-center transition-colors" style={{ color: "var(--color-text-muted)" }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-10 py-16 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-10">
            <SectionLabel index="02" label="Explore" />
            <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-text)" }}>Navigate Portfolio</h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: "about", label: "About Me", desc: "Background & summary", num: "01" },
              { id: "skills", label: "Skills", desc: "Technical expertise", num: "02" },
              { id: "experience", label: "Experience", desc: "Work & education", num: "03" },
              { id: "projects", label: "Projects", desc: "What I've built", num: "04" },
            ].map((item) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <button
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="group flex flex-col justify-between gap-8 p-6 h-full transition-all duration-300 w-full text-left border-none cursor-pointer"
                  style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono tracking-widest" style={{ color: "var(--color-text-faint)" }}>{item.num}</span>
                    <motion.span
                      className="transition-colors duration-300"
                      style={{ color: "var(--color-text-faint)" }}
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 3, y: -3 }}
                    >
                      ↗
                    </motion.span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                      {item.label}
                    </h3>
                    <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-12 sm:mb-20">
            <SectionLabel index="03" label="About" />
            <SectionHeading>Who I Am</SectionHeading>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start mb-16 sm:mb-24">
            <FadeIn direction="left">
              <div className="prose prose-invert max-w-none">
                <p className="font-mono text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
                  {personal.summary}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-text-faint)" }}>Contact</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span style={{ color: "var(--color-accent)" }}>✉</span>
                        <a href={`mailto:${personal.email}`} className="font-mono text-sm hover:text-accent transition-colors" style={{ color: "var(--color-text-muted)" }}>
                          {personal.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ color: "var(--color-accent)" }}>📱</span>
                        <a href={`https://wa.me/62${personal.phone.slice(1)}`} className="font-mono text-sm hover:text-accent transition-colors" style={{ color: "var(--color-text-muted)" }}>
                          {personal.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ color: "var(--color-accent)" }}>📍</span>
                        <span className="font-mono text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>{personal.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="space-y-4">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="p-4 sm:p-5"
                    style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{ach.icon}</span>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-lg sm:text-xl" style={{ color: "var(--color-accent)" }}>
                          {ach.metric}
                        </div>
                        <p className="text-[11px] sm:text-xs font-mono mb-1" style={{ color: "var(--color-text-muted)" }}>
                          {ach.label}
                        </p>
                        <p className="text-[10px] font-mono leading-relaxed" style={{ color: "var(--color-text-faint)" }}>
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-12 sm:mb-20">
            <SectionLabel index="04" label="Skills" />
            <SectionHeading>Technical Expertise</SectionHeading>
            <p className="font-mono text-xs sm:text-sm max-w-xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Proficiency levels across frontend, backend, database, and reporting technologies — built through real production experience.
            </p>
          </FadeIn>

          <SkillsContent />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-12 sm:mb-20">
            <SectionLabel index="05" label="Experience" />
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
            <SectionLabel index="06" label="Education" />
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-12 sm:mb-20">
            <SectionLabel index="07" label="Projects" />
            <SectionHeading>What I've Built</SectionHeading>
            <p className="font-mono text-xs sm:text-sm max-w-xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Production projects delivered at PT. Focus Inti Solusi — spanning web applications, mobile apps, APIs, and data reporting solutions.
            </p>
          </FadeIn>

          <ProjectsContent />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-12 sm:mb-20">
            <SectionLabel index="08" label="Contact" />
            <SectionHeading>Let's Connect</SectionHeading>
            <p className="font-mono text-xs sm:text-sm max-w-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Whether you have an opportunity, a project, or simply want to connect — I'm always open to a conversation.
            </p>
          </FadeIn>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}

// Skills Component
function SkillsContent() {
  const [active, setActive] = useState<Category>("all");

  const categoryLabels: Record<Category, string> = {
    all: "All",
    frontend: "Frontend",
    backend: "Backend",
    data: "Data & Reporting",
    tools: "Tools",
  };

  const allSkills = [
    ...skills.frontend.map((s) => ({ ...s, cat: "frontend" as Category })),
    ...skills.backend.map((s) => ({ ...s, cat: "backend" as Category })),
    ...skills.data.map((s) => ({ ...s, cat: "data" as Category })),
    ...skills.tools.map((s) => ({ ...s, cat: "tools" as Category })),
  ];

  const filtered = active === "all" ? allSkills : allSkills.filter((s) => s.cat === active);

  return (
    <>
      <FadeIn delay={0.1} className="mb-12">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer border-none"
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
          className="grid sm:grid-cols-2 gap-4 sm:gap-x-16 sm:gap-y-8 mb-16 sm:mb-24"
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
    </>
  );
}

// Projects Component
function ProjectsContent() {
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
      <FadeIn delay={0.1} className="mb-12">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer border-none"
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
          className="grid sm:grid-cols-2 gap-4 mb-16 sm:mb-24"
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
                className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-lg sm:text-xl flex-shrink-0">{typeIcons[project.type]}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest truncate" style={{ color: "var(--color-text-muted)" }}>
                    {project.type}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-1 flex-shrink-0" style={{ color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                  {project.status}
                </span>
              </div>

              <div className="flex-1 flex flex-col p-4 sm:p-8">
                <h3 className="font-display font-bold text-base sm:text-lg mb-2 sm:mb-3" style={{ color: "var(--color-text)" }}>
                  {project.title}
                </h3>
                <p className="font-mono text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6 flex-1" style={{ color: "var(--color-text-muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>

              <div className="px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center text-[10px]" style={{ borderTop: "1px solid var(--color-border)" }}>
                <span className="font-mono tracking-widest truncate" style={{ color: "var(--color-accent)" }}>
                  {project.highlight}
                </span>
                <motion.span
                  animate={{ x: hovered === project.id ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "var(--color-accent)" }}
                >
                  ↗
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Contact Form Component
function ContactForm() {
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    { key: "email", icon: "✉", label: "Email", value: personal.email, href: `mailto:${personal.email}`, copyValue: personal.email },
    { key: "phone", icon: "📱", label: "Phone / WhatsApp", value: personal.phone, href: `https://wa.me/62${personal.phone.slice(1)}`, copyValue: personal.phone },
    { key: "linkedin", icon: "🔗", label: "LinkedIn", value: "risman-sambeiga", href: personal.linkedin, copyValue: personal.linkedin },
    { key: "location", icon: "📍", label: "Location", value: personal.location, href: null, copyValue: null },
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_480px] gap-6 lg:gap-8 mb-16">
      <FadeIn direction="left">
        <div className="p-4 sm:p-8 md:p-10" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <h3 className="font-display font-bold text-lg sm:text-xl mb-6 sm:mb-8" style={{ color: "var(--color-text)" }}>
            Send a Message
          </h3>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full outline-none px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-xs sm:text-sm transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full outline-none px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-xs sm:text-sm transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
                  Message
                </label>
                <textarea
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full outline-none px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-xs sm:text-sm resize-none transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-mono text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer border-none"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
              >
                Send Message
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 text-center"
              style={{ backgroundColor: "var(--color-accent-dim)", border: "1px solid var(--color-accent-border)" }}
            >
              <p className="font-mono text-xs sm:text-sm mb-2" style={{ color: "var(--color-accent)" }}>
                ✓ Message Sent!
              </p>
              <p className="font-mono text-[11px] sm:text-xs" style={{ color: "var(--color-text-muted)" }}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: "", email: "", message: "" });
                }}
                className="mt-4 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-colors duration-300 cursor-pointer border-none"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
              >
                Send Another
              </button>
            </motion.div>
          )}
        </div>
      </FadeIn>

      <FadeIn direction="right">
        <div className="space-y-3 sm:space-y-4">
          {contactItems.map((item) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative p-3 sm:p-6 flex items-center justify-between gap-2 transition-all duration-300 cursor-pointer"
              style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              onClick={() => item.copyValue && copy(item.copyValue, item.key)}
            >
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <span className="text-lg sm:text-2xl flex-shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest" style={{ color: "var(--color-text-faint)" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] sm:text-sm truncate block transition-colors duration-300"
                      style={{ color: "var(--color-text)" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-mono text-[10px] sm:text-sm truncate" style={{ color: "var(--color-text)" }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
              {item.copyValue && (
                <motion.span
                  className="text-[9px] sm:text-xs font-mono transition-colors duration-300 flex-shrink-0 whitespace-nowrap"
                  style={{ color: copied === item.key ? "var(--color-accent)" : "var(--color-text-faint)" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {copied === item.key ? "✓" : "Copy"}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
