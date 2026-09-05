# Include Helios backend receipts on the Quantum page

## Current state
The Quantum page already has a "Helios: the whole ward on the next-gen stack" section that describes two Helios runs (26q GHZ job `0fc1f87b` and 26q QAOA job `67f9d2f4`), but the results are only shown as descriptive paragraphs. The separate "Backend receipts" grid lower down only covers the 4-qubit QAOA backends (H1-1LE, H2-1LE, H1-Em, H2-Em, Aer, sv1).

## Change
In `src/routes/quantum.tsx`:
- Add a small `HELIOS_RECEIPTS` data constant for the two Helios jobs, including backend name, job ID, and a one-line result.
- Inside the existing Helios section, insert a receipt-style grid/card that lists each Helios backend, job ID, and result — matching the visual style of the 4-qubit backend receipts.
- Keep the existing 4-qubit "Backend receipts" section unchanged so the two scales stay distinct.

## Verification
- Run `bunx tsgo --noEmit` to confirm TypeScript compiles.
- Open `/quantum` in the preview and confirm the Helios section now shows backend receipts for the two Helios jobs.
