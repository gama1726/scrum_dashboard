import type { ComponentType } from "react";
import { AlertTriangle, CheckCircle2, CircleDashed, TimerReset } from "lucide-react";
import { dashboardSummary, sprint } from "@/data/mock-data";

export function ScrumWidgetPanel() {
  const completion = Math.round((sprint.completedPoints / sprint.committedPoints) * 100);

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-700/60 bg-slate-950/90 p-5 text-slate-100 shadow-2xl backdrop-blur">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scrum Dashboard</p>
          <h1 className="mt-1 text-lg font-semibold">{sprint.name}</h1>
        </div>
        <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs text-indigo-200">{completion}% done</span>
      </div>

      <p className="mb-4 text-sm text-slate-300">{sprint.goal}</p>

      <div className="grid grid-cols-2 gap-2">
        <Metric label="Completed" value={dashboardSummary.completedTasks} icon={CheckCircle2} tone="good" />
        <Metric label="In Progress" value={dashboardSummary.inProgressTasks} icon={CircleDashed} tone="default" />
        <Metric label="Blocked" value={dashboardSummary.blockedTasks} icon={AlertTriangle} tone="warn" />
        <Metric label="Remaining SP" value={sprint.committedPoints - sprint.completedPoints} icon={TimerReset} tone="default" />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-900 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Today Focus</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-200">
          {dashboardSummary.todayPriorities.slice(0, 2).map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  tone: "default" | "good" | "warn";
}) {
  const toneClass = tone === "good" ? "text-emerald-300" : tone === "warn" ? "text-rose-300" : "text-slate-300";

  return (
    <div className="rounded-2xl bg-slate-900 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">{label}</p>
        <Icon className={`h-3.5 w-3.5 ${toneClass}`} />
      </div>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
