# Affordability Labs

A dark, glassy, civic-tech housing affordability platform for modeling the full monthly cost of living in San Diego-area neighborhoods. Built with Next.js 16, React 19, and Tailwind CSS 4.

## Mission

Housing affordability is more than the rent number. A household can look affordable on paper while still becoming financially unstable after commute costs, utilities, debt payments, savings goals, and neighborhood-specific tradeoffs are included.

Affordability Labs makes those five dimensions visible together — before a housing decision is made. The platform is built as a civic-tech, public-interest planning tool: transparent about its assumptions, clear about its limitations, and designed to surface real tradeoffs.

## Features

- **Affordability Calculator** — Enter monthly income, housing cost, utilities, transportation, debt, savings goals, neighborhood, work location, commute preference, roommates, household size, and financial priority. The model returns a risk score (0–100), risk band (Stable / Stretched / High Risk), warnings, leftover estimate, and plain-English interpretation.
- **Neighborhood Explorer** — 42 San Diego-area neighborhoods with rent estimates, category, transportation profile, and affordability tags, sorted by rent.
- **Commute Cost Analysis** — Three concrete scenarios holding income constant and varying only the neighborhood rent and modeled commute time — showing how a longer commute can erase rent savings.
- **Scenario Comparison** — Four pre-built side-by-side scenarios across income brackets and neighborhood types, using the same underlying affordability model.
- **Methodology** — Full documentation of the scoring model, data sources, risk bands, commute pressure formula, and verification requirements.
- **About** — Mission statement, platform principles, who the tool is designed for, and honest limitation disclosures.
- **HUD Fair Market Rent integration** — Live San Diego County HUD FMR data via the HUD User API, with automatic fallback to bundled FY 2024 values when the API is unavailable.
- **Responsive, polished dark glass visual system** — Parallax-style hero sections, glassmorphism cards, animated orbs, smooth hover states, and sticky glass navbar.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Fonts | Geist Sans + Geist Mono |
| Data | HUD Fair Market Rent API + static neighborhood assumptions |
| Lint | ESLint 9 with Next.js config |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your HUD API token:

```env
HUD_API_TOKEN=your_hud_api_token_here
```

The app runs without a token. When no token is present, `/api/hud-rents` returns bundled FY 2024 HUD FMR fallback values and the calculator's data badge shows "Fallback data".

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page — hero, mission, cost dimensions, feature section, CTA |
| `/calculator` | Main affordability calculator with neighborhood comparison and charts |
| `/neighborhoods` | Explorer for all 42 modeled San Diego neighborhoods |
| `/commute` | Commute cost analysis — three side-by-side scenarios |
| `/scenarios` | Pre-built scenario comparison across four income brackets |
| `/methodology` | Model documentation — inputs, scoring, risk bands, data sources |
| `/about` | Mission, platform principles, who it is for, and limitations |
| `/api/hud-rents` | Server route — fetches HUD FMR data or returns fallback values |

## Calculator Methodology

The calculator converts monthly household inputs into a planning-oriented affordability model.

### Scoring

Every scenario starts at 100. Points are deducted when the model detects pressure:

| Factor | Max penalty |
|---|---|
| Housing cost / income ratio (28% → 55%) | 32 pts |
| Commute-adjusted cost ratio (42% → 70%) | 20 pts |
| Essential cost ratio (65% → 100%) | 22 pts |
| Savings goal coverage (negative leftover) | 22 pts |
| Commute overage (above preferred threshold) | 8 pts |
| Positive cushion bonus (>8–15% leftover) | +3 to +6 pts |

### Risk bands

| Band | Score | Meaning |
|---|---|---|
| Stable | 74–100 | Manageable burden with meaningful leftover |
| Stretched | 50–73 | Budget works but margin is thin |
| High Risk | 0–49 | Insufficient room for savings and unexpected costs |

### Commute pressure

When the modeled commute exceeds the user's preferred commute, the model adds a planning-proxy pressure amount:

```
pressure_dollars = (commute_minutes − preferred_minutes) × $8
```

This is not a literal transportation bill. It is an indicator that the model uses to reflect hidden time cost.

## HUD Data and Limitations

- **HUD Fair Market Rent** is a county-level HUD estimate used as a reference baseline, not a neighborhood-specific listing price.
- **Neighborhood rent estimates** in `src/data/neighborhoods.js` are static prototype assumptions. They should be refreshed against current market data before formal research use.
- **Commute estimates** are spatial planning proxies, not live traffic or transit data.
- The model does not account for taxes, insurance, childcare, medical costs, parking fees, move-in costs, inflation, credit requirements, or irregular income.

This tool is an educational planning estimate, not financial advice. Users should verify current listings, lease terms, and all personal obligations before making housing decisions.

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production build
npm run lint     # Run ESLint
```

## File Structure

```
src/
  app/
    page.js                     # Landing page
    layout.js                   # Root layout with footer
    globals.css                 # Global styles and design system
    calculator/page.js          # Calculator route
    neighborhoods/page.js       # Neighborhood explorer
    commute/page.js             # Commute analysis
    scenarios/page.js           # Scenario comparison
    methodology/page.js         # Model documentation
    about/page.js               # Mission and about
    api/hud-rents/route.js      # HUD API server route
  components/
    AffordabilityCalculator.jsx # Top-level calculator orchestrator
    CalculatorForm.jsx          # All calculator input fields
    AffordabilityResults.jsx    # Sticky result panel
    AffordabilityCharts.jsx     # Expense and risk charts
    NeighborhoodCards.jsx       # Best-fit and watch-list cards
    ScenarioComparison.jsx      # Side-by-side scenario table
    MethodologySection.jsx      # Methodology card section
    SiteNav.jsx                 # Sticky glass navbar with mobile menu
    Footer.jsx                  # Site footer
    DataLastUpdatedBadge.jsx    # HUD data freshness badge
    HUDRentDisclaimer.jsx       # HUD data disclaimer panel
    SmoothLink.jsx              # Next.js Link wrapper
    ThemedSelect.jsx            # Custom dark dropdown
  data/
    neighborhoods.js            # 42 neighborhoods, work centers, defaults
  lib/
    affordabilityMath.js        # Core model: scoring, risk, commute logic
    hudRents.js                 # HUD API fetch with fallback chain
  hooks/
    useHUDRents.js              # Client hook for HUD rent state
```

## Future Improvements

- Refresh neighborhood rent estimates from current listing data with provenance and last-updated metadata
- Add saved scenarios and shareable comparison links
- Add neighborhood-level HUD sub-area data where available
- Improve chart interactivity and export options
- Add automated tests for affordability scoring and HUD fallback behavior
- Expand inputs for insurance, childcare, parking, and one-time move-in costs
- Build a neighborhood detail page with full data breakdown
- Add filterability to the neighborhood explorer

## Deployment

Deploy to Vercel or any Next.js-compatible host. Set `HUD_API_TOKEN` as a protected environment variable in the hosting provider's settings. Do not commit `.env.local`.

```bash
npm run build   # Verify the build passes before deployment
```
