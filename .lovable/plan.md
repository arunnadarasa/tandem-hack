# Add a Quantum showcase page and floating button

## Goal
Surface the `tandem-hack-quantum` repo inside the Ward Round Board as a non-clinical, curiosity-driven showcase. Keep the main ward workflow unchanged; add a floating entry point that opens a dedicated `/quantum` page explaining the quantum handover receipt in lay terms with a little technical flavour.

## What will change

### 1. Floating "Quantum" entry point
- Add a small floating pill/button to the main board (`src/routes/index.tsx`), anchored to a corner so it does not compete with the sticky header controls.
- Use a quantum/atom-themed icon and a short label ("Quantum").
- Clicking it navigates to `/quantum`.

### 2. New `/quantum` route
- Create `src/routes/quantum.tsx` mapped to `/quantum`.
- Add route-specific `head()` metadata: title, description, og:title, og:description, og:type, twitter:card.

### 3. Showcase page content (layperson + light technical detail)
- Hero header: "Quantum-verified handover" with a short subtitle.
- Core analogy: WardFlow still makes every decision the normal way; quantum acts like a tamper-evident receipt stamped on the handover envelope.
- Concrete example: 4 jobs (bedside bloods, imaging, NEWS 7 review, referral) split into NOW vs NEXT shifts.
- Light technical detail:
  - Framed as a 4-qubit Max-Cut puzzle run through Quantinuum Nexus.
  - Include the ASCII circuit from the repo, with a short caption.
  - Show the live H1-1LE receipt summary: 256 shots, optimum patterns `0101`/`1010` appearing 19% of the time vs 12.5% random guessing.
- Honesty footnote block: toy problem, synthetic data, emulator run, no quantum advantage claimed; quantum is a verification seal, not the decision-maker.
- Link to the GitHub repo (`https://github.com/arunnadarasa/tandem-hack-quantum`) with an external icon.

### 4. Styling
- Reuse the existing dark clinical palette (`bg-surface`, `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `primary`).
- Use a subtle gradient or glow on the floating button to make it feel "showcase" without clashing with the ward UI.
- Keep typography consistent with the rest of the app (IBM Plex Sans / Mono).

## Files to create / edit
- Create `src/routes/quantum.tsx`
- Edit `src/routes/index.tsx` to add the floating button and import `Link`

## Verification
- `bunx tsgo --noEmit` passes.
- Preview shows the floating Quantum button on the ward board.
- Clicking it navigates to `/quantum` and renders the showcase content with no console errors.
