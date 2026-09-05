# Premium visual refresh — WardFlow

A full visual upgrade of both the ward board and the quantum page, using the choices made: a Midnight Indigo palette, Sora headings with Manrope body text, and a proper dashboard-style structure. No changes to how the app works — same setup flow, same jobs, same patients, same quantum content.

## The look

- **Colour:** deep navy background (#0a0a1a) with layered panels (#141432 / #1e1e5a) and an electric indigo accent (#4f46e5). Job categories, NEWS bands and job states keep their distinct colours but get re-tuned so they sit harmoniously on the navy rather than shouting.
- **Type:** Sora for headings and numbers, Manrope for everything else. Tighter headline spacing, clearer size steps so the eye lands on bed number, then patient, then jobs.
- **Depth:** soft glow behind key panels, subtle glass on the top bar and dialogs, refined 1px borders instead of heavy boxes, gentle shadows. Rounded, consistent corner radius throughout.
- **Motion:** quiet and fast — cards lift slightly on hover, rows and panels fade in on load, view switches cross-fade, status changes animate. Nothing bouncy.

## Ward board

- New sticky top bar: ward name and a live pulse, then the My patients / Whole ward switch, then Jobs / Patients tabs, then Add job, Handover and Quantum. Grouped and spaced so it reads as one control surface.
- A slim stat strip under the header: patients covered, to do, to chase, done today, highest NEWS — as compact tiles.
- Jobs view: category columns become proper panels with a coloured header rail, a count chip, and cleaner job cards (bed chip, patient line, job text, status control). Empty columns show a quiet "nothing outstanding" state.
- Patients view: keeps the current column structure and grid alignment, with clearer header labels, better row rhythm, stronger NEWS badges, and a smoother expand animation.
- Setup screen becomes a centred premium panel with a soft indigo glow, larger ward/bay choices and clearer patient-selection tiles.
- Add job and Handover dialogs restyled to match: darker glass, better spacing, clearer primary buttons.

## Quantum page

- A striking hero band: large Sora headline, one-line plain-English promise, and the headline receipt figures as tiles.
- Section rhythm across the long page: consistent section headers with small numbered eyebrows, generous spacing, and cards grouped in a bento-style grid for receipts and backends.
- Hazard log, controls, standards and CSC-QT tables restyled for readability — sticky-ish headers, zebra rows, colour-coded residual ratings.
- Skills download section gets clearer download buttons.
- All existing wording, figures, job IDs and honesty notes stay exactly as they are. Nexus stays unlinked, job IDs remain plain text.

## Technical notes

- Fonts loaded via `<link>` in `src/routes/__root.tsx`; families registered in `@theme` in `src/styles.css`.
- All colour changes go through the existing tokens in `src/styles.css` (`--background`, `--card`, `--primary`, plus the NEWS/job-state and category tokens) — no hardcoded colours added in components.
- New shared utilities for glass panels, glow, and section headers via `@utility`.
- Touched files: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/quantum.tsx`, and the ward components (`SetupScreen`, `JobsBoard`, `PatientBoard`, `bits`, `category-style`, `AddJobDialog`, `HandoverDialog`).
- No changes to `src/lib/ward-data.ts` or `src/lib/ward-store.tsx`.
- Verified afterwards with a typecheck and a browser pass over setup, jobs, patients and the quantum page.
