import { useEffect, useRef } from 'react'

const COLORS = [
  [6, 182, 212],
  [59, 130, 246],
  [139, 92, 246],
  [14, 165, 233],
]
const COUNT = 38
const LINK_DIST = 140

function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})` }

function mkParticle(W, H) {
  const c = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 2 + Math.random() * 4,
    alpha: 0.5 + Math.random() * 0.5,
    c,
    orbit: Math.random() < 0.35,
    oa: Math.random() * Math.PI * 2,
    or: 10 + Math.random() * 14,
    os: (0.012 + Math.random() * 0.02) * (Math.random() < 0.5 ? 1 : -1),
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export default function QuantumBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let id
    let pts = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      pts = Array.from({ length: COUNT }, () => mkParticle(canvas.width, canvas.height))
    }

    function frame() {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = rgba(pts[i].c, (1 - d / LINK_DIST) * 0.18)
            ctx.lineWidth = 0.8
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        const pulse = 0.85 + Math.sin(p.pulse) * 0.15

        // Outer glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = rgba(p.c, 0.04)
        ctx.fill()

        // Mid glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = rgba(p.c, 0.12)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = rgba(p.c, p.alpha)
        ctx.fill()

        // Orbit ring + electron
        if (p.orbit) {
          p.oa += p.os
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, p.or * 1.8, p.or * 0.55, p.oa * 0.3, 0, Math.PI * 2)
          ctx.strokeStyle = rgba(p.c, 0.22)
          ctx.lineWidth = 0.7
          ctx.stroke()

          const ex = p.x + Math.cos(p.oa) * p.or * 1.8
          const ey = p.y + Math.sin(p.oa) * p.or * 0.55
          ctx.beginPath()
          ctx.arc(ex, ey, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = rgba(p.c, 0.85)
          ctx.fill()
        }
      }
      id = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    frame()
    return () => { cancelAnimationFrame(id); ro.disconnect() }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />
}
