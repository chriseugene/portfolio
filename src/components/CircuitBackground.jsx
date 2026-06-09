import { useEffect, useRef } from 'react'

const GRID = 60        // px between nodes
const NODE_RADIUS = 2.5
const TRACE_COLOR = 'rgba(6, 182, 212, 0.30)'
const NODE_COLOR  = 'rgba(6, 182, 212, 0.55)'
const PULSE_COLOR = '#06b6d4'
const PULSE_GLOW  = 'rgba(6, 182, 212, 0.6)'
const COMPONENT_COLOR = 'rgba(6, 182, 212, 0.42)'
const PULSE_SPEED = 1.4   // px per frame
const PULSE_RADIUS = 3.5
const PULSE_COUNT  = 28

function buildGrid(W, H) {
  const cols = Math.floor(W / GRID) + 2
  const rows = Math.floor(H / GRID) + 2
  const nodes = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({ x: c * GRID, y: r * GRID })
    }
  }
  // Build edges (horizontal + vertical) with 55% density
  const edges = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c
      if (c + 1 < cols && Math.random() < 0.55) {
        edges.push({ a: i, b: r * cols + (c + 1) })
      }
      if (r + 1 < rows && Math.random() < 0.55) {
        edges.push({ a: i, b: (r + 1) * cols + c })
      }
    }
  }
  return { nodes, edges, cols, rows }
}

function buildComponents(nodes, cols, rows) {
  // Sprinkle small component symbols (resistors / caps) along edges
  const comps = []
  const count = Math.floor((cols * rows) * 0.04)
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * (rows - 1))
    const c = Math.floor(Math.random() * (cols - 1))
    const horiz = Math.random() < 0.5
    const idx = r * cols + c
    const n = nodes[idx]
    comps.push({
      x: n.x + (horiz ? GRID * 0.3 : 0),
      y: n.y + (horiz ? 0 : GRID * 0.3),
      horiz,
    })
  }
  return comps
}

function spawnPulse(edges, nodes) {
  const edge = edges[Math.floor(Math.random() * edges.length)]
  const a = nodes[edge.a]
  const b = nodes[edge.b]
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)
  return {
    ax: a.x, ay: a.y,
    bx: b.x, by: b.y,
    nx: dx / len, ny: dy / len,
    len,
    t: 0,
    speed: PULSE_SPEED * (0.8 + Math.random() * 0.6),
    alpha: 0.7 + Math.random() * 0.3,
  }
}

export default function CircuitBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let grid = null
    let comps = []
    let pulses = []

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      grid  = buildGrid(canvas.width, canvas.height)
      comps = buildComponents(grid.nodes, grid.cols, grid.rows)
      // Reset pulses on resize
      pulses = Array.from({ length: PULSE_COUNT }, () => spawnPulse(grid.edges, grid.nodes))
    }

    function drawComponent(ctx, comp) {
      ctx.save()
      ctx.strokeStyle = COMPONENT_COLOR
      ctx.lineWidth = 1.5
      const hw = 7, hh = 3.5
      if (comp.horiz) {
        ctx.strokeRect(comp.x - hw, comp.y - hh, hw * 2, hh * 2)
      } else {
        ctx.strokeRect(comp.x - hh, comp.y - hw, hh * 2, hw * 2)
      }
      ctx.restore()
    }

    function draw() {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      // Traces
      ctx.strokeStyle = TRACE_COLOR
      ctx.lineWidth = 1.2
      for (const e of grid.edges) {
        const a = grid.nodes[e.a]
        const b = grid.nodes[e.b]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // Nodes
      ctx.fillStyle = NODE_COLOR
      for (const n of grid.nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }

      // Components
      for (const c of comps) drawComponent(ctx, c)

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += p.speed
        if (p.t >= p.len) {
          pulses[i] = spawnPulse(grid.edges, grid.nodes)
          continue
        }
        const x = p.ax + p.nx * p.t
        const y = p.ay + p.ny * p.t

        // Glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, PULSE_RADIUS * 3)
        grd.addColorStop(0, `rgba(6,182,212,${p.alpha * 0.6})`)
        grd.addColorStop(1, 'rgba(6,182,212,0)')
        ctx.beginPath()
        ctx.arc(x, y, PULSE_RADIUS * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(x, y, PULSE_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = PULSE_COLOR
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
