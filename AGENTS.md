# AGENTS.md

## Project purpose

This repository contains Gustavo Garozzo's personal professional portfolio.

The site is a public-facing representation of Gustavo's professional profile, experience, projects, technical skills, certifications, education and contact information.

The primary goals are:

- Present Gustavo clearly as a Backend Engineer.
- Communicate his experience with backend systems, APIs, integrations, cloud infrastructure and distributed systems.
- Show his transition/evolution toward AI Engineering through concrete projects and practices.
- Present selected projects as credible technical work.
- Provide a useful and trustworthy interactive chat about Gustavo's profile.
- Maintain a professional, distinctive and technically credible visual identity.
- Be responsive, accessible, fast and SEO-friendly.

This is a personal portfolio, not a generic developer template.

---

## Working principle

Before changing the project:

1. Read `data/DOCS.md` if it exists.
2. Read this `AGENTS.md`.
3. Read `.agent/PORTFOLIO_POLISH_HARNESS.md`.
4. Inspect the existing implementation before proposing changes.
5. Reuse the current architecture and components whenever practical.
6. Do not duplicate information across multiple sources when a shared source can be used.
7. Run validation after implementation.

Do not implement speculative changes before understanding the current implementation.

---

## Commands

Use the commands defined by the repository's current `package.json`.

At minimum, validate with:

- `npm run lint`
- `npm run build`

If the project contains additional test, typecheck or validation commands, use them when relevant.

Do not invent commands that are not present in the project.

---

## Source of truth for professional information

The current CV supplied for this project is the authoritative source for Gustavo's professional profile.

Professional information must remain consistent with the CV unless Gustavo explicitly provides an update.

The CV currently establishes, among other things:

- Backend Engineer positioning.
- 4+ years of professional experience.
- Node.js, TypeScript and NestJS as primary backend technologies.
- REST APIs, microservices, system integrations and event-driven architectures.
- PostgreSQL, Google Cloud SQL and Redis.
- AWS and Google Cloud experience.
- AWS Lambda, API Gateway and S3.
- Google Cloud Pub/Sub and Cloud Monitoring.
- Docker and CI/CD.
- Swagger/OpenAPI.
- Testing with Jest.
- AI Engineering projects involving LLMs, structured outputs, evaluation, tool calling and RAG.
- Professional experience at Aiotek and Qwavee IT.
- Barking Dogs as a co-founded product development initiative.
- Weather API as an AI Engineering project.
- UNICEN education.
- B2 English certification/training from UTN.
- The certifications explicitly listed in the current CV.

Do not replace CV-backed information with older portfolio copy.

Do not invent:

- Metrics.
- Client names.
- Revenue.
- Traffic numbers.
- Performance improvements.
- Employment responsibilities.
- Certifications.
- Degrees.
- Credential IDs.
- Dates.
- Awards.
- Testimonials.
- Technologies supposedly used professionally.

If information is not supported by the CV or another explicit project source, leave it out or mark it clearly as a personal/project demonstration.

---

## Professional positioning

The portfolio should communicate:

- Backend Engineer.
- Node.js / TypeScript / NestJS.
- APIs and system integrations.
- Distributed and event-driven systems.
- PostgreSQL and data consistency.
- AWS / Google Cloud.
- Production-oriented engineering.
- AI Engineering as an expanding complementary specialization.

Do not artificially reposition Gustavo as:

- Senior Engineer.
- Staff Engineer.
- Principal Engineer.
- AI Engineer with professional AI employment experience.

AI Engineering should be presented through the actual projects, learning and engineering practices supported by the source material.

---

## Content architecture

Professional profile information should have a structured source of truth whenever practical.

Prefer a shared profile/data module over repeating Gustavo's information across:

- Hero.
- About section.
- Experience.
- Skills.
- Projects.
- Certifications.
- Chat.
- Metadata.
- Structured data.

When information changes, the preferred workflow should allow the update to happen from one canonical source.

Do not create multiple competing copies of the same professional fact.

---

## Chat / profile assistant

The chat is a first-class feature of the portfolio.

It should answer questions about Gustavo using verified profile information.

The chat must:

- Answer clearly and naturally.
- Handle direct questions.
- Handle questions expressed with different wording.
- Handle combined questions involving multiple skills or experiences.
- Distinguish professional experience from personal projects.
- Distinguish current projects from completed projects.
- Avoid inventing facts.
- Say when the requested information is not available.
- Never fabricate metrics, employers, clients, responsibilities or credentials.
- Prefer concise answers with enough context to be useful.
- Maintain Spanish as the default language when the user asks in Spanish.
- Support English naturally if the visitor asks in English, provided the current application supports it.

The implementation should use structured profile data rather than relying exclusively on scattered hardcoded responses.

The profile assistant should be tested against a representative question matrix covering:

- Personal profile.
- Experience.
- Aiotek.
- Qwavee.
- Barking Dogs.
- Weather API.
- Technologies.
- Cloud.
- Databases.
- Architecture.
- AI Engineering.
- Education.
- Certifications.
- Projects.
- Contact.
- Job-search information if explicitly present in the profile source.

Questions outside the available profile should receive an honest fallback rather than a hallucinated answer.

---

## Chat UX

The chat must feel like part of the portfolio, not like an unrelated support widget.

Review:

- Opening state.
- Empty state.
- Suggested questions.
- Message hierarchy.
- User vs assistant messages.
- Loading state.
- Error state.
- Input behavior.
- Keyboard interaction.
- Mobile layout.
- Scroll behavior.
- Focus management.
- Accessibility labels.
- Visual relationship with the rest of the page.

Suggested prompts should be useful and varied rather than decorative.

Avoid fake system status messages that imply real infrastructure telemetry unless the underlying data is real.

---

## Visual design

The existing visual identity may evolve.

Preserve distinctive technical character where it contributes to Gustavo's identity, but improve professional clarity and visual hierarchy.

Prioritize:

- Typography.
- Spacing.
- Alignment.
- Composition.
- Visual rhythm.
- Information hierarchy.
- Section transitions.
- Image treatment.
- Responsive behavior.
- CTA clarity.
- Content density.
- Consistency.

Avoid generic portfolio patterns unless they genuinely improve the experience.

Do not automatically add:

- Excessive cards.
- Glassmorphism.
- Gradient backgrounds everywhere.
- Decorative badges.
- Arbitrary dashboards.
- Fake metrics.
- Excessive animations.
- Generic stock imagery.

A visual element must support the personal brand or explain something.

---

## Photography / imagery

A professional personal image may be introduced if it improves the portfolio.

If a real portrait is available, prefer it over generic developer stock photography.

Do not generate or select an image that implies factual information about Gustavo.

Technical illustrations may be used when they communicate:

- Architecture.
- Integrations.
- Distributed systems.
- AI workflows.
- Backend engineering.

Visuals must support content rather than compete with it.

---

## Projects

Projects should be presented using information supported by the portfolio source and CV.

Current relevant projects include:

- Barking Dogs.
- Sinergy Consulting Platform.
- WatchDog Price Tracker.
- ClickCore Agency Landing.
- Weather API.

Where appropriate, distinguish:

- Professional/client work.
- Co-founded product work.
- Personal projects.
- AI Engineering experiments.

Do not present estimated or simulated metrics as real project outcomes.

---

## Metrics

Metrics must be treated as factual claims.

Only show a metric if its source is known and it represents a real measured result.

Examples of information that must not be presented as real without evidence:

- Fake uptime.
- Fake API latency.
- Fake throughput.
- Fake memory usage.
- Fake technical coverage.
- Simulated health checks.
- Estimated Lighthouse results presented as current facts.

If an interactive dashboard is retained, it must be clearly presented as a demonstration or simulation.

---

## Certifications

Certification information must come from the authoritative profile/CV source or the actual certificate files.

Never invent:

- Certificate dates.
- Institutions.
- Credential IDs.
- Verification URLs.
- Course duration.
- Certification level.
- Skills allegedly verified by the credential.

Keep certification names and institutions consistent across the portfolio and chat.

---

## SEO

The portfolio should accurately communicate:

- Gustavo Garozzo.
- Backend Engineer.
- Node.js.
- TypeScript.
- NestJS.
- APIs.
- System integration.
- Cloud.
- AI Engineering.

SEO copy must remain natural.

Do not keyword stuff.

Metadata and structured data must describe visible, factual content.

Use appropriate:

- Title.
- Description.
- Canonical URL.
- Open Graph metadata.
- Twitter/X metadata when appropriate.
- Person structured data where supported by visible information.
- Project/work-related structured data only where accurate.

Do not invent organization relationships or professional claims.

---

## Accessibility

Maintain:

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Accessible interactive controls.
- Appropriate labels.
- Correct heading hierarchy.
- Sufficient contrast.
- Reduced-motion support.
- Accessible chat behavior.

Do not rely exclusively on color or visual decoration to communicate meaning.

---

## Responsive design

Every change must be evaluated at:

- Mobile.
- Tablet.
- Desktop.
- Wide desktop where layout can materially change.

Avoid desktop-first fixes that break mobile composition.

Pay special attention to:

- Hero.
- Navigation.
- Chat.
- Project cards.
- Tables/data-like visual blocks.
- Technology lists.
- Contact section.
- Images.

---

## Dependency policy

Do not add a dependency unless:

1. It solves a concrete requirement.
2. Existing project dependencies cannot reasonably solve it.
3. It does not introduce disproportionate complexity.

Do not add libraries merely for visual decoration.

---

## Scope control

Do not perform unrelated refactors during portfolio polish.

Separate:

- Required.
- Supporting.
- Optional.

Complete the required work first.

If a larger architectural issue is discovered, document it rather than expanding the scope automatically.

---

## Documentation

If `data/DOCS.md` exists, record each completed iteration there.

The log should contain:

- Iteration number.
- Date.
- What changed.
- Relevant validation.
- Important decisions.

Do not rewrite previous iterations.

---

## Final standard

The finished portfolio should feel like:

A real Backend Engineer's professional portfolio with a strong technical identity, credible information, useful projects, polished visual execution and an interactive assistant that accurately represents Gustavo.

It should not feel like:

- A generic developer template.
- A fake monitoring dashboard.
- An AI-generated personal website.
- A résumé dumped into a webpage.
- A marketing landing page disconnected from the actual profile.