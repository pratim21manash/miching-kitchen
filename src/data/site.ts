/**
 * SINGLE SOURCE OF TRUTH for business details.
 *
 * Anything set to `null` is UNVERIFIED and is intentionally not shown as fact
 * anywhere on the site (including structured data). Fill these in with details
 * confirmed by the restaurant owner and the site updates everywhere.
 */
export type OpeningHours = { days: string; hours: string }

export const site = {
  name: 'Assamese Miching Kitchen',
  locality: 'Ganeshguri',
  city: 'Guwahati',
  region: 'Assam',
  country: 'India',

  // ---- TO CONFIRM WITH THE OWNER --------------------------------------
  streetAddress: null as string | null, // e.g. "Shop 3, GS Road, Ganeshguri"
  postalCode: null as string | null,
  phone: null as string | null, // international format, e.g. "+91XXXXXXXXXX"
  whatsapp: null as string | null, // digits only with country code, e.g. "91XXXXXXXXXX"
  email: null as string | null,
  openingHours: null as OpeningHours[] | null,
  /** Production domain, e.g. "https://example.com" (enables canonical + sitemap URLs). */
  domain: null as string | null,
  /** Exact Google Maps share link, once the pin is verified. */
  googleMapsUrl: null as string | null,
  latitude: null as number | null,
  longitude: null as number | null,

  ordering: {
    /** No payment gateway is connected. Orders are enquiries only. */
    onlineCheckout: false,
    /** Cart hands off to WhatsApp when a number is set, otherwise offers copy-to-clipboard. */
    enquiryFlow: true,
    /** Verified tax/charges. null = not applicable / unknown, nothing is added. */
    taxPercent: null as number | null,
  },
  reservations: { acceptsEnquiries: true },
} as const

export const locationLine = `${site.locality}, ${site.city}, ${site.region}`
export const fullLocationLine = `${locationLine}, ${site.country}`

const mapQuery = encodeURIComponent(
  [site.name, site.streetAddress, site.locality, site.city, site.region].filter(Boolean).join(', '),
)
export const mapsSearchUrl = site.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`

export const telHref = site.phone ? `tel:${site.phone}` : null
export const waHref = (text?: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : null
