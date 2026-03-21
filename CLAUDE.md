# personal-site

個人網站，包含自我介紹與部落格。

## 技術棧

- React + Vite + TypeScript
- TailwindCSS — 負責排版、間距、顏色
- Ant Design — 負責複雜 UI 元件

## 命名規範

- TypeScript 變數與函式：camelCase
- TypeScript Class 與 React 元件：PascalCase
- CSS class 名稱：kebab-case

## 程式碼規範

- 禁止使用 `any`，使用明確的型別定義
- 禁止使用 `var`，使用 `const` / `let`
- 避免使用已 deprecated 的語法與 API

## Commit 規範

- 每完成一個有意義的段落（功能、設定、修復）就 commit 一次，不要累積太多改動才 commit
- 每次 commit 前，必須向使用者清楚說明這次改動的內容（改了什麼、為什麼），確認後才執行 commit
- Commit message 使用英文，格式：`type: description`（例如 `feat: add navbar component`）

## 驗證規範

- 開發過程中的驗證步驟（包含 subagent 驗證）使用 `npm run build`，不要用 `npm run dev`
- 原因：`npm run dev` 會留下長期 process，累積多個佔用 port；`npm run build` 跑完即結束

## 常用指令

- `npm run dev` — 啟動開發伺服器
- `npm run build` — 打包
- `npm run lint` — 執行 ESLint
