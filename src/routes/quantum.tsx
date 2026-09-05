import * as React from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Atom, ArrowLeft, Download, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SKILLS: {
  name: string;
  version: string;
  summary: string;
  tags: string[];
  file: string;
  github?: string;
  note?: string;
  extras?: { label: string; file: string }[];
}[] = [

  {
    name: "quantinuum",
    version: "1.1.0",
    summary:
      "Write real quantum circuits in Python with @guppy, run shots on the Selene emulator, and cross-check offline with TKET — plus the healthcare triage kernels (QUBO, biomarker features, attestation) and the receipt discipline used on this page.",
    tags: ["quantum", "guppy", "selene", "pytket", "quantinuum", "healthcare", "terminal"],
    file: "/skills/quantinuum-SKILL.md",
    github:
      "https://github.com/arunnadarasa/tandem-hack-quantum/blob/main/skills/quantinuum/SKILL.md",
  },
  {
    name: "telegram-quantum-hermes",
    version: "1.1.0",
    summary:
      "Run Nexus, Aqora and Marimo quantum jobs from Telegram through the unified Hermes runner and the /nexus slash dispatcher — backends, pathway, attestation, bench, status and jobs.",
    tags: ["quantum", "telegram", "nexus", "aqora", "marimo", "terminal"],
    file: "/skills/telegram-quantum-hermes-SKILL.md",
    github:
      "https://github.com/arunnadarasa/tandem-hack-quantum/blob/main/skills/telegram-quantum-hermes/SKILL.md",
  },
  {
    name: "wardflow-quantum (Claude Code)",
    version: "1.0.0",
    summary:
      "The project constitution for Claude Code: classical decides and quantum only signs the receipt, every number carries its shots and envelope, honest negatives ship as-is, one cited method upgrade then the verdict stands — plus the backend lane map, Helios Guppy quirks and pytket traps. Shipped in the repo at both skills/claude-code/ and .claude/skills/wardflow-quantum/.",
    tags: ["quantum", "claude-code", "quantinuum", "receipts", "methodology"],
    file: "/skills/wardflow-quantum-claude-code-SKILL.md",
    github:
      "https://github.com/arunnadarasa/tandem-hack-quantum/blob/main/skills/claude-code/SKILL.md",
  },
  {
    name: "tandem-hack-quantum (OpenClaw)",
    version: "1.0.0",
    summary:
      "The OpenClaw edition by Arun Nadarasa and the WardFlow quantum team: the same evidence constitution — receipt law, honest-negative discipline, the no-advantage wording rule and DPIA-green synthetic data — with the verified backend lane map and the Telegram team lane, so any OpenClaw agent produces committed, verifiable quantum work.",
    tags: ["quantum", "openclaw", "nexus", "qaoa", "fvqe", "wardflow"],
    file: "/skills/openclaw-tandem-hack-quantum-SKILL.md",
    github:
      "https://github.com/arunnadarasa/tandem-hack-quantum/blob/main/skills/openclaw/SKILL.md",
  },
  {
    name: "quantum-clinical-safety",
    version: "1.0.0",
    summary:
      "Makes every quantum claim about a health tool hazard-led instead of feature-led: cause → hazard → hazardous situation → harm → control → residual rating, inside DCB0129/DCB0160, DTAC, DPIA and the UK MDR decision-support boundary. House rules travel with it — hazards are never closed, only rated and left open; emulator is not hardware; a filename is not a receipt; no efficacy or deployment claims; CSC-QT gives a per-domain readiness picture and never a score or pass mark.",
    tags: ["clinical-safety", "dcb0129", "dcb0160", "dtac", "dpia", "csc-qt"],
    file: "/skills/quantum-clinical-safety/SKILL.md",
    note: "Written against a sibling project (EndoTrack) and published here as the reusable safety discipline this section follows — it is not a WardFlow safety case.",
    extras: [
      { label: "references/hazard-log.md", file: "/skills/quantum-clinical-safety/references/hazard-log.md" },
      { label: "references/standards.md", file: "/skills/quantum-clinical-safety/references/standards.md" },
      { label: "references/csc-qt.md", file: "/skills/quantum-clinical-safety/references/csc-qt.md" },
      { label: "references/release-gate.md", file: "/skills/quantum-clinical-safety/references/release-gate.md" },
    ],
  },
];

const INSTALL_LANES: { lane: string; steps: string[] }[] = [
  {
    lane: "Lovable",
    steps: [
      "Download the SKILL.md file.",
      "Put it at .agents/skills/<skill-name>/SKILL.md in your project.",
      "If the skill ships a references/ folder, keep it alongside SKILL.md.",
      "Activate it in Settings › Skills.",
      "The frontmatter name and description are what make it load on the right task — keep them intact.",
    ],
  },

  {
    lane: "Claude Code",
    steps: [
      "Download the Claude Code skill.",
      "Save it at .claude/skills/wardflow-quantum/SKILL.md in your repository.",
      "Claude Code picks it up automatically when you work on quantum circuits or edit any surface that cites receipt numbers.",
      "Keep AGENT_SOUL.md and docs/clinical-quantum-methodology.md nearby — the skill loads them alongside itself.",
    ],
  },
  {
    lane: "OpenClaw",
    steps: [
      "Download the OpenClaw skill and keep its folder name.",
      "Drop the folder into your agent's skills directory.",
      "The frontmatter name, description, version and tags are what make it trigger — leave them untouched.",
    ],
  },
  {
    lane: "Hermes",
    steps: [
      "Download the file and keep its folder name.",
      "Drop the folder into the agent's skills directory.",
      "The metadata.hermes block already carries the tags, category and requires_toolsets: [terminal] that Hermes reads.",
    ],
  },
  {
    lane: "Telegram",
    steps: [
      "Install telegram-quantum-hermes on the agent behind the bot.",
      "Drive it from chat: /nexus help, /nexus backends, /nexus pathway, /nexus attestation, /nexus bench, /nexus status <id>.",
      "Plain-English mode proposes the qubits, shots and backend for you, then waits for a yes before submitting.",
    ],
  },
];


export const Route = createFileRoute("/quantum")({
  head: () => ({
    meta: [
      { title: "Quantum-verified handover (WardFlow)" },
      {
        name: "description",
        content:
          "WardFlow sorts ward jobs classically; Quantinuum receipts stamp the handover — 98 qubits in a perfect GHZ plus a parity receipt on Helios (256/256 shots each) and 100% optimum mass after F-VQE. No quantum advantage claimed.",
      },
      { property: "og:title", content: "Quantum-verified handover (WardFlow)" },
      {
        property: "og:description",
        content:
          "Helios's full 98-qubit capacity receipted in one day — perfect GHZ and Iceberg-style parity check — plus a 4-qubit shift split at 100% optimum mass. Receipts for everything, advantage claimed for nothing.",
      },

      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: QuantumPage,
});

const COUNTS: { state: string; count: number; optimal?: boolean }[] = [
  { state: "0001", count: 46 },
  { state: "1111", count: 41 },
  { state: "0000", count: 36 },
  { state: "1110", count: 35 },
  { state: "0101", count: 23, optimal: true },
  { state: "1010", count: 25, optimal: true },
];

const FVQE: { stage: string; mass: string; best?: boolean }[] = [
  { stage: "Uniform baseline", mass: "12.5%" },
  { stage: "Untrained QAOA (H1-1LE)", mass: "18.75%" },
  { stage: "F-VQE trained (H1-1LE, job bb1021a2)", mass: "100%", best: true },
];

const STATS: { value: string; label: string }[] = [
  {
    value: "98/98",
    label:
      "qubits — Helios's full published capacity — perfect GHZ plus tamper-evident parity receipt, 256/256 shots each",
  },
  { value: "100%", label: "optimum-state mass after F-VQE training — 256/256 shots" },
  {
    value: "4q → 98q",
    label: "scale ladder receipted in ONE day, every rung a live Nexus job ID",
  },
  {
    value: "CQM v1.3",
    label: "the methodology itself upgraded and versioned from this hack",
  },
];

const HELIOS_98: { backend: string; job: string; result: string; status: string }[] = [
  {
    backend: "98q GHZ — one qubit per job, whole hospital",
    job: "b3d1c274",
    result: "Perfect: 256/256 shots, GHZ-mass 1.0000 at Helios's full published capacity",
    status: "PASS",
  },
  {
    backend: "98q Iceberg-style parity receipt",
    job: "8eddb96d",
    result:
      "Perfect: 256/256 shots with 8 block-parity checks folded in — any tamper breaks a parity, detectably",
    status: "PASS",
  },
];


const HELIOS: { program: string; job: string; result: string }[] = [
  {
    program: "26q GHZ — all ward jobs entangled",
    job: "0fc1f87b",
    result:
      "Perfect: 512/512 shots on all-NOW / all-NEXT, GHZ-mass 1.0000 — only 2 outcomes from a 67-million-state space",
  },
  {
    program: "26q QAOA — whole-ward split",
    job: "67f9d2f4",
    result:
      "Mean cut 43.61 vs 43.05 uniform; explores, doesn't concentrate — F-VQE is the known fix",
  },
];

const HELIOS_RECEIPTS: { backend: string; job: string; result: string; status?: string }[] = [
  {
    backend: "Helios-1E-lite (HUGR)",
    job: "0fc1f87b",
    result: "512/512 shots, GHZ-mass 1.0000 — 2 outcomes from 67M states",
    status: "PASS",
  },
  {
    backend: "Helios-1E-lite (HUGR)",
    job: "67f9d2f4",
    result: "Mean cut 43.61 vs 43.05 uniform; explores, doesn't concentrate",
    status: "HONEST",
  },
];

const HONESTY = [
  "Small circuit (4 qubits, 10 edges) — a hackathon toy.",
  "5 of 6 backends receipted (Aer fixed via AerConfig); sv1 is an honest gap (needs an AWS bucket).",
  "8 qubits at p=2: mean sampled cut beats uniform on all 4 backends, but optimum mass is tiny — an honest negative.",
  "26 qubits is 'hardware-scale readiness', never 'quantum advantage' — it is still classically simulable.",
  "26q GHZ slide beat: “We entangled all 26 qubits — one per ward job — on Quantinuum's next-gen Helios stack. Every one of 512 shots collapsed to all-NOW or all-NEXT: textbook GHZ, receipt attached.” (job 0fc1f87b)",
  "The classical sort stays the decision-maker.",
  "No quantum advantage claimed — this is a tamper-evident seal, not a classifier.",
];

const DEMO = [
  "“WardFlow decides.”",
  "Jobs list, status colours, handover export.",
  "The 4-qubit circuit — edges are walking and conflict weights.",
  "H1-1LE receipts: optimum mass 0.19 vs 0.125 uniform.",
  "Live demo: pick 4 jobs, show the shift split, copy the Nexus job link.",
];

const PLAIN: { title: string; body: string }[] = [
  {
    title: "Classical stays in charge",
    body: "WardFlow sorts the ward's jobs the normal, fast, explainable way. Nothing about the decision changes.",
  },
  {
    title: "A real quantum job stamps it",
    body: "Four jobs, split into NOW vs NEXT shifts, handed to Quantinuum Nexus as a 4-qubit puzzle (Max-Cut). The best score is 10, reached by exactly two patterns: 0101 and 1010.",
  },
  {
    title: "The receipt is live and checkable",
    body: "On H1-1LE, 256 shots landed on those best patterns 19% of the time; random guessing gives 12.5%. That fingerprint is tied to this handover and can't be quietly edited afterwards.",
  },
  {
    title: "Why it matters",
    body: "Handovers are where ward jobs get lost. A tamper-evident receipt means the incoming shift can prove what was agreed, not just remember it.",
  },
];

const CARD_FIELDS: { label: string; value: string }[] = [
  { label: "Name", value: "WardFlow Quantum Capability Layer" },
  { label: "Version", value: "1.0 · 2026-09-05 (single-day build)" },
  { label: "Owner", value: "Arun Nadarasa · Association for Clinical Quantum" },
  { label: "Repository", value: "arunnadarasa/tandem-hack-quantum" },
  { label: "Licence", value: "Open hackathon artifact · Nexus T&Cs govern backends" },
  { label: "Methodology", value: "Clinical Quantum Methodology v1.3" },
  { label: "Hardware family", value: "Quantinuum trapped-ion: H1 20q · H2 56q · Helios 98q" },
  { label: "Execution tier", value: "Emulators only — no QPU run claimed" },
  { label: "Simulator classes", value: "Statevector ≤26q · stabilizer 98q · noisy H1/H2-Em" },
  { label: "Programming lanes", value: "pytket → Nexus → execute · Guppy → HUGR (Helios)" },
  { label: "Native gates", value: "1q rotations + ZZ / parameterised-angle ZZ" },
  { label: "Uncertainty envelope", value: "4·√(0.5/shots) — 0.088 @256, 0.0625 @512" },
];

const INTENDED_USE = [
  "Primary use: tamper-evident execution receipts for ward-round handover — the classical WardFlow sort stays the decision-maker; the quantum layer stamps the agreed shift split with a checkable sampling fingerprint.",
  "Intended users: hackathon judges, NHS digital teams evaluating quantum readiness, clinical quantum researchers.",
];

const OUT_OF_SCOPE = [
  "Not clinical decision-making.",
  "No patient-data processing — synthetic jobs only, DPIA GREEN.",
  "No claim of quantum speed or accuracy advantage.",
  "Not production deployment.",
];

const TRUST: { label: string; value: string }[] = [
  { label: "Cataloged", value: "Skill, persona and methodology versioned in-repo" },
  { label: "Scanned", value: "Secret-scan before every push; no hidden instructions" },
  { label: "Evaluated", value: "With/without discipline: 0.1875 → 1.0000, receipts diffable" },
  { label: "Signed", value: "Not yet — detached receipt signatures are future work" },
  { label: "Documented", value: "This card (QUANTUM_CARD.md v1.0)" },
];

const CIRCUITS: {
  circuit: string;
  qubits: string;
  backend: string;
  job: string;
  result: string;
  verdict: string;
  pass?: boolean;
}[] = [
  {
    circuit: "Shift-split QAOA p=1",
    qubits: "4",
    backend: "H1-1LE, H2-1LE, H1/H2-Em, Aer",
    job: "7f8ad56f +4",
    result: "opt-mass 0.125–0.1875 vs 0.125 uniform",
    verdict: "weak PASS",
    pass: true,
  },
  {
    circuit: "Shift-split F-VQE (Amaro 2022)",
    qubits: "4",
    backend: "H1-1LE",
    job: "bb1021a2",
    result: "opt-mass 1.0000 (256/256 shots)",
    verdict: "PASS — method-validated",
    pass: true,
  },
  {
    circuit: "Shift-split QAOA p=2",
    qubits: "8",
    backend: "4 backends",
    job: "e7e1a809 +3",
    result: "mean-cut > uniform; opt-mass 0.01–0.04",
    verdict: "honest negative",
  },
  {
    circuit: "Whole-ward QAOA p=1",
    qubits: "26",
    backend: "Helios-1E-lite (HUGR)",
    job: "67f9d2f4",
    result: "mean-cut 43.61 vs 43.05",
    verdict: "explores, doesn't concentrate",
  },
  {
    circuit: "Whole-ward GHZ",
    qubits: "26",
    backend: "Helios-1E-lite (HUGR)",
    job: "0fc1f87b",
    result: "512/512 shots, GHZ-mass 1.0",
    verdict: "PASS",
    pass: true,
  },
  {
    circuit: "Hospital-scale GHZ",
    qubits: "98",
    backend: "Helios-1E-lite (stabilizer)",
    job: "b3d1c274",
    result: "256/256 shots, 2 outcomes from a 3×10²⁹ space",
    verdict: "PASS",
    pass: true,
  },
  {
    circuit: "Parity attestation (Iceberg-style)",
    qubits: "98 (90 data + 8 parity)",
    backend: "Helios-1E-lite (stabilizer)",
    job: "8eddb96d",
    result: "256/256 shots, parities consistent",
    verdict: "PASS — tamper-evidence",
    pass: true,
  },
];

const EVALUATION = [
  "Pre-registered bars: decision rules fixed in ward_shift_protocol.json before submission — PASS = optimum-mass ≥ uniform − envelope.",
  "Classical baselines stated per run: brute-force optimum at 4q and 8q, 10k-sample uniform-random mean cut at 26q.",
  "Reproducibility: seeds fixed (11/31), shots recorded, packages pinned (guppylang 1.0.x, pytket 2.18.1, qnexus), and a submit-journal so job IDs survive process death.",
  "Honest verification gap: emulator results are classically simulable by construction — no classically-unverifiable claim exists here.",
];

const LIMITATIONS = [
  "No quantum advantage. Binding wording: emulator scale runs are 'hardware-scale readiness'. Advantage is a pre-registered future claim gated on real QPU plus matched classical baselines.",
  "Unoptimised variational circuits explore rather than concentrate (8q, 26q QAOA). F-VQE fixes this at 4q; scaling F-VQE training is untested here.",
  "The 98-qubit lane is Clifford-only (stabilizer) — it certifies entanglement scale and parity structure, not optimisation.",
  "sv1 (Braket) gap: needs an AWS S3 bucket; local execution hit a Nexus 500. Recorded, not retried blind.",
  "Emulator noise models are not hardware — noisy-emulator receipts approximate but do not replace QPU characterisation.",
];

const CQM_VALUES: { value: string; over: string }[] = [
  { value: "Problem-first", over: "Demonstration of technology" },
  { value: "Reproducible workflow", over: "A single headline accuracy" },
  { value: "Honest negatives", over: "Strained positives" },
  { value: "Clinical safety", over: "Speed and hype" },
];

const CQM_PHASES = [
  "Discovery — define the clinical problem, not the technology",
  "Data shape — DPIA by design, GREEN synthetic data only",
  "Bulletproof protocol — evidence scan, reject gates, pre-registration",
  "Toy — smallest honest circuit, locked config, receipt required",
  "Scale — same seed line, classical baseline at every rung",
  "Minimum quantum advantage — an explicit go/no-go gate",
  "Clinical integration — NHS pathway, hazard log, safety sign-off",
  "Surveillance — continuous outcomes and incident reporting",
];

const REFERENCES = [
  "Everitt & Ji, Model Cards for Quantum Technologies Reporting, arXiv:2412.13151 — card structure.",
  "NVIDIA-Verified Agent Skills (docs.nvidia.com/skills) — trust-pipeline structure.",
  "Amaro et al., Filtering variational quantum algorithms for combinatorial optimization, Quantum Sci. Technol. 7 015021 (2022) — the F-VQE method.",
  "Jin, He, Amaro et al., arXiv:2504.21172 — Iceberg parity-check pattern.",
  "Niroula et al., arXiv:2511.03689 — Helios 98-qubit real-time execution.",
  "Quantinuum H2 and Helios product data sheets — hardware numbers, never invented.",
  "Oskrochi Y & Grimes K, CSC-QT: a quality assessment tool for DCB0129/DCB0160 clinical safety cases, BMJ Innovations (2026), doi 10.1136/bmjinnov-2026-001660 — clinical safety review structure.",
];

const LIFECYCLE: { label: string; value: string }[] = [
  { label: "Clinical Safety Officer", value: "Arun Nadarasa, GPhC 2080128" },
  {
    label: "Release authority",
    value: "A named registered individual — never a team or a process",
  },
  { label: "Lifecycle status", value: "Pre-deployment" },
  { label: "Live patient data", value: "None has ever entered the system" },
  { label: "Deployment", value: "No NHS organisation has deployed it" },
  {
    label: "Clinical authority to release",
    value: "Not sought",
  },
];

const HAZARDS: {
  id: string;
  cause: string;
  hazard: string;
  situation: string;
  harm: string;
  controls: string[];
  residual: string;
  band: "acceptable" | "undesirable" | "unacceptable";
}[] = [
  {
    id: "QH-01",
    cause: "Ranking presented without its decision-support boundary",
    hazard: "Ranking mistaken for a triage decision",
    situation: "A clinician defers to the displayed order instead of reviewing it",
    harm: "Harm-1 — delayed review of a deteriorating patient",
    controls: ["QC-01", "QC-06"],
    residual: "2 — acceptable",
    band: "acceptable",
  },
  {
    id: "QH-02",
    cause: "Unoptimised QAOA explores rather than concentrates (8q, 26q)",
    hazard: "A weak split presented as an agreed one",
    situation: "A shift split with near-uniform mass is stamped and handed over",
    harm: "Harm-2 — a ward job is allocated to the wrong shift and slips",
    controls: ["QC-02", "QC-03"],
    residual: "3 — undesirable, CSO sign-off",
    band: "undesirable",
  },
  {
    id: "QH-03",
    cause: "The 98-qubit lane is Clifford-only (stabilizer)",
    hazard: "An entanglement-scale receipt read as an optimisation result",
    situation: "A reviewer credits scheduling capability the run never demonstrated",
    harm: "Harm-3 — a capability decision taken on evidence that does not support it",
    controls: ["QC-04", "QC-05"],
    residual: "2 — acceptable",
    band: "acceptable",
  },
  {
    id: "QH-04",
    cause: "All runs are emulator runs; no QPU execution is claimed",
    hazard: "An emulator receipt read as hardware evidence",
    situation: "Procurement over-states readiness on simulated-only work",
    harm: "Harm-3 — a capability decision taken on evidence that does not support it",
    controls: ["QC-04", "QC-05"],
    residual: "2 — acceptable",
    band: "acceptable",
  },
  {
    id: "QH-05",
    cause: "The signature path is ECDSA, not post-quantum",
    hazard: "Receipt provenance is not quantum-safe end to end",
    situation: "A future adversary forges a receipt signature retrospectively",
    harm: "Harm-4 — an audit trail that cannot be relied on",
    controls: ["QC-05", "QC-07"],
    residual: "3 — undesirable, CSO sign-off",
    band: "undesirable",
  },
  {
    id: "QH-06",
    cause: "The cohort behind a result is swapped without a binding",
    hazard: "Silent substitution of the inputs a receipt attests to",
    situation: "An audit cannot reconstruct what was actually run",
    harm: "Harm-4 — an audit trail that cannot be relied on",
    controls: ["QC-07", "QC-05"],
    residual: "2 — acceptable",
    band: "acceptable",
  },
];

const CONTROLS: { id: string; control: string; status: string }[] = [
  {
    id: "QC-01",
    control:
      "Binding wording on every surface: the classical sort remains the decision-maker; the quantum layer stamps, it does not rank.",
    status: "In place",
  },
  {
    id: "QC-02",
    control:
      "Pre-registered pass bar in ward_shift_protocol.json, fixed before submission — not moved afterwards.",
    status: "In place",
  },
  {
    id: "QC-03",
    control:
      "Uncertainty envelope 4·√(0.5/shots) applied to every probability claim (0.088 at 256 shots), with the classical baseline stated per run.",
    status: "In place",
  },
  {
    id: "QC-04",
    control:
      "Execution tier declared per run — emulator is never written as hardware; simulated-only work enters at its own tier.",
    status: "In place",
  },
  {
    id: "QC-05",
    control:
      "Receipt discipline: engine, shot count, seed (11/31), pinned packages and job ID on every claim, held in a submit journal that survives process death.",
    status: "In place",
  },
  {
    id: "QC-06",
    control:
      "Named approval for every state change — no auto-booking, no discharge, no diagnosis.",
    status: "In place",
  },
  {
    id: "QC-07",
    control:
      "Merkle-bound cohort provenance with on-chain anchoring, so the cohort behind a result cannot be swapped silently.",
    status: "Planned",
  },
];

const RATING_BANDS: { band: string; meaning: string }[] = [
  { band: "1–2", meaning: "Acceptable" },
  { band: "3", meaning: "Undesirable — CSO sign-off required" },
  { band: "4–5", meaning: "Unacceptable — do not deploy" },
];

const STANDARDS: { instrument: string; binds: string; demands: string }[] = [
  {
    instrument: "DCB0129",
    binds: "Us, as manufacturer",
    demands:
      "Hazard log, Clinical Safety Case Report, named Clinical Safety Officer before any deployment.",
  },
  {
    instrument: "DCB0160",
    binds: "The deploying NHS organisation",
    demands:
      "Local hazard assessment, local controls, training, local CSO signature.",
  },
  {
    instrument: "DTAC section C1",
    binds: "Procurement",
    demands:
      "DCB0129 conformity, or an exceptional non-applicability rationale — which we do not claim.",
  },
  {
    instrument: "UK MDR",
    binds: "The boundary",
    demands:
      "Ranking for human review is decision support; acting on the ranking is a device. We stay on the decision-support side.",
  },
  {
    instrument: "DPIA / UK GDPR, ICO",
    binds: "Data",
    demands:
      "DPIA written prospectively; ICO Tech Horizons 2025 sets the quantum-in-healthcare expectation.",
  },
  {
    instrument: "EU AI Act (in force 2 Aug 2026)",
    binds: "Disclosure",
    demands:
      "AI must identify itself; generated content needs machine-readable marking.",
  },
  {
    instrument: "FDA CDRH GenAI discussion paper (Aug 2026)",
    binds: "Design discipline only",
    demands:
      "Cited as a request for feedback, never as a requirement.",
  },
];

const CSC_READINESS: { domain: string; readiness: string }[] = [
  {
    domain: "Scope and context",
    readiness:
      "Partial — system, intended use, users and pre-deployment context are stated and versioned; no organisational deployment context exists to describe.",
  },
  {
    domain: "Risk management process",
    readiness:
      "Partial — pre-registered pass bars and a fixed 5×5 scale are in use; a full documented process under DCB0129 is not started.",
  },
  {
    domain: "Hazard identification and analysis",
    readiness:
      "Partial — the hazard log above plus a published register of honest negatives; no multidisciplinary hazard workshop has been held.",
  },
  {
    domain: "Risk control and evidence",
    readiness:
      "Partial — six controls in place with receipts (job ID, shots, seed, pinned packages); QC-07 cohort binding is planned, not started.",
  },
  {
    domain: "Governance and lifecycle",
    readiness:
      "Planned — a named CSO exists; per-release safety impact tagging, hazard assessment per change and an uplifted CSCR are not started.",
  },
];

const SYNERGY: { direction: string; points: string[] }[] = [
  {
    direction: "Quantum work strengthens the safety case",
    points: [
      "Merkle-bound cohort provenance means the cohort behind a result cannot be swapped silently.",
      "On-chain anchoring gives an immutable audit trail rather than a filename.",
      "The published negative record supplies failure evidence — normally the weakest part of a safety case.",
    ],
  },
  {
    direction: "Clinical safety constrains the quantum work",
    points: [
      "Every claim must be expressible as cause → hazard → hazardous situation → harm → control → residual rating, or it is a capability statement, not a safety statement.",
      "A pre-registered KPI gate replaces a bar that can be moved after the result.",
      "Release passes a gate with a named signature, not a green build.",
    ],
  },
];
const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "plain-english", label: "Plain English" },
  { id: "4q-maxcut", label: "4-qubit split" },
  { id: "live-receipts", label: "Receipts" },
  { id: "f-vqe", label: "F-VQE" },
  { id: "helios", label: "Helios" },
  { id: "model-card", label: "Model card" },
  { id: "circuits", label: "Circuits" },
  { id: "evaluation", label: "Evaluation" },
  { id: "clinical-safety", label: "Safety" },
  { id: "skills", label: "Skills" },
  { id: "cqm", label: "CQM" },
  { id: "references", label: "References" },
  { id: "honesty", label: "Honesty" },
  { id: "demo", label: "Demo" },
  { id: "backend-receipts", label: "Backends" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");
  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function JumpNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="panel sticky top-4 z-30 mb-6 rounded-2xl p-2">
      <div
        className="flex gap-1.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              active === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/30 bg-primary/10 text-primary hover:bg-accent/50",
            )}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("top")}
          className="shrink-0 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent/50"
        >
          Top
        </button>
      </div>
    </nav>
  );
}

function QuantumPage() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  return (
    <main className="app-canvas min-h-screen px-4 py-8 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1.5 pl-2">
              <ArrowLeft className="h-4 w-4" />
              Back to board
            </Button>
          </Link>
        </div>

        <header className="panel rise-in relative mb-10 overflow-hidden rounded-3xl p-7 sm:p-9">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: "color-mix(in oklab, var(--primary) 55%, transparent)" }}
          />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
              <Atom className="h-3.5 w-3.5" />
              Quantum capability layer
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              WardFlow sorts the jobs{" "}
              <span className="text-primary">classically</span> — quantum stamps a
              tamper-evident receipt for handover.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              All 26 qubits — one per ward job — entangled in a perfect GHZ state on{" "}
              <strong className="text-foreground">Quantinuum Helios</strong> (512/512 shots,
              job <code>0fc1f87b</code>), and a 4-qubit shift split driven to{" "}
              <strong className="text-foreground">100% optimum mass</strong> with
              Quantinuum&apos;s own F-VQE method (job <code>bb1021a2</code>). Receipts for
              everything, advantage claimed for nothing.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.value}
                  className="lift rounded-2xl border border-primary/25 bg-primary/8 p-4"
                >
                  <p className="font-display text-3xl font-extrabold tabular-nums text-primary">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <JumpNav active={active} />

        <section className="space-y-6">
          <Card id="problem">
            <H2>The problem: where jobs get lost in handovers</H2>
            <P>
              Junior doctors lose ward-round time <strong>criss-crossing</strong> bays and
              chasing jobs. WardFlow fixes the sorting — free-text plans become a job
              list, status-checked, filtered, handheld.
            </P>
            <P>
              But handovers are where jobs get <strong>lost</strong>. The outgoing shift{" "}
              <em>remembers</em> what was agreed. The incoming shift can&apos;t{" "}
              <em>prove</em> it.
            </P>
            <p className="mt-3 text-sm font-semibold text-primary">
              Quantum provides the proof.
            </p>
          </Card>

          <Card id="plain-english">
            <H2>In plain English</H2>
            <P>WardFlow decides. Quantum signs the receipt.</P>
            <div className="mt-4 space-y-3">
              {PLAIN.map((p) => (
                <div
                  key={p.title}
                  className="rounded-lg border border-border bg-surface/70 px-3 py-2"
                >
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Honesty footnote: toy problem, synthetic data, emulator run. No speed or
              accuracy advantage over classical is claimed — quantum here is a verification
              seal, not the decision-maker.
            </p>
          </Card>



          <Card id="4q-maxcut">
            <H2>4 qubits → NOW/NEXT split (Max-Cut)</H2>
            <P>
              Four high-impact jobs become four qubits, on a weighted ring: J0–J1, J1–J2,
              J2–J3, J3–J0, with cross-bay chords. The goal is to{" "}
              <strong>maximise separated conflict</strong> — if J0 blocks J3, they stay in
              different shifts (NOW vs NEXT).
            </P>
            <pre
              className={cn(
                "mt-4 overflow-x-auto rounded-lg border border-border bg-black/40 p-4 font-mono text-xs leading-relaxed",
                "text-foreground/90",
              )}
            >
{`q0: ──H──■ZZ(1.5)────────────■ZZ(1.0)──Rx(0.4)──M
         │                    │
q1: ──H──■──────■ZZ(0.5)──────┼─────────Rx(0.4)──M
                │             │
q2: ──H─────────■──■ZZ(2.0)───┼─────────Rx(0.4)──M
                   │          │
q3: ──H────────────■──────────■─────────Rx(0.4)──M`}
            </pre>
            <P>
              Classical optimum: <strong>cut = 10</strong>, states <code>0101</code> or{" "}
              <code>1010</code> (brute-force verified). QAOA p=1 angles are unoptimised
              and the optimal patterns rank #5/#6 — honest, not claimed.
            </P>
          </Card>

          <Card id="live-receipts">
            <H2>Live Nexus receipts (6 backends)</H2>
            <P>
              256 shots on the H1-1LE emulator, job <code>7f8ad56f</code>:
            </P>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-3 py-2 text-right text-[11px] uppercase tracking-wider">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COUNTS.map((r) => (
                    <tr key={r.state} className="border-t border-border">
                      <td
                        className={cn(
                          "px-3 py-1.5 font-mono",
                          r.optimal && "font-semibold text-primary",
                        )}
                      >
                        {r.state}
                        {r.optimal && (
                          <span className="ml-2 text-[11px] font-normal uppercase tracking-wider">
                            optimum
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono">{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Metric label="Backend" value="H1-1LE emulator" />
              <Metric label="Shots" value="256" />
              <Metric label="Optimum mass" value="18.75%" />
              <Metric label="Uniform baseline" value="12.5%" />
              <Metric label="Envelope 4√(0.5/256)" value="≈ 0.088" />
              <Metric label="Verdict" value="PASS" highlight />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Receipt reference: <code className="font-mono text-foreground">job 7f8ad56f</code>
            </p>


            <p className="mt-4 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              Technical note: the job runs on the <strong>hardware-qualified</strong>{" "}
              simulator H1-1LE, not a QPU. The receipt is execution integrity — not a
              speed or accuracy advantage.
            </p>
          </Card>

          <Card id="f-vqe">
            <H2>F-VQE upgrade: every shot on the optimum</H2>
            <P>
              We then applied <strong>Quantinuum&apos;s own published scheduling method</strong>{" "}
              (Amaro et al. 2022, filtering-VQE for job scheduling) to the same 4-job
              problem.
            </P>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-3 py-2 text-right text-[11px] uppercase tracking-wider">
                      Optimum-state mass
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FVQE.map((r) => (
                    <tr key={r.stage} className="border-t border-border">
                      <td
                        className={cn(
                          "px-3 py-1.5",
                          r.best && "font-semibold text-primary",
                        )}
                      >
                        {r.stage}
                      </td>
                      <td
                        className={cn(
                          "px-3 py-1.5 text-right font-mono",
                          r.best && "font-semibold text-primary",
                        )}
                      >
                        {r.mass}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              Trained run: job <code>bb1021a2</code> on H1-1LE — 256/256 shots on{" "}
              <code>1010</code>/<code>0101</code>. Training curve (noiseless statevector,
              120 iterations): 11% → 64% → 97% → 100%.
            </P>
            <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/90">
              “We reported the naive circuit&apos;s weak result honestly — then applied the
              vendor&apos;s own published method and put every single shot on the optimum.
              Receipt attached.”
            </blockquote>
            <p className="mt-4 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              Honest scope: training is classical (standard VQE practice); the certificate
              is the final trained circuit sampled on H1-1LE. 4 qubits stays classically
              checkable — still no advantage claim.
            </p>
          </Card>

          <Card id="helios">
            <H2>Helios: the whole ward on the next-gen stack</H2>
            <P>
              We scaled from 4 jobs to the <strong>whole ward: 26 jobs = 26 qubits</strong>,
              run natively on <strong>Helios-1E-lite</strong> — Quantinuum&apos;s
              next-generation system (roadmap: Helios → Sol → Apollo). Helios doesn&apos;t
              take ordinary circuits: programs are written in <strong>Guppy</strong>
              {" "}(quantum-first Python), compiled to <strong>HUGR</strong>, and executed
              directly. We ran that lane end-to-end from a laptop.
            </P>
            <div className="mt-4 space-y-3">
              {HELIOS.map((h) => (
                <div
                  key={h.job}
                  className="rounded-lg border border-border bg-surface/70 px-3 py-2.5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{h.program}</p>
                    <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                      {h.job}
                    </code>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {h.result}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-border bg-surface/70 p-4">
              <H2>Helios backend receipts</H2>
              <div className="grid gap-3 sm:grid-cols-2">
                {HELIOS_RECEIPTS.map((r) => (
                  <div
                    key={r.job}
                    className="rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {r.backend}
                    </p>
                    <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                      {r.result}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                        job {r.job}
                      </code>
                      <span className="text-xs font-medium text-primary">{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <P>
              <strong>Why judges should care:</strong> the Helios runtime supports real-time
              classical compute in-loop (mid-circuit measurement, qubit reuse — published at
              98 qubits). WardFlow&apos;s growth path: receipts that <em>react</em> to
              outcomes mid-execution, not just sample a fixed circuit.
            </P>
            <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/90">
              “We entangled all 26 qubits — one per ward job — on Quantinuum&apos;s next-gen
              Helios stack. Every one of 512 shots collapsed to all-NOW or all-NEXT: textbook
              GHZ, receipt attached. Tamper with a GHZ-signed record and the correlation
              pattern breaks detectably.”
            </blockquote>

            <div className="mt-6 rounded-lg border border-primary/25 bg-primary/5 p-4">
              <H2>98-qubit finale: Helios&apos;s entire published capacity</H2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                We then ran the full stack: a 98q GHZ (one qubit per job, whole hospital)
                and a 98q Iceberg-style parity receipt. Both perfect. Scale ladder in one
                day: <strong className="text-foreground">4q → 8q → 26q → 98q</strong>, every
                step receipted.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {HELIOS_98.map((r) => (
                  <div
                    key={r.job}
                    className="rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {r.backend}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{r.result}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                        job {r.job}
                      </code>
                      <span className="text-xs font-medium text-primary">{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              Scale wording (binding): 26 qubits on an emulator is{" "}
              <em>hardware-scale readiness</em>, never <em>quantum advantage</em> — it stays
              classically simulable. Advantage is a pre-registered future claim.
            </p>
          </Card>



          <Card id="model-card">
            <H2>Quantum model card (v1.0)</H2>
            <P>
              Structured per Everitt &amp; Ji, <em>Model Cards for Quantum Technologies
              Reporting</em> (arXiv:2412.13151), crossed with the NVIDIA verified-skill
              template — quantum transparency and agent-skill trust in one card.
            </P>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {CARD_FIELDS.map((f) => (
                <Metric key={f.label} label={f.label} value={f.value} />
              ))}
            </div>

            <h3 className="mt-6 mb-2 text-sm font-semibold">Intended use</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {INTENDED_USE.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-2 text-sm font-semibold text-destructive">
              Out of scope
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {OUT_OF_SCOPE.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-2 text-sm font-semibold">Trust controls</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {TRUST.map((t) => (
                <Metric key={t.label} label={t.label} value={t.value} />
              ))}
            </div>
          </Card>

          <Card>
            <H2>Every circuit, every receipt</H2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    {["Circuit", "Qubits", "Backend(s)", "Job ID", "Result", "Verdict"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left text-[11px] uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {CIRCUITS.map((c) => (
                    <tr key={c.job} className="border-t border-border align-top">
                      <td className="px-3 py-2">{c.circuit}</td>
                      <td className="px-3 py-2 font-mono">{c.qubits}</td>
                      <td className="px-3 py-2 text-muted-foreground">{c.backend}</td>
                      <td className="px-3 py-2 font-mono text-xs">{c.job}</td>
                      <td className="px-3 py-2 text-muted-foreground">{c.result}</td>
                      <td
                        className={cn(
                          "px-3 py-2 text-xs font-semibold",
                          c.pass ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {c.verdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Job IDs are Nexus references, listed as text — the Nexus console needs an
              authenticated account.
            </p>
          </Card>

          <Card>
            <H2>Evaluation conditions &amp; limitations</H2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {EVALUATION.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 mb-2 text-sm font-semibold">Limitations &amp; risks</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {LIMITATIONS.map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <H2>Quantum Digital Clinical Safety</H2>
            <P>
              NHS digital health is assured through <strong>clinical safety cases</strong> —
              DCB0129 for manufacturers, DCB0160 for deploying organisations. A safety case
              is <em>hazard-led, not feature-led</em>: nothing is safe because it passed. It
              is safe when the ways it can hurt a patient are named, controlled and rated.
            </P>
            <P>
              Every quantum claim below is written as{" "}
              <span className="font-mono text-xs text-foreground">
                cause → hazard → hazardous situation → harm → control → residual rating
              </span>
              . A claim that cannot be written that way is a capability statement, and it is
              kept out of the safety case.
            </P>

            <h3 className="mt-6 mb-2 text-sm font-semibold">Accountability and lifecycle</h3>
            <dl className="grid gap-2 sm:grid-cols-2">
              {LIFECYCLE.map((l) => (
                <div key={l.label} className="rounded-lg border border-border bg-surface/70 px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l.label}
                  </dt>
                  <dd className="text-sm text-foreground">{l.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Intended use: rank and triage suspected-endometriosis-style referrals and ward
              jobs <strong>for clinician review</strong>. No diagnosis, no auto-booking, no
              discharge. Every state change needs a named approval.
            </p>

            <h3 className="mt-6 mb-2 text-sm font-semibold">Hazard log</h3>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[46rem] text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    {["ID", "Cause", "Hazard", "Hazardous situation", "Harm", "Controls", "Residual"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left text-[11px] uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {HAZARDS.map((h) => (
                    <tr
                      key={h.id}
                      id={h.id}
                      className="border-t border-border align-top scroll-mt-24"
                    >
                      <td className="px-3 py-2 font-mono text-xs font-semibold text-primary">
                        {h.id}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{h.cause}</td>
                      <td className="px-3 py-2 font-medium text-foreground">{h.hazard}</td>
                      <td className="px-3 py-2 text-muted-foreground">{h.situation}</td>
                      <td className="px-3 py-2 text-muted-foreground">{h.harm}</td>
                      <td className="px-3 py-2">
                        <span className="flex flex-wrap gap-1">
                          {h.controls.map((c) => (
                            <a
                              key={c}
                              href={`#${c}`}
                              className="font-mono text-xs text-primary underline underline-offset-2"
                            >
                              {c}
                            </a>
                          ))}
                        </span>
                      </td>
                      <td
                        className={cn(
                          "px-3 py-2 text-xs font-semibold",
                          h.band === "acceptable" && "text-emerald-400",
                          h.band === "undesirable" && "text-amber-400",
                          h.band === "unacceptable" && "text-destructive",
                        )}
                      >
                        {h.residual}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Rated on a 5×5 scale — severity Minor→Catastrophic against likelihood Very
              low→Very high, scored 1–5.{" "}
              {RATING_BANDS.map((b, i) => (
                <span key={b.band}>
                  {i > 0 ? " · " : ""}
                  <strong className="text-foreground">{b.band}</strong> {b.meaning}
                </span>
              ))}
              . No hazard is ever marked closed — each carries a residual rating and stays
              open.
            </p>

            <h3 className="mt-6 mb-2 text-sm font-semibold">Controls</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CONTROLS.map((c) => (
                <li
                  key={c.id}
                  id={c.id}
                  className="flex scroll-mt-24 items-start gap-3 rounded-lg border border-border bg-surface/70 px-3 py-2"
                >
                  <span className="font-mono text-xs font-semibold text-primary">{c.id}</span>
                  <span className="flex-1">{c.control}</span>
                  <span
                    className={cn(
                      "shrink-0 text-[11px] font-semibold uppercase tracking-wider",
                      c.status === "In place" ? "text-emerald-400" : "text-amber-400",
                    )}
                  >
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-2 text-sm font-semibold">Standards that apply</h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    {["Instrument", "Who it binds", "What it demands here"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-[11px] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {STANDARDS.map((s) => (
                    <tr key={s.instrument} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-medium text-foreground">
                        {s.instrument}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{s.binds}</td>
                      <td className="px-3 py-2 text-muted-foreground">{s.demands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 mb-2 text-sm font-semibold">
              CSC-QT readiness — by domain, never a score
            </h3>
            <P>
              The Clinical Safety Case Quality Tool (Oskrochi &amp; Grimes) reviews 36
              indicators across five domains and deliberately produces{" "}
              <strong>no score, no percentage and no pass mark</strong>. Readiness is
              therefore published per domain, with &ldquo;planned&rdquo; and &ldquo;not
              started&rdquo; written as they are.
            </P>
            <div className="mt-3 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-wider">
                      CSC-QT domain
                    </th>
                    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-wider">
                      Readiness
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CSC_READINESS.map((d) => (
                    <tr key={d.domain} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-medium text-foreground">{d.domain}</td>
                      <td className="px-3 py-2 text-muted-foreground">{d.readiness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 mb-2 text-sm font-semibold">The two-way argument</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {SYNERGY.map((s) => (
                <div
                  key={s.direction}
                  className="rounded-lg border border-border bg-surface/70 p-3"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground">{s.direction}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              <strong>Honest gap:</strong> WardFlow has not been reviewed with the CSC-QT and
              holds no completed DCB0129 or DCB0160 safety case. No clinical efficacy,
              patient-outcome or cost-saving claim is made — the waiting-list argument is
              capacity, cost and patient experience. Emulator is not hardware, and while any
              signature path remains ECDSA (see{" "}
              <a href="#QH-05" className="text-primary underline underline-offset-2">
                QH-05
              </a>
              ) the system is not quantum-safe end to end.
            </p>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              CSC-QT: Oskrochi Y, Grimes K, <em>What good looks like in clinical safety</em>,
              BMJ Innovations (2026), doi 10.1136/bmjinnov-2026-001660. Freely available
              under CC BY 4.0, funded through RADIANT-CERSI.{" "}
              <a
                href="https://csc-qt.curistica.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                csc-qt.curistica.com
              </a>
            </p>
          </Card>


          <Card>
            <H2>Take the skill with you</H2>
            <P>
              The agent skills behind this work are downloadable here — the quantum lanes and
              the clinical safety discipline. Drop them into a Lovable project, Claude Code, an
              OpenClaw or Hermes agent, or a Telegram bot and the same discipline — receipts,
              shot counts, pre-registered bars, hazard-led claims — comes with them.
            </P>

            <div className="mt-4 grid gap-3">
              {SKILLS.map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border border-border bg-surface/70 p-4"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-mono text-sm font-semibold text-foreground">
                      {s.name}
                    </p>
                    <span className="font-mono text-xs text-primary">v{s.version}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
                  {s.note && (
                    <p className="mt-2 rounded-lg border border-border bg-card px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                      {s.note}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a href={s.file} download={`${s.name}-SKILL.md`}>
                      <Button size="sm" className="gap-1.5">
                        <Download className="h-4 w-4" />
                        Download SKILL.md
                      </Button>
                    </a>
                    {s.github && (
                      <a
                        href={s.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary underline underline-offset-2"
                      >
                        View on GitHub
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {s.extras && (
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Companion references
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.extras.map((x) => (
                          <a
                            key={x.file}
                            href={x.file}
                            download={x.label.split("/").pop()}
                            className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-primary hover:bg-accent/50"
                          >
                            <Download className="h-3 w-3" />
                            {x.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>


            <h3 className="mt-6 mb-2 text-sm font-semibold">Installing it</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {INSTALL_LANES.map((lane) => (
                <div
                  key={lane.lane}
                  className="rounded-lg border border-border bg-surface/70 p-3"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground">{lane.lane}</p>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    {lane.steps.map((step, i) => (
                      <li key={step} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              <strong>Cost and safety:</strong> zero-cost commands first (<code>help</code>,{" "}
              <code>backends</code>, a local Selene smoke test). Emulator jobs are
              quota-cheap but still need an explicit &ldquo;yes&rdquo; before anything is
              submitted — the bot never fires a job on its own. Nothing in these skills is
              clinical decision-making, and no quantum advantage is claimed.
            </p>
          </Card>


          <Card>
            <H2>Clinical Quantum Methodology (CQM v1.3)</H2>
            <P>
              <strong>Problem first, quantum second.</strong> Workflow is the product,
              quantum is optional augmentation, and honest negatives are deliverables.
              Maintained by the Association for Clinical Quantum.
            </P>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/70 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-wider">
                      We value
                    </th>
                    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-wider">
                      Over
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CQM_VALUES.map((v) => (
                    <tr key={v.value} className="border-t border-border">
                      <td className="px-3 py-2 font-medium text-foreground">{v.value}</td>
                      <td className="px-3 py-2 text-muted-foreground">{v.over}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 mb-2 text-sm font-semibold">The seven phases</h3>
            <ol className="space-y-1.5 text-sm text-muted-foreground">
              {CQM_PHASES.map((p, i) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                    {i}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
            <P>
              WardFlow ran the whole lifecycle in <strong>one day</strong>: toy-first gate →
              six-backend receipts → F-VQE upgrade (0.1875 → 1.0000) → scale ladder
              4q → 8q → 26q → 98q on the Helios Guppy/HUGR lane, with honest negatives
              committed at every rung.
            </P>
            <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/90">
              “Problem first — the tech comes afterwards. Workflow is most important so it
              is reproducible for Quantinuum to use later. You may realise you don&apos;t
              need quantum.”
              <span className="mt-1 block not-italic text-xs text-muted-foreground">
                — Quantinuum mentor, encoded in CQM as gates
              </span>
            </blockquote>
            <p className="mt-4 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              <strong>DPIA GREEN:</strong> synthetic dummy jobs only — no patient data
              anywhere in the quantum layer.
            </p>
          </Card>

          <Card>
            <H2>References</H2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {REFERENCES.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Source documents in the repo: <code>docs/QUANTUM_CARD.md</code>,{" "}
              <code>docs/QUANTUM_SPOTLIGHT.md</code>,{" "}
              <code>docs/clinical-quantum-methodology.md</code>.
            </p>
          </Card>




          <Card>
            <H2>The honesty footnote</H2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {HONESTY.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <H2>Demo script (2 minutes)</H2>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {DEMO.map((d, i) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
            <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/90">
              “The ward plan is made classically, exactly as today. Then a tiny quantum job
              on Quantinuum&apos;s stack signs it, giving the next shift a receipt nobody
              can fake. Small circuit, real receipt, honest claim.”
            </blockquote>
          </Card>

          <Card>
            <H2>Backend receipts</H2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Metric label="H1-1LE" value="0.1875 ✅" />
              <Metric label="H2-1LE" value="0.1367 ✅" />
              <Metric label="H1-Em" value="0.1523 ✅" />
              <Metric label="H2-Em" value="0.1680 ✅" />
              <Metric label="Aer" value="0.125 ✅ (uniform, honest)" />
              <Metric label="sv1" value="⚠️ gap" />
            </div>
            <P>
              Scale-up: 8 qubits at p=2 done four times over (mean cut beats uniform,
              optimum mass tiny — an honest negative). 26q GHZ on Helios is{" "}
              <strong>perfect — 512/512 shots, GHZ-mass 1.0</strong>; 26q QAOA mean cut
              43.61 vs 43.05 uniform (explores; F-VQE is the fix). H2-1LE cross-check
              running.
            </P>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Module built with Claude Fable 5.1 under <strong>CQM v1.3</strong>. Quantum
              circuits via pytket + Guppy/HUGR on Quantinuum Nexus.

              Documentation lives in the repo under{" "}
              <code>docs/QUANTUM_SPOTLIGHT.md</code> and <code>quantum/README.md</code>.
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

function Card({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="panel lift scroll-mt-28 rounded-2xl p-6">
      {children}
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 font-display text-xl font-bold tracking-tight">
      <span className="mr-2 inline-block h-3 w-1 rounded-full bg-primary align-middle" />
      {children}
    </h2>
  );
}


function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>;
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
