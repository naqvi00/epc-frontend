import { Link } from 'react-router-dom'
import clsx from 'clsx'

type Crumb = { label: string; href?: string }

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  variant = 'default',
}: {
  eyebrow?: string
  title: string
  description?: string
  crumbs?: Crumb[]
  actions?: React.ReactNode
  variant?: 'default' | 'gradient'
}) {
  const isGradient = variant === 'gradient'

  return (
    <section
      className={clsx(
        'relative overflow-hidden border-b border-brand-line',
        isGradient ? 'text-white' : 'bg-white',
      )}
    >
      {isGradient && (
        <>
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#0a2a5e] to-brand-navy2" />

          {/* Multi-shade glow overlays */}
          <div className="absolute -inset-[40%] blur-3xl opacity-90">
            <div className="absolute left-[10%] top-[20%] h-[420px] w-[420px] rounded-full bg-blue-500/25" />
            <div className="absolute right-[10%] top-[10%] h-[360px] w-[360px] rounded-full bg-cyan-400/20" />
            <div className="absolute right-[20%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-indigo-500/20" />
          </div>
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={clsx('text-xs', isGradient ? 'text-white/75' : 'text-slate-600')}
          >
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, idx) => (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
                  {c.href ? (
                    <Link to={c.href} className={clsx('hover:underline', isGradient && 'text-white/85')}>
                      {c.label}
                    </Link>
                  ) : (
                    <span className={clsx(isGradient ? 'text-white/60' : 'text-slate-500')}>{c.label}</span>
                  )}
                  {idx < crumbs.length - 1 && (
                    <span className={clsx(isGradient ? 'text-white/40' : 'text-slate-400')}>/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && (
              <p
                className={clsx(
                  'font-heading text-xs uppercase tracking-[0.18em]',
                  isGradient ? 'text-white/70' : 'text-slate-600',
                )}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className={clsx(
                'mt-2 max-w-3xl font-heading text-3xl font-semibold tracking-tight md:text-4xl',
                isGradient ? 'text-white' : 'text-slate-900',
              )}
            >
              {title}
            </h1>

            {description && (
              <p className={clsx('mt-3 max-w-3xl text-sm md:text-base', isGradient ? 'text-white/80' : 'text-slate-700')}>
                {description}
              </p>
            )}
          </div>

          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  )
}