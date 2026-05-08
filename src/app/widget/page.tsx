import Link from "next/link";
import { ScrumWidgetPanel } from "@/components/widget/scrum-widget-panel";

export default function WidgetPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#1e293b,#020617_55%)] p-4">
      <div className="absolute left-4 top-4">
        <Link
          href="/dashboard"
          className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800"
        >
          Back to full dashboard
        </Link>
      </div>
      <ScrumWidgetPanel />
    </main>
  );
}
