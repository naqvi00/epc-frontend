import PageHeader from "../components/ui/PageHeader";

const sections = [
  {
    title: "1. Who we are",
    body: [
      "The Economic Policy Centre (EPC) is an independent think tank and policy platform focused on research, dialogue and engagement on economic, social and public policy issues.",
      "For the purposes of applicable data protection law, EPC acts as the controller of personal data collected through this website and related services unless stated otherwise.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "We may collect information you provide directly, including your name, email address, organisation, phone number, registration details, event preferences, and any information submitted through forms, correspondence or subscriptions.",
      "We may also collect technical and usage information such as browser type, IP address, device information, referral pages and interactions with the website.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "We use personal information to respond to enquiries, manage event registrations, send newsletters or policy updates, improve website functionality, maintain internal records, strengthen security, and meet applicable legal obligations.",
    ],
  },
  {
    title: "4. Legal basis for processing",
    body: [
      "Where required by law, we process personal data on the basis of consent, legitimate interests, contractual necessity, or compliance with legal obligations.",
    ],
  },
  {
    title: "5. Communications and subscriptions",
    body: [
      "If you subscribe to updates or register for an EPC event, we may contact you with relevant invitations, research updates, policy briefings and institutional announcements.",
      "You may opt out of non-essential communications at any time using the unsubscribe link in our emails or by contacting us directly.",
    ],
  },
  {
    title: "6. Events, recordings and public engagement",
    body: [
      "Where you register for EPC events, we may use your information to manage attendance, communicate event details, share related materials, and maintain records connected to those activities.",
      "Some events may be recorded, photographed or summarised for institutional, communications or publication purposes. Where appropriate, additional notice will be provided.",
    ],
  },
  {
    title: "7. Cookies and analytics",
    body: [
      "We may use cookies and similar technologies to improve website functionality, understand visitor behaviour and enhance user experience.",
      "You can manage cookie preferences through your browser settings. Where required, cookie notices or consent tools will be provided.",
    ],
  },
  {
    title: "8. Sharing your information",
    body: [
      "We do not sell personal data. We may share information with trusted service providers supporting website operations, analytics, communications or event administration, subject to appropriate confidentiality and data handling safeguards.",
      "We may also disclose information where required by law, to protect rights and safety, or as part of lawful organisational administration.",
    ],
  },
  {
    title: "9. Data retention",
    body: [
      "We retain personal data only for as long as reasonably necessary for the purposes for which it was collected, including communication, administration, compliance and legitimate record-keeping.",
    ],
  },
  {
    title: "10. Data security",
    body: [
      "EPC takes reasonable technical and organisational steps to protect personal data from unauthorised access, misuse, disclosure, loss or destruction.",
      "However, no digital platform or transmission method can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "11. Your rights",
    body: [
      "Depending on applicable law, you may have rights to request access, correction, deletion, restriction, objection, portability, or withdrawal of consent in relation to your personal data.",
      "Requests may be made using the contact details available on our website.",
    ],
  },
  {
    title: "12. External links",
    body: [
      "Our website may contain links to third-party websites, platforms, publications or partner organisations. EPC is not responsible for the content, privacy practices or security of those third-party services.",
    ],
  },
  {
    title: "13. International access",
    body: [
      "If you access this website from outside the United Kingdom, your information may be processed in jurisdictions where EPC or its service providers operate, subject to applicable safeguards where required.",
    ],
  },
  {
    title: "14. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect legal, operational or institutional changes. The latest version will always be published on this page.",
    ],
  },
  {
    title: "15. Contact",
    body: [
      "If you have questions about this Privacy Policy or how EPC handles personal data, please contact us using the contact details provided on the website.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      <PageHeader
        variant="gradient"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How EPC collects, uses and protects personal information across its website, events, research and communications."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-sm">
          <div className="border-b border-brand-line bg-gradient-to-r from-slate-50 via-white to-brand-mist/40 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  Privacy & Data Protection
                </p>
                <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  Privacy Policy
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  EPC is committed to protecting personal information with care,
                  transparency and responsibility across its digital platforms,
                  research engagement, communications and public events.
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
                This Privacy Policy explains what information EPC may collect,
                how it may be used, when it may be shared, and the steps taken
                to help protect it. It applies to interactions through our
                website, events, publications, contact channels and related
                public-facing services.
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
