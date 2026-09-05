# Add section jump navigation to the Quantum page

The `/quantum` page is long and hard to scan. Add a persistent, clickable section header bar so visitors can jump straight to the part they need.

## What changes

1. **Section anchors** — give every major `<Card>` on `/quantum` a stable `id` so it can be linked to:
   - `problem`
   - `plain-english`
   - `4q-maxcut`
   - `live-receipts`
   - `f-vqe`
   - `helios`
   - `model-card`
   - `circuits`
   - `evaluation`
   - `clinical-safety`
   - `skills`
   - `cqm`
   - `references`
   - `honesty`
   - `demo`
   - `backend-receipts`

2. **Sticky jump bar** — under the hero, add a horizontal scrollable row of compact anchor pills. On desktop it can wrap; on mobile it stays a single swipeable strip. Each pill scrolls smoothly to its section.

3. **Active-section highlight** — as the user scrolls, the pill matching the section nearest the top of the viewport gets a `bg-primary text-primary-foreground` active style. Implemented with an IntersectionObserver hook so it works without heavy scroll listeners.

4. **Back-to-top affordance** — a small "Top" pill at the end of the jump bar that scrolls back to the page header.

5. **Visual polish** — use existing tokens (`panel`, `rounded-full`, `text-xs`, `font-semibold`, `border-primary/30`, `bg-primary/10`, `hover:bg-accent/50`) so the bar feels like the rest of the premium dark UI.

## What stays the same

- All existing page content, wording, receipts, tables, skills, safety claims and honesty footnotes remain untouched.
- No new routes or dependencies.
- Nexus job IDs stay plain text; no new links are added.

## Implementation notes

- Edit only `src/routes/quantum.tsx`.
- Wrap each `<Card>` with an `<section id="...">` (or add `id` directly to the `Card` wrapper) so the anchor lands cleanly.
- Add a small client-only `useActiveSection` hook inline or as a local helper; keep it simple and SSR-safe.
- Verify with `bunx tsgo --noEmit` and a quick Playwright pass that every jump-bar link scrolls to a visible section and that the active pill updates.
