import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2, X, MessageCircle, ClipboardCopy } from 'lucide-react'
import { getDish } from '../data/menu'
import { site, waHref } from '../data/site'
import { useCart } from '../store/cart'
import { useDialog } from '../lib/hooks'

const rupee = (n: number) => `₹${n.toLocaleString('en-IN')}`

export function CartDrawer() {
  const { items, cartOpen, setCartOpen, setQty, remove, clear } = useCart()
  const [copied, setCopied] = useState(false)
  const close = () => setCartOpen(false)
  const ref = useDialog<HTMLDivElement>(cartOpen, close)

  const lines = Object.entries(items)
    .map(([id, qty]) => ({ dish: getDish(id), qty }))
    .filter((l): l is { dish: NonNullable<ReturnType<typeof getDish>>; qty: number } => !!l.dish)

  const allPriced = lines.length > 0 && lines.every((l) => l.dish.price !== null)
  const subtotal = allPriced ? lines.reduce((a, l) => a + (l.dish.price as number) * l.qty, 0) : null
  const tax = subtotal !== null && site.ordering.taxPercent ? (subtotal * site.ordering.taxPercent) / 100 : 0
  const total = subtotal !== null ? subtotal + tax : null

  const message = [
    `Hello ${site.name}! I'd like to enquire about these items:`,
    ...lines.map((l) => `- ${l.dish.name} x ${l.qty}`),
    total !== null ? `Estimated total: ${rupee(total)}` : 'Please confirm availability and prices.',
  ].join('\n')

  const wa = waHref(message)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Your order enquiry"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-forest-950 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="textile-band" aria-hidden="true" />
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="h3">Your Order Enquiry</h2>
              <button type="button" data-autofocus onClick={close} aria-label="Close order list" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30">
                <X size={20} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="lead">Your list is empty.</p>
                <Link to="/menu" onClick={close} className="btn btn-primary">
                  Browse the Menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ivory/10 overflow-y-auto px-6">
                  {lines.map(({ dish, qty }) => (
                    <li key={dish.id} className="flex items-center gap-3 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{dish.name}</p>
                        <p className="text-sm text-ivory/60">
                          {dish.price !== null ? rupee(dish.price) : 'Price to be confirmed'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1" role="group" aria-label={`Quantity for ${dish.name}`}>
                        <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/30" onClick={() => setQty(dish.id, qty - 1)} aria-label={`Decrease ${dish.name}`}>
                          <Minus size={15} />
                        </button>
                        <motion.span key={qty} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="w-7 text-center tabular-nums" aria-live="polite">
                          {qty}
                        </motion.span>
                        <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/30" onClick={() => setQty(dish.id, qty + 1)} aria-label={`Increase ${dish.name}`}>
                          <Plus size={15} />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(dish.id)} className="grid h-9 w-9 place-items-center rounded-full text-ivory/60 hover:text-terracotta" aria-label={`Remove ${dish.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-ivory/10 px-6 py-5">
                  {subtotal !== null ? (
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between"><dt>Subtotal</dt><dd>{rupee(subtotal)}</dd></div>
                      {tax > 0 && <div className="flex justify-between"><dt>Tax ({site.ordering.taxPercent}%)</dt><dd>{rupee(tax)}</dd></div>}
                      <div className="flex justify-between text-base font-semibold"><dt>Estimated total</dt><dd>{rupee(total as number)}</dd></div>
                    </dl>
                  ) : (
                    <p className="text-sm text-ivory/70">Prices are being confirmed with the restaurant, so no total is shown yet.</p>
                  )}
                  <p className="text-xs text-ivory/60">
                    This is an enquiry, not a confirmed order. No payment is taken on this website.
                  </p>
                  {wa ? (
                    <a href={wa} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                      <MessageCircle size={17} /> Send Enquiry on WhatsApp
                    </a>
                  ) : (
                    <>
                      <button type="button" onClick={copy} className="btn btn-primary w-full">
                        <ClipboardCopy size={17} /> {copied ? 'Copied to clipboard' : 'Copy Order Enquiry'}
                      </button>
                      <p className="text-xs text-ivory/60" role="status">
                        The restaurant's WhatsApp number isn't configured yet. Copy your list and send it once contact details are confirmed.
                      </p>
                    </>
                  )}
                  <button type="button" onClick={clear} className="btn btn-ghost btn-sm w-full">
                    Clear list
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
