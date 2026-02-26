import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

export default function NotFound() {
  return (
    <div>
      <PageHeader
       variant="gradient"
        eyebrow="Error"
        title="Page not found"
        description="The page you requested doesn’t exist or has moved."
        crumbs={[{ label: 'Home', href: '/' }, { label: '404' }]}
        actions={
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
          >
            Return home
          </Link>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-2xl border border-brand-line bg-brand-mist p-8">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Try one of these links</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Research / Insights', href: '/insights' },
                { label: 'Publications', href: '/publications' },
                { label: 'Events', href: '/events' },
                { label: 'People / Experts', href: '/people' },
                { label: 'Education', href: '/education' },
                { label: 'Contact', href: '/contact' },
              ].map((i) => (
                <Link
                  key={i.href}
                  to={i.href}
                  className="rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-brand-blue hover:underline"
                >
                  {i.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
