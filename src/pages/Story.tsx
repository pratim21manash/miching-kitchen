import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Poster } from '../components/Poster'
import { Reveal } from '../components/Reveal'
import { Gallery, type GalleryItem } from '../components/Lightbox'
import type { ImageKey } from '../data/images'

/**
 * Owner-editable content. Replace the placeholder strings in `ownerStory`
 * with the restaurant's own verified words. Nothing here asserts a founder,
 * year, award or family history.
 */
const ownerStory = {
  origin: null as string | null,
  people: null as string | null,
  philosophy: null as string | null,
}

const journey: { key: ImageKey; title: string; text: string }[] = [
  { key: 'kitchen', title: 'From the kitchen', text: 'Assamese cooking favours steaming, fermenting, poaching and slow roasting over heavy frying, with gentle use of spice.' },
  { key: 'rice', title: 'Rice at the centre', text: 'Assam is a paddy-growing region. Rice anchors the meal, and every dish is eaten with a little rice in each mouthful.' },
  { key: 'bamboo', title: 'Bamboo and natural materials', text: 'Bamboo shoot, known as khorisa, is a defining ingredient, and bamboo even gives its name to a cooking method.' },
  { key: 'textile', title: 'Woven traditions', text: 'Weaving is a living craft in Assam. Our red-and-ivory accents are a respectful nod to its colours, not a claim to any specific motif.' },
]

const gallery: GalleryItem[] = [
  { key: 'thaliHero', caption: 'An Assamese thali', span: 'col-span-2 md:col-span-2' },
  { key: 'masorTenga', caption: 'Masor tenga' },
  { key: 'interior', caption: 'The dining room' },
  { key: 'kitchen', caption: 'In the kitchen' },
  { key: 'khar', caption: 'Khar' },
  { key: 'textile', caption: 'Woven textile detail' },
  { key: 'pitha', caption: 'Pitha' },
]

export default function Story() {
  return (
    <>
      <Seo
        path="/story"
        title="Our Story | Assamese Miching Kitchen, Guwahati"
        description="The story behind Assamese Miching Kitchen: traditional Assamese and Mising-inspired food, served in Ganeshguri, Guwahati."
      />
      <PageHero eyebrow="Our Story" title="Rooted in Assam. Made to Be Shared." image="thaliDetail" />

      <section className="section bg-midnight">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">The Kitchen</p>
            <h2 className="h2 mt-3">Where the food comes from</h2>
          </Reveal>
          <Reveal className="space-y-8">
            {(
              [
                ['Our origin', ownerStory.origin],
                ['The people behind the kitchen', ownerStory.people],
                ['Our philosophy', ownerStory.philosophy],
              ] as const
            ).map(([h, body]) => (
              <div key={h}>
                <h3 className="h3">{h}</h3>
                <p className="lead mt-2">
                  {body ?? 'The restaurant’s own words will appear here. This section is waiting for details confirmed by the owner, so nothing has been invented.'}
                </p>
              </div>
            ))}
            <div className="rounded-lg border border-brass/40 bg-brass/10 p-4 text-sm text-ivory/85" role="note">
              Assamese Miching Kitchen is located in Ganeshguri, Guwahati. The name reflects Assamese and Mising food traditions; Mising (also spelled Mishing) cooking, like Bodo cooking, is described as easy on spice and rich in herbs and greens.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-forest-950">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">A Cultural Journey</p>
            <h2 className="h2 mt-3">The ingredients and ideas behind Assamese food</h2>
          </Reveal>
          <div className="mt-16 space-y-20">
            {journey.map((j, i) => (
              <div key={j.key} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <Reveal variant="clip" className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <Poster name={j.key} className="h-full w-full" />
                </Reveal>
                <Reveal>
                  <h3 className="h2 !text-4xl">{j.title}</h3>
                  <p className="lead mt-4">{j.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-midnight">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h2 className="h2 mt-3">A look inside</h2>
            <p className="lead mt-3">Tap any image to view it full screen. Use the arrow keys to browse.</p>
          </Reveal>
          <Gallery items={gallery} />
        </div>
      </section>

      <section className="section bg-ivory text-center text-midnight">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow !text-terracotta">Our Philosophy</p>
            <p className="mx-auto mt-6 max-w-4xl font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] font-semibold leading-tight">
              Authentic flavour. Generous hospitality. A cuisine worth sharing.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-midnight/70">
              Regional food holds the memory of a place. We believe it deserves to be served with care.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
