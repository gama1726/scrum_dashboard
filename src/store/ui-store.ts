"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DensityMode = "comfortable" | "compact";
type WidgetSize = "s" | "m" | "l";
type StartPage = "/dashboard" | "/widget";

interface UiState {
  theme: "light" | "dark";
  density: DensityMode;
  widgetSize: WidgetSize;
  startPage: StartPage;
  toggleTheme: () => void;
  setDensity: (density: DensityMode) => void;
  setWidgetSize: (size: WidgetSize) => void;
  setStartPage: (path: StartPage) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      density: "comfortable",
      widgetSize: "m",
      startPage: "/dashboard",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setDensity: (density) => set({ density }),
      setWidgetSize: (widgetSize) => set({ widgetSize }),
      setStartPage: (startPage) => set({ startPage }),
    }),
    {
      name: "scrum-dashboard-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        density: state.density,
        widgetSize: state.widgetSize,
        startPage: state.startPage,
      }),
    },
  ),
);
