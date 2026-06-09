import { useState } from 'react'

const variants = [
  {
    id: 'engineering',
    label: 'Engineering',
    icon: '⚙️',
    tagline: 'Targeted at engineering & research roles',
    accentColor: '#e75d0b',
    accentBg:    'rgba(231,93,11,0.07)',
    accentBorder:'rgba(231,93,11,0.22)',
    summary:
      'M.S. ECE graduate with specialized expertise in quantum engineering, power systems, nanomaterial fabrication, and deep learning. Seeking engineering or research positions that leverage advanced technical coursework and hands-on project experience.',
    highlights: [
      { label: 'Degree',       value: 'M.S. Electrical & Computer Engineering — SLU (GPA 3.90)' },
      { label: 'Specialization', value: 'Quantum Engineering · Nanomaterials · Deep Learning · Power Systems' },
      { label: 'Key Courses',  value: 'Quantum Info Science, Filter Design, Power Electronics, ML, Materials Fabrication' },
      { label: 'Projects',     value: 'Object Localization (TensorFlow/OpenCV) · Automated Energy-Saving System' },
      { label: 'Programming',  value: 'Python · TensorFlow · OpenCV · OOP · Data Structures' },
      { label: 'Also includes',value: 'IT Support internship at Mercedes-Benz Titanium Motors' },
    ],
    focus: ['Research & Development', 'Power Systems Engineering', 'Quantum Computing', 'Signal Processing', 'AI / ML Engineering'],
    pdf: '/resume-engineering.pdf',
  },
  {
    id: 'teaching',
    label: 'Teaching',
    icon: '🎓',
    tagline: 'Targeted at academic & instructional roles',
    accentColor: '#3b82f6',
    accentBg:    'rgba(59,130,246,0.07)',
    accentBorder:'rgba(59,130,246,0.22)',
    summary:
      'Experienced teaching assistant with two concurrent TA appointments at Saint Louis University. Skilled in lesson planning, differentiated instruction, tutoring, and student performance monitoring across physics and energy systems courses.',
    highlights: [
      { label: 'TA Experience', value: 'College Physics & Energy Conversions — SLU (Aug 2025 – May 2026)' },
      { label: 'Instruction',  value: 'Planned & delivered structured lab sessions; adapted to diverse learning needs' },
      { label: 'Assessment',   value: 'Graded assignments & lab reports with detailed written feedback' },
      { label: 'Tutoring',     value: 'Individual & small-group sessions with progress monitoring' },
      { label: 'Materials',    value: 'Designed supplementary materials and practice problem sets' },
      { label: 'QA Background',value: 'Training & onboarding design from TransPerfect (10+ staff)' },
    ],
    focus: ['Lab Instruction', 'Curriculum Development', 'Student Mentoring', 'Academic Assessment', 'STEM Outreach'],
    pdf: '/resume-teaching.pdf',
  },
  {
    id: 'industry',
    label: 'Industry Ready',
    icon: '💼',
    tagline: 'Broad industry & general job applications',
    accentColor: '#7c3aed',
    accentBg:    'rgba(124,58,237,0.07)',
    accentBorder:'rgba(124,58,237,0.22)',
    summary:
      'Versatile ECE graduate combining technical engineering expertise with quality assurance, process improvement, and cross-functional communication skills. Proven track record across academic, corporate, and technology environments.',
    highlights: [
      { label: 'Engineering',  value: 'M.S. ECE (3.90 GPA) · Quantum, ML, Power Systems, Nanomaterials' },
      { label: 'QA & Compliance', value: 'ISO 9001 & ISO 17100 certified practices at TransPerfect' },
      { label: 'Process Skills', value: 'Root cause analysis, CAPA plans, performance trend analysis' },
      { label: 'IT Background', value: 'Network & system troubleshooting — Mercedes-Benz internship' },
      { label: 'Soft Skills',  value: 'Cross-functional collaboration, technical communication, training design' },
      { label: 'Tools',        value: 'Python · TensorFlow · MS Office Suite · Educational Tech Platforms' },
    ],
    focus: ['Data & AI Roles', 'Engineering Analyst', 'Technical Program Management', 'QA Engineering', 'R&D Positions'],
    pdf: '/resume-general.pdf',
  },
]

export default function ResumeSection() {
  const [active, setActive] = useState('engineering')
  const v = variants.find(x => x.id === active)

  return (
    <section id="resume" className="py-24 px-6" style={{ background: '#f0ebe3' }}>
      <div className="max-w-4xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase text-center mb-3 font-semibold"
          style={{ color: '#e75d0b', fontFamily: "'Architects Daughter', cursive" }}
        >
          Resume
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: '#544f47' }}
        >
          Resume Versions
        </h2>
        <p className="text-center text-sm mb-10 max-w-xl mx-auto" style={{ color: '#7d776e' }}>
          Three tailored versions highlighting different strengths depending on the role you&apos;re reviewing this for.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {variants.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="px-5 py-2.5 rounded-2xl text-sm font-semibold tracking-wide border-2 transition-all"
              style={
                active === tab.id
                  ? { borderColor: tab.accentColor, color: tab.accentColor, background: tab.accentBg }
                  : { borderColor: 'rgba(84,79,71,0.15)', color: '#7d776e', background: 'transparent' }
              }
              onMouseEnter={e => {
                if (active !== tab.id) { e.currentTarget.style.borderColor = tab.accentColor; e.currentTarget.style.color = tab.accentColor }
              }}
              onMouseLeave={e => {
                if (active !== tab.id) { e.currentTarget.style.borderColor = 'rgba(84,79,71,0.15)'; e.currentTarget.style.color = '#7d776e' }
              }}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 md:p-8 transition-all"
          style={{
            background: '#ffffff',
            border: `1.5px solid ${v.accentBorder}`,
            boxShadow: '0 4px 24px rgba(84,79,71,0.08)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: v.accentColor }}>{v.label} Resume</h3>
              <p className="text-xs tracking-wider" style={{ color: '#a89f95' }}>{v.tagline}</p>
            </div>
            <a
              href={v.pdf}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-2xl text-sm tracking-wider text-white transition-all shrink-0 hover:opacity-90 active:scale-95"
              style={{ background: v.accentColor, boxShadow: `0 4px 14px ${v.accentBorder}` }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* Summary */}
          <p
            className="text-sm leading-relaxed mb-6 border-l-2 pl-4"
            style={{ color: '#68635a', borderColor: v.accentColor + '60' }}
          >
            {v.summary}
          </p>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {v.highlights.map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="font-bold shrink-0 text-xs mt-0.5" style={{ color: v.accentColor }}>{label}</span>
                <span className="text-xs leading-relaxed" style={{ color: '#68635a' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Best-fit roles */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: '#c4bfba' }}>
              Best-fit roles
            </p>
            <div className="flex flex-wrap gap-2">
              {v.focus.map(f => (
                <span
                  key={f}
                  className="px-2.5 py-1 text-xs rounded-full"
                  style={{ background: v.accentBg, color: v.accentColor, border: `1px solid ${v.accentBorder}` }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
