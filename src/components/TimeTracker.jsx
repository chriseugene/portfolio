/* ─────────────────────────────────────────────────────────
   TimeTracker — "You've spent X seconds reading" banner
   Patrick Star drops in to ask if you're amazed
───────────────────────────────────────────────────────── */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  (t) => `You've spent ${t} seconds on this page… coincidence? I think NOT.`,
  (t) => `${t} seconds of your life, dedicated to reading about Chris. Worth it? 👀`,
  (t) => `${t} seconds in and still scrolling? You must be IMPRESSED.`,
  (t) => `That's ${t} whole seconds. Hope it was better than watching TV.`,
  (t) => `${t} seconds. A recruiter takes 7. You're doing great. 🏆`,
]

function PatrickStar() {
  return (
    <svg viewBox="0 0 120 160" width="110" height="147" xmlns="http://www.w3.org/2000/svg">
      {/* Body — pink rounded star shape */}
      <ellipse cx="60" cy="95" rx="44" ry="52" fill="#f4a0b0" />
      {/* Star arms */}
      <ellipse cx="18" cy="75" rx="16" ry="9" fill="#f4a0b0" transform="rotate(-30 18 75)" />
      <ellipse cx="102" cy="75" rx="16" ry="9" fill="#f4a0b0" transform="rotate(30 102 75)" />
      <ellipse cx="28" cy="128" rx="14" ry="9" fill="#f4a0b0" transform="rotate(20 28 128)" />
      <ellipse cx="92" cy="128" rx="14" ry="9" fill="#f4a0b0" transform="rotate(-20 92 128)" />
      {/* Shorts — green with purple flowers */}
      <ellipse cx="60" cy="130" rx="38" ry="22" fill="#4a9e4a" />
      <rect x="22" y="118" width="76" height="20" rx="4" fill="#4a9e4a" />
      {/* Flower pattern on shorts */}
      <circle cx="42" cy="126" r="5" fill="#9b59b6" opacity="0.8"/>
      <circle cx="42" cy="126" r="2.5" fill="#f9e547" />
      <circle cx="60" cy="129" r="5" fill="#9b59b6" opacity="0.8"/>
      <circle cx="60" cy="129" r="2.5" fill="#f9e547" />
      <circle cx="78" cy="126" r="5" fill="#9b59b6" opacity="0.8"/>
      <circle cx="78" cy="126" r="2.5" fill="#f9e547" />
      {/* Waistband */}
      <rect x="22" y="116" width="76" height="5" rx="2" fill="#3a7e3a" />
      {/* Face */}
      {/* Eyes */}
      <ellipse cx="46" cy="82" rx="10" ry="11" fill="white" />
      <ellipse cx="74" cy="82" rx="10" ry="11" fill="white" />
      <circle cx="49" cy="84" r="5" fill="#1a1a1a" />
      <circle cx="77" cy="84" r="5" fill="#1a1a1a" />
      <circle cx="51" cy="82" r="2" fill="white" />
      <circle cx="79" cy="82" r="2" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="94" rx="5" ry="3" fill="#e8809a" />
      {/* Big amazed open mouth */}
      <path d="M 40 104 Q 60 122 80 104" fill="#8B1A1A" stroke="#c0536a" strokeWidth="1.5" />
      <path d="M 40 104 Q 60 108 80 104" fill="#f4a0b0" />
      {/* Teeth */}
      <rect x="48" y="104" width="10" height="7" rx="2" fill="white" />
      <rect x="62" y="104" width="10" height="7" rx="2" fill="white" />
      {/* Eyebrows — raised in amazement */}
      <path d="M 37 70 Q 46 64 55 70" stroke="#c07080" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 65 70 Q 74 64 83 70" stroke="#c07080" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Texture dots on body */}
      <circle cx="35" cy="100" r="2" fill="#e8809a" opacity="0.5"/>
      <circle cx="85" cy="105" r="2" fill="#e8809a" opacity="0.5"/>
      <circle cx="55" cy="115" r="1.5" fill="#e8809a" opacity="0.4"/>
    </svg>
  )
}

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(0)
  const [msgIdx]  = useState(() => Math.floor(Math.random() * messages.length))

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeDisplay = mins > 0 ? `${mins}m ${secs}s` : `${seconds}s`

  return (
    <div style={{
      background: '#1a1510',
      padding: '48px 24px 0',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '24px',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Patrick slides up from bottom */}
      <motion.div
        initial={{ y: 160 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', stiffness: 55, damping: 13, delay: 0.2 }}
        style={{ flexShrink: 0, alignSelf: 'flex-end' }}
      >
        <PatrickStar />
      </motion.div>

      {/* Speech bubble + timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 180, damping: 18 }}
        style={{ marginBottom: '32px', maxWidth: '320px', position: 'relative' }}
      >
        {/* Bubble */}
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          padding: '18px 22px',
          boxShadow: '4px 5px 0px rgba(0,0,0,0.35)',
          border: '2px solid #544f47',
          position: 'relative',
        }}>
          {/* Tail pointing left toward Patrick */}
          <div style={{
            position: 'absolute', left: '-14px', bottom: '28px',
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '14px solid #544f47',
          }} />
          <div style={{
            position: 'absolute', left: '-11px', bottom: '29px',
            width: 0, height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderRight: '12px solid #fff',
          }} />

          <p style={{
            fontFamily: "'Architects Daughter', cursive",
            fontSize: '13px', color: '#544f47',
            margin: '0 0 10px', lineHeight: 1.55,
          }}>
            {messages[msgIdx](timeDisplay)}
          </p>

          {/* Live timer display */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#1a1510', borderRadius: '8px', padding: '6px 14px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e75d0b', animation: 'pulseDot 1.2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#e75d0b', letterSpacing: '0.05em' }}>
              {timeDisplay}
            </span>
            <span style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '11px', color: '#7d776e' }}>
              on page
            </span>
          </div>

          {/* Sub-text */}
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
  )
}
