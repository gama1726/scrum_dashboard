import { TaskPriority, TaskStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<TaskStatus, string> = {
  Backlog: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  "To Do": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
  "In Progress": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
  Review: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200",
  Done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
};

const priorityStyles: Record<TaskPriority, string> = {
  Low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  Medium: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200",
  Critical: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[status])}>{status}</span>;
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", priorityStyles[priority])}>{priority}</span>;
}
