import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import { regions, sampleInsights, topics } from '../../content/site'

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-brand-line px-3 py-1 text-xs text-slate-600">{children}</span>
  )
}

export default function InsightsLanding() {
  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Research / Insights"
        title="Insights"
        description="Analysis, commentary and explainers focused on the topics and regions you defined for this project. Replace sample items with your CMS content later."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Research / Insights' }]}
        actions={
          <Link
            to="/insights/all"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Featured</p>
              <div className="mt-4 grid gap-4">
                {sampleInsights.map((i) => (
                  <article key={i.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand-mist px-3 py-1 text-xs text-slate-700">
                        <Newspaper className="h-4 w-4" /> {i.type}
                      </span>
                      <span className="text-xs text-slate-500">{i.date}</span>
                    </div>
                    <h2 className="mt-4 font-heading text-lg font-semibold text-slate-900">{i.title}</h2>
                    <p className="mt-2 text-sm text-slate-700">{i.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Tag>{i.topic}</Tag>
                      <Tag>{i.region}</Tag>
                    </div>
                    <div className="mt-6">
                      <Link to="/insights/all" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                        Read more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="md:col-span-5">
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Browse by topic</p>
                <div className="mt-4 space-y-3">
                  {topics.map((t) => (
                    <div key={t.slug} className="rounded-xl border border-brand-line bg-white p-4">
                      <div className="font-heading text-sm font-semibold text-slate-900">{t.name}</div>
                      <div className="mt-1 text-xs text-slate-600">{t.description}</div>
                      {t.subcategories.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {t.subcategories.map((s) => (
                            <span key={s} className="rounded-full bg-brand-mist px-3 py-1 text-xs text-slate-700">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to="/insights/topics"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                >
                  View topics directory <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Browse by region</p>
                <div className="mt-4 space-y-3">
                  {regions.map((r) => (
                    <div key={r.slug} className="rounded-xl border border-brand-line p-4">
                      <div className="font-heading text-sm font-semibold text-slate-900">{r.name}</div>
                      <div className="mt-1 text-xs text-slate-600">{r.description}</div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/insights/regions"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                >
                  View regions directory <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
