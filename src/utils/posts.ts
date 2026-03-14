import matter from 'gray-matter'
import type { PostMeta, PostDetail } from '../types/post'

// Vite raw import — returns string content at runtime; cast required due to Vite typing limitations
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
        title: typeof data.title === 'string' ? data.title : String(data.title ?? ''),
        date: String(data.date ?? ''),
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostContent(slug: string): PostDetail | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  )
  if (!entry) return null
  const { data, content } = matter(entry[1])
  return {
    title: typeof data.title === 'string' ? data.title : String(data.title ?? ''),
    date: String(data.date ?? ''),
    content,
  }
}
