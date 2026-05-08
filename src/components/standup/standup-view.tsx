"use client";

import { useMemo, useState } from "react";
import { StandupUpdate, TeamMember } from "@/types";

interface StandupViewProps {
  standupUpdates: StandupUpdate[];
  teamMembers: TeamMember[];
}

export function StandupView({ standupUpdates, teamMembers }: StandupViewProps) {
  const [focusMode, setFocusMode] = useState(false);
  const [conciseMode, setConciseMode] = useState(false);
  const [presenterIndex, setPresenterIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const prepared = useMemo(() => {
    return standupUpdates.map((update) => ({
      ...update,
      member: teamMembers.find((member) => member.id === update.memberId),
    }));
  }, [standupUpdates, teamMembers]);

  const visibleUpdates = focusMode ? [prepared[presenterIndex]].filter(Boolean) : prepared;

  const summaryText = prepared
    .map(
      (item) =>
        `${item.member?.fullName ?? "Unknown"}\n- Yesterday: ${item.yesterday}\n- Today: ${item.today}\n- Blockers: ${item.blockers}`,
    )
    .join("\n\n");

  const copySummary = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={focusMode ? "rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-900 dark:bg-indigo-950/20" : ""}>
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">Daily Standup Summary</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Structured updates with presenter and concise modes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setConciseMode((state) => !state)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
              {conciseMode ? "Detailed" : "Concise"} mode
            </button>
            <button onClick={() => setFocusMode((state) => !state)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
              {focusMode ? "Exit focus" : "Focus mode"}
            </button>
            <button onClick={copySummary} className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900">
              {copied ? "Copied" : "Copy summary"}
            </button>
          </div>
        </div>
      </section>

      {focusMode ? (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
          <button
            onClick={() => setPresenterIndex((prev) => (prev === 0 ? prepared.length - 1 : prev - 1))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-700"
          >
            Previous
          </button>
          <span className="text-slate-500">Presenter card {presenterIndex + 1} / {prepared.length}</span>
          <button
            onClick={() => setPresenterIndex((prev) => (prev + 1) % prepared.length)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-700"
          >
            Next
          </button>
        </div>
      ) : null}

      <div className="space-y-3">
        {visibleUpdates.map((update) => (
          <article key={update.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="font-semibold">{update.member?.fullName}</h3>
            {!conciseMode ? <p className="mt-2 text-sm"><strong>Yesterday:</strong> {update.yesterday}</p> : null}
            <p className="mt-1 text-sm"><strong>Today:</strong> {update.today}</p>
            <p className="mt-1 text-sm text-rose-600"><strong>Blockers:</strong> {update.blockers}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
