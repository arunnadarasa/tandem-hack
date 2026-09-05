import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { AREAS, type Job, type Patient } from "@/lib/ward-data";
import { useWard } from "@/lib/ward-store";
import { cn } from "@/lib/utils";
import { DoctorChip, DoneDrawer, JobRow, NewsPill, sortJobs } from "./bits";
import { CATEGORY_STYLE } from "./category-style";

export function PatientBoard({ patients }: { patients: Patient[] }) {
  const { jobs } = useWard();
  const areas = useMemo(
    () => AREAS.map((a) => ({ area: a, list: patients.filter((p) => p.area === a) })).filter((g) => g.list.length),
    [patients],
  );

  return (
    <div className="space-y-6">
      {areas.map(({ area, list }) => (
        <section key={area}>
          <h2 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {area}
            <span className="font-mono text-[11px] font-medium normal-case tracking-normal">
              {list.length} patients
            </span>
          </h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {list.map((p, i) => (
              <PatientRow
                key={p.id}
                patient={p}
                jobs={jobs.filter((j) => j.patientId === p.id)}
                first={i === 0}
              />
            ))}
          </div>
        </section>
      ))}
      {areas.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No patients in this view.
        </p>
      )}
    </div>
  );
}

function PatientRow({ patient, jobs, first }: { patient: Patient; jobs: Job[]; first: boolean }) {
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
        className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/50"
      >
        <span className="w-11 shrink-0 rounded-md bg-primary py-1.5 text-center font-mono text-xs font-bold text-primary-foreground">
          {patient.bed}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="truncate text-sm font-semibold">{patient.name}</span>
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
        <DoctorChip doctor={doctor} isMe={isMe} />
        <NewsPill score={patient.news} />
        <span className="hidden shrink-0 items-center gap-1 sm:flex">
          {[...new Set([...todo, ...chase].map((j) => j.category))].map((c) => {
            const Icon = CATEGORY_STYLE[c].icon;
            const n = [...todo, ...chase].filter((j) => j.category === c).length;
            return (
              <span
                key={c}
                title={`${n} ${c}`}
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  CATEGORY_STYLE[c].soft,
                )}
              >
                <Icon className="h-3 w-3" />
                {n}
              </span>
            );
          })}
        </span>
        <span className="flex w-32 shrink-0 items-center justify-end gap-1.5 text-xs">
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
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </div>
      {open && (
        <div className="space-y-1.5 border-t border-border bg-surface/70 px-2.5 py-2.5">
          {sortJobs([...todo, ...chase]).map((j) => (
            <JobRow key={j.id} job={j} />
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
