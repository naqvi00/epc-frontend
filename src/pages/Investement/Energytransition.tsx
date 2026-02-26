import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { ArrowRight, FileText, Newspaper, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type PostType = "Online analysis" | "Research paper" | "Briefing" | "Report";
type Section = "featured" | "latest" | "archive";

type Post = {
  _id: string;
  page: string;
  type: PostType;
  section: Section;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  body: string;
  sortOrder: number;
  isPublished: boolean;
};

function TypePill({ type }: { type: PostType }) {
  const icon =
    type === "Online analysis" ? <Newspaper className="h-4 w-4" /> : <FileText className="h-4 w-4" />;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold text-slate-700">
      {icon}
      <span className="uppercase tracking-widest">{type}</span>
    </div>
  );
}

function DividerTitle({ title }: { title: string }) {
  return (
    <div className="my-10 flex items-center gap-6">
      <div className="h-px flex-1 bg-brand-line" />
      <div className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-brand-navy">
        {title}
      </div>
      <div className="h-px flex-1 bg-brand-line" />
    </div>
  );
}

function ExpandArticle({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
      <div className="flex items-start justify-between gap-4 border-b border-brand-line p-6">
        <div className="min-w-0">
          <TypePill type={post.type} />
          <h3 className="mt-3 font-heading text-2xl font-semibold text-slate-900">{post.title}</h3>
          {post.subtitle && <p className="mt-2 text-sm text-slate-600">{post.subtitle}</p>}
          <p className="mt-3 text-xs text-slate-500">
            By <span className="font-semibold text-slate-700">{post.author}</span> • {post.date}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line hover:bg-brand-mist"
          aria-label="Close article"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded-2xl border border-brand-line object-cover"
          />
        </div>

        <article className="md:col-span-7">
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{post.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
            >
              Request institutional access <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-mist"
            >
              Close
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

function SliderSection({
  title,
  items,
  onRead,
}: {
  title: string;
  items: Post[];
  onRead: (id: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollByCards(dir: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  }

  return (
    <div>
      <DividerTitle title={title} />

      <div className="relative">
        {/* Arrows */}
        <button
          type="button"
          onClick={() => scrollByCards("left")}
          className="hidden md:inline-flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 items-center justify-center rounded-full border border-brand-line bg-white shadow-card hover:bg-brand-mist"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => scrollByCards("right")}
          className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 items-center justify-center rounded-full border border-brand-line bg-white shadow-card hover:bg-brand-mist"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scroller */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((p) => (
            <div
              key={p._id}
              className="min-w-[280px] max-w-[280px] md:min-w-[360px] md:max-w-[360px] overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card"
            >
              <img src={p.imageUrl} alt={p.title} className="h-44 w-full object-cover" />
              <div className="p-6">
                <TypePill type={p.type} />
                <h3 className="mt-3 font-heading text-lg font-semibold text-slate-900 line-clamp-3">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-slate-700 line-clamp-3">{p.excerpt}</p>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs text-slate-500">{p.date}</p>
                  <button
                    type="button"
                    onClick={() => onRead(p._id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                  >
                    Read <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  By <span className="font-semibold text-slate-700">{p.author}</span>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-sm text-slate-600">No items yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SecurityDiplomacy() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const page = "energytransition"; 

  const [featured, setFeatured] = useState<Post[]>([]);
  const [latest, setLatest] = useState<Post[]>([]);
  const [archive, setArchive] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openId, setOpenId] = useState<string | null>(null);
  const readingRef = useRef<HTMLDivElement | null>(null);

  const allPosts = useMemo(() => [...featured, ...latest, ...archive], [featured, latest, archive]);
  const openPost = openId ? allPosts.find((p) => p._id === openId) : null;

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/institutions/${page}/public`);
        const data = await res.json();

        const f = Array.isArray(data?.featured) ? data.featured : [];
        const l = Array.isArray(data?.latest) ? data.latest : [];
        const a = Array.isArray(data?.archive) ? data.archive : [];

        if (!cancelled) {
          setFeatured(f);
          setLatest(l);
          setArchive(a);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [API_BASE, page]);

  useEffect(() => {
    if (!openId) return;
    requestAnimationFrame(() => {
      readingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [openId]);

  return (
    <div>
      <PageHeader
      variant="gradient"
        eyebrow="Energy-Transition"
        title="Energy-Transition"
        description="Featured analysis, latest research papers, and archive — optimized for scanning and deep reading on the same page."
        crumbs={[{ label: "Home", href: "/" }, { label: "energy-transition" }]}
        actions={
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Partner with us <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-white">
        {/* ✅ wider container so it looks like your screenshots (space on both sides) */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {loading && <div className="text-sm text-slate-600">Loading…</div>}

          {/* ✅ Featured (big blocks like screenshot #1) */}
          <DividerTitle title="Featured" />
          <div className="space-y-10">
            {featured.map((p, idx) => {
              const flip = idx % 2 === 1;
              const isOpen = openId === p._id;

              return (
                <div
                  key={p._id}
                  className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card"
                >
                  <div className={clsx("grid gap-0 md:grid-cols-12", flip && "md:[direction:rtl]")}>
                    <div className={clsx("md:col-span-6", flip && "md:[direction:ltr]")}>
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="h-full w-full object-cover md:min-h-[320px]"
                      />
                    </div>

                    <div className={clsx("p-8 md:col-span-6", flip && "md:[direction:ltr]")}>
                      <TypePill type={p.type} />

                      <h2 className="mt-4 font-heading text-4xl leading-tight font-semibold text-slate-900">
                        {p.title}
                      </h2>

                      {p.subtitle && <p className="mt-3 text-base text-slate-600">{p.subtitle}</p>}

                      <p className="mt-6 text-base leading-7 text-slate-700">{p.excerpt}</p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-slate-500">
                          By <span className="font-semibold text-slate-700">{p.author}</span> • {p.date}
                        </p>

                        <button
                          type="button"
                          onClick={() => setOpenId((curr) => (curr === p._id ? null : p._id))}
                          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
                        >
                          {isOpen ? "Hide" : "Read"}{" "}
                          <ChevronDown className={clsx("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {!loading && featured.length === 0 && <div className="text-sm text-slate-600">No featured posts yet.</div>}
          </div>

          {/* ✅ Latest Research Papers slider (screenshot #2 vibe) */}
          <SliderSection
            title="Latest research papers"
            items={latest}
            onRead={(id) => setOpenId(id)}
          />

          {/* ✅ Archive (same slider style as requested) */}
          <SliderSection
            title="Archive"
            items={archive}
            onRead={(id) => setOpenId(id)}
          />

          {/* ✅ Reading */}
          {openPost && (
            <div ref={readingRef} className="mt-12 scroll-mt-40">
              <DividerTitle title="Reading" />
              <div className="mx-auto max-w-5xl">
                <ExpandArticle post={openPost} onClose={() => setOpenId(null)} />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
