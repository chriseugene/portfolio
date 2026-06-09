import { useState, useEffect } from 'react'

const links = [
  { label: 'Work',       href: '#work'        },
  { label: 'Education',  href: '#education'   },
  { label: 'Experience', href: '#experience'  },
  { label: 'Skills',     href: '#skills'      },
  { label: 'Process',    href: '#process'     },
  { label: 'Notes',      href: '#references'  },
  { label: 'Contact',    href: '#contact'     },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-5 pb-2 pointer-events-none">
      <nav
        className="pointer-events-auto w-full max-w-3xl flex items-center justify-between gap-6 px-5 py-3 rounded-2xl border transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,239,231,0.88)' : 'rgba(245,239,231,0.70)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderColor: scrolled ? 'rgba(231,93,11,0.20)' : 'rgba(84,79,71,0.13)',
          boxShadow: scrolled ? '0 4px 24px rgba(84,79,71,0.12)' : '0 2px 12px rgba(84,79,71,0.06)',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-hand text-xl font-bold shrink-0"
          style={{ color: '#e75d0b', fontFamily: "'Architects Daughter', cursive" }}
        >
          CE<span style={{ color: '#c4bfba' }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(l => (
            <NavLink key={l.label} href={l.href}>{l.label}</NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="mailto:peugene@slu.edu"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white shrink-0 transition-all duration-150 hover:opacity-90 active:scale-95"
          style={{ background: '#e75d0b', boxShadow: '0 2px 8px rgba(231,93,11,0.32)' }}
        >
          Say Hello ✉️
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: '#68635a' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="pointer-events-auto absolute top-[4.5rem] left-4 right-4 rounded-2xl border px-3 py-3 flex flex-col gap-0.5 shadow-xl"
          style={{
            background: 'rgba(250,246,241,0.97)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(231,93,11,0.15)',
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ color: '#544f47' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(231,93,11,0.08)'; e.currentTarget.style.color = '#e75d0b' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#544f47' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:peugene@slu.edu"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 py-2.5 rounded-xl text-sm font-bold text-center text-white"
            style={{ background: '#e75d0b' }}
          >
            Say Hello ✉️
          </a>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150"
      style={{ color: '#68635a' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#e75d0b'
        e.currentTarget.style.background = 'rgba(231,93,11,0.07)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#68635a'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {children}
    </a>
  )
}
