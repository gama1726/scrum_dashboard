"use client";

import dynamic from "next/dynamic";

const BurndownChart = dynamic(() => import("@/components/charts/burndown-chart").then((mod) => mod.BurndownChart), { ssr: false });
const VelocityChart = dynamic(() => import("@/components/charts/velocity-chart").then((mod) => mod.VelocityChart), { ssr: false });

export function SprintCharts({
  burndown,
  velocity,
}: {
  burndown: Array<{ day: string; remainingPoints: number }>;
  velocity: Array<{ sprint: string; committed: number; completed: number }>;
}) {
  return (
    <div className="mt-4 grid gap-4 xl:grid-cols-2">
      <BurndownChart data={burndown} />
      <VelocityChart data={velocity} />
    </div>
  );
}
