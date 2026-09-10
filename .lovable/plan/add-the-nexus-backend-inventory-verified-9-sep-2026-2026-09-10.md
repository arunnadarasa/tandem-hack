# Add the Nexus backend inventory (verified 9 Sep 2026)

## What changes

The Quantum page gains a dated inventory of every backend visible in the Nexus direct lane, and the existing receipt copy is corrected where it disagrees with that inventory.

## New: Nexus backend inventory

A table inside the existing "Backends" section, labelled *Nexus direct lane (qnexus) — verified 9 Sep 2026*, with columns Backend / Qubits / Type:

| Backend | Qubits | Type |
|---|---|---|
| aer_simulator | 26 | simulator |
| aer_simulator_statevector | 26 | simulator |
| aer_simulator_unitary | 26 | simulator |
| H1-1LE | 20 | simulator |
| H1-Emulator | 20 | emulator |
| H2-1LE | 26 | simulator |
| H2-Emulator | 26 | emulator |
| Helios-1E-lite | 26 | emulator |
| QulacsBackend | 20 | simulator |
| Selene | 26 | simulator |
| SelenePlus | 26 | simulator |

Eleven backends, with a one-line note that "simulator" means an idealised statevector lane and "emulator" means a physics/noise-model lane.

## Corrections to existing copy

- Hardware-family line: "H1 20q · H2 56q · Helios 98q" becomes the qubit limits as listed in the inventory (H1 20q · H2 26q), with Helios's 98q kept but explicitly marked as the stabilizer (Clifford-only) lane, since the direct-lane statevector limit is 26q.
- Simulator-classes line adjusted to match.
- sv1 (Braket) is removed from the backend map: it drops out of the "5 of 6 backends receipted" honesty line and out of the receipt tiles, and the sv1 limitation bullet is removed. The remaining receipt tiles stay as they are (H1-1LE, H2-1LE, H1-Em, H2-Em, Aer).
- The "Backend receipts" heading gains a short line pointing at the inventory: receipts are a subset of the backends now available.

All numbers already carrying job IDs and shot counts (4q, 8q, 26q, 98q receipts) are untouched — only the backend map and the sv1 gap change.

## Technical notes

Single file: `src/routes/quantum.tsx`. Add a `NEXUS_BACKENDS` constant near the other receipt constants, render it with the existing table styling used by the circuits/receipts table, and edit the `SYSTEM`, `HONESTY`, `LIMITATIONS` constants plus the `backend-receipts` card. No new sections, so the jump nav is unchanged.

## Verification

- `bunx tsgo --noEmit`
- Load `/quantum`, jump to Backends, confirm the 11-row inventory, the 9 Sep 2026 label, and that sv1 no longer appears anywhere.
