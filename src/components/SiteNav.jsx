"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SmoothLink from "./SmoothLink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/commute", label: "Commute" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

function HamburgerIcon({ open }) {
  return (
    <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]" aria-hidden>
      <span
        className={`block h-px w-5 rounded-full bg-slate-300 transition-all duration-200 ${
          open ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-px w-5 rounded-full bg-slate-300 transition-all duration-200 ${
          open ? "opacity-0 scale-x-50" : ""
        }`}
      />
      <span
        className={`block h-px w-5 rounded-full bg-slate-300 transition-all duration-200 ${
          open ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const startHref = pathname === "/calculator" ? "#calculator-form" : "/calculator#calculator-form";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[rgba(6,14,12,0.88)] shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Logo */}
          <SmoothLink href="/" className="official-button flex min-w-0 items-center gap-3 rounded-md">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-to-br from-emerald-200 to-amber-200 text-sm font-black text-[#060e0c] shadow-[0_0_28px_rgba(110,231,183,0.28)]">
              AL
            </span>
            <span className="truncate text-sm font-semibold tracking-wide text-slate-100 sm:text-base">
              Affordability Labs
            </span>
          </SmoothLink>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 text-sm font-medium text-slate-300 lg:flex"
          >
            {navLinks.map((link) => (
              <SmoothLink
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-emerald-300/[0.12] text-emerald-100 border border-emerald-300/20"
                    : "hover:bg-white/[0.06] hover:text-slate-100"
                }`}
              >
                {link.label}
              </SmoothLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA button */}
            <SmoothLink
              href={startHref}
              className="official-button inline-flex h-10 items-center justify-center rounded-md bg-emerald-300 px-4 text-sm font-bold text-[#060e0c] shadow-[0_0_26px_rgba(110,231,183,0.22)] hover:bg-amber-200"
            >
              <span className="hidden sm:inline">Start calculator</span>
              <span className="sm:hidden">Start</span>
            </SmoothLink>

            {/* Hamburger — below lg */}
            <button
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="official-button grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.06] lg:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              type="button"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <>
          <div
            className="mobile-nav-overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <nav
            aria-label="Mobile navigation"
            className="mobile-nav-drawer"
          >
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <SmoothLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex h-12 items-center rounded-lg px-4 text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-emerald-300/[0.14] text-emerald-100 border border-emerald-300/20"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-slate-100"
                  }`}
                >
                  {link.label}
                </SmoothLink>
              ))}
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <SmoothLink
                href={startHref}
                onClick={() => setMobileOpen(false)}
                className="official-button flex h-12 w-full items-center justify-center rounded-lg bg-emerald-300 text-sm font-bold text-[#060e0c] hover:bg-amber-200"
              >
                Start calculator
              </SmoothLink>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
