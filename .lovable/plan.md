# Downloadable Quantinuum skill pack on the quantum page

The tandem-hack-quantum repo carries two agent skills: `quantinuum` (build and run Guppy/Selene circuits on H1/H2/Helios, with the healthcare triage kernels) and `telegram-quantum-hermes` (run Nexus jobs from Telegram through the Hermes runner and the `/nexus` slash dispatcher). Neither is reachable from the WardFlow quantum page today. This adds a section that lets a visitor download both and shows how to install them in Lovable, in Hermes, and in Telegram.

## New section: "Take the skill with you"

Placed after the Quantum Digital Clinical Safety section, before the methodology section.

**Two skill cards**, each with name, version, one-line purpose, tags, and a Download button:
- `quantinuum` v1.1.0 — write real quantum circuits with Guppy, run shots on Selene, optional offline TKET check; healthcare triage kernels (QUBO, biomarker features, attestation). Requires the terminal toolset.
- `telegram-quantum-hermes` v1.1.0 — run Nexus, Aqora and Marimo quantum jobs from Telegram; `/nexus` commands for backends, pathway, attestation, bench, status and jobs. Requires the terminal toolset.

Each download serves the real `SKILL.md` from the repo, copied into the app so the button works without leaving the page. A "View on GitHub" link sits next to each.

**Three install lanes**, as short numbered steps:
- **Lovable** — download the file, drop it into `.agents/skills/<name>/SKILL.md` in the project, activate it from Settings › Skills. Note that skill frontmatter (`name`, `description`) is what makes it load on the right task.
- **Hermes** — place the folder in the agent's skills directory; the `metadata.hermes` block already carries the tags, category and `requires_toolsets: [terminal]` Hermes reads.
- **Telegram** — install `telegram-quantum-hermes`, then drive it from chat with `/nexus help`, `/nexus backends`, `/nexus pathway`, `/nexus attestation`, `/nexus bench`, `/nexus status <id>`. Plain-English mode is called out: the bot proposes qubits, shots and backend, and never submits a job without an explicit "yes".

**Cost and safety note**, consistent with the rest of the page: zero-cost commands first, emulator jobs are quota-cheap but still need confirmation, nothing here is clinical decision-making, and no advantage is claimed.

## Unchanged

Everything else on the quantum page stays exactly as it is.

## Technical notes

- Copy the two skill files from the repo into `public/skills/quantinuum-SKILL.md` and `public/skills/telegram-quantum-hermes-SKILL.md` so the download links are same-origin and work offline from the deployed site.
- In `src/routes/quantum.tsx`: add a `SKILLS` constant (name, version, summary, tags, file path, GitHub URL) and an `INSTALL_LANES` constant (Lovable / Hermes / Telegram steps), render with the existing `Card` / `H2` / `P` helpers and the existing `Button` for the download action using an anchor with the `download` attribute.
- GitHub links open in a new tab with `rel="noopener noreferrer"`.
- Verify with `bunx tsgo --noEmit`, then check in the preview that both files download and the section renders.
