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
| `--color-secondary` | _(新增)_ | `#37423D` | 次要強調（非 active nav） |
| `--color-tag-text` | _(新增)_ | `#3A2618` | Skill tag 文字 |

---

## Typography Changes

新增 Google Fonts，替換標題字體：

| 用途 | 舊字體 | 新字體 |
|---|---|---|
| 姓名 / Section heading | 無特定（系統字體） | Libre Baskerville 700 |
| 內文 / UI | 系統字體 | Lato 400 / 700 |

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
更新 `:root` CSS 變數，新增 `--color-secondary` 和 `--color-tag-text`。

### `src/main.tsx`
更新 Ant Design ConfigProvider：
```ts
colorPrimary: '#754043'
```

### `src/components/Landing.tsx`
- 姓名文字加上 `font-family: 'Libre Baskerville', serif`
- 色碼引用改為 CSS 變數

### `src/components/Navbar.tsx`
- Active 連結色改為 `--color-primary`（`#754043`）
- Inactive 連結色改為 `--color-secondary`（`#37423D`）

### `src/components/About.tsx`
- Section heading 改用 Libre Baskerville
- 卡片背景改為 `--color-card`

### `src/components/Skills.tsx`
- Tag 文字色改為 `--color-tag-text`（`#3A2618`）
- Tag 邊框色改為 `rgba(117,64,67,0.3)`

### `src/components/Contact.tsx`
- 連結色改為 `--color-primary`

### `src/components/blog/PostList.tsx` / `PostDetail.tsx`
- 標題色、連結色統一改為 CSS 變數

---

## Implementation Approach

變更範圍限定為**純視覺層**（CSS 變數、字體、顏色），不修改任何路由、元件邏輯或資料結構。

執行順序：
1. 更新 `index.html`（字體載入）
2. 更新 `src/index.css`（CSS 變數）
3. 更新 `src/main.tsx`（Ant Design token）
4. 逐一更新各元件的色碼與字體引用

---

## Verification

1. `npm run dev` 啟動，逐頁確認：
   - Landing `/`：背景米白、名字深紅棕色、Libre Baskerville 字體
   - Home `/home`：About 卡片用 `#EDE6DD`，Skills tag 文字 `#3A2618`
   - Blog `/blog`、`/blog/:slug`：色彩一致
2. Navbar active/inactive 連結顏色正確
3. `npm run build` 無錯誤
4. `npm run lint` 無 ESLint 錯誤
