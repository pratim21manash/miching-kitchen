import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { getDish } from '../data/menu'
import { site } from '../data/site'
import { useCart } from '../store/cart'
import { useDialog } from '../lib/hooks'
import { Poster } from './Poster'
import { ThaliExperience } from './ThaliExperience'

interface Props {
  dishId: string
  onClose: () => void
  onOpenDish: (id: string) => void
}

export function DishDetailModal({ dishId, onClose, onOpenDish }: Props) {
  const dish = getDish(dishId)
  const ref = useDialog<HTMLDivElement>(true, onClose)
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [view3d, setView3d] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setQty(1)
    setView3d(false)
    setAdded(false)
  }, [dishId])

  if (!dish) return null
  const related = dish.related.map(getDish).filter((d): d is NonNullable<typeof d> => !!d)

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        className="relative grid max-h-[94dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl bg-forest-950 sm:rounded-3xl md:grid-cols-2"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close dish details"
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-midnight/80 hover:bg-midnight"
        >
          <X size={20} />
        </button>

        <div className="p-3 md:p-4">
          {view3d ? (
            <ThaliExperience compact />
          ) : (
            <motion.div layoutId={`dish-img-${dish.id}`} className="aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-full md:min-h-[28rem]">
              <Poster name={dish.image} className="h-full w-full" eager />
            </motion.div>
          )}
          {dish.has3d && (
            <button type="button" onClick={() => setView3d((v) => !v)} className="btn btn-ghost btn-sm mt-3 w-full">
              {view3d ? 'Back to photo' : 'View in 3D'}
            </button>
          )}
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <p className="eyebrow">{dish.confirmed ? 'On our menu' : 'Menu item to be confirmed'}</p>
          <h2 id="dish-modal-title" className="h2 mt-2 !text-4xl sm:!text-5xl">
            {dish.name}
          </h2>
          {dish.assameseName && (
            <p lang="as" className="assamese mt-1 text-lg text-brass-light">
              {dish.assameseName}
            </p>
          )}
          <p className="mt-3 text-2xl font-semibold">{dish.price !== null ? `₹${dish.price}` : <span className="text-base font-normal text-ivory/70">Price to be confirmed</span>}</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/85">{dish.description}</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="eyebrow !text-[0.65rem]">Typical ingredients</dt>
              <dd className="mt-1">{dish.typicalIngredients.join(', ')}</dd>
              {!dish.confirmed && <dd className="mt-1 text-xs text-ivory/55">General to the traditional dish; the restaurant's own recipe is to be confirmed.</dd>}
            </div>
            <div>
              <dt className="eyebrow !text-[0.65rem]">Dietary</dt>
              <dd className="mt-1">
                {dish.vegetarian === true ? 'Vegetarian' : dish.vegetarian === false ? 'Contains fish or meat' : 'To be confirmed'}
              </dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.65rem]">Allergens</dt>
              <dd className="mt-1">{dish.allergens ? dish.allergens.join(', ') : 'Not yet verified. Please ask the restaurant if you have allergies.'}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.65rem]">Serving and availability</dt>
              <dd className="mt-1">
                {dish.serving ?? 'Serving size to be confirmed'}
                {' · '}
                {dish.available ? 'Available' : 'Availability to be confirmed'}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1" role="group" aria-label="Quantity">
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span className="w-8 text-center tabular-nums" aria-live="polite">{qty}</span>
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary flex-1"
              onClick={() => {
                add(dish.id, qty)
                setAdded(true)
                window.setTimeout(() => setAdded(false), 1800)
              }}
            >
              {added ? 'Added to your list' : 'Add to Enquiry'}
            </button>
          </div>
          <p className="mt-2 text-xs text-ivory/55" role="status">
            {site.ordering.onlineCheckout ? '' : 'Orders are sent as an enquiry. No payment is taken on this site.'}
          </p>

          {related.length > 0 && (
            <div className="mt-6 border-t border-ivory/10 pt-5">
              <p className="eyebrow !text-[0.65rem]">Pairs well with</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <button type="button" onClick={() => onOpenDish(r.id)} className="rounded-full border border-ivory/25 px-3 py-1.5 text-sm hover:border-brass hover:text-brass-light">
                      {r.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
