import { useState, type FormEvent } from 'react'
import { site, waHref } from '../data/site'

type Status = 'idle' | 'sending' | 'ready' | 'error'
interface Values {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  message: string
}
const empty: Values = { name: '', phone: '', date: '', time: '', guests: '2', message: '' }

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^\+?[0-9\s-]{8,15}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number.'
  if (!v.date) e.date = 'Choose a date.'
  else if (new Date(v.date + 'T23:59:59') < new Date()) e.date = 'Choose today or a future date.'
  if (!v.time) e.time = 'Choose a time.'
  const g = Number(v.guests)
  if (!Number.isInteger(g) || g < 1 || g > 30) e.guests = 'Guests must be between 1 and 30.'
  return e
}

/**
 * No backend is connected, so this never claims a booking is confirmed. It
 * prepares an enquiry and hands it to WhatsApp or email if configured.
 */
export function ReservationForm() {
  const [v, setV] = useState<Values>(empty)
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [handoff, setHandoff] = useState<string | null>(null)

  const text = () =>
    `Table enquiry for ${site.name}\nName: ${v.name}\nPhone: ${v.phone}\nDate: ${v.date}\nTime: ${v.time}\nGuests: ${v.guests}${v.message ? `\nNote: ${v.message}` : ''}`

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(v)
    setErrors(e)
    if (Object.keys(e).length) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const msg = text()
    const wa = waHref(msg)
    window.setTimeout(() => {
      if (wa) {
        window.open(wa, '_blank', 'noopener')
        setHandoff('Your enquiry is ready in WhatsApp. Send it there. The restaurant will confirm your table, and nothing is booked until they do.')
      } else if (site.email) {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Table enquiry')}&body=${encodeURIComponent(msg)}`
        setHandoff('Your email app should open with the enquiry. Nothing is booked until the restaurant replies.')
      } else {
        setHandoff(null)
      }
      setStatus('ready')
    }, 400)
  }

  const noChannel = !site.whatsapp && !site.email

  const input = (id: keyof Values, label: string, type = 'text', extra: object = {}) => (
    <div>
      <label htmlFor={`res-${id}`} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={`res-${id}`}
        name={id}
        type={type}
        value={v[id]}
        onChange={(e) => setV({ ...v, [id]: e.target.value })}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `res-${id}-err` : undefined}
        className="field"
        {...extra}
      />
      {errors[id] && (
        <p id={`res-${id}-err`} className="mt-1 text-sm text-[#f0a48c]" role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  )

  if (!site.reservations.acceptsEnquiries) return <p>Table enquiries are not available at the moment.</p>

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-describedby="res-note">
      <div className="grid gap-5 sm:grid-cols-2">
        {input('name', 'Your name', 'text', { autoComplete: 'name', required: true })}
        {input('phone', 'Contact number', 'tel', { autoComplete: 'tel', inputMode: 'tel', required: true })}
        {input('date', 'Date', 'date', { required: true, min: new Date().toISOString().slice(0, 10) })}
        {input('time', 'Time', 'time', { required: true })}
        {input('guests', 'Number of guests', 'number', { min: 1, max: 30, inputMode: 'numeric', required: true })}
      </div>
      <div>
        <label htmlFor="res-message" className="mb-1.5 block text-sm font-medium">
          Message (optional)
        </label>
        <textarea id="res-message" rows={3} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} className="field" />
      </div>

      <p id="res-note" className="text-xs text-ivory/60">
        This sends an enquiry only. It does not confirm a reservation.
      </p>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending' || noChannel}>
        {status === 'sending' ? 'Preparing…' : 'Send Table Enquiry'}
      </button>

      <div role="status" aria-live="polite" className="text-sm">
        {noChannel && (
          <p className="rounded-lg border border-brass/40 bg-brass/10 p-3">
            Table enquiries will be switched on once the restaurant's WhatsApp number or email is confirmed. Until then, please use the directions and contact options on this page.
          </p>
        )}
        {status === 'ready' && handoff && <p className="rounded-lg border border-forest-700 bg-forest-800/60 p-3">{handoff}</p>}
        {status === 'error' && <p className="text-[#f0a48c]">Please fix the highlighted fields and try again.</p>}
      </div>
    </form>
  )
}
