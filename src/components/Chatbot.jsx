import { useState, useRef, useEffect } from 'react'

/* ── Replies ── */
const REPLIES = {
  greeting:   `Hi there! 👋 I'm Chris's portfolio assistant. I can help you learn about his background, skills, projects, experience, and more.\n\nWhat would you like to know?`,
  about:      `**Chris Eugene** is an M.S. Electrical & Computer Engineering graduate student at Saint Louis University (GPA 3.90, graduating May 2026).\n\nHe specializes in **quantum engineering**, **nanoscale materials**, and **deep learning**, with hands-on experience across research, power engineering, optical wireless communication, and university instruction.\n\nHe holds a B.S. in Electrical & Electronics Engineering from St. Joseph's College of Engineering, Chennai (GPA 3.67).`,
  skills:     `Chris's skills span three domains:\n\n⚡ **Research & Engineering** — Quantum Mechanics & QIS, Nanomaterial Fabrication, Power Systems Analysis, Power Electronics, Filter Design, Signal Processing\n\n💻 **Software & Programming** — Python, TensorFlow, OpenCV, Machine Learning & Deep Learning, Computer Vision, OOP, Data Structures\n\n🏢 **Professional** — ISO 9001 & 17100 QA, Root Cause Analysis & CAPA, Technical Documentation, Lesson Planning & Curriculum Design`,
  education:  `🎓 **M.S. Electrical & Computer Engineering**\nSaint Louis University · Aug 2024 – May 2026 · GPA **3.90 / 4.0**\nCourses: Quantum Info Science, Materials Fabrication, Power Systems I & II, Machine Learning, Filter Design, Computer Networks\n🏆 Donald and Nora Manahan Scholarship and Research Fund\n\n🎓 **B.S. Electrical & Electronics Engineering**\nSt. Joseph's College of Engineering, Chennai · Aug 2019 – May 2023 · GPA **3.67 / 4.0**`,
  teaching:   `Chris has strong teaching credentials:\n\n📚 **TA — College Physics Laboratory** (Prof. John C. James, SLU)\nManaged 2 labs · 57 students · grading · demonstrations · lectures\n\n📚 **TA — Energy Conversions** (Prof. Huliyar Mallikarjuna, SLU)\nSupplementary materials · tutoring · standardised grading\n\nHe was also a **student** in Prof. Mallikarjuna's Power Systems Analysis course before becoming his TA. Experienced in differentiated instruction, curriculum design, and adapting strategies to diverse learners.`,
  experience: `Chris has held 4+ roles across academia and industry:\n\n📚 **Teaching Assistant — College Physics** (SLU, Aug 2025 – May 2026)\nManaged 2 labs · 57 students · grading · demonstrations\n\n📚 **Teaching Assistant — Energy Conversions** (SLU, Jan – May 2026)\nDesigned materials · monitored student progress · grading\n\n🏢 **QA Specialist — TransPerfect** (Oct 2023 – Jul 2024)\nISO 9001 & 17100 · CAPA · onboarded 10+ staff\n\n💻 **IT Support Intern — Mercedes-Benz Titanium Motors** (Aug – Oct 2023)\nNetwork troubleshooting · system maintenance`,
  projects:   `Chris has 6 notable projects:\n\n🤖 **Object Localization using Deep Learning** — Python, TensorFlow, OpenCV (SLU)\n⚡ **Automated Energy-Saving System** — Embedded Systems, Control Logic (St. Joseph's)\n🔬 **Plasmon-Enhanced Graphene/MoS₂/Ag Heterostructure** — Research Proposal (SLU)\n🧪 **MoS₂/Graphene Heterostructures for Solar Energy** — CVD, Raman, SEM (SLU)\n💡 **Laser-Based Li-Fi with Automatic Beam Steering** — Python, Pygame, MATLAB Simulink (SLU)\n🌊 **Micro Hydro-Electric Power Generation, Blue Nile River** — 82.87 kW system design (SLU)`,
  research:   `Chris's research areas:\n\n⚛️ **Quantum Engineering & QIS** — Quantum information science and device engineering\n🔬 **Nanomaterial Fabrication** — MoS₂/Graphene heterostructures, CVD, Raman spectroscopy, SEM\n💡 **Optical Wireless (LiFi)** — Laser-based data transmission, beam steering, MATLAB Simulink modelling\n⚡ **Power Engineering** — Run-of-river hydro systems, power electronics, energy conversion\n🤖 **Deep Learning & CV** — Object localization, TensorFlow, OpenCV`,
  references: `Chris has references from four SLU mentors:\n\n🔵 **Nikhil Yadav** — Technology & Graduate Assistant\n"Dependable, eager to learn, deep analytical thinking — I'd work with Chris again without a second thought."\n\n🔵 **Huliyar Mallikarjuna** — Adjunct Faculty, ECE\n"Rare to see someone transition so seamlessly from learner to educator."\n\n🟢 **John C. James** — Assistant Professor, Physics\n"A calm, encouraging presence that made the lab feel approachable for every student."\n\n🟣 **Vahan Huroyan** — Assistant Professor, Mathematics\n"His ability to bridge theory with practice is rare."`,
  contact:    `Chris is **open to opportunities** in engineering, research, and teaching roles.\n\n📧 **Email:** peugene@slu.edu\n💼 **LinkedIn:** linkedin.com/in/praveshchristo01\n\nYou can also use the **Contact** section at the bottom of this page to send a message directly.`,
  scholarship:`🏆 **Donald and Nora Manahan Scholarship and Research Fund**\n\nAwarded to Chris during his M.S. at SLU's School of Science and Engineering. Supports interdisciplinary teamwork, student projects, and collaborative student–faculty research — covering tuition, fees, and academic expenses.`,
  navigate:   `Here's a quick map of the portfolio:\n\n🏠 **Hero** — Top of the page\n👤 **About** — Background carousel\n🎓 **Education** — Degrees & coursework\n💼 **Experience** — Academic & industry roles\n⚡ **Skills** — Technical expertise by category\n🔬 **Projects** — 6 research & engineering projects\n📄 **Resume** — 3 tailored resume versions\n🏆 **References** — Faculty recommendations\n📬 **Contact** — Get in touch\n\nClick any link in the navbar to jump there!`,
  fallback:   `I'm not sure about that — try asking:\n• **Who is Chris?** — overview\n• **Skills** — what he knows\n• **Projects** — what he's built\n• **Teaching** or **Experience** — his roles\n• **Education** — degrees & GPA\n• **References** — what mentors say\n• **Contact** — how to reach him`,
}

/* ── Keyword scoring — each topic has weighted keyword arrays ── */
const TOPICS = [
  { key: 'teaching', words: [
    'teach', 'teaching experience', 'teaching assistant', 'teaching role', 'teaching credential',
    'has he taught', 'did he teach', 'does he teach', 'can he teach',
    'tutor', 'tutoring', 'instruct', 'instruction', 'instructor',
    'lesson', 'curriculum', 'lecture', 'classroom', 'differentiated',
    'physics lab', 'energy conversion lab', 'ta role', 'ta position',
    'academic role', 'student support',
  ]},
  { key: 'education', words: [
    'education', 'degree', 'university', 'college', 'gpa', 'grade',
    'graduate', 'undergraduate', 'coursework', 'course', 'courses',
    'saint louis', 'slu', 'joseph', 'study', 'studied', 'where did he study',
    'where did he go to school', 'bachelor', 'master', 'ms ece', 'bs eee',
    'what is his gpa', 'what did he study', 'alma mater', 'graduated from',
  ]},
  { key: 'skills', words: [
    'skill', 'skills', 'technology', 'technologies', 'programming', 'language',
    'software', 'tool', 'proficient', 'know how', 'technical ability',
    'what can he do', 'what does he know', 'does he know', 'can he use',
    'is he good at', 'capabilities', 'expertise',
    'python', 'tensorflow', 'opencv', 'matlab', 'vlsi', 'machine learning',
    'deep learning', 'computer vision', 'signal processing',
  ]},
  { key: 'projects', words: [
    'project', 'projects', 'built', 'developed', 'made', 'created', 'worked on',
    'what has he built', 'what did he build', 'what has he done', 'what did he do',
    'show me his projects', 'show projects', 'lifi', 'li-fi', 'laser',
    'hydro', 'graphene', 'mos2', 'object localization', 'energy saving', 'portfolio work',
  ]},
  { key: 'research', words: [
    'research', 'quantum', 'nanomaterial', 'nanomat', 'heterostructure',
    'optical wireless', 'beam steering', 'solar energy', 'raman', 'cvd',
    'sem', 'qis', 'plasmon', 'research area', 'research focus', 'research interest',
    'what does he research', 'what is he researching',
  ]},
  { key: 'experience', words: [
    'work history', 'work experience', 'job', 'jobs', 'employment', 'employer',
    'career', 'industry experience', 'professional experience', 'professional background',
    'where has he worked', 'where did he work', 'roles held', 'what roles',
    'transperfect', 'mercedes', 'quality assurance', 'qa specialist',
    'internship', 'it support', 'industry background', 'company',
  ]},
  { key: 'references', words: [
    'reference', 'references', 'recommendation', 'vouch', 'mentor', 'mentors',
    'what do they say', 'what do people say about him', 'who recommends him',
    'professor', 'faculty', 'nikhil', 'mallik', 'mallikarjuna', 'james', 'huroyan',
    'what do his professors say', 'colleague', 'referees',
  ]},
  { key: 'contact', words: [
    'contact', 'email', 'reach', 'reach him', 'reach out',
    'hire', 'hiring', 'want to hire', 'interested in hiring',
    'apply', 'opportunity', 'available', 'is he available', 'open to work',
    'open to opportunities', 'get in touch', 'how to contact', 'how to reach',
    'linkedin', 'send message', 'connect with him',
  ]},
  { key: 'scholarship', words: [
    'scholarship', 'award', 'manahan', 'financial aid', 'fund', 'fellowship',
    'has he won', 'any awards', 'recognition',
  ]},
  { key: 'navigate', words: [
    'navigate', 'navigation', 'sections', 'map of', 'site map',
    'where is the', 'how do i find', 'take me to', 'go to',
    'layout', 'what sections', 'what pages', 'show me the',
    'where can i find', 'how is this organized',
  ]},
  { key: 'about', words: [
    'who is chris', 'who is he', 'tell me about him', 'tell me about chris',
    'overview', 'summary', 'introduce', 'introduction',
    'background', 'about chris', 'about him', 'describe him',
    'general info', 'profile', 'what is he about',
  ]},
]

const QUICK = [
  'Who is Chris?',
  'What are his skills?',
  'Show me his projects',
  'Teaching experience',
  'How to contact him?',
  'Navigate the portfolio',
]

function getReply(input) {
  const t = input.toLowerCase().trim()

  // Greeting check first
  if (/^(hi|hello|hey|sup|howdy|good\s*(morning|afternoon|evening))/.test(t)) {
    return REPLIES.greeting
  }

  // Score each topic by counting keyword hits
  let best = null, bestScore = 0
  for (const topic of TOPICS) {
    let score = 0
    for (const w of topic.words) {
      if (t.includes(w)) score += w.includes(' ') ? 3 : 1  // multi-word phrases worth more
    }
    if (score > bestScore) { bestScore = score; best = topic.key }
  }

  return bestScore > 0 ? REPLIES[best] : REPLIES.fallback
}

function MsgText({ text }) {
  // Bold: **...**  and newlines → <br>
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g)
  return (
    <span>
      {parts.map((p, i) => {
        if (p === '\n') return <br key={i} />
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        return p
      })}
    </span>
  )
}

export default function Chatbot() {
  const [open, setOpen]       = useState(false)
  const [msgs, setMsgs]       = useState([
    { from: 'bot', text: `Hi! 👋 I'm Chris's portfolio assistant.\nAsk me anything about his background, skills, projects, or experience!` },
  ])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const bottomRef             = useRef(null)
  const inputRef              = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  function send(text) {
    const q = (text || input).trim()
    if (!q) return
    setInput('')
    setMsgs(m => [...m, { from: 'user', text: q }])
    setTyping(true)
    setTimeout(() => {
      const reply = getReply(q)
      setTyping(false)
      setMsgs(m => [...m, { from: 'bot', text: reply }])
    }, 650)
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          open ? 'bg-slate-700 rotate-45' : 'bg-cyan-500 hover:bg-cyan-400'
        }`}
        aria-label="Toggle chatbot"
        style={{ boxShadow: open ? '' : '0 0 24px rgba(34,211,238,0.45)' }}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-[#0a0e1a]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 transition-all duration-300 origin-bottom-right ${
        open ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col rounded-2xl border border-cyan-500/25 bg-[#0d1120] shadow-2xl overflow-hidden"
          style={{ maxHeight: '520px', boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.1)' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0e1a] border-b border-cyan-900/40">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <span className="text-cyan-400 text-xs font-bold font-mono">CE</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Chris's Assistant</p>
              <p className="text-cyan-500 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
                Online · Ask me anything
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  m.from === 'user'
                    ? 'bg-cyan-500 text-[#0a0e1a] font-medium rounded-br-sm'
                    : 'bg-[#0a0e1a] border border-slate-800 text-slate-300 rounded-bl-sm'
                }`}>
                  <MsgText text={m.text} />
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 flex gap-1.5 overflow-x-auto border-t border-slate-800/60 scrollbar-hide">
            {QUICK.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="shrink-0 px-2.5 py-1 text-[10px] border border-cyan-500/25 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-colors whitespace-nowrap font-mono"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-slate-800/60 bg-[#0a0e1a]">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about Chris..."
              className="flex-1 bg-[#0d1120] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-[#0a0e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
