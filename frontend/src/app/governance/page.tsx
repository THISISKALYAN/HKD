"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* =========================================================
   NOUN-PROJECT-STYLE SVG ICON COMPONENTS
   All icons: 48×48 viewBox, stroke-based, currentColor
   ========================================================= */

const IconTemple = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="24" cy="9" r="2.5" fill="currentColor" stroke="none" />
    <path d="M21.5 11.5 L24 7 L26.5 11.5 Z" fill="currentColor" stroke="none" />
    <path d="M20 12 H28 V14.5 H20 Z" fill="currentColor" stroke="none" />
    <path d="M17 14.5 L20 14.5 L20 17 L28 17 L28 14.5 L31 14.5 L31 17.5 L17 17.5 Z"
      fill="currentColor" stroke="none" />
    <rect x="13" y="17.5" width="22" height="4" rx="0.5" fill="currentColor" stroke="none" />
    <rect x="11" y="21.5" width="26" height="20" rx="1" fill="currentColor" stroke="none" />
    <rect x="20.5" y="29" width="7" height="12.5" rx="3.5" fill="white" stroke="none" />
    <rect x="13" y="25" width="6" height="8" rx="1" fill="white" stroke="none" />
    <rect x="29" y="25" width="6" height="8" rx="1" fill="white" stroke="none" />
    <line x1="8" y1="41.5" x2="40" y2="41.5" strokeWidth="2.2" stroke="currentColor" />
  </svg>
);

const IconLotus = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 38 C24 38 12 32 12 22 C12 16 17.5 11 24 11 C30.5 11 36 16 36 22 C36 32 24 38 24 38Z"
      fill="currentColor" fillOpacity="0.12" />
    <path d="M24 38 C24 38 14 27 16 18 C17.5 12 20.5 10 24 10" />
    <path d="M24 38 C24 38 34 27 32 18 C30.5 12 27.5 10 24 10" />
    <path d="M24 10 C24 10 18 14 18 22 C18 29 24 38 24 38" />
    <path d="M24 10 C24 10 30 14 30 22 C30 29 24 38 24 38" />
    <path d="M24 38 L24 44" />
    <path d="M20 42 Q24 44 28 42" />
    <circle cx="24" cy="22" r="3.5" fill="currentColor" />
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 38 V10 C6 10 14 8 24 10 C34 8 42 10 42 10 V38 C42 38 34 36 24 38 C14 36 6 38 6 38Z"
      fill="currentColor" fillOpacity="0.1" />
    <line x1="24" y1="10" x2="24" y2="38" />
    <path d="M6 10 V38" />
    <path d="M42 10 V38" />
    <path d="M9 16 C13 17 18 17.5 24 17.5" />
    <path d="M39 16 C35 17 30 17.5 24 17.5" />
    <path d="M9 22 C13 23 18 23.5 24 23.5" />
    <path d="M39 22 C35 23 30 23.5 24 23.5" />
    <path d="M9 28 C13 29 18 29.5 24 29.5" />
    <path d="M39 28 C35 29 30 29.5 24 29.5" />
  </svg>
);

const IconHands = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 7 C24 7 18 14 16 22 C14 30 16 40 24 40 C32 40 34 30 32 22 C30 14 24 7 24 7Z"
      fill="currentColor" fillOpacity="0.12" />
    <path d="M24 7 C24 7 18 14 16 22 C14 30 16 40 24 40 C32 40 34 30 32 22 C30 14 24 7 24 7Z" />
    <path d="M18 18 C14 15 8 17 7 23 C6 28 9 33 15 35" />
    <path d="M30 18 C34 15 40 17 41 23 C42 28 39 33 33 35" />
    <line x1="24" y1="7" x2="24" y2="40" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

const IconCommunity = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="24" cy="13" r="5.5" />
    <path d="M13 40 C13 33 18 28 24 28 C30 28 35 33 35 40" />
    <circle cx="9" cy="16" r="4" />
    <path d="M2 38 C2 33 5 29 9 29 C11.5 29 13.8 30.2 15.5 32" />
    <circle cx="39" cy="16" r="4" />
    <path d="M46 38 C46 33 43 29 39 29 C36.5 29 34.2 30.2 32.5 32" />
  </svg>
);

const IconFlame = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 6 C24 6 14 17 14 28 C14 34.6 18.5 40 24 40 C29.5 40 34 34.6 34 28 C34 17 24 6 24 6Z"
      fill="currentColor" fillOpacity="0.12" />
    <path d="M24 6 C24 6 14 17 14 28 C14 34.6 18.5 40 24 40 C29.5 40 34 34.6 34 28 C34 17 24 6 24 6Z" />
    <path d="M24 16 C24 16 19 22 19 28 C19 30.8 21.2 33 24 33 C26.8 33 29 30.8 29 28 C29 22 24 16 24 16Z"
      fill="currentColor" fillOpacity="0.3" />
    <line x1="24" y1="40" x2="24" y2="44" />
    <path d="M19 43 Q24 45.5 29 43" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 6 L27.5 16.5 H38.5 L30 23.5 L33.5 34 L24 27.5 L14.5 34 L18 23.5 L9.5 16.5 H20.5 Z"
      fill="currentColor" fillOpacity="0.15" />
    <path d="M24 6 L27.5 16.5 H38.5 L30 23.5 L33.5 34 L24 27.5 L14.5 34 L18 23.5 L9.5 16.5 H20.5 Z" />
    <circle cx="24" cy="22" r="3.5" fill="currentColor" />
  </svg>
);

/* Large hero mandala — purely decorative, no image */
const HeroMandala = () => (
  <svg viewBox="0 0 200 200" fill="none" aria-hidden="true"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-15 pointer-events-none">
    {/* Outer ring */}
    <circle cx="100" cy="100" r="95" stroke="#cca75b" strokeWidth="0.8" strokeOpacity="0.4" />
    <circle cx="100" cy="100" r="80" stroke="#cca75b" strokeWidth="0.6" strokeOpacity="0.3" />
    {/* Petal ring outer */}
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <ellipse key={i} cx="100" cy="100" rx="14" ry="34"
        stroke="#cca75b" strokeWidth="1" strokeOpacity="0.55" fill="#cca75b" fillOpacity="0.06"
        transform={`rotate(${deg} 100 100) translate(0 -48)`} />
    ))}
    {/* Petal ring inner */}
    {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg, i) => (
      <ellipse key={i} cx="100" cy="100" rx="9" ry="22"
        stroke="#cca75b" strokeWidth="1" strokeOpacity="0.35" fill="#cca75b" fillOpacity="0.04"
        transform={`rotate(${deg} 100 100) translate(0 -44)`} />
    ))}
    {/* Mid ring */}
    <circle cx="100" cy="100" r="46" stroke="#cca75b" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Temple silhouette */}
    <circle cx="100" cy="90" r="4" fill="#cca75b" fillOpacity="0.9" />
    <path d="M96 94 L100 86 L104 94 Z" fill="#cca75b" fillOpacity="0.8" />
    <rect x="94" y="94" width="12" height="3" fill="#cca75b" fillOpacity="0.7" />
    <path d="M90 97 L94 97 L94 100 L106 100 L106 97 L110 97 L110 100.5 L90 100.5 Z"
      fill="#cca75b" fillOpacity="0.65" />
    <rect x="88" y="100.5" width="24" height="14" rx="1" fill="#cca75b" fillOpacity="0.55" />
    <rect x="95.5" y="107" width="9" height="7.5" rx="4.5" fill="#072149" fillOpacity="0.5" />
    <rect x="89" y="103" width="6.5" height="7" rx="1" fill="#072149" fillOpacity="0.4" />
    <rect x="104.5" y="103" width="6.5" height="7" rx="1" fill="#072149" fillOpacity="0.4" />
    <line x1="84" y1="114.5" x2="116" y2="114.5" stroke="#cca75b" strokeWidth="1.5" strokeOpacity="0.7" />
    {/* Inner circle */}
    <circle cx="100" cy="100" r="20" stroke="#cca75b" strokeWidth="0.8" strokeOpacity="0.4" />
    <circle cx="100" cy="100" r="5" fill="#cca75b" fillOpacity="0.6" />
    {/* Tick marks */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
      <line key={i}
        x1={100 + 48 * Math.cos((deg - 90) * Math.PI / 180)}
        y1={100 + 48 * Math.sin((deg - 90) * Math.PI / 180)}
        x2={100 + 52 * Math.cos((deg - 90) * Math.PI / 180)}
        y2={100 + 52 * Math.sin((deg - 90) * Math.PI / 180)}
        stroke="#cca75b" strokeWidth="1" strokeOpacity="0.4" />
    ))}
  </svg>
);

/* =========================================================
   DATA
   ========================================================= */

const leaders = [
  {
    id: 1,
    name: "Madhu Pandit Dasa",
    title: "Chairman",
    image: "/SriMadhuPanditDasa-1-2.webp",
    bio: [
      "Madhu Pandit Dasa was born in Nagercoil, Tamil Nadu. He became a full-time member of Hare Krishna Movement in 1981 while doing his M.Tech in Civil Engineering from IIT-Bombay. Since then, he has successfully conceived and implemented many large scale public service projects that positively impact millions of people. He has also worked tirelessly to preserve and promote Indian spirituality, culture and heritage among children and youth for their holistic well-being. He is the Chairman and Mentor, Global Hare Krishna Movement and the President of Hare Krishna Movement Dehradun.",
      "Madhu Pandit Dasa is the Trustee and Chairman of The Akshaya Patra Foundation, which has contributed immensely to alleviate classroom hunger and improve the nutrition levels of children studying in government schools in India. He has led Akshaya Patra to become an efficient Public-Private Partnership (PPP) and an admired social innovation. He provides visionary guidance for the world’s largest NGO run school meal programme.",
      "He is also the Chairman of Vrindavan Chandrodaya Mandir and India Heritage Foundation. His stellar contributions have been appreciated through prestigious awards and accolades like Padma Shri, Gandhi Peace Prize, National Award for Child Welfare, Nikkei Asia Prize and Distinguished Alumnus Award by IIT-Bombay."
    ]
  },
  {
    id: 2,
    name: "Chanchalapathi Dasa",
    title: "President",
    image: "/chanchalapathi-dasa.webp",
    bio: [
      "Chanchalapathi Dasa was born in 1963 in Bangalore, Karnataka. While an undergraduate student at PSG College of Technology, Coimbatore, he became interested in the message and mission of Srila Prabhupada. Later, he joined the Indian Institute of Science, Bangalore, for the Masters programme in Electrical Communication Engineering. He became a full-time dedicated member of Hare Krishna Movement in 1984 and has conceived various spiritual, cultural and social development programmes in the service of humanity. He led the creation of Little Krishna, a world-class animation series on the childhood pastimes of Krishna. He is the Vice Chairman of Akshaya Patra and directs the strategy, growth, and governance of the Foundation.",
      "Chanchalapathi Dasa is the Vice Chairman of the Governing Body Committee and Senior Vice President of Hare Krishna Movement Dehradun. He is also the President of Vrindavan Chandrodaya Mandir, a unique heritage and culture tourism infrastructure project poised to become the tallest Krishna temple in the world."
    ]
  },
  {
    id: 3,
    name: "Jai Chaitanya Dasa",
    title: "Governing Body Member",
    image: "https://hkmdehradun.org/assets/images/jai-chaitanya-dasa.jpeg",
    bio: [
      "Jai Chaitanya Dasa was born in 1966 in Trivandradrum Kerala. He came in touch with the teachings of Srila Prabhupada while pursuing his undergraduate course in Commerce at the Mahatma Gandhi College, Trivandrum. He joined Hare Krishna Movement in 1984. He has a deep understanding of the Pancharatra system of Deity worship and meticulously introduced this authentic Vedic tradition in the temples of the movement.",
      "Jai Chaitanya Dasa is a pioneer of Hare Krishna Movement’s organic farming and rural development programs. He was the President of the Bio-Dynamic Association of India and Secretary of the Asian Fairtrade Producers Association. He has strived to establish self-sufficient farm communities by practising sustainable organic agriculture and develop effective marketing strategies for their produce. He envisions a society where every individual can live in harmony with nature in a caring, giving and responsible manner. He is a member of the Governing Body Committee and serves as the Temple President of Hare Krishna Movement, Chennai. He is also the Project Director of the Krishna Lila Theme Park in Bangalore."
    ]
  },
  {
    id: 4,
    name: "Stoka Krishna Swami",
    title: "Governing Body Member",
    image: "https://hkmdehradun.org/assets/images/stoka-krishna-swami.jpeg",
    bio: [
      "Stoka Krishna Swami was born in 1960 in Mysore, Karnataka. He completed his Bachelors in Electrical Engineering from REC Nagpur. He worked as a lecturer in Malnad College of Engineering, Hassan. Before joining Hare Krishna Movement in 1989, he also worked for Infosys Technologies Ltd. and Tata Boroughs Ltd. He accepted Sanyasa, the renounced order of spiritual life in 2018. He is a respected teacher and speaker on the philosophy of Krishna Consciousness.",
      "Stoka Krishna Swami is a member of Governing Body Committee of the Hare Krishna Movement. He is currently heading the activities of the Hare Krishna Movement, Chennai. He is also serving as the Dean of Vaishnava Studies and regularly conducts Vaishnava philosophical courses like Bhakti Shastri for devotees across India. He was the President of Hare Krishna Movement Mysore and initiated several programs for the holistic development of local communities."
    ]
  },
  {
    id: 5,
    name: "Amitasana Dasa",
    title: "Governing Council Member",
    image: "https://hkmdehradun.org/assets/images/amitasana-dasa.jpeg",
    bio: [
      "Amitasana Dasa was born in 1969 in Namrup, Assam, India. He completed B. Tech. in Computer Science from REC Kurukshetra. He later worked in Kirloskar Computer Services, Bangalore and joined Hare Krishna Movement in 1992. He has organised seminars, workshops and counselling programs to benefit students and professionals from all over the country. He has guided hundreds of people, especially youth, to lead a life of happiness and fulfilment.",
      "Amitasana Dasa is the President of Hare Krishna Movement, Mumbai and Governing Council Member of Hare Krishna Movement, India. He is also the President of Akshaya Patra operations in Maharashtra. Under his leadership, the Foundation has implemented several development initiatives in the region."
    ]
  },
  {
    id: 6,
    name: "Vasudev Keshav Dasa",
    title: "Treasurer & Zonal Secretary",
    image: "https://hkmdehradun.org/assets/images/vasudev-keshava-dasa.jpeg",
    bio: [
      "Vasudev Keshav Dasa was born in 1973 in Kolkata, West Bengal. He studied B.Tech in Electronics and Communication Engineering from REC Warangal and worked in Wipro Systems as a Systems Engineer. He joined Hare Krishna Movement as a full-time missionary in 1998. As the Head of the Deities related services, he has ensured that high standards of worship are maintained in the temples of the Hare Krishna Movement.",
      "He is serving as the Treasurer and Zonal Secretary of Governing Body Committee and the Vice President of Hare Krishna Movement Dehradun. He is also the Dean of the National Institute of Value Education (NIVE), which is imparting Value Education to hundreds of children so that they grow to become responsible citizens. He has designed learning programs to bring about holistic development in young minds by enriching their physical, mental and spiritual well-being."
    ]
  },
  {
    id: 7,
    name: "Rajiv Lochan Dasa",
    title: "Zonal Secretary",
    image: "https://hkmdehradun.org/assets/images/rajeev-lochan-das.jpeg",
    bio: [
      "Rajiv Lochan Dasa was born in Sonipat, Haryana. He studied Bachelors in Science at St. Joseph’s College (Bangalore) and joined Hare Krishna Movement in 1993. He is known for leading ecstatic kirtans and delivering inspiring lectures on Bhagavad-gita and Srimad Bhagavatam.",
      "Rajiv Lochan Dasa is currently serving as Zonal Secretary of the Governing Body Committee, Hare Krishna Movement and Temple President, Hare Krishna Movement Hubli. He is supervising the construction of a magnificent Radha Krishna Temple in Hubli. He is the President of Akshaya Patra in Hubli and leads the operations of the world’s largest kitchen there. This best-in-class infrastructure was showcased in National Geographic Channel’s popular documentary series called Mega Kitchens."
    ]
  },
  {
    id: 8,
    name: "Satya Gaura Chandra Dasa",
    title: "Zonal Secretary",
    image: "https://hkmdehradun.org/assets/images/satyagoura-chandra-dasa.jpeg",
    bio: [
      "Satya Gaura Chandra Dasa was born in Rajahmundry, Andhra Pradesh. He is a Gold Medalist in B.Tech (Mechanical Engineering) at Jawaharlal Nehru Technological University, Kakinada. After completing M.Tech from IIT-Chennai, he worked in Novell, a multinational IT firm, before joining Hare Krishna Movement in 1997. He has rendered various services ranging from managing the temple administration to training and development of full-time missionaries.",
      "He is currently serving as the Zonal Secretary of the Governing Body Committee and the President of Hare Krishna Movement, Hyderabad. He initiated the Hare Krishna Charitable Trust, which is extensively feeding the underprivileged sections of society. He is a Trustee of Akshaya Patra and heads its operations in Telangana and Andhra Pradesh. He has set up kitchens in Kandi, Narasingi, Vishakapatnam, Vijayawada and various other locations, thus enabling the Foundation to serve hygienic and nutritious mid-day meals to lakhs of children."
    ]
  },
  {
    id: 9,
    name: "Sri Suvyakta Narasimha Dasa",
    title: "Senior Vice President",
    image: "https://hkmdehradun.org/assets/images/suvyakta-narasimha-dasa.jpeg",
    bio: [
      "Suvyakta Narasimha Dasa was born in 1973 in Moovattupuzha in Kerala. He completed B.E. (Mechanical) from M S Ramaiah Institute of Technology and secured 5th rank in Bangalore University. After graduation, he worked in Lincoln Helios India Ltd. as a Design Engineer. After becoming a full-time missionary of Hare Krishna Movement in 1999, he has been dedicating his skills and expertise for the welfare of society.",
      "Suvyakta Narasimha Dasa successfully designed and operationalised Akshaya Patra’s centralised kitchens in Vrindavan, Lucknow, Jaipur and other locations. He has been instrumental in the setting up of the sprawling Vrindavan Chandrodaya Mandir campus. He is currently serving as Senior Vice President of Hare Krishna Movement, Chennai and also overseeing the operations of Akshaya Patra in Tamil Nadu."
    ]
  }
];


const values = [
  { Icon: IconLotus,    title: 'Devotion First',       desc: 'Every decision flows from love for Lord Sri Krishna and the direct instructions of Srila Prabhupada.' },
  { Icon: IconBook,     title: 'Scriptural Guidance',  desc: 'Governance follows the Bhagavad Gita and Srimad Bhagavatam — the eternal compass for all action.' },
  { Icon: IconHands,    title: 'Transparent Service',  desc: 'All resources are managed with full accountability and dedicated to the welfare of every living being.' },
  { Icon: IconCommunity,title: 'Community at Heart',   desc: 'The temple exists to serve the congregation, the city of Dehradun, and all of Uttarakhand.' },
  { Icon: IconFlame,    title: 'Missionary Zeal',      desc: 'Our leaders work tirelessly, inspired by Srila Prabhupada\'s example of selfless dedication.' },
  { Icon: IconStar,     title: 'Excellence in All',    desc: 'We hold the highest standards in worship, outreach, education, and community service.' },
];

/* =========================================================
   UTILITY COMPONENTS
   ========================================================= */

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-72px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function GovernancePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 font-sans overflow-x-hidden">

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative overflow-hidden z-10 bg-[#faf8f5] py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Decorative Tag */}
          <div className="flex items-center gap-3 text-[#d4af37] mb-2">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">HARE KRISHNA MOVEMENT DEHRADUN</span>
            <div className="h-px w-10 bg-current"></div>
          </div>

          {/* Page Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-4">
            Governance
          </h1>

        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-28 relative z-10">

        {/* Leaders Grid */}
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {leaders.map((leader, idx) => (
              <motion.div
                layoutId={`leader-${leader.id}`}
                key={leader.id}
                onClick={() => setSelectedId(leader.id)}
                className="group cursor-pointer flex flex-col max-w-[280px] mx-auto w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow duration-500 border border-gray-100">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col px-1">
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-[#072149] tracking-tight leading-tight mb-1.5 transition-colors duration-300 group-hover:text-[#d4af37]">
                    {leader.name}
                  </h3>
                  <p className="text-[16px] sm:text-[17px] font-medium text-[#5c5245]">
                    {leader.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ── LEADER MODAL (Eternal Exact Style) ──────────────────────── */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex bg-white overflow-y-auto">
            {leaders.map(leader => leader.id === selectedId && (
              <motion.div
                layoutId={`leader-${leader.id}`}
                key={leader.id}
                className="w-full min-h-screen bg-white relative">
                
                <div className="flex flex-col-reverse md:flex-row px-6 lg:max-w-[1200px] mx-auto xl:p-0 gap-6 md:gap-[49px] sm:mt-[120px] mt-[60px] w-full">
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-medium text-left text-[#0A0A0A] sm:text-[40px]">
                          {leader.name}
                        </h1>
                        <h2 className="font-light text-left mt-3 text-[#414A5D] sm:text-[20px]">
                          {leader.title}
                        </h2>
                      </div>
                      <div className="text-left font-light mt-8 mb-12 whitespace-pre-line text-[#414A5D] sm:text-[20px] sm:mt-12 sm:mb-6">
                        {leader.bio.map((para, i) => (
                          <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => setSelectedId(null)}
                        className="bg-[#0A0A0A] text-white py-3 px-6 text-sm md:text-base w-max mb-[60px] sm:mb-[120px] hover:bg-black/80 transition-colors">
                        Show all Governance
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative w-full aspect-[0.74] md:w-auto md:h-[437px] flex-shrink-0">
                    <Image 
                      src={leader.image} 
                      alt={leader.name} 
                      fill 
                      className="object-cover block transition duration-700" 
                    />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
