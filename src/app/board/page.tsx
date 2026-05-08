import { AppShell } from "@/components/layout/app-shell";
import { TaskCard } from "@/components/board/task-card";
import { apiClient } from "@/lib/api-client";
import { TaskStatus } from "@/types";

const columns: TaskStatus[] = ["Backlog", "To Do", "In Progress", "Review", "Done"];

export default async function BoardPage() {
  const { tasks, teamMembers } = await apiClient.getBoardData();

  return (
    <AppShell title="Board">
      <div className="mb-4 flex flex-wrap gap-2">
        <input className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" placeholder="Filter by assignee, priority or blocker" />
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        {columns.map((status) => (
          <section key={status} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
            <h3 className="mb-3 text-sm font-semibold">{status}</h3>
            <div className="space-y-3">
              {tasks.filter((task) => task.status === status).map((task) => (
                <TaskCard key={task.id} task={task} assignee={teamMembers.find((member) => member.id === task.assigneeId)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
