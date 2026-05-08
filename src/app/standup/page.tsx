import { AppShell } from "@/components/layout/app-shell";
import { apiClient } from "@/lib/api-client";

export default async function StandupPage() {
  const { standupUpdates, teamMembers } = await apiClient.getStandupData();
  return (
    <AppShell title="Standup">
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-xl font-semibold">Daily Standup Summary</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Presenter-friendly mode: concise updates, blockers, and today focus.</p>
      </section>
      <div className="space-y-3">
        {standupUpdates.map((update) => {
          const member = teamMembers.find((item) => item.id === update.memberId);
          return (
            <article key={update.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">{member?.fullName}</h3>
              <p className="mt-2 text-sm"><strong>Yesterday:</strong> {update.yesterday}</p>
              <p className="mt-1 text-sm"><strong>Today:</strong> {update.today}</p>
              <p className="mt-1 text-sm text-rose-600"><strong>Blockers:</strong> {update.blockers}</p>
            </article>
          );
        })}
      </div>
      <button className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900">Copy standup summary</button>
    </AppShell>
  );
}
