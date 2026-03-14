import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Placeholder({ name }: { name: string }) {
  return <div className="text-[--color-text] p-8">{name}</div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder name="Landing" />} />
        <Route path="/home" element={<Placeholder name="Home" />} />
        <Route path="/blog" element={<Placeholder name="PostList" />} />
        <Route path="/blog/:slug" element={<Placeholder name="PostDetail" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
