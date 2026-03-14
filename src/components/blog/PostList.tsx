import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { getPosts } from '../../utils/posts'

export default function PostList() {
  const posts = getPosts()

  return (
    <>
      <Navbar />
      <main className="pt-14 max-w-2xl mx-auto px-8 py-20">
        <h2
          className="text-3xl font-bold mb-8"
          style={{ color: 'var(--color-primary)' }}
        >
          文章
        </h2>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>目前沒有文章。</p>
        ) : (
          <ul className="flex flex-col gap-4 list-none p-0">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="rounded-lg p-5"
                style={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid rgba(108, 99, 255, 0.15)',
                }}
              >
                <Link to={`/blog/${post.slug}`} className="no-underline">
                  <p
                    className="text-lg font-semibold mb-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {post.title}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
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
