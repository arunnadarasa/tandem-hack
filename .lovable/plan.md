# Add "Quantum Digital Clinical Safety" to the quantum page

The CSC-QT site (csc-qt.curistica.com, Curistica) publishes a peer-reviewed quality-assessment tool for clinical safety cases written under the NHS DCB0129 and DCB0160 standards: 36 indicators across five domains, marked present / not present, with written notes and a domain-by-domain profile rather than a score.

A new section on the quantum page frames WardFlow's quantum layer against that discipline — showing the quantum receipts as safety-case evidence, not as a clinical claim.

## New section: Quantum Digital Clinical Safety

Placed after the model-card and circuits sections, before the methodology section.

**Opening framing**
Digital health in the NHS is assured through clinical safety cases (DCB0129 for manufacturers, DCB0160 for deploying organisations). The CSC-QT gives reviewers a structured way to judge whether such a safety case is any good. The quantum layer is written to be *reviewable under the same discipline*: named accountability, versioned documents, pre-registered pass bars, evidence attached to every claim.

**The five domains, mapped to the quantum layer**
A table with each CSC-QT domain and what the quantum layer puts in front of a reviewer:
- Scope and context — named owner and Clinical Safety Officer role, versioned model card (v1.0), system identified (WardFlow Quantum Capability Layer), deployment context stated as hackathon/emulator only
- Hazard identification and structure — the honest-negatives register: unoptimised QAOA explores rather than concentrates, Clifford-only 98q lane, sv1 gap; each recorded as a named limitation, not buried
- Risk assessment — the uncertainty envelope 4·√(0.5/shots) applied to every probability claim, with the classical baseline stated per run
- Controls and evidence — every claim carries a job ID and shot count; controls are the pre-registered pass bar, fixed seeds, pinned packages, and the submit journal
- Safety argument — the binding conclusion: the classical sort remains the decision-maker, the quantum layer is a tamper-evident seal, and no clinical or advantage claim is made

**Safety position (called out clearly)**
- DPIA GREEN: synthetic dummy jobs only, no patient data enters the quantum layer
- Out of scope for clinical decision-making; not a deployed system, so no live DCB0160 safety case is claimed
- The quantum receipts are execution integrity evidence, the kind of artefact a hazard log's evidence column would reference — they do not by themselves discharge any DCB duty

**Honest gap**
WardFlow has not been reviewed with the CSC-QT and holds no completed DCB0129/DCB0160 safety case. The section states this plainly and names the CSC-QT as the instrument that would be used if the system were taken toward deployment.

**Attribution**
CSC-QT by Oskrochi Y & Grimes K, published in BMJ Innovations (doi 10.1136/bmjinnov-2026-001660), CC BY 4.0, funded through RADIANT-CERSI. Linked to csc-qt.curistica.com. Added to the existing References list as well.

## Unchanged

Everything already on the page — hero, stats, plain-English summary, model card, circuits table, evaluation and limitations, methodology, references, demo script, footer — stays as it is.

## Technical notes

Single file: `src/routes/quantum.tsx`. Add `CSC_DOMAINS`, `SAFETY_POSITION` constants and render with the existing `Card` / `H2` / `P` helpers and the same table markup used elsewhere; add one CSC-QT entry to `REFERENCES`. External links open in a new tab with `rel="noopener noreferrer"`. Typecheck with `bunx tsgo --noEmit` and verify the rendered page.
