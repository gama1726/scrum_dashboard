import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: string;
  tone?: "default" | "good" | "warn";
}

export function KpiCard({ label, value, trend, tone = "default" }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      {trend ? (
        <p
          className={cn(
            "mt-1 text-xs",
            tone === "good" && "text-emerald-600",
            tone === "warn" && "text-amber-600",
            tone === "default" && "text-slate-500",
          )}
        >
          {trend}
        </p>
      ) : null}
    </div>
  );
}
