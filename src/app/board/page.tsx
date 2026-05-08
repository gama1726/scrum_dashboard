import { AppShell } from "@/components/layout/app-shell";
import { TaskCard } from "@/components/board/task-card";
import { apiClient } from "@/lib/api-client";
import { TaskStatus } from "@/types";

const columns: TaskStatus[] = ["Backlog", "To Do", "In Progress", "Review", "Done"];

export default async function BoardPage() {
  const { tasks, teamMembers } = await apiClient.getBoardData();

  return (
    <AppShell title="Board">
      <div className="mb-4 flex gap-2">
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900"
          placeholder="Filter by assignee, priority or blocker"
        />
      </div>

      <div className="overflow-x-auto pb-2 [scrollbar-gutter:stable]">
        <div className="flex min-w-max gap-4">
        {columns.map((status) => (
          <section
            key={status}
            className="w-[300px] shrink-0 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/95 to-slate-100/70 p-3 dark:border-slate-700 dark:from-slate-900/90 dark:to-slate-900/40"
          >
            <h3 className="sticky top-0 z-10 mb-3 rounded-lg bg-white/90 px-2 py-1 text-sm font-semibold backdrop-blur dark:bg-slate-900/85">
              {status}{" "}
              <span className="text-xs font-normal text-slate-500">
                ({tasks.filter((task) => task.status === status).length})
              </span>
            </h3>
            <div className="space-y-3">
              {tasks.filter((task) => task.status === status).map((task) => (
                <TaskCard key={task.id} task={task} assignee={teamMembers.find((member) => member.id === task.assigneeId)} />
              ))}
            </div>
          </section>
        ))}
        </div>
      </div>
    </AppShell>
  );
}
