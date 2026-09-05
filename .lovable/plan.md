# Add the Claude Code and OpenClaw skills to the Quantum page

The Quantum page already offers two downloadable skills (quantinuum, telegram-quantum-hermes) with install steps for Lovable, Hermes and Telegram. This adds the two remaining skills from the repository so visitors can take them away too.

## What gets added

Two more downloadable skill cards in the "Take the skill with you" section:

- **wardflow-quantum (Claude Code)** — the project constitution for Claude Code: receipt law, honest-negative discipline, the no-advantage wording rule, backend lane map, Helios Guppy quirks and pytket traps. Source: `skills/claude-code/SKILL.md` (identical to `.claude/skills/wardflow-quantum/SKILL.md`, so one card covers both, with both repository paths noted).
- **tandem-hack-quantum (OpenClaw)** — the OpenClaw version, v1.0.0: same evidence constitution plus the backend lane map, wording rules and Telegram team lane, with authoring credit to Arun Nadarasa & the WardFlow quantum team.

Each card keeps the existing layout: name, version, plain-English summary, tags, a Download button and a "view on GitHub" link.

## Install lanes

Two new install lanes alongside Lovable / Hermes / Telegram:

- **Claude Code** — save the file at `.claude/skills/wardflow-quantum/SKILL.md` in the repository; it loads automatically when working on quantum circuits or on any surface citing receipt numbers.
- **OpenClaw** — drop the folder into the agent's skills directory keeping the folder name; the frontmatter name, description, version and tags are what make it trigger.

The existing note that these skills expect real Quantinuum credentials and can incur cost stays, and the honest-scope wording is unchanged.

## Technical notes

- Copy both source files to same-origin public assets: `public/skills/wardflow-quantum-claude-code-SKILL.md` and `public/skills/openclaw-tandem-hack-quantum-SKILL.md`.
- Extend `SKILLS` and `INSTALL_LANES` in `src/routes/quantum.tsx`; no component or layout changes needed — the section already maps over both arrays.
- No Nexus links, job IDs remain plain text, and no other page content changes.
