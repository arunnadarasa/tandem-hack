# Update the Quantum page with the new content

Refresh `/quantum` so it matches the latest content pack — mainly the new Helios results and the hero stat cards. Styling, layout language, and the header Quantum button stay exactly as they are.

## What changes on the page

1. **Hero** — new sub-head: all 26 qubits entangled in a perfect GHZ on Quantinuum Helios (512/512 shots, job `0fc1f87b`), plus the 4-qubit split driven to 100% optimum mass with F-VQE (job `bb1021a2`). Ends on "Receipts for everything, advantage claimed for nothing."
2. **Three stat cards** under the hero: `26/26` qubits in a perfect GHZ on Helios; `100%` optimum-state mass after F-VQE; `6` Nexus backends receipted.
3. **New section — Helios: the whole ward on the next-gen stack**: scaling from 4 jobs to 26 jobs = 26 qubits on Helios-1E-lite, written in Guppy and compiled to HUGR. Small table with the two jobs (`0fc1f87b` 26q GHZ — perfect 512/512, GHZ-mass 1.0000, only 2 outcomes from a 67-million-state space; `67f9d2f4` 26q QAOA — mean cut 43.61 vs 43.05 uniform). Includes the "why judges should care" note on real-time in-loop classical compute, the GHZ slide line, and the binding wording that 26 qubits is hardware-scale readiness, never quantum advantage.
4. **Receipts section retitled to "Live Nexus receipts (6 backends)"**, keeping the existing H1-1LE counts table and adding a per-backend line: H1-1LE 0.1875, H2-1LE 0.1367, H1-Em 0.1523, H2-Em 0.1680, Aer 0.125 (uniform, honest), sv1 gap.
5. **Honesty footnote** gains the 26q GHZ beat with job `0fc1f87b`.
6. **Demo script** keeps its five beats and adds the 15-second spoken close.
7. **Footer note**: built with Claude Fable 5.1, circuits via pytket + Nexus, receipts summary line, links to the repo docs.
8. **Page description/social text** updated to mention the Helios GHZ result.

## Not included

No live data wiring — the referenced receipts JSON and `quantumShift` helper don't exist in this project, so all figures stay as fixed page content, and the mock/live toggle is skipped.

## Technical notes

Single-file edit to `src/routes/quantum.tsx`: update `head()` meta, hero block, add a stat-card row and a Helios card reusing the existing `Card`/`H2`/`P`/`Metric` helpers and the same table markup pattern, extend the honesty and demo lists, add a footer paragraph. No new dependencies or routes.
