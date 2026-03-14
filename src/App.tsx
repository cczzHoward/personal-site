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
