"use client";

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
            <button onClick={toggleTheme} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">Theme: {theme}</button>
            <select value={density} onChange={(event) => setDensity(event.target.value as "comfortable" | "compact")} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold">Notifications</h3>
          <p className="mt-2 text-sm text-slate-500">Daily digest, blocker alerts, sprint deadline reminders.</p>
        </section>
      </div>
    </AppShell>
  );
}
