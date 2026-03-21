# Color Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark purple-blue theme with the warm light "Cozy Cafe" palette and swap heading fonts to Libre Baskerville + Lato.

**Architecture:** All color tokens live in CSS variables in `index.css`. Most components already reference `var(--color-*)` so updating the variables cascades automatically. The 4 files with hardcoded `rgba(108, 99, 255, ...)` values need manual line edits. Fonts load via Google Fonts in `index.html`.

**Tech Stack:** React 19 + Vite 8 + TypeScript 5 · TailwindCSS · Ant Design · CSS custom properties

**Design spec:** `docs/superpowers/designs/2026-03-21-color-redesign-design.md`

---

## File Map

| File | Change type |
|------|------------|
| `index.html` | Add Google Fonts `<link>` tags |
| `src/index.css` | Update 5 CSS variables, add 2 new ones, update `body` font-family |
| `src/main.tsx` | Update Ant Design `colorPrimary` token |
| `src/components/Navbar.tsx` | Fix 3 hardcoded inline style values + 1 Tailwind class |
| `src/components/Home.tsx` | Fix 1 hardcoded `borderTop` value |
| `src/components/Skills.tsx` | Fix 1 hardcoded border color + 1 tag text color token |
| `src/components/blog/PostList.tsx` | Fix 1 hardcoded `border` value |
| `src/components/Landing.tsx` | Add `fontFamily` to `<h1>` |

---

## Task 1: Load Google Fonts and update CSS variables

**Files:**
- Modify: `index.html` (lines 3–7, inside `<head>`)
- Modify: `src/index.css` (lines 5–11 `:root`, line 22 `body`)

> This is the foundation — every component inherits from these. Do this first so the browser loads fonts and variables before components render.

- [ ] **Step 1.1: Add Google Fonts to `index.html`**

  Insert after line 6 (`<meta name="viewport" ...>`), before `<title>`. The full `<head>` block should look like this after the edit:

  ```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <title>personal-site</title>
  </head>
  ```

- [ ] **Step 1.2: Replace CSS variables in `src/index.css`**

  Replace the entire `:root` block (currently lines 5–11) with:

  ```css
  :root {
    --color-bg: #F5F0EB;
    --color-primary: #754043;
    --color-text: #171614;
    --color-text-muted: #9A8873;
    --color-card: #EDE6DD;
    --color-secondary: #37423D;
    --color-tag-text: #3A2618;
  }
  ```

- [ ] **Step 1.3: Update `body` font in `src/index.css`**

  Change line 22 from:
  ```css
  font-family: 'Segoe UI', system-ui, sans-serif;
  ```
  to:
  ```css
  font-family: 'Lato', system-ui, sans-serif;
  ```

- [ ] **Step 1.4: Start dev server and do a quick sanity check**

  Run: `npm run dev`

  Open http://localhost:5173 — page background should now be **light beige** (`#F5F0EB`), not dark. Text will be dark. Fonts may still be loading. This confirms CSS variables are wired up.

- [ ] **Step 1.5: Commit**

  ```bash
  git add index.html src/index.css
  git commit -m "feat: load Google Fonts and update CSS color variables to Cozy Cafe palette"
  ```

---

## Task 2: Update Ant Design primary color token

**Files:**
- Modify: `src/main.tsx` (line 9)

- [ ] **Step 2.1: Update ConfigProvider `colorPrimary`**

  In `src/main.tsx` line 9, change:
  ```ts
  colorPrimary: '#6c63ff'
  ```
  to:
  ```ts
  colorPrimary: '#754043'
  ```

- [ ] **Step 2.2: Verify in browser**

  With dev server running, check the "進入網站 →" Button on the Landing page — it should now render in **dark red-brown** (`#754043`), not purple.

- [ ] **Step 2.3: Commit**

  ```bash
  git add src/main.tsx
  git commit -m "feat: update Ant Design colorPrimary to #754043"
  ```

---

## Task 3: Fix hardcoded colors in Navbar

**Files:**
- Modify: `src/components/Navbar.tsx` (lines 10, 16–18)

> The Navbar has a hardcoded dark background from the old theme. Without this fix, it will appear as a dark bar on a light page — the most visible broken element.

- [ ] **Step 3.1: Fix Navbar background, border, and inactive link color**

  In `src/components/Navbar.tsx`:

  Line 10 — change inactive link class from:
  ```ts
  'text-[--color-text-muted] hover:text-[--color-text]'
  ```
  to:
  ```ts
  'text-[--color-secondary] hover:text-[--color-text]'
  ```

  Lines 16–18 inline style — change from:
  ```ts
  style={{
    backgroundColor: 'rgba(15, 17, 23, 0.9)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(108, 99, 255, 0.15)',
  }}
  ```
  to:
  ```ts
  style={{
    backgroundColor: 'rgba(245, 240, 235, 0.9)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(117, 64, 67, 0.15)',
  }}
  ```

- [ ] **Step 3.2: Verify in browser**

  Navigate to http://localhost:5173/home — Navbar should be a **frosted light beige** background with a subtle warm border. Active link (`首頁`) is `#754043`, inactive (`部落格`) is `#37423D`.

- [ ] **Step 3.3: Commit**

  ```bash
  git add src/components/Navbar.tsx
  git commit -m "feat: update Navbar to light theme colors"
  ```

---

## Task 4: Fix remaining hardcoded component colors

**Files:**
- Modify: `src/components/Home.tsx` (line 9)
- Modify: `src/components/Skills.tsx` (lines 26–27)
- Modify: `src/components/blog/PostList.tsx` (line 29)

- [ ] **Step 4.1: Fix `Home.tsx` divider border**

  In `src/components/Home.tsx` line 9, change the full inline style from:
  ```ts
  style={{ border: 'none', borderTop: '1px solid rgba(108, 99, 255, 0.1)' }}
  ```
  to:
  ```ts
  style={{ border: 'none', borderTop: '1px solid rgba(55, 66, 61, 0.15)' }}
  ```

- [ ] **Step 4.2: Fix `Skills.tsx` tag border and text color**

  In `src/components/Skills.tsx`:

  Line 26 — change:
  ```ts
  border: '1px solid rgba(108, 99, 255, 0.3)',
  ```
  to:
  ```ts
  border: '1px solid rgba(117, 64, 67, 0.3)',
  ```

  Line 27 — change:
  ```ts
  color: 'var(--color-text)',
  ```
  to:
  ```ts
  color: 'var(--color-tag-text)',
  ```

- [ ] **Step 4.3: Fix `PostList.tsx` card border**

  In `src/components/blog/PostList.tsx` line 29, change:
  ```ts
  border: '1px solid rgba(108, 99, 255, 0.15)',
  ```
  to:
  ```ts
  border: '1px solid rgba(117, 64, 67, 0.15)',
  ```

- [ ] **Step 4.4: Run lint**

  ```bash
  npm run lint
  ```
  Expected: no errors. If errors appear, fix before proceeding.

- [ ] **Step 4.5: Verify in browser**

  - `/home` → Skills tags: border is warm brown, text is `#3A2618` (slightly warmer/darker than body text `#171614`)
  - `/home` → section dividers between About / Skills / Contact are faint warm lines
  - `/blog` → blog post cards have warm border

- [ ] **Step 4.6: Commit**

  ```bash
  git add src/components/Home.tsx src/components/Skills.tsx src/components/blog/PostList.tsx
  git commit -m "feat: fix hardcoded purple border/color values in Home, Skills, PostList"
  ```

---

## Task 5: Add Libre Baskerville to the name heading

**Files:**
- Modify: `src/components/Landing.tsx` (lines 46–52)

- [ ] **Step 5.1: Add `fontFamily` to the name `<h1>`**

  In `src/components/Landing.tsx`, the `<h1>` currently has:
  ```tsx
  <h1
    className="font-bold tracking-tight"
    style={{
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      color: 'var(--color-primary)',
    }}
  >
  ```

  Add `fontFamily` to the style object:
  ```tsx
  <h1
    className="font-bold tracking-tight"
    style={{
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      color: 'var(--color-primary)',
      fontFamily: "'Libre Baskerville', serif",
    }}
  >
  ```

- [ ] **Step 5.2: Verify in browser**

  Visit http://localhost:5173 — "Howard Cheng" should render in **Libre Baskerville** serif font. The "C" should look rounder and more solid than before.

- [ ] **Step 5.3: Commit**

  ```bash
  git add src/components/Landing.tsx
  git commit -m "feat: apply Libre Baskerville to name heading on Landing page"
  ```

---

## Task 6: Final verification and build check

- [ ] **Step 6.1: Full visual walkthrough**

  With `npm run dev` running, visit each route and confirm:

  | Route | Check |
  |-------|-------|
  | `/` | Beige bg, Libre Baskerville name, dark-red-brown color, light button |
  | `/home` | Light Navbar (not dark), About text readable, Skills tags warm brown border |
  | `/home` (scroll to Contact) | Links and icons display in warm colors (no dark residue) |
  | `/blog` | Post cards with warm border |
  | `/blog/hello-world` | Article renders correctly, Navbar still light |

- [ ] **Step 6.2: Run lint**

  ```bash
  npm run lint
  ```
  Expected: no errors.

- [ ] **Step 6.3: Run build**

  ```bash
  npm run build
  ```
  Expected: build completes with no errors.

- [ ] **Step 6.4: Commit any lint fixes if needed, then tag completion**

  If lint/build passed cleanly in step 6.2–6.3, no additional commit needed. The feature is complete.
