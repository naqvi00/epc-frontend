import { useMemo, useState } from "react";
import {
  Mail,
  Mic,
  CalendarDays,
  Image as ImageIcon,
  ArrowUpRight,
  X,
  PlayCircle,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";

import img1 from "../../assets/epcevent2.jpg";
import img2 from "../../assets/epcevent3.jpg";
import img3 from "../../assets/epcevent4.jpg";
import img4 from "../../assets/epcevent1.jpg";
import img5 from "../../assets/epcevent5.jpg";
import img6 from "../../assets/epcevent6.jpg";


type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

type MediaCategory = {
  id: string;
  title: string;
  body: string;
  icon: React.ElementType;
  actionLabel: string;
  enabled: boolean;
  videoUrl?: string;
  mainImage?: GalleryItem;
  gallery?: GalleryItem[];
};

const categories: MediaCategory[] = [
  {
    id: "epc-events",
    title: "EPC Events",
    body: "Highlights from EPC events, featured video, and related event gallery.",
    icon: CalendarDays,
    actionLabel: "View gallery",
    enabled: true,

    // ACTIVE YOUTUBE VIDEO FOR EPC EVENTS
    videoUrl: "https://www.youtube.com/embed/J7Ub5BHVxJ4",

    mainImage: {
      id: "ev-main",
      src: img4,
      alt: "EPC Events main image",
      caption: "Now Showing — EPC Event Group Photo",
    },
    gallery: [
      {
        id: "ev-1",
        src: img1,
        alt: "EPC event image 1",
        caption: "Management Team — London",
      },
      {
        id: "ev-2",
        src: img2,
        alt: "EPC event image 2",
        caption: "Research briefing — policy audience",
      },
      {
        id: "ev-3",
        src: img5,
        alt: "EPC event image 3",
        caption: "Publication launch — EPC insights",
      },
      {
        id: "ev-4",
        src: img3,
        alt: "EPC event image 4",
        caption: "Expert discussion — Eurasia focus",
      },
      {
        id: "ev-5",
        src: img6,
        alt: "EPC event image 5",
        caption: "Expert discussion — Eurasia focus",
      },
    ],
  },

  {
    id: "spokespeople",
    title: "Spokespeople",
    body: "Approved experts, appearances, speaking visuals, and related media gallery.",
    icon: Mic,
    actionLabel: "View gallery",

    // NOT READY YET
    // keep false so clicking this card will open nothing for now
    enabled: false,

    /*
    =========================
    FUTURE SETUP: SPOKESPEOPLE
    =========================

    When ready, change:
    enabled: true,

    Then add your video and images below:

    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",

    mainImage: {
      id: "sp-main",
      src: img2,
      alt: "Spokespeople main image",
      caption: "Now showing — spokesperson feature",
    },

    gallery: [
      {
        id: "sp-1",
        src: img2,
        alt: "Spokespeople image 1",
        caption: "Policy audience session",
      },
      {
        id: "sp-2",
        src: img3,
        alt: "Spokespeople image 2",
        caption: "Stakeholder workshop",
      },
    ],
    */
  },

  {
    id: "media-enquiries",
    title: "Media enquiries",
    body: "Media-facing materials, contact visuals, and press-related supporting gallery.",
    icon: Mail,
    actionLabel: "View gallery",

    // NOT READY YET
    // keep false so clicking this card will open nothing for now
    enabled: false,

    /*
    ============================
    FUTURE SETUP: MEDIA ENQUIRIES
    ============================

    When ready, change:
    enabled: true,

    Then add your video and images below:

    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",

    mainImage: {
      id: "me-main",
      src: img1,
      alt: "Media enquiries main image",
      caption: "Now showing — press relations overview",
    },

    gallery: [
      {
        id: "me-1",
        src: img1,
        alt: "Media image 1",
        caption: "Media panel coverage",
      },
      {
        id: "me-2",
        src: img4,
        alt: "Media image 2",
        caption: "Launch coverage visual",
      },
    ],
    */
  },
];

function Modal({
  open,
  onClose,
  children,
  size = "xl",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "lg" | "xl" | "2xl";
}) {
  if (!open) return null;

  const widthClass =
    size === "lg"
      ? "max-w-4xl"
      : size === "2xl"
      ? "max-w-6xl"
      : "max-w-5xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div
        className={`relative w-full ${widthClass} overflow-hidden rounded-3xl bg-white shadow-2xl`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-slate-700 hover:bg-slate-50"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function MediaPress() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [galleryPopupOpen, setGalleryPopupOpen] = useState(false);

  const activeCategory = useMemo(
    () => categories.find((item) => item.id === activeCategoryId) ?? null,
    [activeCategoryId]
  );

  const handleOpenCategory = (item: MediaCategory) => {
    // if section is not ready yet, do nothing
    if (!item.enabled) return;
    setActiveCategoryId(item.id);
  };

  return (
    <div>
      <PageHeader
        variant="gradient"
        eyebrow="About"
        title="Media & press"
        description="Press resources, approved imagery, video highlights, and contact details for media enquiries."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Media & Press" },
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* TOP CARDS */}
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-brand-line bg-white p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="font-heading text-lg font-semibold text-slate-900">
                    {item.title}
                  </div>
                  <item.icon className="h-5 w-5 text-slate-500" />
                </div>

                <p className="mt-2 text-sm text-slate-700">{item.body}</p>

                <button
                  type="button"
                  onClick={() => handleOpenCategory(item)}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-line bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-mist/70 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ImageIcon className="h-4 w-4" />
                  {item.actionLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* OPTIONAL PREVIEW SECTION ON PAGE */}
          <div className="mt-12 rounded-3xl border border-brand-line bg-brand-mist/40 p-6">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Featured media
            </p>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
              Browse EPC Events, Spokespeople, and Media Enquiries galleries
            </h3>
          </div>
        </div>
      </section>

      {/* MAIN POPUP */}
      <Modal
        open={!!activeCategory}
        onClose={() => {
          setActiveCategoryId(null);
          setGalleryPopupOpen(false);
        }}
        size="2xl"
      >
        {activeCategory && activeCategory.enabled && (
          <div className="max-h-[90vh] overflow-y-auto">
            <div className="border-b border-brand-line px-6 pb-5 pt-6 md:px-8">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Media section
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                {activeCategory.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                {activeCategory.body}
              </p>
            </div>

            <div className="space-y-8 p-6 md:p-8">
              {/* VIDEO AT TOP */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <PlayCircle className="h-4 w-4 text-brand-navy" />
                  Featured video
                </div>

                <div className="overflow-hidden rounded-3xl border border-brand-line bg-slate-100">
                  {activeCategory.videoUrl ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={activeCategory.videoUrl}
                        title={`${activeCategory.title} featured video`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex h-[240px] items-center justify-center text-sm text-slate-500 md:h-[420px]">
                      Add your video here
                    </div>
                  )}
                </div>
              </div>

              {/* MAIN IMAGE */}
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Gallery section
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-semibold text-slate-900">
                      Main image now showing
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGalleryPopupOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-mist/70"
                  >
                    <ImageIcon className="h-4 w-4" />
                    View more pics
                  </button>
                </div>

                {activeCategory.mainImage && (
                  <figure className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                    <img
                      src={activeCategory.mainImage.src}
                      alt={activeCategory.mainImage.alt}
                      className="h-[240px] w-full object-cover md:h-[440px]"
                    />
                    <figcaption className="p-5">
                      <div className="text-base font-semibold text-slate-900">
                        {activeCategory.mainImage.caption}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        This is the featured image for the {activeCategory.title} section.
                      </div>
                    </figcaption>
                  </figure>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* SECOND POPUP: RELATED IMAGES ONLY */}
      <Modal
        open={galleryPopupOpen && !!activeCategory}
        onClose={() => setGalleryPopupOpen(false)}
        size="2xl"
      >
        {activeCategory && activeCategory.enabled && (
          <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="mb-6">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Related gallery
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                {activeCategory.title} images
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Only the images related to this section are shown here.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {activeCategory.gallery?.map((img) => (
                <figure
                  key={img.id}
                  className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-64 w-full object-cover"
                  />
                  <figcaption className="p-5">
                    <div className="text-sm font-semibold text-slate-900">
                      {img.caption}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
