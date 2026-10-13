import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ContactActions } from '../components/ContactActions'
import { ReservationForm } from '../components/ReservationForm'
import { fullLocationLine, mapsEmbedUrl, site, telHref, waHref } from '../data/site'

const TBC = 'To be confirmed by the restaurant.'

const faqs: { q: string; a: string; confirmed: boolean }[] = [
  { q: 'Where is the restaurant?', a: `${site.name} is in ${fullLocationLine}. ${site.streetAddress ? `Address: ${site.streetAddress}.` : 'The full street address is being confirmed. Use the map or directions buttons above.'}`, confirmed: true },
  { q: 'What are the opening hours?', a: TBC, confirmed: !!site.openingHours },
  { q: 'Is the full menu available online?', a: 'The menu page shows classic Assamese dishes while the restaurant confirms its final menu and prices.', confirmed: true },
  { q: 'Are there vegetarian options?', a: 'Assamese cuisine includes many vegetarian dishes such as aloo pitika and xaak bhaji. Which ones are served is to be confirmed.', confirmed: false },
  { q: 'Is parking available?', a: TBC, confirmed: false },
  { q: 'Do you take reservations?', a: 'You can send a table enquiry on this page. A booking is only confirmed when the restaurant replies.', confirmed: true },
  { q: 'Can I order online?', a: 'You can build an order list on the menu page and send it as an enquiry. No online payment is taken on this website.', confirmed: true },
  { q: 'What payment methods are accepted?', a: TBC, confirmed: false },
]

export default function Visit() {
  const [open, setOpen] = useState<number | null>(0)
  const wa = waHref('Hello! I have a question about Assamese Miching Kitchen.')

  return (
    <>
      <Seo
        path="/visit"
        title="Visit Us | Assamese Miching Kitchen, Ganeshguri, Guwahati"
        description="Find Assamese Miching Kitchen in Ganeshguri, Guwahati. Get directions, contact the restaurant and send a table enquiry."
      />
      <PageHero eyebrow="Visit Us" title="Come Hungry. Leave Connected." image="thaliWide">
        <p className="font-serif text-2xl">{site.name}</p>
        <p className="mt-1 text-ivory/80">{fullLocationLine}</p>
      </PageHero>

      <section className="section bg-midnight">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="h2">Find us</h2>
            <p className="lead mt-3">Open the map for live directions from wherever you are.</p>
            <div className="mt-6">
              <ContactActions />
            </div>
            <p className="mt-4 text-xs text-ivory/55">
              The map shows an area search for the restaurant. The exact pin will be linked once the location is verified.
            </p>
          </Reveal>
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-brass/30 bg-forest-900">
              <iframe
                title={`Map of ${site.name}, ${site.locality}, ${site.city}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section bg-forest-950 !scroll-mt-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="h2">Contact details</h2>
            <dl className="mt-8 divide-y divide-ivory/10">
              {[
                { k: 'Address', v: site.streetAddress ? `${site.streetAddress}, ${fullLocationLine}` : `${fullLocationLine} (full address to be confirmed)` },
                { k: 'Phone', v: telHref ? <a className="underline underline-offset-4 hover:text-brass-light" href={telHref}>{site.phone}</a> : 'To be confirmed' },
                { k: 'WhatsApp', v: wa ? <a className="underline underline-offset-4 hover:text-brass-light" href={wa} target="_blank" rel="noreferrer">Message us on WhatsApp</a> : 'To be confirmed' },
                { k: 'Email', v: site.email ? <a className="underline underline-offset-4 hover:text-brass-light" href={`mailto:${site.email}`}>{site.email}</a> : 'To be confirmed' },
                {
                  k: 'Opening hours',
                  v: site.openingHours ? (
                    <ul>{site.openingHours.map((h) => <li key={h.days}>{h.days}: {h.hours}</li>)}</ul>
                  ) : (
                    'To be confirmed'
                  ),
                },
              ].map((row) => (
                <div key={row.k} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                  <dt className="eyebrow !text-[0.7rem]">{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal>
            <h2 className="h2">Table enquiry</h2>
            <p className="lead mt-3 mb-8">Tell us when you'd like to visit. We'll confirm directly.</p>
            <ReservationForm />
          </Reveal>
        </div>
      </section>

      <section className="section bg-midnight">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="h2">Frequently asked questions</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-ivory/15 border-y border-ivory/15">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium"
                    aria-expanded={open === i}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {f.q}
                    <ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" hidden={open !== i} className="pb-5 text-ivory/80">
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
