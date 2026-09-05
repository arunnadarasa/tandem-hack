# Rebuild the Quantum page from the content pack

Rewrite `/quantum` so it matches the supplied content pack — same wording, same numbers, same honesty framing.

## New page structure

1. **Hero** — H1: "WardFlow sorts the jobs classically — quantum stamps a tamper-evident receipt for handover." Sub-head with the 4-qubit Max-Cut QAOA on Quantinuum Nexus line, plus "no advantage claimed".
2. **The problem: where jobs get lost in handovers** — the criss-crossing / handover-loss copy ending on "Quantum provides the proof."
3. **4 qubits → NOW/NEXT split (Max-Cut)** — weighted ring explanation, the circuit diagram block, classical optimum cut = 10 with `0101`/`1010`, and the honest note that p=1 angles are unoptimised (ranking #5/#6).
4. **Live Nexus receipts (H1-1LE pass)** — 256 shots on H1-1LE, job `7f8ad56f`, a counts table (0001 46, 1111 41, 0000 36, 1110 35, 0101 23, 1010 25), optimum mass 18.75% vs 12.5% uniform, envelope 4√(0.5/256) ≈ 0.088, verdict PASS, and a link to the Nexus job. Includes the technical note that H1-1LE is a hardware-qualified simulator, so the receipt is execution integrity, not speed.
5. **The honesty footnote** — the six bullets exactly as written (toy circuit, 5/6 backends receipted, 8q p=2 honest negative, 26q = hardware-scale readiness, classical sort decides, no advantage claimed).
6. **Demo script** — the five slides and the 15-second spoken close as a pull-quote.
7. **Footer** — backend receipt line (H1-1LE 0.1875, H2-1LE 0.1367, H1-Em 0.1523, H2-Em 0.1680, Aer 0.125, sv1 gap), scale-up note, and the existing GitHub repo link plus "Back to board".

Existing dark clinical styling, back button, and card look are kept. Page metadata updated to the new title/description.

## Notes

- Content-only rewrite of `src/routes/quantum.tsx`; no new components, no data fetching, no live Nexus call — the receipt numbers are the static values from the pack.
- The pack's `QuantumSpotlight.tsx` sample and mock/live toggle are skipped: they depend on a `quantum/ward_shift_receipts.json` file and a `@/lib/quantumShift` module that don't exist in this project. Say the word if you want the live-receipt wiring built too.
- Nothing on the ward board changes.
