import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import clsx from 'clsx'
import { ArrowRight, BadgeCheck } from 'lucide-react'

import Shabnam from '../../assets/shabnam.jpeg'
import Raza from '../../assets/raza.jpeg'
import Daba from '../../assets/daba.jpeg'

type Leader = {
  name: string
  title: string
  roleBadge: string
  location?: string
  image?: string
  short: string
  long: string
  tags?: string[]
}

function clampWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text.trim()
  return words.slice(0, maxWords).join(' ') + '…'
}

function InitialsAvatarBig({ name }: { name: string }) {
  const initials = useMemo(() => {
    const parts = name.split(' ').filter(Boolean)
    const a = parts[0]?.[0] ?? 'A'
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase()
  }, [name])

  return (
    <div className="grid h-full w-full place-items-center rounded-none bg-gradient-to-br from-brand-navy to-brand-blue text-white">
      <span className="font-heading text-4xl font-semibold tracking-wide">{initials}</span>
    </div>
  )
}

function LeaderRow({ leader, reverse }: { leader: Leader; reverse?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="rounded-3xl border border-brand-line bg-white shadow-card overflow-hidden">
      <div className={clsx('grid md:grid-cols-12', reverse && 'md:[direction:rtl]')}>
        {/* Image area (fixed height ensures same size for all images) */}
        <div className={clsx('md:col-span-5', reverse && 'md:[direction:ltr]')}>
          <div className="relative h-80 w-full bg-brand-mist md:h-full min-h-[360px]">
            {leader.image ? (
              <img
                src={leader.image}
                alt={leader.name}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            ) : (
              <InitialsAvatarBig name={leader.name} />
            )}

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

            {/* Role badge */}
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              <BadgeCheck className="h-4 w-4" />
              {leader.roleBadge}
            </div>

            {/* Name overlay (nice premium feel) */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-white">
                <div className="font-heading text-xl font-semibold">{leader.name}</div>
                <div className="mt-1 text-sm text-white/85">{leader.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={clsx('p-7 md:col-span-7 md:p-10', reverse && 'md:[direction:ltr]')}>
          <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Leadership</p>

          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-semibold text-slate-900">
            {leader.name}
          </h2>

          <div className="mt-1 text-sm font-semibold text-brand-blue">{leader.title}</div>
          {leader.location && <div className="mt-1 text-xs text-slate-500">{leader.location}</div>}

          {/* Tags */}
          {leader.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {leader.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-[11px] text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {/* Short */}
          <p className="mt-5 text-sm leading-7 text-slate-700">{leader.short}</p>

          {/* Long */}
          <div
            className={clsx(
              'mt-4 overflow-hidden transition-[max-height,opacity] duration-300',
              open ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <p className="text-sm leading-7 text-slate-700">{leader.long}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            {open ? 'Read less' : 'Read more'}
            <ArrowRight className={clsx('h-4 w-4 transition', open && 'rotate-90')} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Leadership() {
  const leaders: Leader[] = [
    {
      name: 'Professor Shabnam Delfani',
      image: Shabnam,
      title: 'Management Team (CEO)',
      roleBadge: 'Chief Executive Officer',
      location: 'UK / International',
      short:
        'Environmental scientist and diplomat specialising in climate change modelling, sustainability and women’s leadership in international affairs.',
      long: clampWords(
        'PhD in Environmental Management (Climate Change Modelling) from the University of Plymouth, with affiliations across international institutions. UN Senior Associate and Advisor for the MENA region on disaster management and sustainable climate strategies. World Women’s Peace Ambassador and Co-Founder of the Eurasia Policy Council, advancing high-level dialogue and women’s leadership through “Breaking Barriers in Diplomacy.” An author and keynote speaker on major international platforms including Davos and UN-linked events, with ongoing community engagement and advocacy.',
        140,
      ),
      tags: ['Climate', 'Diplomacy', 'Women’s Leadership', 'Sustainability'],
    },
    {
      name: 'Mr. Raza Syed',
      image: Raza,
      title: 'Management Team (CFO)',
      roleBadge: 'Chief Financial Officer',
      location: 'United Kingdom / Central Asia',
      short:
        'Senior international journalist and media executive specialising in Central Asian geopolitics, diplomacy and economic development.',
      long: clampWords(
        'A senior international journalist and media executive with over 15 years of experience focusing on Central Asian geopolitics, regional diplomacy and economic development. Has covered major regional events including Kazakhstan’s 2022 Presidential Election, the Central Asia Summit in Samarkand (2025), and high-level investment, interfaith and tourism forums across the region. In 2025, received an official award from the Government of Uzbekistan for distinguished reporting. As Managing Editor of The London Post (since 2021), he leads editorial strategy on Eurasian affairs—combining analytical depth with field insight to inform policy and strengthen international dialogue.',
        150,
      ),
      tags: ['Central Asia', 'Geopolitics', 'Regional Diplomacy', 'Media Strategy', 'Economic Development'],
    },
    {
      name: 'Dr. Dababrata Chowdhury',
      image: Daba,
      title: 'Management Team (COO)',
      roleBadge: 'Chief Operating Officer',
      location: 'United Kingdom',
      short:
        'Reader in Digital Entrepreneurship with 22+ years’ experience in higher education, industry partnerships and programme development.',
      long: clampWords(
        'He holds a BSc in Computer Science & Engineering (Hacettepe University, Ankara), followed by an MBA and PhD (University of Plymouth). He has developed strategic university-industry connections globally and contributes editorially across peer-reviewed journals. He is associated with the Cambridge Central Asia Forum (Jesus College, University of Cambridge) and communicates in English, Turkish, Hindi, Bengali, Azeri and Urdu.',
        140,
      ),
      tags: ['Entrepreneurship', 'Industry Partnerships', 'Innovation'],
    },
  ]

  return (
    <div>
      {/* ✅ Brand colored header like overview (so it’s not plain white) */}
      <section className="bg-gradient-to-r from-brand-navy to-brand-navy2">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="text-sm text-white/70">
            <Link to="/" className="hover:text-white">
              Home
            </Link>{' '}
            <span className="mx-2 text-white/40">/</span>
            <Link to="/about" className="hover:text-white">
              About
            </Link>{' '}
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/90">Leadership</span>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">About</p>
              <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Leadership & management
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
                Meet the leadership team responsible for programme delivery, partnerships and research quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gradient-to-b from-white to-brand-mist/60">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8">
            {leaders.map((l, idx) => (
              <LeaderRow key={l.name} leader={l} reverse={idx % 2 === 1} />
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-brand-line bg-white p-7 shadow-card">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">Media enquiries</p>
            <p className="mt-2 text-sm text-slate-700">
              Add public emails or social links only if your organisation approves making them visible.
            </p>
          </div>
        </div>
      </section>

      {/* Keep your existing PageHeader import even if not used elsewhere */}
      <PageHeader
        eyebrow=""
        title=""
        description=""
        crumbs={[]}
      />
    </div>
  )
}