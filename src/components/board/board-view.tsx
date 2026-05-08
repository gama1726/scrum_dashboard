"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { TaskCard } from "@/components/board/task-card";
import { PriorityBadge, StatusBadge } from "@/components/shared/badges";
import { Task, TaskPriority, TaskStatus, TeamMember } from "@/types";

const columns: TaskStatus[] = ["Backlog", "To Do", "In Progress", "Review", "Done"];

interface BoardViewProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  initialFilters?: {
    q?: string;
    blocked?: boolean;
    priority?: string;
    status?: string;
  };
}

export function BoardView({ tasks, teamMembers, initialFilters }: BoardViewProps) {
  const initialStatus = initialFilters?.status;
  const initialPriority = initialFilters?.priority;
  const initialBlocked = Boolean(initialFilters?.blocked);
  const initialQuery = initialFilters?.q ?? "";

  const [boardTasks, setBoardTasks] = useState(tasks);
  const [query, setQuery] = useState(initialQuery);
  const [assigneeId, setAssigneeId] = useState("all");
  const [priority, setPriority] = useState<"all" | TaskPriority>(
    initialPriority === "Low" || initialPriority === "Medium" || initialPriority === "High" || initialPriority === "Critical"
      ? initialPriority
      : "all",
  );
  const [statusFilter, setStatusFilter] = useState<"all" | TaskStatus>(
    initialStatus === "Backlog" ||
      initialStatus === "To Do" ||
      initialStatus === "In Progress" ||
      initialStatus === "Review" ||
      initialStatus === "Done"
      ? initialStatus
      : "all",
  );
  const [blockedOnly, setBlockedOnly] = useState(initialBlocked);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return boardTasks.filter((task) => {
      const matchQuery = !query || task.title.toLowerCase().includes(query.toLowerCase()) || task.id.toLowerCase().includes(query.toLowerCase());
      const matchAssignee = assigneeId === "all" || task.assigneeId === assigneeId;
      const matchPriority = priority === "all" || task.priority === priority;
      const matchStatus = statusFilter === "all" || task.status === statusFilter;
      const matchBlocked = !blockedOnly || task.blocked;
      return matchQuery && matchAssignee && matchPriority && matchStatus && matchBlocked;
    });
  }, [boardTasks, query, assigneeId, priority, statusFilter, blockedOnly]);

  const selectedTask = boardTasks.find((task) => task.id === selectedTaskId) ?? null;
  const selectedAssignee = teamMembers.find((member) => member.id === selectedTask?.assigneeId);

  const moveTaskToStatus = (taskId: string, status: TaskStatus) => {
    setBoardTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  };

  return (
    <>
      <div className="mb-4 grid gap-2 md:grid-cols-5">
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900"
          placeholder="Search by task title or id"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          value={assigneeId}
          onChange={(event) => setAssigneeId(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="all">All assignees</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>{member.fullName}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as "all" | TaskPriority)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="all">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as "all" | TaskStatus)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="all">All statuses</option>
          <option value="Backlog">Backlog</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>

        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <input type="checkbox" checked={blockedOnly} onChange={(event) => setBlockedOnly(event.target.checked)} />
          Blocked only
        </label>
      </div>

      <div className="overflow-x-auto pb-2 [scrollbar-gutter:stable]">
        <div className="flex min-w-max gap-4">
          {columns.map((status) => {
            const columnTasks = filteredTasks.filter((task) => task.status === status);

            return (
              <section
                key={status}
                className="w-[300px] shrink-0 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/95 to-slate-100/70 p-3 transition-colors dark:border-slate-700 dark:from-slate-900/90 dark:to-slate-900/40"
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (draggingTaskId) {
                    moveTaskToStatus(draggingTaskId, status);
                    setDraggingTaskId(null);
                  }
                }}
              >
                <h3 className="sticky top-0 z-10 mb-3 rounded-lg bg-white/90 px-2 py-1 text-sm font-semibold backdrop-blur dark:bg-slate-900/85">
                  {status} <span className="text-xs font-normal text-slate-500">({columnTasks.length})</span>
                </h3>

                <div className="space-y-3">
                  {columnTasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
                      No tasks match current filters.
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => setDraggingTaskId(task.id)}
                        onDragEnd={() => setDraggingTaskId(null)}
                      >
                        <TaskCard
                          task={task}
                          assignee={teamMembers.find((member) => member.id === task.assigneeId)}
                          onClick={() => setSelectedTaskId(task.id)}
                        />
                      </div>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {selectedTask ? (
        <div className="fixed inset-0 z-40 bg-slate-950/35" onClick={() => setSelectedTaskId(null)}>
          <aside
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">{selectedTask.id}</p>
                <h3 className="mt-1 text-lg font-semibold">{selectedTask.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTaskId(null)}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                aria-label="Close task details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={selectedTask.status} />
              <PriorityBadge priority={selectedTask.priority} />
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <Detail label="Assignee" value={selectedAssignee?.fullName ?? "Unassigned"} />
              <Detail label="Story points" value={String(selectedTask.storyPoints)} />
              <Detail label="Due date" value={selectedTask.dueDate} />
              <Detail label="Blocked" value={selectedTask.blocked ? "Yes" : "No"} />
              <Detail label="Description" value={selectedTask.description} />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  );
}
