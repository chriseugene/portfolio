const projects = [
  {
    title: 'Object Localization using Deep Learning',
    description:
      'Led an end-to-end AI project from requirements definition through deployment. Designed, implemented, and validated a functional object localization system using Python, TensorFlow, and OpenCV, demonstrating strong project planning and technical execution.',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Computer Vision'],
    school: 'Saint Louis University',
    type: 'ML / AI',
    emoji: '🧠',
  },
  {
    title: 'Automated Energy-Saving System with Sequential Response Control',
    description:
      'Designed and prototyped an automated energy management system with sequential response control logic. Presented findings to a faculty review panel with clear oral and written communication of complex technical content.',
    tags: ['Energy Systems', 'Embedded Systems', 'Automation', 'Control Logic'],
    school: "St. Joseph's College of Engineering",
    type: 'Embedded',
    emoji: '⚡',
  },
  {
    title: 'Plasmon-Enhanced Graphene/MoS₂/Ag Heterostructure',
    description:
      'Research proposal investigating a plasmon-enhanced vertical heterostructure for high-performance photodetection and enhanced solar spectrum utilization. Silver nanostructures provide plasmonic field enhancement; graphene enables rapid carrier transport from the MoS₂ photoactive layer.',
    tags: ['Nanomaterials', 'Graphene', 'MoS₂', 'Plasmonics', 'Optoelectronics'],
    school: 'Saint Louis University',
    type: 'Research Proposal',
    emoji: '🔬',
    coauthors: 'Faisal Wahabu, Kelly Shau, Chris Eugene',
  },
  {
    title: 'MoS₂/Graphene Heterostructures for Scalable Solar Energy',
    description:
      'Fabricated high-crystalline MoS₂ on graphene/SiO₂ substrates using mask-free direct-write patterning and CVD. Preliminary Raman spectroscopy confirmed few-layer MoS₂ formation; SEM revealed well-defined triangular crystalline domains consistent with high-quality TMDC growth.',
    tags: ['CVD', 'Raman Spectroscopy', 'SEM', 'MoS₂', 'Solar Energy', '2D Materials'],
    school: 'Saint Louis University — ECE 5930',
    type: 'Lab Research',
    emoji: '🔮',
    coauthors: 'Faisal Wahabu, Kelly Shau, Chris Eugene',
  },
  {
    title: 'Laser-Based Li-Fi Communication with Automatic Beam Steering',
    description:
      'Investigated laser-based Li-Fi as an alternative to LED optical wireless communication. Built a Python/Pygame simulation featuring a fixed laser transmitter, movable receiver, and intelligent beam splitter that automatically repositions to redirect the beam when line-of-sight is broken.',
    tags: ['LiFi', 'Optical Laser', 'Python', 'Pygame', 'OOK', 'Beam Steering', 'Wireless'],
    school: 'Saint Louis University — CSCI 4/5550, Fall 2025',
    type: 'Team Research',
    emoji: '📡',
    coauthors: 'Roemen Edwards · Scott Selke · Chris Eugene',
  },
  {
    title: 'Micro Hydro-Electric Power Generation — Blue Nile River',
    description:
      'Full engineering design for a 82.87 kW run-of-river micro hydro system serving 477 homes in rural Ethiopia. Covers Pelton turbine design, Darcy-Weisbach penstock analysis, water hammer, financial modelling (NPV, tariff), and environmental impact (335 t CO₂/yr saved).',
    tags: ['Power Engineering', 'Hydraulics', 'Pelton Turbine', 'Financial Analysis', 'Sustainability'],
    school: 'Saint Louis University',
    type: 'Team Project',
    emoji: '💧',
    coauthors: 'Hamza · Chris · Alexis',
  },
]

const typeStyle = {
  'ML / AI':            { bg: 'rgba(231,93,11,0.08)',  color: '#e75d0b',  border: 'rgba(231,93,11,0.20)'  },
  'Embedded':           { bg: 'rgba(59,130,246,0.08)', color: '#3b82f6',  border: 'rgba(59,130,246,0.20)' },
  'Research Proposal':  { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed',  border: 'rgba(139,92,246,0.20)' },
  'Lab Research':       { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed',  border: 'rgba(139,92,246,0.20)' },
  'Team Project':       { bg: 'rgba(81,125,100,0.08)', color: '#517d64',  border: 'rgba(81,125,100,0.22)' },
  'Team Research':      { bg: 'rgba(14,165,233,0.08)', color: '#0ea5e9',  border: 'rgba(14,165,233,0.20)' },
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6" style={{ background: '#f5efe7' }}>
      <div className="max-w-5xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase text-center mb-3 font-semibold"
          style={{ color: '#e75d0b', fontFamily: "'Architects Daughter', cursive" }}
        >
          Projects
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: '#544f47' }}
        >
          Academic &amp; Research Work
        </h2>
        <p className="text-center text-sm mb-12 max-w-xl mx-auto" style={{ color: '#7d776e' }}>
          Graduate and undergraduate projects spanning nanomaterials, deep learning, power engineering, and renewable energy.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map(p => <ProjectCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, description, tags, school, type, coauthors, emoji }) {
  const ts = typeStyle[type] ?? { bg: 'rgba(84,79,71,0.06)', color: '#68635a', border: 'rgba(84,79,71,0.15)' }

  return (
    <div
      className="group flex flex-col gap-4 p-5 rounded-2xl transition-all hover:-translate-y-1"
      style={{
        background: '#ffffff',
        border: '1.5px solid rgba(84,79,71,0.10)',
        boxShadow: '0 2px 16px rgba(84,79,71,0.06)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(84,79,71,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(84,79,71,0.06)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">{emoji}</span>
        <span
          className="text-xs px-2.5 py-0.5 rounded-full font-semibold shrink-0"
          style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}
        >
          {type}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-xs mb-1" style={{ color: '#a89f95' }}>{school}</p>
        <h3
          className="font-bold text-sm mb-2 leading-snug transition-colors"
          style={{ color: '#544f47' }}
        >
          {title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#68635a' }}>{description}</p>
        {coauthors && (
          <p className="text-xs mt-2 italic" style={{ color: '#a89f95' }}>Authors: {coauthors}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs rounded-full"
            style={{
              background: 'rgba(231,93,11,0.07)',
              color: '#b85a12',
              border: '1px solid rgba(231,93,11,0.15)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
