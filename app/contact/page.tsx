"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
  SectionLabel,
  SectionHeading,
  Footer,
} from "@/app/components/MotionComponents";

const { personal } = portfolioData;

export default function ContactPage() {
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
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="mb-20">
            <SectionLabel index="00" label="Contact" />
            <SectionHeading>Let's Connect</SectionHeading>
            <p className="font-mono text-sm max-w-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Whether you have an opportunity, a project, or simply want to connect — I'm always open to a conversation.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_480px] gap-8 mb-16">

            <FadeIn direction="left">
              <div className="p-8 md:p-10" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                <h3 className="font-display font-bold text-xl mb-8" style={{ color: "var(--color-text)" }}>
                  Send a Message
                </h3>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full outline-none px-4 py-3 font-mono text-sm transition-colors duration-300"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full outline-none px-4 py-3 font-mono text-sm transition-colors duration-300"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full outline-none px-4 py-3 font-mono text-sm transition-colors duration-300 resize-none"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-3.5 text-xs font-mono font-medium tracking-widest uppercase transition-colors duration-300"
                      style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
                    >
                      Send Message →
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center text-center"
                  >
                    <div className="text-5xl mb-6">✅</div>
                    <h4 className="font-display font-bold text-xl mb-3" style={{ color: "var(--color-text)" }}>Message Sent!</h4>
                    <p className="font-mono text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-text-muted)" }}>
                      Thank you, {formState.name}! I'll get back to you at {formState.email} as soon as possible.
                    </p>
                  </motion.div>
                )}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="space-y-3">
                <div className="px-6 py-5 flex items-center gap-4 mb-6" style={{ border: "1px solid rgba(34,197,94,0.2)", backgroundColor: "rgba(34,197,94,0.05)" }}>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <div>
                    <p className="font-mono text-sm" style={{ color: "#22c55e" }}>Currently Available</p>
                    <p className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>Open to full-time & freelance opportunities</p>
                  </div>
                </div>

                <StaggerContainer className="space-y-3">
                  {contactItems.map((item) => (
                    <motion.div
                      key={item.key}
                      variants={staggerItem}
                      className="transition-colors duration-300 group"
                      style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
                    >
                      <div className="px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: "var(--color-text-faint)" }}>
                              {item.label}
                            </p>
                            <p className="font-mono text-sm transition-colors" style={{ color: "var(--color-text)" }}>
                              {item.value}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.copyValue && (
                            <button
                              onClick={() => copy(item.copyValue!, item.key)}
                              className="p-2 text-xs font-mono transition-colors"
                              style={{ color: "var(--color-text-muted)" }}
                              title="Copy"
                            >
                              {copied === item.key ? "✓" : "⎘"}
                            </button>
                          )}
                          {item.href && (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 transition-colors"
                              style={{ color: "var(--color-text-muted)" }}
                              title="Open"
                            >
                              ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </StaggerContainer>

                <div className="px-6 py-5 mt-6" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-text-faint)" }}>Response Time</p>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
                      <div className="h-full w-4/5 rounded-full" style={{ background: "linear-gradient(to right, var(--color-accent), var(--color-accent-dim))" }} />
                    </div>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--color-text)" }}>≤ 24 hours</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="p-10 text-center relative overflow-hidden" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, var(--color-accent-dim) 0%, transparent 70%)" }} />
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--color-text-faint)" }}>Preferred Contact</p>
              <a
                href={`mailto:${personal.email}`}
                className="font-display font-bold text-2xl md:text-4xl transition-colors duration-300 break-all"
                style={{ color: "var(--color-text)" }}
              >
                {personal.email}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </>
  );
}
