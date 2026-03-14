import matter from 'gray-matter'
import type { PostMeta } from '../types/post'

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
