import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

type TopicCard = {
  slug: string
  name: string
  description: string
  image: string
  subcategories: string[]
  note?: string
  href: string 
}

const TOPICS: TopicCard[] = [
  {
    slug: 'education',
    name: 'Education',
    href: '/education', 
    description:
      'Capacity-building programmes that strengthen institutions, support professional networks, and develop practical policy skills through structured learning and exchange.',
    image:
      'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9sYW5kJTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    subcategories: ['Exchange Programme', 'Institutions', 'Seminars', 'Workshops', 'Conference'],
    note: 'Designed for decision-makers, practitioners, and emerging leaders.',
  },
  {
    slug: 'climate-change',
    name: 'Climate Change',
    href: '/climate-change', 
    description:
      'Research and dialogue focused on climate-linked risks, resilience, and actionable pathways—bridging science, policy, and implementation.',
    image:
      'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9yaXpvbiUyMHN1bnJpc2V8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    subcategories: ['Water security and diplomacy', 'Energy', 'Waste management', 'Air pollution'],
    note: 'Evidence-led work that supports practical cooperation across borders.',
  },
  {
    slug: 'investment',
    name: 'Investment',
    href: '/investment', 
    description:
      'Analysis and convening on investment flows, policy certainty, and risk—supporting long-term, transparent, and resilient economic decision-making.',
    image:
      'https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?q=80&w=955&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subcategories: ['Green Investment', 'Geopolitical Risk', 'Energy Transition', 'Regulatory Reform'],
    note: 'Built for governments, multilaterals, and responsible private-sector actors.',
  },
  {
    slug: 'poverty-management',
    name: 'Poverty Management',
    href: '/poverty-management', 
    description:
      'Work focused on inclusive development and practical poverty reduction—grounded in local realities, measurable outcomes, and institutional delivery.',
    image:
      'https://images.unsplash.com/photo-1494832944834-a08818c634b0?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subcategories: [],
    note: 'A first-phase priority topic as requested by the client.',
  },
  {
    slug: 'women-empowerment',
    name: 'Women Empowerment',
    href: '/women-empowerment', 
    description:
      'Research, dialogue, and programmes that strengthen participation, leadership, and opportunity—supporting more resilient societies and inclusive growth.',
    image:
      'https://images.unsplash.com/photo-1547937084-4d587301a545?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBlbXBvd2VybWVudHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    subcategories: [],
    note: 'A first-phase priority topic as requested by the client.',
  },
]

function TopicCardView({ t }: { t: TopicCard }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
      {/* Image */}
      <div className="relative h-44 md:h-52">
        <img
          src={t.image}
          alt={`${t.name} topic`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/35 to-transparent" />
        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Topic</p>
              <h2 className="mt-1 font-heading text-2xl font-semibold text-white">{t.name}</h2>
            </div>
            <span className="hidden rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/85 md:inline-flex">
              Explore
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm leading-6 text-slate-700">{t.description}</p>

        {t.note && (
          <div className="mt-4 rounded-2xl border border-brand-line bg-brand-mist px-4 py-3 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Priority note:</span> {t.note}
          </div>
        )}

        {t.subcategories.length > 0 && (
          <div className="mt-5">
            <div className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Further Topics
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.subcategories.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-brand-line bg-white px-3 py-1 text-xs text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-line pt-5">
          <div className="text-xs text-slate-500">
            {t.subcategories.length > 0 ? 'Filters ready for CMS linking.' : 'Topic page can be added next.'}
          </div>

          {/* You can change this later to your real topic detail route */}
        <Link
  to={t.href}
  className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
>
  Explore topic <ArrowRight className="h-4 w-4" />
</Link>

            
        </div>
      </div>
    </div>
  )
}

export default function TopicsListing() {
  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Research / Insights"
        title="Topics"
        description="A focused set of priority topics for the first phase of the site. Additional themes can be introduced later without changing the design system."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Research / Insights', href: '/insights' }, { label: 'Topics' }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Intro band */}
          <div className="rounded-3xl border border-brand-line bg-brand-mist p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Phase 1 focus</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-slate-900">
                  Practical analysis, credible convening, and usable outputs
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  These topics can power filters across insights, publications, and events. Each topic card below can link
                  to a dedicated page once your backend/CMS is connected.
                </p>
              </div>

              <div className="md:col-span-4 md:text-right">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-white/90"
                >
                  Propose a collaboration <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {TOPICS.map((t) => (
              <TopicCardView key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
