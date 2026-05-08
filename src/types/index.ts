export type TaskStatus = "Backlog" | "To Do" | "In Progress" | "Review" | "Done";
export type TaskPriority = "Low" | "Medium" | "High" | "Critical";

export interface User {
  id: string;
  fullName: string;
  role: "Developer" | "Scrum Master" | "Product Owner" | "Team Lead";
  avatar: string;
}

export interface TeamMember extends User {
  capacity: number;
  workload: number;
  focus: string;
  isBlocked: boolean;
  availability: "Available" | "In Meeting" | "Offline";
}

export interface Project {
  id: string;
  name: string;
  code: string;
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  committedPoints: number;
  completedPoints: number;
  healthScore: number;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  storyPoints: number;
  assigneeId: string;
  dueDate: string;
  blocked: boolean;
  description: string;
}

export interface Blocker {
  id: string;
  taskId: string;
  ownerId: string;
  reason: string;
  severity: "Minor" | "Major" | "Critical";
}

export interface Activity {
  id: string;
  actorId: string;
  message: string;
  timestamp: string;
}

export interface StandupUpdate {
  id: string;
  memberId: string;
  yesterday: string;
  today: string;
  blockers: string;
}

export interface Metrics {
  burndown: Array<{ day: string; remainingPoints: number }>;
  velocity: Array<{ sprint: string; committed: number; completed: number }>;
}

export interface DashboardSummary {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  blockedTasks: number;
  todayPriorities: string[];
  upcomingDeadlines: Array<{ taskId: string; title: string; dueDate: string }>;
}
