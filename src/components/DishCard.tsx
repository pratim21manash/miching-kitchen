import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Dish } from '../data/menu'
import { useCart } from '../store/cart'
import { Poster } from './Poster'

interface Props {
  dish: Dish
  onView: (id: string) => void
}

export function DishCard({ dish, onView }: Props) {
  const add = useCart((s) => s.add)
  return (
    <motion.article layout className="group flex flex-col" aria-labelledby={`dish-${dish.id}`}>
      <button
        type="button"
        onClick={() => onView(dish.id)}
        className="relative block w-full overflow-hidden rounded-xl text-left"
        aria-label={`View ${dish.name}`}
      >
        <motion.div layoutId={`dish-img-${dish.id}`} className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Poster
            name={dish.image}
            decorative
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        </motion.div>
        <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-midnight/90 to-transparent p-4 pt-12 text-sm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden">
          {dish.short}
        </span>
        {dish.vegetarian === true && (
          <span className="absolute left-3 top-3 rounded-full bg-forest-950/85 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider">
            Vegetarian
          </span>
        )}
      </button>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={`dish-${dish.id}`} className="h3 !text-[1.45rem]">
            {dish.name}
          </h3>
          {dish.assameseName && (
            <p lang="as" className="assamese mt-0.5 text-sm text-brass-light">
              {dish.assameseName}
            </p>
          )}
        </div>
        <p className="shrink-0 text-sm text-ivory/70">{dish.price !== null ? `₹${dish.price}` : 'Price TBC'}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ivory/70 sm:hidden lg:block">{dish.short}</p>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => onView(dish.id)} className="btn btn-ghost btn-sm flex-1">
          View Dish
        </button>
        <button
          type="button"
          onClick={() => add(dish.id)}
          className="btn btn-primary btn-sm"
          aria-label={`Add ${dish.name} to enquiry`}
        >
          <Plus size={16} /> Add
        </button>
      </div>
    </motion.article>
  )
}
