/**
 * MENU DATA — single source of truth for dishes.
 *
 * IMPORTANT: These are CANDIDATE dishes drawn from general Assamese cuisine.
 * They are NOT confirmed items on the restaurant's menu. For every dish:
 *   - price: null  -> price not verified (shown as "Price to be confirmed")
 *   - vegetarian: null -> not verified (no dietary label shown)
 *   - allergens: null  -> not verified (nothing claimed)
 *   - available: false -> shows "Availability to be confirmed"
 * Set `confirmed: true`, plus real values, once the owner approves each item.
 */
import type { ImageKey } from './images'

export type CategoryId = 'signature' | 'thali' | 'fish-meat' | 'vegetarian' | 'rice-sides' | 'desserts'

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'signature', label: 'Signature Dishes' },
  { id: 'thali', label: 'Assamese Thalis' },
  { id: 'fish-meat', label: 'Fish and Meat' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'rice-sides', label: 'Rice and Sides' },
  { id: 'desserts', label: 'Desserts and Pitha' },
]

export interface Dish {
  id: string
  name: string
  assameseName?: string
  category: CategoryId
  /** Extra categories the dish should also appear under. */
  alsoIn?: CategoryId[]
  image: ImageKey
  short: string
  description: string
  /** Typical ingredients in the traditional preparation (general, not a recipe claim by the restaurant). */
  typicalIngredients: string[]
  price: number | null
  vegetarian: boolean | null
  allergens: string[] | null
  serving: string | null
  available: boolean
  confirmed: boolean
  has3d?: boolean
  related: string[]
}

export const dishes: Dish[] = [
  {
    id: 'assamese-thali',
    name: 'Assamese Thali',
    assameseName: 'অসমীয়া থালি',
    category: 'thali',
    alsoIn: ['signature'],
    image: 'thaliHero',
    short: 'A shared plate of rice with khar, dal, greens, chutney and more.',
    description:
      'A traditional Assamese meal is built around rice, served with a spread of small dishes that balance sour, bitter, savoury and fresh flavours. Guides to Assamese food describe a thali that typically includes khar, dal, a stir-fried greens dish, a vegetable preparation, chutney and papad, often with a fish or meat dish alongside. The exact items served at Assamese Miching Kitchen are to be confirmed.',
    typicalIngredients: ['Rice', 'Dal', 'Seasonal greens', 'Vegetables', 'Chutney', 'Papad', 'Curd'],
    price: null,
    vegetarian: null,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    has3d: true,
    related: ['khar', 'masor-tenga', 'xaak-bhaji'],
  },
  {
    id: 'masor-tenga',
    name: 'Masor Tenga',
    assameseName: 'মাছৰ টেঙা',
    category: 'fish-meat',
    alsoIn: ['signature'],
    image: 'masorTenga',
    short: 'A light, tangy fish curry that is a staple of Assamese meals.',
    description:
      'Masor tenga is a sour fish curry, widely described as an iconic part of an Assamese thali. Its tang traditionally comes from souring agents such as tomato, lemon or elephant apple, and it is cooked light rather than heavy with spice.',
    typicalIngredients: ['Fish', 'Tomato or other souring agent', 'Ginger', 'Fresh coriander'],
    price: null,
    vegetarian: false,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['assamese-thali', 'plain-rice'],
  },
  {
    id: 'khar',
    name: 'Khar',
    assameseName: 'খাৰ',
    category: 'rice-sides',
    alsoIn: ['signature'],
    image: 'khar',
    short: 'The traditional alkaline dish that begins an Assamese meal.',
    description:
      'Khar is a signature Assamese preparation made with an alkaline filtrate, traditionally derived from sun-dried banana peel ash, combined with ingredients such as raw papaya or pulses. A traditional Assamese meal is commonly described as starting with khar.',
    typicalIngredients: ['Raw papaya or pulses', 'Alkaline filtrate (traditionally from banana peel ash)'],
    price: null,
    vegetarian: null,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['assamese-thali', 'plain-rice'],
  },
  {
    id: 'aloo-pitika',
    name: 'Aloo Pitika',
    assameseName: 'আলু পিটিকা',
    category: 'vegetarian',
    alsoIn: ['rice-sides'],
    image: 'alooPitika',
    short: 'Mashed potato with mustard oil, chilli and fresh herbs.',
    description:
      'Aloo pitika is a mashed potato side found in many Assamese homes and commonly served with rice and dal. It is typically seasoned with raw mustard oil, onion, green chilli and coriander.',
    typicalIngredients: ['Potato', 'Mustard oil', 'Onion', 'Green chilli', 'Coriander'],
    price: null,
    vegetarian: true,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['plain-rice', 'xaak-bhaji'],
  },
  {
    id: 'xaak-bhaji',
    name: 'Xaak Bhaji',
    category: 'vegetarian',
    image: 'xaakBhaji',
    short: 'Seasonal leafy greens, lightly stir-fried.',
    description:
      'Xaak bhaji is an assortment of greens stir-fried with minimal spice and often a little ginger. Assamese cooking is known for its wide variety of greens and herbs.',
    typicalIngredients: ['Seasonal leafy greens', 'Ginger', 'Light seasoning'],
    price: null,
    vegetarian: true,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['assamese-thali', 'aloo-pitika'],
  },
  {
    id: 'bamboo-shoot',
    name: 'Bamboo Shoot Preparations',
    category: 'fish-meat',
    image: 'bambooShoot',
    short: 'Bamboo shoot (khorisa), a defining ingredient of the region.',
    description:
      'Bamboo shoot, known in Assamese as khorisa, is widely used across Assamese and Northeast Indian cooking, fresh or fermented, often paired with pork, chicken or fish. Which bamboo shoot dishes the restaurant serves is to be confirmed.',
    typicalIngredients: ['Bamboo shoot', 'Meat or fish (varies by dish)'],
    price: null,
    vegetarian: null,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['assamese-thali', 'plain-rice'],
  },
  {
    id: 'plain-rice',
    name: 'Steamed Rice',
    category: 'rice-sides',
    image: 'rice',
    short: 'Rice is the heart of an Assamese meal.',
    description:
      'Assam is a paddy-growing region and rice is the staple of the cuisine; the meal is traditionally eaten with a little rice in each mouthful. Aromatic local rice varieties such as joha are associated with Assamese meals. Which rice the restaurant serves is to be confirmed.',
    typicalIngredients: ['Rice'],
    price: null,
    vegetarian: null,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['masor-tenga', 'aloo-pitika'],
  },
  {
    id: 'pitha',
    name: 'Pitha',
    category: 'desserts',
    image: 'pitha',
    short: 'Traditional Assamese rice cakes, sweet and savoury.',
    description:
      'Pitha are rice-based cakes, rolls and pancakes made across Assam, with many regional varieties and a close association with Bihu celebrations. Which varieties the restaurant offers is to be confirmed.',
    typicalIngredients: ['Rice flour', 'Coconut, sesame or jaggery fillings (varies)'],
    price: null,
    vegetarian: null,
    allergens: null,
    serving: null,
    available: false,
    confirmed: false,
    related: ['assamese-thali'],
  },
]

export const getDish = (id: string) => dishes.find((d) => d.id === id)
export const inCategory = (d: Dish, c: CategoryId) => d.category === c || d.alsoIn?.includes(c) === true
export const hasVerifiedPrices = dishes.some((d) => d.price !== null)

/** Hotspot components for the 3D thali. Descriptions are general, not menu claims. */
export interface ThaliPart {
  id: string
  name: string
  description: string
  ingredients: string[]
  position: [number, number, number]
}
export const thaliParts: ThaliPart[] = [
  {
    id: 'rice',
    name: 'Rice',
    description: 'The staple of the meal. Each mouthful is traditionally taken with a little rice.',
    ingredients: ['Rice'],
    position: [-0.2, 0.55, 0.1],
  },
  {
    id: 'khar',
    name: 'Khar',
    description: 'An alkaline preparation traditionally served first in an Assamese meal.',
    ingredients: ['Raw papaya or pulses', 'Banana-peel-ash filtrate'],
    position: [1.15, 0.35, 0.2],
  },
  {
    id: 'tenga',
    name: 'Masor tenga',
    description: 'A light, tangy fish curry, soured with tomato or other agents.',
    ingredients: ['Fish', 'Tomato or lemon', 'Ginger'],
    position: [0.55, 0.35, 1.05],
  },
  {
    id: 'dal',
    name: 'Dal',
    description: 'A simple lentil preparation, a staple of the thali.',
    ingredients: ['Lentils', 'Mustard oil', 'Light tempering'],
    position: [-0.7, 0.35, 1.0],
  },
  {
    id: 'pitika',
    name: 'Aloo pitika',
    description: 'Mashed potato with mustard oil, onion and green chilli.',
    ingredients: ['Potato', 'Mustard oil', 'Onion', 'Green chilli'],
    position: [-1.2, 0.35, -0.1],
  },
  {
    id: 'xaak',
    name: 'Xaak bhaji',
    description: 'Seasonal greens, lightly stir-fried.',
    ingredients: ['Leafy greens', 'Ginger'],
    position: [-0.5, 0.35, -1.05],
  },
  {
    id: 'chutney',
    name: 'Tomato chutney',
    description: 'A bright, tangy chutney to lift the plate.',
    ingredients: ['Tomato', 'Spices'],
    position: [0.7, 0.35, -1.0],
  },
]
