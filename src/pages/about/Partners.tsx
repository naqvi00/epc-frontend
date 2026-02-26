import PageHeader from '../../components/ui/PageHeader'

const categories = [
  {
    title: 'Government and multilateral partners',
    body: 'Trusted engagement across foreign policy, development and security communities. Add partner logos only where you have permission to display them.',
  },
  {
    title: 'Academic institutions',
    body: 'University collaborations, joint seminars and exchange programme delivery with research centres and faculties.',
  },
  {
    title: 'Private‑sector stakeholders',
    body: 'Dialogue with investors and industry on energy transition, geopolitical risk and regulatory reform.',
  },
]

export default function Partners() {
  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="About"
        title="Partners & network"
        description="A curated network that supports research quality, convening credibility and programme delivery."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Partners & Network' }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((c) => (
              <div key={c.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <h2 className="font-heading text-lg font-semibold text-slate-900">{c.title}</h2>
                <p className="mt-2 text-sm text-slate-700">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand-line bg-white p-6 shadow-card">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Logo wall</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-slate-900">Partners and affiliations</h3>
                <p className="mt-2 text-sm text-slate-700">Placeholders below — replace with your approved partner logos.</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {Array.from({ length: 18 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex h-16 items-center justify-center rounded-xl border border-brand-line bg-brand-mist text-xs text-slate-500"
                >
                  Logo {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
