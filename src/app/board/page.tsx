import { AppShell } from "@/components/layout/app-shell";
import { BoardView } from "@/components/board/board-view";
import { apiClient } from "@/lib/api-client";

export default async function BoardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tasks, teamMembers } = await apiClient.getBoardData();
  const params = (await searchParams) ?? {};

  const getParam = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <AppShell title="Board">
      <BoardView
        tasks={tasks}
        teamMembers={teamMembers}
        initialFilters={{
          q: getParam("q") ?? "",
          blocked: getParam("blocked") === "true",
          priority: getParam("priority"),
          status: getParam("status"),
        }}
      />
    </AppShell>
  );
}
