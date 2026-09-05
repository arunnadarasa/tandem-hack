import { useMemo } from "react";

import { CATEGORY_META, CATEGORY_ORDER, type JobCategory, type Patient } from "@/lib/ward-data";
import { useWard } from "@/lib/ward-store";
import { cn } from "@/lib/utils";
import { DoneDrawer, JobRow, sortJobs } from "./bits";
import { CATEGORY_STYLE } from "./category-style";

export function JobsBoard({
  patients,
  filter,
}: {
  patients: Patient[];
  filter: JobCategory | "all";
}) {
  const { jobs } = useWard();
  const ids = useMemo(() => new Set(patients.map((p) => p.id)), [patients]);
  const scoped = useMemo(() => jobs.filter((j) => ids.has(j.patientId)), [jobs, ids]);
  const columns = filter === "all" ? CATEGORY_ORDER : [filter];

  return (
    <div
      className={cn(
        "grid gap-3",
        filter === "all" ? "md:grid-cols-2 xl:grid-cols-3" : "max-w-3xl grid-cols-1",
      )}
    >
      {columns.map((cat) => {
        const list = scoped.filter((j) => j.category === cat);
        const open = sortJobs(list.filter((j) => j.status !== "done"));
        const done = list.filter((j) => j.status === "done");
        const style = CATEGORY_STYLE[cat];
        const Icon = style.icon;
        return (
          <section
            key={cat}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <header
              className={cn(
                "flex items-center gap-2.5 border-b border-border px-3 py-2.5",
                "bg-linear-to-r from-card to-card",
              )}
              style={{ backgroundColor: `color-mix(in oklab, var(--cat-${cat}) 10%, var(--card))` }}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  style.soft,
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className={cn("text-sm font-bold", style.text)}>{CATEGORY_META[cat].label}</h2>
                <p className="truncate text-[11px] text-muted-foreground">
                  {CATEGORY_META[cat].hint}
                </p>
              </div>
              <span
                className={cn(
                  "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 font-mono text-xs font-bold",
                  open.length ? style.soft : "text-muted-foreground",
                )}
              >
                {open.length}
              </span>
            </header>
            <div className="flex flex-col gap-1.5 p-2">
              {open.map((j) => (
                <JobRow key={j.id} job={j} showPatient />
              ))}
              {open.length === 0 && (
                <p className="px-2 py-3 text-xs text-muted-foreground">Nothing outstanding.</p>
              )}
              <DoneDrawer jobs={done} showPatient />
            </div>
          </section>
        );
      })}
    </div>
  );
}
