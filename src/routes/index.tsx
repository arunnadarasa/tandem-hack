import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Activity, Atom, LayoutList, Rows3, LogOut } from "lucide-react";

import { CATEGORY_META, CATEGORY_ORDER, type JobCategory } from "@/lib/ward-data";
import { CATEGORY_STYLE } from "@/components/ward/category-style";
import { WardProvider, useWard } from "@/lib/ward-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SetupScreen } from "@/components/ward/SetupScreen";
import { PatientBoard } from "@/components/ward/PatientBoard";
import { JobsBoard } from "@/components/ward/JobsBoard";
import { AddJobDialog } from "@/components/ward/AddJobDialog";
import { HandoverDialog } from "@/components/ward/HandoverDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ward Round Board — Ward 31 patient and jobs list" },
      {
        name: "description",
        content:
          "A ward round board for hospital doctors: patients by bed, NEWS scores, and jobs sorted by type and status, with handover in one click.",
      },
      { property: "og:title", content: "Ward Round Board — Ward 31" },
      {
        property: "og:description",
        content:
          "Patients by bed, NEWS scores, and ward round jobs organised by type, status and timing.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <WardProvider>
      <Shell />
    </WardProvider>
  );
}

function Shell() {
  const { session, me, patients, endShift } = useWard();
  const [scope, setScope] = useState<"mine" | "ward">("mine");
  const [view, setView] = useState<"patients" | "jobs">("jobs");
  const [filter, setFilter] = useState<JobCategory | "all">("all");

  const visible = useMemo(
    () =>
      scope === "mine" && session
        ? patients.filter((p) => session.myPatientIds.includes(p.id))
        : patients,
    [scope, session, patients],
  );

  if (!session) return <SetupScreen />;

  const stats = useMemo(() => {
    const ids = new Set(visible.map((p) => p.id));
    const list = jobs.filter((j) => ids.has(j.patientId));
    return {
      patients: visible.length,
      todo: list.filter((j) => j.status === "todo").length,
      chase: list.filter((j) => j.status === "chase").length,
      done: list.filter((j) => j.status === "done").length,
      news: visible.reduce((m, p) => Math.max(m, p.news), 0),
    };
  }, [visible, jobs]);

  return (
    <main className="app-canvas min-h-screen">
      <header className="glass-panel sticky top-0 z-20 border-x-0 border-t-0">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="glow-primary relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="h-4.5 w-4.5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold tracking-tight">
                {session.ward.split(" — ")[0]}
                <span className="ml-2 inline-flex items-center gap-1 align-middle text-[10px] font-medium text-news-low">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-news-low" />
                  live
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {me?.name} · bleep <span className="font-mono">{me?.bleep}</span>
              </p>
            </div>
          </div>

          <Segmented
            value={scope}
            onChange={(v) => setScope(v as "mine" | "ward")}
            options={[
              { value: "mine", label: `My patients (${session.myPatientIds.length})` },
              { value: "ward", label: `Whole ward (${patients.length})` },
            ]}
          />

          <Segmented
            value={view}
            onChange={(v) => setView(v as "patients" | "jobs")}
            options={[
              { value: "jobs", label: "Jobs", icon: <LayoutList className="h-3.5 w-3.5" /> },
              { value: "patients", label: "Patients", icon: <Rows3 className="h-3.5 w-3.5" /> },
            ]}
          />

          <div className="ml-auto flex items-center gap-2">
            <AddJobDialog />
            <HandoverDialog
              patients={visible}
              scope={scope === "mine" ? `${me?.initials} patients` : session.ward.split(" — ")[0]!}
            />
            <Button
              size="sm"
              variant="outline"
              asChild
              className="gap-1.5 border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Link to="/quantum">
                <Atom className="h-4 w-4" />
                Quantum
              </Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={endShift} title="End shift">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {view === "jobs" && (
          <div className="mx-auto flex max-w-7xl flex-wrap gap-1.5 px-4 pb-3">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              All jobs
            </FilterChip>
            {CATEGORY_ORDER.map((c) => {
              const Icon = CATEGORY_STYLE[c].icon;
              return (
                <FilterChip
                  key={c}
                  active={filter === c}
                  onClick={() => setFilter(c)}
                  tone={CATEGORY_STYLE[c]}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {CATEGORY_META[c].label}
                </FilterChip>
              );
            })}
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="rise-in mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="Patients" value={stats.patients} />
          <Stat label="To do" value={stats.todo} tone="text-todo" />
          <Stat label="To chase" value={stats.chase} tone="text-chase" />
          <Stat label="Done" value={stats.done} tone="text-done" />
          <Stat
            label="Highest NEWS"
            value={stats.news}
            tone={stats.news >= 5 ? "text-news-high" : stats.news >= 3 ? "text-news-med" : "text-news-low"}
          />
        </div>

        <div key={`${view}-${scope}`} className="rise-in">
          {view === "patients" ? (
            <PatientBoard patients={visible} scope={scope} />
          ) : (
            <JobsBoard patients={visible} filter={filter} />
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div className="panel lift rounded-xl px-3.5 py-2.5">
      <p className="eyebrow">{label}</p>
      <p className={cn("font-display text-2xl font-bold tabular-nums", tone)}>{value}</p>
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; icon?: React.ReactNode }[];
}) {
  return (
    <div className="flex rounded-xl border border-border bg-surface/70 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
            value === o.value
              ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-14px_var(--primary)]"
              : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
          )}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}


function FilterChip({
  active,
  onClick,
  children,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: { soft: string; text: string };
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? tone
            ? cn("border-transparent", tone.soft)
            : "border-transparent bg-primary/15 text-primary ring-1 ring-primary/40"
          : cn(
              "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
              tone && `hover:${tone.text}`,
            ),
      )}
    >
      {children}
    </button>
  );
}
