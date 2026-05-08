import { AppShell } from "@/components/layout/app-shell";
import { ActivityFeed, BlockersList } from "@/components/dashboard/panels";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { KpiCard } from "@/components/shared/kpi-card";
import { apiClient } from "@/lib/api-client";
import { DashboardBurndownChart, DashboardMetricsCharts } from "@/components/charts/dashboard-charts";

export default async function DashboardPage() {
  const data = await apiClient.getDashboardData();
  const workloadData = data.teamMembers.map((member) => ({
    name: member.fullName.split(" ")[0],
    workload: data.tasks
      .filter((task) => task.assigneeId === member.id)
      .reduce((sum, task) => sum + task.storyPoints, 0),
  }));

  return (
    <AppShell title="Dashboard">
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-sm text-slate-500">Good morning, {data.currentUser.fullName.split(" ")[0]}</p>
        <h1 className="mt-1 text-2xl font-semibold">{data.sprint.name} overview</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Goal: {data.sprint.goal}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Tasks" value={data.dashboardSummary.totalTasks} trend="Across current sprint" />
        <KpiCard label="Completed" value={data.dashboardSummary.completedTasks} trend="+4 this week" tone="good" />
        <KpiCard label="In Progress" value={data.dashboardSummary.inProgressTasks} trend="Stable flow" />
        <KpiCard label="Blocked" value={data.dashboardSummary.blockedTasks} trend="Needs immediate attention" tone="warn" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2"><DashboardBurndownChart data={data.metrics.burndown} /></div>
        <QuickActions />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <DashboardMetricsCharts velocity={data.metrics.velocity} workload={workloadData} />
        <BlockersList blockers={data.blockers} members={data.teamMembers} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ActivityFeed activities={data.activities} members={data.teamMembers} />
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-sm font-semibold">Today&apos;s Priorities</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {data.dashboardSummary.todayPriorities.map((priority) => (
              <li key={priority} className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">{priority}</li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
