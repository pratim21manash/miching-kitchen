import { Search, X } from 'lucide-react'
import { categories, type CategoryId } from '../data/menu'

export interface Filters {
  query: string
  category: CategoryId | 'all'
  vegOnly: boolean
  maxPrice: number | null
}

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
  visibleCategories: CategoryId[]
  showPrice: boolean
  priceCeiling: number
}

export function MenuFilters({ filters, onChange, visibleCategories, showPrice, priceCeiling }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })
  const tabs = [{ id: 'all' as const, label: 'All' }, ...categories.filter((c) => visibleCategories.includes(c.id))]

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <label htmlFor="menu-search" className="sr-only">
            Search dishes by name
          </label>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ivory/50" aria-hidden="true" />
          <input
            id="menu-search"
            type="search"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Search dishes, e.g. tenga"
            className="field !pl-11"
            autoComplete="off"
          />
          {filters.query && (
            <button type="button" onClick={() => set({ query: '' })} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full hover:bg-ivory/10">
              <X size={16} />
            </button>
          )}
        </div>

        <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-ivory/25 px-4 text-sm">
          <input type="checkbox" checked={filters.vegOnly} onChange={(e) => set({ vegOnly: e.target.checked })} className="h-4 w-4 accent-terracotta" />
          Vegetarian only
        </label>

        {showPrice && (
          <label className="flex min-h-12 items-center gap-3 rounded-lg border border-ivory/25 px-4 text-sm">
            Max price
            <input
              type="range"
              min={0}
              max={priceCeiling}
              step={10}
              value={filters.maxPrice ?? priceCeiling}
              onChange={(e) => set({ maxPrice: Number(e.target.value) >= priceCeiling ? null : Number(e.target.value) })}
              className="accent-terracotta"
              aria-valuetext={filters.maxPrice === null ? 'No limit' : `Up to ${filters.maxPrice} rupees`}
            />
            <span className="w-16 tabular-nums">{filters.maxPrice === null ? 'Any' : `₹${filters.maxPrice}`}</span>
          </label>
        )}
      </div>

      <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => {
          const on = filters.category === t.id
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => set({ category: t.id })}
              className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                on ? 'border-brass bg-brass text-midnight' : 'border-ivory/25 hover:border-ivory/60'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
