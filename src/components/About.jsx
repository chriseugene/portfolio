import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
}

const highlights = [
  { icon: '🎓', label: 'GPA 3.90',     sub: 'M.S. ECE · SLU'              },
  { icon: '📚', label: '2× Teaching Assistant', sub: 'Physics & Energy Conversions · SLU' },
  { icon: '💼', label: '4+ Roles',     sub: 'Research · Industry · Academia' },
  { icon: '📍', label: 'St. Louis, MO', sub: 'Open to relocation'           },
]


export default function About() {
  return (
    <section id="about" style={{ background: '#f5efe7', padding: '100px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(40px, 6vw, 80px)',
            flexWrap: 'wrap',
          }}
        >
          {/* ── Photo column ── */}
          <motion.div variants={fadeUp} style={{ flex: '0 0 auto', alignSelf: 'flex-start' }}>
            <div style={{ position: 'relative', width: 'clamp(240px, 28vw, 340px)' }}>
              {/* Orange offset shadow */}
              <div style={{
                position: 'absolute', inset: 0,
                transform: 'translate(12px, 12px)',
                borderRadius: '20px',
                background: '#e75d0b',
                opacity: 0.20,
              }} />
              {/* Dark border accent */}
              <div style={{
                position: 'absolute', inset: 0,
                transform: 'translate(6px, 6px)',
                borderRadius: '20px',
                border: '2px solid #544f47',
                opacity: 0.10,
              }} />
              {/* Photo card */}
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(26,21,16,0.22)',
                border: '1.5px solid rgba(84,79,71,0.10)',
                aspectRatio: '3 / 4',
              }}>
                <img
                  src="/about-photo.jpg"
                  alt="Chris Eugene"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                {/* Gradient at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '110px',
                  background: 'linear-gradient(to top, rgba(26,21,16,0.60), transparent)',
                }} />
                {/* Available badge */}
                <div style={{
                  position: 'absolute', bottom: '16px', left: '16px',
                  display: 'flex', alignItems: 'center', gap: '7px',
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#28c840', boxShadow: '0 0 6px #28c840',
                    display: 'inline-block', flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px', fontWeight: 600,
                    color: 'rgba(245,239,231,0.90)',
                    letterSpacing: '0.04em',
                  }}>
                    m.s. ece graduate · may 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Text column ── */}
          <motion.div variants={stagger} style={{ flex: '1 1 300px', minWidth: '260px' }}>

            {/* Handwritten label */}
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Architects Daughter', cursive",
              fontSize: '16px', color: '#e75d0b',
              marginBottom: '10px',
              transform: 'rotate(-1deg)',
              display: 'inline-block',
            }}>
              about me ✦
            </motion.p>

            {/* Headline */}
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 4vw, 44px)',
              color: '#1a1510',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '22px',
            }}>
              Hardware first,<br />
              <span style={{ color: '#e75d0b', fontStyle: 'italic' }}>systems thinker</span> always.
            </motion.h2>

            {/* Bio paragraphs */}
            <motion.p variants={fadeUp} style={{
              fontSize: '15.5px', lineHeight: 1.78,
              color: '#544f47', marginBottom: '14px',
            }}>
              I'm Chris Eugene — an M.S. Electrical & Computer Engineering graduate from
              Saint Louis University (GPA 3.90, May 2026). I'm an engineer who works
              across the full stack of a system: from the physics of a device to the
              circuits that drive it, and the software that ties everything together.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontSize: '15.5px', lineHeight: 1.78,
              color: '#544f47', marginBottom: '30px',
            }}>
              My experience spans research, hardware design, and systems engineering —
              with a strong foundation in both the analytical and the hands-on. I like
              problems that cross discipline boundaries, and I believe the best
              solutions come from understanding a system end to end.
            </motion.p>

            {/* Highlight chips */}
            <motion.div variants={fadeUp} style={{
              display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px',
            }}>
              {highlights.map(({ icon, label, sub }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'white',
                  border: '1.5px solid rgba(84,79,71,0.10)',
                  borderRadius: '14px',
                  padding: '9px 14px',
                  boxShadow: '0 2px 10px rgba(84,79,71,0.06)',
                }}>
                  <span style={{ fontSize: '16px' }}>{icon}</span>
                  <div>
                    <p style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 700, fontSize: '12px',
                      color: '#1a1510', margin: 0, lineHeight: 1.2,
                    }}>{label}</p>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9.5px', color: '#a89f95',
                      margin: 0, marginTop: '2px', letterSpacing: '0.03em',
                    }}>{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Currently block */}
            <motion.div variants={fadeUp} style={{
              background: 'rgba(231,93,11,0.06)',
              border: '1.5px solid rgba(231,93,11,0.18)',
              borderRadius: '14px',
              padding: '14px 18px',
              display: 'flex', alignItems: 'flex-start', gap: '12px',
            }}>
              <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>⚡</span>
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px', fontWeight: 700,
                  color: '#e75d0b', letterSpacing: '0.1em',
                  textTransform: 'uppercase', margin: '0 0 5px',
                }}>Currently</p>
                <p style={{
                  fontSize: '14px', color: '#544f47',
                  lineHeight: 1.65, margin: 0,
                }}>
                  M.S. ECE graduate (SLU, May 2026) · Former TA — College Physics & Energy Conversions ·
                  Actively seeking roles in{' '}
                  <strong>power systems</strong>,{' '}
                  <strong>embedded & hardware engineering</strong>, or{' '}
                  <strong>semiconductor R&amp;D</strong>.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
