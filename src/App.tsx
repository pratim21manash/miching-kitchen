import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { CursorGlow } from './components/CursorGlow'
import { usePrefersReducedMotion } from './lib/hooks'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Story from './pages/Story'
import Visit from './pages/Visit'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/story" element={<Story />} />
            <Route path="/visit" element={<Visit />} />
            <Route
              path="*"
              element={
                <div className="container-x grid min-h-[70svh] place-items-center text-center">
                  <div>
                    <h1 className="display">Page not found</h1>
                    <a href="/" className="btn btn-primary mt-8">Back to Home</a>
                  </div>
                </div>
              }
            />
          </Routes>
          <Footer />
        </motion.main>
      </AnimatePresence>
      <CartDrawer />
      <CursorGlow />
    </>
  )
}
