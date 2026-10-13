import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../lib/hooks'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  /** 'up' fades and rises, 'clip' is a cinematic image reveal. */
  variant?: 'up' | 'clip'
}

/** Scroll-triggered reveal built on GSAP ScrollTrigger. Content is visible if motion is reduced. */
export function Reveal({ children, as = 'div', className = '', delay = 0, variant = 'up' }: Props) {
  const Tag = as as 'div'
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        variant === 'clip'
          ? { clipPath: 'inset(12% 8% 12% 8%)', opacity: 0, scale: 1.04 }
          : { y: 36, opacity: 0 },
        {
          ...(variant === 'clip' ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : { y: 0 }),
          opacity: 1,
          duration: 1.1,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [reduced, delay, variant])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Subtle parallax for decorative elements only. */
export function useParallax<T extends HTMLElement>(amount = 60) {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [amount, reduced])
  return ref
}
