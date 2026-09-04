# HatWiki video-flow plan

This folder is the source of truth for the competition video production
pipeline. It uses the `paul-video-flows` recorded-course contract as a compact
single-outcome demo, not as a conventional multi-lesson course.

## Learner outcome

By the end of the video, a viewer can verify that a human correction made
through HatWiki becomes shared, cited, Git-backed memory that a new browser
agent session can read through WebMCP.

## Why this pipeline

The existing submission draft describes a good interaction, but it is not yet a
production-safe source of truth. The course pipeline adds the missing discipline:

1. `course-manifest.json` records the approved scope, duration, and gates.
2. `paper-edit.json` records five reviewable Editorial Beats mapped to the
   actual demo flow; the recorded-course chapter example is not a requirement.
3. Real UI recordings become evidence only after they exist, are redacted, and
   are tied to source ranges and hashes.
4. Human keep/delete decisions are recorded before any cut is assembled.
5. Paper edit, cut diff, subtitles, visual QA, technical QA, and publication
   remain separate gates.

## Current status

Gate C operational acceptance is complete on the deployed site: a real external
browser host registered all six tools, exercised source/status/inspection/edit
flows and their idempotent replays, preserved a conflict candidate through a
retry, and read the committed result from a new session. The Wiki and Graph
were also checked at 320 px and 375 px, including keyboard Graph interaction.

The paper edit remains intentionally `proposed`. Operational acceptance is not
recorded-video evidence, and this folder has no approved, redacted raw takes in
`assets` yet. Do not call the video `cut-ready` or publish a final master until
the real UI operations are captured, inventoried, privacy-reviewed, rights-
reviewed, and approved through the separate editorial and technical gates.

When a browser provides `document.modelContext`, anonymous sessions register
`search_wiki` and `read_page`; a GitHub-signed-in session registers all six:
`search_wiki`, `read_page`, `edit_page`, `add_source`,
`get_ingestion_status`, and `inspect_changes`. Source text stays in private D1
and is owner-readable only; the public R2 projection never contains its body.

## Five-beat review order

1. Outcome and environment.
2. Authorized source, task, and human-facing Wiki surface.
3. Agent discovery through `add_source`, `get_ingestion_status`, `search_wiki`,
   and `read_page`.
4. `inspect_changes`, publication declaration, `edit_page`, Git commit receipt,
   and public R2 snapshot.
5. Fresh-session validation and close.

## Production gates

1. Approve the learner outcome and the proposed beats.
2. Preserve the completed Gate C operational acceptance separately from the
   recorded evidence; do not substitute one for the other.
3. Record clean raw UI takes and human narration; preserve every source and
   redact source bodies, account details, cookies, and credentials.
4. Inventory and hash the takes, then attach them to the existing beats.
5. Record human editorial decisions and regenerate the paper edit.
6. Review the cut-diff report, then assemble a versioned review package.
7. Review visual evidence, subtitle content/timing, audio, privacy, rights, and
   full decode as separate gates.
8. Publish the public YouTube master only after the deployed revision, README,
   source repository, and video tell the same story.

## Runner commands

Run the shared runner from its skill root:

```sh
SKILL_ROOT=/Users/baochen10luo/.codex/skills/paul-video-flows
python3 "$SKILL_ROOT/scripts/flow.py" plan docs/submission/video-flow/course-manifest.json
python3 "$SKILL_ROOT/scripts/flow.py" materialize docs/submission/video-flow/course-manifest.json
```

Materialization creates a human-readable proposal paper edit and proposal
cut-list. It does not render media or imply that the video is ready for Resolve
or publication. After changing a source artifact, run `materialize` rather than
editing anything in `generated/`; the manifest declares a new versioned output
path when an earlier generated review differs.
