import { useMemo, useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import clsx from 'clsx'
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react'

 import srushti from '../../assets/shurshit.jpeg'
 import daniele from '../../assets/researcher.jpeg'

type Researcher = {
  name: string
  title: string
  location?: string
  image?: string
  short: string
  long: string
  tags?: string[]
  focus?: string[]
}

function clampWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text.trim()
  return words.slice(0, maxWords).join(' ') + '…'
}

function InitialsAvatarBig({ name }: { name: string }) {
  const initials = useMemo(() => {
    const parts = name.split(' ').filter(Boolean)
    const a = parts[0]?.[0] ?? 'A'
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase()
  }, [name])

  return (
    <div className="grid h-36 w-36 place-items-center rounded-3xl bg-gradient-to-br from-brand-navy to-brand-blue text-white shadow-card">
      <span className="font-heading text-3xl font-semibold tracking-wide">{initials}</span>
    </div>
  )
}

function ResearcherCard({ r }: { r: Researcher }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="rounded-3xl border border-brand-line bg-white shadow-card">
      <div className="grid gap-8 p-6 md:grid-cols-12 md:items-start md:p-8">
        {/* Big photo */}
        <div className="md:col-span-4">
          <div className="relative">
            {r.image ? (
              <img
                src={r.image}
                alt={r.name}
                className="h-56 w-full rounded-3xl border border-brand-line object-cover shadow-sm md:h-72"
                loading="lazy"
              />
            ) : (
              <div className="grid place-items-center">
                <InitialsAvatarBig name={r.name} />
              </div>
            )}

            {/* small badge */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <GraduationCap className="h-4 w-4" />
              Researcher
            </div>
          </div>

          {/* tags */}
          {r.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-[11px] text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="md:col-span-8">
          <h3 className="font-heading text-2xl font-semibold text-slate-900">{r.name}</h3>
          <p className="mt-1 text-sm font-semibold text-brand-blue">{r.title}</p>
          {r.location ? <p className="mt-1 text-xs text-slate-500">{r.location}</p> : null}

          <p className="mt-4 text-sm leading-7 text-slate-700">{r.short}</p>

          {/* Focus bullets (optional) */}
          {r.focus?.length ? (
            <div className="mt-5 rounded-2xl border border-brand-line bg-brand-mist p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <BookOpen className="h-4 w-4 text-brand-blue" />
                Research focus
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                {r.focus.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Long bio */}
          <div
            className={clsx(
              'mt-5 overflow-hidden transition-[max-height,opacity] duration-300',
              open ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <p className="text-sm leading-7 text-slate-700">{r.long}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            {open ? 'Read less' : 'Read full bio'}
            <ArrowRight className={clsx('h-4 w-4 transition', open ? 'rotate-90' : 'rotate-0')} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Researchers() {
  const researchers: Researcher[] = [
    {
      name: 'Srushti Gajanan Hode',
      image: srushti, 
      title: 'Researcher',
      location: 'United Kingdom',
      short:
        'Political consultant and communications researcher working at the intersection of public policy, advocacy and international affairs.',
      long: clampWords(
        'Srushti Gajanan Hode is a UK-based political consultant and communications researcher focused on public policy, international relations and strategic advocacy. Her work supports political communications, stakeholder engagement and policy-oriented messaging across institutional and international contexts. She contributes research-driven communication and structured analysis to strengthen public understanding and policy dialogue.',
        140,
      ),
      focus: ['Public policy & advocacy', 'Strategic communications', 'International affairs research', 'Stakeholder engagement'],
      tags: ['Public Policy', 'Advocacy', 'Strategic Communications', 'International Affairs'],
    },
    {
      name: 'Daniele-Hadi Irandoost',
      image: daniele, 
      title: 'Researcher',
      location: 'University of Glasgow, United Kingdom',
      short:
        'Doctoral researcher examining public oversight and accountable governance for security, with interdisciplinary expertise in intelligence studies and education.',
      long: clampWords(
        'Daniele-Hadi Irandoost is a doctoral researcher at the University of Glasgow, where his PhD examines public oversight of the UK’s Investigatory Powers Bill with comparative insights from southern Africa, supported by a College of Social Sciences scholarship. He holds two master’s degrees—in Intelligence & Strategic Studies (Aberystwyth University) and Philosophy of Education (UCL Institute of Education). Daniele is the founder and curator of TEDxLambeth and a published author whose works include On the Philosophy of Education (2022), A New Vision of Spycraft (2023) and The Dogs of Diplomacy (2025). His writing spans intelligence, governance and geopolitics, including contributions to E-International Relations and an essay on Central Asia for OCA Magazine. A Fellow of several learned societies—such as the Royal Anthropological Institute, Royal Asiatic Society, Royal Geographical Society and the Society for Education & Training—he brings interdisciplinary rigour to policy questions. At EPC, Daniele focuses on education reform and accountable governance for security that strengthen regional cooperation across Central Asia.',
        180,
      ),
      focus: ['Accountable governance for security', 'Public oversight & surveillance law', 'Education reform', 'Intelligence & geopolitics'],
      tags: ['Governance', 'Security Oversight', 'Intelligence Studies', 'Education Reform'],
    },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="people"
        title="Researchers"
        description="Dedicated researchers supporting evidence-led analysis, governance quality and programme delivery."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'people', href: '/people' }, { label: 'Researchers' }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Hero band */}
          <div className="rounded-3xl border border-brand-line bg-gradient-to-r from-brand-navy to-brand-navy2 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Research Unit</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-white">Evidence-led work, built for impact</h2>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Our researchers strengthen programme delivery through rigorous analysis, clear communications and policy
                  relevance—supporting accountable governance and cross-regional cooperation.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Standards</div>
                    <div className="mt-2 text-sm text-white/85">Methodical • Clear • Verifiable</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Outputs</div>
                    <div className="mt-2 text-sm text-white/85">Briefs • Analysis • Stakeholder support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-8">
            {researchers.map((r) => (
              <ResearcherCard key={r.name} r={r} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-brand-line bg-brand-mist p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-heading text-lg font-semibold text-slate-900">Work with our researchers</div>
                <div className="mt-1 text-sm text-slate-700">
                  If you’re interested in collaboration, briefings or research support, get in touch.
                </div>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}