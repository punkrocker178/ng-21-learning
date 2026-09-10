# Copilot Instructions

## Plan Persistence

When you create an implementation plan, save it as a Markdown file under `~/.copilot/plans/` so the user can review it after the session.

- Create the directory if it does not exist.
- Use a descriptive kebab-case filename with the date prefix `YYYY-MM-DD-`, for example `2026-09-10-add-plan-persistence.md`.
- Write the plan to the file before presenting it as complete.
- Keep the file current as the plan changes, including task status, decisions, validation results, and blockers.
- Preserve completed plans; do not overwrite an unrelated plan or store plans only in session memory.
- When referring to a previous plan, search `~/.copilot/plans/` first and update the relevant file when continuing that work.

Use memory for brief cross-session preferences or facts only. The durable record of implementation plans belongs in `~/.copilot/plans/`.
