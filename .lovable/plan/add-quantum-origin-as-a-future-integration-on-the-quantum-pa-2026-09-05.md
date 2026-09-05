# Add Quantum Origin as a future integration on the Quantum page

A new section that names Quantum Origin — Quantinuum's provable, software-deployed quantum
random number generator — as the planned upgrade to the entropy leg of the trust chain, written
as future work, not as something already in place.

## Where it goes

Directly after the Post-quantum section and before Skills, with its own jump-navigation pill
("Quantum Origin"). The existing Post-quantum roadmap line already says "Certified entropy source
(QPU / Quantum Origin) feeding ML-KEM keygen" — the new section expands that one line and links
back to it.

## What the section says

1. **Plain-English opener** — today's keys are protected by randomness we can only test, never
   prove. Quantum Origin generates randomness whose quality is mathematically proven from where it
   came from, rather than statistically hoped for at the output.

2. **How it works** (four short steps, from the technical white paper): an H2 quantum computer
   with a system model produces raw output → a Bell test gives a mathematically proven lower bound
   on min-entropy → refinement produces a Quantum Seed → on the customer's own device, a randomness
   extractor combines that public seed with local randomness to give near-perfect private output
   feeding existing key generation.

3. **Why it fits WardFlow** — three points:
   - Software-only: no extra hardware, no HSM, no live connection to a quantum computer, so it can
     sit inside an NHS deployment without new estate.
   - The seed is public and never needs rotating, which suits a long-lived signing service.
   - It strengthens the exact weak point already logged as a hazard: our current entropy demo is an
     emulator PRNG, and weak entropy is precisely what breaks signature schemes (biased ECDSA
     nonces, the 1-in-172 weak-RSA-certificate finding).

4. **Honest boundary box** — stated as clearly as the rest of the page:
   - Not integrated. No Quantum Origin licence, no key material, no receipt in this build.
   - Today's entropy figures (job 02c3ec84, 512 shots, min-entropy 6.19 of 8 bits) remain emulator
     PRNG output and are not certified randomness.
   - No "quantum-safe" or "provably random" badge appears anywhere until a real integration is
     running and verifiable.
   - Adopting it would change the key-generation path, so it needs its own safety review before it
     goes anywhere near a live handover.

5. **Integration lanes as documented** (CLI, SDK, Linux reseed, Windows reseed, HSM reseed, over a
   shared versioned Common Core) with the note that the SDK lane is the one that would suit the
   receipt-signing service.

6. **Sources** — the two white papers, the product sheet and the Quantinuum docs introduction,
   listed with links.

## Technical notes

- Single file changed: `src/routes/quantum.tsx`.
- Add `{ id: "quantum-origin", label: "Quantum Origin" }` to `SECTIONS` between `post-quantum`
  and `skills`; the existing `IntersectionObserver` hook picks it up with no other change.
- Add a `<Card id="quantum-origin">` in the matching position, using the existing `Card`,
  `Metric` and list styling so it looks identical to neighbouring sections.
- New module-level constants for the pipeline steps, fit-for-WardFlow points, boundary lines,
  integration lanes and sources, following the pattern already used for the post-quantum data.
- No new dependencies, no backend, no change to ward functionality.
