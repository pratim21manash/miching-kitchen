import { Link, useNavigate } from 'react-router-dom'
import { ArrowDown, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Poster } from '../components/Poster'
import { Reveal, useParallax } from '../components/Reveal'
import { Magnetic } from '../components/Magnetic'
import { ThaliExperience } from '../components/ThaliExperience'
import { DishCard } from '../components/DishCard'
import { ContactActions } from '../components/ContactActions'
import { dishes } from '../data/menu'
import { locationLine, site } from '../data/site'

const signature = dishes.filter((d) => ['assamese-thali', 'masor-tenga', 'khar', 'aloo-pitika', 'bamboo-shoot', 'pitha'].includes(d.id))

export default function Home() {
  const navigate = useNavigate()
  const bg = useParallax<HTMLDivElement>(70)

  return (
    <>
      <Seo
        path="/"
        title="Assamese Miching Kitchen | Assamese Restaurant in Ganeshguri, Guwahati"
        description="Traditional Assamese cuisine in Ganeshguri, Guwahati. Explore dishes in 3D, browse the menu and plan your visit to Assamese Miching Kitchen."
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <div ref={bg} className="absolute inset-x-0 -top-16 bottom-0 -z-20" aria-hidden="true">
          <Poster name="thaliHero" decorative eager className="h-full w-full" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/40" aria-hidden="true" />
        <div className="container-x pb-24 pt-40 sm:pb-28">
          <p className="eyebrow">A Taste of Assam</p>
          <h1 className="display mt-5 max-w-4xl">
            Tradition, Served
            <br />
            <em className="font-medium italic text-brass-light">With Soul.</em>
          </h1>
          <p className="lead mt-6 max-w-xl">
            Discover the rich flavours of Assam through traditional recipes, regional ingredients, and the warmth of Northeast Indian hospitality.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link to="/menu" className="btn btn-primary w-full sm:w-auto">
                Explore Our Menu
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/story" className="btn btn-ghost w-full sm:w-auto">
                Discover Our Story
              </Link>
            </Magnetic>
          </div>
          <p className="mt-10 flex items-center gap-2 text-sm text-ivory/80">
            <MapPin size={16} className="text-brass-light" aria-hidden="true" /> {locationLine}
          </p>
        </div>
        <a href="#thali" aria-label="Scroll to the 3D dish" className="absolute bottom-6 right-6 hidden h-12 w-12 place-items-center rounded-full border border-ivory/40 sm:grid">
          <ArrowDown size={18} />
        </a>
        <div className="textile-band absolute inset-x-0 bottom-0" aria-hidden="true" />
      </section>

      {/* 3D */}
      <section id="thali" className="section bg-forest-950">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">The Assamese Thali</p>
            <h2 className="h2 mt-3">Turn the plate. Meet every dish.</h2>
            <p className="lead mt-4">
              A traditional Assamese meal is a thali of small dishes built around rice. Rotate the plate and open each component.
            </p>
          </Reveal>
          <ThaliExperience />
        </div>
      </section>

      {/* Signature dishes */}
      <section className="section bg-midnight">
        <div className="container-x">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Signature Dishes</p>
              <h2 className="h2 mt-3">Flavours of Assam</h2>
              <p className="lead mt-4">Classic dishes of Assamese cuisine. The restaurant's final menu and prices are being confirmed.</p>
            </div>
            <Link to="/menu" className="btn btn-ghost">
              View Full Menu
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {signature.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 0.08}>
                <DishCard dish={d} onView={(id) => navigate(`/menu?dish=${id}`)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-ivory text-midnight">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="clip" className="aspect-[4/5] overflow-hidden rounded-2xl">
            <Poster name="thaliWide" className="h-full w-full" />
          </Reveal>
          <Reveal>
            <p className="eyebrow !text-terracotta">Our Heritage</p>
            <h2 className="h2 mt-3">More Than a Meal. A Heritage.</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-midnight/80">
              <p>
                Assamese cooking is known for gentle spicing and a wide range of techniques: steaming, fermenting, poaching and slow roasting. Rice is the staple, and a meal is traditionally eaten with a little rice in each mouthful.
              </p>
              <p>
                The cuisine draws on the hills, which favour fermentation and drying, and the Brahmaputra plains, with their fresh vegetables, greens, fish and meat. Across Assam, communities such as the Mising, Bodo and others each bring their own dishes, herbs and ways of cooking, so Assamese food is a conversation between many traditions rather than a single one.
              </p>
              <p>
                How Assamese Miching Kitchen draws on these traditions is told in the restaurant's own words on the story page.
              </p>
            </div>
            <Link to="/story" className="btn btn-primary mt-8">
              Read Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why dine */}
      <section className="section bg-forest-900">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why Dine With Us</p>
            <h2 className="h2 mt-3">Rooted in flavour, served with warmth</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ['Traditional flavours', 'Dishes inspired by classic Assamese preparations, from tangy fish curries to simple, honest greens.'],
              ['Regional inspiration', 'A kitchen that celebrates Assamese and Mising food traditions of Northeast India.'],
              ['Hospitality', 'Northeast Indian hospitality is built around sharing a meal, and that is the spirit we aim to serve in.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="border-t border-brass/50 pt-5">
                  <h3 className="h3">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/75">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-xs text-ivory/50">
            Details about preparation practices, sourcing and atmosphere will be added once confirmed by the restaurant.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-midnight text-center">
        <div className="textile-zigzag mx-auto mb-12 w-24 rounded-sm" aria-hidden="true" />
        <div className="container-x">
          <Reveal>
            <h2 className="display !text-[clamp(2.4rem,6vw,5rem)]">Your Next Favourite Meal Awaits.</h2>
            <p className="lead mx-auto mt-5 max-w-xl">
              {site.name}, {locationLine}.
            </p>
            <div className="mt-10 flex justify-center">
              <ContactActions showMenu />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
