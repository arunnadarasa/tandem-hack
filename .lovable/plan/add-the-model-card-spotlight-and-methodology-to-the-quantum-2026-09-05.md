# Add the model card, spotlight and methodology to the quantum page

The three linked documents add material the page doesn't yet carry: a formal quantum model card (what the system is, what it must not be used for, every circuit and job ID in one table), a plain-English slide summary, and the Clinical Quantum Methodology that governs the whole approach. All three become new sections on the quantum page, in the existing style.

## New sections

**1. Plain-English summary (placed near the top, right after the problem section)**
The spotlight framing, for anyone unfamiliar with quantum:
- Classical stays in charge — WardFlow sorts jobs the normal, fast, explainable way
- A real quantum job stamps it — four jobs split NOW vs NEXT, best score 10, reached by exactly two patterns
- The receipt is live and checkable — a fingerprint tied to this handover that can't be quietly edited later
- Why it matters: the incoming shift can prove what was agreed, not just remember it

**2. Quantum model card**
Presented as compact labelled blocks:
- Entity: WardFlow Quantum Capability Layer v1.0, owner, repository, licence, methodology version
- Intended use: tamper-evident handover receipts, for judges / NHS digital teams / researchers
- Out of scope (called out clearly): not clinical decision-making, no patient data (synthetic only, DPIA GREEN), no speed or accuracy advantage, not production
- System characteristics: Quantinuum trapped-ion family (H1 20q, H2 56q, Helios 98q), emulators only — no QPU run claimed, simulator classes, the two programming lanes, and the uncertainty envelope formula
- Trust controls: cataloged / scanned / evaluated / documented, with "signed — not yet" stated honestly

**3. Full circuit results table**
One table covering all seven runs — 4q QAOA, 4q F-VQE, 8q QAOA p=2, 26q QAOA, 26q GHZ, 98q GHZ, 98q parity attestation — with qubit count, backend, job ID, result and verdict. This replaces the scattered per-section figures being the only place these appear; existing sections stay as they are.

**4. Evaluation conditions and limitations**
- Pre-registered pass bars fixed before submission, classical baselines stated per run, fixed seeds and pinned packages, job IDs that survive process death
- Honest verification gap: emulator results are classically simulable by construction
- The five limitations, including that the 98-qubit lane is Clifford-only and the sv1 gap

**5. Clinical Quantum Methodology (CQM v1.3)**
- The strapline: problem first, quantum second — workflow is the product, quantum is optional augmentation, honest negatives are deliverables
- The four values as a two-column table (what is valued over what)
- The seven-phase lifecycle as a simple list, noting WardFlow ran the whole thing in one day: toy-first gate → six-backend receipts → F-VQE upgrade → 4q→8q→26q→98q ladder
- Mentor quote: "Problem first — the tech comes afterwards... You may realise you don't need quantum."
- DPIA GREEN note: synthetic dummy jobs only, no patient data anywhere in the quantum layer

**6. References**
The six citations from the card (Everitt & Ji model cards, NVIDIA verified skills, Amaro F-VQE, Iceberg parity, Helios 98q real-time, Quantinuum data sheets), plus links to the three source documents in the repo.

## Unchanged

Hero, stat cards, existing Max-Cut / receipts / F-VQE / Helios / 98-qubit sections, honesty footnote, demo script and footer all stay. Everything remains static text — no live data feed.

## Technical notes

Single file: `src/routes/quantum.tsx`. Add data constants (`CARD_FIELDS`, `CIRCUITS`, `LIMITATIONS`, `CQM_VALUES`, `CQM_PHASES`, `REFERENCES`) and render them with the existing `Card`/`H2`/`P`/`Metric` helpers and the same table markup already used for counts. The circuits table gets a horizontal-scroll wrapper for narrow screens. Typecheck with `bunx tsgo --noEmit` and verify the rendered page.
