
import { useMemo, useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import clsx from 'clsx'
import { ShieldCheck, Users, Sparkles, GraduationCap } from 'lucide-react'
import kamal from "../../assets/kamal.png"
import laura from "../../assets/Laura.png"
import Saeed from "../../assets/saeed.jpeg"
import Samir from "../../assets/samir.jpeg"
import Fouzia from "../../assets/fouzia.jpeg"
import Daba from "../../assets/daba.jpeg"
import Shabnam from '../../assets/shabnam.jpeg'
import Berunity from "../../assets/Berunity.png"
import Kumar from "../../assets/kumar.png"
import David from "../../assets/David.jpeg"
import Moon from "../../assets/moon.png"
import Chen from "../../assets/chen.jpeg"
import Raza from "../../assets/raza.jpeg"
import mohamed from "../../assets/mohamed.png"
// import olga from "../../assets/olga.png"
import gevorg from "../../assets/melikyan.jpeg"
import belaKogan from "../../assets/bela.jpeg"
import garethStamp from "../../assets/stamp.jpeg"
type Person = {
  name: string
  title: string
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

function InitialsAvatar({ name }: { name: string }) {
  const initials = useMemo(() => {
    const parts = name.split(' ').filter(Boolean)
    const a = parts[0]?.[0] ?? 'A'
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase()
  }, [name])

  return (
    <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-navy to-brand-blue text-white shadow-card">
      <span className="font-heading text-xl font-semibold tracking-wide">{initials}</span>
    </div>
  )
}

function PersonCard({ person }: { person: Person }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="group rounded-3xl border border-brand-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* Avatar + name */}
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="h-20 w-20 rounded-full border border-brand-line object-cover shadow-sm"
              loading="lazy"
            />
          ) : (
            <InitialsAvatar name={person.name} />
          )}
        </div>

        <div className="min-w-0">
          <div className="font-heading text-lg font-semibold text-slate-900">{person.name}</div>
          <div className="mt-0.5 text-sm text-slate-600">{person.title}</div>
          {person.location && <div className="mt-1 text-xs text-slate-500">{person.location}</div>}

          {person.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {person.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-[11px] text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Bio */}
      <div className="mt-4 text-sm leading-6 text-slate-700">
        <p className="text-slate-700">{person.short}</p>

        <div
          className={clsx(
            'mt-3 overflow-hidden transition-[max-height,opacity] duration-300',
            open ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <p className="text-slate-700">{person.long}</p>
        </div>

        {person.long.trim().length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center text-sm font-semibold text-brand-blue hover:underline"
          >
            {open ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  )
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  body,
}: {
  icon: React.ReactNode
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="rounded-3xl border border-brand-line bg-brand-mist p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">{icon}</div>
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.18em] text-slate-600">{eyebrow}</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{body}</p>
        </div>
      </div>
    </div>
  )
}

export default function Governance() {
  // ✅ Advisory Council (short + long bios)
  const advisory: Person[] = [
     {
      name: 'Prof. Fouzia Sadiq',
      image: Fouzia,
      title: 'Advisory Council',
      location: 'Pakistan / UK',
      short: 'Senior biomedical scientist and healthcare strategist spanning research, academia and medical technology leadership.',
      long: clampWords(
        'Group Director–Medical at Alsons Group, leading regulatory affairs, medical device development and national capacity-building, including Pakistan’s first DRAP-approved ICU ventilator. National Lead Investigator for Familial Hypercholesterolemia and Coordinator of the Lipid Clinic Network (European Atherosclerosis Society initiatives). Former academic leader at Shifa TameereMillat University, strengthening research governance and partnerships; 15 years of research at Imperial College London with publications across leading journals. Board roles include Malir University of Science & Technology and AAS Foundation, where she established and directs the Centre for Addiction and Mental Health.',
        95,
      ),
      tags: ['Health Systems', 'Research', 'Regulation', 'Innovation'],
    },
    {
      name: 'Laura Roberts',
      image: laura,
      title: 'Advisory Council',
      location: 'United Kingdom / Europe & Mediterranean',
      short: 'Strategic communications and diplomatic adviser working at the intersection of geopolitics, trade and public affairs.',
      long: clampWords(
        'She has held senior leadership roles across international organisations and advisory groups focused on diplomacy, conflict-affected regions and cross-border cooperation. As former Executive Director of the UK Abraham Accords Group, she led high-level engagement with governments, parliamentarians and diplomats, and now supports its expansion across Europe and the Mediterranean.',
        75,
      ),
      tags: ['Diplomacy', 'Public Affairs', 'Geopolitics'],
    },
   {
  name: 'Dr. Saeed Samani Majd',
  image: Saeed,
  title: 'Advisory Council',
  location: 'University of Tehran, Iran',
  short: 'Environmental systems strategist and postdoctoral researcher specialising in sustainable infrastructure, water governance and circular economy innovation.',
  long: clampWords(
    'Dr. Saeed Samani Majd is an environmental systems strategist and postdoctoral researcher specialising in sustainable infrastructure, water governance and circular economy innovation. His work integrates engineering science, policy insight and market-driven sustainability models to advance climate-resilient water and waste systems. He holds patents in environmental treatment technologies and contributes to the development and assessment of green ventures aligned with long-term global megatrends. His research and advisory activities focus on translating environmental innovation into scalable economic and institutional frameworks.',
    75,
  ),
  tags: ['Sustainable Infrastructure', 'Water Governance', 'Circular Economy', 'Climate Resilience', 'Environmental Innovation'],
},


    {
      name: 'Prof. Kamal Bechkoum',
      image: kamal,
      title: 'Advisory Council',
      location: 'United Kingdom',
      short: 'Internationally recognised keynote speaker and senior higher education leader with 30+ years of UK sector experience.',
      long: clampWords(
        'He has served in senior leadership roles up to Pro-Vice-Chancellor and directed major change initiatives across faculties of Computing, Engineering, and Business. His work prioritises people-centred and evidence-based innovation, particularly within Cybersecurity, Artificial Intelligence, and Leadership.',
        70,
      ),
      tags: ['Higher Education', 'AI', 'Cybersecurity', 'Leadership'],
    },
     {
  name: 'Prof. Mohamed Abdel-Maguid',
  image: mohamed,
  title: 'Advisory Council',
  location: 'Canterbury Christ Church University, United Kingdom',
  short: 'Pro Vice-Chancellor (STEM) and Dean with over 30 years of experience in engineering, digital technologies and higher education leadership.',
  long: clampWords(
    'Professor Mohamed Abdel-Maguid is Pro Vice-Chancellor (STEM) and Dean of the Faculty of Science, Engineering and Social Sciences at Canterbury Christ Church University. He has more than 30 years of experience as an engineer, researcher and senior academic leader. His work focuses on digital technologies, Industry 4.0, future networks and digital transformation, alongside fostering innovation, entrepreneurship and university–business collaboration.',
    75,
  ),
  tags: ['STEM Leadership', 'Digital Transformation', 'Industry 4.0', 'Innovation Strategy', 'Engineering Education'],
},
    {
  name: "Dr. Beruniy S. Alimov",
  image: Berunity, // replace with correct image variable if needed
  title: "Advisory Council",
  location: "United Kingdom",

 
  short:
    "International media and communications expert with senior public-sector experience and extensive international advisory work.",

  // Detail intro (long but still readable)
  long: clampWords(
    "Senior journalist, educator, and communications specialist with experience across government, academia, and international organisations. He has led media training and research programmes, advised multilateral institutions, and delivered capacity-building for journalists and public information officers across Eurasia and beyond.",
    70
  ),

  // Tag chips on UI
  tags: [
    "Media & Communications",
    "Public Policy",
    "Media Training",
    "Strategic Communications",
    "Information Integrity"
  ],

    },


{
  name: "Rev Dr. David William Parry",
  image: David, // <-- set your import variable name
  title: "Advisory Council",
  location: "United Kingdom",
  short:
    "British author, poet, and Old Catholic priest bridging culture, education, and philosophic dialogue across Eurasia.",
  long: clampWords(
    "Rev Dr David William Parry is a British author, poet, and Old Catholic priest whose work connects culture, education, and philosophic dialogue across Eurasia. Former Chair of the Eurasian Creative Guild (London), he has supported exchange between Central Asian and European creatives and travelled widely in the region. He holds degrees from King’s College London (BA), Heythrop College (MA), and the University of South Wales (PhD). A Fellow of the Royal Asiatic Society and the Royal Anthropological Institute, he brings network-building experience to the Eurasia Policy Council’s Education and Business Investment pillars. His publications include Caliban’s Redemption, The Grammar of Witchcraft, and Mount Athos Inside Me; he has also delivered TEDx talks and leads St Valentine’s Hall in London. At the Council, he supports culturally informed policy, regional connectivity, and the evolution of aesthetic ecologies across the region.",
    95
  ),
  tags: [
    "Culture & Education",
    "Eurasia Networks",
    "Creative Exchange",
    "Philosophic Dialogue",
    "Regional Connectivity"
  ],
},
 {
  name: 'Dr. Gevorg Melikyan, PhD',
  image: gevorg, // make sure you import the image as `gevorg`
  title: 'Advisory Council',
  location: 'Armenia / International Relations & Security Policy',
  short: 'Policy analyst and International Relations scholar specialising in security studies, hybrid warfare and Eurasian geopolitics.',
  long: clampWords(
    'Gevorg Melikyan, PhD, is a policy analyst, International Relations scholar and founder of the Armenian Institute for Resilience & Statecraft (INFORS Armenia). He served as Advisor to the President of Armenia, Armen Sarkissian (2018–2022). His expertise spans hybrid warfare, foreign and security policy, military-political alliances, Eurasian studies, conflict management and domestic politics. He has extensive experience engaging with government institutions and international organisations. He lectures on security challenges, hybrid warfare, U.S. foreign policy and strategic competition, and collaborates with NATO departments, the George C. Marshall Center alumni network, and leading international think tanks. In 2025, he co-authored the bestseller “Comprehensive Security: Armenia’s Choice in the New World Order.”',
    75,
  ),
  tags: ['Security Studies', 'Hybrid Warfare', 'Foreign Policy', 'Eurasian Studies', 'Strategic Competition'],
},
{
  name: 'Gareth Stamp',
  image: garethStamp, 
  title: 'Advisory Council',
  location: 'Central Asia / Education, Climate & Investment Policy',
  short:
    'Senior education leader and policy contributor specialising in Central Asia, sustainability, and cross-sector cooperation.',
  long: clampWords(
    'Gareth Stamp is a senior education leader, policy contributor, and cultural diplomat with more than two decades of deep, hands-on experience across Central Asia. He has lived and worked extensively in Kazakhstan and the wider Eurasian region, holding senior academic, advisory, and leadership roles that bridge education reform, creative industries, sustainability, and international cooperation. His expertise aligns closely with the Eurasian Policy Council’s three strategic pillars. In climate change, he has led sustainability strategies for international schools, organised regional environmental conferences, and worked directly on environmental education, biomimicry, and conservation projects linking policy, science, and community engagement. In education, he has served as a senior visiting professor, curriculum reform consultant, teacher trainer, and examiner, contributing to large-scale professional development programmes and advising governments, universities, and international institutions across post-Soviet states. In business and investment, he has chaired industry committees, directed training and development companies in both Kazakhstan and Europe, and built sustained partnerships between education, government, and private enterprise. Recognised with international honours for diplomacy and services to education in Kazakhstan, Gareth brings regional insight, practical leadership, and cross-sector experience to advancing sustainable development and cooperation across Central Asia.',
    75,
  ),
  tags: [
    'Central Asia',
    'Education Reform',
    'Climate Change',
    'Sustainability',
    'International Cooperation',
    'Business & Investment',
    'Public Policy',
  ],
},
// {
//   name: 'Dr. Olga Podberezkina',
//   image: olga, // make sure you import this image as `olga`
//   title: 'Advisory Council',
//   location: 'Eurasia / International Relations',
//   short: 'Political scientist specialising in Eurasian geopolitics, geoeconomics, Arctic strategy and international transport corridors.',
//   long: clampWords(
//     'Dr. Olga Podberezkina is a political scientist specialising in Eurasian geopolitics, international transport corridors, Arctic development and geoeconomic strategy. From 2021 to 2025, she served as Vice-Rector for International Relations at Mordovian State University, leading internationalisation strategy, expanding English-language programmes and strengthening global partnerships. Previously, she was Deputy Director of International Relations at the Ministry of Education of the Russian Federation, overseeing cooperation projects across Central Asia, the Middle East and Southeast Asia, and participating in multilateral initiatives. She has authored 40+ publications on the Northern Sea Route, Arctic strategy, the Belt and Road Initiative and Eurasian integration, and has lectured at MGIMO on infrastructure geopolitics. She holds a PhD in Political Science from MGIMO and speaks Russian (native), English, French and German.',
//     75,
//   ),
//   tags: ['Eurasian Geopolitics', 'Geoeconomics', 'Arctic Strategy', 'Transport Corridors', 'International Relations'],
// },

   
  ]

  // ✅ Management Team
  const management: Person[] = [
    {
      name: 'Professor Shabnam Delfani',
      image: Shabnam,
      title: 'Management Team (CEO)',
      location: 'UK / International',
      short: 'Environmental scientist and diplomat specialising in climate change modelling, sustainability and women’s leadership in international affairs.',
      long: clampWords(
        'PhD in Environmental Management (Climate Change Modelling) from the University of Plymouth, with affiliations across international institutions. UN Senior Associate and Advisor for the MENA region on disaster management and sustainable climate strategies. World Women’s Peace Ambassador and Co-Founder of the Eurasia Policy Council, advancing high-level dialogue and women’s leadership through “Breaking Barriers in Diplomacy.” An author and keynote speaker on major international platforms including Davos and UN-linked events, with ongoing community engagement and advocacy.',
        100,
      ),
      tags: ['Climate', 'Diplomacy', 'Women’s Leadership', 'Sustainability'],
    },
  

{
  name: "Mr.Raza Syed", 
  image: Raza, 
  title: "Management Team (CFO)",
  location: "United Kingdom / Central Asia",
  short:
    "Senior international journalist and media executive specialising in Central Asian geopolitics, diplomacy, and economic development.",
  long: clampWords(
    "A senior international journalist and media executive with over 15 years of experience focusing on Central Asian geopolitics, regional diplomacy, and economic development. Has provided on-the-ground coverage of major regional events, including the 2022 Presidential Election in Kazakhstan (as an invited guest of the Government of Kazakhstan), the Central Asia Summit in Samarkand (2025), and high-level investment, interfaith, and tourism forums across Kazakhstan, Uzbekistan, Kyrgyzstan, and Tajikistan. In 2025, received an official award from the Government of Uzbekistan for distinguished reporting. As Managing Editor of The London Post (since 2021), leads editorial strategy on Eurasian affairs—combining analytical depth with field insight to inform policy and strengthen international dialogue. Holds postgraduate degrees in Broadcast Journalism, Documentary Filmmaking, Electronic Information Management, and Political Science, supporting a multidisciplinary approach to leadership and strategic communication.",
    100
  ),
  tags: [
    "Central Asia",
    "Geopolitics",
    "Regional Diplomacy",
    "Media Strategy",
    "Economic Development"
  ],
},
  {
      name: 'Dr. Dababrata Chowdhury',
      image: Daba,
      title: 'Management Team (COO)',
      location: 'United Kingdom',
      short: 'Assoc. Prof. Dababrata Chowdhury is Reader in Digital Entrepreneurship with 22+ years’ experience in higher education, industry partnerships and programme development.',
      long: clampWords(
        'He holds a BSc in Computer Science & Engineering (Hacettepe University, Ankara), followed by an MBA and PhD (University of Plymouth). He has developed strategic university-industry connections globally and contributes editorially across peer-reviewed journals. He is associated with the Cambridge Central Asia Forum (Jesus College, University of Cambridge) and communicates in English, Turkish, Hindi, Bengali, Azeri and Urdu.',
        95,
      ),
      tags: ['Entrepreneurship', 'Industry Partnerships', 'Innovation'],
    },
    


  ]


    // ✅ Experts
  const experts: Person[] = [
    {
      name: 'Samir Hümbətov',
      image: Samir,
      title: 'Expert',
      location: 'Baku, Azerbaijan',
      short: 'Head of the Center for International Relations and Diplomacy Studies and lecturer at Azerbaijan University.',
      long: clampWords(
        'Founder and director of the international scientific conferences “ZANGAZUR” and “TURAN”. Author of a textbook and 100+ academic articles, he regularly contributes to public discussion and media on foreign policy, international security and related fields.',
        80,
      ),
      tags: ['International Relations', 'Diplomacy', 'Security'],
    },

    {
      name: 'Dr. Pravesh Kumar Gupta',
      image: Kumar,
      title: 'Expert',
      location: 'India',
      short:
        'Expert on Eurasian geopolitics, Central Asia and connectivity, with a strong focus on energy security.',
      long: clampWords(
        'Dr. Pravesh Kumar Gupta is an Associate Fellow at the Vivekananda International Foundation (VIF) and a specialist in Eurasian geopolitics. He holds a PhD in Central Asian Studies from Jawaharlal Nehru University (JNU), New Delhi. His research examines society and politics in Central Asia, energy security and trans-regional connectivity, with expertise in Russian geopolitics. He publishes widely and has served as an International Election Observer in Uzbekistan.',
        95,
      ),
      tags: ['Eurasia', 'Central Asia', 'Energy Security', 'Connectivity', 'Russia'],
    },
{
  name: 'Bela Alex Kogan',
  image: belaKogan, // import the image as `belaKogan`
  title: 'Expert',
  location: 'International / Metals Trading & Mining Investment',
  short:
    'International metals trader and mining investment specialist connecting Asia–Africa markets in gold, copper, and strategic resources.',
  long: clampWords(
    'Bela Alex Kogan is an international metals trader and mining investment specialist with deep experience spanning Africa, China, Central Asia, Europe, and the United Kingdom. She focuses on sourcing, trading, and structuring projects in gold, copper, and related resources, connecting markets between Asia and Africa. Bela serves as a Special Correspondent for London Post News, drawing on firsthand knowledge of global markets, geopolitical shifts, and resource security. Prior to her career in mining and investment, she worked as a journalist for Russian, Kazakhstani, and Hong Kong television networks, reporting on economic development, geopolitics, and energy across Eurasia. Her unique blend of media expertise and resource economics enables her to offer sharp analysis of regional market dynamics, cross-border investment flows, and strategic partnerships shaping the global metals trade — directly supporting the Eurasia Policy Council’s mission to illuminate the forces driving economic integration across the region.',
    75,
  ),
  tags: [
    'Metals Trading',
    'Mining Investment',
    'Gold',
    'Copper',
    'Resource Security',
    'Geopolitics',
    'Asia–Africa Markets',
  ],
},
    {
      name: 'Dr. Moon Hyung Suk',
      image: Moon,
      title: 'Expert',
      location: 'Asia / Europe',
      short:
        'International cultural strategist and adviser with 20+ years in cultural diplomacy and cross-regional cooperation.',
      long: clampWords(
        'Dr. Moon Hyung Suk is an international cultural strategist and adviser with extensive experience in global cultural diplomacy and cross-regional cooperation across Asia and Europe. He has held senior roles in UNESCO-affiliated cultural networks and advises international institutions on cultural exchange and dialogue.',
        95,
      ),
      tags: ['Cultural Diplomacy', 'Intercultural Dialogue', 'Media Engagement', 'Asia–Europe'],
    },

    {
      name: 'Chen Shenglai',
      image: Chen,
      title: 'Expert',
      location: 'China',
      short:
        'Senior research fellow and cultural policy strategist with leadership in media reform and international cultural exchange.',
      long: clampWords(
        'Chen Shenglai is a senior research fellow and cultural policy expert with extensive leadership experience in media reform, global cultural exchange and institutional development. He has led major research initiatives and contributed to policy development in culture, communication and international cooperation.',
        95,
      ),
      tags: ['Cultural Policy', 'Media Strategy', 'Cultural Diplomacy', 'Partnerships'],
    },

  
  ]
  return (
    <div>
      <PageHeader
  variant="gradient"
  eyebrow="people"
  title="Our Team"
  description="Team that protects independence, strengthens accountability, and supports trusted engagement with partners and stakeholders."
  crumbs={[
    { label: 'Home', href: '/' },
    { label: 'people', href: '/people' },
    { label: 'Our Team' },
  ]}
/>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* ✅ Professional intro band (no Board/Editorial bullets) */}
          <div className="rounded-3xl border border-brand-line bg-gradient-to-r from-brand-navy to-brand-navy2 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Oversight</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-white">A structure built for credibility</h2>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  The Council’s work is supported by an expert Advisory Council and a Management Team that ensures programme
                  delivery, research quality and strategic partnerships. Profiles below reflect your approved leadership and
                  advisory contributors.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Principles</div>
                    <div className="mt-2 text-sm text-white/85">Independent • Evidence-led • Partner-ready</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="font-heading text-xs uppercase tracking-[0.18em] text-white/70">Focus</div>
                    <div className="mt-2 text-sm text-white/85">Policy relevance • Practical outcomes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

          {/* ✅ Management Team */}
          <div className="mt-12">
            <SectionHeader
              icon={<ShieldCheck className="h-5 w-5 text-brand-blue" />}
              eyebrow="Management Team"
              title="Delivery, partnerships and quality"
              body="Leadership responsible for programme execution, research standards, institutional partnerships and organisational development."
            />

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {management.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>

           {/* ✅ Advisory Council */}
          <div className="mt-10">
            <SectionHeader
              icon={<Users className="h-5 w-5 text-brand-blue" />}
              eyebrow="Advisory Council"
              title="Regional expertise and sector depth"
              body="A senior group of advisors bringing academic, diplomatic, policy and technical expertise to support programme direction and high-level engagement."
            />

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {advisory.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>

                    {/* ✅ Experts */}
          <div className="mt-10">
            <SectionHeader
              icon={<GraduationCap className="h-5 w-5 text-brand-blue" />}
              eyebrow="Experts"
              title="Specialists supporting programmes and research"
              body="A wider network of subject-matter experts contributing analysis, regional insight and sector expertise across the Council’s work."
            />

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {experts.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>

          {/* ✅ Optional CTA band */}
          <div className="mt-12 rounded-3xl border border-brand-line bg-brand-mist p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">
                  <Sparkles className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <div className="font-heading text-lg font-semibold text-slate-900">Join our network</div>
                  <div className="mt-1 text-sm text-slate-700">
                    We collaborate with institutions, experts and partners across regions to deliver actionable policy support.
                  </div>
                </div>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
              >
                Contact the Council
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
