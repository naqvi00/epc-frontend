import PageHeader from "../../components/ui/PageHeader";
import { Target, Telescope, ShieldCheck } from "lucide-react";

import missionImg from "../../assets/mission.png";
import visionImg from "../../assets/vision.png";

const objectives = [
  "Build a robust knowledge base on Eurasian security trends and criminal networks.",
  "Improve police interoperability across Eurasian jurisdictions.",
  "Facilitate policy alignment and mutual legal assistance frameworks.",
  "Provide training and capacity-building for law enforcement agencies in advanced, ethical policing.",
  "Promote data-driven and rights-based approaches to policing.",
  "Provide a conflict-resolution platform for law enforcement in high-tension regions.",
  "Promote cross-border cooperation on security strategies, intelligence sharing, and policing models between Eurasian states.",
  "Facilitate expert dialogue through forums, summits, and academic exchanges.",
  "Publish evidence-based research on public safety, digital security, and transnational criminal networks.",
  "Act as a bridge between policymakers, law enforcement professionals, civil society and international institutions.",
];


function FeatureCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: any;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="rounded-3xl border border-brand-line bg-white shadow-card overflow-hidden">
      <div className="grid md:grid-cols-12">
        {/* Text */}
        <div className="p-7 md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-mist border border-brand-line">
              <Icon className="h-5 w-5 text-brand-blue" />
            </span>
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">
              {eyebrow}
            </p>
          </div>

          <h2 className="mt-4 font-heading text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          <p className="mt-3 text-sm md:text-base leading-6 text-slate-700">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs text-slate-700">
              Evidence-led
            </span>
            <span className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs text-slate-700">
              Practical outputs
            </span>
            <span className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs text-slate-700">
              Trusted networks
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-5">
          <div className="h-56 md:h-full w-full bg-gradient-to-b from-brand-navy to-brand-navy2 relative">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <div>
  <PageHeader
  variant="gradient"
  eyebrow="About"
  title="Mission & vision"
  description="A clear purpose, a practical vision, and the objectives that guide our work across the region."
  crumbs={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Mission & Vision" },
  ]}
/>

      {/* ✅ Premium background */}
      <section className="bg-gradient-to-b from-white to-brand-mist/60">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Mission + Vision */}
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              eyebrow="Mission"
              title="Enhance Public Safety & Stability"
              description="To enhance public safety and regional stability in Eurasia through collaborative research, policy development, and law enforcement capacity-building grounded in rule of law and democratic accountability."
              icon={Target}
              imageSrc={missionImg}
              imageAlt="Mission illustration"
            />

            <FeatureCard
              eyebrow="Vision"
              title="A Secure, Connected Eurasia"
              description="A secure, connected Eurasia where law enforcement bodies operate transparently and cooperatively to prevent and respond to transnational threats."
              icon={Telescope}
              imageSrc={visionImg}
              imageAlt="Vision illustration"
            />
          </div>

          {/* ✅ Objectives (replaces Values) */}
          <div className="mt-10 rounded-3xl border border-brand-line bg-white shadow-card overflow-hidden">
            <div className="border-b border-brand-line p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-mist border border-brand-line">
                  <ShieldCheck className="h-5 w-5 text-brand-blue" />
                </span>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">
                    Objectives
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                    What we aim to deliver
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 max-w-3xl">
                Clear priorities that shape our research, dialogue and capacity-building work across Eurasia.
              </p>
            </div>

            <div className="p-7">
              <div className="grid gap-4 md:grid-cols-2">
                {objectives.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-brand-line bg-brand-mist/40 p-5 hover:bg-brand-mist/70 transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-brand-blue" />
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         

        </div>
      </section>
    </div>
  );
}