# CLAUDE.md — Project Rules for Red Light Rejuve

## Repo Rules

1. **Do NOT force-print long files.** Default to short diffs and targeted excerpts only.
2. **Before reading/editing any file, confirm we are in the correct project folder for "Design D".**
3. **When asked to "show a file", output ONLY the relevant sections (max 120 lines)** unless explicitly asked for a full file dump.
4. **Prefer:** `rg` (ripgrep) + `sed` small ranges + file tree summaries + `git diff`.
5. **Every change must be:** (a) small, (b) tested locally, (c) committed with a clear message.
6. **Never edit copy or layout without referencing the design source-of-truth:**
   `Google Drive > e-com shopify > red light rejuve > website > Design D`
7. **If Google Drive is not directly accessible,** ask the user to export Design D assets into the repo (or paste content here) and proceed.
