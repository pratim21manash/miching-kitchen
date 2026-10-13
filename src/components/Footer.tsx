import { Link } from 'react-router-dom'
import { fullLocationLine, site } from '../data/site'
import { images } from '../data/images'

const thaliCredit = images.thaliHero.credit

export function Footer() {
  return (
    <footer className="bg-midnight">
      <div className="textile-band" aria-hidden="true" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-bold">{site.name}</p>
          <p className="mt-2 text-sm text-ivory/70">{fullLocationLine}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          <Link className="py-1 hover:text-brass-light" to="/">Home</Link>
          <Link className="py-1 hover:text-brass-light" to="/story">Our Story</Link>
          <Link className="py-1 hover:text-brass-light" to="/menu">Menu</Link>
          <Link className="py-1 hover:text-brass-light" to="/visit">Visit Us</Link>
        </nav>
        <p className="text-xs leading-relaxed text-ivory/50">
          Menu items shown are subject to confirmation by the restaurant.
          {thaliCredit ? <> Image credit: {thaliCredit}.</> : null}
        </p>
      </div>
    </footer>
  )
}
