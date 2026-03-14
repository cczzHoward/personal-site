export default function About() {
  return (
    <section id="about" className="max-w-2xl mx-auto px-8 py-20">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: 'var(--color-primary)' }}
      >
        About
      </h2>
      <p
        className="text-lg leading-relaxed"
        style={{ color: 'var(--color-text)' }}
      >
        嗨，我是{' '}
        <strong style={{ color: 'var(--color-primary)' }}>Howard Cheng</strong>。
        我熱愛前端開發，喜歡把想法變成可以互動的介面。
        平常喜歡記錄學習筆記，也持續探索新的技術與工具。
      </p>
    </section>
  )
}
