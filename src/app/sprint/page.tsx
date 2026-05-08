import { AppShell } from "@/components/layout/app-shell";
import { BurndownChart } from "@/components/charts/burndown-chart";
import { VelocityChart } from "@/components/charts/velocity-chart";
import { KpiCard } from "@/components/shared/kpi-card";
import { apiClient } from "@/lib/api-client";

export default async function SprintPage() {
  const { sprint, blockers, metrics, tasks } = await apiClient.getSprintData();
  return (
    <AppShell title="Sprint Details">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">{sprint.name}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{sprint.goal}</p>
      </section>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <KpiCard label="Completion" value={`${Math.round((sprint.completedPoints / sprint.committedPoints) * 100)}%`} />
        <KpiCard label="Committed" value={sprint.committedPoints} />
        <KpiCard label="Completed" value={sprint.completedPoints} tone="good" />
        <KpiCard label="Remaining" value={sprint.committedPoints - sprint.completedPoints} tone="warn" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <BurndownChart data={metrics.burndown} />
        <VelocityChart data={metrics.velocity} />
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-700 dark:bg-slate-900">
        <p><strong>Risks:</strong> {blockers.length} active blockers and {tasks.filter((task) => task.blocked).length} blocked tasks.</p>
        <p className="mt-2"><strong>Recommendation:</strong> Prioritize critical blocker resolution in next standup and reduce WIP for overloaded members.</p>
      </div>
    </AppShell>
  );
}
