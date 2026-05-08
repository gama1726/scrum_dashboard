"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const density = useUiStore((state) => state.density);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar title={title} />
          <main className={cn(density === "compact" ? "p-3 md:p-4" : "p-4 md:p-6")}>{children}</main>
        </div>
      </div>
    </div>
  );
}
