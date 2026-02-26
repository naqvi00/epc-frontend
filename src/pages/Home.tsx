



import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  FileText,
  Newspaper,
  ArrowLeft,
  X,
  ChevronDown,
  Handshake,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { brand, sampleInsights, topics, regions } from "../content/site";
import StatsOnView from "../components/home/StatsOnView";
import mainPic from "../assets/media1.png"
/* =========================
   TYPES + CONSTANTS
========================= */

type EventItem = {
  _id: string;
  title: string;
  date: string;
  location: string;
  format: string;
};

type PostType = "Online analysis" | "Research paper" | "Briefing" | "Report";

type ResearchItem = {
  _id: string;
  type: PostType;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  body: string;
  sortOrder?: number;
};

type HotTopicItem = {
  _id: string;
  label: string;
  desc: string;
  href: string;
  sortOrder?: number;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/* =========================
   SMALL UI COMPONENTS
========================= */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
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

function ExpandArticle({ post, onClose }: { post: ResearchItem; onClose: () => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
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
              to="/insights"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
            >
              Explore more <ArrowRight className="h-4 w-4" />
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

/* =========================
   FEATURED PUBLICATION CARD (RIGHT SIDE)
========================= */

function FeaturedLaunchCard() {
  const [expanded, setExpanded] = useState(false);

  const fullText =
    "The Eurasia Policy Council has been proudly launched at the iconic House of Lords, within the historic UK Parliament in London; marking a bold new chapter in international dialogue, leadership, and policy innovation across Eurasia.\n\nFrom one of the world’s most distinguished parliamentary platforms, a powerful voice for collaboration, diplomacy, and forward-thinking policy has officially emerged.";

  const shortText =
    "The Eurasia Policy Council has been proudly launched at the iconic House of Lords, within the historic UK Parliament in London; marking a bold new chapter in international dialogue, leadership, and policy innovation across Eurasia.";

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-card">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl border border-white/10">
       <img
  src={mainPic}
  alt="Eurasia Policy Council launch at the House of Lords"
  className="h-48 w-full object-cover md:h-56"
  loading="lazy"
/>

        {/* Handshake badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy shadow-sm">
          <Handshake className="h-4 w-4" />
          Launch
        </div>
      </div>

      <h2 className="mt-4 font-heading text-xl font-semibold text-white">
        Eurasia Policy Council Launch at the House of Lords
      </h2>

      <p className="mt-2 whitespace-pre-line font-body text-sm leading-6 text-white/80">
        {expanded ? fullText : shortText}
      </p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-sm font-semibold text-white hover:text-white/90"
      >
        {expanded ? "Read less" : "Read more"}
      </button>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-white/60">Updated 2026-02-25</p>

        <Link
          to="/publications"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-white/90"
        >
          View publications <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* =========================
   HOT TOPICS + RESEARCH SECTION
========================= */

function HomeHotTopicsAndResearch() {
  const [hotTopics, setHotTopics] = useState<HotTopicItem[]>([]);
  const [posts, setPosts] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        const [ht, rp] = await Promise.all([
          fetch(`${API_BASE}/api/home/hot-topics`).then((r) => r.json()),
          fetch(`${API_BASE}/api/home/research`).then((r) => r.json()),
        ]);

        if (!cancelled) {
          setHotTopics(ht || []);
          setPosts(rp || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Carousel
  const [index, setIndex] = useState(0);
  const visible = 3;
  const canPrev = index > 0;
  const canNext = index + visible < posts.length;
  const current = posts.slice(index, index + visible);

  // Read + scroll
  const [openId, setOpenId] = useState<string | null>(null);
  const openPost = openId ? posts.find((p) => p._id === openId) : null;
  const readingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openPost) return;
    requestAnimationFrame(() => {
      readingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [openPost?._id]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <DividerTitle title="Hot topics" />

        {loading && hotTopics.length === 0 ? (
          <div className="text-sm text-slate-600">Loading…</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-5">
            {hotTopics.map((t) => (
              <Link
                key={t._id}
                to={t.href}
                className="group rounded-2xl border border-brand-line bg-white p-5 shadow-card transition hover:bg-brand-mist"
              >
                <div className="font-heading text-sm font-semibold text-slate-900 group-hover:text-brand-blue">
                  {t.label}
                </div>
                <div className="mt-2 text-sm text-slate-700">{t.desc}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  View <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <DividerTitle title="Latest research papers" />

        {loading && posts.length === 0 ? (
          <div className="text-sm text-slate-600">Loading…</div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => canPrev && setIndex((v) => Math.max(0, v - 1))}
              disabled={!canPrev}
              className={clsx(
                "absolute -left-3 top-1/2 z-10 -translate-y-1/2",
                "h-11 w-11 rounded-full border border-brand-line bg-white shadow-card",
                "flex items-center justify-center",
                !canPrev ? "cursor-not-allowed opacity-40" : "hover:bg-brand-mist"
              )}
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => canNext && setIndex((v) => Math.min(posts.length - visible, v + 1))}
              disabled={!canNext}
              className={clsx(
                "absolute -right-3 top-1/2 z-10 -translate-y-1/2",
                "h-11 w-11 rounded-full border border-brand-line bg-white shadow-card",
                "flex items-center justify-center",
                !canNext ? "cursor-not-allowed opacity-40" : "hover:bg-brand-mist"
              )}
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="grid gap-6 lg:grid-cols-3">
              {current.map((p) => (
                <div key={p._id} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                  <img src={p.imageUrl} alt={p.title} className="h-44 w-full object-cover" />
                  <div className="p-6">
                    <TypePill type={p.type} />
                    <h3 className="mt-3 font-heading text-lg font-semibold text-slate-900">{p.title}</h3>
                    {p.subtitle && <p className="mt-2 text-sm text-slate-600">{p.subtitle}</p>}
                    <p className="mt-3 line-clamp-3 text-sm text-slate-700">{p.excerpt}</p>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs text-slate-500">{p.date}</p>

                      <button
                        type="button"
                        onClick={() => setOpenId(p._id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                      >
                        Read <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {openPost && (
          <div ref={readingRef} className="mt-12 scroll-mt-28">
            <DividerTitle title="Reading" />
            <ExpandArticle post={openPost} onClose={() => setOpenId(null)} />
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================
   HOME PAGE
========================= */

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/events/public`)
      .then((r) => r.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-ink">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-blue blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-brand-teal blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:pb-20 md:pt-10">
          <div className="grid gap-10 md:grid-cols-12 md:items-start ">
            {/* LEFT */}
            <div className="md:col-span-7 mt-10">
              <div className="flex flex-wrap gap-2">
                <Pill>Policy Institute</Pill>
                <Pill>Government Dialogue</Pill>
                <Pill>Education & Training</Pill>
              </div>

              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Trusted Analysis For Complex International Decisions
              </h1>

              <p className="mt-2 max-w-2xl font-body text-base text-white/85 md:text-lg">
                {brand.missionFull}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-white/90"
                >
                  Explore research <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/events/upcoming"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Upcoming events <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Support our work <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6">
                <StatsOnView />
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5 space-y-6">
              <FeaturedLaunchCard />

              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-700">Upcoming events</p>
                  <Calendar className="h-5 w-5 text-slate-500" />
                </div>

                <div className="mt-4 space-y-4">
                  {events.map((e) => (
                    <div key={e._id} className="rounded-xl border border-brand-line p-4">
                      <div className="font-body text-sm font-semibold text-slate-900">{e.title}</div>
                      <div className="mt-1 font-body text-xs text-slate-600">
                        {e.date} • {e.location} • {e.format}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                    View all events <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured insights */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Featured insights</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-900">Research you can act on</h2>
            </div>
            <Link to="/insights" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
              Browse insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sampleInsights.map((i) => (
              <article key={i.title} className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-mist px-3 py-1 text-xs text-slate-700">
                    <Newspaper className="h-4 w-4" /> {i.type}
                  </span>
                  <span className="text-xs text-slate-500">{i.date}</span>
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold text-slate-900">{i.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{i.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-brand-line px-3 py-1 text-slate-600">{i.topic}</span>
                  <span className="rounded-full border border-brand-line px-3 py-1 text-slate-600">{i.region}</span>
                </div>

                <div className="mt-6">
                  <Link to="/insights/all" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Topics + Regions */}
      <section className="bg-brand-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Topics</p>
              <h2 className="mt-2 font-heading text-xl font-semibold text-slate-900">Structured policy research</h2>
              <p className="mt-2 text-sm text-slate-700">
                Tag-based navigation for fast discovery across insights, publications and events.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {topics.map((t) => (
                  <div key={t.slug} className="rounded-xl border border-brand-line p-4">
                    <div className="font-heading text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="mt-1 text-xs text-slate-600">{t.description}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/insights/topics" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                  View all topics <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Regions</p>
              <h2 className="mt-2 font-heading text-xl font-semibold text-slate-900">Regional expertise</h2>
              <p className="mt-2 text-sm text-slate-700">
                Coverage designed for government, multilateral and investor audiences.
              </p>

              <div className="mt-5 grid gap-3">
                {regions.map((r) => (
                  <div key={r.slug} className="rounded-xl border border-brand-line p-4">
                    <div className="font-heading text-sm font-semibold text-slate-900">{r.name}</div>
                    <div className="mt-1 text-xs text-slate-600">{r.description}</div>

                    {r.countries.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                        {r.countries.map((c) => (
                          <span key={c} className="rounded-full bg-brand-mist px-3 py-1">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/insights/regions" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                  View all regions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeHotTopicsAndResearch />

      {/* Partners */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Trust & credibility</p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-slate-900">Partners and stakeholders</h2>
              </div>

              <Link to="/about/partners" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
                View network <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex h-16 items-center justify-center rounded-xl border border-brand-line bg-brand-mist text-xs text-slate-500"
                >
                  Logo {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
