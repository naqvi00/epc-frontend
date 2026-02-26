import { Link } from 'react-router-dom'
import { ArrowRight, HandHeart, ShieldCheck } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

export default function SupportLanding() {
  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Support"
        title="Support our work"
        description="A clean, donor-ready page template. Replace text with your real donation/membership details. Frontend-only demo (no payments)."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Support' }]}
        actions={
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              alert('Demo only: wire this button to your payment/donation flow later.')
            }}
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Donate (demo) <ArrowRight className="h-4 w-4" />
          </a>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Why support</p>
                  <HandHeart className="h-5 w-5 text-slate-500" />
                </div>
                <h2 className="mt-4 font-heading text-xl font-semibold text-slate-900">Enable independent analysis and trusted dialogue</h2>
                <p className="mt-3 text-sm text-slate-700">
                  Support helps fund non-partisan research, closed-door briefings, public events and capacity-building programmes.
                  This template is intentionally conservative and credible for UK/international stakeholders.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  <li>• Produce policy briefs and research outputs across our focus areas.</li>
                  <li>• Convene dialogues between government, academia and industry.</li>
                  <li>• Deliver education programmes and practical training.</li>
                  <li>• Maintain transparency, governance and editorial standards.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Donation methods (placeholder)</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Online (card)', body: 'Connect to Stripe/PayPal/Charity platform later.' },
                    { title: 'Bank transfer', body: 'Add bank details + reference rules.' },
                    { title: 'Corporate support', body: 'Add sponsorship packages + benefits.' },
                    { title: 'In-kind', body: 'Add research support, venues, logistics, translation, etc.' },
                  ].map((i) => (
                    <div key={i.title} className="rounded-xl border border-brand-line p-5">
                      <div className="font-heading text-base font-semibold text-slate-900">{i.title}</div>
                      <p className="mt-2 text-sm text-slate-700">{i.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Transparency</p>
                    <p className="mt-2 text-sm text-slate-700">
                      Add your donor policy, annual report links and any charity/registration numbers here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Contact</p>
                <p className="mt-3 text-sm text-slate-700">For partnerships and sponsorship enquiries, use the contact page.</p>
                <div className="mt-5">
                  <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                    Contact us <ArrowRight className="h-4 w-4" />
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
