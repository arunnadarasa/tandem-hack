import { Clock, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

import {
  CATEGORY_META,
  newsTone,
  type Doctor,
  type Job,
  type JobStatus,
  type Patient,
} from "@/lib/ward-data";
import { useWard } from "@/lib/ward-store";
import { cn } from "@/lib/utils";
import { CATEGORY_STYLE } from "./category-style";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NewsPill({ score }: { score: number }) {
  const tone = newsTone(score);
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-md px-2 font-mono text-[11px] font-semibold tabular-nums",
        tone === "high" && "bg-news-high/15 text-news-high ring-1 ring-news-high/40",
        tone === "med" && "bg-news-med/15 text-news-med ring-1 ring-news-med/40",
        tone === "low" && "bg-news-low/12 text-news-low ring-1 ring-news-low/30",
      )}
      title={`NEWS ${score}`}
    >
      NEWS{score}
    </span>
  );
}

export function DoctorChip({
  doctor,
  isMe,
}: {
  doctor?: Doctor | undefined;
  isMe?: boolean | undefined;
}) {
  if (!doctor)
    return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <HoverCard openDelay={80} closeDelay={40}>
      <HoverCardTrigger asChild>
        <span
          role="img"
          aria-label={`${doctor.name}, bleep ${doctor.bleep}`}
          className={cn(
            "inline-flex h-7 w-7 cursor-help items-center justify-center rounded-full text-[11px] font-semibold ring-1 transition-colors",
            isMe
              ? "bg-primary text-primary-foreground ring-primary"
              : "bg-secondary text-secondary-foreground ring-border hover:bg-accent",
          )}
        >
          {doctor.initials}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-56 p-3" side="top">
        <p className="text-sm font-semibold">{doctor.name}</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">Bleep {doctor.bleep}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

export function StatusDot({ status }: { status: JobStatus }) {
  return (
    <span
      className={cn(
        "mt-[6px] h-2 w-2 shrink-0 rounded-full",
        status === "todo" && "bg-todo",
        status === "chase" && "bg-chase",
        status === "done" && "bg-done",
      )}
    />
  );
}

export function CategoryTag({ category }: { category: Job["category"] }) {
  const style = CATEGORY_STYLE[category];
  const Icon = style.icon;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        style.soft,
      )}
      title={CATEGORY_META[category].label}
    >
      <Icon className="h-3 w-3" />
      {CATEGORY_META[category].short}
    </span>
  );
}

const STATUS_STYLE: Record<JobStatus, { label: string; cls: string }> = {
  todo: { label: "To do", cls: "bg-todo/15 text-todo ring-1 ring-todo/40" },
  chase: { label: "To chase", cls: "bg-chase/15 text-chase ring-1 ring-chase/40" },
  done: { label: "Done", cls: "bg-done/15 text-done ring-1 ring-done/40" },
};

export function StatusPill({ status }: { status: JobStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold",
        s.cls,
      )}
    >
      {s.label}
    </span>
  );
}

export function PatientLine({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="rounded bg-foreground px-1.5 py-0.5 font-mono text-[11px] font-bold text-background">
        {patient.bed}
      </span>
      <span className="truncate text-sm font-semibold">{patient.name}</span>
      <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
        {patient.nhs}
      </span>
    </div>
  );
}

const TIMINGS = [
  "Before 11:00",
  "After 12:00",
  "After 14:00",
  "Before ward round",
  "Before end of shift",
  "Overnight if needed",
];

export function JobRow({
  job,
  showPatient = false,
  compact = false,
  mergedStatus = false,
}: {
  job: Job;
  showPatient?: boolean;
  compact?: boolean;
  mergedStatus?: boolean;
}) {
  const { setJobStatus, updateJob, patientById } = useWard();
  const patient = patientById(job.patientId);

  return (
    <div
      className={cn(
        "group flex items-start gap-2.5 rounded-lg border-l-[3px] bg-surface/50 px-2.5 py-2 transition-colors hover:bg-accent/50",
        CATEGORY_STYLE[job.category].border,
        job.status === "done" && "opacity-55",
      )}
    >
      <button
        type="button"
        aria-label={job.status === "done" ? "Mark as to do" : "Mark as done"}
        title={job.status === "done" ? "Mark as to do" : "Mark as done"}
        onClick={() => setJobStatus(job.id, job.status === "done" ? "todo" : "done")}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          job.status === "done"
            ? "border-done bg-done text-background"
            : "border-border text-transparent hover:border-done hover:text-done",
        )}
      >
        <Check className="h-3.5 w-3.5" />
      </button>
      <div className="min-w-0 flex-1">
        {showPatient && patient && (
          <div className="mb-0.5 flex items-center gap-2">
            <span className="rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] font-bold text-background">
              {patient.bed}
            </span>
            <span className="truncate text-xs font-semibold">{patient.name}</span>
            <NewsMini score={patient.news} />
          </div>
        )}
        <p
          className={cn(
            "text-sm leading-snug",
            job.status === "done" && "line-through decoration-muted-foreground",
          )}
        >
          {job.title}
        </p>
        {(job.detail || job.timing) && !compact && (
          <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {job.timing && (
              <span className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5">
                <Clock className="h-3 w-3" /> {job.timing}
              </span>
            )}
            {job.detail && <span className="truncate">{job.detail}</span>}
          </p>
        )}
      </div>
      {!showPatient && <CategoryTag category={job.category} />}
      <DropdownMenu>
        <DropdownMenuTrigger className="shrink-0 rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <StatusPill status={job.status} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-xs">Set status</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setJobStatus(job.id, "todo")}>To do</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setJobStatus(job.id, "chase")}>
            To chase
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setJobStatus(job.id, "done")}>Done</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Add timing</DropdownMenuLabel>
          {TIMINGS.map((t) => (
            <DropdownMenuItem key={t} onClick={() => updateJob(job.id, { timing: t })}>
              {t}
            </DropdownMenuItem>
          ))}
          {job.timing && (
            <DropdownMenuItem onClick={() => updateJob(job.id, { timing: undefined })}>
              Clear timing
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NewsMini({ score }: { score: number }) {
  const tone = newsTone(score);
  return (
    <span
      className={cn(
        "rounded px-1 font-mono text-[10px] font-bold",
        tone === "high" && "bg-news-high/15 text-news-high",
        tone === "med" && "bg-news-med/15 text-news-med",
        tone === "low" && "bg-news-low/12 text-news-low",
      )}
    >
      N{score}
    </span>
  );
}

export function DoneDrawer({
  jobs,
  showPatient,
}: {
  jobs: Job[];
  showPatient?: boolean | undefined;
}) {
  const [open, setOpen] = useState(false);
  if (jobs.length === 0) return null;
  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent/60"
      >
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
        {jobs.length} done
      </button>
      {open && (
        <div className="mt-1">
          {jobs.map((j) => (
            <JobRow key={j.id} job={j} showPatient={showPatient ?? false} compact />
          ))}
        </div>
      )}
    </div>
  );
}

export const statusRank: Record<JobStatus, number> = { todo: 0, chase: 1, done: 2 };

export function sortJobs(jobs: Job[]) {
  return [...jobs].sort((a, b) => {
    const r = statusRank[a.status] - statusRank[b.status];
    if (r !== 0) return r;
    const at = a.timing ?? "zzz";
    const bt = b.timing ?? "zzz";
    return at.localeCompare(bt);
  });
}
