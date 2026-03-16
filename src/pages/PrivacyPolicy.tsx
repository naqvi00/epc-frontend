import PageHeader from "../components/ui/PageHeader";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      <PageHeader
        variant="gradient"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How EPC collects, uses and protects personal information across its website, events, research and communications."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm md:p-8">
          <div className="prose prose-slate max-w-none">
            <p>
              Effective date: [Insert date]
            </p>

            <p>
              The Economic Policy Centre (EPC) is committed to protecting your privacy and handling
              your personal data responsibly, fairly and transparently. This Privacy Policy explains
              how we collect, use, store and protect your information when you visit our website,
              engage with our research, register for events, subscribe to updates, or otherwise
              interact with EPC.
            </p>

            <h2>1. Who we are</h2>
            <p>
              EPC is an independent think tank and policy platform focused on research, dialogue and
              engagement on economic, social and public policy issues. For the purpose of applicable
              data protection law, EPC is the controller of the personal data collected through this
              website and related services, unless stated otherwise.
            </p>

            <h2>2. Information we may collect</h2>
            <p>We may collect and process the following categories of information:</p>
            <ul>
              <li>Your name, email address, phone number and organisation details.</li>
              <li>Information you submit through contact forms, registration forms or email correspondence.</li>
              <li>Event-related information, including attendance preferences and professional details.</li>
              <li>Newsletter and mailing list preferences.</li>
              <li>Technical information such as browser type, IP address, device information and website usage data.</li>
              <li>Any other information you voluntarily provide when engaging with EPC.</li>
            </ul>

            <h2>3. How we use your information</h2>
            <p>We may use your information to:</p>
            <ul>
              <li>Respond to enquiries and correspondence.</li>
              <li>Provide access to events, briefings, webinars and related materials.</li>
              <li>Send newsletters, research updates, invitations and institutional communications.</li>
              <li>Improve website performance, content and user experience.</li>
              <li>Maintain administrative, security and internal record-keeping functions.</li>
              <li>Comply with applicable legal and regulatory obligations.</li>
            </ul>

            <h2>4. Legal basis for processing</h2>
            <p>Where applicable, we process personal data on one or more of the following bases:</p>
            <ul>
              <li>Your consent.</li>
              <li>The performance of a contract or steps prior to entering into one.</li>
              <li>Our legitimate interests in operating, improving and safeguarding EPC’s work and website.</li>
              <li>Compliance with legal obligations.</li>
            </ul>

            <h2>5. Communications and mailing lists</h2>
            <p>
              If you subscribe to updates or register for an event, EPC may send you communications
              relevant to our research, publications, activities and invitations. You may opt out of
              non-essential communications at any time by using the unsubscribe link in our emails or
              by contacting us directly.
            </p>

            <h2>6. Events and public engagement</h2>
            <p>
              Where you register for EPC events, we may use your information to manage attendance,
              communicate practical details, share related materials, and maintain records relevant to
              that event. Some events may be recorded, photographed or summarised for reporting,
              publication or communications purposes. Where appropriate, additional notice will be provided.
            </p>

            <h2>7. Cookies and analytics</h2>
            <p>
              EPC may use cookies or similar technologies to improve website functionality, understand
              visitor behaviour and enhance user experience. These may include essential cookies,
              performance cookies and analytics tools. You can manage cookie preferences through your
              browser settings. Where required by law, cookie notices or consent tools will be provided.
            </p>

            <h2>8. Sharing your information</h2>
            <p>
              We do not sell your personal data. We may share information with trusted service providers
              who support our website, communications, analytics, event administration or operational
              functions, provided they process data only on appropriate instructions and with suitable safeguards.
            </p>

            <p>We may also disclose information where necessary:</p>
            <ul>
              <li>To comply with law, regulation or legal process.</li>
              <li>To protect the rights, safety and integrity of EPC, its users or the public.</li>
              <li>In connection with organisational restructuring or administrative transition, where lawful and appropriate.</li>
            </ul>

            <h2>9. Data retention</h2>
            <p>
              We retain personal data only for as long as reasonably necessary for the purposes for
              which it was collected, including communication, event management, compliance, dispute
              resolution and legitimate institutional record-keeping.
            </p>

            <h2>10. Data security</h2>
            <p>
              EPC takes reasonable technical and organisational measures to protect personal data
              against unauthorised access, misuse, loss, disclosure or destruction. However, no online
              system or transmission method can be guaranteed to be completely secure.
            </p>

            <h2>11. Your rights</h2>
            <p>
              Depending on your location and applicable law, you may have rights in relation to your
              personal data, including the right to request access, correction, deletion, restriction,
              objection, or data portability, and the right to withdraw consent where processing is based on consent.
            </p>

            <p>
              To exercise these rights, please contact EPC using the contact details published on the website.
            </p>

            <h2>12. Third-party links</h2>
            <p>
              Our website may contain links to external websites, publications, platforms or partner
              organisations. EPC is not responsible for the privacy practices, content or security of
              third-party services, and you should review their own policies before providing personal information.
            </p>

            <h2>13. International visitors</h2>
            <p>
              If you access our website from outside the United Kingdom, please note that your
              information may be processed in jurisdictions where EPC or its service providers operate,
              subject to applicable safeguards where required.
            </p>

            <h2>14. Changes to this policy</h2>
            <p>
              EPC may update this Privacy Policy from time to time to reflect legal, operational or
              institutional changes. Any revised version will be posted on this page with an updated effective date.
            </p>

            <h2>15. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or about how EPC handles personal data,
              please contact us through the contact details provided on our website.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
