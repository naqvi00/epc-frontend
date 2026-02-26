import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

function useInViewRepeat(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function useCountUp(trigger: boolean, target: number, durationMs = 900) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start = 0;

    if (!trigger) {
      // Reset when out of view so it replays next time
      setVal(0);
      return;
    }

    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, durationMs]);

  return val;
}

export default function StatsOnView() {
  const stats: Stat[] = useMemo(
    () => [
      { value: 50, suffix: "+", label: "Policy briefings / year" },
      { value: 20, suffix: "+", label: "Partner institutions" },
      { value: 6, label: "Regions of focus" },
    ],
    [],
  );

  const { ref, inView } = useInViewRepeat({ threshold: 0.35 });

  return (
    <div ref={ref} className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, idx) => (
          <StatCard key={s.label} stat={s} inView={inView} delayMs={idx * 90} />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  stat,
  inView,
  delayMs,
}: {
  stat: Stat;
  inView: boolean;
  delayMs: number;
}) {
  const [go, setGo] = useState(false);

  // small stagger delay
  useEffect(() => {
    let t: number | undefined;
    if (inView) {
      t = window.setTimeout(() => setGo(true), delayMs);
    } else {
      setGo(false);
    }
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [inView, delayMs]);

  const n = useCountUp(go, stat.value, 900);

  return (
    <div
      className={[
        "rounded-xl border border-white/15 bg-white/5 p-4",
        "transition-all duration-500 will-change-transform",
        go ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div className="text-2xl font-semibold text-white">
        {n}
        {stat.suffix ?? ""}
      </div>
      <div className="text-xs text-white/70">{stat.label}</div>
    </div>
  );
}
