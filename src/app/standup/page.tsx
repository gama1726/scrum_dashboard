import { AppShell } from "@/components/layout/app-shell";
import { StandupView } from "@/components/standup/standup-view";
import { apiClient } from "@/lib/api-client";

export default async function StandupPage() {
  const { standupUpdates, teamMembers } = await apiClient.getStandupData();
  return (
    <AppShell title="Standup">
      <StandupView standupUpdates={standupUpdates} teamMembers={teamMembers} />
    </AppShell>
  );
}
