import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { site } from '../data/site'
import { selectCount, useCart } from '../store/cart'
import { useDialog } from '../lib/hooks'
import { Magnetic } from './Magnetic'

const links = [
  { to: '/', label: 'Home' },
  { to: '/story', label: 'Our Story' },
  { to: '/menu', label: 'Menu' },
  { to: '/visit', label: 'Visit Us' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const count = useCart(selectCount)
  const setCartOpen = useCart((s) => s.setCartOpen)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  const drawerRef = useDialog<HTMLDivElement>(open, () => setOpen(false))

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[100] rounded bg-ivory px-4 py-2 text-midnight">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-forest-950/95 shadow-lg shadow-black/30 backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
          <Link to="/" className="flex flex-col leading-none" aria-label={`${site.name}, home`}>
            <span className="font-serif text-xl font-bold tracking-wide sm:text-2xl">Assamese Miching</span>
            <span className="eyebrow !text-[0.6rem] !tracking-[0.4em]">Kitchen</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-wide transition-colors hover:text-brass-light ${
                    isActive ? 'text-brass-light after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-brass-light' : ''
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10"
              aria-label={`Open order list, ${count} ${count === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={19} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[0.7rem] font-semibold"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <span className="hidden sm:block">
              <Magnetic>
                <Link to="/menu" className="btn btn-primary btn-sm">
                  Order Food
                </Link>
              </Magnetic>
            </span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col bg-forest-950 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="textile-band" aria-hidden="true" />
            <div className="container-x flex h-[4.5rem] items-center justify-between">
              <span className="font-serif text-xl font-bold">Assamese Miching Kitchen</span>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 font-serif text-5xl font-semibold ${isActive ? 'text-brass-light' : ''}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
                <Link to="/menu" className="btn btn-primary w-full">
                  Order Food
                </Link>
                <p className="eyebrow mt-6 text-center !text-ivory/60">
                  {site.locality}, {site.city}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
