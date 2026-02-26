import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import { regions, sampleInsights, topics } from '../../content/site'

const types = ['All', 'News', 'Commentary', 'Analysis', 'Explainers', 'Interviews', 'Opinion', 'Briefs']

export default function ArticlesListing() {
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState('All')
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All')

  const topicOptions = useMemo(() => ['All', ...topics.map((t) => t.name)], [])
  const regionOptions = useMemo(() => ['All', ...regions.map((r) => r.name)], [])

  const items = useMemo(() => {
    const norm = (s: string) => s.toLowerCase()
    return sampleInsights
      .filter((i) => (topic === 'All' ? true : i.topic === topic))
      .filter((i) => (region === 'All' ? true : i.region === region))
      .filter((i) => (type === 'All' ? true : i.type === type))
      .filter((i) => {
        if (!q.trim()) return true
        const hay = `${i.title} ${i.summary} ${i.topic} ${i.region} ${i.type}`
        return norm(hay).includes(norm(q))
      })
  }, [q, topic, region, type])

  return (
    <div>
      <PageHeader
        variant="gradient"
        eyebrow="Research / Insights"
        title="All articles"
        description="A demo listing page with filters (frontend-only). Replace sample content with CMS items later."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Research / Insights', href: '/insights' }, { label: 'All Articles' }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
            <div className="grid gap-4 md:grid-cols-12 md:items-end">
              <label className="md:col-span-5">
                <span className="text-xs font-semibold text-slate-700">Search</span>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-brand-line px-3 py-2">
                  <Search className="h-4 w-4 text-slate-500" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Search titles, summaries, topics…"
                  />
                </div>
              </label>

              <label className="md:col-span-3">
                <span className="text-xs font-semibold text-slate-700">Topic</span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  {topicOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="text-xs font-semibold text-slate-700">Region</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="text-xs font-semibold text-slate-700">Type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {items.map((i) => (
              <article key={i.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">{i.date} • {i.type}</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-brand-line px-3 py-1 text-slate-600">{i.topic}</span>
                    <span className="rounded-full border border-brand-line px-3 py-1 text-slate-600">{i.region}</span>
                  </div>
                </div>
                <h2 className="mt-3 font-heading text-lg font-semibold text-slate-900">{i.title}</h2>
                <p className="mt-2 text-sm text-slate-700">{i.summary}</p>
                <div className="mt-5">
                  <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                    Open (demo) <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}

            {items.length === 0 && (
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6 text-sm text-slate-700">
                No results found. Adjust filters or add more CMS content.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
