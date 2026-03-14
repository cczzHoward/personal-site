import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Placeholder({ name }: { name: string }) {
  return <div style={{ color: '#e8e8f0', padding: '2rem' }}>{name}</div>
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
