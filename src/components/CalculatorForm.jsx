import { financialPriorities, neighborhoods, workCenters } from "@/data/neighborhoods";
import { formatCurrency } from "@/lib/affordabilityMath";
import ThemedSelect from "./ThemedSelect";

const inputClass =
  "min-h-11 w-full rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-50 outline-none transition duration-200 placeholder:text-slate-500 hover:border-emerald-300/30 hover:bg-white/[0.08] focus:border-emerald-300/70 focus:bg-white/[0.09] focus:ring-4 focus:ring-emerald-300/10";
const labelClass = "grid gap-2 text-sm font-medium text-slate-300";
const neighborhoodOptions = neighborhoods.map((neighborhood) => ({
  value: neighborhood.name,
  label: neighborhood.name,
}));
const workCenterOptions = Object.entries(workCenters).map(([value, center]) => ({
  value,
  label: center.label,
}));
const roommateOptions = [
  { value: "0", label: "No roommates" },
  { value: "1", label: "1 roommate" },
  { value: "2", label: "2+ roommates" },
];

function parseInputNumber(value) {
  const parsed = Number.parseFloat(String(value || "").replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function NumberField({
  label,
  name,
  value,
  onChange,
  prefix = "$",
  min = 0,
  step = 50,
}) {
  function nudge(direction) {
    const next = Math.max(min, parseInputNumber(value) + direction * step);
    onChange(name, String(next));
  }

  return (
    <label className={labelClass}>
      {label}
      <div className={`number-field-shell ${prefix ? "has-prefix" : ""}`}>
        {prefix ? (
          <span className="number-field-prefix">{prefix}</span>
        ) : null}
        <input
          autoComplete="off"
          className="number-field-input"
          inputMode="decimal"
          name={name}
          onChange={(event) => onChange(name, event.target.value)}
          type="text"
          value={value}
        />
        <div className="number-stepper" aria-hidden="false">
          <button
            aria-label={`Increase ${label}`}
            className="number-stepper-button"
            onClick={() => nudge(1)}
            type="button"
          >
            <span className="number-stepper-chevron is-up" />
          </button>
          <button
            aria-label={`Decrease ${label}`}
            className="number-stepper-button"
            onClick={() => nudge(-1)}
            type="button"
          >
            <span className="number-stepper-chevron is-down" />
          </button>
        </div>
      </div>
    </label>
  );
}

export default function CalculatorForm({
  inputs,
  onChange,
  onUseEstimate,
  selectedRentEstimate,
}) {
  return (
    <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
      <section className="official-card rounded-lg p-5">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
            Monthly budget
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-50">
            Enter the costs you expect to carry.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Monthly take-home income"
            name="monthlyIncome"
            onChange={onChange}
            step={100}
            value={inputs.monthlyIncome}
          />
          <NumberField
            label="Monthly rent or mortgage"
            name="housingCost"
            onChange={onChange}
            step={50}
            value={inputs.housingCost}
          />
          <NumberField
            label="Utilities"
            name="utilities"
            onChange={onChange}
            step={10}
            value={inputs.utilities}
          />
          <NumberField
            label="Transportation or commute cost"
            name="transportationCost"
            onChange={onChange}
            step={10}
            value={inputs.transportationCost}
          />
          <NumberField
            label="Debt payments"
            name="debtPayments"
            onChange={onChange}
            step={25}
            value={inputs.debtPayments}
          />
          <NumberField
            label="Monthly savings goal"
            name="savingsGoal"
            onChange={onChange}
            step={25}
            value={inputs.savingsGoal}
          />
        </div>
      </section>

      <section className="official-card rounded-lg p-5">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
            Place assumptions
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-50">
            Compare neighborhood tradeoffs.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ThemedSelect
            label="Neighborhood"
            name="neighborhoodName"
            onChange={onChange}
            options={neighborhoodOptions}
            value={inputs.neighborhoodName}
          />

          <ThemedSelect
            label="Work or school location"
            name="workLocation"
            onChange={onChange}
            options={workCenterOptions}
            value={inputs.workLocation}
          />

          <NumberField
            label="Preferred commute"
            name="preferredCommute"
            onChange={onChange}
            prefix=""
            step={5}
            value={inputs.preferredCommute}
          />

          <ThemedSelect
            label="Shared housing"
            name="roommates"
            onChange={onChange}
            options={roommateOptions}
            value={inputs.roommates}
          />

          <NumberField
            label="Household size"
            name="householdSize"
            onChange={onChange}
            prefix=""
            min={1}
            step={1}
            value={inputs.householdSize}
          />

          <ThemedSelect
            label="Main priority"
            name="priority"
            onChange={onChange}
            options={financialPriorities}
            value={inputs.priority}
          />
        </div>

        <div className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/[0.08] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300">
              Selected neighborhood estimate:{" "}
              <strong className="text-slate-50">
                {formatCurrency(selectedRentEstimate)}
              </strong>
            </p>
            <button
              className="official-button inline-flex h-10 items-center justify-center rounded-md border border-emerald-300/30 px-3 text-sm font-bold text-emerald-100 hover:bg-emerald-300/10"
              onClick={onUseEstimate}
              type="button"
            >
              Use estimate
            </button>
          </div>
        </div>

        <label className={`${labelClass} mt-4`}>
          Notes
          <textarea
            className={`${inputClass} min-h-24 resize-y py-3`}
            name="notes"
            onChange={(event) => onChange("notes", event.target.value)}
            placeholder="Optional context, such as pets, parking, childcare, or expected income changes."
            value={inputs.notes}
          />
        </label>
      </section>
    </form>
  );
}
