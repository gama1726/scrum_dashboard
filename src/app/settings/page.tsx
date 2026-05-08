"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { useUiStore } from "@/store/ui-store";

export default function SettingsPage() {
  const { theme, toggleTheme, density, setDensity } = useUiStore();

  return (
    <AppShell title="Settings">
      <div className="space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold">Display</h3>
          <div className="mt-3 flex gap-3">
            <button onClick={toggleTheme} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
              Theme: {theme}
            </button>
            <select
              value={density}
              onChange={(event) => setDensity(event.target.value as "comfortable" | "compact")}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold">Desktop Widget Mode</h3>
          <p className="mt-2 text-sm text-slate-500">
            Open a compact Rainmeter-style view optimized for pinning as a standalone app window on Windows.
          </p>
          <Link
            href="/widget"
            className="mt-3 inline-flex rounded-xl bg-slate-900 px-3 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Open Widget Mode
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
