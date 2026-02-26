import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";

const programmes = [
  {
    title: "Policy research & briefs",
    body:
      "Commissioned and independent research with transparent methods—written for governments, multilaterals, and private-sector stakeholders who need clarity and options.",
    bullets: ["Rapid briefs", "Flagship reports", "Scenario analysis"],
  },
  {
    title: "Convening & dialogue",
    body:
      "Closed-door and public convening designed to build shared understanding, reduce friction, and identify practical pathways for cooperation.",
    bullets: ["Track-1.5 dialogues", "Conferences", "Roundtables & webinars"],
  },
  {
    title: "Education & training",
    body:
      "Capacity-building programmes that strengthen institutions and leaders—delivered with partners through workshops, seminars, and exchange formats.",
    bullets: ["Exchange programmes", "Seminars", "Workshops"],
  },
];

const focusAreas = [
  {
    title: "Poverty Management",
    subtitle: "Evidence-led approaches that translate insights into measurable outcomes.",
    img: "https://images.unsplash.com/photo-1742202618461-31f6f3584247?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    topics: [
      "Social protection design",
      "Food security & livelihoods",
      "Local delivery systems",
      "Data & impact measurement",
    ],
  },
  {
    title: "Women Empowerment",
    subtitle: "Advancing participation, leadership and economic opportunity across sectors.",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    topics: [
      "Leadership & public service",
      "Skills & workforce access",
      "Entrepreneurship support",
      "Safe participation & inclusion",
    ],
  },
  {
    title: "Education",
    subtitle: "Building capability through practical learning and trusted networks.",
    img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    topics: ["Exchange Programme", "Institutions", "Seminars", "Workshops", "Conference"],
  },
  {
    title: "Climate Change",
    subtitle: "Reducing risk and strengthening resilience through policy and cooperation.",
    img: "https://images.unsplash.com/photo-1753153402720-f8c5a10db6bf?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    topics: ["Water security & diplomacy", "Energy", "Waste management", "Air pollution"],
  },
  {
    title: "Investment",
    subtitle: "Making investment flows more resilient in a changing geopolitical landscape.",
    img: "https://images.unsplash.com/photo-1487875961445-47a00398c267?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    topics: ["Green Investment", "Geopolitical Risk", "Energy Transition", "Regulatory Reform"],
  },
];

export default function WhatWeDo() {
  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="About"
        title="What we do"
        description="We deliver decision support through impartial research, trusted dialogue, and practical education—focused first on priority issues with high public value."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "What We Do" }]}
        actions={
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Explore insights <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* Delivery model */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {programmes.map((p) => (
              <div key={p.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <h2 className="font-heading text-lg font-semibold text-slate-900">{p.title}</h2>
                <p className="mt-2 text-sm text-slate-700">{p.body}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Priority focus areas */}
          <div className="mt-12">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Priority focus areas</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                  Evidence, partnerships, and delivery—applied to what matters most
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-slate-700">
                  Our initial programme phase prioritises Poverty Management and Women Empowerment, alongside Education,
                  Climate Change and Investment—areas where credible analysis and convening can support practical outcomes.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-mist"
                >
                  Discuss priorities <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {focusAreas.map((a) => (
                <div key={a.title} className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                  <div className="relative h-44 w-full">
                    <img src={a.img} alt={a.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <div className="font-heading text-lg font-semibold text-white">{a.title}</div>
                      <div className="mt-1 text-sm text-white/85">{a.subtitle}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Common Formats</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How we work */}
          <div className="mt-10 rounded-2xl border border-brand-line bg-brand-mist p-6">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">How we work</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-slate-900">From question to decision support</h3>
                <p className="mt-2 text-sm text-slate-700">
                  We combine research discipline with convening experience to produce usable outputs: concise briefs,
                  stakeholder maps, policy options and convening notes—structured for busy decision-makers.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-white/90"
                >
                  Discuss a programme <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
