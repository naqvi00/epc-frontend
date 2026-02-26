import { Link } from "react-router-dom"
import { ArrowRight, Leaf, Sprout, ShieldAlert, Flame, Scale } from "lucide-react"
import clsx from "clsx"
import PageHeader from "../../components/ui/PageHeader"

type Topic = {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  badge?: string
}

function TopicCard({ t }: { t: Topic }) {
  return (
    <Link
      to={t.href}
      className={clsx(
        "group block overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card",
        "transition hover:-translate-y-0.5 hover:shadow-lg",
      )}
    >
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-line bg-brand-mist text-brand-navy">
            {t.icon}
          </div>

          {t.badge && (
            <div className="rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
              {t.badge}
            </div>
          )}
        </div>

        <h3 className="mt-5 font-heading text-xl font-semibold text-slate-900">{t.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t.description}</p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-brand-blue/60 via-brand-navy/60 to-brand-blue/60 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  )
}

export default function InvestmentLanding() {
  const topics: Topic[] = [
    {
      title: "Green investment",
      description:
        "Sustainable finance, ESG strategy, climate-aligned capital, and nature-positive investment opportunities.",
      icon: <Sprout className="h-5 w-5" />,
      href: "/investment/green-investment",
      badge: "Sub-category",
    },
    {
      title: "Geopolitical risk",
      description:
        "Political instability, sanctions, supply-chain shocks, and investment risk assessment across regions.",
      icon: <ShieldAlert className="h-5 w-5" />,
      href: "/investment/geopolitical-risk",
      badge: "Sub-category",
    },
    {
      title: "Energy transition",
      description:
        "Renewables, grid resilience, critical minerals, and the policy & market forces shaping transition investment.",
      icon: <Flame className="h-5 w-5" />,
      href: "/investment/energy-transition",
      badge: "Sub-category",
    },
    {
      title: "Regulatory reform",
      description:
        "Investment rules, governance, compliance, market access, and reforms enabling cross-border capital flows.",
      icon: <Scale className="h-5 w-5" />,
      href: "/investment/regulatory-reform",
      badge: "Sub-category",
    },
  ]

  return (
    <div>
      <PageHeader
        variant="gradient"
        eyebrow="Investment"
        title="Investment"
        description="Explore investment research and analysis across key themes. Select a sub-category to dive deeper."
        crumbs={[{ label: "Home", href: "/" }, { label: "Investment" }]}
        actions={
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Partner with us <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Intro block */}
          <div className="mx-auto max-w-4xl rounded-3xl border border-brand-line bg-brand-mist p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
                  <Leaf className="h-4 w-4 text-brand-navy" />
                  Overview
                </div>

                <h2 className="mt-4 font-heading text-2xl font-semibold text-slate-900">
                  A structured hub for investment content
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Browse sub-categories below. Each section can contain featured pieces, latest research,
                  and an archive—managed from the admin panel.
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {topics.map((t) => (
              <TopicCard key={t.title} t={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}