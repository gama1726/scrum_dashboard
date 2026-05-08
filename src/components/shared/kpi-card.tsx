import { cn } from "@/lib/utils";
import Link from "next/link";

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: string;
  tone?: "default" | "good" | "warn";
  href?: string;
}

export function KpiCard({ label, value, trend, tone = "default", href }: KpiCardProps) {
  const content = (
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

  if (href) {
    return (
      <Link href={href} className="block transition hover:-translate-y-0.5 hover:shadow-md">
        {content}
      </Link>
    );
  }

  return content;
}
