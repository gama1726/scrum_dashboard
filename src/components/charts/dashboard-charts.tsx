"use client";

import dynamic from "next/dynamic";

const BurndownChart = dynamic(() => import("@/components/charts/burndown-chart").then((mod) => mod.BurndownChart), { ssr: false });
const VelocityChart = dynamic(() => import("@/components/charts/velocity-chart").then((mod) => mod.VelocityChart), { ssr: false });
const TeamWorkloadChart = dynamic(
  () => import("@/components/charts/team-workload-chart").then((mod) => mod.TeamWorkloadChart),
  { ssr: false },
);

export function DashboardBurndownChart({ data }: { data: Array<{ day: string; remainingPoints: number }> }) {
  return <BurndownChart data={data} />;
}

export function DashboardMetricsCharts({
  velocity,
  workload,
}: {
  velocity: Array<{ sprint: string; committed: number; completed: number }>;
  workload: Array<{ name: string; workload: number }>;
}) {
  return (
    <>
      <VelocityChart data={velocity} />
      <TeamWorkloadChart data={workload} />
    </>
  );
}
