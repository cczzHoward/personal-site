import type { PostMeta, PostDetail } from '../types/post'

// Vite raw import — returns string content at runtime; cast required due to Vite typing limitations
const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

/** Parse frontmatter from raw markdown string. Supports simple key: value pairs only. */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim()
      const value = line.slice(colonIdx + 1).trim()
      data[key] = value
    }
  }
  return { data, content: match[2] }
}

export function getPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.replace('../posts/', '').replace('.md', '')
      const { data } = parseFrontmatter(raw)
      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostContent(slug: string): PostDetail | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  )
  if (!entry) return null
  const { data, content } = parseFrontmatter(entry[1])
  return {
    title: data.title ?? '',
    date: data.date ?? '',
    content,
  }
}
