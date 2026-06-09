/* ─────────────────────────────────────────────────────────
   Hero — faithfully matches harinisk.com layout:
   Lanyard card (drops from top) · Todo widget (left) ·
   Work-categories widget (right) · Stamp (bottom-left) ·
   Center heading + metrics · Company logo ticker
───────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── data ─────────────────────────────────────────────── */
const todos = [
  { done: true,  text: 'Pass ECE graduate quals'        },
  { done: true,  text: 'Land industry internship'       },
  { done: false, text: 'Publish quantum research paper' },
  { done: true,  text: 'Build real-time LiFi demo'      },
  { done: true,  text: 'Deploy portfolio v3'            },
]

const workAreas = [
  { icon: '⚡', label: 'Power\nSystems'   },
  { icon: '🔬', label: 'Quantum\nEngrg'   },
  { icon: '🧠', label: 'Machine\nLearn'   },
  { icon: '📡', label: 'LiFi /\nWireless' },
  { icon: '🔮', label: 'Nano-\nMaterials' },
  { icon: '💾', label: 'VLSI &\nDigital'  },
]

const companies = [
  { name: 'Mercedes-Benz',       sub: 'IT Support Intern'            },
  { name: 'Saint Louis University', sub: 'M.S. ECE · Teaching Asst'  },
  { name: 'TransPerfect',        sub: 'Quality Assurance'             },
]

/* ══════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="home"
      style={{ background: '#f5efe7', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      <CircuitBoard />
      <EceSchematic />
      <SineWave />

      {/* ── Viewport-height widget stage ── */}
      <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* ────── LEFT: Todo widget ────── */}
        <motion.div
          drag dragMomentum={false} dragElastic={0.08}
          whileDrag={{ scale: 1.05, zIndex: 20, cursor: 'grabbing' }}
          className="hidden lg:block widget-side"
          style={{ position: 'absolute', left: 'clamp(20px, 5.5%, 72px)', top: '50%', marginTop: '-160px', zIndex: 4, cursor: 'grab' }}
          initial={{ opacity: 0, y: -180, rotate: -5 }}
          animate={{ opacity: 1, y: [0, -8, 0], rotate: -5 }}
          transition={{
            opacity: { duration: 0.45, delay: 0.4 },
            y: { times: [0, 0.5, 1], duration: 4.5, ease: 'easeInOut', delay: 0.4,
                 repeat: Infinity, repeatType: 'mirror' },
          }}
        >
          <TodoWidget />
          <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '13px', textAlign: 'center', marginTop: '8px', transform: 'rotate(5deg)', pointerEvents: 'none' }}>
            my to-do list ✏️
          </p>
        </motion.div>

        {/* ────── LEFT: Lanyard card drops from above ────── */}
        <div className="hidden md:block" style={{ position: 'absolute', top: '60px', left: 'clamp(220px, 22%, 310px)', zIndex: 4 }}>
          <motion.div
            drag dragMomentum={false} dragElastic={0.06}
            whileDrag={{ scale: 1.04, zIndex: 20, cursor: 'grabbing' }}
            style={{ cursor: 'grab' }}
            initial={{ y: -650, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 48, damping: 13, mass: 1.3, delay: 0.05 }}
          >
            <LanyardCard />
          </motion.div>
        </div>

        {/* "That's me!" annotation */}
        <motion.p
          className="hidden xl:block"
          style={{ position: 'absolute', left: 'clamp(340px, 31%, 430px)', top: 'calc(50% - 200px)', fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '13px', transform: 'rotate(-6deg)', pointerEvents: 'none', userSelect: 'none', zIndex: 3 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          That&apos;s me! 👆
        </motion.p>

        {/* ────── RIGHT: Work-categories widget ────── */}
        <motion.div
          drag dragMomentum={false} dragElastic={0.08}
          whileDrag={{ scale: 1.05, zIndex: 20, cursor: 'grabbing' }}
          className="hidden xl:block"
          style={{ position: 'absolute', right: 'clamp(20px, 5%, 60px)', top: '50%', marginTop: '-130px', zIndex: 4, cursor: 'grab' }}
          initial={{ opacity: 0, y: -180, rotate: 6 }}
          animate={{ opacity: 1, y: [0, -10, 0], rotate: 6 }}
          transition={{
            opacity: { duration: 0.45, delay: 0.5 },
            y: { times: [0, 0.5, 1], duration: 3.8, ease: 'easeInOut', delay: 0.5,
                 repeat: Infinity, repeatType: 'mirror' },
          }}
        >
          <WorkCategoriesWidget />
          <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '13px', textAlign: 'center', marginTop: '8px', transform: 'rotate(-6deg)', pointerEvents: 'none' }}>
            What do I work on? 🔬
          </p>
        </motion.div>

        {/* ────── BOTTOM-LEFT: Stamp widget ────── */}
        <motion.div
          drag dragMomentum={false} dragElastic={0.08}
          whileDrag={{ scale: 1.08, zIndex: 20, cursor: 'grabbing' }}
          className="hidden xl:block"
          style={{ position: 'absolute', bottom: '16%', left: 'clamp(20px, 7%, 90px)', zIndex: 4, cursor: 'grab' }}
          initial={{ opacity: 0, y: -160, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 55, damping: 14, delay: 0.6 }}
        >
          <StampWidget />
          <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '12px', textAlign: 'center', marginTop: '6px', transform: 'rotate(10deg)', pointerEvents: 'none' }}>
            Where am I from? 📍
          </p>
        </motion.div>

        {/* ────── Relocation note (near stamp) ────── */}
        <motion.p
          className="hidden xl:block"
          style={{
            position: 'absolute',
            bottom: '10%',
            left: 'clamp(20px, 16%, 200px)',
            fontFamily: "'Architects Daughter', cursive",
            color: '#517d64',
            fontSize: '13px',
            transform: 'rotate(-4deg)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 3,
            maxWidth: '180px',
            lineHeight: 1.5,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          Am I willing to relocate?{' '}
          <span style={{ color: '#e75d0b', fontWeight: 700 }}>of course I am 🌍</span>
        </motion.p>

        {/* ────── CENTER: Main text content ────── */}
        <motion.div
          style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '540px', padding: '0 20px', marginTop: '120px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.p
            style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', fontSize: '18px', marginBottom: '12px', transform: 'rotate(-2deg)', display: 'inline-block' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            m.s. ece graduate &amp; engineer 👋
          </motion.p>

          <motion.h1
            style={{ fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 50px)', color: '#544f47', textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '20px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
          >
            M.S. ECE Building{' '}
            <span style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', fontWeight: 400, textTransform: 'lowercase', display: 'block', fontSize: '1.1em' }}>
              Circuits, Systems &amp; Intelligent Machines.
            </span>
          </motion.h1>

          {/* Metrics */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.12 }}
          >
            <MetricItem value="3.90" label="GPA" desc="@ SLU" />
            <div style={{ width: '1px', height: '36px', background: 'rgba(84,79,71,0.15)' }} />
            <MetricItem value="5+" label="Projects" desc="Built &amp; deployed" />
            <div style={{ width: '1px', height: '36px', background: 'rgba(84,79,71,0.15)' }} />
            <MetricItem value="3" label="Companies" desc="Internships &amp; TA" />
          </motion.div>

          {/* CTA */}
          <motion.a
            href="/Chris_Eugene_Resume.pdf"
            download="Chris_Eugene_Resume.pdf"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 32px', borderRadius: '100px', background: '#e75d0b', color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(231,93,11,0.30)', letterSpacing: '0.01em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.22 }}
            whileHover={{ scale: 1.04, opacity: 0.92 }}
            whileTap={{ scale: 0.97 }}
          >
            Download Resume ↓
          </motion.a>
        </motion.div>

        {/* ────── BOTTOM-RIGHT: Date & Time widget ────── */}
        <motion.div
          drag dragMomentum={false} dragElastic={0.08}
          whileDrag={{ scale: 1.05, zIndex: 20, cursor: 'grabbing' }}
          className="hidden xl:block"
          style={{ position: 'absolute', bottom: '16%', right: 'clamp(20px, 7%, 90px)', zIndex: 4, cursor: 'grab' }}
          initial={{ opacity: 0, y: -160, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 55, damping: 14, delay: 0.7 }}
        >
          <DateTimeWidget />
          <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '12px', textAlign: 'center', marginTop: '6px', transform: 'rotate(-8deg)', pointerEvents: 'none' }}>
            local time ⏰
          </p>
        </motion.div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce"
          style={{ color: '#c4bfba', fontSize: '11px', letterSpacing: '0.12em', fontFamily: "'Architects Daughter', cursive" }}
        >
          scroll
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ── Logo ticker (below 100vh) ── */}
      <LogoTicker />
    </section>
  )
}

/* ══ Sub-components ══════════════════════════════════════ */

/* ── PCB circuit-trace background ── */
function CircuitBoard() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Repeating PCB tile: grid + L-shaped traces + vias */}
          <pattern id="pcb-tile" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Routing grid */}
            <path d="M120 0 L0 0 0 120" fill="none" stroke="rgba(84,79,71,0.045)" strokeWidth="0.7"/>
            {/* Trace A — orange (power / ECE orange) */}
            <path d="M0 60 L40 60 L40 0" fill="none" stroke="rgba(231,93,11,0.065)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Trace B — green (signal / ECE green) */}
            <path d="M80 120 L80 80 L120 80" fill="none" stroke="rgba(81,125,100,0.065)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Mini horizontal stub */}
            <path d="M0 20 L18 20" fill="none" stroke="rgba(231,93,11,0.04)" strokeWidth="1" strokeLinecap="round"/>
            {/* Via hole A */}
            <circle cx="40" cy="60" r="4" fill="none" stroke="rgba(231,93,11,0.10)" strokeWidth="0.9"/>
            <circle cx="40" cy="60" r="1.6" fill="rgba(231,93,11,0.08)"/>
            {/* Via hole B */}
            <circle cx="80" cy="80" r="4" fill="none" stroke="rgba(81,125,100,0.10)" strokeWidth="0.9"/>
            <circle cx="80" cy="80" r="1.6" fill="rgba(81,125,100,0.08)"/>
            {/* Component pad (tiny SMD footprint) */}
            <rect x="35" y="14" width="10" height="10" rx="1.5" fill="none" stroke="rgba(231,93,11,0.08)" strokeWidth="0.8"/>
          </pattern>
          {/* Radial fade so pattern is denser at edges, thinner at center */}
          <radialGradient id="pcb-fade" cx="50%" cy="45%" r="62%">
            <stop offset="20%" stopColor="white" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="white" stopOpacity="1"/>
          </radialGradient>
          <mask id="pcb-mask">
            <rect width="100%" height="100%" fill="white"/>
            <rect width="100%" height="100%" fill="url(#pcb-fade)"/>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-tile)" mask="url(#pcb-mask)" opacity="0.85"/>
      </svg>
    </div>
  )
}

/* ── Floating ECE schematic symbols ── */
function EceSchematic() {
  return (
    <>
      {/* ── Resistor — top-right corner ── */}
      <div className="hidden xl:block" style={{ position: 'absolute', top: '9%', right: '1.5%', pointerEvents: 'none', zIndex: 1, opacity: 0.11 }}>
        <svg width="110" height="44" viewBox="0 0 110 44">
          <line x1="0" y1="22" x2="14" y2="22" stroke="#e75d0b" strokeWidth="2" strokeLinecap="round"/>
          <polyline points="14,22 18,8 24,36 30,8 36,36 42,8 48,36 54,8 60,36 66,8 72,36 78,22" fill="none" stroke="#e75d0b" strokeWidth="2" strokeLinejoin="round"/>
          <line x1="78" y1="22" x2="110" y2="22" stroke="#e75d0b" strokeWidth="2" strokeLinecap="round"/>
          <text x="55" y="43" fontSize="8" fill="#e75d0b" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="500">R₁  47kΩ</text>
        </svg>
      </div>

      {/* ── AND Logic gate — top-left corner ── */}
      <div className="hidden xl:block" style={{ position: 'absolute', top: '11%', left: '0.8%', pointerEvents: 'none', zIndex: 1, opacity: 0.10 }}>
        <svg width="88" height="68" viewBox="0 0 88 68">
          {/* Gate body */}
          <path d="M14,6 L14,62 L42,62 C68,62 74,34 74,34 C74,34 68,6 42,6 Z" fill="none" stroke="#517d64" strokeWidth="2"/>
          {/* Input wires */}
          <line x1="0" y1="20" x2="14" y2="20" stroke="#517d64" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="0" y1="48" x2="14" y2="48" stroke="#517d64" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Output wire */}
          <line x1="74" y1="34" x2="88" y2="34" stroke="#517d64" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Labels */}
          <text x="5" y="18" fontSize="7" fill="#517d64" fontFamily="'JetBrains Mono', monospace">A</text>
          <text x="5" y="46" fontSize="7" fill="#517d64" fontFamily="'JetBrains Mono', monospace">B</text>
          <text x="44" y="66" fontSize="7" fill="#517d64" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">AND</text>
        </svg>
      </div>

      {/* ── Op-Amp triangle — bottom-right ── */}
      <div className="hidden xl:block" style={{ position: 'absolute', bottom: '22%', right: '1.2%', pointerEvents: 'none', zIndex: 1, opacity: 0.10 }}>
        <svg width="100" height="80" viewBox="0 0 100 80">
          <polygon points="20,4 20,76 86,40" fill="none" stroke="#e75d0b" strokeWidth="2"/>
          <line x1="0" y1="24" x2="20" y2="24" stroke="#e75d0b" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="0" y1="56" x2="20" y2="56" stroke="#e75d0b" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="86" y1="40" x2="100" y2="40" stroke="#e75d0b" strokeWidth="1.8" strokeLinecap="round"/>
          <text x="32" y="32" fontSize="10" fill="#e75d0b" fontFamily="'JetBrains Mono', monospace" fontWeight="700">+</text>
          <text x="32" y="56" fontSize="10" fill="#e75d0b" fontFamily="'JetBrains Mono', monospace" fontWeight="700">−</text>
          <text x="50" y="78" fontSize="7" fill="#e75d0b" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">Op-Amp</text>
        </svg>
      </div>

      {/* ── Capacitor — left edge, below stamp area ── */}
      <div className="hidden xl:block" style={{ position: 'absolute', bottom: '15%', left: '1.5%', pointerEvents: 'none', zIndex: 1, opacity: 0.09 }}>
        <svg width="52" height="72" viewBox="0 0 52 72">
          <line x1="26" y1="0" x2="26" y2="26" stroke="#517d64" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4" y1="26" x2="48" y2="26" stroke="#517d64" strokeWidth="3" strokeLinecap="round"/>
          <line x1="4" y1="36" x2="48" y2="36" stroke="#517d64" strokeWidth="3" strokeLinecap="round"/>
          <line x1="26" y1="36" x2="26" y2="62" stroke="#517d64" strokeWidth="2" strokeLinecap="round"/>
          <text x="26" y="72" fontSize="7.5" fill="#517d64" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">10μF</text>
        </svg>
      </div>

      {/* ── Ground & VCC pin labels — decorative corner text ── */}
      <div className="hidden xl:block" style={{ position: 'absolute', top: '5%', left: '2%', pointerEvents: 'none', zIndex: 1, opacity: 0.09 }}>
        <svg width="60" height="30" viewBox="0 0 60 30">
          <line x1="0" y1="8" x2="20" y2="8" stroke="#e75d0b" strokeWidth="1.5" strokeLinecap="round"/>
          <text x="22" y="12" fontSize="9" fill="#e75d0b" fontFamily="'JetBrains Mono', monospace" fontWeight="700">VCC</text>
          <line x1="0" y1="22" x2="20" y2="22" stroke="#517d64" strokeWidth="1.5" strokeLinecap="round"/>
          {/* GND symbol */}
          <line x1="22" y1="22" x2="38" y2="22" stroke="#517d64" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="24" y1="26" x2="36" y2="26" stroke="#517d64" strokeWidth="1" strokeLinecap="round"/>
          <line x1="27" y1="30" x2="33" y2="30" stroke="#517d64" strokeWidth="0.8" strokeLinecap="round"/>
        </svg>
      </div>

      {/* ── IC chip outline — subtle center background ── */}
      <div className="hidden xl:block" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(8deg)', pointerEvents: 'none', zIndex: 0, opacity: 0.03 }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Chip body */}
          <rect x="60" y="60" width="100" height="100" rx="6" fill="none" stroke="#544f47" strokeWidth="3"/>
          {/* Notch */}
          <path d="M105,60 A5,5 0 0,1 115,60" fill="none" stroke="#544f47" strokeWidth="2"/>
          {/* Left pins */}
          {[80,95,110,125,140].map((y,i) => (
            <line key={`l${i}`} x1="40" y1={y} x2="60" y2={y} stroke="#544f47" strokeWidth="2.5" strokeLinecap="round"/>
          ))}
          {/* Right pins */}
          {[80,95,110,125,140].map((y,i) => (
            <line key={`r${i}`} x1="160" y1={y} x2="180" y2={y} stroke="#544f47" strokeWidth="2.5" strokeLinecap="round"/>
          ))}
          {/* Top pins */}
          {[80,95,110,125,140].map((x,i) => (
            <line key={`t${i}`} x1={x} y1="40" x2={x} y2="60" stroke="#544f47" strokeWidth="2.5" strokeLinecap="round"/>
          ))}
          {/* Bottom pins */}
          {[80,95,110,125,140].map((x,i) => (
            <line key={`b${i}`} x1={x} y1="160" x2={x} y2="180" stroke="#544f47" strokeWidth="2.5" strokeLinecap="round"/>
          ))}
          {/* Die mark */}
          <circle cx="110" cy="110" r="18" fill="none" stroke="#544f47" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>
      </div>
    </>
  )
}

/* ── Live date & time clock widget ── */
function DateTimeWidget() {
  const [now, setNow] = useState(new Date())
  const [yourLocation, setYourLocation] = useState(null)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Fetch visitor's city/country via IP geolocation (no permission needed)
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        if (!d.error && d.city) {
          setYourLocation({ city: d.city, country: d.country_code })
        }
      })
      .catch(() => {})
  }, [])

  // My time — St. Louis
  const myTimeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'America/Chicago',
  })
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    timeZone: 'America/Chicago',
  })
  const tzAbbr = now
    .toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: 'America/Chicago' })
    .split(' ').pop()

  const myParts = myTimeStr.split(':')
  const h = myParts[0], m = myParts[1]
  const [s, ampm] = (myParts[2] ?? '').split(' ')

  // Visitor's local time
  const yourTimeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
  const yourTzAbbr = now
    .toLocaleTimeString('en-US', { timeZoneName: 'short' })
    .split(' ').pop()
  const sameZone = tzAbbr === yourTzAbbr

  return (
    <div style={{
      width: '192px',
      borderRadius: '18px',
      overflow: 'hidden',
      boxShadow: '16px 16px 40px rgba(84,79,71,0.18)',
      background: '#1a1510',
      border: '1.5px solid rgba(255,255,255,0.07)',
    }}>
      {/* macOS chrome bar */}
      <div style={{ background: '#252018', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '7px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#febc2e', display: 'block' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28c840', display: 'block' }} />
        <span style={{ marginLeft: '7px', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.28)' }}>clock.sh</span>
      </div>

      {/* Clock body */}
      <div style={{ padding: '14px 16px 16px' }}>

        {/* MY TIME label */}
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#e75d0b', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '5px', opacity: 0.8 }}>
          my time 📍
        </p>

        {/* Big time display */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', justifyContent: 'center', marginBottom: '4px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 700, color: '#f5efe7', lineHeight: 1, letterSpacing: '-0.02em' }}>{h}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 700, color: '#e75d0b', lineHeight: 1 }}>:</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 700, color: '#f5efe7', lineHeight: 1 }}>{m}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 700, color: '#e75d0b', lineHeight: 1 }}>:</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '22px', fontWeight: 500, color: 'rgba(245,239,231,0.55)', lineHeight: 1, alignSelf: 'center' }}>{s}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, color: '#e75d0b', marginLeft: '3px', alignSelf: 'center' }}>{ampm}</span>
        </div>

        {/* Date + tz row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(245,239,231,0.35)', letterSpacing: '0.03em' }}>St. Louis, MO</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840', display: 'block', boxShadow: '0 0 5px #28c840' }} className="pulse-dot" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#28c840', fontWeight: 600 }}>{tzAbbr}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '10px' }} />

        {/* YOUR TIME label */}
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#517d64', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.8 }}>
          your time 🌍
        </p>

        {sameZone ? (
          <>
            <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '11px', color: 'rgba(245,239,231,0.4)', lineHeight: 1.4 }}>
              Same timezone as me! 👋
            </p>
            {yourLocation && (
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(245,239,231,0.28)', marginTop: '4px', letterSpacing: '0.03em' }}>
                📍 {yourLocation.city}, {yourLocation.country}
              </p>
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#f5efe7', letterSpacing: '-0.01em' }}>
                {yourTimeStr}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#517d64', fontWeight: 600, background: 'rgba(81,125,100,0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                {yourTzAbbr}
              </span>
            </div>
            {yourLocation && (
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(245,239,231,0.28)', letterSpacing: '0.03em' }}>
                📍 {yourLocation.city}, {yourLocation.country}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ── Animated oscilloscope sine wave ── */
function SineWave() {
  // Build a multi-cycle sine path across 800px width
  const W = 800, H = 48, cycles = 4
  const pts = []
  const steps = 200
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W
    const y = H / 2 - Math.sin((i / steps) * cycles * 2 * Math.PI) * (H * 0.38)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  const d = pts.join(' ')
  const totalLen = 2400 // approx path length

  return (
    <div
      className="hidden lg:block"
      style={{
        position: 'absolute',
        bottom: '13%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 1,
        width: '800px',
        maxWidth: '90vw',
      }}
    >
      {/* Scope screen chrome */}
      <div style={{ position: 'relative', background: 'rgba(20,18,14,0.04)', border: '1px solid rgba(84,79,71,0.10)', borderRadius: '10px', padding: '8px 12px' }}>
        {/* Scope label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(231,93,11,0.45)', letterSpacing: '0.12em' }}>CH1 ▸ 50mV/div  ·  TIME 1ms/div</span>
          <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(81,125,100,0.45)' }}>TRIG ▸ NORM</span>
        </div>
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          {/* Grid lines */}
          {[0.25,0.5,0.75].map(t => (
            <line key={t} x1="0" y1={H*t} x2={W} y2={H*t} stroke="rgba(84,79,71,0.07)" strokeWidth="1" strokeDasharray="4 4"/>
          ))}
          {[1,2,3].map(t => (
            <line key={t} x1={W*t*0.25} y1="0" x2={W*t*0.25} y2={H} stroke="rgba(84,79,71,0.07)" strokeWidth="1" strokeDasharray="4 4"/>
          ))}
          {/* Animated signal trace */}
          <motion.path
            d={d}
            fill="none"
            stroke="#e75d0b"
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ opacity: 0.28 }}
            initial={{ strokeDasharray: totalLen, strokeDashoffset: totalLen }}
            animate={{ strokeDashoffset: [totalLen, 0, -totalLen] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 0.4 }}
          />
          {/* Static ghost trace (always visible, even fainter) */}
          <path d={d} fill="none" stroke="#e75d0b" strokeWidth="1" style={{ opacity: 0.07 }}/>
        </svg>
      </div>
      <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '10px', color: 'rgba(176,169,158,0.7)', textAlign: 'center', marginTop: '4px' }}>
        oscilloscope — signal trace
      </p>
    </div>
  )
}

/* ── Lanyard ID card ── */
function LanyardCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* rope */}
      <div style={{ width: '26px', background: 'rgb(118,112,103)', borderRadius: '13px', display: 'flex', flexDirection: 'column', gap: '2.5px', padding: '10px 3px 14px', boxShadow: '6px 6px 20px rgba(0,0,0,0.20)' }}>
        {Array.from({ length: 22 }, (_, i) => (
          <div key={i} style={{ height: '1.5px', background: i % 3 === 0 ? 'rgb(155,149,140)' : 'rgb(138,132,123)', borderRadius: '1px' }} />
        ))}
      </div>

      {/* card body */}
      <div style={{ width: '168px', borderRadius: '16px', background: 'rgb(156,150,141)', boxShadow: '16px 16px 48px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', gap: '7px' }}>
        {/* badge hole */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '42px', height: '12px', borderRadius: '10px', background: 'rgb(53,49,43)', border: '2px solid rgba(225,220,212,0.55)' }} />
          <div style={{ width: '34px', height: '4px', background: 'rgb(118,112,103)' }} />
        </div>

        {/* avatar */}
        <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', background: '#f5efe7', aspectRatio: '3 / 4' }}>
          <img
            src="/avatar.jpg"
            alt="Chris Eugene"
            className="avatar-wave"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', display: 'block' }}
          />
        </div>

        {/* name label */}
        <div style={{ background: '#f5efe7', borderRadius: '10px', padding: '5px 10px 8px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '36px', color: '#e75d0b', lineHeight: 1.0, margin: 0 }}>
            Chris
          </h2>
          <p style={{ fontSize: '8px', fontWeight: 700, color: '#7d776e', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '2px 0 0' }}>
            M.S. ECE · SLU &apos;26
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Todo widget ── */
function TodoWidget() {
  return (
    <div style={{ width: '240px', borderRadius: '16px', overflow: 'hidden', boxShadow: '16px 16px 40px rgba(84,79,71,0.18)', background: '#faf6f1', border: '1.5px solid rgba(84,79,71,0.12)' }}>
      <div style={{ background: '#f0ebe3', borderBottom: '1.5px solid rgba(84,79,71,0.10)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e', display: 'block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840', display: 'block' }} />
        <span style={{ marginLeft: '8px', fontSize: '11px', fontFamily: "'Architects Daughter', cursive", color: '#a89f95' }}>chris's to-do list</span>
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {todos.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ marginTop: '1px', width: '15px', height: '15px', borderRadius: '4px', border: t.done ? 'none' : '1.5px solid rgba(84,79,71,0.25)', background: t.done ? '#e75d0b' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {t.done && (
                <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: '12px', lineHeight: 1.4, color: t.done ? '#b0a99e' : '#544f47', textDecoration: t.done ? 'line-through' : 'none' }}>
              {t.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Work categories folder widget ── */
function WorkCategoriesWidget() {
  return (
    <div style={{ width: '218px', borderRadius: '16px', overflow: 'hidden', boxShadow: '16px 16px 40px rgba(84,79,71,0.18)', background: '#faf6f1', border: '1.5px solid rgba(84,79,71,0.12)' }}>
      <div style={{ background: '#f0ebe3', borderBottom: '1.5px solid rgba(84,79,71,0.10)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e', display: 'block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840', display: 'block' }} />
        <span style={{ marginLeft: '8px', fontSize: '11px', fontFamily: "'Architects Daughter', cursive", color: '#a89f95' }}>chris's work</span>
      </div>
      <div style={{ padding: '10px 12px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {workAreas.map((area, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '8px 4px', borderRadius: '10px', background: '#fff8f2', border: '1px solid rgba(231,93,11,0.08)' }}>
            <span style={{ fontSize: '18px' }}>{area.icon}</span>
            <span style={{ fontSize: '8px', textAlign: 'center', color: '#7d776e', fontWeight: 600, lineHeight: 1.3, whiteSpace: 'pre-line' }}>{area.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Vintage stamp widget ── */
function StampWidget() {
  return (
    <div style={{ width: '108px', height: '108px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', position: 'relative' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 108 108">
        <circle cx="54" cy="54" r="50" fill="none" stroke="#517d64" strokeWidth="2.5" strokeDasharray="6 4" />
        <circle cx="54" cy="54" r="41" fill="none" stroke="#517d64" strokeWidth="1.2" opacity="0.45" />
      </svg>
      <span style={{ fontSize: '22px' }}>🌲</span>
      <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '14px', fontWeight: 700, color: '#517d64', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
        St. Louis
      </p>
      <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '10px', color: '#517d64', opacity: 0.7, margin: 0 }}>
        MO, USA
      </p>
    </div>
  )
}

/* ── Metric display ── */
function MetricItem({ value, label, desc }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '32px', color: '#e75d0b', lineHeight: 1, margin: 0 }}>{value}</p>
      <p style={{ fontSize: '10px', fontWeight: 700, color: '#544f47', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '3px 0 1px' }}>{label}</p>
      <p style={{ fontSize: '9px', color: '#a89f95', margin: 0 }}>{desc}</p>
    </div>
  )
}

/* ── Horizontal scrolling logo ticker ── */
function LogoTicker() {
  const triple = [...companies, ...companies, ...companies]
  return (
    <div style={{ background: '#ede7de', borderTop: '1.5px solid rgba(84,79,71,0.12)', padding: '20px 0', overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b0a99e', marginBottom: '14px', fontFamily: "'Architects Daughter', cursive" }}>
        Worked with &amp; at
      </p>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingRight: '20px', width: 'max-content' }}
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        >
          {[...triple, ...triple].map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', padding: '8px 20px', borderRadius: '100px', background: 'rgba(245,239,231,0.85)', border: '1.5px solid rgba(84,79,71,0.10)', flexShrink: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#544f47' }}>{l.name}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e75d0b', display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: '#a89f95' }}>{l.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
