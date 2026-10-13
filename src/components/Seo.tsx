import { useEffect } from 'react'
import { site, telHref } from '../data/site'

interface Props {
  title: string
  description: string
  path: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Per-page title, description, Open Graph, canonical, and Restaurant JSON-LD built only from verified data. */
export function Seo({ title, description, path }: Props) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'restaurant.restaurant')
    setMeta('property', 'og:site_name', site.name)
    setMeta('name', 'twitter:card', 'summary')

    const url = site.domain ? `${site.domain.replace(/\/$/, '')}${path}` : null
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (url) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = url
      setMeta('property', 'og:url', url)
    } else canonical?.remove()

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: site.name,
      servesCuisine: 'Assamese',
      address: {
        '@type': 'PostalAddress',
        ...(site.streetAddress ? { streetAddress: site.streetAddress } : {}),
        addressLocality: `${site.locality}, ${site.city}`,
        addressRegion: site.region,
        ...(site.postalCode ? { postalCode: site.postalCode } : {}),
        addressCountry: 'IN',
      },
      ...(url ? { url } : {}),
      ...(telHref ? { telephone: site.phone } : {}),
      ...(site.email ? { email: site.email } : {}),
      ...(site.latitude !== null && site.longitude !== null
        ? { geo: { '@type': 'GeoCoordinates', latitude: site.latitude, longitude: site.longitude } }
        : {}),
      ...(site.openingHours ? { openingHours: site.openingHours.map((h) => `${h.days} ${h.hours}`) } : {}),
    }
    let ld = document.getElementById('ld-restaurant') as HTMLScriptElement | null
    if (!ld) {
      ld = document.createElement('script')
      ld.id = 'ld-restaurant'
      ld.type = 'application/ld+json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(data)
  }, [title, description, path])

  return null
}
