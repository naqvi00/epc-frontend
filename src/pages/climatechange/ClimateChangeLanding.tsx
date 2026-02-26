import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Flame, Recycle, Wind } from "lucide-react";
import clsx from "clsx";
import PageHeader from "../../components/ui/PageHeader";

type Topic = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string; // you will change
  badge?: string;
};

function TopicCard({ t }: { t: Topic }) {
  return (
    <Link
      to={t.href}
      className={clsx(
        "group block overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card",
        "transition hover:-translate-y-0.5 hover:shadow-lg"
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

        <h3 className="mt-5 font-heading text-xl font-semibold text-slate-900">
          {t.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t.description}</p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-brand-blue/60 via-brand-navy/60 to-brand-blue/60 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

export default function ClimateChangeLanding() {
  // ✅ Change these hrefs to your real routes later
  const topics: Topic[] = [
    {
      title: "Security & diplomacy",
      description:
        "Climate-driven instability, resilience strategy, geopolitical risk, and international coordination.",
      icon: <Shield className="h-5 w-5" />,
      href: "/climate-change/security-diplomacy", 
      badge: "Sub-category",
    },
    {
      title: "Energy",
      description:
        "Energy transition, renewables, critical minerals, grid resilience, and policy impact.",
      icon: <Flame className="h-5 w-5" />,
      href: "/climate-change/energy",
      badge: "Sub-category",
    },
    {
      title: "Waste management",
      description:
        "Circular economy, plastics, recycling systems, regulation, and community-scale solutions.",
      icon: <Recycle className="h-5 w-5" />,
      href: "/climate-change/waste-management",
      badge: "Sub-category",
    },
    {
      title: "Air pollution",
      description:
        "Urban air quality, emissions, health impact, monitoring, and clean-air interventions.",
      icon: <Wind className="h-5 w-5" />,
      href: "/climate-change/air-pollution",
      badge: "Sub-category",
    },
  ];

  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="Climate Change"
        title="Climate change"
        description="Explore research and analysis across key climate themes. Select a sub-category to dive deeper."
        crumbs={[{ label: "Home", href: "/" }, { label: "Climate change" }]}
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
                  A structured hub for climate content
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

          {/* Footer note */}
          <div className="mt-10 mx-auto max-w-4xl text-center">
            <p className="text-sm text-slate-600">
              Want a new sub-category? Add a new page slug on backend and create the public + admin page
              like we did for <span className="font-semibold text-slate-800">security-diplomacy</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
