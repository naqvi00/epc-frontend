import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Calendar, CheckCircle2, GraduationCap, Users } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

function titleFromSlug(slug?: string) {
  if (!slug) return 'Education'
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function EducationCategory() {
  const { category } = useParams()
  const isExchange = category === 'exchange-programme'
  const title = isExchange ? 'Exchange Programme' : titleFromSlug(category)

  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="Education"
        title={title}
        description={
          isExchange
            ? 'A structured fellowship and placement pathway connecting partners, institutions and emerging leaders across Eurasia.'
            : 'Placeholder page. Add your full content here later.'
        }
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Education', href: '/education' }, { label: title }]}
        actions={
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Education enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {isExchange ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Programme overview</p>
                    <GraduationCap className="h-5 w-5 text-slate-500" />
                  </div>
                  <h2 className="mt-4 font-heading text-xl font-semibold text-slate-900">
                    A practical pathway from analysis to delivery
                  </h2>
                  <p className="mt-3 text-sm text-slate-700">
                    The Exchange Programme is designed for policy practitioners, researchers and emerging leaders who need
                    hands-on exposure to decision-making environments. Participants complete a structured placement with a
                    partner institution and join a cohort-based learning track focused on diplomacy, investment risk, and
                    climate-linked security.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Cohort format',
                        body: 'A guided cohort with shared milestones, peer learning and expert-led sessions.',
                      },
                      {
                        title: 'Partner placements',
                        body: 'Short secondments or fellowships with host institutions and programmes.',
                      },
                      {
                        title: 'Capstone briefing',
                        body: 'A final policy briefing or workshop output delivered to stakeholders.',
                      },
                      {
                        title: 'Network access',
                        body: 'Invitation-only dialogues with senior officials and sector leaders.',
                      },
                    ].map((i) => (
                      <div key={i.title} className="rounded-xl border border-brand-line p-5">
                        <div className="font-heading text-base font-semibold text-slate-900">{i.title}</div>
                        <p className="mt-2 text-sm text-slate-700">{i.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Modules (sample)</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Water security & diplomacy',
                        points: ['Risk mapping', 'Confidence building', 'Cross-border coordination'],
                      },
                      {
                        title: 'Green investment & transition finance',
                        points: ['Project pipelines', 'Geopolitical risk', 'Regulatory reform'],
                      },
                      {
                        title: 'Strategic communications',
                        points: ['Briefing design', 'Stakeholder messaging', 'Media readiness'],
                      },
                      {
                        title: 'Programme delivery',
                        points: ['Monitoring & evaluation', 'Partnership management', 'Impact reporting'],
                      },
                    ].map((m) => (
                      <div key={m.title} className="rounded-xl border border-brand-line p-5">
                        <div className="font-heading text-base font-semibold text-slate-900">{m.title}</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                          {m.points.map((p) => (
                            <li key={p} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-teal" /> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">At a glance</p>
                  <div className="mt-4 space-y-4 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 text-slate-600" />
                      <div>
                        <div className="font-semibold text-slate-900">Duration</div>
                        <div>6–12 weeks (flexible)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 text-slate-600" />
                      <div>
                        <div className="font-semibold text-slate-900">Cohort size</div>
                        <div>12–20 participants</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Eligibility (sample)</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    <li>• 2+ years relevant professional or research experience</li>
                    <li>• Demonstrated interest in Eurasia policy, investment or climate security</li>
                    <li>• Commitment to cohort sessions and capstone delivery</li>
                  </ul>
                  <div className="mt-6 grid gap-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Demo only: connect to application form later.')
                      }}
                      className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
                    >
                      Apply (demo)
                    </a>
                    <Link to="/education" className="inline-flex items-center justify-center rounded-lg border border-brand-line px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-brand-mist">
                      Back to Education
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-line bg-brand-mist p-8">
              <h2 className="font-heading text-lg font-semibold text-slate-900">Placeholder page</h2>
              <p className="mt-2 text-sm text-slate-700">
                This page is intentionally minimal. Add your real content, modules, schedules, brochures and application links.
              </p>
              <div className="mt-6">
                <Link to="/education" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                  Back to Education <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
