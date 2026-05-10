"use client";

import { useMemo, useState } from "react";
import { defaultCalculatorInputs } from "@/data/neighborhoods";
import useHUDRents from "@/hooks/useHUDRents";
import {
  buildAffordabilityModel,
  estimateNeighborhoodRent,
} from "@/lib/affordabilityMath";
import AffordabilityCharts from "./AffordabilityCharts";
import AffordabilityResults from "./AffordabilityResults";
import CalculatorForm from "./CalculatorForm";
import DataLastUpdatedBadge from "./DataLastUpdatedBadge";
import HUDRentDisclaimer from "./HUDRentDisclaimer";
import MethodologySection from "./MethodologySection";
import NeighborhoodCards from "./NeighborhoodCards";
import ScenarioComparison from "./ScenarioComparison";

const hudBedroomLabels = ["0BR", "1BR", "2BR", "3BR", "4BR"];

export default function AffordabilityCalculator() {
  const [inputs, setInputs] = useState(defaultCalculatorInputs);
  const model = useMemo(() => buildAffordabilityModel(inputs), [inputs]);
  const hudRents = useHUDRents();

  function handleChange(name, value) {
    setInputs((current) => ({ ...current, [name]: value }));
  }

  function handleUseEstimate() {
    setInputs((current) => ({
      ...current,
      housingCost: estimateNeighborhoodRent(current.neighborhoodName, current.roommates),
    }));
  }

  return (
    <div className="bg-[#081210] text-slate-100">
      <section className="motion-section mx-auto w-full max-w-7xl px-5 pb-10 pt-28 sm:px-8">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
            Housing affordability calculator
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            Model the full monthly cost before choosing a neighborhood.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Compare rent, commute costs, debt, utilities, and savings pressure in
            one civic-tech tool built for realistic housing tradeoffs.
          </p>
          <div className="mt-6">
            <DataLastUpdatedBadge
              isFallback={hudRents.isFallback}
              lastChecked={hudRents.lastChecked}
              lastUpdated={hudRents.lastUpdated}
              loading={hudRents.loading}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-20 sm:px-8">
        <section
          className="motion-section motion-delay-1 grid scroll-mt-24 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]"
          id="calculator-form"
        >
          <CalculatorForm
            inputs={inputs}
            onChange={handleChange}
            onUseEstimate={handleUseEstimate}
            selectedRentEstimate={model.selectedRentEstimate}
          />
          <AffordabilityResults selected={model.selected} />
        </section>

        <section className="motion-section motion-delay-2 grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
          <article className="official-card rounded-lg p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                  HUD Fair Market Rent
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                  San Diego County baseline rents
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  These are county-level HUD FMR estimates mapped to the selected
                  neighborhoods as a baseline, not neighborhood listing prices.
                </p>
              </div>
              <DataLastUpdatedBadge
                isFallback={hudRents.isFallback}
                lastChecked={hudRents.lastChecked}
                lastUpdated={hudRents.lastUpdated}
                loading={hudRents.loading}
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              {hudBedroomLabels.map((label) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                  key={label}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {label}
                  </span>
                  <strong className="mt-2 block text-xl font-black text-slate-50">
                    {hudRents.loading
                      ? "..."
                      : hudRents.rentData?.bedrooms?.[label]
                      ? `$${hudRents.rentData.bedrooms[label].toLocaleString()}`
                      : "N/A"}
                  </strong>
                </div>
              ))}
            </div>

            {hudRents.error ? (
              <p className="mt-4 text-sm font-semibold text-amber-100">
                {hudRents.error}
              </p>
            ) : null}
          </article>

          <HUDRentDisclaimer isFallback={hudRents.isFallback} />
        </section>

        <div className="motion-section motion-delay-2">
          <AffordabilityCharts model={model} />
        </div>
        <div className="motion-section motion-delay-2">
          <NeighborhoodCards
            bestNeighborhoods={model.bestNeighborhoods}
            riskyNeighborhoods={model.riskyNeighborhoods}
          />
        </div>
        <div className="motion-section motion-delay-3">
          <ScenarioComparison scenarios={model.scenarios} />
        </div>
        <div className="motion-section motion-delay-3">
          <MethodologySection compact />
        </div>
      </main>
    </div>
  );
}
