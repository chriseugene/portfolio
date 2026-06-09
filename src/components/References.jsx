/* ─────────────────────────────────────────────────────────
   References — draggable sticky-note testimonials
   Matches harinisk.com's "Some notes from collaborators"
───────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'

const notes = [
  {
    name: 'Nikhil Yadav',
    role: 'Technology & Graduate Asst',
    dept: 'Saint Louis University',
    context: 'SharePoint project',
    quote: '"Chris was one of the most dependable people I\'ve had the pleasure of working with. He consistently delivered quality work on time and communicated proactively at every stage. His analytical thinking and attention to detail produced solutions that went beyond the immediate requirement."',
    bg: '#fde68a',
    tape: '#e75d0b',
    rotate: -3,
  },
  {
    name: 'Prof. Huliyar Mallikarjuna',
    role: 'Adjunct Faculty, ECE Dept',
    dept: 'Saint Louis University',
    context: 'Power Systems & TA',
    quote: '"It is rare to see someone excel as both a learner and an educator — Chris did so with confidence and maturity. As a TA he took full ownership of his responsibilities and was always willing to spend extra time ensuring every student grasped the material."',
    bg: '#fff8e7',
    tape: '#3b82f6',
    rotate: 2.2,
  },
  {
    name: 'Prof. John C. James',
    role: 'Asst. Professor, Physics',
    dept: 'Saint Louis University',
    context: 'College Physics TA',
    quote: '"He had a calm, encouraging presence that made the lab environment feel approachable even for those who found physics challenging. Chris managed two laboratory sections with a level of professionalism that is hard to find."',
    bg: '#f5d5c0',
    tape: '#e75d0b',
    rotate: -1.5,
  },
  {
    name: 'Prof. Irma Kuljanishvili',
    role: 'Associate Professor, Physics',
    dept: 'Saint Louis University',
    context: 'Nanoscience & Material Fabrication',
    quote: '"Chris demonstrated a genuine curiosity for nanoscale science that stood out immediately. He approached every concept with rigour and asked questions that pushed class discussions to a deeper level. It was a pleasure to have him in my course."',
    bg: '#e8e4f5',
    tape: '#7c3aed',
    rotate: -2.4,
  },
  {
    name: 'Prof. Vahan Huroyan',
    role: 'Asst. Professor, Mathematics',
    dept: 'Saint Louis University',
    context: 'Machine Learning mentor',
    quote: '"Chris brings a level of rigor and genuine enthusiasm to technical work that I believe will take him far. He consistently asked the right questions and never settled for a shallow understanding — he wanted to grasp the underlying mathematics."',
    bg: '#d8eedf',
    tape: '#517d64',
    rotate: 1.8,
  },
]

export default function References() {
  return (
    <section id="references" style={{ background: '#f0ebe3', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <p style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textAlign: 'center', fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          References
        </p>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 40px)', textTransform: 'uppercase', color: '#544f47', marginBottom: '12px', letterSpacing: '-0.01em' }}>
          Some notes from{' '}
          <span style={{ fontFamily: "'Architects Daughter', cursive", color: '#e75d0b', textTransform: 'lowercase', fontWeight: 400 }}>
            collaborators &amp; mentors
          </span>
        </h2>
        <p style={{ textAlign: 'center', fontFamily: "'Architects Daughter', cursive", color: '#b0a99e', fontSize: '14px', marginBottom: '56px' }}>
          drag the cards around ✋
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', padding: '20px 0' }}>
          {notes.map((note, i) => (
            <motion.div
              key={i}
              drag
              dragMomentum={false}
              dragElastic={0.05}
              whileDrag={{ scale: 1.06, zIndex: 20, cursor: 'grabbing', rotate: 0 }}
              style={{
                background: note.bg,
                borderRadius: '3px',
                padding: '24px 20px 24px',
                width: '290px',
                boxShadow: '4px 10px 28px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
                rotate: note.rotate,
                cursor: 'grab',
                position: 'relative',
                zIndex: 1,
                userSelect: 'none',
                flexShrink: 0,
              }}
              initial={{ opacity: 0, y: 32, rotate: note.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: note.rotate }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.10, duration: 0.5 }}
              whileHover={{ zIndex: 10, scale: 1.02, transition: { duration: 0.18 } }}
            >
              {/* Tape strip */}
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                width: '52px', height: '20px', borderRadius: '3px',
                background: note.tape + '55',
                border: `1px solid ${note.tape}28`,
              }} />

              {/* Quote */}
              <p style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '13px', color: '#544f47', lineHeight: 1.72, marginBottom: '16px', marginTop: '6px' }}>
                {note.quote}
              </p>

              {/* Person */}
              <div style={{ borderTop: '1px solid rgba(84,79,71,0.12)', paddingTop: '12px' }}>
                <p style={{ fontWeight: 800, fontSize: '13px', color: '#544f47', margin: 0 }}>{note.name}</p>
                <p style={{ fontSize: '11px', color: '#7d776e', marginTop: '2px' }}>{note.role}</p>
                <p style={{ fontSize: '11px', color: '#a89f95', marginTop: '1px' }}>{note.dept}</p>
                <p style={{ fontSize: '10px', color: note.tape, marginTop: '5px', fontFamily: "'Architects Daughter', cursive" }}>
                  {note.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
