import {
  activities,
  blockers,
  currentUser,
  dashboardSummary,
  metrics,
  project,
  sprint,
  standupUpdates,
  tasks,
  teamMembers,
} from "@/data/mock-data";

const delay = async () => new Promise((resolve) => setTimeout(resolve, 150));

export const apiClient = {
  async getDashboardData() {
    await delay();
    return { currentUser, project, sprint, tasks, blockers, activities, metrics, dashboardSummary, teamMembers };
  },
  async getBoardData() {
    await delay();
    return { tasks, teamMembers };
  },
  async getSprintData() {
    await delay();
    return { sprint, blockers, metrics, tasks };
  },
  async getStandupData() {
    await delay();
    return { standupUpdates, teamMembers };
  },
  async getTeamData() {
    await delay();
    return { teamMembers, tasks, sprint };
  },
};
