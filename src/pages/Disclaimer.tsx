import PageHeader from "../components/ui/PageHeader";

const sections = [
  {
    title: "1. General information only",
    body: [
      "The content published by the Economic Policy Centre (EPC) on this website is provided for general information, research engagement, public education and policy discussion purposes only.",
    ],
  },
  {
    title: "2. No professional advice",
    body: [
      "Nothing on this website constitutes legal, financial, tax, investment, regulatory or other professional advice.",
      "Users should obtain independent professional guidance appropriate to their own circumstances before acting on any information published by EPC.",
    ],
  },
  {
    title: "3. Research, commentary and analysis",
    body: [
      "EPC publishes reports, commentary, event summaries, interviews and public-interest materials in good faith and with care.",
      "However, no representation or warranty is made that all content is complete, current, accurate or free from error at all times.",
    ],
  },
  {
    title: "4. Views expressed",
    body: [
      "Views expressed in articles, commentary, interviews, event sessions or guest contributions are those of the relevant authors or speakers unless expressly stated otherwise.",
      "They do not necessarily reflect the official institutional position of EPC.",
    ],
  },
  {
    title: "5. Reliance on content",
    body: [
      "Any reliance placed on material published on this website is at your own risk.",
      "To the fullest extent permitted by law, EPC disclaims liability for any loss or damage arising directly or indirectly from use of, reference to, or reliance upon website content.",
    ],
  },
  {
    title: "6. External links and third-party material",
    body: [
      "This website may reference or link to external organisations, reports, partner platforms or third-party websites for convenience and context.",
      "EPC does not endorse and is not responsible for the content, availability, services or practices of third-party sites.",
    ],
  },
  {
    title: "7. Events and recordings",
    body: [
      "Event descriptions, speaker listings, programmes, recordings and summaries are provided for general informational purposes.",
      "Event content may be edited, updated, postponed, restricted or withdrawn, and inclusion of a speaker or partner does not imply endorsement of all views expressed.",
    ],
  },
  {
    title: "8. Website availability",
    body: [
      "EPC does not guarantee that the website or any content on it will always be available, uninterrupted, secure or free from technical issues.",
      "Access may be suspended, restricted or withdrawn at any time without notice.",
    ],
  },
  {
    title: "9. Forward-looking observations",
    body: [
      "Some content may include forecasts, expectations, projections or forward-looking analysis. Such material is inherently uncertain and should not be treated as a guarantee of future results or policy outcomes.",
    ],
  },
  {
    title: "10. Changes",
    body: [
      "EPC reserves the right to amend, revise or remove website content, publications and notices at any time without prior notice.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "If you have questions about this Disclaimer, please contact EPC through the contact details listed on the website.",
    ],
  },
];

export default function Disclaimer() {
  return (
    <main className="bg-white">
      <PageHeader
        variant="gradient"
        eyebrow="Legal"
        title="Disclaimer"
        description="Important information about the nature of EPC’s publications, commentary, website materials and event content."
        crumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-sm">
          <div className="border-b border-brand-line bg-gradient-to-r from-slate-50 via-white to-brand-mist/40 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  Important Legal Notice
                </p>
                <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  Disclaimer
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  This page explains the limits of EPC’s website content and the
                  conditions under which users may interpret, reference and rely
                  on material published through the platform.
                </p>
              </div>

              <div className="shrink-0">
                <div className="rounded-2xl border border-brand-line bg-white px-4 py-3 text-right shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Published
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">3/16/2026</p>
                </div>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center rounded-full border border-brand-line bg-brand-mist/60 px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Effective date
              </span>
              <span className="ml-3 text-sm font-bold text-brand-blue">March 16, 2026</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8 rounded-2xl border border-brand-line bg-slate-50/70 p-5">
              <p className="text-sm leading-7 text-slate-700">
                EPC’s website supports research, dialogue and public policy
                engagement. The information published here is intended to inform
                discussion, not to replace independent professional judgment or
                create formal advisory reliance.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-brand-line bg-white p-5 transition-shadow hover:shadow-sm md:p-6"
                >
                  <h2 className="font-heading text-xl font-semibold text-slate-900">
                    {section.title}
                  </h2>

                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph, idx) => (
                      <p key={idx} className="text-sm leading-7 text-slate-700 md:text-[15px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
