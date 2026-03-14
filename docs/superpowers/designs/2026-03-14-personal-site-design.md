# 個人網站 — 技術設計（Design）

**Date:** 2026-03-14
**Status:** Approved

---

## 1. 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | React 19 + Vite 8 + TypeScript 5 |
| 樣式 | TailwindCSS 3（排版、間距、顏色） |
| UI 元件 | Ant Design 6（Tag、Icon 等） |
| 路由 | react-router-dom |
| 部落格渲染 | react-markdown |
| Frontmatter 解析 | gray-matter |

### 新增套件
```
react-router-dom
react-markdown
gray-matter
```

---

## 2. 路由實作

使用 `react-router-dom` 的 `BrowserRouter`，路由定義在 `App.tsx`：

| 路徑 | 元件 |
|------|------|
| `/` | `Landing` |
| `/home` | `Home`（含 About、Skills、Contact） |
| `/blog` | `PostList` |
| `/blog/:slug` | `PostDetail` |

---

## 3. 元件設計

### 3.1 Navbar
- 固定在頂部（`position: fixed` 或 sticky）
- 深色背景，與整體主題一致
- 使用 `react-router-dom` 的 `Link` 元件

### 3.2 Landing
- CSS Flexbox 垂直水平置中
- 打字機動畫使用 `setInterval` 逐字顯示、刪除文字
- GitHub 圖示使用 Ant Design `GithubOutlined`
- 「進入網站」按鈕使用 Ant Design `Button`

### 3.3 About / Skills / Contact
- 靜態資料寫在元件內
- Skills 使用 Ant Design `Tag` 元件
- Contact 使用 Ant Design Icon 搭配 `<a>` 連結

### 3.4 PostList
- 呼叫 `utils/posts.ts` 取得 `PostMeta[]`
- 以清單形式渲染（標題 + 日期）
- 使用 `Link` 導向 `/blog/:slug`

### 3.5 PostDetail
- 從 URL params 取得 `slug`
- 呼叫 `utils/posts.ts` 取得對應文章原始 Markdown
- 用 `gray-matter` 解析 frontmatter
- 用 `react-markdown` 渲染文章主體
- 找不到對應 slug 時，顯示錯誤訊息

---

## 4. 資料結構

### PostMeta 型別（`src/types/post.ts`）
```ts
interface PostMeta {
  slug: string      // 來自檔名，例如 "react-hooks-intro"
  title: string     // 來自 frontmatter
  date: string      // 來自 frontmatter，格式 YYYY-MM-DD
}
```

### posts.ts 職責（`src/utils/posts.ts`）
- 使用 `import.meta.glob` 掃描 `../posts/*.md`（`eager: true`）
- 解析每個檔案的 frontmatter（用 `gray-matter`）
- 回傳 `PostMeta[]`，依日期排序（新到舊）
- 提供 `getPostContent(slug)` 回傳原始 Markdown 字串

---

## 5. 視覺設計 Token

| 用途 | 色碼 |
|------|------|
| 背景 | `#0f1117` |
| 主色（紫藍） | `#6c63ff` |
| 文字 | `#e8e8f0` |
| 次要文字 | `#6c7a9c` |
| 卡片背景 | `#1e2140` |

- 色彩 token 定義在 `src/index.css` 作為 CSS 變數
- Ant Design 主色透過 `<ConfigProvider theme={{ token: { colorPrimary: '#6c63ff' } }}>` 設定，包裹在 `main.tsx` 根元件外層

---

## 6. 檔案結構

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Landing.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── blog/
│       ├── PostList.tsx
│       └── PostDetail.tsx
├── posts/
│   └── hello-world.md      ← 範例文章
├── types/
│   └── post.ts
├── utils/
│   └── posts.ts
├── App.tsx                 ← 路由設定
├── index.css               ← CSS 變數 + Tailwind directives
└── main.tsx
```
