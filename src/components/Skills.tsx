import { Tag } from 'antd'

const SKILLS = [
  'React', 'TypeScript', 'Vite', 'TailwindCSS',
  'Node.js', 'Git', 'HTML', 'CSS',
]

export default function Skills() {
  return (
    <section id="skills" className="max-w-2xl mx-auto px-8 py-20">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: 'var(--color-primary)' }}
      >
        Skills
      </h2>
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <Tag
            key={skill}
            style={{
              fontSize: '0.95rem',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-card)',
              border: '1px solid rgba(117, 64, 67, 0.3)',
              color: 'var(--color-tag-text)',
            }}
          >
            {skill}
          </Tag>
        ))}
      </div>
    </section>
  )
}
