import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkClass = (path: string) =>
    `no-underline font-medium transition-colors ${
      pathname === path
        ? 'text-[--color-primary]'
        : 'text-[--color-text-muted] hover:text-[--color-text]'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-14 flex items-center gap-8 px-8"
      style={{
        backgroundColor: 'rgba(15, 17, 23, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(108, 99, 255, 0.15)',
      }}
    >
      <Link to="/home" className={linkClass('/home')}>首頁</Link>
      <Link to="/blog" className={linkClass('/blog')}>部落格</Link>
    </nav>
  )
}
