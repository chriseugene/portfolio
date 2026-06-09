import { useState, useRef, useEffect, useCallback } from 'react'

const SLIDES = [
  { type: 'stat',  value: '3.90', sub: '/ 4.0', label: 'Graduate GPA',   desc: 'Saint Louis University M.S. ECE', color: 'orange'  },
  { type: 'stat',  value: '2',    sub: '',       label: 'Degrees Earned', desc: 'B.S. EEE + M.S. ECE',            color: 'blue'    },
  { type: 'bio',   color: 'slate'   },
  { type: 'research', color: 'purple' },
  { type: 'stat',  value: '4+',   sub: '',       label: 'Roles Held',     desc: 'Academic · Industry · Research',  color: 'green'   },
  { type: 'teaching', color: 'orange' },
  { type: 'grad',  color: 'green'   },
  { type: 'stat',  value: 'STL',  sub: '',       label: 'St. Louis, MO',  desc: 'Open to relocate',                color: 'blue'    },
]

const N            = SLIDES.length
const AUTO_INTERVAL = 4000

const borderMap = {
  orange: 'border-[#e75d0b]/35',
  blue:   'border-blue-400/35',
  purple: 'border-purple-400/35',
  green:  'border-[#517d64]/35',
  slate:  'border-[#68635a]/25',
}
const valueColor = {
  orange: '#e75d0b',
  blue:   '#3b82f6',
  purple: '#7c3aed',
  green:  '#517d64',
  slate:  '#544f47',
}
const dotBg = {
  orange: 'bg-[#e75d0b]',
  blue:   'bg-blue-400',
  purple: 'bg-purple-400',
  green:  'bg-[#517d64]',
  slate:  'bg-[#68635a]',
}

export default function About() {
  const [current, setCurrent] = useState({ idx: 0, key: 0, dir: 'none' })
  const pointerStart = useRef(null)
  const timerRef     = useRef(null)

  const advance = useCallback((newIdx, dir) => {
    setCurrent(c => ({ idx: (newIdx + N) % N, key: c.key + 1, dir }))
  }, [])

  const goNext = useCallback(() => {
    setCurrent(c => ({ idx: (c.idx + 1) % N, key: c.key + 1, dir: 'left' }))
  }, [])

  const goPrev = useCallback(() => {
    setCurrent(c => ({ idx: (c.idx - 1 + N) % N, key: c.key + 1, dir: 'right' }))
  }, [])

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(goNext, AUTO_INTERVAL)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  function onPointerDown(e) {
    pointerStart.current = e.clientX ?? e.touches?.[0]?.clientX
  }
  function onPointerUp(e) {
    if (pointerStart.current === null) return
    const x  = e.clientX ?? e.changedTouches?.[0]?.clientX
    const dx = x - pointerStart.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? goNext() : goPrev()
      resetTimer()
    }
    pointerStart.current = null
  }

  const slide     = SLIDES[current.idx]
  const animClass = current.dir === 'left'  ? 'anim-from-right'
                  : current.dir === 'right' ? 'anim-from-left'
                  : ''

  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden min-h-[540px] flex flex-col justify-center"
      style={{ background: '#faf6f1' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <p
          className="text-xs tracking-[0.3em] uppercase text-center mb-3 font-semibold"
          style={{ color: '#e75d0b', fontFamily: "'Architects Daughter', cursive" }}
        >
          About
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ color: '#544f47' }}
        >
          Who I Am
        </h2>

        <div
          className="flex items-center justify-center gap-6 select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
        >
          {/* Prev ghost */}
          <div
            className="hidden md:flex w-44 h-44 rounded-xl items-center justify-center opacity-30 scale-90 cursor-pointer shrink-0 border"
            style={{ background: 'rgba(245,239,231,0.6)', borderColor: 'rgba(84,79,71,0.10)' }}
            onClick={() => { goPrev(); resetTimer() }}
          >
            <GhostCard slide={SLIDES[(current.idx - 1 + N) % N]} />
          </div>

          {/* Active card */}
          <div
            key={current.key}
            className={`w-64 h-64 md:w-72 md:h-72 rounded-2xl border flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing shrink-0 ${borderMap[slide.color]} ${animClass}`}
            style={{ background: '#ffffff', boxShadow: '0 8px 40px rgba(84,79,71,0.10)' }}
          >
            <SlideContent slide={slide} />
          </div>

          {/* Next ghost */}
          <div
            className="hidden md:flex w-44 h-44 rounded-xl items-center justify-center opacity-30 scale-90 cursor-pointer shrink-0 border"
            style={{ background: 'rgba(245,239,231,0.6)', borderColor: 'rgba(84,79,71,0.10)' }}
            onClick={() => { goNext(); resetTimer() }}
          >
            <GhostCard slide={SLIDES[(current.idx + 1) % N]} />
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => { advance(i, i > current.idx ? 'left' : 'right'); resetTimer() }}
              className={`transition-all duration-300 rounded-full ${
                i === current.idx
                  ? `w-6 h-2 ${dotBg[s.color]}`
                  : 'w-2 h-2 bg-[#d4cfc9] hover:bg-[#a89f95]'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-xs mt-3 tracking-widest" style={{ color: '#c4bfba' }}>
          auto-advances · swipe or tap to navigate
        </p>
      </div>
    </section>
  )
}

function SlideContent({ slide }) {
  if (slide.type === 'bio') {
    return (
      <div className="text-center space-y-3">
        <p className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#e75d0b' }}>Summary</p>
        <p className="text-xs leading-relaxed" style={{ color: '#68635a' }}>
          M.S. ECE graduate specializing in{' '}
          <span style={{ color: '#e75d0b', fontWeight: 600 }}>quantum engineering</span>,{' '}
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>nanomaterials</span>, and{' '}
          <span style={{ color: '#7c3aed', fontWeight: 600 }}>deep learning</span>.
        </p>
        <p className="text-xs leading-relaxed" style={{ color: '#a89f95' }}>
          Cross-functional experience across research, instruction, QA, and IT.
        </p>
        <a
          href="#resume"
          className="inline-flex items-center gap-1 text-xs mt-1 transition-colors hover:opacity-70"
          style={{ color: '#e75d0b' }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
          </svg>
          View Resume
        </a>
      </div>
    )
  }

  if (slide.type === 'research') {
    return (
      <div className="text-center space-y-3">
        <p className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#7c3aed' }}>Research Focus</p>
        <div className="flex flex-col gap-2 mt-1">
          {['Quantum Mechanics & QIS', 'Nanomaterial Fabrication', 'Deep Learning & CV', 'Energy Systems'].map(r => (
            <span
              key={r}
              className="px-3 py-1 rounded-full text-xs"
              style={{ background: 'rgba(139,92,246,0.08)', color: '#7c3aed', border: '1px solid rgba(139,92,246,0.20)' }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (slide.type === 'teaching') {
    return (
      <div className="text-center space-y-2">
        <p className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#e75d0b' }}>Teaching</p>
        <p className="text-sm font-bold mt-1" style={{ color: '#544f47' }}>2× TA at SLU</p>
        <p className="text-xs" style={{ color: '#68635a' }}>College Physics</p>
        <p className="text-xs" style={{ color: '#68635a' }}>Energy Conversions</p>
        <p className="text-xs mt-2" style={{ color: '#a89f95' }}>Aug 2025 – May 2026</p>
      </div>
    )
  }

  if (slide.type === 'grad') {
    return (
      <div className="text-center space-y-2">
        <p className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#517d64' }}>Status</p>
        <p className="text-2xl font-bold" style={{ color: '#544f47' }}>May 2026</p>
        <p className="text-xs" style={{ color: '#68635a' }}>M.S. ECE Graduate</p>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: '#a89f95' }}>
          Seeking engineering, research &amp; teaching roles
        </p>
        <span
          className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(81,125,100,0.10)', border: '1px solid rgba(81,125,100,0.25)', color: '#517d64' }}
        >
          Open to Opportunities
        </span>
      </div>
    )
  }

  // stat
  return (
    <div className="text-center space-y-2">
      <div className="text-5xl md:text-6xl font-bold leading-none" style={{ color: valueColor[slide.color] }}>
        {slide.value}
        {slide.sub && <span className="text-2xl ml-1" style={{ color: '#c4bfba' }}>{slide.sub}</span>}
      </div>
      <div className="font-bold text-sm tracking-wider mt-3" style={{ color: '#544f47' }}>{slide.label}</div>
      <div className="text-xs leading-relaxed max-w-[180px]" style={{ color: '#a89f95' }}>{slide.desc}</div>
    </div>
  )
}

function GhostCard({ slide }) {
  if (slide.type === 'bio')      return <span className="text-xs" style={{ color: '#c4bfba' }}>Bio</span>
  if (slide.type === 'research') return <span className="text-xs" style={{ color: '#c4bfba' }}>Research</span>
  if (slide.type === 'teaching') return <span className="text-xs" style={{ color: '#c4bfba' }}>Teaching</span>
  if (slide.type === 'grad')     return <span className="text-xs" style={{ color: '#c4bfba' }}>May 2026</span>
  return (
    <div className="text-center">
      <div className="text-xl font-bold opacity-50" style={{ color: valueColor[slide.color] }}>{slide.value}</div>
      <div className="text-xs mt-1" style={{ color: '#c4bfba' }}>{slide.label}</div>
    </div>
  )
}
