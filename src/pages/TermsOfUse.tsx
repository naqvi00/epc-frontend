import PageHeader from "../components/ui/PageHeader";

const sections = [
  {
    title: "1. About EPC",
    body: [
      "The Economic Policy Centre (EPC) is an independent think tank and policy platform that publishes research, analysis, commentary, event material and public-interest content for educational and engagement purposes.",
    ],
  },
  {
    title: "2. Acceptance of these terms",
    body: [
      "By accessing or using this website, you agree to these Terms of Use. If you do not agree with them, you should not use the website.",
    ],
  },
  {
    title: "3. Permitted use",
    body: [
      "You may use this website for lawful, personal, educational, professional or policy-reference purposes only.",
      "You must not use the website in any way that is unlawful, harmful, abusive, deceptive, disruptive, or that interferes with its proper operation or security.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "Unless otherwise stated, all content on this website, including text, branding, design, graphics, publications, event materials and downloadable content, is owned by or licensed to EPC and is protected by intellectual property law.",
      "You may view, download and print materials for non-commercial reference or educational use, provided that attribution is preserved and meaning is not altered.",
    ],
  },
  {
    title: "5. Restrictions",
    body: [
      "You may not reproduce, republish, scrape, modify, distribute, sell or commercially exploit EPC content without prior written permission unless such use is otherwise permitted by law.",
    ],
  },
  {
    title: "6. Publications and viewpoints",
    body: [
      "EPC publishes research, reports, event summaries and commentary to support informed debate and policy engagement.",
      "Views expressed in particular articles, papers, interviews or event remarks may belong to the individual authors or speakers and do not necessarily represent an official institutional position unless clearly stated.",
    ],
  },
  {
    title: "7. Events and registrations",
    body: [
      "EPC may offer access to public or private events, briefings, webinars and roundtables through the website.",
      "Event details may be updated, postponed, limited or cancelled where necessary. Users registering for events must provide accurate information and comply with event-specific instructions.",
    ],
  },
  {
    title: "8. External links",
    body: [
      "This website may contain links to third-party sites, partner platforms, reports or external resources. EPC does not control and is not responsible for their content, availability, accuracy or practices.",
    ],
  },
  {
    title: "9. Accuracy and availability",
    body: [
      "EPC seeks to publish information carefully and in good faith, but does not guarantee that all website content is complete, current, accurate or free from error.",
      "We may revise, remove or update content at any time without notice and do not guarantee uninterrupted access to the site.",
    ],
  },
  {
    title: "10. Prohibited conduct",
    body: [
      "You agree not to attempt unauthorised access to the website, introduce malicious code, misuse forms or services, impersonate others, or use the platform to distribute unlawful, defamatory or harmful material.",
    ],
  },
  {
    title: "11. Limitation of liability",
    body: [
      "To the fullest extent permitted by law, EPC excludes liability for indirect, incidental or consequential loss arising from use of, or reliance on, this website or its content.",
      "Nothing in these Terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    title: "12. Privacy",
    body: [
      "Use of the website is also subject to EPC’s Privacy Policy and any applicable cookies notice or policy.",
    ],
  },
  {
    title: "13. Changes to these terms",
    body: [
      "EPC may update these Terms of Use from time to time. The latest version published on this page will apply from the date of publication unless otherwise stated.",
    ],
  },
  {
    title: "14. Governing law",
    body: [
      "These Terms are governed by the laws of England and Wales, unless another legal framework is required by applicable law. Relevant disputes shall be subject to the jurisdiction of the appropriate courts of England and Wales.",
    ],
  },
  {
    title: "15. Contact",
    body: [
      "Questions regarding these Terms of Use may be directed to EPC using the contact details provided on the website.",
    ],
  },
];

export default function TermsOfUse() {
  return (
    <main className="bg-white">
      <PageHeader
        variant="gradient"
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms governing access to and use of EPC’s website, publications, events and public materials."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-sm">
          <div className="border-b border-brand-line bg-gradient-to-r from-slate-50 via-white to-brand-mist/40 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  Website Access & Use
                </p>
                <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  Terms of Use
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  These terms set out the conditions for using EPC’s website and
                  public-facing materials, including publications, event pages,
                  downloads and policy content.
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
                By using this website, you agree to these Terms of Use. They are
                intended to protect both EPC and its users while supporting a
                professional, secure and reliable environment for policy
                research, public dialogue and institutional communication.
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
