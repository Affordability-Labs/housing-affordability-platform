# Affordability Labs

A Next.js housing affordability platform for modeling the full monthly cost of living in San Diego-area neighborhoods.

Affordability Labs helps users compare rent or mortgage costs, transportation pressure, utilities, debt, savings goals, commute tradeoffs, and neighborhood fit in one transparent planning tool. The project is designed as a civic-tech portfolio application: polished enough for public review, but clear about its assumptions and limitations.

## Mission

Housing affordability is more than the rent number. A household can look affordable on paper while still becoming financially unstable after commute costs, utilities, debt payments, savings goals, and neighborhood-specific tradeoffs are included.

This platform makes those tradeoffs easier to see by turning common monthly budget inputs into a practical affordability score, risk band, and neighborhood comparison.

## Features

- Interactive affordability calculator for monthly income, housing cost, utilities, transportation, debt, savings, household size, roommates, work location, commute preference, and financial priority.
- Neighborhood fit rankings for San Diego-area communities using modeled rent, commute, and priority assumptions.
- Risk classification with stable, stretched, and high-risk bands.
- Expense breakdown and scenario comparison views.
- HUD Fair Market Rent baseline panel for San Diego County rents.
- Automatic fallback to bundled FY 2024 HUD values when the HUD API token is missing or live data is unavailable.
- Methodology page explaining the model, assumptions, and verification needs.
- Responsive, portfolio-ready Next.js interface.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Tailwind CSS 4
- ESLint 9 with Next.js config
- HUD Fair Market Rent API integration through a Next.js API route
- Local static neighborhood assumptions in `src/data/neighborhoods.js`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```powershell
   Copy-Item .env.local.example .env.local
   ```

3. Add your HUD API token to `.env.local`:

   ```env
   HUD_API_TOKEN=your_hud_api_token_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app:

   ```text
   http://localhost:3000
   ```

## HUD_API_TOKEN

The project uses `HUD_API_TOKEN` on the server side to request HUD Fair Market Rent data from the HUD User API. It also supports `NEXT_PUBLIC_HUD_API_TOKEN` for compatibility, but `HUD_API_TOKEN` is preferred so the token stays server-only.

Add the token to `.env.local`:

```env
HUD_API_TOKEN=your_hud_api_token_here
```

Important notes:

- Do not commit `.env.local`.
- Keep the token out of client-side code.
- The app still runs without a token, but `/api/hud-rents` returns fallback FY 2024 San Diego County values.
- In deployment, set `HUD_API_TOKEN` as a protected environment variable in the hosting provider.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with mission, feature overview, and links into the calculator and methodology. |
| `/calculator` | Main affordability calculator and neighborhood comparison experience. |
| `/methodology` | Explanation of model inputs, scoring logic, data assumptions, and limitations. |
| `/api/hud-rents` | Server route that fetches HUD Fair Market Rent data or returns fallback values. |

## Methodology

The calculator converts monthly household inputs into a planning-oriented affordability model.

Core inputs include:

- Monthly take-home income
- Rent or mortgage payment
- Utilities
- Transportation or commute cost
- Debt payments
- Monthly savings goal
- Neighborhood
- Work or school location
- Preferred commute
- Roommate count
- Household size
- Main financial priority

The model evaluates:

- Housing cost as a share of income
- Essential monthly costs as a share of income
- Housing plus transportation pressure
- Remaining monthly cash before and after savings
- Commute time pressure when modeled commute exceeds the preferred commute
- Neighborhood fit based on affordability, commute, market category, and user priority

The output includes a score from 0 to 100, a risk label, warnings, best-fit neighborhoods, risky neighborhoods, scenario comparisons, and expense charts.

HUD Fair Market Rent data is used as a San Diego County baseline. It is not treated as live neighborhood-level listing data.

## Limitations

- This tool is an educational planning estimate, not financial advice, lending guidance, or a substitute for a full household budget review.
- Neighborhood rents in `src/data/neighborhoods.js` are prototype assumptions and should be refreshed before formal use.
- HUD Fair Market Rent values are county-level baselines, not neighborhood-specific current listings.
- Commute estimates are directional planning proxies, not live traffic or transit calculations.
- The model does not currently account for taxes, insurance, childcare, medical costs, lease fees, parking, inflation, credit requirements, or irregular income.
- Users should verify current listings, lease terms, utilities, insurance, taxes, and personal obligations before making housing decisions.

## Roadmap

- Add a current rent-data refresh workflow with source documentation.
- Add neighborhood-level data provenance and last-updated metadata.
- Expand affordability inputs for insurance, childcare, parking, and one-time move-in costs.
- Add saved scenarios and shareable comparison links.
- Improve chart interactivity and export options.
- Add automated tests for affordability scoring and HUD fallback behavior.
- Prepare deployment documentation with environment-variable and privacy guidance.

## GitHub Workflow

Use a simple branch-and-review workflow:

1. Create a feature branch:

   ```bash
   git checkout -b feature/readme-or-app-update
   ```

2. Make a focused change and avoid committing local secrets or generated build folders.

3. Check the working tree:

   ```bash
   git status --short
   ```

4. Run quality checks:

   ```bash
   npm run lint
   npm run build
   ```

5. Commit only intentional files:

   ```bash
   git add README.md
   git commit -m "Improve project README"
   ```

6. Push the branch and open a pull request:

   ```bash
   git push origin feature/readme-or-app-update
   ```

In pull requests, include the purpose of the change, screenshots for UI updates, any setup or environment changes, and the commands used to verify the work.
