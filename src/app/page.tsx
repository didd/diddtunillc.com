import { Navbar } from "@/components/navbar";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe2,
  Handshake,
} from "lucide-react";
import {
  services,
  metrics,
  techTags,
  processSteps,
  testimonials,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

      {/* ===== HERO ===== */}
        <section
        className="relative flex min-h-[100svh] items-center overflow-hidden px-8 pt-28 pb-24 xl:min-h-screen xl:pt-24 xl:pb-24"
        aria-labelledby="hero-heading"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <div className="pointer-events-none absolute -top-[16%] right-[-6%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow)_0%,transparent_68%)]" />
        <div className="pointer-events-none absolute top-24 right-[12%] h-40 w-40 rounded-full border border-border-subtle/60 bg-bg-card/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-bg" />
        <div className="relative z-1 mx-auto grid w-full max-w-[1280px] gap-16 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-center">
          <div className="max-w-[920px]">
            <FadeUp>
              <div className="mb-8 flex items-center gap-4 font-mono text-[0.78rem] uppercase tracking-[0.24em] text-accent">
                <span className="block h-px w-8 bg-accent" />
                Software Engineering Consultancy
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <h1
                id="hero-heading"
                className="max-w-[940px] text-[clamp(3.2rem,7.1vw,6rem)] leading-[0.96]"
              >
                <span className="block">We build</span>
                <span className="block">software that</span>
                <span className="block">
                  ships and <em className="italic text-accent">scales</em>
                </span>
              </h1>
            </FadeUp>
            <FadeUp delay={200}>
              <div className="mt-10 max-w-[650px] border-l border-accent/35 pl-6 sm:pl-7">
                <p className="text-[1.05rem] leading-[1.9] text-text-muted sm:text-[1.14rem]">
                  Didd Tuni LLC is a U.S.-registered software engineering consultancy operating
                  from Addis Ababa and Dubai. We specialize in high-performance React &amp;
                  TypeScript applications, design systems, and full-stack architecture for global
                  clients.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={300}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className={buttonVariants({ variant: "primary" })}
                >
                  Start a Conversation <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
                </a>
                <a
                  href="#work"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  View Our Work <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </div>
            </FadeUp>
          </div>

          <FadeUp
            delay={350}
            className="xl:justify-self-end xl:translate-y-4 data-[visible=true]:xl:translate-y-0"
          >
            <div className="premium-panel relative overflow-hidden rounded-[32px] border border-border p-8 backdrop-blur-sm">
              <div className="mb-7 font-mono text-[0.74rem] uppercase tracking-[0.28em] text-text-muted">
                At a glance
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                {[
                  { value: "4", label: "Years in Operation" },
                  { value: "3.5+", label: "Years Client Retained" },
                  { value: "87%", label: "CI/CD Speed Gain" },
                  { value: "15+", label: "Years Founder Experience" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={i < 2 ? "" : "border-t border-border/60 pt-5"}
                  >
                    <div className="text-[2.35rem] leading-none font-semibold tracking-[-0.04em] text-text">
                      {s.value}
                    </div>
                    <div className="mt-3 max-w-[11ch] font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-text-muted">
                  Built for long-term partnerships
                </div>
                <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_0_7px_var(--color-accent-muted)]" />
              </div>
            </div>
          </FadeUp>
        </div>
        </section>

      {/* ===== SERVICES ===== */}
        <section
        id="services"
        className="scroll-mt-16 bg-bg-elevated px-8 pt-28 pb-20"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <SectionHeading
              id="services-heading"
              eyebrow="// What We Do"
              title={
                <>
                  Engineering services built for <em className="italic text-accent">impact</em>
                </>
              }
            />
          </FadeUp>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FadeUp key={s.id} delay={100 * ((i % 3) + 1)} className="h-full">
                <div className="surface-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle p-9 transition-all hover:border-border">
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-400 group-hover:scale-x-100" />
                  <div className="mb-5 font-mono text-[0.78rem] tracking-[0.1em] text-accent">
                    {s.id} — {s.label}
                  </div>
                  <h3 className="mb-3 text-[1.2rem] font-semibold">{s.title}</h3>
                  <p className="flex-1 text-[0.95rem] leading-[1.7] text-text-muted">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        </section>

      {/* ===== CASE STUDY ===== */}
        <section
        id="work"
        className="scroll-mt-16 px-8 py-20"
        aria-labelledby="work-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <SectionHeading
              id="work-heading"
              eyebrow="// Featured Project"
              title={
                <>
                  Case <em className="italic text-accent">study</em>
                </>
              }
            />
          </FadeUp>
          <FadeUp>
            <div className="surface-card-strong relative overflow-hidden rounded-xl border border-border-subtle p-12 max-md:p-8">
              <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] bg-[radial-gradient(circle,var(--color-accent-glow)_0%,transparent_70%)]" />
              <span className="inline-block rounded bg-accent-muted px-3 py-1 font-mono text-[0.74rem] uppercase tracking-[0.1em] text-accent">
                B2B Contract · 3+ Years
              </span>
              <h3 className="mt-6 text-[1.6rem] font-semibold tracking-tight">
                AKASHA Foundation
              </h3>
              <p className="mt-2 text-[0.92rem] text-text-dim">
                Open-Source Web3 Foundation · Ethereum Ecosystem · Sep 2022 – Jan 2026
              </p>
              <p className="mt-6 max-w-[680px] text-[1.05rem] leading-[1.8] text-text-muted">
                As part of a long-term B2B contract with AKASHA Foundation, we worked with a team
                of engineers on AKASHA Core, a composable framework for building Web3 social
                products. The work included frontend architecture, component systems, performance
                optimizations, and engineering standards across a distributed team.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="surface-metric rounded-md border border-border-subtle p-5"
                  >
                    <div className="text-[1.5rem] font-bold tracking-tight text-accent">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[0.8rem] uppercase tracking-[0.06em] text-text-dim">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {techTags.map((t) => (
                  <span
                    key={t}
                    className="surface-chip rounded border border-border-subtle px-3 py-1 font-mono text-[0.76rem] tracking-wide text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
        </section>

      {/* ===== PROCESS ===== */}
        <section
        id="process"
        className="scroll-mt-16 bg-bg-elevated px-8 py-20"
        aria-labelledby="process-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <SectionHeading
              id="process-heading"
              eyebrow="// How We Work"
              title={
                <>
                  Engagement <em className="italic text-accent">process</em>
                </>
              }
            />
          </FadeUp>
          <div className="relative xl:pt-4 xl:pb-8">
            <div className="pointer-events-none absolute inset-x-0 top-2 hidden h-[380px] xl:block">
              <svg
                aria-hidden="true"
                className="h-full w-full"
                viewBox="0 0 1200 380"
                preserveAspectRatio="none"
              >
                <path
                  d="M182 116 C260 42, 338 48, 408 146"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 12"
                  opacity="0.22"
                />
                <path
                  d="M542 234 C620 318, 706 312, 776 158"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 12"
                  opacity="0.18"
                />
                <path
                  d="M878 118 C958 42, 1044 58, 1112 176"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 12"
                  opacity="0.2"
                />
              </svg>
            </div>
            <div className="relative z-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4 xl:gap-x-14 xl:gap-y-20 xl:items-start">
              {processSteps.map((s, i) => (
                <FadeUp key={s.num} delay={100 * (i + 1)}>
                  <div
                    className={`surface-card relative flex h-full flex-col rounded-xl border border-border-subtle p-7 xl:min-h-[316px] ${
                      i === 0
                        ? "xl:-mt-3"
                        : i === 1
                          ? "xl:mt-16"
                          : i === 2
                            ? "xl:-mt-10"
                            : "xl:mt-28"
                    }`}
                  >
                    {i < processSteps.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="absolute top-7 right-6 hidden h-4 w-4 text-accent/65 xl:block"
                        strokeWidth={2}
                      />
                    ) : null}
                    <div className="font-mono text-[2.2rem] font-bold leading-none text-accent/85">
                      {s.num}
                    </div>
                    <h3 className="mt-5 text-[1.1rem] font-semibold">{s.title}</h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-[1.72] text-text-muted">
                      {s.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
        </section>

      {/* ===== ABOUT ===== */}
        <section
        id="about"
        className="scroll-mt-16 bg-bg-elevated px-8 py-20"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <SectionHeading
              id="about-heading"
              eyebrow="// About the Company"
              title={
                <>
                  Who <em className="italic text-accent">we are</em>
                </>
              }
            />
          </FadeUp>
          <FadeUp>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div>
                <p className="max-w-[54ch] text-[1.12rem] leading-[1.85] text-text">
                  Didd Tuni LLC is a Delaware-registered software engineering consultancy led by
                  Didd Tuni, a senior full stack engineer with 15+ years of experience shipping
                  production systems across fintech, transportation, Web3, and enterprise SaaS.
                </p>
                <div className="mt-8 grid gap-3">
                  {[
                    {
                      title: "Long-horizon engineering",
                      body: "Durable systems, not short-term feature throughput.",
                    },
                    {
                      title: "Senior execution across time zones",
                      body: "US, EU, and UAE-friendly delivery from Addis Ababa and Dubai.",
                    },
                    {
                      title: "Proven on complex products",
                      body: "3.5 years on a B2B contract with AKASHA Foundation, contributing to AKASHA Core alongside a distributed engineering team.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-border-subtle bg-bg-card/45 px-5 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.1} />
                        <div>
                          <div className="text-[0.98rem] font-semibold text-text">{item.title}</div>
                          <p className="mt-1.5 text-[0.95rem] leading-[1.68] text-text-muted">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: Building2,
                    label: "Entity",
                    text: "Didd Tuni LLC\nSingle Member LLC\nDelaware, United States",
                  },
                  {
                    icon: Globe2,
                    label: "Operations",
                    text: "Remote-first, global delivery\nUS / EU / UAE time zones\nAddis Ababa, Ethiopia & Dubai, UAE",
                  },
                  {
                    icon: BriefcaseBusiness,
                    label: "Engagement Models",
                    text: "B2B Contract (Part-time / Full-time)\nTechnical Advisory & Consulting\nArchitecture Reviews",
                  },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="surface-card rounded-xl border border-border-subtle p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <d.icon aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={2.1} />
                      <h4 className="font-mono text-[0.78rem] uppercase tracking-[0.1em] text-accent">
                        {d.label}
                      </h4>
                    </div>
                    <p className="whitespace-pre-line text-[0.95rem] leading-[1.65] text-text-muted">
                      {d.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
        </section>

      {/* ===== TESTIMONIALS ===== */}
        <section
        id="testimonials"
        className="scroll-mt-16 px-8 py-20"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <SectionHeading
              id="testimonials-heading"
              eyebrow="// References"
              title={
                <>
                  Kind words from <em className="italic text-accent">people we&apos;ve worked with</em>
                </>
              }
            />
          </FadeUp>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeUp key={t.author} delay={100 * (i + 1)} className="h-full">
                <div className="surface-card relative flex h-full flex-col rounded-lg border border-border-subtle p-8">
                  <span className="absolute top-4 right-6 font-serif text-6xl font-bold leading-none text-accent-muted">
                    &ldquo;
                  </span>
                  <blockquote className="mb-5 flex-1 [font-family:var(--font-heading)] text-[1.08rem] leading-[1.75] italic text-text">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="text-[0.95rem] font-semibold">{t.author}</div>
                  <div className="mt-0.5 text-[0.8rem] text-text-dim">{t.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        </section>

      {/* ===== CONTACT ===== */}
        <section
        id="contact"
        className="scroll-mt-16 bg-bg-elevated px-8 py-20"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <SectionHeading
              id="contact-heading"
              eyebrow="// Let's Work Together"
              title={
                <>
                  Start a <em className="italic text-accent">project</em>
                </>
              }
            />
          </FadeUp>
          <FadeUp>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent">
                  <Handshake aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.1} />
                  Thoughtful engineering partnerships
                </div>
                <p className="mt-6 text-base leading-[1.8] text-text-muted">
                  Whether you need a senior engineer embedded in your team, a design system built
                  from scratch, or architectural guidance for a complex platform — we&apos;d love to
                  hear about your project.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  {[
                    { label: "Email", value: "contact@diddtunillc.com", href: "mailto:contact@diddtunillc.com" },
                    { label: "Web", value: "diddtunillc.com", href: "https://diddtunillc.com" },
                    { label: "Address", value: "16192 Coastal Highway\nLewes, DE 19958, US" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-3">
                      <span className="min-w-[70px] pt-0.5 font-mono text-[0.76rem] uppercase tracking-[0.08em] text-text-dim">
                        {c.label}
                      </span>
                      <span className="whitespace-pre-line text-[0.95rem] leading-[1.5] text-text-muted">
                        {c.href ? <a href={c.href} className="text-text-muted hover:text-accent">{c.value}</a> : c.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </FadeUp>
        </div>
        </section>
      </main>
      {/* ===== FOOTER ===== */}
      <footer
        role="contentinfo"
        className="border-t border-border-subtle px-8 py-12"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="text-[0.78rem] text-text-dim">
            © 2026 <strong className="font-medium text-text-muted">Didd Tuni LLC</strong> ·
            Delaware, US · All rights reserved.
          </div>
          <ul className="flex gap-6" role="list">
            {[
              { href: "mailto:contact@diddtunillc.com", label: "contact@diddtunillc.com" },
              { href: "#services", label: "Services" },
              { href: "#work", label: "Work" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[0.78rem] text-text-dim transition-colors hover:text-accent hover:opacity-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
