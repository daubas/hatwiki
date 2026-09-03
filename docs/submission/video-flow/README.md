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
2. `paper-edit.json` records eight reviewable Editorial Beats mapped to the
   recorded-course chapters.
3. Real UI recordings become evidence only after they exist, are redacted, and
   are tied to source ranges and hashes.
4. Human keep/delete decisions are recorded before any cut is assembled.
5. Paper edit, cut diff, subtitles, visual QA, technical QA, and publication
   remain separate gates.

## Current status

The paper edit is intentionally `proposed`. The two unresolved evidence gaps
are the visible authenticated write flow and a fresh WebMCP session reading the
updated page. Do not call the video `cut-ready` or publish a final master until
those real operations are captured and verified.

The current HatWiki implementation exposes the public `search_wiki`,
`read_page`, and authenticated `edit_page` paths. The planned `add_source`,
`get_ingestion_status`, and `inspect_changes` tools from the product note are
not shown in this video until they actually exist.

## Review order

1. Approve the learner outcome and the proposed beats.
2. Finish the Gate A/B product work that the canonical HatWiki note requires.
3. Record clean raw UI takes and human narration; preserve every source.
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
or publication.
