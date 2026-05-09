"use client";

import { useEffect, useState } from "react";

export default function useHUDRents() {
  const [state, setState] = useState({
    rentData: null,
    loading: true,
    error: null,
    lastUpdated: null,
    isFallback: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadHUDRents() {
      try {
        const response = await fetch("/api/hud-rents", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HUD route returned ${response.status}`);
        }

        const payload = await response.json();
        setState({
          rentData: payload.rentData || null,
          loading: false,
          error: payload.error || null,
          lastUpdated: payload.lastUpdated || null,
          isFallback: Boolean(payload.isFallback),
        });
      } catch (error) {
        if (error.name === "AbortError") return;

        setState({
          rentData: null,
          loading: false,
          error: "HUD rent data could not be loaded.",
          lastUpdated: null,
          isFallback: true,
        });
      }
    }

    loadHUDRents();

    return () => controller.abort();
  }, []);

  return state;
}
