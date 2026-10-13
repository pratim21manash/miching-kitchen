import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { images, type ImageKey } from '../data/images'
import { useDialog } from '../lib/hooks'
import { Poster } from './Poster'

export interface GalleryItem {
  key: ImageKey
  caption: string
  span?: string
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i === null ? i : (i + 1) % items.length))
  const prev = () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))
  const ref = useDialog<HTMLDivElement>(index !== null, close)

  useEffect(() => {
    if (index === null) return
    const on = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', on)
    return () => document.removeEventListener('keydown', on)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length])

  const current = index !== null ? items[index] : null
  const credit = current ? (images[current.key] as { credit?: string }).credit : undefined

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((it, i) => (
          <li key={`${it.key}-${i}`} className={it.span ?? ''}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden rounded-xl"
              aria-label={`Open image: ${it.caption}`}
            >
              <Poster name={it.key} decorative className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/85 to-transparent p-3 pt-10 text-left text-sm">
                {it.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            className="fixed inset-0 z-[95] flex flex-col bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-ivory/70" aria-live="polite">
                {index! + 1} / {items.length}
              </p>
              <button type="button" data-autofocus onClick={close} aria-label="Close gallery" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30">
                <X size={20} />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
              <button type="button" onClick={prev} aria-label="Previous image" className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-midnight/70 sm:left-4">
                <ChevronLeft />
              </button>
              <motion.div key={index} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="h-full max-h-[75dvh] w-full max-w-5xl">
                <Poster name={current.key} className="h-full w-full rounded-xl" eager />
              </motion.div>
              <button type="button" onClick={next} aria-label="Next image" className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-midnight/70 sm:right-4">
                <ChevronRight />
              </button>
            </div>
            <div className="p-4 text-center">
              <p className="font-serif text-xl">{current.caption}</p>
              {credit && <p className="mt-1 text-xs text-ivory/50">{credit}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
