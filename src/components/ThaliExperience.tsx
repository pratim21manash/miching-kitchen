import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import { thaliParts } from '../data/menu'
import { detectWebGL, useInView, usePrefersReducedMotion } from '../lib/hooks'
import { Poster } from './Poster'

const FoodScene3D = lazy(() => import('./FoodScene3D'))

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function saveDataOn() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !!c?.saveData
}

interface Props {
  /** Compact mode is used inside the dish modal: no component panel, no menu link. */
  compact?: boolean
}

export function ThaliExperience({ compact = false }: Props) {
  const [wrapRef, inView] = useInView<HTMLDivElement>('150px')
  const [active, setActive] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const [started, setStarted] = useState(false)
  const [webgl] = useState(() => detectWebGL())
  const reduced = usePrefersReducedMotion()
  const progress = useRef(0.5)

  // auto-start once visible, unless the user has data saver enabled
  useEffect(() => {
    if (inView && webgl && !saveDataOn()) setStarted(true)
  }, [inView, webgl])

  // scroll-driven movement of the dish (0..1 across the viewport)
  useEffect(() => {
    if (!started || reduced) return
    const el = wrapRef.current
    if (!el) return
    const on = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      progress.current = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [started, reduced, wrapRef])

  const part = thaliParts.find((p) => p.id === active) ?? null
  const showScene = started && webgl

  const poster = (
    <div className="relative h-full w-full">
      <Poster name="thaliHero" className="h-full w-full" decorative />
      <div className="absolute inset-0 grid place-items-center bg-black/35 p-6 text-center">
        {webgl ? (
          <button type="button" className="btn btn-brass" onClick={() => setStarted(true)}>
            Start 3D View
          </button>
        ) : (
          <p className="max-w-xs rounded bg-midnight/80 p-3 text-sm">
            3D view isn't available on this device. Showing the photograph instead.
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div ref={wrapRef} className={compact ? '' : 'grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12'}>
      <div>
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brass/30 bg-forest-950 sm:aspect-[16/11]"
          role="group"
          aria-label="Interactive 3D model of an Assamese thali. Drag to rotate. Use the component list to read about each dish."
        >
          {showScene ? (
            <SceneBoundary fallback={poster}>
              <Suspense
                fallback={
                  <div className="grid h-full w-full place-items-center text-sm text-ivory/70" role="status">
                    Preparing 3D view…
                  </div>
                }
              >
                <FoodScene3D active={active} onSelect={setActive} resetKey={resetKey} progress={progress} reduced={reduced} />
              </Suspense>
            </SceneBoundary>
          ) : (
            poster
          )}
          {showScene && (
            <button
              type="button"
              onClick={() => {
                setResetKey((k) => k + 1)
                setActive(null)
              }}
              className="btn btn-ghost btn-sm absolute bottom-3 right-3 bg-midnight/60"
            >
              <RotateCcw size={15} /> Reset view
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-ivory/60">
          Stylised 3D illustration of a traditional thali, not a photograph of the restaurant's dishes. Drag to rotate; tap a numbered point to learn more.
        </p>
      </div>

      {!compact && (
        <div>
          <h3 className="h3">Explore the plate</h3>
          <ol className="mt-5 grid grid-cols-2 gap-2">
            {thaliParts.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setActive(p.id)}
                  aria-pressed={active === p.id}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                    active === p.id ? 'border-brass bg-brass/15' : 'border-ivory/15 hover:border-ivory/40'
                  }`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-terracotta text-xs font-semibold">
                    {i + 1}
                  </span>
                  {p.name}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-6 min-h-40 rounded-xl border border-ivory/15 bg-forest-900/60 p-5" aria-live="polite">
            {part ? (
              <>
                <h4 className="font-serif text-2xl font-semibold">{part.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ivory/80">{part.description}</p>
                <p className="eyebrow mt-4 !text-[0.65rem]">Typically contains</p>
                <p className="mt-1 text-sm">{part.ingredients.join(', ')}</p>
              </>
            ) : (
              <p className="text-sm text-ivory/70">Select a numbered point on the plate, or a component from the list.</p>
            )}
          </div>

          <Link to="/menu?dish=assamese-thali" className="btn btn-primary mt-6 w-full sm:w-auto">
            Explore this dish in the menu
          </Link>
        </div>
      )}
    </div>
  )
}
