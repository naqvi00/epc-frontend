import { NavLink } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import type { NavItem } from "../../content/site";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function MegaMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  // keep ref for outside click
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    // ✅ IMPORTANT: NOT relative (so dropdown uses Header container width)
    <div ref={wrapRef} className="static">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.18em] text-slate-800 hover:text-brand-blue"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${item.label} menu`}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 opacity-70 transition-transform duration-200",
            open && "rotate-180 opacity-100"
          )}
        />
      </button>

      {/* ✅ Full width INSIDE header container */}
      <div
        className={clsx(
          "pointer-events-none absolute left-0 top-full z-50 w-full",
          "translate-y-2 opacity-0",
          "transition-all duration-150",
          open && "pointer-events-auto translate-y-0 opacity-100"
        )}
        role="menu"
      >
        <div className="mt-3 overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card relative">
          {/* ✅ X top-right */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-line bg-white hover:bg-brand-mist"
            aria-label="Close menu"
          >
            <X className="h-4 w-4 text-slate-700" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 bg-gradient-to-b from-brand-navy to-brand-navy2 p-7">
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Explore</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold text-white">{item.label}</h3>
              <p className="mt-4 text-sm leading-6 text-white/80">
                Navigate to the most important sections quickly. This layout follows an IISS-style mega dropdown,
                but kept neatly inside the page width.
              </p>
              <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs text-white/80">
                Tip: Click again or press Esc to close.
              </div>
            </div>

            <div className="lg:col-span-8 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.children?.map((c) => (
                  <NavLink
                    key={c.href}
                    to={c.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        "rounded-2xl border border-brand-line p-5 hover:bg-brand-mist focus:bg-brand-mist transition",
                        isActive && "border-brand-blue ring-1 ring-brand-blue/20"
                      )
                    }
                    role="menuitem"
                  >
                    <div className="font-heading text-base font-semibold text-slate-900">{c.label}</div>
                    {c.description ? (
                      <div className="mt-1 text-sm text-slate-600">{c.description}</div>
                    ) : (
                      <div className="mt-1 text-sm text-slate-600">Explore this section and related content.</div>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500">Demo navigation panel • Replace links as content finalises</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-blue"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
