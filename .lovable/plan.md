# Add the quantum digital clinical safety skill to the Quantum page

The Quantum page already offers four downloadable skills (quantinuum, telegram-quantum-hermes, Claude Code, OpenClaw). This adds the clinical safety skill as a fifth, so anyone reading the safety section can take the discipline behind it away with them.

## What gets added

A fifth skill card, `quantum-clinical-safety`, in the "Take the skill with you" section:

- Plain-English summary: it makes any quantum claim about a health tool hazard-led rather than feature-led — cause, hazard, hazardous situation, harm, control, residual rating — and keeps it inside DCB0129/DCB0160, DTAC, DPIA and UK MDR boundaries.
- Its house rules, stated on the card: hazards are never closed, only rated and left open; emulator is not hardware; a filename is not a receipt; no efficacy or deployment claims; CSC-QT gives a per-domain readiness picture and never a score or pass mark.
- Same card layout as the others: name, version, summary, tags, Download button.

The skill ships with four companion reference files (hazard log, standards, CSC-QT, release gate). Those are offered as four small extra download links underneath the card so the skill is complete rather than truncated.

An honest note on the card: this skill was written against a sibling project (EndoTrack) and is published here as the reusable safety discipline the WardFlow quantum section follows — it is not a WardFlow-specific safety case.

## Install lanes

The existing Lovable, Claude Code, OpenClaw, Hermes and Telegram lanes already cover installation. The Lovable lane gains one line noting that skills with a `references/` folder should keep that folder alongside SKILL.md.

## Technical notes

- Copy the skill and its four references into same-origin public assets under `public/skills/quantum-clinical-safety/` (`SKILL.md`, `references/hazard-log.md`, `references/standards.md`, `references/csc-qt.md`, `references/release-gate.md`).
- Extend `SKILLS` in `src/routes/quantum.tsx` with the new entry, plus an optional `extras` list of reference downloads rendered under the card; add the one extra Lovable install step.
- No other page content changes: no Nexus links, job IDs stay plain text, and no new claims about deployment, efficacy or safety scores.
