# hatwiki-webmcp-challenge — paper edit 0.1-proposal

## Global context (not a review item)

- Status: `proposed`
- Timeline: hatwiki-webmcp-demo (1920x1080 at 30 fps)
- Duration: 00:02:40 actual
- Duration target: 00:02:40; hard range 00:02:20–00:02:55
- Resolve/FCPXML state: proposal cutlist only; it is not import-ready until the paper edit is cut-ready.
- Metadata:
  - `competition`: "Open WebMCP Challenge"
  - `learner_outcome`: "By the end, the viewer can see search_wiki, read_page, human authorization, Git revision, and a fresh-session readback."
  - `narration_language`: "English"
  - `publication_target`: "Public YouTube demo under three minutes with clear audio."
  - `purpose`: "Prove that a human correction becomes shared memory for a new browser agent session."
  - `source_policy`: "Use real deployed UI and real tool operations as evidence; use no fabricated UI."

## Chapter 00 — Environment readiness

> Group label only; review the Editorial Beats below.

### Beat beat-00

Teaching purpose: Establish the deployed entry point and the real WebMCP environment.

Spoken content:
> This is HatWiki, a live Git-native Wiki where people and browser agents maintain shared knowledge together. We will use the deployed site and a browser agent with WebMCP enabled.

Narration spine: `English opening pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record a human voiceover after the live URL and WebMCP host are verified.
Narration duration: 00:00:10
Narration acceptance: The opening names HatWiki, the live environment, and the WebMCP context in one clear sentence.
Visual slots:
- `visual-00` / `Live HatWiki home and Knowledge Loom` (planned; illustration)
  - None.
  - Production method: Capture the deployed HatWiki home page without private browser data.
  - Duration: 00:00:10
  - Acceptance: The live URL, HatWiki identity, and Knowledge Loom are readable.
Duration: 00:00:10
Unresolved work:
- None.

## Chapter 01 — Result and self-introduction

> Group label only; review the Editorial Beats below.

### Beat beat-01

Teaching purpose: State the viewer promise before showing implementation details.

Spoken content:
> Agent conversations are useful, but their context is temporary. HatWiki turns important decisions into inspectable Wiki pages with citations, links, and Git history.

Narration spine: `English product promise pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record a human voiceover against the home page and final-state reference frame.
Narration duration: 00:00:15
Narration acceptance: The product promise is understandable without naming implementation libraries.
Visual slots:
- `visual-01` / `Human-facing Wiki index` (planned; illustration)
  - None.
  - Production method: Capture the public Wiki index and one readable page.
  - Duration: 00:00:15
  - Acceptance: A viewer can see this is a usable Wiki, not only a tool registration screen.
Duration: 00:00:15
Unresolved work:
- None.

## Chapter 02 — Task begins

> Group label only; review the Editorial Beats below.

### Beat beat-02

Teaching purpose: Define one repeatable task and its success evidence.

Spoken content:
> Our task is to improve an existing human-written research page, preserve its evidence boundary, and make the corrected result available to a new agent session.

Narration spine: `English task setup pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record a concise task statement over the selected Wiki page.
Narration duration: 00:00:15
Narration acceptance: The task names the existing page, the human decision, and the fresh-session readback.
Visual slots:
- `visual-02` / `Selected Agent2UCB page and source citation` (planned; illustration)
  - None.
  - Production method: Capture the real page, citation, and revision fields after the demo page is fixed for recording.
  - Duration: 00:00:15
  - Acceptance: The selected page is clearly an existing page with source context.
Duration: 00:00:15
Unresolved work:
- None.

## Chapter 03 — First plan and Agent theory

> Group label only; review the Editorial Beats below.

### Beat beat-03

Teaching purpose: Show the browser agent discovering and reading the page through WebMCP.

Spoken content:
> Find the existing Agent2UCB page using HatWiki's tools. Then read it and summarize the evidence boundary in three bullets. The agent searches first and reads the canonical page instead of guessing from chat context.

Narration spine: `English WebMCP explanation pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record human narration after a real WebMCP host completes search_wiki followed by read_page.
Narration duration: 00:00:25
Narration acceptance: The recording visibly proves both tool calls and shows structured page ID, citations, and revision.
Visual slots:
- `visual-03` / `WebMCP search and read evidence` (planned; illustration)
  - None.
  - Production method: Capture the real external agent host and redact private session details.
  - Duration: 00:00:25
  - Acceptance: search_wiki and read_page names, inputs, and bounded results are readable.
Duration: 00:00:25
Unresolved work:
- None.

## Chapter 04 — Complete the plan

> Group label only; review the Editorial Beats below.

### Beat beat-04

Teaching purpose: Make the human safety decision visible before any write operation.

Spoken content:
> Propose one small clarification, but do not publish until I approve the exact text. HatWiki separates agent assistance from publication and keeps the human decision visible.

Narration spine: `English authorization boundary pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record the agent proposal and the human approval prompt in one uninterrupted take.
Narration duration: 00:00:25
Narration acceptance: The agent stops before the write call and the proposed text is readable.
Visual slots:
- `visual-04` / `Proposed clarification before approval` (planned; illustration)
  - None.
  - Production method: Capture the real agent proposal and the explicit approval boundary.
  - Duration: 00:00:25
  - Acceptance: No write operation occurs before the on-screen human approval.
Duration: 00:00:25
Unresolved work:
- None.

## Chapter 05 — Manual execute

> Group label only; review the Editorial Beats below.

### Beat beat-05

Teaching purpose: Show the approved write, the permission boundary, and the durable Git result.

Spoken content:
> I approve this exact sentence. Publish it to HatWiki using edit_page. After approval, the authenticated server validates the change and records a Git-backed revision.

Narration spine: `English write-path pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record the real authenticated edit_page call only after Gate A write UX is verified.
Narration duration: 00:00:25
Narration acceptance: The authorization field, result status, page revision, and Git commit or diff are all visible.
Visual slots:
- `visual-05` / `Authenticated edit and Git revision` (planned; illustration)
  - None.
  - Production method: Capture the real write flow, then show the public readback and GitHub revision without exposing credentials.
  - Duration: 00:00:25
  - Acceptance: The result is verifiable as committed, not merely a success message fabricated in the video.
Duration: 00:00:25
Unresolved work:
- `Gate A write-flow evidence` (gap): Complete and test the visible authenticated edit flow, including diff or preview and committed/conflict/approval_required result.; 00:00:05; A real external WebMCP host can complete the write using the same signed-in session.

## Chapter 06 — Validate and fix

> Group label only; review the Editorial Beats below.

### Beat beat-06

Teaching purpose: Prove that the shared state survives a new agent session and remains traceable.

Spoken content:
> Now I open a fresh agent session. It can read the updated page, the citation, and the new revision without inheriting the previous conversation. The shared memory is the Wiki and Git history, not the chat transcript.

Narration spine: `English fresh-session validation pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record a new browser-agent session reading the updated public page after the write has fully propagated.
Narration duration: 00:00:25
Narration acceptance: The fresh session reads the corrected sentence and reports the current revision and source.
Visual slots:
- `visual-06` / `Fresh-session readback` (planned; illustration)
  - None.
  - Production method: Capture a new session and the updated public page after commit, GitHub readback, and R2 publication.
  - Duration: 00:00:25
  - Acceptance: The second session visibly reads the new state without relying on the first session's transcript.
Duration: 00:00:25
Unresolved work:
- `Gate C fresh-session evidence` (gap): Run the complete write, public readback, and fresh WebMCP session against the deployed revision.; 00:00:08; The updated page, citation, and revision are available to a new session.

## Chapter 07 — Homework and close

> Group label only; review the Editorial Beats below.

### Beat beat-07

Teaching purpose: Close on the durable product pattern and give the viewer a verifiable next step.

Spoken content:
> HatWiki demonstrates a practical WebMCP pattern: agents help maintain shared knowledge, people control publication, and every public result remains inspectable through the Wiki, citations, and Git history.

Narration spine: `English closing pickup` (planned; illustration)
Narration source ranges:
- None.
Narration production method: Record a short human closing over the updated page and Knowledge Loom.
Narration duration: 00:00:20
Narration acceptance: The final sentence names the human/agent boundary and points to the live demo and public repository.
Visual slots:
- `visual-07` / `Updated page, Knowledge Loom, and repository link` (planned; illustration)
  - None.
  - Production method: Capture the final verified state and the public project link.
  - Duration: 00:00:20
  - Acceptance: The video ends on a verifiable product state, not a generic title card.
Duration: 00:00:20
Unresolved work:
- None.
