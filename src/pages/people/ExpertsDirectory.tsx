import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Search, ArrowRight, Sparkles, GraduationCap } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import { regions, topics } from '../../content/site'

type Expert = {
  name: string
  title: string
  summary: string
  topics: string[]
  region: string
  education?: string
  location?: string
  email?: string
}

const experts: Expert[] = [
  {
    name: 'Professor Kamal Bechkoum',
    title: 'Advisory Council',
    location: 'United Kingdom',
    education: 'Senior HE leadership (30+ years); Pro-Vice-Chancellor level',
    summary:
      'People-centred, evidence-based innovation across higher education—focused on AI, cybersecurity and leadership.',
    topics: ['Education', 'Investment'],
    region: 'Europe / UK',
  },
  {
    name: 'Laura Roberts',
    title: 'Advisory Council',
    location: 'United Kingdom / Europe',
    education: 'Strategic communications & diplomacy (senior leadership)',
    summary:
      'Strategic communications and diplomatic advisory spanning geopolitics, trade and cross-border cooperation.',
    topics: ['Investment', 'Climate Change'],
    region: 'Europe / UK',
  },
  {
    name: 'Saeed Samani Majd',
    title: 'Advisory Council',
    location: 'Iran',
    education: 'Post Doc — Environmental Engineering (University of Tehran)',
    summary:
      'Environmental engineering expertise supporting policy thinking on sustainability, risk and resilience.',
    topics: ['Climate Change'],
    region: 'Middle East',
  },
  {
    name: 'Samir Hümbətov',
    title: 'Advisory Council',
    location: 'Azerbaijan',
    education: 'Azerbaijan University (International Relations & Diplomacy Studies)',
    summary:
      'Foreign policy and international security specialist; academic leader and conference director.',
    topics: ['Investment', 'Education'],
    region: 'Middle East',
  },
  {
    name: 'Dr Fouzia Sadiq',
    title: 'Advisory Council',
    location: 'Pakistan / UK',
    education: 'Biomedical science + health systems leadership (20+ years research experience)',
    summary:
      'Healthcare strategist supporting research governance, regulatory innovation and national capacity-building.',
    topics: ['Poverty Management', 'Women Empowerment'],
    region: 'South Asia',
  },
  {
    name: 'Dr Dababrata Chowdhury',
    title: 'Management Team',
    location: 'United Kingdom',
    education: 'PhD + MBA (UK); BSc Computer Science & Engineering',
    summary:
      'Digital entrepreneurship and employability specialist; builds university-industry partnerships across regions.',
    topics: ['Education', 'Investment'],
    region: 'Europe / UK',
  },
  {
    name: 'Professor Shabnam Delfani',
    title: 'Management Team',
    location: 'United Kingdom / MENA',
    education: 'PhD Environmental Management (Climate Change Modelling)',
    summary:
      'Climate resilience and sustainability policy leader; promotes women’s leadership in global governance.',
    topics: ['Climate Change', 'Women Empowerment'],
    region: 'Middle East',
  },
]

function Chip({ children, tone = 'mist' }: { children: React.ReactNode; tone?: 'mist' | 'outline' }) {
  if (tone === 'outline') {
    return (
      <span className="rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold text-slate-700">
        {children}
      </span>
    )
  }
  return (
    <span className="rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold text-slate-700">{children}</span>
  )
}

export default function ExpertsDirectory() {
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState('All')
  const [region, setRegion] = useState('All')

  const topicOptions = useMemo(() => ['All', ...topics.map((t) => t.name)], [])
  const regionOptions = useMemo(() => ['All', ...regions.map((r) => r.name), 'Europe / UK'], [])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return experts.filter((e) => {
      const matchesQ =
        !needle || `${e.name} ${e.title} ${e.summary} ${e.education ?? ''} ${e.location ?? ''}`.toLowerCase().includes(needle)

      const matchesTopic = topic === 'All' || e.topics.includes(topic)
      const matchesRegion = region === 'All' || e.region === region
      return matchesQ && matchesTopic && matchesRegion
    })
  }, [q, topic, region])

  return (
    <div>
      <PageHeader
        eyebrow="People / Experts"
        title="Expert directory"
        description="Filter by topic and region. This listing is structured to connect to a CMS later, while remaining credible as a standalone directory now."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'People / Experts', href: '/people' }, { label: 'Directory' }]}
        actions={
          <Link
            to="/about/governance"
            className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Governance & teams <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Filters */}
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-card">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Filter className="h-4 w-4" /> Filters
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-mist px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
                  {filtered.length} results
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name, title, keywords"
                    className="w-full rounded-xl border border-brand-line py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                  />
                </div>

                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  {topicOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cards */}
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {filtered.map((e) => (
                <article
                  key={e.name}
                  className="group relative overflow-hidden rounded-3xl border border-brand-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-brand-mist blur-2xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-heading text-lg font-semibold text-slate-900">{e.name}</div>
                        <div className="mt-1 text-sm text-slate-600">{e.title}</div>
                        {e.location ? <div className="mt-1 text-xs text-slate-500">{e.location}</div> : null}
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-2xl border border-brand-line bg-brand-mist px-3 py-2 text-xs font-semibold text-slate-700">
                        <GraduationCap className="h-4 w-4 text-brand-blue" />
                        Profile
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-700">{e.summary}</p>

                    {e.education ? (
                      <div className="mt-4 rounded-2xl border border-brand-line bg-brand-mist p-4 text-sm text-slate-700">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Education / background</div>
                        <div className="mt-1">{e.education}</div>
                      </div>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.topics.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                      <Chip tone="outline">{e.region}</Chip>
                    </div>

                    {e.email ? (
                      <div className="mt-4 text-xs text-slate-600">Public email: {e.email}</div>
                    ) : (
                      <div className="mt-4 text-xs text-slate-500">Public email: available on request</div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 rounded-2xl border border-brand-line bg-brand-mist p-6 text-sm text-slate-700">
                No results. Try clearing filters.
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <div className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Next steps</div>
                  <div className="mt-2 font-heading text-lg font-semibold text-slate-900">
                    Connect publications + events to each profile
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    Once your CMS is connected, this directory can automatically show each person’s publications, events,
                    and topical coverage without changing the UI.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
                  >
                    Request collaboration <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
