# Personal Site Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 從 Vite 預設範本出發，打造完整個人網站，含 Landing Page、個人資訊主頁（About / Skills / Contact）與 Markdown 部落格。

**Architecture:** React Router 管理四個路由（`/`、`/home`、`/blog`、`/blog/:slug`）。部落格文章以 `.md` 檔案存放於 `src/posts/`，透過 `import.meta.glob` 掃描並用 `gray-matter` 解析 frontmatter。全站採深色主題，設計 token 以 CSS 變數定義。

**Tech Stack:** React 19 + Vite 8 + TypeScript 5、TailwindCSS 3、Ant Design 6、react-router-dom、react-markdown、gray-matter

---

## 檔案清單

| 動作 | 路徑 | 職責 |
|------|------|------|
| Modify | `src/main.tsx` | 加入 Ant Design ConfigProvider（主色設定） |
| Modify | `src/index.css` | 替換為深色主題 CSS 變數 + Tailwind directives |
| Modify | `src/App.tsx` | 完整替換為 React Router 路由設定 |
| Delete | `src/App.css` | 舊範本樣式，清空或刪除 |
| Create | `src/types/post.ts` | PostMeta 型別定義 |
| Create | `src/utils/posts.ts` | import.meta.glob 掃描 + gray-matter 解析邏輯 |
| Create | `src/posts/hello-world.md` | 範例部落格文章 |
| Create | `src/components/Navbar.tsx` | 共用導覽列 |
| Create | `src/components/Landing.tsx` | 全螢幕入口頁（打字機動畫） |
| Create | `src/components/About.tsx` | 自我介紹區塊 |
| Create | `src/components/Skills.tsx` | 技能標籤區塊 |
| Create | `src/components/Contact.tsx` | 聯絡方式區塊 |
| Create | `src/components/Home.tsx` | 組合 About + Skills + Contact 的頁面 |
| Create | `src/components/blog/PostList.tsx` | 文章列表頁 |
| Create | `src/components/blog/PostDetail.tsx` | 單篇文章頁 |

---

## Chunk 1：基礎設定

### Task 1：安裝缺少的套件

**Files:**
- Modify: `package.json`（npm install 自動更新）

- [ ] **Step 1：安裝套件**

```bash
npm install react-router-dom react-markdown gray-matter
```

- [ ] **Step 2：確認安裝成功**

```bash
npm ls react-router-dom react-markdown gray-matter
```

Expected: 三個套件版本號皆顯示，無錯誤。

---

### Task 2：建立型別定義

**Files:**
- Create: `src/types/post.ts`

- [ ] **Step 1：建立 `src/types/post.ts`**

```ts
export interface PostMeta {
  slug: string
  title: string
  date: string
}
```

---

### Task 3：建立範例文章

**Files:**
- Create: `src/posts/hello-world.md`

- [ ] **Step 1：建立 `src/posts/hello-world.md`**

```markdown
---
title: Hello World
date: 2026-03-14
---

這是我的第一篇文章。

## 為什麼寫部落格？

記錄學習過程，讓知識沉澱下來。

## 接下來

會陸續寫 React、TypeScript、前端工程相關的筆記。
```

---

### Task 4：建立文章掃描工具

**Files:**
- Create: `src/utils/posts.ts`

- [ ] **Step 1：建立 `src/utils/posts.ts`**

```ts
import matter from 'gray-matter'
import type { PostMeta } from '../types/post'

// Vite glob import — 以 raw string 形式讀取所有 .md 檔案
const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export function getPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.replace('../posts/', '').replace('.md', '')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostContent(slug: string): { title: string; date: string; content: string } | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  )
  if (!entry) return null
  const { data, content } = matter(entry[1])
  return {
    title: data.title as string,
    date: data.date as string,
    content,
  }
}
```

- [ ] **Step 2：確認 TypeScript 無錯誤**

```bash
npx tsc --noEmit
```

Expected: 無錯誤輸出。

---

### Task 5：更新全域樣式

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1：替換 `src/index.css` 內容（完整覆蓋）**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #0f1117;
  --color-primary: #6c63ff;
  --color-text: #e8e8f0;
  --color-text-muted: #6c7a9c;
  --color-card: #1e2140;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}
```

---

### Task 6：更新 main.tsx（加入 ConfigProvider）

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1：更新 `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#6c63ff' } }}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
```

---

### Task 7：設定 App.tsx 路由

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1：完整替換 `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home'
import PostList from './components/blog/PostList'
import PostDetail from './components/blog/PostDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<PostList />} />
        <Route path="/blog/:slug" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2：清空 `src/App.css`（移除舊範本樣式）**

將 `src/App.css` 內容清空（保留空檔案即可）。

- [ ] **Step 3：Commit**

```bash
git add src/main.tsx src/index.css src/App.tsx src/App.css src/types/post.ts src/utils/posts.ts src/posts/hello-world.md
git commit -m "feat: setup routing, theme, types, and blog utils"
```

---

## Chunk 2：Navbar + Landing Page

### Task 8：建立 Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1：建立 `src/components/Navbar.tsx`**

```tsx
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkStyle = (path: string): React.CSSProperties => ({
    color: pathname === path ? 'var(--color-primary)' : 'var(--color-text)',
    textDecoration: 'none',
    fontWeight: pathname === path ? 600 : 400,
  })

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 17, 23, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(108, 99, 255, 0.15)',
        padding: '0 2rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <Link to="/home" style={linkStyle('/home')}>首頁</Link>
      <Link to="/blog" style={linkStyle('/blog')}>部落格</Link>
    </nav>
  )
}
```

---

### Task 9：建立 Landing Page

**Files:**
- Create: `src/components/Landing.tsx`

- [ ] **Step 1：建立 `src/components/Landing.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

const PHRASES = ['前端工程師', '學習筆記愛好者', 'Lifelong Learner']
const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_MS = 1800

export default function Landing() {
  const navigate = useNavigate()
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = PHRASES[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_MS)
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setPhraseIndex((i) => (i + 1) % PHRASES.length)
    } else {
      const next = isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1)
      timeout = setTimeout(
        () => setDisplayed(next),
        isDeleting ? DELETE_SPEED : TYPE_SPEED,
      )
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIndex])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          color: 'var(--color-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        你的名字
      </h1>

      <p
        style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          color: 'var(--color-text-muted)',
          minHeight: '2em',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {displayed}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            backgroundColor: 'var(--color-primary)',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
        <a
          href="https://github.com/你的帳號"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--color-text-muted)', fontSize: '1.75rem' }}
        >
          <GithubOutlined />
        </a>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/home')}
          style={{ borderRadius: '8px', fontWeight: 600 }}
        >
          進入網站 →
        </Button>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 2：啟動開發伺服器並手動驗證**

```bash
npm run dev
```

驗收：
- `http://localhost:5173/` 顯示 Landing Page（名字、打字機動畫、GitHub 圖示、按鈕）
- 打字機循環顯示三個短語
- 「進入網站」按鈕點擊後導向 `/home`（目前頁面空白正常，路由尚未有內容）
- 無 Console 錯誤

- [ ] **Step 3：Commit**

```bash
git add src/components/Navbar.tsx src/components/Landing.tsx
git commit -m "feat: add Navbar and Landing page with typewriter animation"
```

---

## Chunk 3：主頁（About / Skills / Contact）

### Task 10：建立 About 區塊

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1：建立 `src/components/About.tsx`**

```tsx
export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '5rem 2rem',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          marginBottom: '1.5rem',
        }}
      >
        About
      </h2>
      <p
        style={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: 'var(--color-text)',
        }}
      >
        嗨，我是 <strong style={{ color: 'var(--color-primary)' }}>你的名字</strong>。
        我熱愛前端開發，喜歡把想法變成可以互動的介面。
        平常喜歡記錄學習筆記，也持續探索新的技術與工具。
      </p>
    </section>
  )
}
```

---

### Task 11：建立 Skills 區塊

**Files:**
- Create: `src/components/Skills.tsx`

- [ ] **Step 1：建立 `src/components/Skills.tsx`**

```tsx
import { Tag } from 'antd'

const SKILLS = [
  'React', 'TypeScript', 'Vite', 'TailwindCSS',
  'Node.js', 'Git', 'HTML', 'CSS',
]

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: '5rem 2rem',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          marginBottom: '1.5rem',
        }}
      >
        Skills
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {SKILLS.map((skill) => (
          <Tag
            key={skill}
            style={{
              fontSize: '0.95rem',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-card)',
              border: '1px solid rgba(108, 99, 255, 0.3)',
              color: 'var(--color-text)',
            }}
          >
            {skill}
          </Tag>
        ))}
      </div>
    </section>
  )
}
```

---

### Task 12：建立 Contact 區塊

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1：建立 `src/components/Contact.tsx`**

```tsx
import { GithubOutlined, MailOutlined } from '@ant-design/icons'

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '5rem 2rem',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          marginBottom: '1.5rem',
        }}
      >
        Contact
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a
          href="https://github.com/你的帳號"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--color-text)',
            textDecoration: 'none',
            fontSize: '1.1rem',
          }}
        >
          <GithubOutlined style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }} />
          github.com/你的帳號
        </a>
        <a
          href="mailto:你的信箱@example.com"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--color-text)',
            textDecoration: 'none',
            fontSize: '1.1rem',
          }}
        >
          <MailOutlined style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }} />
          你的信箱@example.com
        </a>
      </div>
    </section>
  )
}
```

---

### Task 13：組合 Home 頁面

**Files:**
- Create: `src/components/Home.tsx`

- [ ] **Step 1：建立 `src/components/Home.tsx`**

```tsx
import Navbar from './Navbar'
import About from './About'
import Skills from './Skills'
import Contact from './Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '56px' }}>
        <About />
        <hr style={{ border: 'none', borderTop: '1px solid rgba(108, 99, 255, 0.1)', maxWidth: '720px', margin: '0 auto' }} />
        <Skills />
        <hr style={{ border: 'none', borderTop: '1px solid rgba(108, 99, 255, 0.1)', maxWidth: '720px', margin: '0 auto' }} />
        <Contact />
      </main>
    </>
  )
}
```

- [ ] **Step 2：手動驗證**

瀏覽 `http://localhost:5173/home`：
- Navbar 固定在頂部，顯示「首頁」「部落格」連結
- About / Skills / Contact 區塊依序顯示
- Skills 顯示 Ant Design Tag 標籤
- Contact 顯示 GitHub 與 Email 連結

- [ ] **Step 3：Commit**

```bash
git add src/components/About.tsx src/components/Skills.tsx src/components/Contact.tsx src/components/Home.tsx
git commit -m "feat: add Home page with About, Skills, and Contact sections"
```

---

## Chunk 4：部落格

### Task 14：建立文章列表頁

**Files:**
- Create: `src/components/blog/PostList.tsx`

- [ ] **Step 1：確認 `src/components/blog/` 目錄存在（否則先建立）**

- [ ] **Step 2：建立 `src/components/blog/PostList.tsx`**

```tsx
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { getPosts } from '../../utils/posts'

export default function PostList() {
  const posts = getPosts()

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: '56px',
          maxWidth: '720px',
          margin: '0 auto',
          padding: '5rem 2rem',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            marginBottom: '2rem',
          }}
        >
          文章
        </h2>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>目前沒有文章。</p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map((post) => (
              <li
                key={post.slug}
                style={{
                  backgroundColor: 'var(--color-card)',
                  borderRadius: '8px',
                  padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(108, 99, 255, 0.15)',
                }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <p
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {post.title}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {post.date}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
```

---

### Task 15：建立單篇文章頁

**Files:**
- Create: `src/components/blog/PostDetail.tsx`

- [ ] **Step 1：建立 `src/components/blog/PostDetail.tsx`**

```tsx
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Navbar from '../Navbar'
import { getPostContent } from '../../utils/posts'

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostContent(slug) : null

  if (!post) {
    return (
      <>
        <Navbar />
        <main
          style={{
            paddingTop: '56px',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '5rem 2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            找不到文章。
          </p>
          <Link
            to="/blog"
            style={{ color: 'var(--color-primary)', marginTop: '1rem', display: 'inline-block' }}
          >
            ← 回到文章列表
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: '56px',
          maxWidth: '720px',
          margin: '0 auto',
          padding: '5rem 2rem',
        }}
      >
        <Link
          to="/blog"
          style={{
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-block',
            marginBottom: '2rem',
          }}
        >
          ← 文章列表
        </Link>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '0.5rem',
          }}
        >
          {post.title}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          {post.date}
        </p>

        <div
          style={{
            color: 'var(--color-text)',
            lineHeight: 1.8,
            fontSize: '1.05rem',
          }}
          className="prose"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </main>
    </>
  )
}
```

- [ ] **Step 2：手動驗證**

驗收：
- `http://localhost:5173/blog` 顯示文章列表，含 "Hello World" 文章
- 點擊文章進入 `http://localhost:5173/blog/hello-world`，正確渲染 Markdown 內容
- `http://localhost:5173/blog/not-exist` 顯示「找不到文章」與返回連結
- Navbar 在所有頁面正常顯示

- [ ] **Step 3：Commit**

```bash
git add src/components/blog/PostList.tsx src/components/blog/PostDetail.tsx
git commit -m "feat: add blog PostList and PostDetail pages"
```

---

## Chunk 5：最終驗收

### Task 16：全站整合驗證

- [ ] **Step 1：執行 lint 確認無錯誤**

```bash
npm run lint
```

Expected: 無錯誤（警告可接受）。

- [ ] **Step 2：執行 TypeScript 型別檢查**

```bash
npx tsc --noEmit
```

Expected: 無錯誤。

- [ ] **Step 3：執行 build 確認可打包**

```bash
npm run build
```

Expected: 輸出 `dist/` 目錄，無錯誤。

- [ ] **Step 4：全站手動驗收清單**

| 驗收項目 | 預期結果 |
|----------|----------|
| `http://localhost:5173/` | Landing Page：名字、打字機動畫、GitHub 圖示、進入按鈕 |
| 打字機動畫 | 循環顯示「前端工程師」→「學習筆記愛好者」→「Lifelong Learner」 |
| 「進入網站」按鈕 | 點擊後導向 `/home` |
| `/home` | Navbar + About + Skills + Contact 依序顯示 |
| Navbar 連結 | 「首頁」導向 `/home`、「部落格」導向 `/blog` |
| `/blog` | 文章列表，顯示「Hello World」（含日期） |
| `/blog/hello-world` | 文章標題、日期、Markdown 內文正確渲染 |
| `/blog/not-exist` | 顯示「找不到文章」與返回連結 |
| Landing 無 Navbar | Landing Page 不顯示 Navbar |

- [ ] **Step 5：最終 Commit（若有未提交的調整）**

```bash
git add -p
git commit -m "chore: finalize personal site integration"
```

---

## 完成標準

所有以下條件成立，才算完成：

1. `npm run dev` 啟動無錯誤
2. `npm run build` 打包無錯誤
3. `npm run lint` 無 ESLint 錯誤
4. `npx tsc --noEmit` 無型別錯誤
5. 全站手動驗收清單全部通過
6. 所有改動已 commit
