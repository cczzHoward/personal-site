import { GithubOutlined, MailOutlined } from '@ant-design/icons'

const LINKS = [
  {
    icon: <GithubOutlined />,
    label: 'github.com/cczzhoward',
    href: 'https://github.com/cczzhoward',
  },
  {
    icon: <MailOutlined />,
    label: 'howardgg509@gmail.com',
    href: 'mailto:howardgg509@gmail.com',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="max-w-2xl mx-auto px-8 py-20">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: 'var(--color-primary)' }}
      >
        Contact
      </h2>
      <div className="flex flex-col gap-4">
        {LINKS.map(({ icon, label, href }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-3 no-underline transition-colors hover:text-[--color-text]"
            style={{ color: 'var(--color-text)', fontSize: '1.1rem' }}
          >
            <span style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>
              {icon}
            </span>
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
