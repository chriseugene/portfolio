/* ─────────────────────────────────────────────────────────
   Experience — interactive accordion timeline
   All roles visible; click any card to expand bullet points
───────────────────────────────────────────────────────── */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    title: 'Teaching Assistant — Energy Conversions',
    org: 'Saint Louis University', location: 'St. Louis, MO',
    period: 'Jan 2026 – May 2026', type: 'academic',
    icon: '⚡',
    bullets: [
      { x: 'Boosted average assignment scores by ~18%', y: 'across 35+ students', z: 'by designing targeted problem sets covering thermal, electrical, and mechanical energy conversion.' },
      { x: 'Cut student question-resolution time by 30%', y: 'per office-hour session', z: 'by introducing structured pre-session prep guides and tiered difficulty drills.' },
      { x: 'Achieved 100% on-time grade reporting', y: 'across 3 assessment cycles', z: 'by implementing a standardised rubric system aligned with course learning objectives.' },
    ],
  },
  {
    title: 'Teaching Assistant — College Physics',
    org: 'Saint Louis University', location: 'St. Louis, MO',
    period: 'Aug 2025 – May 2026', type: 'academic',
    icon: '🎓',
    bullets: [
      { x: 'Delivered 2× weekly lab sessions to 50+ undergraduates', y: 'maintaining a 4.8 / 5.0 lab satisfaction score', z: 'across mechanics, electricity, and optics modules.' },
      { x: 'Cut grading turnaround by 35%', y: 'for 200+ lab reports per semester', z: 'by building a structured feedback template with inline annotation standards.' },
      { x: 'Enabled proactive intervention for 15 at-risk students', y: 'each semester', z: 'by compiling and sharing bi-weekly performance summaries with the lead instructor.' },
    ],
  },
  {
    title: 'Quality Assurance Specialist',
    org: 'TransPerfect', location: 'Chennai, India',
    period: 'Oct 2023 – Jul 2024', type: 'industry',
    icon: '🌐',
    bullets: [
      { x: 'Maintained 98% audit pass rate', y: 'across ISO 9001 & ISO 17100 compliance checks', z: 'by establishing weekly QA review cycles for 3 global project teams.' },
      { x: 'Reduced new-hire ramp-up time by 25%', y: 'across 10+ onboarded team members', z: 'by designing a structured training curriculum with role-specific competency milestones.' },
      { x: 'Reduced repeat client complaints to near zero', y: 'within 48-hour resolution windows', z: 'by conducting root cause analysis and deploying targeted CAPA plans.' },
      { x: 'Ran weekly 1-on-1 training & feedback sessions', y: 'for underperforming team members', z: 'identifying skill gaps early and tailoring improvement plans that brought 100% of flagged staff back to target KPIs within 4 weeks.' },
      { x: 'Improved project delivery accuracy by 20%', y: 'across cross-functional workflows', z: 'by partnering with vendor management to standardise quality control processes.' },
      { x: 'Collaborated across 8+ simultaneous projects', y: 'spanning national & international teams', z: 'coordinating with stakeholders across time zones to align quality standards, timelines, and deliverables.' },
    ],
  },
  {
    title: 'Networking & IT Support Engineering Intern',
    org: 'Mercedes-Benz Titanium Motors', location: 'Chennai, India',
    period: 'Aug 2023 – Oct 2023', type: 'industry',
    icon: '🚗',
    bullets: [
      { x: 'Reduced average system downtime by 40%', y: 'across 3 dealership departments', z: 'by diagnosing and resolving 20+ network and hardware incidents within a 2-hour SLA.' },
      { x: 'Decreased technical escalations by 35%', y: 'among 15+ non-technical staff members', z: 'by translating complex IT issues into clear, step-by-step action plans.' },
      { x: 'Improved incident resolution speed by 50%', y: 'cutting repeat diagnosis time from 45 min to under 20 min', z: 'by building a structured knowledge base of 30+ documented cases.' },
    ],
  },
]

const accent = {
  academic: { color: '#e75d0b', bg: 'rgba(231,93,11,0.07)', border: 'rgba(231,93,11,0.20)', dot: 'rgba(231,93,11,0.15)' },
  industry:  { color: '#517d64', bg: 'rgba(81,125,100,0.07)', border: 'rgba(81,125,100,0.22)', dot: 'rgba(81,125,100,0.15)' },
}

export default function Experience() {
  const [open, setOpen] = useState(null)   // title of the open card, or null

  function toggle(title) {
    setOpen(prev => prev === title ? null : title)
  }

  return (
    <section id="experience" style={{ background: '#f0ebe3', padding: '80px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textAlign: 'center', fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Experience
        </p>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', textTransform: 'uppercase', color: '#544f47', marginBottom: '12px', letterSpacing: '-0.01em' }}>
          Professional Experience
        </h2>
        <p style={{ textAlign: 'center', fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '13px', marginBottom: '48px' }}>
          click any role to expand ↓
        </p>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '19px', top: '8px', bottom: '8px', width: '2px',
            background: 'linear-gradient(to bottom, rgba(231,93,11,0.25) 0%, rgba(81,125,100,0.25) 100%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experiences.map((exp) => {
              const a = accent[exp.type]
              const isOpen = open === exp.title

              return (
                <div key={exp.title} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

                  {/* Timeline node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '20px', zIndex: 1 }}>
                    <motion.div
                      animate={{
                        scale: isOpen ? 1.35 : 1,
                        background: isOpen ? a.color : a.dot,
                        boxShadow: isOpen ? `0 0 0 4px ${a.color}22` : 'none',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      style={{ width: '14px', height: '14px', borderRadius: '50%', border: `2px solid ${a.color}` }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    layout
                    onClick={() => toggle(exp.title)}
                    style={{
                      flex: 1, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                      background: '#ffffff',
                      border: `1.5px solid ${isOpen ? a.color + '55' : 'rgba(84,79,71,0.10)'}`,
                      boxShadow: isOpen ? `0 8px 28px ${a.color}18` : '0 2px 12px rgba(84,79,71,0.06)',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    whileHover={{ y: isOpen ? 0 : -2 }}
                    transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    {/* Card header — always visible */}
                    <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                        {/* Icon */}
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: a.bg, border: `1px solid ${a.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                          {exp.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#544f47', lineHeight: 1.3, margin: 0 }}>
                            {exp.title}
                          </h3>
                          <p style={{ fontSize: '12px', color: '#7d776e', marginTop: '3px' }}>
                            {exp.org} <span style={{ color: '#c4bfba' }}>·</span> {exp.location}
                          </p>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '7px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '10px', padding: '2px 9px', borderRadius: '20px', fontWeight: 600, background: a.bg, color: a.color, border: `1px solid ${a.border}` }}>
                              {exp.period}
                            </span>
                            <span style={{ fontSize: '10px', padding: '2px 9px', borderRadius: '20px', fontWeight: 600, background: 'rgba(84,79,71,0.05)', color: '#a89f95', border: '1px solid rgba(84,79,71,0.10)', textTransform: 'capitalize' }}>
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Chevron */}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ color: a.color, flexShrink: 0, marginTop: '10px', fontSize: '16px', opacity: 0.7 }}
                      >
                        ↓
                      </motion.div>
                    </div>

                    {/* Expanded bullet points */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="bullets"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '4px 20px 20px 20px', borderTop: `1px solid ${a.color}20` }}>
                            {exp.bullets.map((b, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08, duration: 0.3 }}
                                style={{ display: 'flex', gap: '10px', marginTop: '14px' }}
                              >
                                {/* Accent dot */}
                                <div style={{ flexShrink: 0, marginTop: '5px', width: '6px', height: '6px', borderRadius: '50%', background: a.color }} />

                                <div style={{ flex: 1 }}>
                                  {/* X — the accomplishment / result (bold + accent) */}
                                  <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: 700, color: '#3a3530', lineHeight: 1.4 }}>
                                    {b.x}
                                  </p>
                                  {/* Y — the metric / scale (small chip) */}
                                  <span style={{
                                    display: 'inline-block', marginBottom: '4px',
                                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.02em',
                                    padding: '2px 8px', borderRadius: '20px',
                                    background: a.bg, color: a.color, border: `1px solid ${a.border}`,
                                  }}>
                                    📊 {b.y}
                                  </span>
                                  {/* Z — how it was done (muted body) */}
                                  <p style={{ margin: 0, fontSize: '12px', color: '#7d776e', lineHeight: 1.6 }}>
                                    {b.z}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
