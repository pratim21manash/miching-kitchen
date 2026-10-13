/**
 * Image registry. Every image on the site comes from here.
 *
 * - `src: null` renders an illustrated poster (never a broken image).
 * - To use your own licensed photos, put files in /public/images and set
 *   `src: '/images/your-file.webp'` and fill in `credit`.
 * - Wikimedia Commons entries are hotlinked via Special:FilePath. Confirm the
 *   exact licence on the Commons file page before launch (see `credit`).
 */
export type Tone = 'forest' | 'terracotta' | 'brass' | 'midnight'

export interface ImageSlot {
  src: string | null
  alt: string
  label: string
  tone: Tone
  credit?: string
  position?: string
}

const commons = (file: string, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`

const THALI_FILE = 'Assamese vegetarian thali.jpg'
const THALI_CREDIT =
  'Wikimedia Commons, "Assamese vegetarian thali.jpg" (verify licence and author on the Commons file page before launch)'

export const images = {
  thaliHero: {
    src: commons(THALI_FILE, 1600),
    alt: 'A vegetarian Assamese thali with rice and several small bowls of side dishes',
    label: 'Assamese thali',
    tone: 'forest',
    credit: THALI_CREDIT,
  },
  thaliDetail: {
    src: commons(THALI_FILE, 900),
    alt: 'Close view of an Assamese vegetarian thali with rice and side dishes',
    label: 'Assamese thali',
    tone: 'brass',
    credit: THALI_CREDIT,
    position: '35% 55%',
  },
  thaliWide: {
    src: commons(THALI_FILE, 1200),
    alt: 'Assamese vegetarian thali served with rice, lentils and vegetable dishes',
    label: 'Assamese thali',
    tone: 'terracotta',
    credit: THALI_CREDIT,
    position: '70% 45%',
  },
  masorTenga: {
    src: null,
    alt: 'Masor tenga, a sour fish curry (photo to be added)',
    label: 'Masor tenga',
    tone: 'terracotta',
  },
  khar: {
    src: null,
    alt: 'Khar, a traditional alkaline Assamese preparation (photo to be added)',
    label: 'Khar',
    tone: 'brass',
  },
  alooPitika: {
    src: null,
    alt: 'Aloo pitika, mashed potato with mustard oil (photo to be added)',
    label: 'Aloo pitika',
    tone: 'forest',
  },
  xaakBhaji: {
    src: null,
    alt: 'Xaak bhaji, stir-fried leafy greens (photo to be added)',
    label: 'Xaak bhaji',
    tone: 'forest',
  },
  bambooShoot: {
    src: null,
    alt: 'A bamboo shoot preparation (photo to be added)',
    label: 'Bamboo shoot',
    tone: 'midnight',
  },
  rice: {
    src: null,
    alt: 'Steamed rice, the staple of an Assamese meal (photo to be added)',
    label: 'Rice',
    tone: 'brass',
  },
  pitha: {
    src: null,
    alt: 'Pitha, traditional Assamese rice cakes (photo to be added)',
    label: 'Pitha',
    tone: 'terracotta',
  },
  interior: {
    src: null,
    alt: 'Restaurant interior (photo to be added)',
    label: 'Restaurant interior',
    tone: 'midnight',
  },
  kitchen: {
    src: null,
    alt: 'Food preparation in the kitchen (photo to be added)',
    label: 'In the kitchen',
    tone: 'terracotta',
  },
  textile: {
    src: null,
    alt: 'Traditional woven textile detail (photo to be added)',
    label: 'Woven textile',
    tone: 'forest',
  },
  bamboo: {
    src: null,
    alt: 'Bamboo and natural materials (photo to be added)',
    label: 'Bamboo and wood',
    tone: 'brass',
  },
} satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images
