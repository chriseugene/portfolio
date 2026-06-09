/* ─────────────────────────────────────────────────────────
   Education — draggable card stack
   M.S. starts on top; drag left/right to swap with B.S.
───────────────────────────────────────────────────────── */
import { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const degrees = [
  {
    degree: 'Master of Science',
    field: 'Electrical & Computer Engineering',
    school: 'Saint Louis University',
    location: 'St. Louis, MO',
    period: 'Aug 2024 – May 2026',
    gpa: '3.90',
    ref: 'M.S.',
    emoji: '🎓',
    accentColor: '#e75d0b',
    accentBg:    'rgba(231,93,11,0.07)',
    accentBorder:'rgba(231,93,11,0.20)',
    courses: [
      'Quantum Info Science & Engineering',
      'Materials Fabrication & Device Apps',
      'Power Systems Analysis I & II',
      'Power Electronics',
      'Energy Technologies I',
      'Filter Design',
      'Intro to Machine Learning',
      'Computer Networks',
      'OOP & Data Structures',
    ],
    scholarship: {
      name: 'Donald and Nora Manahan Scholarship and Research Fund',
      desc: "Awarded to engineering students at SLU's School of Science and Engineering. Supports interdisciplinary teamwork, student projects, and collaborative student–faculty research.",
    },
  },
  {
    degree: 'Bachelor of Science',
    field: 'Electrical & Electronics Engineering',
    school: "St. Joseph's College of Engineering",
    location: 'Chennai, India',
    period: 'Aug 2019 – May 2023',
    gpa: '3.67',
    ref: 'B.S.',
    emoji: '📚',
    accentColor: '#517d64',
    accentBg:    'rgba(81,125,100,0.07)',
    accentBorder:'rgba(81,125,100,0.22)',
    courses: [
      'Circuit Theory & Networks',
      'Digital Electronics',
      'Microprocessors & Microcontrollers',
      'Control Systems',
      'Power Electronics',
      'Signals & Systems',
      'VLSI Design',
      'Embedded Systems',
    ],
    activities: [
      { name: 'BAJA SAE',                      role: 'Sales & Marketing Lead', years: '2022 – 2023', icon: '🏎️' },
      { name: 'Robotics Club',                  role: 'President',               years: '2022 – 2023', icon: '🤖' },
      { name: 'Entrepreneur Development Cell',  role: 'Vice President',          years: '2021 – 2023', icon: '💡' },
      { name: 'English Club',                   role: 'Member',                 years: '2019 – 2022', icon: '📖' },
    ],
  },
]

export default function Education() {
  const [frontIdx, setFrontIdx] = useState(0)

  // Motion value drives drag, rotate, and back-card parallax
  const x       = useMotionValue(0)
  const rotate  = useTransform(x, [-280, 280], [-12, 12])
  const backScale = useTransform(x, [-200, 0, 200], [1, 0.95, 1])
  const backY     = useTransform(x, [-200, 0, 200], [2, 16, 2])
  const backOpacity = useTransform(x, [-200, 0, 200], [0.9, 0.72, 0.9])

  function handleDragEnd(_, info) {
    const swipe = Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 450
    if (swipe) {
      const dir = info.offset.x > 0 ? 1 : -1
      // fly card off screen, then flip
      animate(x, dir * 600, { duration: 0.32, ease: 'easeIn' }).then(() => {
        setFrontIdx(f => 1 - f)
        x.set(0)
      })
    }
  }

  const front = degrees[frontIdx]
  const back  = degrees[1 - frontIdx]

  return (
    <section id="education" style={{ background: '#faf6f1', padding: '80px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textAlign: 'center', fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Education
        </p>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', textTransform: 'uppercase', color: '#544f47', marginBottom: '48px', letterSpacing: '-0.01em' }}>
          Academic Background
        </h2>

        {/* Card stack */}
        <div style={{ position: 'relative', cursor: 'grab' }}>

          {/* ── Back card (static behind, parallaxes as front is dragged) ── */}
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              inset: '0 -6px',
              zIndex: 1,
              scale: backScale,
              y: backY,
              opacity: backOpacity,
              transformOrigin: 'bottom center',
              pointerEvents: 'none',
            }}
          >
            <DegreeCard degree={back} />
          </motion.div>

          {/* ── Front card (draggable, in flow so it sizes the container) ── */}
          <motion.div
            drag="x"
            dragElastic={0.14}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 10 }}
            style={{ position: 'relative', zIndex: 2, x, rotate }}
          >
            <DegreeCard degree={front} />
          </motion.div>

        </div>

        {/* Hint + dots */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
          <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '13px', margin: 0 }}>
            ← drag to see {front.ref === 'M.S.' ? 'B.S.' : 'M.S.'} →
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {degrees.map((d, i) => (
              <button
                key={i}
                onClick={() => { x.set(0); setFrontIdx(i) }}
                title={d.ref}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  background: i === frontIdx ? front.accentColor : 'rgba(84,79,71,0.15)',
                  width: i === frontIdx ? '28px' : '8px',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Degree card ── */
function DegreeCard({ degree }) {
  const { accentColor, accentBg, accentBorder } = degree
  return (
    <div
      style={{
        background: '#ffffff',
        border: `1.5px solid ${accentBorder}`,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 4px 24px rgba(84,79,71,0.09)',
        userSelect: 'none',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
        <div>
          <span style={{ display: 'inline-block', fontSize: '11px', padding: '2px 10px', borderRadius: '20px', fontWeight: 600, marginBottom: '8px', background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}>
            {degree.period}
          </span>
          <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#544f47', lineHeight: 1.3, margin: 0 }}>
            {degree.emoji} {degree.degree}
          </h3>
          <p style={{ fontWeight: 600, fontSize: '13px', marginTop: '3px', color: accentColor }}>
            {degree.field}
          </p>
          <p style={{ fontSize: '12px', marginTop: '2px', color: '#a89f95' }}>
            {degree.school} — {degree.location}
          </p>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '28px', fontWeight: 700, color: accentColor, lineHeight: 1 }}>
            {degree.gpa}
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a89f95' }}>GPA</div>
        </div>
      </div>

      {/* Coursework */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: '#c4bfba', marginBottom: '8px' }}>
          Coursework
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {degree.courses.map(c => (
            <span key={c} style={{ padding: '3px 10px', fontSize: '11px', borderRadius: '20px', background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Activities & societies */}
      {degree.activities && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: '#c4bfba', marginBottom: '10px' }}>
            Activities &amp; Societies
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {degree.activities.map(a => (
              <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{a.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: '12px', color: '#544f47', margin: 0, lineHeight: 1.3 }}>{a.name}</p>
                  <p style={{ fontSize: '11px', color: '#a89f95', margin: '1px 0 0' }}>{a.role} · {a.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scholarship */}
      {degree.scholarship && (
        <div style={{ background: 'rgba(245,174,0,0.07)', border: '1px solid rgba(245,174,0,0.22)', borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>🏆</span>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#b28e00', lineHeight: 1.4, margin: 0 }}>
              {degree.scholarship.name}
            </p>
            <p style={{ fontSize: '11px', marginTop: '4px', color: '#a89f95', lineHeight: 1.55, margin: '4px 0 0' }}>
              {degree.scholarship.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
