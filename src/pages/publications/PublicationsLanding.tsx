import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import { samplePublications, topics } from '../../content/site'

export default function PublicationsLanding() {
  const featured = samplePublications[0]

  return (
    <main className="bg-white">
      <PageHeader
       variant="gradient"
        eyebrow="Publications"
        title="Reports, briefs and flagship series"
        description="Our publications translate evidence into practical options for decision-makers. Browse briefs, research papers and thematic reports across the Council’s priority topics."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Publications' }]}
        actions={
          <Link
            to="/publications/library"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Open the Library
          </Link>
        }
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Reports',
              text: 'Long-form research outputs that synthesize evidence, scenario analysis and stakeholder consultation.',
            },
            {
              title: 'Research Papers',
              text: 'Method-driven papers that set out data, assumptions and policy implications in depth.',
            },
            {
              title: 'Briefing Papers',
              text: 'Concise briefings designed for senior audiences, with key findings, options and risks.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-slate-900">{c.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-brand-line bg-slate-50 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Featured publication</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-slate-900">{featured.title}</h3>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium">{featured.date}</span> · {featured.authors}
              </p>
              <p className="mt-4 max-w-3xl text-sm text-slate-700">{featured.abstract}</p>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-900">Key findings</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {featured.keyFindings.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/publications/library"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100"
                >
                  View in Library
                </Link>
                <a
                  href="#"
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Download PDF (sample)
                </a>
              </div>
            </div>

            <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:w-[320px]">
              <p className="text-sm font-semibold text-slate-900">Browse by topic</p>
              <p className="mt-1 text-sm text-slate-700">
                The library is structured around the Council’s priority areas.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <span
                    key={t.slug}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/publications/library" className="text-sm font-medium text-slate-900 hover:underline">
                  Explore all publications →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
