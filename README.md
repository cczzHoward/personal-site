# Howard Cheng — Personal Site

個人網站，包含自我介紹與學習筆記部落格。

## 技術棧

- React 19 + Vite 8 + TypeScript 5
- TailwindCSS — 排版、間距、顏色
- Ant Design — UI 元件
- react-router-dom — 路由
- react-markdown — Markdown 渲染

## 路由

| 路徑 | 說明 |
|------|------|
| `/` | Landing Page（打字機動畫） |
| `/home` | 主頁（About / Skills / Contact） |
| `/blog` | 文章列表 |
| `/blog/:slug` | 單篇文章 |

## 常用指令

```bash
npm run dev      # 啟動開發伺服器
npm run build    # 打包
npm run lint     # ESLint 檢查
```

## 新增文章

在 `src/posts/` 新增 `.md` 檔案，格式如下：

```markdown
---
title: 文章標題
date: 2026-03-14
---

文章內容
```

檔名即為文章的 slug（例如 `my-post.md` → `/blog/my-post`）。
