import {
  Mail,
  FileText,
  Mic,
  Download,
  Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import img1 from "../../assets/media1.png";
import img2 from "../../assets/media2.png";
import img3 from "../../assets/media3.png";
import img4 from "../../assets/media4.png";
import img5 from "../../assets/media5.png";
import img6 from "../../assets/media6.png";


type PressImage = {
  id: string;
  src: string; // replace with your import or url
  alt: string;
  caption: string;
};

const PRESS_IMAGES: PressImage[] = [
  {
    id: "p1",
    src: img1,
    alt: "Press image 1",
    caption: "Roundtable dialogue — London",
  },
  {
    id: "p2",
    src: img2,
    alt: "Press image 2",
    caption: "Research briefing — policy audience",
  },
  {
    id: "p3",
    src: img3,
    alt: "Press image 3",
    caption: "Publication launch — EPC insights",
  },
  {
    id: "p4",
    src: img4,
    alt: "Press image 4",
    caption: "Stakeholder workshop — training",
  },
  {
    id: "p5",
    src: img5,
    alt: "Press image 5",
    caption: "Expert discussion — Eurasia focus",
  },
  {
    id: "p6",
    src: img6,
    alt: "Press image 6",
    caption: "Closed-door session — partners",
  },
];

const resources = [
  {
    title: "Press kit",
    body: "Logos, approved organisation description, and press-ready photos.",
    icon: FileText,
    actionLabel: "Download kit",
    href: "#", // replace later
  },
  {
    title: "Spokespeople",
    body: "Approved experts, topics/regions, and availability guidelines.",
    icon: Mic,
    actionLabel: "View list",
    href: "#", // replace later
  },
  {
    title: "Media enquiries",
    body: "A dedicated contact for press requests and response expectations.",
    icon: Mail,
    actionLabel: "Email press office",
    href: "mailto:press@eurasiapolicycouncil.org",
  },
];



export default function MediaPress() {
  return (
    <div>
      <PageHeader
        variant="gradient"
        eyebrow="About"
        title="Media & press"
        description="Press resources, approved imagery, and contact details for media enquiries."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Media & Press" },
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* TOP ROW: resource cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-brand-line bg-white p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="font-heading text-lg font-semibold text-slate-900">
                    {r.title}
                  </div>
                  <r.icon className="h-5 w-5 text-slate-500" />
                </div>

                <p className="mt-2 text-sm text-slate-700">{r.body}</p>

                <a
                  href={r.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-line bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-mist/70"
                >
                  <Download className="h-4 w-4" />
                  {r.actionLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>


          {/* PRESS GALLERY */}
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Press gallery
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-slate-900">
                  Downloadable images for editorial use
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-slate-600">
                  Replace the demo images with your six approved photos. (You can later add
                  a lightbox, or link each image to a downloadable file.)
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                <ImageIcon className="h-4 w-4 text-slate-500" />
                6 assets
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRESS_IMAGES.map((img) => (
                <figure
                  key={img.id}
                  className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card"
                >
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy">
                      Approved
                    </div>
                  </div>

                  <figcaption className="p-5">
                    <div className="text-sm font-semibold text-slate-900">
                      {img.caption}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      Replace caption with your official label.
                    </div>

                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-line bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-mist/70"
                      // later you can make this download the image asset
                      onClick={() => {}}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* OPTIONAL: NOTES */}
          <div className="mt-12 rounded-2xl border border-brand-line bg-brand-mist p-6">
            <div className="font-heading text-sm font-semibold text-slate-900">
              Usage notes
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Images are provided for editorial use in coverage of EPC activities.</li>
              <li>Please credit “Eurasia Policy Council” unless otherwise specified.</li>
              <li>For logos and headshots, use the Press Kit link above.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}