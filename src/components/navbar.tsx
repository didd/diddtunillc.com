"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "References" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#services");

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const updateActive = () => {
      const currentHash = window.location.hash;
      if (links.some((link) => link.href === currentHash)) {
        setActiveHref(currentHash);
      }

      const offset = 96;
      const currentSection = sections.findLast((section) => section.offsetTop - offset <= window.scrollY);
      if (currentSection) {
        setActiveHref(`#${currentSection.id}`);
      }
    };

    updateActive();
    window.addEventListener("hashchange", updateActive);
    window.addEventListener("scroll", updateActive, { passive: true });

    return () => {
      window.removeEventListener("hashchange", updateActive);
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-nav-open", open);
    return () => {
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const handleNavClick = (href: string) => {
    setActiveHref(href);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-100 border-b border-border-subtle bg-(--color-nav-bg) backdrop-blur-[20px] transition-colors duration-400"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-8">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-[0.85rem] font-medium tracking-wide text-text"
          aria-label="Didd Tuni LLC home"
        >
          DIDD TUNI <span className="text-accent">LLC</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden flex-1 justify-center gap-8 md:flex" role="list">
          {links.slice(0, 4).map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => handleNavClick(l.href)}
                aria-current={activeHref === l.href ? "page" : undefined}
                className={`text-[0.82rem] font-medium uppercase tracking-wide transition-colors hover:text-accent hover:opacity-100 ${
                  activeHref === l.href ? "text-accent" : "text-text-muted"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + theme */}
        <a
          href="#contact"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden md:inline-flex")}
        >
          Start a Project
        </a>
        <ThemeToggle className="hidden md:flex" />

        {/* Hamburger */}
        <button
          type="button"
          className={cn(buttonVariants({ variant: "icon", size: "icon" }), "relative z-110 md:hidden")}
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
        >
          {open ? <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} /> : <Menu aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
          className="fixed inset-0 z-100 flex h-dvh w-screen flex-col items-center justify-center gap-8 bg-bg/98 px-8"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => {
                handleNavClick(l.href);
                close();
              }}
              aria-current={activeHref === l.href ? "page" : undefined}
              className={`text-xl font-medium transition-colors hover:text-accent ${
                activeHref === l.href ? "text-accent" : "text-text"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
          >
            Start a Project
          </a>
          <ThemeToggle className="mt-6" />
        </div>
      )}
    </nav>
  );
}
