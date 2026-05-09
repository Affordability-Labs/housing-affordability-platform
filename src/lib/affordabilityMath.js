import { neighborhoods, roommateFactors, workCenters } from "@/data/neighborhoods";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  style: "percent",
});

export function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatPercent(value) {
  return percentFormatter.format(Number.isFinite(value) ? value : 0);
}

export function toNumber(value) {
  const parsed = Number.parseFloat(String(value ?? "").replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function getNeighborhood(name) {
  return neighborhoods.find((item) => item.name === name) || neighborhoods[0];
}

export function getRoommateFactor(roommates) {
  return roommateFactors[String(roommates)] ?? roommateFactors[0];
}

export function estimateNeighborhoodRent(neighborhoodName, roommates) {
  const neighborhood = getNeighborhood(neighborhoodName);
  return Math.round(neighborhood.rent * getRoommateFactor(roommates));
}

export function calculateCommute(neighborhood, workLocation) {
  if (!workLocation || workLocation === "remote") return null;

  const center = workCenters[workLocation] || workCenters.remote;
  if (center === workCenters.remote) return null;

  const distance = Math.hypot(neighborhood.x - center.x, neighborhood.y - center.y);
  const coastalFriction = neighborhood.tags.includes("coastal") ? 4 : 0;
  const northSouthFriction = Math.abs(neighborhood.y - center.y) > 38 ? 5 : 0;
  const estimate =
    8 + distance * 1.15 + center.friction + coastalFriction + northSouthFriction;

  return Math.max(8, Math.min(85, Math.round(estimate / 5) * 5));
}

function scaledPenalty(value, start, end, points) {
  if (value <= start) return 0;
  if (end === start) return points;
  return clamp((value - start) / (end - start), 0, 1) * points;
}

function estimateCommutePressureDollars(commuteMinutes, preferredCommute) {
  if (commuteMinutes === null) return 0;

  // This is a planning proxy, not a literal bill. It adds pressure when a
  // modeled commute exceeds the user's preferred commute threshold.
  const minutesOverPreference = Math.max(0, commuteMinutes - preferredCommute);
  return Math.round(minutesOverPreference * 8);
}

function priorityBonus(neighborhood, priority, housingRatio, commuteMinutes, preferredCommute) {
  const tags = neighborhood.tags;
  const commuteOverage =
    commuteMinutes === null ? 0 : Math.max(0, commuteMinutes - preferredCommute);
  let bonus = 0;

  if (priority === "save") {
    bonus += tags.includes("save") ? 8 : tags.includes("balanced") ? 4 : 0;
    bonus += housingRatio <= 0.28 ? 4 : housingRatio > 0.38 ? -4 : 0;
  }

  if (priority === "balanced") {
    bonus += tags.includes("balanced") ? 6 : 2;
    bonus -= commuteOverage > 20 ? 3 : 0;
    bonus -= housingRatio > 0.36 ? 3 : 0;
  }

  if (priority === "convenience") {
    bonus += tags.includes("convenience") || tags.includes("urban") ? 7 : 1;
    bonus -= commuteOverage > 10 ? 4 : 0;
  }

  if (priority === "lifestyle") {
    bonus += tags.includes("lifestyle") || tags.includes("coastal") ? 7 : 1;
    bonus -= housingRatio > 0.4 ? 4 : 0;
  }

  return bonus;
}

function marketFlexBonus(neighborhood) {
  if (neighborhood.category.includes("Affordable")) return 4;
  if (neighborhood.category.includes("Student")) return 3;
  if (neighborhood.category.includes("Luxury")) return -4;
  if (neighborhood.category.includes("Premium")) return -2;
  return 1;
}

function classifyRisk(score) {
  if (score >= 74) {
    return {
      label: "Stable",
      tone: "text-emerald-200 bg-emerald-500/[0.12] border-emerald-400/30",
      meter: "bg-emerald-400",
    };
  }

  if (score >= 50) {
    return {
      label: "Stretched",
      tone: "text-amber-100 bg-amber-400/[0.12] border-amber-300/30",
      meter: "bg-amber-300",
    };
  }

  return {
    label: "High Risk",
    tone: "text-rose-100 bg-rose-400/[0.12] border-rose-300/30",
    meter: "bg-rose-300",
  };
}

function normalizeInputs(rawInputs) {
  const monthlyIncome = toNumber(rawInputs.monthlyIncome);
  const preferredCommute = toNumber(rawInputs.preferredCommute) || 30;

  return {
    monthlyIncome,
    housingCost: toNumber(rawInputs.housingCost),
    utilities: toNumber(rawInputs.utilities),
    transportationCost: toNumber(rawInputs.transportationCost),
    debtPayments: toNumber(rawInputs.debtPayments),
    savingsGoal: toNumber(rawInputs.savingsGoal),
    neighborhoodName: rawInputs.neighborhoodName || neighborhoods[0].name,
    workLocation: rawInputs.workLocation || "remote",
    preferredCommute,
    roommates: String(rawInputs.roommates ?? "0"),
    householdSize: Math.max(1, Math.round(toNumber(rawInputs.householdSize) || 1)),
    priority: rawInputs.priority || "balanced",
    notes: rawInputs.notes || "",
  };
}

function buildWarnings(metrics) {
  const warnings = [];

  if (metrics.monthlyIncome <= 0) {
    warnings.push("Add monthly income to calculate affordability.");
    return warnings;
  }

  if (metrics.housingRatio > 0.3) {
    warnings.push("Housing is above 30% of monthly income.");
  }

  if (metrics.commuteAdjustedRatio > 0.45) {
    warnings.push("Housing plus transportation pressure is above 45% of income.");
  }

  if (metrics.essentialRatio > 0.7) {
    warnings.push("Essential costs use more than 70% of monthly income.");
  }

  if (metrics.leftoverAfterSavings < 0) {
    warnings.push("The savings goal is not covered by the modeled monthly budget.");
  }

  if (
    metrics.commuteMinutes !== null &&
    metrics.commuteMinutes > metrics.preferredCommute
  ) {
    warnings.push("The modeled commute is longer than the preferred commute.");
  }

  return warnings;
}

function buildExplanation(metrics) {
  if (metrics.monthlyIncome <= 0) {
    return "Enter monthly income to see affordability pressure, leftover money, and risk.";
  }

  if (metrics.risk.label === "Stable") {
    return `${metrics.neighborhood.name} looks stable under these assumptions. The scenario preserves ${formatCurrency(
      metrics.leftoverAfterSavings
    )} after essential costs and the savings goal.`;
  }

  if (metrics.risk.label === "Stretched") {
    return `${metrics.neighborhood.name} may work, but the margin is thin. Review commute, debt, and savings pressure before treating this as comfortable.`;
  }

  return `${metrics.neighborhood.name} is high risk with these inputs. Housing, transportation, or fixed costs leave limited room for savings and unexpected expenses.`;
}

function calculateScenarioScore(metrics) {
  if (metrics.monthlyIncome <= 0) return 0;

  let score = 100;
  score -= scaledPenalty(metrics.housingRatio, 0.28, 0.55, 32);
  score -= scaledPenalty(metrics.commuteAdjustedRatio, 0.42, 0.7, 20);
  score -= scaledPenalty(metrics.essentialRatio, 0.65, 1, 22);

  if (metrics.leftoverAfterSavings < 0) {
    score -= scaledPenalty(
      Math.abs(metrics.leftoverAfterSavings),
      0,
      metrics.monthlyIncome * 0.25,
      22
    );
  }

  if (
    metrics.commuteMinutes !== null &&
    metrics.commuteMinutes > metrics.preferredCommute
  ) {
    score -= scaledPenalty(
      metrics.commuteMinutes - metrics.preferredCommute,
      0,
      45,
      8
    );
  }

  if (metrics.leftoverAfterSavings > metrics.monthlyIncome * 0.15) score += 6;
  else if (metrics.leftoverAfterSavings > metrics.monthlyIncome * 0.08) score += 3;

  return Math.round(clamp(score, 0, 100));
}

function calculateScenarioMetrics(inputs, neighborhood, housingCostOverride) {
  const commuteMinutes = calculateCommute(neighborhood, inputs.workLocation);
  const commutePressureDollars = estimateCommutePressureDollars(
    commuteMinutes,
    inputs.preferredCommute
  );
  const housingCost = Math.round(housingCostOverride);

  // Essential monthly cost keeps savings separate so the user can see whether
  // their stated savings goal still fits after required bills.
  const totalEssentialCost =
    housingCost + inputs.utilities + inputs.transportationCost + inputs.debtPayments;
  const commuteAdjustedEssentialCost = totalEssentialCost + commutePressureDollars;
  const leftoverBeforeSavings = inputs.monthlyIncome - totalEssentialCost;
  const leftoverAfterSavings = leftoverBeforeSavings - inputs.savingsGoal;
  const housingRatio =
    inputs.monthlyIncome > 0 ? housingCost / inputs.monthlyIncome : 0;
  const essentialRatio =
    inputs.monthlyIncome > 0 ? totalEssentialCost / inputs.monthlyIncome : 0;
  const commuteAdjustedRatio =
    inputs.monthlyIncome > 0
      ? (housingCost + inputs.transportationCost + commutePressureDollars) /
        inputs.monthlyIncome
      : 0;
  const savingsPressureRatio =
    inputs.monthlyIncome > 0 ? inputs.savingsGoal / inputs.monthlyIncome : 0;

  const baseMetrics = {
    ...inputs,
    neighborhood,
    housingCost,
    commuteMinutes,
    commutePressureDollars,
    totalEssentialCost,
    commuteAdjustedEssentialCost,
    leftoverBeforeSavings,
    leftoverAfterSavings,
    housingRatio,
    essentialRatio,
    commuteAdjustedRatio,
    savingsPressureRatio,
  };
  const score = calculateScenarioScore(baseMetrics);
  const risk = classifyRisk(score);

  return {
    ...baseMetrics,
    score,
    risk,
    warnings: buildWarnings({ ...baseMetrics, score, risk }),
    explanation: buildExplanation({ ...baseMetrics, score, risk }),
  };
}

export function buildAffordabilityModel(rawInputs) {
  const inputs = normalizeInputs(rawInputs);
  const selectedNeighborhood = getNeighborhood(inputs.neighborhoodName);
  const selected = calculateScenarioMetrics(
    inputs,
    selectedNeighborhood,
    inputs.housingCost
  );
  const rankedNeighborhoods = neighborhoods
    .map((neighborhood) => {
      const estimatedRent = estimateNeighborhoodRent(neighborhood.name, inputs.roommates);
      const metrics = calculateScenarioMetrics(inputs, neighborhood, estimatedRent);
      const fitScore = clamp(
        metrics.score +
          priorityBonus(
            neighborhood,
            inputs.priority,
            metrics.housingRatio,
            metrics.commuteMinutes,
            inputs.preferredCommute
          ) +
          marketFlexBonus(neighborhood),
        0,
        100
      );

      return {
        ...metrics,
        estimatedRent,
        fitScore: Math.round(fitScore),
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore || b.leftoverAfterSavings - a.leftoverAfterSavings);

  const riskyNeighborhoods = [...rankedNeighborhoods]
    .sort((a, b) => a.score - b.score || a.leftoverAfterSavings - b.leftoverAfterSavings)
    .slice(0, 4);

  const scenarioNames = Array.from(
    new Set([inputs.neighborhoodName, "Mira Mesa", "Downtown San Diego"])
  );
  const scenarios = scenarioNames.map((name) => {
    const neighborhood = getNeighborhood(name);
    return calculateScenarioMetrics(
      inputs,
      neighborhood,
      estimateNeighborhoodRent(name, inputs.roommates)
    );
  });

  const expenseBreakdown = [
    { label: "Housing", amount: selected.housingCost, color: "bg-emerald-300" },
    { label: "Utilities", amount: inputs.utilities, color: "bg-cyan-300" },
    { label: "Transportation", amount: inputs.transportationCost, color: "bg-amber-300" },
    { label: "Debt", amount: inputs.debtPayments, color: "bg-rose-300" },
    { label: "Savings goal", amount: inputs.savingsGoal, color: "bg-teal-200" },
  ].filter((item) => item.amount > 0);

  return {
    inputs,
    selected,
    rankedNeighborhoods,
    bestNeighborhoods: rankedNeighborhoods.slice(0, 5),
    riskyNeighborhoods,
    scenarios,
    expenseBreakdown,
    selectedRentEstimate: estimateNeighborhoodRent(
      inputs.neighborhoodName,
      inputs.roommates
    ),
  };
}
