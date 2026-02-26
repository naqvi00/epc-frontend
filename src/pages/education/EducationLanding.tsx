import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

const educationItems = [
  {
    label: 'Exchange Programme',
    href: '/education/exchange-programme',
    description: 'Partnership placements, fellowships and secondments for early-to-mid career professionals.',
  },
  {
    label: 'Universities',
    href: '/education/universities',
    description: 'Collaborations, guest lectures and executive modules for university partners.',
  },
  {
    label: 'Institutions',
    href: '/education/institutions',
    description: 'Institutional capacity-building programmes and tailored training packages.',
  },
  {
    label: 'Seminars',
    href: '/education/seminars',
    description: 'Short, high-impact seminars for leaders, diplomats and technical specialists.',
  },
  {
    label: 'Workshops',
    href: '/education/workshops',
    description: 'Scenario-based workshops, simulations and policy design sprints.',
  },
  {
    label: 'Conference',
    href: '/education/conference',
    description: 'Education-focused convenings and practitioner learning forums.',
  },
]

export default function EducationLanding() {
  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="Education"
        title="Education & capacity building"
        description="Professional training programmes designed for government, institutions, universities and the private sector. Only the Exchange Programme page contains full demo content — other categories are placeholders for you to fill."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Education' }]}
        actions={
          <Link
            to="/education/exchange-programme"
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-white/90"
          >
            View Exchange Programme <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Programmes</p>
                  <GraduationCap className="h-5 w-5 text-slate-500" />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {educationItems.map((i) => (
                    <Link
                      key={i.href}
                      to={i.href}
                      className="group rounded-xl border border-brand-line bg-white p-5 hover:border-brand-blue"
                    >
                      <div className="font-heading text-base font-semibold text-slate-900 group-hover:text-brand-blue">
                        {i.label}
                      </div>
                      <p className="mt-2 text-sm text-slate-700">{i.description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                        Explore <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Typical formats</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Executive briefings & masterclasses</li>
                  <li>• Scenario workshops & simulations</li>
                  <li>• Fellowships & exchange placements</li>
                  <li>• Curriculum modules & university partnerships</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Enquiries</p>
                <p className="mt-3 text-sm text-slate-700">
                  Connect education enquiries to your contact form or a dedicated email when your backend is ready.
                </p>
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
