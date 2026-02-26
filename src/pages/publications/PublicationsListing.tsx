import { useMemo, useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import { samplePublications, topics } from '../../content/site'

export default function PublicationsListing() {
  const [topicFilter, setTopicFilter] = useState<string>('All')

  const filtered = useMemo(() => {
    if (topicFilter === 'All') return samplePublications
    // Demo mapping: match by keyword presence in title/abstract
    return samplePublications.filter((p) =>
      `${p.title} ${p.abstract}`.toLowerCase().includes(topicFilter.toLowerCase())
    )
  }, [topicFilter])

  return (
    <main className="bg-white">
      <PageHeader
       variant="gradient"
        eyebrow="Publications Library"
        title="Browse and filter publications"
        description="This is a front-end demonstration of the library layout and filtering UI. You can wire it to CMS content later."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Publications', href: '/publications' },
          { label: 'Library' },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-brand-line bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">Filters</p>
            <p className="mt-1 text-sm text-slate-700">Showing {filtered.length} publication(s).</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTopicFilter('All')}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-200 transition hover:bg-slate-50 ${
                topicFilter === 'All' ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-800'
              }`}
            >
              All
            </button>
            {topics.map((t) => (
              <button
                key={t.slug}
                onClick={() => setTopicFilter(t.name)}
                className={`rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-200 transition hover:bg-slate-50 ${
                  topicFilter === t.name ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-800'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <article key={p.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-semibold text-slate-900">{p.title}</h2>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="font-medium">{p.date}</span> · {p.authors}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  PDF
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-700">{p.abstract}</p>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-900">Key findings</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {p.keyFindings.slice(0, 3).map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Download (sample)
                </a>
                <a href="#" className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50">
                  Cite
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-brand-line bg-slate-50 p-6">
          <p className="text-sm text-slate-700">
            Tip: When you connect the CMS, map fields like <span className="font-medium">title</span>,{' '}
            <span className="font-medium">authors</span>, <span className="font-medium">date</span>,{' '}
            <span className="font-medium">topic</span>, and <span className="font-medium">PDF URL</span> to render real content.
          </p>
        </div>
      </section>
    </main>
  )
}
