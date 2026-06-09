import { useState } from 'react'

const navLinks = [
  { label: 'About',      href: '#about',      icon: <PersonIcon /> },
  { label: 'Education',  href: '#education',  icon: <CapIcon /> },
  { label: 'Experience', href: '#experience', icon: <BriefcaseIcon /> },
  { label: 'Skills',     href: '#skills',     icon: <ChipIcon /> },
  { label: 'Projects',   href: '#projects',   icon: <CodeIcon /> },
  { label: 'Resume',     href: '#resume',     icon: <FileIcon /> },
  { label: 'References', href: '#references', icon: <StarIcon /> },
  { label: 'Contact',    href: '#contact',    icon: <MailIcon /> },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d1120] border-b border-slate-800 px-4 h-14 flex items-center justify-between">
        <a href="#home" className="text-cyan-400 font-bold tracking-widest text-sm">
          CE<span className="text-slate-500">.</span>dev
        </a>
        <button onClick={() => setMobileOpen(o => !o)} className="text-slate-400 hover:text-cyan-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-[#0d1120] border-b border-slate-800 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/8 transition-colors text-sm tracking-wide">
              <span className="text-slate-600">{l.icon}</span>
              {l.label}
            </a>
          ))}
          <a href="mailto:peugene@slu.edu"
            className="mt-2 flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#0a0e1a] font-bold rounded-lg text-sm transition-colors">
            Get In Touch
          </a>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 xl:w-72 bg-[#0d1120] border-r border-slate-800 z-40 overflow-y-auto">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-800">
          <a href="#home" className="text-cyan-400 font-bold tracking-widest text-base">
            CE<span className="text-slate-500">.</span>dev
          </a>
        </div>

        {/* Profile block */}
        <div className="px-6 py-6 flex flex-col items-center text-center border-b border-slate-800">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full blur-lg opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, transparent 70%)' }} />
            <img
              src="/avatar.png"
              alt="Chris Eugene"
              className="relative w-24 h-24 rounded-full object-cover border-2 border-cyan-400/50"
              style={{ boxShadow: '0 0 20px rgba(34,211,238,0.25)' }}
            />
          </div>

          {/* Open to work badge */}
          <div className="flex items-center gap-1.5 mb-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-mono tracking-wider">Open to Opportunities</span>
          </div>

          {/* Name */}
          <h1 className="text-white font-bold text-base leading-tight mb-1">Chris Eugene</h1>

          {/* Handle + location */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
            <span className="text-slate-500 text-xs font-mono">@praveshchristo01</span>
            <span className="text-slate-700 text-xs">·</span>
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <LocationIcon />
              Saint Louis, MO
            </span>
          </div>

          {/* Title */}
          <p className="text-cyan-400 text-xs font-mono tracking-wider mb-4">M.S. ECE · SLU · GPA 3.90</p>

          {/* Experience */}
          <div className="w-full mb-4">
            <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Experience Includes</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['TransPerfect', 'Mercedes-Benz', 'SLU'].map(c => (
                <span key={c} className="px-2 py-1 text-[10px] border border-slate-700 text-slate-400 rounded font-mono">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2 w-full">
            <a href="mailto:peugene@slu.edu"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a0e1a] font-bold rounded-lg text-xs transition-colors tracking-wide">
              <MailIcon />
              Email
            </a>
            <a href="https://linkedin.com/in/praveshchristo01" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 rounded-lg text-xs transition-colors">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 rounded-lg text-xs transition-colors">
              <GithubIcon />
            </a>
          </div>
        </div>

        {/* Nav links */}
        <nav className="px-3 py-4 flex flex-col gap-1">
          <p className="text-slate-600 text-[10px] tracking-[0.25em] uppercase px-3 mb-2">Navigation</p>
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/8 transition-colors text-sm tracking-wide group">
              <span className="text-slate-600 group-hover:text-cyan-500 transition-colors">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-6 py-4 border-t border-slate-800">
          <p className="text-slate-600 text-[10px] font-mono text-center tracking-wider">
            © 2026 Chris Eugene
          </p>
        </div>
      </aside>
    </>
  )
}

/* ── Icons ── */
function PersonIcon()    { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> }
function CapIcon()       { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-2h8"/></svg> }
function BriefcaseIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> }
function ChipIcon()      { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v2m6-2h2a2 2 0 012 2v2m0 0h-2m2 0v6m0 6h-2m2-6v2m-2 4H7a2 2 0 01-2-2v-2m0 0H3m2 0v-6M3 9h2M9 21h6m-6 0v-2m6 2v-2"/></svg> }
function CodeIcon()      { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg> }
function FileIcon()      { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> }
function StarIcon()      { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> }
function MailIcon()      { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> }
function LocationIcon()  { return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> }
function LinkedInIcon()  { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }
function GithubIcon()    { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> }
