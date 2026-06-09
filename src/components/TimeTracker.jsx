/* ─────────────────────────────────────────────────────────
   TimeTracker — Patrick Star asks if you're amazed
───────────────────────────────────────────────────────── */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const messages = [
  (t) => `You've been here ${t}… coincidence? I think NOT.`,
  (t) => `${t} of your life, dedicated to reading about Chris. Worth it? 👀`,
  (t) => `${t} in and still scrolling? You must be IMPRESSED.`,
  (t) => `That's ${t} on this page. Hope it was better than watching TV.`,
  (t) => `${t} here. A recruiter takes 7 seconds. You're doing great. 🏆`,
]

function PatrickStar() {
  return (
    <svg viewBox="0 0 120 160" width="120" height="160" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="60" cy="90" rx="44" ry="52" fill="#f4a0b0" />
      {/* Left arm */}
      <ellipse cx="18" cy="72" rx="16" ry="9" fill="#f4a0b0" transform="rotate(-30 18 72)" />
      {/* Right arm */}
      <ellipse cx="102" cy="72" rx="16" ry="9" fill="#f4a0b0" transform="rotate(30 102 72)" />
      {/* Left leg */}
      <ellipse cx="30" cy="132" rx="14" ry="9" fill="#f4a0b0" transform="rotate(15 30 132)" />
      {/* Right leg */}
      <ellipse cx="90" cy="132" rx="14" ry="9" fill="#f4a0b0" transform="rotate(-15 90 132)" />

      {/* Shorts body */}
      <rect x="22" y="112" width="76" height="28" rx="6" fill="#4a9e4a" />
      {/* Shorts bottom curve */}
      <ellipse cx="60" cy="140" rx="38" ry="14" fill="#4a9e4a" />
      {/* Waistband */}
      <rect x="22" y="110" width="76" height="6" rx="3" fill="#2e7a2e" />

      {/* Flowers on shorts */}
      <circle cx="40" cy="124" r="5.5" fill="#9b59b6" />
      <circle cx="40" cy="124" r="2.5" fill="#f9e547" />
      <circle cx="60" cy="127" r="5.5" fill="#9b59b6" />
      <circle cx="60" cy="127" r="2.5" fill="#f9e547" />
      <circle cx="80" cy="124" r="5.5" fill="#9b59b6" />
      <circle cx="80" cy="124" r="2.5" fill="#f9e547" />

      {/* Eye whites */}
      <ellipse cx="45" cy="78" rx="11" ry="12" fill="white" />
      <ellipse cx="75" cy="78" rx="11" ry="12" fill="white" />
      {/* Pupils */}
      <circle cx="48" cy="80" r="6" fill="#1a1a1a" />
      <circle cx="78" cy="80" r="6" fill="#1a1a1a" />
      {/* Eye shine */}
      <circle cx="50" cy="78" r="2.2" fill="white" />
      <circle cx="80" cy="78" r="2.2" fill="white" />

      {/* Nose */}
      <ellipse cx="60" cy="91" rx="5" ry="3.5" fill="#e8809a" />

      {/* Mouth — wide amazed grin */}
      <path d="M 38 102 Q 60 122 82 102" fill="#7a1020" />
      <path d="M 38 102 Q 60 107 82 102" fill="#f4a0b0" />
      {/* Teeth */}
      <rect x="46" y="102" width="11" height="7" rx="2" fill="white" />
      <rect x="63" y="102" width="11" height="7" rx="2" fill="white" />

      {/* Eyebrows raised */}
      <path d="M 35 66 Q 45 60 56 66" stroke="#d07090" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 64 66 Q 75 60 85 66" stroke="#d07090" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Freckles / texture */}
      <circle cx="33" cy="95" r="2.5" fill="#e8809a" opacity="0.45"/>
      <circle cx="87" cy="98" r="2.5" fill="#e8809a" opacity="0.45"/>
    </svg>
  )
}

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(0)
  const [msgIdx] = useState(() => Math.floor(Math.random() * messages.length))

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeDisplay = mins > 0 ? `${mins}m ${secs}s` : `${seconds}s`

  return (
    <div style={{ background: '#1a1510', paddingTop: '48px', position: 'relative' }}>
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0 24px 0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '28px',
        flexWrap: 'wrap',
      }}>

        {/* Patrick */}
        <img
          src="/patrick.png"
          alt="Patrick Star"
          style={{ width: '360px', display: 'block', flexShrink: 0, filter: 'drop-shadow(2px 4px 12px rgba(0,0,0,0.5))' }}
        />

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -12 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 0.65, type: 'spring', stiffness: 180, damping: 18 }}
          style={{ marginBottom: '28px', maxWidth: '340px', position: 'relative' }}
        >
          <div style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '18px 22px',
            boxShadow: '4px 5px 0px rgba(0,0,0,0.4)',
            border: '2px solid #544f47',
            position: 'relative',
          }}>
            {/* Bubble tail → points left toward Patrick */}
            <div style={{
              position: 'absolute', left: '-15px', bottom: '32px',
              width: 0, height: 0,
              borderTop: '9px solid transparent',
              borderBottom: '9px solid transparent',
              borderRight: '15px solid #544f47',
            }} />
            <div style={{
              position: 'absolute', left: '-11px', bottom: '33px',
              width: 0, height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '13px solid #fff',
            }} />

            <p style={{
              fontFamily: "'Architects Daughter', cursive",
              fontSize: '13px', color: '#544f47',
              margin: '0 0 12px', lineHeight: 1.6,
            }}>
              {messages[msgIdx](timeDisplay)}
            </p>

            {/* Timer pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#1a1510', borderRadius: '8px', padding: '6px 14px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e75d0b', animation: 'pulseDot 1.2s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: '#e75d0b', letterSpacing: '0.05em' }}>
                {timeDisplay}
              </span>
              <span style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '11px', color: '#7d776e' }}>
                on page
              </span>
            </div>

            <p style={{
              fontFamily: "'Architects Daughter', cursive",
              fontSize: '12px', color: '#b0a99e',
              margin: '10px 0 0', textAlign: 'right',
            }}>
              Are ya AMAZED yet? 🌟
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
