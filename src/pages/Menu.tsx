import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { MenuFilters, type Filters } from '../components/MenuFilters'
import { DishCard } from '../components/DishCard'
import { DishDetailModal } from '../components/DishDetailModal'
import { categories, dishes, hasVerifiedPrices, inCategory } from '../data/menu'

const priceCeiling = Math.max(100, ...dishes.map((d) => d.price ?? 0))

export default function Menu() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState<Filters>({ query: '', category: 'all', vegOnly: false, maxPrice: null })
  const openId = params.get('dish')

  const visibleCategories = useMemo(
    () => categories.filter((c) => dishes.some((d) => inCategory(d, c.id))).map((c) => c.id),
    [],
  )

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return dishes.filter((d) => {
      if (filters.category !== 'all' && !inCategory(d, filters.category)) return false
      if (filters.vegOnly && d.vegetarian !== true) return false
      if (filters.maxPrice !== null && (d.price === null || d.price > filters.maxPrice)) return false
      if (q && !`${d.name} ${d.assameseName ?? ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [filters])

  const open = (id: string) => setParams({ dish: id }, { replace: false })
  const close = () => {
    const p = new URLSearchParams(params)
    p.delete('dish')
    setParams(p)
  }

  return (
    <>
      <Seo
        path="/menu"
        title="Menu | Assamese Miching Kitchen, Ganeshguri, Guwahati"
        description="Explore traditional Assamese dishes: thali, masor tenga, khar, aloo pitika, bamboo shoot preparations and pitha. Assamese cuisine in Ganeshguri, Guwahati."
      />
      <PageHero
        eyebrow="The Menu"
        title="Explore the Flavours of Assam"
        lead="Discover regional dishes, comforting classics, and traditional preparations."
        image="thaliWide"
      />

      <section className="section !pt-12 bg-midnight">
        <div className="container-x">
          <p className="mb-8 rounded-lg border border-brass/40 bg-brass/10 p-4 text-sm text-ivory/85" role="note">
            These are classic Assamese dishes shown while the restaurant confirms its menu. Prices, dietary details, allergens and availability will appear here once verified.
          </p>

          <MenuFilters
            filters={filters}
            onChange={setFilters}
            visibleCategories={visibleCategories}
            showPrice={hasVerifiedPrices}
            priceCeiling={priceCeiling}
          />

          <p className="mt-6 text-sm text-ivory/60" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
          </p>

          <LayoutGroup>
            <motion.div layout className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((d) => (
                  <motion.div key={d.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                    <DishCard dish={d} onView={open} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="mt-10 rounded-2xl border border-ivory/15 p-10 text-center">
                <p className="h3">No dishes match your filters</p>
                <p className="mt-2 text-ivory/70">Try a different search, or clear the filters.</p>
                <button type="button" className="btn btn-primary mt-6" onClick={() => setFilters({ query: '', category: 'all', vegOnly: false, maxPrice: null })}>
                  Clear filters
                </button>
              </div>
            )}

            <AnimatePresence>
              {openId && <DishDetailModal key="modal" dishId={openId} onClose={close} onOpenDish={open} />}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>
    </>
  )
}
