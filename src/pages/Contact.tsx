import { useMemo, useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { brand, officeLocations, regions } from '../content/site'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

export default function Contact() {
  const [country, setCountry] = useState('All')

  const countries = useMemo(() => {
    const set = new Set<string>()
    officeLocations.forEach((o) => set.add(o.country))
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [])

  const filtered = useMemo(() => {
    if (country === 'All') return officeLocations
    return officeLocations.filter((o) => o.country === country)
  }, [country])

  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Contact"
        title="Contact & office locations"
        description="Get in touch with the Eurasia Policy Council. For media requests, partnership proposals or programme enquiries, use the form below or reach out to the relevant office."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <h2 className="font-heading text-lg font-semibold text-slate-900">Send a message</h2>
                <p className="mt-2 text-sm text-slate-700">
                  We aim to respond within two working days. This demo uses a frontend-only form (no submission).
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Demo only: connect this form to your backend later.')
                  }}
                >
                  <Field label="Full name">
                    <input
                      required
                      className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Subject">
                    <input
                      className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                      placeholder="Media, partnerships, research, education…"
                    />
                  </Field>
                  <Field label="Message">
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                      placeholder="How can we help?"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
                  >
                    Send
                  </button>

                  <p className="text-xs text-slate-500">
                    By sending, you confirm you have permission to share the information provided.
                  </p>
                </form>
              </div>

              <div className="mt-6 rounded-2xl border border-brand-line bg-brand-mist p-6">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Quick contacts</p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-slate-600" />
                    <div>
                      <div className="font-semibold text-slate-900">General enquiries</div>
                      <div className="text-slate-700">info@eurasiapolicycouncil.org</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-slate-600" />
                    <div>
                      <div className="font-semibold text-slate-900">Media & press</div>
                      <div className="text-slate-700">press@eurasiapolicycouncil.org</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-slate-600" />
                    <div>
                      <div className="font-semibold text-slate-900">Education programmes</div>
                      <div className="text-slate-700">education@eurasiapolicycouncil.org</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-slate-900">Offices</h2>
                  <p className="mt-1 text-sm text-slate-700">
                    Offices listed for: {regions.flatMap((r) => r.countries).filter(Boolean).length + 1} countries.
                  </p>
                </div>

                <label className="text-sm text-slate-700">
                  <span className="mr-2 text-xs font-semibold text-slate-700">Filter by country</span>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30 sm:w-64"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filtered.map((o) => (
                  <div key={`${o.country}-${o.city}`} className="rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                    <div className="font-heading text-base font-semibold text-slate-900">
                      {o.city}, {o.country}
                    </div>

                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
                        <span>{o.address}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-4 w-4 text-slate-500" />
                        <span>{o.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="mt-0.5 h-4 w-4 text-slate-500" />
                        <span>{o.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-brand-line bg-brand-mist p-3 text-xs text-slate-600">
                      Map embed placeholder — add Google Maps iframe or coordinates later.
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-brand-line bg-brand-mist p-6">
                <div className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Brand</div>
                <div className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{brand.orgName}</span> — {brand.tagline}
                </div>
                <p className="mt-2 text-sm text-slate-700">This frontend demo is designed for a UK-facing audience with an international footprint.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
