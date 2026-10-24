# Portfolio Improvement Plan — Next Cycle

This backlog captures the improvements identified while reviewing the current portfolio and its public GitHub projects. Keep the existing RPG visual identity while making the work easier to evaluate, access, and trust.

## 1. Make the portfolio easy to evaluate

- Add a concise professional introduction on the title/first screen, including third-year AI student context.
- Add immediate **View Resume** and **Contact** actions so visitors do not need to enter the game to reach them.
- Keep the requested `LVL 3 AI ENGINEER` identity as part of the visual HUD, while making the real academic/professional context clear.

## 2. Add evidence to the strongest projects

- Select the strongest 4–6 projects and give each a focused case study: problem, personal contribution, approach, outcome, and stack.
- Add working repository or live-demo links and screenshots/video where available.
- For client or private projects, add sanitized screenshots and state clearly that source/demo access is private.
- Resolve the currently unlinked Power BI/Excel and other projects with evidence links, or label them as private work.
- Reduce duplication between curated project cards and the live GitHub repository list.

## 3. Improve accessibility and mobile readability

- Use semantic buttons for zone navigation and anchors for project/contact links.
- Add visible keyboard focus, keyboard operation for the dialog, and accessible names/announcements where needed.
- Increase small mobile navigation and pixel-font text to readable sizes while preserving the theme.

## 4. Harden live GitHub rendering

- Render repository names, descriptions, and language labels as text rather than interpolated HTML.
- Create repository links as DOM anchors, validate that they use HTTPS, and avoid inline event handlers.
- Provide a clear fallback if GitHub API data is unavailable or rate-limited.

## 5. Make skills and social previews more credible

- Replace unsupported percentage bars with skill groups or evidence-backed proficiency labels.
- Update `images/og-image.png` so it matches the current AI/ML positioning and page metadata.
- Verify the Twitter/X account metadata and remove it if there is no matching account.

## Completion checks

- A first-time visitor can identify the role, student context, resume, and contact route immediately.
- Key project claims have a visible proof link or are clearly labeled as private.
- Main navigation and dialogs can be used with a keyboard and remain readable on mobile.
- GitHub repository text cannot be interpreted as injected HTML, and unavailable API data does not break the section.
- Browser title, social preview image, and metadata describe the same current profile.
