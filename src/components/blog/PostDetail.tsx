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
        <main className="pt-14 max-w-2xl mx-auto px-8 py-20 text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--color-text-muted)' }}>
            找不到文章。
          </p>
          <Link to="/blog" style={{ color: 'var(--color-primary)' }}>
            ← 回到文章列表
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-14 max-w-2xl mx-auto px-8 py-20">
        <Link
          to="/blog"
          className="text-sm no-underline inline-block mb-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ← 文章列表
        </Link>

        <h1
          className="font-bold mb-2"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--color-text)',
          }}
        >
          {post.title}
        </h1>
        <p className="mb-12" style={{ color: 'var(--color-text-muted)' }}>
          {post.date}
        </p>

        <div
          className="leading-relaxed text-lg"
          style={{ color: 'var(--color-text)' }}
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </main>
    </>
  )
}
