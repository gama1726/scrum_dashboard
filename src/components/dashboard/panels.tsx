import { Activity, Blocker, TeamMember } from "@/types";

export function BlockersList({ blockers, members }: { blockers: Blocker[]; members: TeamMember[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Blockers</h3>
      <div className="mt-3 space-y-3">
        {blockers.map((blocker) => {
          const owner = members.find((member) => member.id === blocker.ownerId);
          return (
            <div key={blocker.id} className="rounded-xl bg-rose-50 p-3 text-sm dark:bg-rose-900/20">
              <p className="font-medium">{blocker.reason}</p>
              <p className="text-xs text-slate-500">Owner: {owner?.fullName ?? "Unknown"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ActivityFeed({ activities, members }: { activities: Activity[]; members: TeamMember[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Recent Activity</h3>
      <div className="mt-3 space-y-3">
        {activities.map((activity) => {
          const actor = members.find((member) => member.id === activity.actorId);
          return (
            <div key={activity.id} className="text-sm">
              <p className="font-medium text-slate-800 dark:text-slate-100">{actor?.fullName}</p>
              <p className="text-slate-600 dark:text-slate-300">{activity.message}</p>
              <p className="text-xs text-slate-500">{activity.timestamp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
