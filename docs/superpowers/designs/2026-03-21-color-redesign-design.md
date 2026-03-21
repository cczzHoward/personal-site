# Color Redesign — Technical Design

**Date:** 2026-03-21
**Status:** Approved

## Background

The site currently uses a dark purple-blue theme (`#0f1117` background, `#6c63ff` accent). The goal is to redesign to a warm light theme using the "Cozy Cafe" palette, which better reflects a personal, approachable aesthetic.

---

## Color Token Changes

| CSS Variable | 舊值 | 新值 | 用途 |
|---|---|---|---|
| `--color-bg` | `#0f1117` | `#F5F0EB` | 頁面背景 |
| `--color-card` | `#1e2140` | `#EDE6DD` | 卡片 / 區塊背景 |
| `--color-text` | `#e8e8f0` | `#171614` | 主要內文 |
| `--color-text-muted` | `#6c7a9c` | `#9A8873` | 次要文字（日期、副標題） |
| `--color-primary` | `#6c63ff` | `#754043` | 主色（標題、按鈕、連結） |
| `--color-secondary` | _(新增)_ | `#37423D` | 次要強調（非 active nav 連結） |
| `--color-tag-text` | _(新增)_ | `#3A2618` | Skill tag 文字 |

---

## Typography Changes

新增 Google Fonts，替換標題字體與 body 字體：

| 用途 | 舊字體 | 新字體 |
|---|---|---|
| 姓名 / Section heading | 無特定（系統字體） | Libre Baskerville 700 |
| 內文 / UI / body | `'Segoe UI', system-ui` | `'Lato', system-ui` |

---

## Affected Files

### `index.html`
加入 Google Fonts preconnect 與 stylesheet link：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
```

### `src/index.css`
1. 更新 `:root` CSS 變數（7 個 token，新增 `--color-secondary`、`--color-tag-text`）
2. 更新 `body` 字體：`font-family: 'Lato', system-ui, sans-serif`

### `src/main.tsx`
更新 Ant Design ConfigProvider：
```ts
colorPrimary: '#754043'
```

### `src/components/Navbar.tsx`
三處變更：
1. `backgroundColor` 改為 `rgba(245, 240, 235, 0.9)`（`#F5F0EB` 半透明，配合新背景）
2. `borderBottom` 改為 `'1px solid rgba(117, 64, 67, 0.15)'`（主色 `#754043` 系）
3. inactive 連結的 Tailwind class 改為 `text-[--color-secondary] hover:text-[--color-text]`

### `src/components/Home.tsx`
divider `<hr>` 的 `borderTop` 改為：
```
'1px solid rgba(55, 66, 61, 0.15)'
```
（次要主色 `#37423D` 系）

### `src/components/About.tsx`
全部使用 CSS 變數（`--color-primary`、`--color-text`），CSS 變數更新後自動生效，**不需手動改動**。

### `src/components/Skills.tsx`
兩處變更：
1. `border` 改為 `'1px solid rgba(117, 64, 67, 0.3)'`（主色 `#754043` 系）
2. `color` 改為 `'var(--color-tag-text)'`（由 `var(--color-text)` 改為新增的 tag 專用 token）

### `src/components/Contact.tsx`
已確認所有顏色皆為 CSS 變數，無硬編碼色碼，CSS 變數更新後自動生效，**不需手動改動**：
- `h2`: `color: var(--color-primary)`
- 連結文字: `color: var(--color-text)`、`hover:text-[--color-text]`
- 圖示: `color: var(--color-primary)`

### `src/components/blog/PostList.tsx`
`border` 改為 `'1px solid rgba(117, 64, 67, 0.15)'`（主色 `#754043` 系）

### `src/components/blog/PostDetail.tsx`
全部使用 CSS 變數，CSS 變數更新後自動生效，**不需手動改動**。

### `src/components/Landing.tsx`
1. 姓名 `<h1>` 加上 `fontFamily: "'Libre Baskerville', serif"`（`font-bold` → weight 700，與字體載入的 wght@700 一致）
2. 已確認所有顏色皆為 CSS 變數，無硬編碼色碼，CSS 變數更新後自動生效：
   - 外層 `<div>`: `backgroundColor: var(--color-bg)`
   - `<h1>` 名字: `color: var(--color-primary)`
   - `<p>` 打字機文字: `color: var(--color-text-muted)`
   - 游標 `<span>`: `backgroundColor: var(--color-primary)`
   - GitHub 連結: `text-[--color-text-muted] hover:text-[--color-text]`
   - Button: Ant Design `type="primary"` → 由 ConfigProvider `colorPrimary` 控制

---

## Implementation Approach

變更範圍限定為**純視覺層**（CSS 變數、字體、顏色），不修改任何路由、元件邏輯或資料結構。

執行順序：
1. 更新 `index.html`（字體載入）
2. 更新 `src/index.css`（CSS 變數 + body 字體）
3. 更新 `src/main.tsx`（Ant Design token）
4. 更新 `Navbar.tsx`（3 處硬編碼）
5. 更新 `Home.tsx`（divider 色碼）
6. 更新 `Skills.tsx`（border + tag 文字色）
7. 更新 `PostList.tsx`（card border）
8. 確認 `Landing.tsx` 加上 Libre Baskerville

---

## Verification

1. `npm run dev` 啟動，逐頁確認：
   - Landing `/`：背景米白、姓名深紅棕色、Libre Baskerville 字體
   - Home `/home`：Navbar 背景為半透明米白（非暗色）、divider 為淺棕色線、Skills tag 文字為 `#3A2618`
   - Blog `/blog`：文章卡片 border 為棕色系
   - Blog post `/blog/:slug`：色彩一致
   - Contact：連結文字、圖示顯示正確（非暗色殘留）
2. Navbar active/inactive 連結顏色正確（`#754043` / `#37423D`）
3. 確認 Ant Design 按鈕與元件主色為 `#754043`（ConfigProvider 已更新）
4. `npm run build` 無錯誤
5. `npm run lint` 無 ESLint 錯誤
