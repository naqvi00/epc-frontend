export type NavItem = {
  label: string
  href?: string
  children?: { label: string; description?: string; href: string }[]
}

export const brand = {
  orgName: 'From Strategy to Statecraft',
  shortName: 'EPC',
  tagline: 'Foresightful Dialogue',
  missionOneLiner: 'Independent analysis and dialogue to advance pragmatic policy across Eurasia and beyond.',
  missionFull:
    'We convene government, academia and industry to translate evidence into action.\nThrough impartial research, trusted networks and practical training, we support decision‑makers navigating complex geopolitical and economic change.',
}

export const topNavQuickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export const mainNav: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    children: [
      { label: 'Overview', description: 'Who we are and what we stand for.', href: '/about' },
      { label: 'Mission & Vision', description: 'Our purpose, values and approach.', href: '/about/mission-vision' },
      { label: 'What We Do', description: 'Programmes, services and delivery model.', href: '/about/what-we-do' },
      { label: 'Leadership', description: 'Management and research leadership.', href: '/about/leadership' },
      { label: 'Partners & Network', description: 'Institutions we collaborate with.', href: '/about/partners' },
      { label: 'Careers & Internships', description: 'Work with us.', href: '/about/careers' },
      { label: 'Annual Report & Financials', description: 'Transparency and impact reporting.', href: '/about/annual-report' },
      { label: 'Media & Press', description: 'Press resources and enquiries.', href: '/about/media' },
    ],
  },
  {
    label: 'Research / Insights',
    children: [
      { label: 'Insights Landing', description: 'Latest analysis, commentary and explainers.', href: '/insights' },
      { label: 'Topics', description: 'Browse insights by topic.', href: '/insights/topics' },
      { label: 'Regions', description: 'Browse insights by region.', href: '/insights/regions' },
      { label: 'All Articles', description: 'Search and filter the full archive.', href: '/insights/all' },
    ],
  },
  {
    label: 'Publications',
    children: [
      { label: 'Publications Landing', description: 'Reports, briefs and flagship series.', href: '/publications' },
      { label: 'Library', description: 'Filterable publications catalogue.', href: '/publications/library' },
    ],
  },
  {
    label: 'Events',
    children: [
      { label: 'Events Landing', description: 'Briefings, conferences and dialogues.', href: '/events' },
      { label: 'Upcoming Events', description: 'Register and attend.', href: '/events/upcoming' },
      { label: 'Past Events', description: 'Recordings, transcripts and recaps.', href: '/events/past' },
    ],
  },
  {
    label: 'People / Experts',
    children: [
      { label: 'Our Team', description: 'Meet our experts and teams.', href: '/people' },
      { label: 'Researchers', description: 'Meet our experts and teams.', href: '/researcher' },
      { label: 'Expert Directory', description: 'Browse by expertise and region.', href: '/people/directory' },
    ],
  },
  {
    label: 'Education',
    children: [
      { label: 'Education Landing', description: 'Training and capacity‑building programmes.', href: '/education' },
      { label: 'Exchange Programme', description: 'Partnership placements and fellowships.', href: '/education/exchange' },
      { label: 'Universities', description: 'University collaborations and modules.', href: '/education/universities' },
      { label: 'Institutions', description: 'Institutional training partnerships.', href: '/education/institutions' },
      { label: 'Seminars', description: 'Policy seminars and masterclasses.', href: '/education/seminars' },
      { label: 'Workshops', description: 'Practitioner workshops and simulations.', href: '/education/workshops' },
      { label: 'Conference', description: 'Education‑focused convenings.', href: '/education/conference' },
    ],
  },
  {
    label: 'Support',
    href: '/support',
  },
  {
    label: 'Membership',
    href: '/membership',
  },
]

export const topics = [
  {
    name: 'Climate Change',
    slug: 'climate-change',
    description: 'Policy pathways for resilient economies, climate security and cross‑border cooperation.',
    subcategories: ['Water security & diplomacy', 'Energy', 'Waste management', 'Air pollution'],
  },
  {
    name: 'Investment',
    slug: 'investment',
    description: 'Risk, regulation and sustainable finance across emerging and frontier markets.',
    subcategories: ['Green investment', 'Geopolitical risk', 'Energy transition', 'Regulatory reform'],
  },
  {
    name: 'Poverty Management',
    slug: 'poverty-management',
    description: 'Evidence‑based approaches to inclusive growth, safety nets and social policy.',
    subcategories: [],
  },
  {
    name: 'Women Empowerment',
    slug: 'women-empowerment',
    description: 'Closing gaps in participation, leadership and economic opportunity.',
    subcategories: [],
  },
]

export const regions = [
  {
    name: 'Middle East',
    slug: 'middle-east',
    description: 'Security, diplomacy and economic transformation across the Middle East.',
    countries: ['Iran', 'Turkey', 'Azerbaijan'],
  },
  {
    name: 'Central Asia',
    slug: 'central-asia',
    description: 'Connectivity, resources and governance across Central Asia.',
    countries: ['Kazakhstan', 'Kyrgyzstan', 'Turkmenistan', 'Tajikistan', 'Uzbekistan'],
  },
  {
    name: 'South Asia',
    slug: 'south-asia',
    description: 'Regional stability, development and cooperation across South Asia.',
    countries: ['Pakistan', 'India'],
  },
]

export const officeLocations = [
  {
    country: 'United Kingdom',
    city: 'London',
    address: 'Sample address line 1, London, UK',
    phone: '+44 (0)20 0000 0000',
    email: 'info@eurasiapolicycouncil.org',
  },
  {
    country: 'Iran',
    city: 'Tehran',
    address: 'Sample address line 1, Tehran, Iran',
    phone: '+98 21 0000 0000',
    email: 'iran.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Azerbaijan',
    city: 'Baku',
    address: 'Sample address line 1, Baku, Azerbaijan',
    phone: '+994 12 0000 0000',
    email: 'baku.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Turkey',
    city: 'Istanbul',
    address: 'Sample address line 1, Istanbul, Turkey',
    phone: '+90 212 000 0000',
    email: 'turkey.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Kazakhstan',
    city: 'Astana',
    address: 'Sample address line 1, Astana, Kazakhstan',
    phone: '+7 7172 000 000',
    email: 'kz.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Kyrgyzstan',
    city: 'Bishkek',
    address: 'Sample address line 1, Bishkek, Kyrgyzstan',
    phone: '+996 312 000 000',
    email: 'kg.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Turkmenistan',
    city: 'Ashgabat',
    address: 'Sample address line 1, Ashgabat, Turkmenistan',
    phone: '+993 12 000000',
    email: 'tm.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Tajikistan',
    city: 'Dushanbe',
    address: 'Sample address line 1, Dushanbe, Tajikistan',
    phone: '+992 37 000 0000',
    email: 'tj.office@eurasiapolicycouncil.org',
  },
  {
    country: 'Uzbekistan',
    city: 'Tashkent',
    address: 'Sample address line 1, Tashkent, Uzbekistan',
    phone: '+998 71 000 0000',
    email: 'uz.office@eurasiapolicycouncil.org',
  },
]

export const sampleInsights = [
  {
    title: 'Strategic outlook: energy transition and regional resilience',
    type: 'Analysis',
    date: '2026-02-01',
    topic: 'Investment',
    region: 'Central Asia',
    summary: 'How green investment, regulatory reform and geopolitical risk are reshaping capital flows across Eurasia.',
  },
  {
    title: 'Water security and diplomacy: a pragmatic agenda for cooperation',
    type: 'Explainer',
    date: '2026-01-22',
    topic: 'Climate Change',
    region: 'Middle East',
    summary: 'Why shared basins demand new governance tools — and what has worked in comparable regions.',
  },
  {
    title: 'Inclusive growth: strengthening poverty management tools',
    type: 'Commentary',
    date: '2026-01-10',
    topic: 'Poverty Management',
    region: 'South Asia',
    summary: 'A compact set of high‑impact social policy measures that protect households while supporting productivity.',
  },
]

export const samplePublications = [
  {
    title: 'Eurasia Policy Brief 2026: Managing geopolitical risk',
    date: '2026-01-15',
    authors: 'EPC Research Unit',
    abstract:
      'A policy brief outlining practical options for governments and investors navigating volatility, sanctions risk and supply‑chain realignment.',
    keyFindings: [
      'Risk signals are clustering around regulatory change and energy corridors.',
      'Diversification strategies perform best when paired with institutional reform.',
      'Data transparency is now a competitive advantage for markets.',
    ],
  },
]

export const sampleEvents = [
  {
    title: 'Closed‑door roundtable: Eurasia investment and energy transition',
    date: '2026-03-05',
    location: 'London, UK',
    format: 'In‑person',
  },
  {
    title: 'Webinar: air pollution and urban resilience',
    date: '2026-03-18',
    location: 'Online',
    format: 'Online',
  },
]
