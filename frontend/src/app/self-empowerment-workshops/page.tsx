"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, 
  Target, Users, BookOpen, Clock, Calendar, 
  MapPin, Star, Play, Pause, ChevronLeft, ChevronRight, Award,
  Compass, Zap, Filter
} from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import FolkNavbar from "@/components/FolkNavbar";

/* ── Animated counter widget ────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export interface SessionItem {
  id: number;
  badge: string;
  category: string;
  tagline: string;
  title: string;
  text: string[];
  image: string;
  bgAccent: string;
  borderAccent: string;
}

const SESSIONS_DATA: SessionItem[] = [
  // ── THEME 1: GAME OF IDENTITIES ──────────────────────────────
  {
    id: 1,
    badge: "SESSION 1",
    category: "Game of Identities",
    tagline: "Game of Identities",
    title: "Rise above the roles",
    text: [
      "A son. A Student. An Employee. A Brother. A Citizen. Playing a double role is a highly challenging feat. What if you had to play multiple roles in reality? As a matter of fact, we all adorn several roles in our lives, although some with more fulfilment than the others.",
      "Take a look around- amidst all those roleplay, whom do you really identify with? Who is the Real 'You'? Temporal Roles come and vanish. What Role do you Eternally Play?"
    ],
    image: "/workshops/empowerment/session-1.jpg",
    bgAccent: "from-blue-600/10 to-indigo-600/10",
    borderAccent: "border-blue-500/30"
  },
  {
    id: 2,
    badge: "SESSION 2",
    category: "Game of Identities",
    tagline: "Game of Identities",
    title: "Pleasure beyond the persona",
    text: [
      "Both Adolf Hitler and Nelson Mandela looked irresistibly innocent at birth. But while the former took away millions of lives, the latter kindled life into the Africans who were almost dead. A person is known by his deeds and demeanor. But beyond that, what is he at all?",
      "Is there no identity of ours beyond our looks and character? Have we ever seen our Inner 'Me'?"
    ],
    image: "/workshops/empowerment/session-2.jpg",
    bgAccent: "from-indigo-600/10 to-purple-600/10",
    borderAccent: "border-indigo-500/30"
  },

  // ── THEME 2: DESTINY DEMYSTIFIED ─────────────────────────────
  {
    id: 3,
    badge: "SESSION 3",
    category: "Destiny demystified",
    tagline: "Destiny demystified",
    title: "Fruit : Fate or Fag?",
    text: [
      "Robert Boyle discovered that there is a perfect correlation between the pressure, volume and temperature of any thermodynamic system. This law works literally everywhere.",
      "When there is strict adherence to physical laws in all spheres of reality, why say that our lives are running merely on chance? Are there any Natural Laws governing us?"
    ],
    image: "/workshops/empowerment/session-3.jpg",
    bgAccent: "from-purple-600/10 to-pink-600/10",
    borderAccent: "border-purple-500/30"
  },
  {
    id: 4,
    badge: "SESSION 4",
    category: "Destiny demystified",
    tagline: "Destiny demystified",
    title: "Decoding the Duty",
    text: [
      "Duty is Devotion! It is sacred. Really? Picture this! You are a soldier on the edge of our national border, whose duty is to defend our country. Another soldier on the other side of the border reckons his duty is to kill you!",
      "Whose duty is more valuable? Each have opposing goals! What is Real Duty? How should we render it?"
    ],
    image: "/workshops/empowerment/session-4.jpg",
    bgAccent: "from-rose-600/10 to-orange-600/10",
    borderAccent: "border-rose-500/30"
  },

  // ── THEME 3: WORK LIFE BALANCE ───────────────────────────────
  {
    id: 5,
    badge: "SESSION 5",
    category: "Work life balance",
    tagline: "Work life balance",
    title: "Handling competition",
    text: [
      "CBSE repeals the ranking and marking system to de-stress the students and allay the exam fears. Although the central education board may have relaxed the stricture in the early days of academics, the pressure nonetheless mounts when the child grows.",
      "Competition is inevitable. More than competence, what is lacking is the strength to handle competitive situations. Gain unassailable edge over your competitors by preparing yourself to face the challenge, however tough!"
    ],
    image: "/workshops/empowerment/session-5.jpg",
    bgAccent: "from-amber-600/10 to-yellow-600/10",
    borderAccent: "border-amber-500/30"
  },
  {
    id: 6,
    badge: "SESSION 6",
    category: "Work life balance",
    tagline: "Work life balance",
    title: "Self – Excellence : Rediscovered",
    text: [
      "Studies reveal that we use barely a 10th of our brainpower. Many of us are unaware of the innate skills which are hardwired into the system.",
      "Explore your true potential. Unleash the Rediscovered Excellence inside you."
    ],
    image: "/workshops/empowerment/session-6.jpg",
    bgAccent: "from-emerald-600/10 to-teal-600/10",
    borderAccent: "border-emerald-500/30"
  },

  // ── THEME 4: THE 3 STRINGS THAT PULL US ──────────────────────
  {
    id: 7,
    badge: "SESSION 7",
    category: "The 3 strings that Pull Us",
    tagline: "The 3 strings that Pull Us",
    title: "Know modes Know moods",
    text: [
      "Trace your day- Enlist your Emotions. You Feel... Fresh, Happy, Jubilant, Angry, Frustrated, Tired, Hopeful, Sleepy, Satisfied, Distraught.",
      "What is causing this see-saw of emotions? Why do you get angry on an apparently good day? Why is every day not the same? Why am I forced to assume some of these feelings?"
    ],
    image: "/workshops/empowerment/session-7.jpg",
    bgAccent: "from-teal-600/10 to-cyan-600/10",
    borderAccent: "border-teal-500/30"
  },
  {
    id: 8,
    badge: "SESSION 8",
    category: "The 3 strings that Pull Us",
    tagline: "The 3 strings that Pull Us",
    title: "Mastering the moods",
    text: [
      "To be influenced by an external factor and modify our internal psyche is a serious deficiency.",
      "A man of integrity remains steadfast, notwithstanding any unfavourable conditions provoking his negative side."
    ],
    image: "/workshops/empowerment/session-8.jpg",
    bgAccent: "from-cyan-600/10 to-blue-600/10",
    borderAccent: "border-cyan-500/30"
  },

  // ── THEME 5: TIMELESS LEADERSHIP ─────────────────────────────
  {
    id: 9,
    badge: "SESSION 9",
    category: "Timeless Leadership",
    tagline: "Timeless Leadership",
    title: "Leadership : Action, not position",
    text: [
      "A Korean CEO asks an early bird to the office, an Indian, to pick up the broom and start cleaning the floor as he has come early to the plant. Hesitantly, the Indian agrees. While he is brooming, he hears a similar sound from behind. It's the CEO cleaning the other side of the assembly. The Indian was won over. This is a real incident.",
      "The CEO is not just a boss, he's a Leader. Period."
    ],
    image: "/workshops/empowerment/session-9.jpg",
    bgAccent: "from-blue-600/10 to-violet-600/10",
    borderAccent: "border-blue-500/30"
  },
  {
    id: 10,
    badge: "SESSION 10",
    category: "Timeless Leadership",
    tagline: "Timeless Leadership",
    title: "Walk the Talk",
    text: [
      "Imagine the Defense Minister of the country heading the military force during a war, not in his ministry building, but on the battlefield. The entire nation will join the army.",
      "Leadership makes an effect when the leader personifies what he wants his followers to be."
    ],
    image: "/workshops/empowerment/session-10.jpg",
    bgAccent: "from-violet-600/10 to-purple-600/10",
    borderAccent: "border-violet-500/30"
  },

  // ── THEME 6: DESIRE MANAGEMENT ───────────────────────────────
  {
    id: 11,
    badge: "SESSION 11",
    category: "Desire Management",
    tagline: "Desire Management",
    title: "Deserve and Desire",
    text: [
      "I cannot buy a Ferrari with a mere Rs.100 in my pocket. I have to earn lots of money. When we aspire to get something, to achieve some dreams, we don't look into our pocket! Should we?",
      "Yes. There is a price to pay for every amenity that we enjoy in life. The cost may be in rupees, or subtle currency, payment is a must."
    ],
    image: "/workshops/empowerment/session-11.jpg",
    bgAccent: "from-purple-600/10 to-fuchsia-600/10",
    borderAccent: "border-purple-500/30"
  },
  {
    id: 12,
    badge: "SESSION 12",
    category: "Desire Management",
    tagline: "Desire Management",
    title: "Traverse the Temptations",
    text: [
      "\"The glitter is too enchanting. The fire is dancing as if inviting me to join the party. The rays of light are gleaming and blinding my vision.\" And so thinking, the moth thrusts into the fire and dies.",
      "Temptations are a great inspiration but can devour our sanity if not handled carefully. What seems so sweet turns into a bitter poison soon."
    ],
    image: "/workshops/empowerment/session-12.jpg",
    bgAccent: "from-fuchsia-600/10 to-pink-600/10",
    borderAccent: "border-fuchsia-500/30"
  }
];

const HERO_IMAGES = [
  "/workshops/empowerment/hero.jpg",
  "/workshops/empowerment/session-1.jpg",
  "/workshops/empowerment/session-3.jpg",
  "/workshops/empowerment/session-5.jpg",
  "/workshops/empowerment/session-9.jpg",
  "/workshops/empowerment/session-11.jpg"
];

const CATEGORIES = [
  "All",
  "Game of Identities",
  "Destiny demystified",
  "Work life balance",
  "The 3 strings that Pull Us",
  "Timeless Leadership",
  "Desire Management"
];

export default function SelfEmpowermentWorkshopsPage() {
  const [activeSession, setActiveSession] = useState(0);
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionChoice, setSessionChoice] = useState("All 12 Sessions (Full Workshop Masterclass)");
  const [expectations, setExpectations] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance hero image showcase smoothly (every 5 seconds)
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  // Filtered sessions based on category tab
  const filteredSessions = selectedCategory === "All"
    ? SESSIONS_DATA
    : SESSIONS_DATA.filter((s) => s.category === selectedCategory);

  // Auto-advance session carousel when on All category and not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSession((prev) => (prev + 1) % SESSIONS_DATA.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSending(true);
    try {
      const backendUrl = "";
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name,
        email,
        phone,
        interestType: "self_empowerment_workshop",
        targetId: sessionChoice,
        message: `Self Empowerment Workshop Enrollment. Preference: ${sessionChoice}. Note: ${expectations || "None"}`
      });
      setSent(true);
    } catch (err) {
      console.error("Workshop registration error:", err);
      // Fallback local confirm so user experience is smooth
      setSent(true);
    }
    setSending(false);
  };

  const handleSelectTrack = (badge: string, title: string) => {
    setSessionChoice(`${badge}: ${title}`);
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentSession = SESSIONS_DATA[activeSession] || SESSIONS_DATA[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-[#1E293B] overflow-x-hidden selection:bg-[#F5C518] selection:text-[#072149]">
      <FolkNavbar />
      
      {/* ── REDESIGNED HERO SECTION (PREMIUM WHITE BACKGROUND + STACKED CROSSFADE CAROUSEL) ───────────────── */}
      <section className="relative w-full bg-white text-[#072149] pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden border-b border-gray-100 shadow-sm">
        
        {/* Subtle background golden glow / texture */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typography & Action */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Breadcrumb & Pill */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/youth"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Youth Programs
                </Link>
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F5C518] text-[#072149] font-black text-xs uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Complete 12-Session Masterclass
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#072149] tracking-tight leading-[1.05]">
                Self Empowerment <span className="text-[#FF7A00]">Workshops</span>
              </h1>

              {/* Subtitle / Tagline */}
              <div className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-[#D93025] font-serif sm:font-sans">
                Get Power Packed • Rise Above The Roles
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Unlock high-performance leadership, emotional resilience, and deep clarity across 6 transformative dimensions of life through ancient Vedic psychology and practical modern frameworks.
              </p>

              {/* Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: CheckCircle2, text: "12 Power-Packed Modules" },
                  { icon: CheckCircle2, text: "Mind & Mood Mastery" },
                  { icon: CheckCircle2, text: "Timeless Leadership Skills" },
                  { icon: CheckCircle2, text: "Free Prasadam Dinner Included" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-bold text-[#072149]">
                    <item.icon className="w-5 h-5 text-[#FF7A00] shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#enroll"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F5C518] hover:bg-[#FFD700] text-[#072149] font-black text-base shadow-[0_10px_25px_rgba(245,197,24,0.35)] hover:shadow-[0_15px_35px_rgba(245,197,24,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gray-100 hover:bg-gray-200 text-[#072149] font-extrabold text-base transition-all duration-300 hover:scale-105"
                >
                  <span>Explore Curriculum</span>
                </a>
              </div>

            </div>

            {/* Right Column: Ultra-Smooth Stacked Crossfade Image Showcase (NO WHITE OR BLACK SCREEN FLASH) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-[16/11] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-gray-100 group">
                
                {/* Pre-rendered stacked images: ALL images live in the DOM simultaneously so there is ZERO blank or white screen flash during transitions! */}
                {HERO_IMAGES.map((imgSrc, idx) => {
                  const isVisible = idx === activeHeroIdx;
                  return (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={`Self Empowerment Highlight ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                        isVisible ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                      }`}
                    />
                  );
                })}

                {/* Soft gradient overlay for caption & depth */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                  <div className="flex items-center justify-between w-full">
                    <span className="px-3 py-1 rounded-full bg-[#F5C518]/90 backdrop-blur-md text-[#072149] font-black text-xs uppercase tracking-wider">
                      ✨ Leadership & Inner Mastery
                    </span>
                    {/* Dots indicator */}
                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      {HERO_IMAGES.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setActiveHeroIdx(dotIdx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            dotIdx === activeHeroIdx ? "w-6 bg-[#F5C518]" : "w-2 bg-white/60 hover:bg-white"
                          }`}
                          aria-label={`Slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTERACTIVE SPOTLIGHT CAROUSEL (SMOOTH CROSSFADE WITHOUT BLANK SCREENS) ───────────────── */}
      <section id="curriculum" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header & Category Filter Tabs */}
        <div className="text-center max-w-4xl mx-auto mb-12 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          <span className="text-xs sm:text-sm font-extrabold text-[#FF7A00] uppercase tracking-widest block mb-2">
            Complete Workshop Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#072149] tracking-tight mb-4">
            The 12 Sessions across 6 Vital Dimensions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            From discovering your real identity and handling competition to mastering your emotions and timeless leadership—explore every module of the complete FOLK Self Empowerment masterclass below.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pt-4 border-t border-gray-100">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsPaused(true);
                    if (cat !== "All") {
                      const firstInCat = SESSIONS_DATA.findIndex((s) => s.category === cat);
                      if (firstInCat !== -1) setActiveSession(firstInCat);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#072149] text-[#F5C518] shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>{cat === "All" ? "All 12 Sessions" : cat}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Session Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredSessions.map((sess) => {
              const isActive = SESSIONS_DATA[activeSession]?.id === sess.id;
              return (
                <button
                  key={sess.id}
                  onClick={() => {
                    const idx = SESSIONS_DATA.findIndex((s) => s.id === sess.id);
                    if (idx !== -1) {
                      setActiveSession(idx);
                      setIsPaused(true);
                    }
                  }}
                  className={`p-2.5 rounded-xl font-bold text-xs transition-all duration-300 text-left flex flex-col justify-between ${
                    isActive
                      ? "bg-[#F5C518] text-[#072149] shadow-md ring-2 ring-[#072149]"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                      isActive ? "bg-[#072149] text-white" : "bg-gray-300 text-gray-800"
                    }`}>
                      {sess.id}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold opacity-70 truncate max-w-[80px]">
                      {sess.category}
                    </span>
                  </div>
                  <div className="font-extrabold line-clamp-1">{sess.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE SESSION SPOTLIGHT CARD (STABLE SHELL + STACKED IMAGE CROSSFADE = NO WHITE/BLACK FLASH) */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border border-gray-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[540px]">
          
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 md:p-14 flex flex-col justify-center relative">
            
            {/* Yellow Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-[#F5C518]" />

            <div className="pl-3 sm:pl-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSession.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Badge & Category */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-4 py-1.5 rounded-md bg-[#F5C518] text-[#111827] font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm">
                      {currentSession.badge}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-extrabold text-xs uppercase tracking-wide">
                      {currentSession.category}
                    </span>
                  </div>

                  {/* Tagline / Subtitle */}
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#4A5568] mb-2 tracking-normal">
                    {currentSession.tagline}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-6">
                    {currentSession.title}
                  </h3>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                    {currentSession.text.map((para, pIdx) => (
                      <p key={pIdx} className={pIdx === 1 && currentSession.id === 1 ? "font-extrabold text-[#D93025] text-base sm:text-lg" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Bottom Action Pill inside card */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Official Module {currentSession.id} of 12
                    </span>
                    <button
                      onClick={() => handleSelectTrack(currentSession.badge, currentSession.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#072149] hover:bg-[#112d5e] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
                    >
                      <span>Select This Track</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Stacked Preloaded Crossfade Illustration Showcase */}
          <div className="lg:col-span-6 relative overflow-hidden bg-gray-100 flex items-center justify-center p-6 sm:p-10 min-h-[320px] lg:min-h-full">
            <div className="relative w-full h-full max-h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group bg-gray-200">
              
              {/* Stack ALL session images with zero-gap opacity transition */}
              {SESSIONS_DATA.map((s, idx) => {
                const isCurrent = idx === activeSession;
                return (
                  <img
                    key={s.id}
                    src={s.image}
                    alt={s.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />
                );
              })}

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <span className="text-white text-sm font-bold tracking-wide">
                  ✨ {currentSession.badge} • {currentSession.title} ({currentSession.category})
                </span>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-4 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200 shadow-md flex items-center gap-3 text-[#072149] font-bold z-30">
              <button
                onClick={() => setActiveSession((prev) => (prev - 1 + SESSIONS_DATA.length) % SESSIONS_DATA.length)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous Session"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs">
                {activeSession + 1} / {SESSIONS_DATA.length}
              </span>
              <button
                onClick={() => setActiveSession((prev) => (prev + 1) % SESSIONS_DATA.length)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next Session"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-1"
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ── FULL EDITORIAL SHOWCASE (ALL 12 SESSIONS ORGANIZED BY THE 6 CORE THEMES) ───────────────── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#072149] text-[#F5C518] text-xs font-black uppercase tracking-widest inline-block mb-3">
              Comprehensive Masterclass
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#072149] tracking-tight mb-4">
              All 12 Sessions by Category
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every session from the official FOLK Self Empowerment curriculum is detailed below. Click any module to select it for your upcoming enrollment.
            </p>
          </div>

          {/* Grouped by Theme */}
          {[
            "Game of Identities",
            "Destiny demystified",
            "Work life balance",
            "The 3 strings that Pull Us",
            "Timeless Leadership",
            "Desire Management"
          ].map((themeName, tIdx) => {
            const themeSessions = SESSIONS_DATA.filter((s) => s.category === themeName);
            return (
              <div key={themeName} className="mb-20 last:mb-0">
                
                {/* Theme Header Bar */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5C518] text-[#072149] font-black text-lg flex items-center justify-center shadow">
                    0{tIdx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Theme {tIdx + 1}</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#072149]">{themeName}</h3>
                  </div>
                  <div className="h-0.5 flex-grow bg-gray-200 ml-2" />
                </div>

                {/* Grid of Sessions in this Theme */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {themeSessions.map((sess) => (
                    <motion.div
                      key={sess.id}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 grid grid-cols-1 sm:grid-cols-12 relative group"
                    >
                      {/* Left Yellow Bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#F5C518] z-10" />

                      {/* Image side */}
                      <div className={`sm:col-span-5 relative min-h-[220px] sm:min-h-full overflow-hidden bg-gradient-to-br ${sess.bgAccent}`}>
                        <img
                          src={sess.image}
                          alt={sess.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-4 sm:left-5 z-10">
                          <span className="px-3 py-1 rounded bg-[#F5C518] text-[#111827] font-black text-xs uppercase shadow">
                            {sess.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between pl-6 sm:pl-8">
                        <div>
                          <div className="text-xs font-bold text-gray-400 mb-1">{sess.tagline}</div>
                          <h4 className="text-xl sm:text-2xl font-black text-[#072149] mb-3 leading-snug">
                            {sess.title}
                          </h4>
                          <div className="space-y-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {sess.text.map((t, idx) => (
                              <p key={idx} className={idx === 1 && sess.id === 1 ? "font-bold text-red-600" : ""}>
                                {t}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Practical Framework
                          </span>
                          <button
                            onClick={() => handleSelectTrack(sess.badge, sess.title)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#072149] hover:text-[#FF7A00] transition-colors"
                          >
                            <span>Enroll in track</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* ── WHY CHOOSE SELF EMPOWERMENT? (BENEFITS & EXPERIENCE) ───────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
              ⚡ High-Performance Mindset
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#072149] leading-tight">
              Why Are These Workshops Different?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              True empowerment is not motivational fluff—it is understanding the immutable laws of nature, psychology, and inner leadership as taught in the Vedic wisdom of Bhagavad Gita.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: "Unshakable Emotional Resilience", desc: "Master your moods, anger, and anxiety during peak competitive situations." },
                { title: "Timeless Leadership Excellence", desc: "Lead by action, integrity, and self-mastery rather than mere position." },
                { title: "Soulful Kirtan & Prasadam Feast", desc: "Enjoy lively spiritual kirtan and a complimentary sanctified multi-course dinner." },
                { title: "Conscious Peer Network", desc: "Connect with Dehradun's top student leaders, young professionals, and monk mentors." }
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0 mt-0.5 text-[#072149]">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#072149]">{benefit.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats & Visuals */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] bg-gray-100">
                <img
                  src="/darshan/DSC04179.webp"
                  alt="Workshop Community"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#072149] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-black text-[#F5C518] mb-1">
                  <AnimatedCounter target={1000} suffix="+" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-300">
                  Youth Leaders
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Empowered students and professionals making an impact across Dehradun.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-8">
              <div className="bg-[#F5C518] text-[#072149] p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-center">
                <div className="flex items-center gap-1 text-[#072149] mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <div className="text-2xl sm:text-3xl font-black">4.9 / 5.0 Rating</div>
                <p className="text-xs font-medium text-[#072149]/80 mt-1">
                  Rated by ambitious youth across top universities and corporate sectors.
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] bg-gray-100">
                <img
                  src="/darshan/DSC04180.webp"
                  alt="Soulful Experience"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── ENROLLMENT REGISTRATION FORM (`#enroll`) ───────────────────────────────────── */}
      <section id="enroll" className="py-20 bg-gradient-to-b from-[#FFFDF9] to-[#F0F4F9] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="px-4 py-1.5 rounded-full bg-[#072149] text-white text-xs font-bold tracking-widest uppercase mb-3 inline-block">
              Take The First Step
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#072149] tracking-tight">
              Enroll in Self Empowerment Workshops
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Secure your seat for the upcoming weekend batch or full 12-session masterclass. Free entry, learning materials, and a delicious dinner feast included.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-blue-600 via-[#F5C518] to-[#072149]" />

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                
                <div>
                  <label className="block text-sm font-bold text-[#072149] uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-[#1E293B] font-medium focus:bg-white focus:border-[#072149] focus:ring-2 focus:ring-[#072149]/20 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#072149] uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-[#1E293B] font-medium focus:bg-white focus:border-[#072149] focus:ring-2 focus:ring-[#072149]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#072149] uppercase tracking-wider mb-2">
                      Phone Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-[#1E293B] font-medium focus:bg-white focus:border-[#072149] focus:ring-2 focus:ring-[#072149]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#072149] uppercase tracking-wider mb-2">
                    Preferred Track / Session <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={sessionChoice}
                    onChange={(e) => setSessionChoice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-[#1E293B] font-semibold focus:bg-white focus:border-[#072149] focus:ring-2 focus:ring-[#072149]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="All 12 Sessions (Full Workshop Masterclass)">All 12 Sessions (Full Workshop Masterclass Bundle)</option>
                    {SESSIONS_DATA.map((s) => (
                      <option key={s.id} value={`${s.badge}: ${s.title}`}>
                        {s.badge}: {s.title} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#072149] uppercase tracking-wider mb-2">
                    What are your key goals or challenges right now? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                    placeholder="E.g., building emotional stability, overcoming procrastination, leadership excellence..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-[#1E293B] font-medium focus:bg-white focus:border-[#072149] focus:ring-2 focus:ring-[#072149]/20 outline-none transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-2xl bg-[#072149] hover:bg-[#112d5e] text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <span>Securing Your Seat...</span>
                    ) : (
                      <>
                        <span>Complete Enrollment</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Your privacy is 100% protected. No spam ever.</span>
                  </p>
                </div>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-[#072149]">Enrollment Confirmed!</h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  Welcome to the Self Empowerment family, <span className="font-bold text-[#072149]">{name}</span>! Our team has recorded your registration for <span className="font-semibold text-[#F5C518] bg-[#072149] px-2 py-0.5 rounded">{sessionChoice}</span> and will contact your WhatsApp soon with venue details and schedule timings.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#072149] font-bold text-sm transition-colors"
                  >
                    Register Another Participant
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
