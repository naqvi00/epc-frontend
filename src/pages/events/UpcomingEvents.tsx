import PageHeader from '../../components/ui/PageHeader'
import { sampleEvents } from '../../content/site'

export default function UpcomingEvents() {
  return (
    <main className="bg-white">
      <PageHeader
       variant="gradient"
        eyebrow="Events"
        title="Upcoming events"
        description="Register for upcoming briefings, webinars and closed-door dialogues. This is demo data for client preview."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Upcoming' },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {sampleEvents.map((e) => (
            <article key={e.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-semibold text-slate-900">{e.title}</h2>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="font-medium">{e.date}</span> · {e.format} · {e.location}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Upcoming</span>
              </div>

              <p className="mt-4 text-sm text-slate-700">
                Placeholder summary. Replace this with your CMS event summary, agenda, speakers, and registration rules.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Register (sample)
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  View agenda
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-brand-line bg-slate-50 p-6">
          <p className="text-sm text-slate-700">
            Notes: event detail pages are not enabled in this demo. You can add dynamic routes later (e.g. /events/:slug)
            when your CMS is ready.
          </p>
        </div>
      </section>
    </main>
  )
}
