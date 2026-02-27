import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import { sampleEvents } from '../../content/site'

export default function EventsLanding() {
  return (
    <main className="bg-white">
      <PageHeader
       variant="gradient"
        eyebrow="Events"
        title="Briefings, dialogues and convenings"
        description="We convene government, academia and industry through public and private events — from conferences and webinars to closed-door roundtables."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
        actions={
          <>
            <Link
              to="/events/upcoming"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              View Upcoming
            </Link>
            <Link
              to="/events/past"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Browse Past Events
            </Link>
          </>
        }
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Conference',
              text: 'High-profile convenings with multi-stakeholder participation, expert panels and policy launches.',
            },
            {
              title: 'Briefing / Roundtable',
              text: 'Targeted sessions for senior audiences, focused on practical options and decisions.',
            },
            {
              title: 'Webinar',
              text: 'Online dialogues with Q&A, designed for global participation and rapid dissemination.',
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Featured upcoming</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-slate-900">{sampleEvents[0].title}</h3>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium">{sampleEvents[0].date}</span> · {sampleEvents[0].format} · {sampleEvents[0].location}
              </p>
              <p className="mt-4 max-w-3xl text-sm text-slate-700">
                A curated closed-door dialogue exploring how investment decisions, energy transition pathways and geopolitical risk interact across Eurasia.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/events/upcoming"
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Register
                </Link>
                <Link
                  to="/events/past"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  View past recordings
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:w-[320px]">
              <p className="text-sm font-semibold text-slate-900">Filters (UI ready)</p>
              <p className="mt-1 text-sm text-slate-700">Topic · Region · Format · Location</p>
              <div className="mt-4 grid gap-2">
                {['Topic', 'Region', 'Format', 'Location'].map((x) => (
                  <div key={x} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                    {x} filter placeholder
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">Connect to CMS later to power real filtering.</p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
