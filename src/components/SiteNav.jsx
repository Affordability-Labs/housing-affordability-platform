"use client";

import { usePathname } from "next/navigation";
import SmoothLink from "./SmoothLink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/methodology", label: "Methodology" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const startHref = pathname === "/calculator" ? "#calculator-form" : "/calculator#calculator-form";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgba(8,18,16,0.84)] shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <SmoothLink href="/" className="official-button flex min-w-0 items-center gap-3 rounded-md">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-to-br from-emerald-200 to-amber-200 text-sm font-black text-[#081210] shadow-[0_0_28px_rgba(110,231,183,0.22)]">
            AL
          </span>
          <span className="truncate text-sm font-semibold tracking-wide text-slate-100 sm:text-base">
            Affordability Labs
          </span>
        </SmoothLink>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex"
        >
          {navLinks.map((link) => (
            <SmoothLink
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-1 transition ${
                pathname === link.href
                  ? "bg-white/[0.07] text-emerald-100"
                  : "hover:bg-white/[0.05] hover:text-amber-200"
              }`}
            >
              {link.label}
            </SmoothLink>
          ))}
        </nav>

        <SmoothLink
          href={startHref}
          className="official-button inline-flex h-10 items-center justify-center rounded-md bg-slate-100 px-4 text-sm font-bold text-[#081210] shadow-[0_0_26px_rgba(226,232,240,0.12)] hover:bg-amber-200"
        >
          Start
        </SmoothLink>
      </div>
    </header>
  );
}
