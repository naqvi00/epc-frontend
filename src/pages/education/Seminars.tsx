import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { ArrowRight, FileText, Newspaper, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

type PostType = "Online analysis" | "Research paper" | "Briefing" | "Report";
type Section = "featured" | "latest" | "archive";

type Post = {
  _id: string;
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
    type === "Online analysis" ? (
      <Newspaper className="h-4 w-4" />
    ) : (
      <FileText className="h-4 w-4" />
    );

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

export default function Institutions() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const PAGE = "seminars"; 

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

        // ✅ must match backend: /api/institutions/:page/public
        const res = await fetch(`${API_BASE}/api/institutions/${PAGE}/public`);
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
  }, [API_BASE]);

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
        eyebrow="Seminars"
        title="Seminars"
        description="A structured hub for Seminars content — analysis, research papers, briefings and reports."
        crumbs={[{ label: "Home", href: "/" }, { label: "Seminars" }]}
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
        <div className="mx-auto max-w-6xl px-4 py-12">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && <div className="text-sm text-slate-600">Loading…</div>}

          {/* Featured */}
          <DividerTitle title="Featured" />
          <div className="space-y-8">
            {featured.map((p, idx) => {
              const flip = idx % 2 === 1;
              const isOpen = openId === p._id;

              return (
                <div key={p._id} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                  <div className={clsx("grid gap-0 md:grid-cols-12", flip && "md:[direction:rtl]")}>
                    <div className={clsx("md:col-span-5", flip && "md:[direction:ltr]")}>
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="h-full w-full object-cover md:min-h-[260px]"
                      />
                    </div>

                    <div className={clsx("p-6 md:col-span-7", flip && "md:[direction:ltr]")}>
                      <TypePill type={p.type} />
                      <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-900">{p.title}</h2>
                      {p.subtitle && <p className="mt-2 text-sm text-slate-600">{p.subtitle}</p>}
                      <p className="mt-4 text-sm leading-7 text-slate-700">{p.excerpt}</p>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          By <span className="font-semibold text-slate-700">{p.author}</span> • {p.date}
                        </p>

                        <button
                          type="button"
                          onClick={() => setOpenId((curr) => (curr === p._id ? null : p._id))}
                          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
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

          {/* Latest */}
          <DividerTitle title="Latest blogs" />
          <div className="grid gap-6 lg:grid-cols-3">
            {latest.map((p) => (
              <div key={p._id} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                <img src={p.imageUrl} alt={p.title} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <TypePill type={p.type} />
                  <h3 className="mt-3 font-heading text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-700 line-clamp-3">{p.excerpt}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xs text-slate-500">{p.date}</p>
                    <button
                      type="button"
                      onClick={() => setOpenId(p._id)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Read <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!loading && latest.length === 0 && <div className="mt-3 text-sm text-slate-600">No latest posts yet.</div>}

          {/* Archive */}
          <DividerTitle title="Archive" />
          <div className="grid gap-4 md:grid-cols-2">
            {archive.map((p) => (
              <div key={p._id} className="rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                <div className="flex items-start gap-4">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-20 w-28 rounded-xl border border-brand-line object-cover"
                  />
                  <div className="min-w-0">
                    <TypePill type={p.type} />
                    <div className="mt-2 font-heading text-base font-semibold text-slate-900">{p.title}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {p.author} • {p.date}
                    </div>
                    <div className="mt-2 text-sm text-slate-700 line-clamp-2">{p.excerpt}</div>

                    <button
                      type="button"
                      onClick={() => setOpenId(p._id)}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Read on this page <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!loading && archive.length === 0 && <div className="mt-3 text-sm text-slate-600">No archive posts yet.</div>}

          {/* Reading */}
          {openPost && (
            <div ref={readingRef} className="mt-12 scroll-mt-40">
              <DividerTitle title="Reading" />
              <ExpandArticle post={openPost} onClose={() => setOpenId(null)} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
