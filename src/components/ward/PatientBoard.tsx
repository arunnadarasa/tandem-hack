import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { AREAS, type Job, type Patient } from "@/lib/ward-data";
import { useWard } from "@/lib/ward-store";
import { cn } from "@/lib/utils";
import { DoctorChip, DoneDrawer, JobRow, NewsPill, sortJobs } from "./bits";

export function PatientBoard({
  patients,
  scope,
}: {
  patients: Patient[];
  scope: "mine" | "ward";
}) {
  const { jobs } = useWard();
  const areas = useMemo(
    () => AREAS.map((a) => ({ area: a, list: patients.filter((p) => p.area === a) })).filter((g) => g.list.length),
    [patients],
  );

  const showDoctor = scope === "ward";
  const gridCols = showDoctor
    ? "grid-cols-[3rem_1fr_2rem_4.5rem_8rem_1.5rem]"
    : "grid-cols-[3rem_1fr_4.5rem_8rem_1.5rem]";

  return (
    <div className="space-y-6">
      {areas.map(({ area, list }) => (
        <section key={area}>
          <h2 className="mb-2.5 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            {area}
            <span className="font-mono text-[11px] font-medium normal-case tracking-normal">
              {list.length} patients
            </span>
          </h2>
          <div className="panel overflow-hidden rounded-2xl">
            <div
              className={cn(
                "grid items-center gap-3 border-b border-border bg-surface/50 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
                gridCols,
              )}
            >
              <span className="text-center">Bed</span>
              <span>Patient</span>
              {showDoctor && <span className="text-center">Dr</span>}
              <span className="text-center">NEWS</span>
              <span className="text-right">Jobs Status</span>
              <span />
            </div>
            {list.map((p, i) => (
              <PatientRow
                key={p.id}
                patient={p}
                jobs={jobs.filter((j) => j.patientId === p.id)}
                first={i === 0}
                showDoctor={showDoctor}
                gridCols={gridCols}
              />
            ))}
          </div>
        </section>
      ))}
      {areas.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No patients in this view.
        </p>
      )}
    </div>
  );
}


function PatientRow({
  patient,
  jobs,
  first,
  showDoctor,
  gridCols,
}: {
  patient: Patient;
  jobs: Job[];
  first: boolean;
  showDoctor: boolean;
  gridCols: string;
}) {
  const { doctorById, session } = useWard();
  const [open, setOpen] = useState(false);
  const doctor = doctorById(patient.doctorId);
  const isMe = patient.doctorId === session?.doctorId;

  const todo = jobs.filter((j) => j.status === "todo");
  const chase = jobs.filter((j) => j.status === "chase");
  const done = jobs.filter((j) => j.status === "done");

  return (
    <div className={cn(!first && "border-t border-border")}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className={cn(
          "grid w-full cursor-pointer items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-accent/40",
          open && "bg-accent/30",
          gridCols,
        )}
      >
        <span className="rounded-lg bg-primary py-1.5 text-center font-mono text-xs font-bold text-primary-foreground shadow-[0_8px_20px_-14px_var(--primary)]">
          {patient.bed}
        </span>
        <span className="min-w-0">
          <span className="flex items-baseline gap-2">
            <span className="truncate font-display text-sm font-semibold tracking-tight">
              {patient.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {patient.age}
              {patient.sex}
            </span>
            <span className="hidden font-mono text-[11px] text-muted-foreground md:inline">
              {patient.nhs}
            </span>
          </span>
          <span className="block truncate text-xs text-muted-foreground">{patient.summary}</span>
        </span>
        {showDoctor && <DoctorChip doctor={doctor} isMe={isMe} />}
        <NewsPill score={patient.news} />
        <span className="flex shrink-0 items-center justify-end gap-1.5 text-xs">
          {todo.length > 0 && (
            <span className="rounded-full bg-todo/15 px-2 py-0.5 font-semibold text-todo ring-1 ring-todo/30">
              {todo.length} to do
            </span>
          )}
          {chase.length > 0 && (
            <span className="rounded-full bg-chase/15 px-2 py-0.5 font-semibold text-chase ring-1 ring-chase/30">
              {chase.length} chase
            </span>
          )}
          {todo.length + chase.length === 0 && (
            <span className="text-muted-foreground">clear</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 justify-self-end text-muted-foreground transition-transform duration-200",
            open && "rotate-180 text-primary",
          )}
        />
      </div>
      {open && (
        <div className="rise-in space-y-1.5 border-t border-border bg-surface/60 px-3 py-3">
          {sortJobs([...todo, ...chase]).map((j) => (
            <JobRow key={j.id} job={j} mergedStatus />
          ))}
          {todo.length + chase.length === 0 && (
            <p className="px-2 py-1 text-xs text-muted-foreground">No outstanding jobs.</p>
          )}
          <DoneDrawer jobs={done} />
        </div>
      )}
    </div>

  );
}
