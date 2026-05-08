"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#f87171"];

export function TeamWorkloadChart({ data }: { data: Array<{ name: string; workload: number }> }) {
  return (
    <div className="h-64 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">Team Workload</p>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="workload" nameKey="name" innerRadius={52} outerRadius={84} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
