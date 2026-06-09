/* ─────────────────────────────────────────────────────────
   Footer — dark background, letter-by-letter animated name
   Matches harinisk.com's footer layout
───────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useState } from 'react'

const NAME = 'CHRIS EUGENE'

const socials = [
  { label: 'LinkedIn',              href: 'https://www.linkedin.com/in/praveshchristo01/', wip: false },
  { label: 'GitHub',                 href: 'https://github.com/chriseugene',               wip: false },
  { label: 'Email',                 href: 'mailto:chris.eug@outlook.com',                 wip: false },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText('chris.eug@outlook.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer
      id="contact"
      style={{ background: '#1a1510', color: '#f5efe7', padding: '40px 24px 48px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle dot texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(231,93,11,0.035) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Get in touch heading ── */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.p
            style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', fontSize: '18px', marginBottom: '12px', display: 'inline-block', transform: 'rotate(-1.5deg)' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s build something together! 🔧
          </motion.p>

          <motion.h2
            style={{ fontWeight: 900, fontSize: 'clamp(22px, 3.5vw, 40px)', textTransform: 'uppercase', color: '#f5efe7', marginBottom: '28px', letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            Get In Touch
          </motion.h2>

          {/* Action buttons */}
          <motion.div
            style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <button
              onClick={copyEmail}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '100px', border: '1.5px solid rgba(245,239,231,0.22)', background: 'transparent', color: '#f5efe7', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.18s', letterSpacing: '0.01em' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,239,231,0.07)'; e.currentTarget.style.borderColor = 'rgba(245,239,231,0.38)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(245,239,231,0.22)' }}
            >
              {copied ? '✓  Copied!' : '📋  chris.eug@outlook.com'}
            </button>

            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '12px 22px', borderRadius: '100px',
                  border: s.wip ? '1.5px dashed rgba(245,239,231,0.20)' : '1.5px solid rgba(245,239,231,0.22)',
                  background: 'transparent',
                  color: s.wip ? 'rgba(245,239,231,0.38)' : '#f5efe7',
                  textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: 'all 0.18s',
                  cursor: s.wip ? 'not-allowed' : 'pointer',
                  opacity: s.wip ? 0.6 : 1,
                }}
                onClick={s.wip ? e => e.preventDefault() : undefined}
                onMouseEnter={e => { if (!s.wip) { e.currentTarget.style.background = 'rgba(245,239,231,0.07)'; e.currentTarget.style.color = '#e75d0b' } }}
                onMouseLeave={e => { if (!s.wip) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f5efe7' } }}
              >
                {s.label} {s.wip ? '' : '↗'}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Giant animated name ── */}
        <div style={{ textAlign: 'center', marginBottom: '60px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -14, color: '#e75d0b', transition: { duration: 0.18 } }}
                style={{
                  fontSize: 'clamp(36px, 7vw, 96px)',
                  fontWeight: 900,
                  color: '#f5efe7',
                  display: 'inline-block',
                  cursor: 'default',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '24px', borderTop: '1px solid rgba(245,239,231,0.09)' }}>
          <p style={{ fontSize: '12px', color: 'rgba(245,239,231,0.32)', margin: 0 }}>
            © {new Date().getFullYear()} Chris Eugene. Built with React &amp; Framer Motion.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(245,239,231,0.32)', margin: 0 }}>
            M.S. ECE · Saint Louis University · GPA 3.90
          </p>
        </div>
      </div>
    </footer>
  )
}
