import { useRef, type ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks'

/** Gentle magnetic pull on capable desktop devices. No effect on touch or reduced motion. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!enabled || !el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className="inline-block transition-transform duration-200 ease-out"
    >
      {children}
    </span>
  )
}
