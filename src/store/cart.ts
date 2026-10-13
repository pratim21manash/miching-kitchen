import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getDish } from '../data/menu'

interface CartState {
  items: Record<string, number>
  cartOpen: boolean
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  setCartOpen: (open: boolean) => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      cartOpen: false,
      add: (id, qty = 1) =>
        set((s) => ({ items: { ...s.items, [id]: Math.min(20, (s.items[id] ?? 0) + qty) } })),
      setQty: (id, qty) =>
        set((s) => {
          const items = { ...s.items }
          if (qty <= 0) delete items[id]
          else items[id] = Math.min(20, qty)
          return { items }
        }),
      remove: (id) =>
        set((s) => {
          const items = { ...s.items }
          delete items[id]
          return { items }
        }),
      clear: () => set({ items: {} }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
    }),
    {
      name: 'amk-cart-v1',
      partialize: (s) => ({ items: s.items }),
      // Drop items that no longer exist in the menu data.
      merge: (persisted, current) => {
        const p = (persisted as Partial<CartState> | undefined)?.items ?? {}
        const items = Object.fromEntries(Object.entries(p).filter(([id]) => getDish(id)))
        return { ...current, items }
      },
    },
  ),
)

export const selectCount = (s: CartState) => Object.values(s.items).reduce((a, b) => a + b, 0)
