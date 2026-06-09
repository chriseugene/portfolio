/* ─────────────────────────────────────────────────────────
   WorkSection — macOS Finder with folder-open interaction
   Click a folder → it opens and fills the pane with details
───────────────────────────────────────────────────────── */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'engineering', label: 'Engineering', icon: '⚡' },
  { id: 'research',    label: 'Research',    icon: '🔬' },
  { id: 'software',    label: 'Software',    icon: '🧠' },
]

const files = {
  engineering: [
    {
      emoji: '⚡', name: 'Automated Energy-Saving System', type: 'Embedded', color: '#3b82f6',
      school: "St. Joseph's College of Engineering",
      desc: 'Designed and prototyped an automated energy management system with sequential response control logic. Presented findings to a faculty review panel with clear oral and written communication of complex technical content.',
      tags: ['Energy Systems', 'Embedded Systems', 'Automation', 'Control Logic'],
    },
    {
      emoji: '💧', name: 'Micro Hydro-Electric — Blue Nile', type: 'Team Project', color: '#517d64',
      school: 'Saint Louis University',
      desc: 'Full engineering design for an 82.87 kW run-of-river micro hydro system serving 477 homes in rural Ethiopia. Covers Pelton turbine design, Darcy-Weisbach penstock analysis, water hammer, financial modelling (NPV, tariff), and environmental impact — 335 t CO₂/yr saved.',
      tags: ['Power Engineering', 'Hydraulics', 'Pelton Turbine', 'Financial Analysis', 'Sustainability'],
      coauthors: 'Hamza · Chris · Alexis',
    },
    {
      emoji: '📡', name: 'Laser LiFi with Automatic Beam Steering', type: 'Team Research', color: '#0ea5e9',
      school: 'SLU — CSCI 5550, Fall 2025',
      desc: 'Investigated laser-based Li-Fi as an alternative to LED optical wireless communication. Built a Python/Pygame simulation featuring a fixed laser transmitter, movable receiver, and intelligent beam splitter that automatically repositions to redirect the beam when line-of-sight is broken.',
      tags: ['LiFi', 'Optical Laser', 'Python', 'Pygame', 'OOK', 'Beam Steering'],
      coauthors: 'Roemen Edwards · Scott Selke · Chris Eugene',
    },
  ],
  research: [
    {
      emoji: '🔮', name: 'Graphene / MoS₂ Heterostructure', type: 'Lab Research', color: '#7c3aed',
      school: 'SLU — ECE 5930',
      desc: 'Fabricated high-crystalline MoS₂ on graphene/SiO₂ substrates using mask-free direct-write patterning and CVD. Preliminary Raman spectroscopy confirmed few-layer MoS₂ formation; SEM revealed well-defined triangular crystalline domains consistent with high-quality TMDC growth.',
      tags: ['CVD', 'Raman Spectroscopy', 'SEM', 'MoS₂', 'Solar Energy', '2D Materials'],
      coauthors: 'Faisal Wahabu · Kelly Shau · Chris Eugene',
    },
    {
      emoji: '🔬', name: 'Plasmon-Enhanced Graphene/MoS₂/Ag Photodetector', type: 'Research Proposal', color: '#7c3aed',
      school: 'Saint Louis University',
      desc: 'Research proposal investigating a plasmon-enhanced vertical heterostructure for high-performance photodetection. Silver nanostructures provide plasmonic field enhancement; graphene enables rapid carrier transport from the MoS₂ photoactive layer for enhanced solar spectrum utilization.',
      tags: ['Nanomaterials', 'Graphene', 'MoS₂', 'Plasmonics', 'Optoelectronics'],
      coauthors: 'Faisal Wahabu · Kelly Shau · Chris Eugene',
    },
  ],
  software: [
    {
      emoji: '🧠', name: 'Object Localization — Deep Learning', type: 'ML / AI', color: '#e75d0b',
      school: 'Saint Louis University',
      desc: 'Led an end-to-end AI project from requirements definition through deployment. Designed, implemented, and validated a functional object localization system using Python, TensorFlow, and OpenCV, demonstrating strong project planning and technical execution.',
      tags: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Computer Vision'],
    },
  ],
}

const typeColor = {
  'Embedded':           '#3b82f6',
  'Team Project':       '#517d64',
  'Team Research':      '#0ea5e9',
  'Lab Research':       '#7c3aed',
  'Research Proposal':  '#7c3aed',
  'ML / AI':            '#e75d0b',
}

/* ══════════════════════════════════════════════════════ */
export default function WorkSection() {
  const [active,   setActive]   = useState('engineering')
  const [opened,   setOpened]   = useState(null)   // currently open project

  function switchCategory(id) {
    setActive(id)
    setOpened(null)
  }

  const tc = opened ? (typeColor[opened.type] ?? '#68635a') : '#e75d0b'

  return (
    <section id="work" style={{ background: '#f0ebe3', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textAlign: 'center', fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Work
        </p>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 44px)', textTransform: 'uppercase', color: '#544f47', marginBottom: '48px', letterSpacing: '-0.01em' }}>
          Academic &amp; Research Projects
        </h2>

        {/* macOS window */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(84,79,71,0.16)', border: '1.5px solid rgba(84,79,71,0.12)' }}>

          {/* Title bar — shows breadcrumb when folder is open */}
          <div style={{ background: '#e8e2da', borderBottom: '1.5px solid rgba(84,79,71,0.12)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e', display: 'block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840', display: 'block' }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#7d776e', fontWeight: 600 }}>
              <span>Chris Eugene</span>
              {opened && (
                <>
                  <span style={{ opacity: 0.4 }}>/</span>
                  <span style={{ opacity: 0.6 }}>{categories.find(c => c.id === active)?.label}</span>
                  <span style={{ opacity: 0.4 }}>/</span>
                  <span style={{ color: tc }}>{opened.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Finder body */}
          <div style={{ display: 'flex', minHeight: '420px', background: '#faf6f1' }}>

            {/* Sidebar */}
            <div style={{ width: '176px', borderRight: '1.5px solid rgba(84,79,71,0.10)', padding: '16px 12px', background: '#f5efe7', flexShrink: 0 }}>
              <p style={{ fontSize: '10px', color: '#c4bfba', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '8px', paddingLeft: '8px' }}>
                Favourites
              </p>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => switchCategory(cat.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    padding: '6px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontSize: '13px', marginBottom: '2px', transition: 'all 0.18s',
                    background: active === cat.id ? 'rgba(231,93,11,0.12)' : 'transparent',
                    color:      active === cat.id ? '#e75d0b' : '#7d776e',
                    fontWeight: active === cat.id ? 700 : 500,
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}

              <p style={{ fontSize: '10px', color: '#c4bfba', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginTop: '16px', marginBottom: '8px', paddingLeft: '8px' }}>
                Explore
              </p>
              <a
                href="https://github.com/chriseugene" target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', color: '#7d776e', textDecoration: 'none', fontSize: '12px', fontWeight: 500, borderRadius: '8px', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(231,93,11,0.07)'; e.currentTarget.style.color = '#e75d0b' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7d776e' }}
              >
                <span>🔗</span><span>View on GitHub</span>
              </a>
            </div>

            {/* Right pane — toggles between grid and open folder */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">

                {/* ── GRID VIEW ── */}
                {!opened && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: '8px', alignContent: 'start' }}
                  >
                    {(files[active] || []).map((f) => (
                      <FolderCard
                        key={f.name}
                        file={f}
                        onOpen={() => setOpened(f)}
                      />
                    ))}
                  </motion.div>
                )}

                {/* ── OPEN FOLDER VIEW ── */}
                {opened && (
                  <motion.div
                    key={opened.name}
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ padding: '28px 32px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {/* Back button */}
                    <button
                      onClick={() => setOpened(null)}
                      style={{
                        alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(84,79,71,0.07)', border: 'none', borderRadius: '8px',
                        padding: '5px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#7d776e',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(84,79,71,0.12)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(84,79,71,0.07)'}
                    >
                      ← Back
                    </button>

                    {/* Folder header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                      {/* Open folder icon */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '64px', height: '54px', borderRadius: '8px', background: `${tc}20`, border: `2px solid ${tc}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                          {/* folder tab */}
                          <div style={{ position: 'absolute', top: '-10px', left: '5px', width: '22px', height: '10px', borderRadius: '4px 4px 0 0', background: `${tc}45` }} />
                          {opened.emoji}
                        </div>
                        {/* "open" indicator — bottom fold */}
                        <div style={{ position: 'absolute', bottom: '-6px', left: '4px', right: '4px', height: '6px', borderRadius: '0 0 6px 6px', background: `${tc}28` }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                          <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '20px', background: `${tc}18`, color: tc, fontWeight: 700, border: `1px solid ${tc}28` }}>
                            {opened.type}
                          </span>
                          <span style={{ fontSize: '11px', color: '#a89f95' }}>{opened.school}</span>
                        </div>
                        <h3 style={{ fontWeight: 800, fontSize: '17px', color: '#544f47', lineHeight: 1.3, margin: 0 }}>
                          {opened.name}
                        </h3>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'rgba(84,79,71,0.10)' }} />

                    {/* Description */}
                    <p style={{ fontSize: '14px', color: '#544f47', lineHeight: 1.78, margin: 0 }}>
                      {opened.desc}
                    </p>

                    {/* Co-authors */}
                    {opened.coauthors && (
                      <p style={{ fontSize: '12px', color: '#a89f95', fontStyle: 'italic', margin: 0 }}>
                        Authors: {opened.coauthors}
                      </p>
                    )}

                    {/* Tags */}
                    {opened.tags?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                        {opened.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(231,93,11,0.07)', color: '#b85a12', border: '1px solid rgba(231,93,11,0.15)', fontWeight: 600 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: '#a89f95' }}>
          Want the full picture?{' '}
          <a href="https://drive.google.com" target="_blank" rel="noreferrer"
            style={{ color: '#e75d0b', fontWeight: 700, textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Download my resume →
          </a>
        </p>
      </div>
    </section>
  )
}

/* ── Folder card in the grid ── */
function FolderCard({ file, onOpen }) {
  const tc = typeColor[file.type] ?? '#68635a'
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.94 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px',
        padding: '16px 10px', borderRadius: '12px', cursor: 'pointer', border: 'none',
        background: hovered ? `${tc}12` : 'transparent',
        width: '100%', transition: 'background 0.15s',
      }}
    >
      {/* Folder icon — tab lifts on hover */}
      <div style={{ position: 'relative', width: '56px', height: '48px' }}>
        {/* Tab */}
        <motion.div
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ position: 'absolute', top: '-9px', left: '5px', width: '20px', height: '9px', borderRadius: '4px 4px 0 0', background: `${tc}50`, transformOrigin: 'bottom left' }}
        />
        {/* Body */}
        <motion.div
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ width: '56px', height: '48px', borderRadius: '7px', background: `${tc}1e`, border: `2px solid ${tc}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}
        >
          {file.emoji}
        </motion.div>
      </div>

      <p style={{ fontSize: '11px', fontWeight: 600, color: '#544f47', textAlign: 'center', lineHeight: 1.3, maxWidth: '124px', margin: 0 }}>
        {file.name}
      </p>
      <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '20px', background: `${tc}18`, color: tc, fontWeight: 600, border: `1px solid ${tc}28` }}>
        {file.type}
      </span>
    </motion.button>
  )
}
