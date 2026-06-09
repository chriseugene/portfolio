/* ─────────────────────────────────────────────────────────
   ProcessSection — 4 notebook-paper sticky note cards
   Matches harinisk.com's process/approach section
───────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Research & Analysis',
    description: 'Deep dive into the problem space. Literature review, constraint analysis, and clear requirements before touching any code or circuit.',
    bg: '#f5d5c0',
    lineColor: 'rgba(180,90,20,0.11)',
    numColor: '#e75d0b',
    rotate: -1.8,
  },
  {
    num: '02',
    title: 'Design & Planning',
    description: 'System architecture, project scoping, and clear milestones. I draw block diagrams, write specs, and prototype before committing to a build.',
    bg: '#faf6f1',
    lineColor: 'rgba(84,79,71,0.08)',
    numColor: '#7d776e',
    rotate: 1.4,
  },
  {
    num: '03',
    title: 'Build & Implement',
    description: 'Hands-on development with clean, well-commented code. Iterative testing at every stage. Real, measurable results over theoretical elegance.',
    bg: '#f5f0c8',
    lineColor: 'rgba(180,160,0,0.10)',
    numColor: '#a08a00',
    rotate: -0.9,
  },
  {
    num: '04',
    title: 'Test & Document',
    description: 'Thorough validation, performance benchmarking, and comprehensive documentation — so the work endures and others can build on top of it.',
    bg: '#d8eedf',
    lineColor: 'rgba(81,125,100,0.11)',
    numColor: '#517d64',
    rotate: 1.6,
  },
]

export default function ProcessSection() {
  return (
    <section id="process" style={{ background: '#faf6f1', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textAlign: 'center', fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          How I work
        </p>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 44px)', textTransform: 'uppercase', color: '#544f47', marginBottom: '56px', letterSpacing: '-0.01em' }}>
          My Process
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: step.bg,
                borderRadius: '4px',
                padding: '28px 24px 28px 36px',
                boxShadow: '4px 10px 30px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
                transform: `rotate(${step.rotate}deg)`,
                /* notebook ruled lines */
                backgroundImage: `repeating-linear-gradient(
                  transparent, transparent 27px,
                  ${step.lineColor} 27px, ${step.lineColor} 28px
                )`,
                backgroundPositionY: '56px',
              }}
            >
              {/* Red margin line */}
              <div style={{ position: 'absolute', left: '56px', top: 0, bottom: 0, width: '1.5px', background: 'rgba(231,93,11,0.18)' }} />

              {/* Hole punch */}
              <div style={{ position: 'absolute', left: '-8px', top: '38px', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(0,0,0,0.08)' }} />

              <div style={{ position: 'relative' }}>
                <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '42px', color: step.numColor, marginBottom: '10px', lineHeight: 1 }}>
                  {step.num}
                </p>
                <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#544f47', marginBottom: '10px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#68635a', lineHeight: 1.68, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
