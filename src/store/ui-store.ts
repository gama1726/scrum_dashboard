"use client";

import { create } from "zustand";

interface UiState {
  theme: "light" | "dark";
  density: "comfortable" | "compact";
  toggleTheme: () => void;
  setDensity: (density: "comfortable" | "compact") => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: "light",
  density: "comfortable",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setDensity: (density) => set({ density }),
}));
