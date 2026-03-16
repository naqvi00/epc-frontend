import PageHeader from "../components/ui/PageHeader";

export default function TermsOfUse() {
  return (
    <main className="bg-white">
      <PageHeader
        variant="gradient"
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms governing access to and use of EPC’s website, publications, events and public materials."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Use" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm md:p-8">
          <div className="prose prose-slate max-w-none">
            <p>
              Effective date: [Insert date]
            </p>

            <p>
              These Terms of Use govern your access to and use of the website operated by the Economic
              Policy Centre (EPC). By using this website, you agree to be bound by these Terms. If you
              do not agree, please do not use the website.
            </p>

            <h2>1. About EPC</h2>
            <p>
              EPC is an independent think tank and policy platform that publishes research, commentary,
              analysis and event-related content for public information, policy engagement and educational purposes.
            </p>

            <h2>2. Use of the website</h2>
            <p>You may use this website only for lawful purposes and in a manner that does not:</p>
            <ul>
              <li>Violate applicable laws or regulations.</li>
              <li>Infringe the rights of EPC or any third party.</li>
              <li>Interfere with the proper functioning, security or availability of the website.</li>
              <li>Introduce malicious code, spam, automated abuse or disruptive activity.</li>
            </ul>

            <h2>3. Intellectual property</h2>
            <p>
              Unless otherwise stated, all website content, including text, design, branding, graphics,
              documents, publications, event content and other materials, is owned by or licensed to EPC
              and is protected by applicable intellectual property laws.
            </p>

            <p>
              You may view, download and print content for personal, non-commercial, educational or
              policy-reference purposes, provided that you do not remove attribution, alter meaning, or
              imply endorsement by EPC.
            </p>

            <p>
              You may not reproduce, republish, distribute, modify, sell or commercially exploit EPC
              content without prior written permission, except where use is otherwise permitted by law.
            </p>

            <h2>4. Publications and policy content</h2>
            <p>
              EPC publishes research, commentary and public-interest material intended to contribute to
              discussion and informed debate. The views expressed in particular articles, papers, event
              remarks or commentary may be those of the individual authors or speakers and do not always
              represent an institutional position unless expressly stated.
            </p>

            <h2>5. Events and registrations</h2>
            <p>
              EPC may offer registration for public or private events, roundtables, webinars and briefings.
              Event details may be updated, postponed, cancelled or limited at EPC’s discretion where necessary.
            </p>

            <p>
              By registering for an event, you agree to provide accurate information and to comply with
              any event-specific instructions or conditions shared by EPC.
            </p>

            <h2>6. External links</h2>
            <p>
              This website may include links to third-party websites, reports, partner platforms or
              external resources for convenience and reference. EPC does not control and is not
              responsible for the availability, content, accuracy or practices of third-party websites.
            </p>

            <h2>7. Accuracy and availability</h2>
            <p>
              EPC seeks to ensure that information published on this website is presented carefully and
              in good faith. However, we do not guarantee that all content is always complete, current,
              accurate or free from error. Website content may be updated, revised or removed without notice.
            </p>

            <p>
              EPC does not guarantee uninterrupted access to the website and may suspend, withdraw or
              modify any aspect of the site at any time for operational, security or editorial reasons.
            </p>

            <h2>8. Prohibited conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Attempt unauthorised access to the website, server or related systems.</li>
              <li>Copy or scrape website content in a harmful or abusive manner.</li>
              <li>Use the website to transmit unlawful, defamatory, fraudulent or harmful material.</li>
              <li>Misrepresent your identity or affiliation when interacting with EPC through the website.</li>
            </ul>

            <h2>9. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, EPC excludes liability for any indirect,
              consequential or incidental loss arising from use of, or reliance on, this website or its content.
            </p>

            <p>
              Nothing in these Terms excludes liability that cannot lawfully be excluded under applicable law.
            </p>

            <h2>10. Privacy and data protection</h2>
            <p>
              Your use of the website is also subject to our Privacy Policy and any applicable Cookies Policy.
            </p>

            <h2>11. Changes to these Terms</h2>
            <p>
              EPC may update these Terms of Use from time to time. Revised terms will take effect when
              published on this page unless otherwise stated.
            </p>

            <h2>12. Governing law</h2>
            <p>
              These Terms are governed by the laws of England and Wales, unless another applicable legal
              framework is required by law. Any disputes arising in connection with these Terms shall be
              subject to the jurisdiction of the appropriate courts of England and Wales.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about these Terms may be directed to EPC using the contact details available on the website.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
