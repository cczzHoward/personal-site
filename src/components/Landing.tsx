import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

const PHRASES = ['前端工程師', '學習筆記愛好者', 'Lifelong Learner']
const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_MS = 1800

export default function Landing() {
  const navigate = useNavigate()
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = PHRASES[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_MS)
    } else if (isDeleting && displayed === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % PHRASES.length)
      }, 0)
    } else {
      const next = isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1)
      timeout = setTimeout(
        () => setDisplayed(next),
        isDeleting ? DELETE_SPEED : TYPE_SPEED,
      )
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIndex])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <h1
        className="font-bold tracking-tight"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          color: 'var(--color-primary)',
        }}
      >
        Howard Cheng
      </h1>

      <p
        className="flex items-center gap-1"
        style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          color: 'var(--color-text-muted)',
          minHeight: '2em',
        }}
      >
        {displayed}
        <span
          className="inline-block w-0.5 animate-[blink_1s_step-end_infinite]"
          style={{
            height: '1.2em',
            backgroundColor: 'var(--color-primary)',
          }}
        />
      </p>

      <div className="flex items-center gap-4 mt-4">
        <a
          href="https://github.com/cczzhoward"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
          className="text-[--color-text-muted] hover:text-[--color-text] transition-colors"
          style={{ fontSize: '1.75rem' }}
        >
          <GithubOutlined />
        </a>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/home')}
          style={{ borderRadius: '8px', fontWeight: 600 }}
        >
          進入網站 →
        </Button>
      </div>

    </div>
  )
}
