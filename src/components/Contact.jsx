import { useState } from 'react'

function GithubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

const socials = [
  { label: 'GitHub',   href: 'https://github.com/',                         Icon: GithubIcon,   external: true  },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/praveshchristo01',     Icon: LinkedInIcon, external: true  },
  { label: 'Email',    href: 'mailto:peugene@slu.edu',                       Icon: EmailIcon,    external: false },
]

const inputCls = {
  background: '#ffffff',
  border: '1.5px solid rgba(84,79,71,0.15)',
  borderRadius: '12px',
  color: '#544f47',
  fontSize: '14px',
  width: '100%',
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 0.15s',
  fontFamily: "'Bricolage Grotesque', sans-serif",
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#f0ebe3' }}>
      <div className="max-w-2xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase text-center mb-3 font-semibold"
          style={{ color: '#e75d0b', fontFamily: "'Architects Daughter', cursive" }}
        >
          Contact
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: '#544f47' }}
        >
          Get In Touch
        </h2>
        <p className="text-center text-sm mb-4" style={{ color: '#7d776e' }}>
          Open to engineering, research, teaching, and industry roles.
        </p>
        <p className="text-center mb-12">
          <a
            href="mailto:peugene@slu.edu"
            className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: '#e75d0b' }}
          >
            peugene@slu.edu
          </a>
        </p>

        {sent ? (
          <div
            className="text-center py-12 text-sm tracking-wider font-semibold"
            style={{ color: '#517d64' }}
          >
            ✓ Message sent. I&apos;ll get back to you soon!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                style={inputCls}
                onFocus={e => { e.target.style.borderColor = 'rgba(231,93,11,0.45)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(84,79,71,0.15)' }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={inputCls}
                onFocus={e => { e.target.style.borderColor = 'rgba(231,93,11,0.45)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(84,79,71,0.15)' }}
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              style={{ ...inputCls, resize: 'none' }}
              onFocus={e => { e.target.style.borderColor = 'rgba(231,93,11,0.45)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(84,79,71,0.15)' }}
            />
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-2xl text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: '#e75d0b', boxShadow: '0 4px 16px rgba(231,93,11,0.28)' }}
            >
              Send Message ✉️
            </button>
          </form>
        )}

        <div className="mt-12 flex justify-center gap-8">
          {socials.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="transition-all hover:opacity-70 hover:-translate-y-0.5"
              style={{ color: '#a89f95' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e75d0b' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a89f95' }}
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
