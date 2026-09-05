import { createFileRoute, Link } from "@tanstack/react-router";
import { Atom, ArrowLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quantum")({
  head: () => ({
    meta: [
      { title: "Quantum-verified handover — WardFlow" },
      {
        name: "description",
        content:
          "How WardFlow uses a tiny quantum job to stamp a tamper-evident receipt on the ward handover, without changing the classical decision-making.",
      },
      { property: "og:title", content: "Quantum-verified handover — WardFlow" },
      {
        property: "og:description",
        content:
          "A 4-qubit Max-Cut QAOA toy on Quantinuum Nexus that signs the ward handover as a live, checkable receipt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuantumPage,
});

function QuantumPage() {
  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1.5 pl-2">
              <ArrowLeft className="h-4 w-4" />
              Back to board
            </Button>
          </Link>
        </div>

        <header className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Atom className="h-3.5 w-3.5" />
            Hackathon showcase
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Quantum-verified handover
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            WardFlow decides. Quantum signs the receipt.
          </p>
        </header>

        <section className="space-y-6">
          <Card>
            <h2 className="mb-3 text-lg font-semibold">What this means in plain English</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The ward round board still sorts patients and jobs the normal way — fast,
              explainable, and entirely classical. Nothing about the clinical decision
              changes.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The quantum layer is a tiny, tamper-evident stamp. Think of it like a
              notary seal on the handover envelope: it proves the list was agreed at a
              specific moment and cannot be quietly edited afterwards. The incoming
              shift can check the receipt instead of relying on memory.
            </p>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">The toy example</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Imagine four outstanding jobs at the end of a shift:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-bedside" />
                <span>Bedside bloods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-imaging" />
                <span>Imaging request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-review" />
                <span>Clinical review for a high NEWS score</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-referral" />
                <span>Referral to another specialty</span>
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We want to split them into a <strong>NOW</strong> shift and a{" "}
              <strong>NEXT</strong> shift so the most conflicting pairs land in different
              shifts. That conflict puzzle is a classic computer-science problem called
              Max-Cut. Here it is encoded as a 4-qubit circuit and sent to Quantinuum
              Nexus.
            </p>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">The 4-qubit circuit</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Each qubit represents one job. A measurement of <code>0</code> means "do it
              now"; <code>1</code> means "do it next shift". The circuit is a QAOA with
              p=1, angles γ=0.5 and β=0.4 (in halfturns).
            </p>
            <pre
              className={cn(
                "overflow-x-auto rounded-lg border border-border bg-black/40 p-4 font-mono text-xs leading-relaxed",
                "text-foreground/90",
              )}
            >
{`q0: ──H──■ZZ(1.5)────────────■ZZ(1.0)──Rx(0.4)──M
         │                    │
q1: ──H──■──────■ZZ(0.5)──────┼─────────Rx(0.4)──M
                  │           │
q2: ──H──────────■──■ZZ(2.0)──┼─────────Rx(0.4)──M
                     │        │
q3: ──H─────────────■─────────■─────────Rx(0.4)──M`}
            </pre>
            <p className="mt-3 text-sm text-muted-foreground">
              Edges (conflict weights): J0–J1 = 3, J1–J2 = 1, J2–J3 = 4, J3–J0 = 2.
            </p>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">Live receipt from Quantinuum Nexus</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Backend" value="H1-1LE emulator" />
              <Metric label="Shots" value="256" />
              <Metric label="Best patterns" value="0101, 1010" />
              <Metric label="Optimum mass" value="0.19" />
              <Metric label="Random guessing" value="0.125" />
              <Metric label="Verdict" value="PASS" highlight />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The two best answers appeared 19% of the time, well above the 12.5% you
              would expect from random guessing. That fingerprint is tied to this exact
              handover and stored as a receipt.
            </p>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">Honesty footnote</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This is intentionally a toy problem with synthetic dummy jobs. No patient
              data, NHS numbers, or clinical details ever touch the quantum layer. No
              speed or accuracy advantage over a classical computer is claimed. Quantum
              here is a verification seal, not the decision-maker.
            </p>
          </Card>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://github.com/arunnadarasa/tandem-hack-quantum"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2">
                View the repo
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            <Link to="/">
              <Button variant="outline">Return to Ward Round Board</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface/70 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-mono text-sm font-semibold",
          highlight ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
