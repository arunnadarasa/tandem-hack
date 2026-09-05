# Update the quantum page with the 98-qubit results

The latest content pack adds a bigger finale: the full 98-qubit Helios run, a scale ladder from 4 to 98 qubits, and a versioned methodology note. Only the quantum page changes; styling, layout and the header button stay as they are.

## What changes

**Headline stats (now four cards instead of three)**
- `98/98` qubits — Helios's full published capacity — perfect GHZ plus tamper-evident parity receipt, 256/256 shots each
- `100%` optimum-state mass after F-VQE training — 256/256 shots
- `4q → 98q` scale ladder receipted in one day, every rung a live job ID
- `CQM v1.3` — the methodology itself upgraded and versioned from this hack

**New "98-qubit finale" block inside the Helios section**
- 98q GHZ (one qubit per job, whole hospital) and a 98q Iceberg-style parity receipt with 8 block-parity checks folded in — any tampering breaks a parity, detectably
- Both perfect: 256/256 shots, jobs `b3d1c274` and `8eddb96d`
- Scale ladder in one day: 4q → 8q → 26q → 98q, every step receipted
- Presented as two receipt cards matching the existing Helios receipt cards

**Footer note**
- Add that the module was built under CQM v1.3, alongside the existing tooling credit

**Page description / social preview text**
- Refreshed to lead with the 98-qubit result rather than the 26-qubit one

## Unchanged

The problem section, 4-qubit Max-Cut circuit, H1-1LE receipts table, F-VQE section, 26-qubit Helios results, honesty footnote, demo script, and repo link all stay. All figures remain static text as before — there is no live receipt feed in this project.

## Technical notes

Single file edit: `src/routes/quantum.tsx`. Update `STATS` to four entries (grid becomes `sm:grid-cols-2 lg:grid-cols-4`), add a `HELIOS_98` data constant rendered with the existing receipt-card markup, extend the head meta descriptions, and append the CQM line to the footer paragraph. Typecheck with `bunx tsgo --noEmit` and verify the rendered page.
