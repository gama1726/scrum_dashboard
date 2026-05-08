"use client";

import { Bell, MoonStar, Search, SunMedium } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export function Topbar({ title }: { title: string }) {
  const { theme, toggleTheme } = useUiStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm md:flex dark:border-slate-700 dark:bg-slate-900">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              placeholder="Search tasks, people, updates"
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400 focus-visible:ring-0"
            />
          </div>
          <button
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
