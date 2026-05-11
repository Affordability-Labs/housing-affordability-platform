import SmoothLink from "./SmoothLink";

const footerSections = [
  {
    heading: "Platform",
    links: [
      { href: "/calculator", label: "Affordability Calculator" },
      { href: "/neighborhoods", label: "Neighborhood Explorer" },
      { href: "/commute", label: "Commute Cost Analysis" },
      { href: "/scenarios", label: "Scenario Comparison" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/methodology", label: "Methodology" },
      { href: "/about", label: "About the Project" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#060e0c]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_0%,rgba(16,185,129,0.07),transparent_40%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto]">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-to-br from-emerald-200 to-amber-200 text-sm font-black text-[#060e0c]">
                AL
              </span>
              <span className="text-sm font-semibold tracking-wide text-slate-100">
                Affordability Labs
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              A civic-tech platform for modeling the real monthly cost of housing — rent, commute, utilities, debt, and savings pressure in one transparent tool.
            </p>
            <p className="mt-4 text-xs text-slate-600">
              Educational estimates only. Not financial advice.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                {section.heading}
              </h3>
              <ul className="mt-4 grid gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <SmoothLink
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-emerald-200"
                    >
                      {link.label}
                    </SmoothLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Affordability Labs. Civic-tech housing research platform.
          </p>
          <p className="text-xs text-slate-600">
            Data: HUD Fair Market Rent FY 2024 &middot; Static neighborhood assumptions &middot; San Diego County
          </p>
        </div>
      </div>
    </footer>
  );
}
