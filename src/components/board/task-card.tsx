import { AlertTriangle, CalendarDays } from "lucide-react";
import { Task, TeamMember } from "@/types";
import { PriorityBadge, StatusBadge } from "@/components/shared/badges";

export function TaskCard({ task, assignee }: { task: Task; assignee?: TeamMember }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{task.title}</p>
          <p className="mt-1 text-xs text-slate-500">{task.id}</p>
        </div>
        {task.blocked ? <AlertTriangle className="h-4 w-4 text-rose-500" /> : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{assignee?.fullName ?? "Unassigned"}</span>
        <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{task.dueDate}</span>
      </div>
    </div>
  );
}
