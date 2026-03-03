"use client";

import type { FormEvent } from "react";
import { useId, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Building2, Mail, UserRound } from "lucide-react";
import { budgetOptions, serviceOptions } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/field";

type FormStatus =
  | { type: "idle"; message: string }
  | { type: "submitting"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ContactForm() {
  const statusId = useId();
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "Share a few details and we will follow up by email.",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    setStatus({ type: "submitting", message: "Sending your inquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string; field?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your inquiry right now.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: result.message || "Inquiry sent. We will get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your inquiry right now.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div className="rounded-[1.6rem] border border-border bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-bg-card)_100%,transparent),color-mix(in_srgb,var(--color-bg-elevated)_12%,var(--color-bg-card)_88%))] p-10 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
        <div className="flex h-full flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent-muted px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent">
            Inquiry received
          </div>
          <h3 className="mt-5 text-[1.6rem] font-semibold text-text">Thanks. I will review it personally.</h3>
          <p
            id={statusId}
            aria-live="polite"
            className="mt-3 max-w-[34ch] text-[0.98rem] leading-[1.75] text-text-muted"
          >
            {status.message}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() =>
                setStatus({
                  type: "idle",
                  message: "Share a few details and we will follow up by email.",
                })
              }
            >
              Send Another Inquiry
            </Button>
            <a
              href="mailto:contact@diddtunillc.com"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-bg-elevated px-6 py-3 text-[0.88rem] font-medium text-text transition-all hover:border-text-muted hover:bg-bg-card"
            >
              Email Directly
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.6rem] border border-border bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-bg-card)_100%,transparent),color-mix(in_srgb,var(--color-bg-elevated)_12%,var(--color-bg-card)_88%))] p-10 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
      <form
        noValidate={false}
        aria-label="Project inquiry form"
        aria-describedby={`contact-form-intro ${statusId}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[0.76rem] uppercase tracking-[0.14em] text-accent">
              Project inquiry
            </div>
            <p
              id="contact-form-intro"
              className="mt-2 max-w-[36ch] text-[0.95rem] leading-[1.65] text-text-muted"
            >
              Tell us what you are building and where you need senior engineering help.
            </p>
          </div>
          <div className="hidden rounded-full border border-border-subtle bg-bg-elevated p-3 sm:block">
            <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2.1} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field htmlFor="name" label="Your Name" required>
            <TextInput
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Jane Smith"
              icon={<UserRound aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
            />
          </Field>
          <Field htmlFor="email" label="Email" required>
            <TextInput
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="jane@company.com"
              icon={<Mail aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
            />
          </Field>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field htmlFor="company" label="Company">
            <TextInput
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              placeholder="Acme Inc."
              icon={<Building2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
            />
          </Field>
          <Field htmlFor="budget" label="Budget Range">
            <SelectInput id="budget" name="budget" defaultValue="">
              <option value="" disabled>
                Select range
              </option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>

        <div className="mt-5">
          <Field htmlFor="service" label="Service Needed">
            <SelectInput id="service" name="service" defaultValue="" required>
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>

        <div className="mt-5">
          <Field htmlFor="message" label="Project Details" required>
            <TextArea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your project, timeline, and what you're looking for..."
              minLength={20}
            />
          </Field>
        </div>

        <p
          id={statusId}
          aria-live="polite"
          className={`mt-6 text-[0.9rem] transition-colors ${
            status.type === "error"
              ? "text-[color:#b94a48]"
              : "text-text-dim"
          }`}
        >
          {status.message}
        </p>

        <Button
          type="submit"
          className="mt-6 w-full"
          disabled={status.type === "submitting"}
          aria-busy={status.type === "submitting"}
        >
          Send Inquiry <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
        </Button>
      </form>
    </div>
  );
}
