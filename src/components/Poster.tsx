import { useState } from 'react'
import { images, type ImageKey, type Tone } from '../data/images'

const toneBg: Record<Tone, string> = {
  forest: 'bg-forest-800',
  terracotta: 'bg-terracotta-dark',
  brass: 'bg-[#6e5628]',
  midnight: 'bg-charcoal',
}

interface Props {
  name: ImageKey
  className?: string
  eager?: boolean
  /** Render the alt text as a decorative image (alt="") when a caption is next to it. */
  decorative?: boolean
}

/**
 * Image with a guaranteed fallback. If there is no licensed photo (src null)
 * or the network image fails to load, an illustrated poster is shown instead
 * of a broken image. The wrapper must be given an aspect ratio / size by the
 * parent so nothing shifts when the image loads.
 */
export function Poster({ name, className = '', eager = false, decorative = false }: Props) {
  const slot = images[name] as (typeof images)[ImageKey] & { position?: string }
  const [failed, setFailed] = useState(false)
  const showImg = slot.src && !failed

  return (
    <div className={`relative overflow-hidden ${toneBg[slot.tone]} ${className}`}>
      {showImg ? (
        <img
          src={slot.src!}
          alt={decorative ? '' : slot.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: slot.position }}
        />
      ) : (
        <div
          role="img"
          aria-label={slot.alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
        >
          <svg viewBox="0 0 120 120" className="w-1/3 max-w-28 opacity-80" aria-hidden="true">
            <circle cx="60" cy="60" r="46" fill="none" stroke="#d9b872" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="#d9b872" strokeWidth="1" strokeDasharray="3 5" />
            <circle cx="60" cy="60" r="14" fill="#b5532f" />
            <path d="M14 104h92" stroke="#a3231f" strokeWidth="6" />
          </svg>
          <span className="font-serif text-xl text-ivory">{slot.label}</span>
          <span className="eyebrow !text-[0.6rem] opacity-70">Photo to be added</span>
          <div className="textile-band absolute inset-x-0 bottom-0 !h-1.5" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

export function imageCredit(name: ImageKey) {
  return (images[name] as { credit?: string }).credit
}
