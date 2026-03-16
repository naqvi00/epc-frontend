import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { apiFetch } from "../../api/api";

type EventItem = {
  _id: string;
  title: string;
  date: string;
  location: string;
  format: string;
  imageUrl?: string;
  recap?: string;
  isPublished?: boolean;
  showInPast?: boolean;
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const data = await apiFetch<EventItem[]>("/api/events/public");
      setEvents(data);
    } catch (e: any) {
      setError(e.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="bg-white">
      <PageHeader
        variant="gradient"
        eyebrow="Events"
        title="Upcoming events"
        description="Register for upcoming briefings, webinars and closed-door dialogues."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: "Upcoming" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        {loading ? (
          <div className="text-sm text-slate-600">Loading events…</div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-sm text-slate-600">No upcoming events.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((e) => (
              <article
                key={e._id}
                className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm"
              >
                {e.imageUrl ? (
                  <div className="relative bg-slate-50">
                    <img
                      src={e.imageUrl}
                      alt={e.title}
                      className="h-80 w-full object-contain"
                      loading="lazy"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                      {e.format}
                    </div>
                  </div>
                ) : null}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-slate-900">
                        {e.title}
                      </h2>

                      <p className="mt-2 text-sm text-slate-700">
                        <span className="font-medium">{e.date}</span> · {e.format} · {e.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Upcoming
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-700">
                    Stay informed and join our upcoming engagement. Registration details will be shared soon.
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
