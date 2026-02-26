import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Leaf, GraduationCap, Briefcase, Sparkles } from 'lucide-react'
import { brand } from '../../content/site'

const highlights = [
  'Evidence-led research with clear policy options',
  'Trusted convening for officials, industry and academia',
  'Regional expertise across Eurasia, Central Asia and South Asia',
  'Practical training through seminars, workshops and exchange programmes',
  'Publications designed for government and investor audiences',
]

const whatWeDoText = `The Eurasia Policy Council (EPC) is an independent think tank dedicated to advancing sustainable development and regional cooperation across Central Asia. We focus on three strategic pillars: Climate Change, Education, and Business & Investment.

EPC conducts evidence-based research, develops practical policy recommendations, and facilitates dialogue among governments, academics, industry leaders, and civil society.

Our mission is to shape forward-looking policies that foster sustainability, opportunity, and prosperity across Central Asia and the wider Eurasian region.`

const pillars = [
  {
    title: 'Climate Change',
    icon: Leaf,
    body: 'Promoting climate resilience, water security, renewable energy, and sustainable environmental policies.',
    tags: ['Climate resilience', 'Water security', 'Renewables'],
  },
  {
    title: 'Education',
    icon: GraduationCap,
    body: 'Strengthening human capital through modern education reform, digital innovation, and inclusive learning opportunities.',
    tags: ['Education reform', 'Digital innovation', 'Inclusion'],
  },
  {
    title: 'Business & Investment',
    icon: Briefcase,
    body: 'Enhancing investment climates, supporting entrepreneurship, and encouraging responsible economic growth and regional connectivity.',
    tags: ['Investment climate', 'Entrepreneurship', 'Connectivity'],
  },
]

const conclusion =
  'The Eurasia Policy Council will act as a cornerstone institution in building resilient, ethical, and collaborative policing across the Eurasian region. Its dual mission of operational impact and academic excellence positions it to be a leading force in 21st-century regional security cooperation. The time to build bridges through informed policing is now.'

export default function AboutOverview() {
  return (
    <div>
      {/* ✅ Brand-colored header */}
      <section className="bg-gradient-to-r from-brand-navy to-brand-navy2">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          {/* Breadcrumb */}
          <div className="text-sm text-white/70">
            <Link to="/" className="hover:text-white">
              Home
            </Link>{' '}
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/90">About</span>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">About</p>
              <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Independent, non-partisan policy analysis
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
                Eurasia Policy Council is a UK-based think tank and policy institute that supports decision-makers with
                rigorous research, confidential dialogue and public education.
              </p>
            </div>

            <div className="md:col-span-4 md:flex md:justify-end">
              <Link
                to="/about/mission-vision"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-white/90"
              >
                Mission & vision <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Full-width content (no right sidebar) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          {/* Who we are */}
          <h2 className="font-heading text-2xl font-semibold text-slate-900">Who we are</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700 md:text-base">{brand.missionFull}</p>

          {/* Highlights */}
          <div className="mt-8 rounded-2xl border border-brand-line bg-brand-mist p-6">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">What makes EPC different</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => (
                <div key={h} className="flex gap-3 rounded-xl border border-brand-line bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-teal" />
                  <p className="text-sm text-slate-700">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What we do */}
          <div className="mt-10 rounded-3xl border border-brand-line bg-white p-7 shadow-card">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">What we do</p>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
              Evidence-led research, practical policy support
            </h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700 md:text-base">{whatWeDoText}</p>

            <div className="mt-6 rounded-2xl border border-brand-line bg-brand-mist p-5">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">How we work:</span> Research • Policy recommendations •
                Convening & dialogue • Capacity-building
              </p>
            </div>
          </div>

          {/* Strategic pillars */}
          <div className="mt-10">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Strategic pillars</p>
            <h3 className="mt-2 font-heading text-3xl font-semibold text-slate-900">Three areas of focus</h3>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="rounded-3xl border border-brand-line bg-white p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-mist border border-brand-line">
                        <Icon className="h-5 w-5 text-brand-blue" />
                      </span>
                      <div className="font-heading text-xl font-semibold text-slate-900">{p.title}</div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-700">{p.body}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-[11px] text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-3xl border border-brand-line bg-gradient-to-r from-brand-navy to-brand-navy2 p-7 shadow-card">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Conclusion</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-white">
                  Building bridges through informed cooperation
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">{conclusion}</p>
          </div>

          {/* Optional CTA (nice end) */}
          <div className="mt-10 rounded-3xl border border-brand-line bg-brand-mist p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-heading text-lg font-semibold text-slate-900">Partner with EPC</div>
                <div className="mt-1 text-sm text-slate-700">
                  For collaborations, joint events or education partnerships, contact our team.
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
              >
                Contact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}