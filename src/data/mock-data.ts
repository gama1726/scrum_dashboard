import {
  Activity,
  Blocker,
  DashboardSummary,
  Metrics,
  Project,
  Sprint,
  StandupUpdate,
  Task,
  TeamMember,
} from "@/types";

export const currentUser: TeamMember = {
  id: "u-1",
  fullName: "Alex Morgan",
  role: "Scrum Master",
  avatar: "AM",
  capacity: 8,
  workload: 6,
  focus: "Unblock API integration",
  isBlocked: false,
  availability: "Available",
};

export const project: Project = {
  id: "p-1",
  name: "Customer Portal Revamp",
  code: "CPR",
};

export const sprint: Sprint = {
  id: "s-24",
  name: "Sprint 24",
  goal: "Ship self-service billing dashboard with stable reporting flow",
  startDate: "2026-05-04",
  endDate: "2026-05-15",
  committedPoints: 76,
  completedPoints: 43,
  healthScore: 82,
};

export const teamMembers: TeamMember[] = [
  currentUser,
  { id: "u-2", fullName: "Mia Chen", role: "Developer", avatar: "MC", capacity: 7, workload: 7, focus: "Frontend polish", isBlocked: false, availability: "In Meeting" },
  { id: "u-3", fullName: "Daniel Novak", role: "Developer", avatar: "DN", capacity: 8, workload: 9, focus: "Auth edge cases", isBlocked: true, availability: "Available" },
  { id: "u-4", fullName: "Priya Singh", role: "Product Owner", avatar: "PS", capacity: 6, workload: 5, focus: "Backlog refinement", isBlocked: false, availability: "Available" },
  { id: "u-5", fullName: "Leo Park", role: "Team Lead", avatar: "LP", capacity: 8, workload: 6, focus: "Architecture review", isBlocked: false, availability: "Offline" },
];

export const tasks: Task[] = [
  { id: "T-231", title: "Billing chart data contract", status: "Review", priority: "High", storyPoints: 5, assigneeId: "u-3", dueDate: "2026-05-10", blocked: false, description: "Finalize API response contract for chart widgets." },
  { id: "T-232", title: "Standup focus mode", status: "In Progress", priority: "Medium", storyPoints: 3, assigneeId: "u-2", dueDate: "2026-05-09", blocked: false, description: "Add presenter friendly mode for standup page." },
  { id: "T-233", title: "Retry logic for metrics fetch", status: "To Do", priority: "High", storyPoints: 8, assigneeId: "u-5", dueDate: "2026-05-12", blocked: true, description: "Improve reliability of metrics loading during peak hours." },
  { id: "T-234", title: "Accessibility keyboard pass", status: "Backlog", priority: "Medium", storyPoints: 5, assigneeId: "u-1", dueDate: "2026-05-14", blocked: false, description: "Ensure keyboard navigation and focus states are polished." },
  { id: "T-235", title: "Onboarding tooltip copy", status: "Done", priority: "Low", storyPoints: 2, assigneeId: "u-4", dueDate: "2026-05-07", blocked: false, description: "Refine copy for first-time user guidance." },
  { id: "T-236", title: "Webhook signature validation", status: "In Progress", priority: "Critical", storyPoints: 8, assigneeId: "u-3", dueDate: "2026-05-09", blocked: true, description: "Complete security checks for external event ingestion." },
  { id: "T-237", title: "Empty states visual polish", status: "To Do", priority: "Low", storyPoints: 3, assigneeId: "u-2", dueDate: "2026-05-11", blocked: false, description: "Add premium empty state messaging and icon treatment." },
  { id: "T-238", title: "Sprint retrospective summary export", status: "Backlog", priority: "Medium", storyPoints: 5, assigneeId: "u-1", dueDate: "2026-05-15", blocked: false, description: "Enable one-click export of sprint insights." },
];

export const blockers: Blocker[] = [
  { id: "B-1", taskId: "T-233", ownerId: "u-5", reason: "Waiting for infra approval", severity: "Major" },
  { id: "B-2", taskId: "T-236", ownerId: "u-3", reason: "Missing provider test keys", severity: "Critical" },
];

export const activities: Activity[] = [
  { id: "A-1", actorId: "u-2", message: "Moved T-232 to In Progress", timestamp: "1h ago" },
  { id: "A-2", actorId: "u-4", message: "Updated sprint goal acceptance criteria", timestamp: "2h ago" },
  { id: "A-3", actorId: "u-3", message: "Flagged T-236 as blocked", timestamp: "3h ago" },
  { id: "A-4", actorId: "u-1", message: "Posted standup summary", timestamp: "4h ago" },
];

export const standupUpdates: StandupUpdate[] = [
  { id: "S-1", memberId: "u-2", yesterday: "Finished card hover interactions", today: "Presenter mode improvements", blockers: "None" },
  { id: "S-2", memberId: "u-3", yesterday: "Implemented signature verification", today: "Resolve test credentials issue", blockers: "Waiting for provider keys" },
  { id: "S-3", memberId: "u-1", yesterday: "Reviewed sprint risks", today: "Unblock critical path tasks", blockers: "None" },
];

export const metrics: Metrics = {
  burndown: [
    { day: "Mon", remainingPoints: 76 },
    { day: "Tue", remainingPoints: 68 },
    { day: "Wed", remainingPoints: 61 },
    { day: "Thu", remainingPoints: 52 },
    { day: "Fri", remainingPoints: 48 },
  ],
  velocity: [
    { sprint: "S20", committed: 70, completed: 65 },
    { sprint: "S21", committed: 72, completed: 69 },
    { sprint: "S22", committed: 74, completed: 70 },
    { sprint: "S23", committed: 78, completed: 74 },
    { sprint: "S24", committed: 76, completed: 43 },
  ],
};

export const dashboardSummary: DashboardSummary = {
  totalTasks: tasks.length,
  completedTasks: tasks.filter((task) => task.status === "Done").length,
  inProgressTasks: tasks.filter((task) => task.status === "In Progress").length,
  blockedTasks: tasks.filter((task) => task.blocked).length,
  todayPriorities: ["Unblock payment provider keys", "Finish standup focus mode", "Close billing chart review"],
  upcomingDeadlines: tasks
    .filter((task) => task.status !== "Done")
    .slice(0, 4)
    .map((task) => ({ taskId: task.id, title: task.title, dueDate: task.dueDate })),
};
