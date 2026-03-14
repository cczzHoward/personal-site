import Navbar from './Navbar'
import About from './About'
import Skills from './Skills'
import Contact from './Contact'

const DIVIDER = (
  <hr
    className="max-w-2xl mx-auto"
    style={{ border: 'none', borderTop: '1px solid rgba(108, 99, 255, 0.1)' }}
  />
)

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <About />
        {DIVIDER}
        <Skills />
        {DIVIDER}
        <Contact />
      </main>
    </>
  )
}
