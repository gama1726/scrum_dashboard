import { AppShell } from "@/components/layout/app-shell";
import { BoardView } from "@/components/board/board-view";
import { apiClient } from "@/lib/api-client";

export default async function BoardPage() {
  const { tasks, teamMembers } = await apiClient.getBoardData();

  return (
    <AppShell title="Board">
      <BoardView tasks={tasks} teamMembers={teamMembers} />
    </AppShell>
  );
}
