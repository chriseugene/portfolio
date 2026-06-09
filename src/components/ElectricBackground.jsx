import { useEffect, useRef } from 'react'

export default function ElectricBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, animId
    let bolts = []
    let frame = 0

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    /* Build a jagged lightning path from (x1,y1) to (x2,y2) */
    function buildPath(x1, y1, x2, y2, roughness, depth) {
      if (depth === 0) return [{ x: x2, y: y2 }]
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness * 0.6
      return [
        ...buildPath(x1, y1, mx, my, roughness * 0.58, depth - 1),
        ...buildPath(mx, my, x2, y2, roughness * 0.58, depth - 1),
      ]
    }

    function spawnBolt() {
      const y   = H * (0.35 + Math.random() * 0.3)   // vertical center band
      const x1  = -20
      const x2  = W + 20
      const pts = [{ x: x1, y }, ...buildPath(x1, y, x2, y, H * 0.28, 8)]

      // build branches off random segments of the main bolt
      const branches = []
      const count = 4 + Math.floor(Math.random() * 5)
      for (let i = 0; i < count; i++) {
        const si  = Math.floor(Math.random() * (pts.length - 1))
        const sp  = pts[si]
        const len = 60 + Math.random() * 160
        const ang = (Math.random() - 0.5) * Math.PI * 0.7 + (Math.random() > 0.5 ? -Math.PI / 2 : Math.PI / 2)
        const ex  = sp.x + Math.cos(ang) * len
        const ey  = sp.y + Math.sin(ang) * len
        branches.push({
          pts: [sp, ...buildPath(sp.x, sp.y, ex, ey, len * 0.35, 5)],
        })
        // tertiary sub-branches
        if (Math.random() > 0.5) {
          const si2  = Math.floor(Math.random() * branches[branches.length - 1].pts.length)
          const sp2  = branches[branches.length - 1].pts[si2]
          const len2 = 25 + Math.random() * 70
          const ang2 = ang + (Math.random() - 0.5) * 1.2
          branches.push({
            pts: [sp2, ...buildPath(sp2.x, sp2.y, sp2.x + Math.cos(ang2) * len2, sp2.y + Math.sin(ang2) * len2, len2 * 0.4, 4)],
            sub: true,
          })
        }
      }

      bolts.push({ pts, branches, life: 1, peak: 0.08 + Math.random() * 0.12 })
    }

    function drawPath(pts, width, color, blur) {
      if (pts.length < 2) return
      ctx.save()
      ctx.shadowBlur  = blur
      ctx.shadowColor = color
      ctx.strokeStyle = color
      ctx.lineWidth   = width
      ctx.lineCap     = 'round'
      ctx.lineJoin    = 'round'
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
      ctx.stroke()
      ctx.restore()
    }

    function draw() {
      animId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)

      frame++
      // fire a new bolt every ~90 frames (≈1.5s at 60fps)
      if (frame % 90 === 0 || (frame === 1)) spawnBolt()

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i]

        // life curve: sharp rise, hold briefly, then decay
        if (b.life > b.peak) {
          b.life -= 0.018                     // slow decay
        } else {
          bolts.splice(i, 1); continue        // fully faded
        }

        const alpha = Math.min(b.life / (1 - b.peak), 1)

        /* ── Main bolt ── */
        // wide outer glow — deep orange
        drawPath(b.pts, 18, `rgba(255,140,0,${alpha * 0.12})`, 40)
        // mid glow — amber
        drawPath(b.pts, 8,  `rgba(255,180,30,${alpha * 0.35})`, 22)
        // inner glow — bright yellow
        drawPath(b.pts, 3,  `rgba(255,220,80,${alpha * 0.75})`, 10)
        // white-hot core
        drawPath(b.pts, 1.2, `rgba(255,255,200,${alpha * 0.95})`, 4)

        /* ── Branches ── */
        for (const br of b.branches) {
          const ba = alpha * (br.sub ? 0.5 : 0.75)
          drawPath(br.pts, br.sub ? 4  : 8,   `rgba(255,160,20,${ba * 0.3})`,  18)
          drawPath(br.pts, br.sub ? 1.5: 2.5, `rgba(255,210,60,${ba * 0.7})`,  7)
          drawPath(br.pts, br.sub ? 0.6: 1,   `rgba(255,255,180,${ba * 0.9})`, 3)
        }

        /* ── Endpoint sparks ── */
        for (const end of [b.pts[b.pts.length - 1], b.pts[0]]) {
          const r = 6 * alpha
          const grad = ctx.createRadialGradient(end.x, end.y, 0, end.x, end.y, r * 3)
          grad.addColorStop(0, `rgba(255,255,200,${alpha * 0.9})`)
          grad.addColorStop(0.4, `rgba(255,180,30,${alpha * 0.5})`)
          grad.addColorStop(1, 'rgba(255,120,0,0)')
          ctx.save()
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(end.x, end.y, r * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
