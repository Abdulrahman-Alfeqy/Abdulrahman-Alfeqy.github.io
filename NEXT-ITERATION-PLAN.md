# Portfolio Improvement Plan — Next Cycle

This backlog captures the improvements identified while reviewing the current portfolio and its public GitHub projects. Keep the existing RPG visual identity while making the work easier to evaluate, access, and trust.

## 1. Make the portfolio easy to evaluate — complete

- [x] Add a concise professional introduction on the title/first screen, including third-year AI student context.
- [x] Add immediate **View Resume** and **Contact** actions so visitors do not need to enter the game to reach them.
- [x] Show the requested `LVL 3 AI ENGINEER` identity in the title screen and HUD, with the academic/professional context clear.

## 2. Add evidence to the strongest projects

- [x] Curate six public GitHub projects with direct repository links and updated descriptions.
- [ ] Optional future enhancement: add focused case studies and visual evidence if shareable project materials become available.
- [ ] Optional future enhancement: add live demos or screenshots/video where available; use sanitized screenshots for client work.
- [x] Keep local/offline projects, including data-analysis work, in the portfolio even when no public repository, demo, or screenshots are available.
- [x] Clearly label project cards that do not have a public repository or demo link.
- [x] Remove duplication between curated project cards and the live GitHub repository list.

## 3. Improve accessibility and mobile readability — implementation complete

- [x] Use semantic buttons for zone navigation and anchors for project/contact links.
- [x] Add visible keyboard focus, accessible dialog controls, and names/announcements where needed.
- [x] Increase small mobile navigation labels while preserving the theme.

## 4. Harden live GitHub rendering — complete

- [x] Render repository names, descriptions, and language labels as text rather than interpolated HTML.
- [x] Create repository links as DOM anchors, validate that they use HTTPS, and avoid inline event handlers.
- [x] Provide a clear placeholder state if GitHub API data is unavailable or rate-limited.

## 5. Make skills and social previews more credible — complete

- [x] Replace unsupported percentage bars with skill groups.
- [x] Update `images/og-image.png` so it matches the current AI/ML positioning and page metadata.
- [x] Remove unverified Twitter/X account metadata.

## 6. Keep live GitHub project cards descriptive — complete

- [x] Review all seven public GitHub repositories and use the existing project summaries for repositories whose GitHub About description is blank.
- [x] Replace generic missing-description text with the matching portfolio summary or a useful README pointer for future repositories.
- [x] Align the Cyber-Intel, HouseHub, and CARVIX summaries with their repository documentation.

## Remaining review checks

- [x] A first-time visitor can identify the role, student context, resume, and contact route immediately.
- [x] Each project card either links to a public repository or clearly notes that no public repository or demo is linked; extra evidence is optional when materials are unavailable.
- [x] Main navigation and dialog controls use keyboard-operable semantics and visible focus styling.
- [x] GitHub repository text is inserted as text, and unavailable API data has a placeholder state.
- [x] Browser title, social preview image, and metadata describe the same current profile.
