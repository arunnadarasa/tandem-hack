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
        "grid gap-3.5",
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
            className="panel lift flex flex-col overflow-hidden rounded-2xl"
          >
            <header className="relative flex items-center gap-2.5 border-b border-border px-3.5 py-3">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ backgroundColor: `var(--cat-${cat})` }}
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background: `linear-gradient(to bottom, color-mix(in oklab, var(--cat-${cat}) 12%, transparent), transparent)`,
                }}
              />
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  style.soft,
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className={cn("font-display text-sm font-bold tracking-tight", style.text)}>
                  {CATEGORY_META[cat].label}
                </h2>
                <p className="truncate text-[11px] text-muted-foreground">
                  {CATEGORY_META[cat].hint}
                </p>
              </div>
              <span
                className={cn(
                  "flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-mono text-xs font-bold tabular-nums",
                  open.length ? style.soft : "bg-surface/60 text-muted-foreground",
                )}
              >
                {open.length}
              </span>
            </header>
            <div className="flex flex-col gap-1.5 p-2.5">
              {open.map((j) => (
                <JobRow key={j.id} job={j} showPatient />
              ))}
              {open.length === 0 && (
                <p className="rounded-xl border border-dashed border-border px-3 py-5 text-center text-xs text-muted-foreground">
                  Nothing outstanding
                </p>
              )}
              <DoneDrawer jobs={done} showPatient />
            </div>
          </section>
        );
      })}
    </div>
  );
}

