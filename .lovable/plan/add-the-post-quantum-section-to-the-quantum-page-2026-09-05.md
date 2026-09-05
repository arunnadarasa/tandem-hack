# Add the Post-Quantum section to the Quantum page

Bring the repo's POST_QUANTUM.md material onto `/quantum` as a new section, in the same style as the rest of the page, with the same honesty rules.

## What gets added

A new section, "Post-quantum cryptography — the other half of the story", placed after the clinical-safety section and before the skills section, containing:

1. **The threat is scheduled, not speculative** — a small table of authorities and positions: NCSC migration timelines (plan by 2028, priority migrations by 2031, complete by 2035), NCSC next-steps note on harvest-now-decrypt-later and ML-KEM / ML-DSA / SLH-DSA, Google's accelerated 2029 target, HM Treasury / G7 financial-sector roadmap (Jan 2026).
2. **The new attacker: AI agents** — the August 2026 OpenAI / Hugging Face incident, why the attacker timeline compressed, and the guardrails this project carries because it is agent-built (consent gates, skill constitutions, secret scans, receipts for every action).
3. **Why quantum receipts and post-quantum signatures belong together** — the three-layer trust chain (execution receipt → signed with ML-DSA / SLH-DSA → seeded by quantum entropy), plus the live entropy receipt: 8-qubit source circuit on H1-1LE, job `02c3ec84`, 512 shots, 222 distinct states, min-entropy 6.19 / 8 bits per sample, with the binding honest note that emulator randomness is PRNG-backed and this shows pipeline shape, not certified entropy.
4. **The NHS context** — NIHR's £1.65 m across 17 early-stage quantum health projects, Q-Biomed and QuSIT hubs, and the symmetry point: the same NHS funding quantum's upside must budget for its downside on the NCSC clock.
5. **Done today vs next (pre-registered)** — a two-column table exactly as written in the source, with the house rule that nothing in the right column is claimed as done and no "quantum-safe" badge goes on any surface until signatures are real and verifiable.

## Navigation and metadata

- Add a "Post-quantum" pill to the existing jump-navigation bar, in the same position as the section.
- Give the section the anchor id `post-quantum` so the pill and highlight behaviour work like the others.
- Add citations to the existing references list: NCSC PQC timelines, NCSC next steps v2.0, Google 2029 timeline, HM Treasury G7 CEG roadmap, OpenAI incident report, NIHR quantum health investment, NIST FIPS 203/204/205.

## Rules kept

- Job `02c3ec84` appears as plain text, never a link to Nexus, like every other job ID on the page.
- No "quantum-safe" or advantage claims; the roadmap column stays explicitly future work.
- No new colours or components — reuse the existing card, heading, table and badge styles.

## Technical notes

Only `src/routes/quantum.tsx` changes: new content constants, a new `<Card id="post-quantum">` section, one extra entry in `SECTIONS`, and extra reference rows. No data, routing or backend changes.
