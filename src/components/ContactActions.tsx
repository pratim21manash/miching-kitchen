import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { mapsDirectionsUrl, mapsSearchUrl, telHref, waHref } from '../data/site'

/** Buttons only render as real links when the underlying detail is verified; otherwise a clear note is shown. */
export function ContactActions({ showMenu = false }: { showMenu?: boolean }) {
  const wa = waHref('Hello! I would like to enquire about Assamese Miching Kitchen.')
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {showMenu && (
        <Link to="/menu" className="btn btn-primary">
          Explore the Menu
        </Link>
      )}
      <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="btn btn-brass">
        <Navigation size={17} /> Get Directions
      </a>
      <a href={mapsSearchUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
        <MapPin size={17} /> Open in Google Maps
      </a>
      {telHref ? (
        <a href={telHref} className="btn btn-ghost">
          <Phone size={17} /> Call the Restaurant
        </a>
      ) : (
        <Link to="/visit#contact" className="btn btn-ghost">
          <Phone size={17} /> Call the Restaurant
        </Link>
      )}
      {wa && (
        <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <MessageCircle size={17} /> WhatsApp
        </a>
      )}
    </div>
  )
}
