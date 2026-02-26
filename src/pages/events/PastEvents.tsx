import { Link } from 'react-router-dom'
import { Calendar, Film, ArrowRight } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

const pastEvents = [
  {
    title: 'Closed-door dialogue: Energy transition and investment risk',
    date: '2025-11-18',
    location: 'London, UK',
    format: 'Roundtable (in-person)',
    recap: 'A practitioner dialogue on green investment, regulatory reform and market stability.',
  },
  {
    title: 'Water security & diplomacy: Practical tools for cooperation',
    date: '2025-10-06',
    location: 'Hybrid',
    format: 'Briefing (hybrid)',
    recap: 'A briefing on risk mapping, confidence-building measures, and cross-border coordination.',
  },
  {
    title: 'Women’s economic participation: Policy levers that deliver',
    date: '2025-09-12',
    location: 'Online',
    format: 'Webinar',
    recap: 'An evidence-led session on labour-market participation, leadership pipelines and finance inclusion.',
  },
]

export default function PastEvents() {
  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Events"
        title="Past events"
        description="Selected recordings, transcripts and recaps. This is a frontend-only demo; replace items with your CMS later."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: 'Past' }]}
        actions={
          <Link
            to="/events/upcoming"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            View upcoming <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Archive highlights</p>
                  <Calendar className="h-5 w-5 text-slate-500" />
                </div>

                <div className="mt-5 space-y-4">
                  {pastEvents.map((e) => (
                    <article key={e.title} className="rounded-xl border border-brand-line p-5">
                      <h3 className="font-heading text-base font-semibold text-slate-900">{e.title}</h3>
                      <p className="mt-1 text-xs text-slate-600">
                        {e.date} • {e.location} • {e.format}
                      </p>
                      <p className="mt-3 text-sm text-slate-700">{e.recap}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold text-slate-700">
                          <Film className="h-4 w-4" /> Recording (placeholder)
                        </span>
                        <span className="inline-flex items-center rounded-full border border-brand-line px-3 py-1 text-xs font-semibold text-slate-700">
                          Transcript (placeholder)
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">How this page is used</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Link to recordings (YouTube/Vimeo) or embed directly.</li>
                  <li>• Attach transcripts, photo galleries and recap articles.</li>
                  <li>• Tag by topic/region for filtering.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Explore</p>
                <div className="mt-4 grid gap-3">
                  <Link to="/events" className="rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-brand-blue hover:underline">
                    Events landing
                  </Link>
                  <Link to="/insights" className="rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-brand-blue hover:underline">
                    Research / Insights
                  </Link>
                  <Link to="/publications" className="rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-brand-blue hover:underline">
                    Publications
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
