import { useEffect, useRef } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks'

/** A soft brass ring that trails the pointer. Desktop only, purely decorative, never required. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!fine || reduced || !el) return
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      raf = 0
    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = '1'
    }
    const onLeave = () => (el.style.opacity = '0')
    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 rounded-full border border-brass-light/70 opacity-0 transition-opacity duration-300"
    />
  )
}
