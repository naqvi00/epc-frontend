import { Download } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

const highlights = [
  'Policy briefings delivered to government and institutional stakeholders.',
  'Convened closed‑door dialogues on geopolitical risk and energy transition.',
  'Education programme delivery through seminars, workshops and exchange initiatives.',
  'Publications produced with a focus on usability: executive summaries, key findings and citations.',
]

export default function AnnualReport() {
  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="About"
        title="Annual report & financials"
        description="Transparency and impact reporting. Replace placeholders with your PDFs and audited statements."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Annual Report' }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Impact highlights</p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-slate-900">A year in review</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-brand-line bg-brand-mist p-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Donor / financial transparency:</span> Add a short statement here on how funding is managed and disclosed.
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Downloads</p>
                <div className="mt-4 space-y-3">
                  {['Annual Report 2025 (PDF)', 'Financial Statement 2025 (PDF)'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => alert('Demo only: add PDF file links here.')}
                      className="flex w-full items-center justify-between rounded-xl border border-brand-line bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-brand-mist"
                    >
                      <span>{t}</span>
                      <Download className="h-4 w-4 text-slate-500" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-brand-line bg-white p-5 text-sm text-slate-700">
                  <div className="font-heading text-sm font-semibold text-slate-900">How to use this page</div>
                  <p className="mt-2">
                    Once you have your PDFs, replace the demo buttons with direct download links (or gated access if required).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
