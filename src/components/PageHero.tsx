import type { ReactNode } from 'react'
import type { ImageKey } from '../data/images'
import { Poster } from './Poster'
import { useParallax } from './Reveal'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: string
  image: ImageKey
  children?: ReactNode
  tall?: boolean
}

export function PageHero({ eyebrow, title, lead, image, children, tall = false }: Props) {
  const bg = useParallax<HTMLDivElement>(50)
  return (
    <section className={`relative isolate flex items-end overflow-hidden ${tall ? 'min-h-[100svh]' : 'min-h-[62svh]'}`}>
      <div ref={bg} className="absolute inset-x-0 -top-12 bottom-0 -z-20" aria-hidden="true">
        <Poster name={image} decorative eager className="h-full w-full" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/35" aria-hidden="true" />
      <div className="container-x pb-14 pt-36 sm:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-6 max-w-xl">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div className="textile-band absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  )
}
