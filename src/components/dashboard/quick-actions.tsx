import { CalendarClock, Flag, Layers2 } from "lucide-react";

export function QuickActions() {
  const actions = [
    { label: "Plan standup", icon: CalendarClock },
    { label: "Review blockers", icon: Flag },
    { label: "Refine backlog", icon: Layers2 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Quick Actions</h3>
      <div className="mt-3 grid gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.label} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              <Icon className="h-4 w-4" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
