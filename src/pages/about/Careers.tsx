import PageHeader from "../../components/ui/PageHeader";

const steps = [
  "Submit your CV and a short cover note relevant to the role.",
  "Shortlisting and a 20–30 minute screening call.",
  "Technical / writing assessment (role-dependent).",
  "Panel interview and reference checks.",
];

export default function Careers() {
  const EMAIL_TO = "info@epclondon.org";
  const subject = "Application: Careers & Internships — Eurasia Policy Council (EPC)";
  const body =
    "Hello EPC team,%0D%0A%0D%0A" +
    "I’m applying for:%0D%0A" +
    "- Role/Internship:%0D%0A" +
    "- Location (if relevant):%0D%0A%0D%0A" +
    "Please find my CV attached.%0D%0A%0D%0A" +
    "Regards,%0D%0A" +
    "[Your name]%0D%0A" +
    "[Phone]";
  const mailtoHref = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${body}`;

  return (
    <div>
      <PageHeader
        variant="gradient"
        eyebrow="About"
        title="Careers & internships"
        description="Join a team focused on rigorous research, trusted dialogue and practical education programmes."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Careers" }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-12">
            {/* LEFT */}
            <div className="md:col-span-7">
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <h2 className="font-heading text-xl font-semibold text-slate-900">Working with EPC</h2>
                <p className="mt-3 text-sm text-slate-700 md:text-base">
                  We look for people who write clearly, think critically and can engage diverse stakeholders with
                  professionalism. Use this page to publish vacancies and internships, and to explain how to apply.
                </p>

                <p className="mt-6 font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Hiring process</p>
                <ol className="mt-3 space-y-2 text-sm text-slate-700">
                  {steps.map((s, idx) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-mist text-xs font-semibold text-slate-700">
                        {idx + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Current openings</p>

                <div className="mt-4 rounded-xl border border-brand-line bg-white p-5">
                  <div className="font-heading text-base font-semibold text-slate-900">No openings at this time</div>
                  <p className="mt-2 text-sm text-slate-700">
                    When roles are live, list them here with title, location, type, requirements and how to apply.
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-brand-line bg-white p-5">
                  <div className="font-heading text-base font-semibold text-slate-900">Internships</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Add an internship overview, duration, expected skills and any application deadlines.
                  </p>
                </div>

                {/* EMAIL CTA (bottom right box you asked for) */}
                <div className="mt-4 rounded-xl border border-brand-line bg-white p-5">
                  <div className="font-heading text-base font-semibold text-slate-900">Apply by email</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Click below to email our team. Your email will open with a suggested subject line.
                  </p>

                  <a
                    href={mailtoHref}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
                  >
                    Email {EMAIL_TO}
                  </a>

                  <p className="mt-2 text-xs text-slate-500">
                    Subject used: <span className="font-semibold">{subject}</span>
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    If the button doesn’t work, email{" "}
                    <a className="font-semibold text-brand-navy underline" href={`mailto:${EMAIL_TO}`}>
                      {EMAIL_TO}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            {/* /RIGHT */}
          </div>
        </div>
      </section>
    </div>
  );
}