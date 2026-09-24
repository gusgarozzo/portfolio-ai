# Portfolio Polish Harness

## Purpose

This harness governs improvements to Gustavo Garozzo's personal portfolio.

The objective is to improve:

- Professional positioning.
- Visual quality.
- UX.
- Responsive behavior.
- Accessibility.
- SEO.
- Content accuracy.
- Project presentation.
- Chat quality.

The current portfolio should evolve rather than be discarded without reason.

The visual identity may be modernized where doing so produces a materially better professional result, but changes must remain intentional and connected to Gustavo's technical profile.

---

## Core loop

Follow exactly:

1. Inspect.
2. Decide.
3. Implement.
4. Validate.
5. Stop.

Do not continuously iterate on tiny subjective changes.

---

## Phase 1 — Inspect

Before modifying anything:

1. Read `data/DOCS.md` if present.
2. Read `AGENTS.md`.
3. Read this harness.
4. Inspect the complete current page structure.
5. Inspect the main layout and all relevant sections/components.
6. Inspect global styles and design tokens.
7. Inspect responsive rules.
8. Inspect the current chat implementation end-to-end.
9. Inspect profile/content data sources.
10. Inspect metadata and structured data.
11. Inspect project links and external URLs.
12. Inspect the current assets and image strategy.

Also inspect the installed design skills where available:

- `frontend-design`
- `ux-ui-pro-max`

Use:

`frontend-design`

for:

- visual hierarchy.
- composition.
- typography.
- spacing.
- responsive composition.
- image usage.
- visual polish.

Use:

`ux-ui-pro-max`

for:

- navigation.
- UX flows.
- CTA hierarchy.
- interaction design.
- accessibility.
- responsive UX.
- usability.

The skills provide guidance. They do not override the repository or this harness.

---

## Phase 2 — Audit findings

Classify findings:

### BLOCKER

Issues that:

- Misrepresent Gustavo.
- Cause major chat failures.
- Break navigation.
- Break mobile usability.
- Break accessibility.
- Cause important runtime/build failures.
- Expose incorrect professional information.

### IMPORTANT

Issues that materially affect:

- Professional credibility.
- Content hierarchy.
- Chat usefulness.
- Project discoverability.
- Responsive UX.
- Visual coherence.
- SEO.

### POLISH

Issues involving:

- Small spacing inconsistencies.
- Minor typography adjustments.
- Subtle alignment.
- Small visual refinements.

Do not spend major implementation time on POLISH issues while BLOCKER or IMPORTANT findings remain.

---

## Content audit

Compare current portfolio content against the current CV.

Check:

- Title.
- Professional positioning.
- Years of experience.
- Experience chronology.
- Aiotek responsibilities.
- Qwavee responsibilities.
- Barking Dogs.
- Projects.
- Technologies.
- Cloud.
- Databases.
- Architecture.
- AI Engineering.
- Education.
- Certifications.
- Contact information.

Identify contradictions.

Do not silently reconcile conflicting information.

Prefer the current CV where the task is explicitly "update from CV".

---

## Truthfulness audit

Look specifically for:

- Simulated metrics presented as facts.
- Estimated numbers presented as measured results.
- Technology lists implying professional experience not supported by the source.
- Certifications that do not exist in the current source.
- Outdated dates.
- Unsupported client claims.
- Unsupported business impact claims.
- Ambiguous project status.

Replace unsupported claims with factual descriptions.

---

## Chat audit

Inspect the actual implementation before deciding how to modify it.

Determine:

- Where profile information comes from.
- Whether answers are hardcoded.
- Whether an LLM is involved.
- How prompts are constructed.
- Whether there is retrieval/context injection.
- Whether conversation history is used.
- How unknown questions are handled.
- Whether errors are handled.
- Whether language detection exists.
- Whether suggested questions exist.
- Whether responses can contradict the portfolio.
- Whether data is duplicated between UI and chat.

Do not assume the chat architecture.

---

## Chat quality goal

The assistant must be able to answer a broad but bounded set of questions about Gustavo accurately.

Build a representative question matrix.

At minimum test:

### Profile

- Who is Gustavo?
- What does Gustavo do?
- How much experience does he have?
- Where is he based?

### Backend

- What technologies does he use?
- Does he work with Node.js?
- Does he use NestJS?
- Does he work with REST APIs?
- Does he have microservices experience?

### Databases

- Does he work with PostgreSQL?
- Does he have experience with Redis?
- What database technologies has he used?

### Cloud

- Does he have AWS experience?
- What AWS services has he used?
- Does he have Google Cloud experience?
- Has he used Pub/Sub?

### Professional experience

- What did he do at Aiotek?
- What did he do at Qwavee?
- What kind of integrations did he build?
- Has he worked with ERP and marketplace integrations?

### Architecture

- What kind of architectures has he worked with?
- Does he have event-driven experience?
- Has he worked with asynchronous processing?
- Does he work with Swagger/OpenAPI?

### AI Engineering

- Does he work with AI?
- What is Weather API?
- Has he worked with LLMs?
- What are structured outputs?
- Has he worked with tool calling?
- Has he worked with RAG?
- How is AI related to his backend profile?

### Projects

- What projects has he built?
- What is Barking Dogs?
- What is Sinergy?
- What is WatchDog?
- What is ClickCore?
- What is Weather API?

### Education

- What did he study?
- Where did he study?
- What is his English level?

### Certifications

- What certifications does he have?
- Which AI certifications does he have?
- Which architecture certifications does he have?
- Does he have AWS-related training?

### Contact

- How can someone contact him?
- Does he have LinkedIn?
- Does he have GitHub?

The exact wording does not matter.

Equivalent questions should work.

---

## Chat answer policy

Answers should:

- Use verified profile data.
- Be concise but informative.
- Distinguish professional experience from personal projects.
- Avoid hallucination.
- Avoid claiming expertise simply because a technology appears in a list.
- Avoid invented percentages or performance numbers.
- Avoid unsupported business outcomes.
- Be transparent about missing information.

When the information does not exist:

Prefer something similar to:

> No tengo ese dato en la información profesional disponible de Gustavo.

Do not fabricate an answer.

---

## Profile data architecture

Prefer a canonical structured profile model.

Possible domains:

- identity.
- professional summary.
- experience.
- skills.
- projects.
- education.
- certifications.
- contact.
- links.
- AI profile.

The exact file names are implementation decisions after inspection.

The important rule is that UI and chat should consume the same factual source wherever practical.

---

## Visual audit

Review:

### Hero

- Is the role immediately clear?
- Is the value proposition readable?
- Is there enough personality?
- Does the visual support the identity?
- Is the primary CTA obvious?

### Navigation

- Is the portfolio easy to scan?
- Can visitors reach projects, experience and contact quickly?
- Does mobile navigation remain clean?

### Experience

- Is chronology obvious?
- Are responsibilities readable?
- Is the distinction between companies clear?

### Projects

- Are projects visually differentiated?
- Is project purpose clear?
- Are links obvious?
- Are project types clearly distinguished?

### Skills

- Is the information structured rather than dumped?
- Is the strongest stack visually emphasized?

### Certifications

- Are credentials readable?
- Are they presented without false authority signals?

### Chat

- Does it look intentional?
- Does it belong to the portfolio?
- Is it useful before typing?
- Are suggested questions good?
- Is the mobile UX good?
- Is the loading/error state polished?

### Contact

- Is contact information obvious?
- Is there a clear next action?

---

## Image strategy

An image may be introduced when it improves the composition.

Preferred order:

1. Real professional portrait supplied by Gustavo.
2. Original technical visual that represents his work.
3. Custom generated visual that does not imply false facts.
4. Stock photography only when there is a compelling reason.

Avoid generic "developer coding at laptop" imagery.

Do not let imagery overwhelm the professional content.

---

## Visual correction principle

Prefer the smallest coherent change that solves the problem.

Examples:

- Fix excessive spacing rather than redesigning the section.
- Improve hierarchy rather than adding cards.
- Replace fake metrics rather than adding more metrics.
- Consolidate repeated content rather than duplicating it.
- Improve the chat architecture rather than simply increasing prompt length.

---

## Responsive review

Check at least:

- 360–390px mobile.
- Tablet width.
- Standard desktop.
- Wide desktop.

Pay particular attention to:

- Hero composition.
- Navigation.
- Chat height.
- Chat input.
- Project grids.
- Long technology lists.
- Typography.
- Horizontal overflow.
- Images.
- CTA wrapping.

---

## SEO review

Check:

- Page title.
- Description.
- Canonical.
- Metadata.
- Open Graph.
- Headings.
- Semantic content.
- Internal navigation.
- Person structured data when justified.
- Consistency between visible information and metadata.

Do not add claims solely for SEO.

---

## Accessibility review

Check:

- Heading hierarchy.
- Keyboard navigation.
- Focus visibility.
- Button labels.
- Link labels.
- Form labels.
- Chat input labeling.
- Chat status announcements.
- Contrast.
- Reduced motion.
- Mobile touch targets.

---

## Implementation batching

Group changes into coherent batches.

Recommended order:

### Batch 1 — Content and data

- Canonical profile data.
- Experience.
- Skills.
- Projects.
- Education.
- Certifications.
- Contact.
- Remove outdated facts.

### Batch 2 — Chat

- Connect chat to canonical profile data.
- Improve prompt/context or retrieval according to actual implementation.
- Add fallback behavior.
- Improve suggested questions.
- Improve loading/error states.
- Test question matrix.

### Batch 3 — Visual/UX

- Hero.
- Typography.
- Spacing.
- Project presentation.
- Chat presentation.
- Image/visual support.
- Responsive behavior.

### Batch 4 — SEO/accessibility

- Metadata.
- Structured data.
- Focus states.
- Semantic improvements.
- Accessible chat interaction.

Do not mix unrelated refactors into these batches.

---

## Validation

Before stopping:

1. Run lint.
2. Run build.
3. Check all internal navigation.
4. Check external links.
5. Check chat.
6. Check unknown-question fallback.
7. Check mobile layout.
8. Check desktop layout.
9. Check metadata.
10. Check structured data.
11. Check that no outdated factual claims remain.
12. Check that no unsupported metrics remain.

Do not claim visual validation if reliable browser/screenshot inspection was not available.

---

## Correction limit

Use:

- One audit.
- One implementation pass.
- One correction pass.
- One final verification.

Do not enter an endless subjective polish loop.

---

## Stop condition

Stop when:

- The portfolio accurately represents the current CV.
- The chat can answer the representative question matrix reliably.
- Unsupported claims have been removed or clearly classified.
- The visual hierarchy is professional.
- The new visual elements feel intentional.
- Mobile and desktop layouts are coherent.
- SEO/accessibility fundamentals are covered.
- Lint/build pass.

The final result should still clearly be Gustavo's portfolio.

Do not continue changing the design merely because another possible aesthetic exists.