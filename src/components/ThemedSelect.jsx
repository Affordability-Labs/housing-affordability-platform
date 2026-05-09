"use client";

import { useEffect, useRef, useState } from "react";

export default function ThemedSelect({ label, name, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    function handlePointerDown(event) {
      if (!ref.current?.contains(event.target)) setOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function choose(option) {
    onChange(name, option.value);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative grid gap-2 text-sm font-medium text-slate-300">
      <span>{label}</span>
      <button
        aria-expanded={open}
        className={`themed-select-trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="truncate">{selected?.label}</span>
        <span className="themed-select-chevron" aria-hidden="true" />
      </button>

      {open ? (
        <div className="themed-select-menu" role="listbox">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                aria-selected={active}
                className={`themed-select-option ${active ? "is-active" : ""}`}
                key={option.value}
                onClick={() => choose(option)}
                role="option"
                type="button"
              >
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
