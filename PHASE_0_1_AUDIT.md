# Phase 0–1 Audit — Foundation & Identity Cleanup

Branch: `phase-0-1-foundation`

This file records the first cleanup pass before visual refactoring. The goal is to reduce risk and preserve the existing look while preparing the project for systematic polishing.

## Phase 0 — completed / started

### Git safety

- Work is isolated on `phase-0-1-foundation` instead of editing `main` directly.
- `.gitignore` now protects `.env`, `.env.*`, `.vscode/`, logs, temp files, `.DS_Store`, and `Thumbs.db`.
- Existing functionality has not been intentionally changed.

### Asset risk found

- `Images/Milky Way.jpg` is about 62 MB and is not suitable as a normal web-delivery asset.
- The optimized `Images/Milky Way nhẹ.jpg` already exists and is much smaller.
- Recommendation: keep the large original outside the production repo in a future cleanup commit, after confirming no code path depends on it.

### External asset risk

The site still references some remote images and CDNs. These should be reviewed later for:

- availability
- source / license
- local fallback
- performance impact

Do not mass-download or replace them before checking attribution.

---

## Phase 1 — CSS architecture audit

### Main problem

`style.css` contains several generations of visual styling and patch-style fixes. `observatory.css` currently overrides many of those older rules to produce the newer Observatory identity.

The site therefore looks more coherent than the underlying CSS architecture actually is.

### Duplicate / conflict areas already identified

The following selectors appear multiple times or are layered with competing definitions:

- `.grid`
- `.planet-card`
- `.planet-card img`
- `.planet-card h3`
- `.modal`
- `.modal-content`
- `.modal-content img`
- `.close-btn`
- several button styles
- legacy neon / glassmorphism rules overridden by Observatory styles

### Visual systems currently mixed together

1. **Legacy cyber-neon system**
   - bright cyan
   - magenta
   - large glows
   - glassmorphism
   - game-like HUD styling

2. **Observatory system**
   - `#080D14` dark space
   - `#DEC195` Observatory Gold
   - `#A5CFD5` Ice Blue
   - quieter typography
   - restrained borders and shadows

3. **Story / journey system**
   - older sci-fi HUD styling
   - partially normalized by `journey.css`

The Observatory system is the target design direction defined in `SPACE_WEB_MASTER_PLAN.md`.

---

## Safe refactor strategy

Do **not** delete legacy CSS in one large pass.

Refactor in this order:

1. Identify which legacy selectors are still required by current markup.
2. Move stable design tokens into a dedicated token layer or a clearly grouped `:root` section.
3. Consolidate duplicated component rules one component at a time.
4. Compare before / after visually after each component cleanup.
5. Only remove old rules after confirming no regression on desktop and mobile.

Recommended component order:

1. buttons
2. planet cards
3. modal
4. generic glass cards
5. section headings
6. timeline cards
7. Observer HUD
8. Story controls

---

## Identity rules for Phase 1

The following must be preserved:

- Hero remains the visual reference.
- Main palette remains Observatory Gold + Ice Blue + Space Black.
- Neon is reserved for semantic states such as scan, warning, or warp.
- Empty space is allowed and encouraged.
- Do not add particles, gradients, glow, glass effects, or animations unless they serve a clear purpose.
- Do not convert the project to a framework.

---

## Immediate next tasks

### Task A — Planet card cleanup

Goal:

- one canonical `.planet-card` definition
- one canonical image treatment
- one canonical title style
- one button style compatible with Observatory identity
- no layout regression

### Task B — Modal cleanup

Goal:

- remove duplicate modal definitions
- keep current behavior
- prepare for later accessibility improvements (`role="dialog"`, keyboard focus)

### Task C — Button system cleanup

Goal:

Define a small reusable set of button treatments instead of multiple unrelated styles.

Suggested future categories:

- primary
- quiet / secondary
- instrument / technical
- danger / warning

### Task D — About / footer planning

Do not edit yet in this pass. Prepare the replacement content for the current student/NASA-card presentation according to the Master Plan.

---

## Definition of success for Phase 1

Phase 1 is successful when:

- the website looks essentially the same or better
- duplicated CSS is reduced substantially
- Observatory identity becomes the default instead of an override layer
- no current feature is broken
- mobile layout remains usable
- future sections can reuse a small design system instead of adding more patches

