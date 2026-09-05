# Remove Nexus link from Quantum page

## Problem
The Quantum page contains a direct link to a Quantinuum Nexus job (`https://qnexus.nexus.quantumcomputing.co.uk/jobs/7f8ad56f`). Unauthenticated visitors cannot access Nexus, so the link is confusing and leads to a dead end.

## Change
In `src/routes/quantum.tsx`:
- Remove the "View job 7f8ad56f on Nexus" anchor and its `ExternalLink` icon.
- Keep the job ID displayed as plain text (`job 7f8ad56f`) so the receipt reference remains intact.
- Remove the now-unused `ExternalLink` import from `lucide-react` if it is no longer used elsewhere in the file.

## Verification
- Run `bunx tsgo --noEmit` to confirm TypeScript still compiles.
- Open `/quantum` in the preview and confirm the Nexus link is gone while the receipt card, job ID, and surrounding text remain.
