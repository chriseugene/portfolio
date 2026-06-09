/* ─────────────────────────────────────────────────────────
   Skills — click a category to expand its skills
───────────────────────────────────────────────────────── */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const rickQuotes = [
  "*burp* Wubba lubba dub dub! Nice skills, Morty!",
  "I turned myself into a pickle once. Still got a 3.90 GPA.",
  "*burp* ECE? In infinite universes only YOU chose the hardest one.",
  "I've got a PhD in all of these... plus 12 more dimensions.",
  "Nobody exists on purpose, Morty. But these skills do. 🧪",
]

function RickSanchez() {
  const [visible, setVisible] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  // Slide Rick up shortly after the component mounts (i.e. section is in DOM)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(t)
  }, [])

  function nextQuote() {
    setQuoteIdx(i => (i + 1) % rickQuotes.length)
  }

  return (
    <div style={{ position: 'fixed', bottom: 0, right: '40px', zIndex: 1000, pointerEvents: 'none' }}>
      <AnimatePresence>
        {visible && !dismissed && (
          <motion.div
            initial={{ y: 220 }}
            animate={{ y: 0 }}
            exit={{ y: 220 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}
          >
            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.3, type: 'spring', stiffness: 200, damping: 18 }}
              onClick={nextQuote}
              style={{
                background: '#fff',
                border: '2px solid #544f47',
                borderRadius: '14px',
                padding: '10px 14px',
                maxWidth: '210px',
                position: 'relative',
                marginBottom: '8px',
                cursor: 'pointer',
                boxShadow: '3px 4px 0px rgba(84,79,71,0.25)',
              }}
            >
              {/* Dismiss × */}
              <button
                onClick={e => { e.stopPropagation(); setDismissed(true) }}
                style={{ position: 'absolute', top: '4px', right: '7px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#a89f95', lineHeight: 1 }}
              >✕</button>

              <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '12px', color: '#544f47', margin: 0, lineHeight: 1.55, paddingRight: '12px' }}>
                {rickQuotes[quoteIdx]}
              </p>
              <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '9px', color: '#b0a99e', margin: '6px 0 0', textAlign: 'right' }}>
                tap for more →
              </p>

              {/* Bubble tail */}
              <div style={{
                position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent',
                borderTop: '10px solid #544f47',
              }} />
              <div style={{
                position: 'absolute', bottom: '-7px', left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: '8px solid #fff',
              }} />
            </motion.div>

            {/* Real Rick PNG */}
            <img
              src="/rick.png"
              alt="Rick Sanchez"
              style={{ width: '130px', display: 'block', filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.25))' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  )
}

const categories = [
  {
    id: 'hardware',
    label: 'ECE Core & Hardware',
    emoji: '⚡',
    color: '#e75d0b',
    bg: 'rgba(231,93,11,0.07)',
    border: 'rgba(231,93,11,0.22)',
    skills: [
      'Power Systems Analysis I & II', 'Power Electronics',
      'Transformer Design (CT/VT)',     'Protection Relays & AVR',
      'SCADA & Relay Logic',           'Embedded Systems & Microcontrollers',
      'Control Systems',               'Filter Design & Signal Processing',
      'VLSI & Digital Circuit Design', 'LTSpice / Multisim',
      'Arduino & Raspberry Pi',        'FPGA (Xilinx)',
      'Oscilloscopes & Signal Generators', 'CAD',
    ],
  },
  {
    id: 'software',
    label: 'Software & AI/ML',
    emoji: '🧠',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.07)',
    border: 'rgba(59,130,246,0.22)',
    skills: [
      'Python',              'TypeScript',
      'C / C++',             'SQL',
      'TensorFlow',          'PyTorch',
      'scikit-learn',        'NumPy / Pandas / OpenCV',
      'LLMs (GPT, BERT)',    'GANs / VAEs / Diffusion',
      'LangChain',           'Hugging Face',
      'OpenAI API',          'RAG Pipelines',
      'Azure AI / AWS',      'Git / GitHub',
      'MATLAB / Simulink',   'Linux',
    ],
  },
  {
    id: 'nanofab',
    label: 'Nanofabrication & Materials',
    emoji: '🔬',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.22)',
    skills: [
      'CVD Thin Film Growth (MoS₂/Graphene)', 'AFM Direct-Write Patterning',
      'Thermal Evaporation',                   'Magnetron Sputtering',
      'PMMA-Assisted Wet Transfer',            'Photolithographic Contact Patterning',
      'Raman Spectroscopy',                    'SEM Characterization',
      'AFM Characterization',                  'UV-Vis Spectroscopy',
      'Photoluminescence (PL) Spectroscopy',   '2D Material Heterostructures',
    ],
  },
  {
    id: 'professional',
    label: 'Professional & Standards',
    emoji: '🤝',
    color: '#517d64',
    bg: 'rgba(81,125,100,0.07)',
    border: 'rgba(81,125,100,0.22)',
    skills: [
      'ISO 9001 & ISO 17100',          'Root Cause Analysis & CAPA',
      'Technical Documentation',       'Curriculum & Lesson Design',
      'Cross-functional Leadership',   'Process Improvement',
      'Compliance Management',         'TCP / IP & LAN / WAN',
      'EtherNet/IP · PROFIBUS · PROFINET', 'SharePoint / MS Office Suite',
      'Tableau / Power BI',            'Agile / Scrum',
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState(null)

  function toggle(id) {
    setActive(prev => prev === id ? null : id)
  }

  return (
    <section id="skills" style={{ background: '#faf6f1', padding: '80px 24px', position: 'relative' }}>
      <RickSanchez />
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textAlign: 'center', fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Skills
        </p>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', textTransform: 'uppercase', color: '#544f47', marginBottom: '12px', letterSpacing: '-0.01em' }}>
          Technical Toolkit
        </h2>
        <p style={{ textAlign: 'center', fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '13px', marginBottom: '48px' }}>
          click a category to expand ↓
        </p>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {categories.map((cat) => {
            const isOpen = active === cat.id
            return (
              <motion.div
                key={cat.id}
                layout
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: `1.5px solid ${isOpen ? cat.color + '55' : 'rgba(84,79,71,0.10)'}`,
                  boxShadow: isOpen ? `0 8px 28px ${cat.color}15` : '0 2px 12px rgba(84,79,71,0.05)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
              >
                {/* Category header — always visible */}
                <motion.button
                  onClick={() => toggle(cat.id)}
                  whileHover={{ backgroundColor: isOpen ? 'transparent' : 'rgba(84,79,71,0.02)' }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '14px', padding: '18px 22px',
                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  {/* Icon bubble */}
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                    background: cat.bg, border: `1px solid ${cat.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                  }}>
                    {cat.emoji}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: isOpen ? cat.color : '#544f47' }}>
                      {cat.label}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#b0a99e' }}>
                      {cat.skills.length} skills
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: cat.color, fontSize: '16px', opacity: 0.7, flexShrink: 0 }}
                  >
                    ↓
                  </motion.span>
                </motion.button>

                {/* Skill chips — expand/collapse */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="chips"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '4px 22px 22px', borderTop: `1px solid ${cat.color}18` }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '14px' }}>
                          {cat.skills.map((skill, i) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.04, duration: 0.22 }}
                              style={{
                                padding: '5px 14px', borderRadius: '20px',
                                fontSize: '12px', fontWeight: 600,
                                color: cat.color,
                                background: cat.bg,
                                border: `1px solid ${cat.border}`,
                                display: 'inline-block',
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
