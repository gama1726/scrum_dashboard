import { AppShell } from "@/components/layout/app-shell";
import { apiClient } from "@/lib/api-client";

export default async function TeamPage() {
  const { teamMembers, tasks } = await apiClient.getTeamData();
  return (
    <AppShell title="Team">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="font-semibold">{member.fullName}</h3>
            <p className="text-sm text-slate-500">{member.role}</p>
            <p className="mt-3 text-sm">Focus: {member.focus}</p>
            <p className="text-sm">Workload: {member.workload}/{member.capacity} pts</p>
            <p className="text-sm">Assigned tasks: {tasks.filter((task) => task.assigneeId === member.id).length}</p>
            <p className="mt-1 text-sm text-rose-600">{member.isBlocked ? "Blocked" : "No blockers"}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
