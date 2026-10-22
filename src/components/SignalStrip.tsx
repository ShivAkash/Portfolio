import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Thin low-contrast morphing waveform — audio/ML nod. Paused when hidden. */
export function SignalStrip({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0
    let running = !document.hidden && !reduced

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const stroke = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const mid = h / 2
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim()

      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()
      ctx.strokeStyle = accent || '#d9697c'
      ctx.globalAlpha = 0.28
      ctx.lineWidth = 1
      ctx.lineJoin = 'round'

      const pts = 48
      for (let i = 0; i <= pts; i++) {
        const x = (i / pts) * w
        const n = i / pts
        const y =
          mid +
          Math.sin(n * Math.PI * 3 + t) * (h * 0.28) +
          Math.sin(n * Math.PI * 7 + t * 0.7) * (h * 0.12) +
          Math.sin(n * Math.PI * 1.5 + t * 1.3) * (h * 0.08)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    const frame = () => {
      if (!running) return
      t += 0.012
      stroke()
      raf = requestAnimationFrame(frame)
    }

    if (reduced) {
      stroke()
      return
    }

    const onVis = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(frame)
      else cancelAnimationFrame(raf)
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ width: '100%', height: 28, display: 'block' }}
    />
  )
}
