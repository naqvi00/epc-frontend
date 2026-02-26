import PageHeader from '../../components/ui/PageHeader'
import { regions } from '../../content/site'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe2, MapPin, Layers } from 'lucide-react'

/**
 * Country name -> ISO 2-letter code (lowercase).
 * Add more here anytime.
 */
const COUNTRY_CODE: Record<string, string> = {
  Iran: 'ir',
  Turkey: 'tr',
  Azerbaijan: 'az',

  Kazakhstan: 'kz',
  Kyrgyzstan: 'kg',
  Turkmenistan: 'tm',
  Tajikistan: 'tj',
  Uzbekistan: 'uz',

  Pakistan: 'pk',
  India: 'in',

  // optional extras if you add later:
  France: 'fr',
  'United Kingdom': 'gb',
  UK: 'gb',
  'United States': 'us',
  USA: 'us',
}

function Flag({ name }: { name: string }) {
  const code = COUNTRY_CODE[name]
  // If code missing, show a neutral icon instead of breaking UI
  if (!code) {
    return (
      <span
        className="inline-flex h-4 w-6 items-center justify-center rounded-sm border border-brand-line bg-brand-mist text-[10px] text-slate-600"
        title={`No flag code set for: ${name}`}
      >
        🌍
      </span>
    )
  }

  // Real SVG flags (reliable across browsers)
  const src = `https://flagcdn.com/${code}.svg`

  return (
    <img
      src={src}
      alt={`${name} flag`}
      className="h-4 w-6 rounded-sm border border-brand-line object-cover"
      loading="lazy"
    />
  )
}

function CountryChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-xs text-slate-700">
      <Flag name={name} />
      <span className="whitespace-nowrap">{name}</span>
    </span>
  )
}

export default function RegionsListing() {
  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Research / Insights"
        title="Regions"
        description="A clear regional structure showing where we work, convene, and publish. This taxonomy can power filters across insights, publications, and events."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Research / Insights', href: '/insights' },
          { label: 'Regions', href: '/insights/regions' },
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Premium intro band */}
          <div className="rounded-3xl border border-brand-line bg-brand-mist p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Coverage</p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-slate-900">
                  Regional focus aligned to offices, partnerships, and publishing
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Each region below can later link to a dedicated page showing region-specific analysis, flagship
                  publications, upcoming events, and experts—without changing this layout.
                </p>
              </div>

              <div className="md:col-span-4 md:text-right">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-white/90"
                >
                  Discuss regional coverage <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe2 className="h-4 w-4 text-brand-blue" />
                  <span className="font-heading text-xs uppercase tracking-[0.18em]">Regions</span>
                </div>
                <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">{regions.length}</div>
                <div className="mt-1 text-xs text-slate-600">Filter groups for insights & publications</div>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Layers className="h-4 w-4 text-brand-blue" />
                  <span className="font-heading text-xs uppercase tracking-[0.18em]">Content</span>
                </div>
                <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">Multi-format</div>
                <div className="mt-1 text-xs text-slate-600">News, analysis, briefs, events</div>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-4 w-4 text-brand-blue" />
                  <span className="font-heading text-xs uppercase tracking-[0.18em]">Footprint</span>
                </div>
                <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">Countries</div>
                <div className="mt-1 text-xs text-slate-600">Listed per region below</div>
              </div>
            </div>
          </div>

          {/* Region cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {regions.map((r) => (
              <div key={r.slug} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                <div className="bg-gradient-to-r from-brand-navy to-brand-navy2 px-6 py-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Region</p>
                      <h3 className="mt-1 font-heading text-2xl font-semibold text-white">{r.name}</h3>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">
                      {r.countries?.length || 0} countries
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-slate-700">{r.description}</p>

                  {!!r.countries?.length && (
                    <div className="mt-5">
                      <div className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                        Countries
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {r.countries.map((c) => (
                          <CountryChip key={c} name={c} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 rounded-2xl border border-brand-line bg-brand-mist p-4 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">How this helps:</span> Use region tags to generate
                    filtered feeds automatically (e.g., “Central Asia → latest insights”, “Middle East → events”, etc.).
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-brand-line pt-5">
                    <div className="text-xs text-slate-500">Ready for region pages & country pages</div>

                    <Link
                      to={`/insights/regions/${r.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
                    >
                      Explore region <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-brand-line bg-white p-6">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Note</p>
            <p className="mt-2 text-sm text-slate-700">
              These are real SVG flags (not emoji), so they render consistently on all browsers and operating systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
