# Make the quantum safety section hazard-led

The current "Quantum Digital Clinical Safety" section is feature-led: it says what the quantum layer offers a reviewer. A safety case has to be hazard-led — each claim written as a way the system could hurt someone, what stops that, and what risk is left. This rewrites that one section on the quantum page to that discipline, and leaves the rest of the page alone.

## What changes in that section

**1. Named accountability, up front**
Clinical Safety Officer: Arun Nadarasa, GPhC 2080128. Release authority sits with a named registered individual. Lifecycle status stated plainly: pre-deployment, no live patient data has ever entered the system, no NHS organisation has deployed it, no clinical authority to release has been sought.

**2. A real hazard log (replaces the current five-domain "evidence" table)**
A table where every row reads cause → hazard → hazardous situation → harm → control → residual rating. Roughly six rows drawn from what the page already documents honestly, each with an ID:
- QH-01 ranking mistaken for a triage decision → clinician defers to the order → delayed review of a deteriorating patient
- QH-02 unoptimised QAOA explores rather than concentrates → a weak split presented as an agreed one
- QH-03 98-qubit lane is Clifford-only → entanglement-scale receipt read as an optimisation result
- QH-04 emulator receipt read as hardware evidence → over-stated readiness in procurement
- QH-05 signature path is ECDSA, not post-quantum → a receipt's provenance is not quantum-safe end to end
- QH-06 cohort behind a result swapped silently → an audit cannot reconstruct what was actually run

Each row carries controls with IDs (QC-01…), e.g. pre-registered pass bar, uncertainty envelope 4·√(0.5/shots), fixed seeds and pinned packages, submit journal with job IDs, Merkle-bound cohort provenance, explicit "classical sort is the decision-maker" wording.

**3. 5×5 rating, explained**
Severity Minor→Catastrophic against likelihood Very low→Very high, scored 1–5. Bands shown: 1–2 acceptable, 3 undesirable (CSO sign-off), 4–5 unacceptable — do not deploy. Every hazard shows a residual rating and stays open; nothing is marked closed.

**4. Standards table (replaces loose DCB mentions)**
DCB0129 (us as manufacturer), DCB0160 (the deploying organisation), DTAC C1, UK MDR boundary — ranking for human review is decision support, acting on the ranking is a device — DPIA/UK GDPR with ICO Tech Horizons 2025, EU AI Act disclosure duty from 2 Aug 2026, and the FDA CDRH GenAI paper cited only as a request for feedback.

**5. CSC-QT readiness, per domain, never a score**
Keep the CSC-QT framing and attribution, but present readiness domain by domain rather than as a mapping of strengths. State explicitly that the tool produces no score, percentage or pass mark, and that WardFlow has not been reviewed with it.

**6. Synergy stated both ways**
Quantum work strengthens the safety case (Merkle-bound cohort provenance, immutable anchoring, a published negative record as failure evidence). Clinical safety constrains the quantum work (hazard frame on every claim, pre-registered KPI gate instead of a moved bar, release gate with a named signature). One-sided reads as marketing.

## Wording rules kept throughout

No deployment claim, no efficacy or cost-saving claim, no CSC-QT score. "Planned" and "not started" are published as-is. Emulator is never called hardware. The waiting-list argument stays capacity, cost and patient experience.

## Technical notes

Single file: `src/routes/quantum.tsx`. Replace `CSC_DOMAINS` / `SAFETY_POSITION` with `HAZARDS`, `CONTROLS`, `STANDARDS`, `CSC_READINESS`, `SYNERGY` constants and render with the existing `Card` / `H2` / `P` helpers and the same table markup. Hazard and control rows get `id` attributes so `#QH-01` and `#QC-01` anchors resolve, and prose references link to them. Typecheck with `bunx tsgo --noEmit` and verify the rendered section in the preview.

Applied the quantum-clinical-safety skill.
