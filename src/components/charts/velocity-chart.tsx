"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function VelocityChart({ data }: { data: Array<{ sprint: string; committed: number; completed: number }> }) {
  return (
    <div className="h-64 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">Velocity</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="sprint" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="committed" fill="#94a3b8" radius={[6, 6, 0, 0]} />
          <Bar dataKey="completed" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
