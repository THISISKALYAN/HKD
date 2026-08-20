"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimeReveal from "../../components/AnimeReveal";

/* ── social SVGs ─────────────────────────────────────────── */
const SvgX = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const SvgLinkedin = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const SvgStar = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
function SocialBtn({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <button className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}>
      {children}
    </button>
  );
}

/* ── PREMIUM MINIMALIST ICON SYSTEM (24x24, clean line-art) ── */

const PIcon = ({ children, className = "w-12 h-12" }: { children: React.ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const PIBookOpen = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </PIcon>
);

const PICompass = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </PIcon>
);

const PIBrain = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5C7 5 7.2 5.4 7.4 5.8A4.5 4.5 0 0 0 4 10c0 1.9 1.1 3.5 2.8 4.2A3 3 0 0 0 9 19h6a3 3 0 0 0 2.2-4.8A4.5 4.5 0 0 0 20 10a4.5 4.5 0 0 0-3.4-4.2A2.5 2.5 0 0 0 14.5 2 2.5 2.5 0 0 0 12 4.5a2.5 2.5 0 0 0-2.5-2.5Z"/>
    <path d="M12 4.5V19"/>
  </PIcon>
);

const PIMap = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </PIcon>
);

const PILotus = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z"/>
    <path d="M12 22s4-3 7-8a4 4 0 0 0-6-6"/>
    <path d="M12 22s-4-3-7-8a4 4 0 0 1 6-6"/>
  </PIcon>
);

const PIMentor = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </PIcon>
);

const PISpark = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/>
  </PIcon>
);

const PIPresentation = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2"/>
    <path d="M8 21h8"/>
    <path d="M12 17v4"/>
  </PIcon>
);

const PINotebook = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/>
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <path d="M16 2v20"/>
  </PIcon>
);

const PIYoga = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
    <path d="M12 17v-7L9 7"/>
    <path d="M12 17l-3 5"/>
    <path d="M12 17l3 5"/>
    <path d="M12 10l3-3"/>
  </PIcon>
);

const PIChat = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </PIcon>
);

const PIScroll = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" x2="8" y1="13" y2="13"/>
    <line x1="16" x2="8" y1="17" y2="17"/>
    <line x1="10" x2="8" y1="9" y2="9"/>
  </PIcon>
);

/* ── Animated counter widget ────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Interactive Accordion ─────────────────────────────────── */
function AccordionItem({ icon, label, desc, isOpen, onClick }: {
  icon: React.ReactNode; label: string; desc: string; isOpen: boolean; onClick: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-amber-300 bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-lg shadow-[0_8px_30px_rgba(251,191,36,0.15)]"
          : "border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/60 hover:border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="flex items-center gap-4 p-5">
        <div className={`w-10 h-10 shrink-0 transition-colors duration-300 ${
          isOpen ? "text-amber-600" : "text-[#072149]/70"
        }`}>
          {icon}
        </div>
        <p className={`flex-1 text-sm transition-colors duration-300 ${
          isOpen ? "text-[#072149]" : "text-[#072149]/90"
        }`} style={{ fontWeight: 600 }}>
          {label}
        </p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-lg transition-colors duration-300 ${isOpen ? "text-amber-500" : "text-[#072149]/30"}`}
        >
          &#9662;
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5 pl-[4.25rem]">
              <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── page ───────────────────────────────────────────────────── */
export default function GitaLifeCoursePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const curriculumTabs = [
    {
      Icon: PIBookOpen,
      title: "Gita Study",
      accent: "bg-amber-500",
      desc: "A deep, structured study of the Bhagavad-gita — exploring its verses, context, meaning, and philosophical depth. Each session builds progressively on the last, guiding you through the 18 chapters of divine wisdom.",
      highlights: ["Verse-by-verse analysis", "Historical context of Kurukshetra", "Sanskrit pronunciation", "Chapter summaries"],
    },
    {
      Icon: PICompass,
      title: "Vedic Ideology",
      accent: "bg-blue-500",
      desc: "Understanding the complete worldview of Vedic civilisation — from cosmology and the nature of the self to the purpose of human existence. Explore the philosophical foundations that underpin all Vedic texts.",
      highlights: ["Soul and Supersoul", "Karma and reincarnation", "Three modes of nature", "Vedic cosmology"],
    },
    {
      Icon: PIBrain,
      title: "Practical Spirituality",
      accent: "bg-emerald-500",
      desc: "Applying spiritual principles in daily life — at work, in relationships, and in personal growth. Learn to navigate modern challenges using the ancient frameworks of the Gita.",
      highlights: ["Stress management", "Ethical decision-making", "Work-life balance", "Emotional intelligence"],
    },
    {
      Icon: PIMap,
      title: "Educational Tours",
      accent: "bg-violet-500",
      desc: "Immersive visits to sacred sites, temples, and places of Vedic significance in Uttarakhand. Experience the living tradition of devotion and see how ancient wisdom manifests in the real world.",
      highlights: ["Temple visits", "Himalayan retreats", "Sacred river ceremonies", "Pilgrimage routes"],
    },
    {
      Icon: PILotus,
      title: "Mantra Meditation",
      accent: "bg-rose-500",
      desc: "Learn and practise the Hare Krishna Maha Mantra and other Vedic meditations for inner peace, mental clarity, and spiritual elevation. Develop a daily practice that stays with you for life.",
      highlights: ["Japa meditation technique", "Kirtan sessions", "Breath awareness", "Mantra science"],
    },
    {
      Icon: PIMentor,
      title: "Personal Mentoring",
      accent: "bg-orange-500",
      desc: "One-on-one guidance from full-time dedicated missionaries who live the teachings every day. Your mentor walks alongside you, answering questions and helping you integrate wisdom into your life.",
      highlights: ["Weekly check-ins", "Personalised guidance", "Doubt resolution", "Life coaching"],
    },
  ];

  const specialFeatures = [
    { Icon: PIPresentation, label: "PowerPoint Presentations", desc: "Visually rich, professionally designed slides that make complex Vedic concepts easy to understand, remember, and share with others." },
    { Icon: PINotebook, label: "Well-Organised Workbook", desc: "A comprehensive companion workbook designed for note-taking, personal reflection, journaling insights, and ongoing reference throughout the course." },
    { Icon: PIYoga, label: "Practical Training", desc: "Hands-on exercises, role-plays, and real-life activities that connect theory directly to your everyday situations, relationships, and decisions." },
    { Icon: PIMentor, label: "Personal Mentoring", desc: "Dedicated one-on-one guidance from full-time missionaries who are committed to your spiritual growth and personal transformation." },
    { Icon: PIChat, label: "Interactive Sessions", desc: "Open discussions, live Q&A forums, group debates, and peer-to-peer learning that deepen understanding and build a supportive community." },
    { Icon: PIScroll, label: "Sublime Course Material", desc: "Carefully curated content drawn from authentic Vedic scriptures and the writings of Srila Prabhupada, presented in a modern and accessible format." },
  ];

  if (!isMounted) return null;

  return (
    <div className="bg-white font-sans">

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-3">
            Gita Life <span className="text-[#d4af37]">Course</span>
          </h1>

          {/* Subheading */}
          <p className="text-[#5c5245] max-w-2xl text-[16px] sm:text-[18px] leading-relaxed font-medium mb-6">
            A systematic foundation course on Shrimad Bhagavad Gita to discover purpose, inner peace, and divine wisdom.
          </p>

          {/* Hero Banner Card */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#eae4d5]">
            <img 
              src="/gita hero.jpeg" 
              alt="Gita Life Course" 
              className="w-full h-auto block"
            />
          </div>

        </div>
      </section>
      <div className="relative w-full">
        {/* Mantra and Icon Watermark Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex flex-col justify-evenly opacity-[0.03] select-none" style={{ minHeight: '100%' }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 whitespace-nowrap -rotate-3 scale-110 translate-x-[-10%]">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center gap-6 text-4xl md:text-5xl font-serif text-[#072149] font-bold">
                  <PILotus className="w-10 h-10" />
                  <span>Hare Krishna Hare Krishna Krishna Krishna Hare Hare</span>
                  <span className="w-4 h-4 rounded-full bg-amber-500" />
                  <span>Hare Rama Hare Rama Rama Rama Hare Hare</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="relative z-10 w-full">




      {/* ══ ABOUT — redesigned narrative ═══════════════════ */}
      <section id="about" className="bg-[#FFFBF2]/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 relative overflow-hidden py-8 md:py-12">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 100% 0%, #fef3c7 0%, transparent 40%)" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center mb-10">
          <AnimeReveal direction="up" delay={80}>
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">ABOUT THE COURSE</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-4">
              From the Battlefield <span className="text-[#d4af37]">of Kurukshetra</span>
            </h2>
          </AnimeReveal>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimeReveal direction="up" delay={120}>
              <div className="space-y-6 text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed">
                <p>
                  One of India&apos;s greatest spiritual gifts to the world is the{" "}
                  <strong className="text-[#072149] font-semibold">Shrimad Bhagavad Gita</strong>. Spoken by{" "}
                  <strong className="text-[#072149] font-semibold">Lord Sri Krishna</strong>, it is a profound guide to leadership,
                  self-discovery, and purposeful living — revealed on the battlefield of Kurukshetra during a moment of
                  intense crisis faced by Arjuna.
                </p>
                <p>
                  More than 5,000 years ago, just before the great war began, Arjuna became overwhelmed with fear,
                  confusion, and sorrow. His body trembled, his mouth dried up, and he set aside his bow and arrows.
                </p>
                <p className="p-6 bg-white/60 rounded-2xl border border-amber-100 text-[#072149] shadow-sm">
                  In this moment of uncertainty, Arjuna raised profound questions about duty, life, morality,
                  and the purpose of existence. Lord Krishna spoke the eternal wisdom — illuminating the path
                  of knowledge, devotion, and righteous action.
                </p>
              </div>
            </AnimeReveal>

            <AnimeReveal direction="up" delay={160}>
              <div className="space-y-6 text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed">
                <p>
                  The Bhagavad Gita teaches not only the true purpose of human life but how to perform one&apos;s
                  responsibilities with sincerity, dedication, and spiritual consciousness. Lasting happiness does not
                  require changing one&apos;s circumstances — transformation begins by applying divine wisdom in daily life.
                </p>
                <p>
                  Whether you are a student, professional, entrepreneur, or homemaker, the principles of the Bhagavad
                  Gita can help you face life&apos;s challenges with wisdom and confidence.
                </p>
                
                <div className="bg-gradient-to-br from-[#072149] to-[#0a2d60] rounded-3xl p-8 relative overflow-hidden shadow-xl mt-8">
                  <div className="absolute top-4 right-6 text-white/10 text-8xl font-serif select-none leading-none">&ldquo;</div>
                  <div className="relative z-10">
                    <p className="text-white/95 text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed mb-6">
                      We are trying to give human society the opportunity for a life of happiness, good health,
                      peace of mind, and all good qualities through God consciousness.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 shrink-0">
                        <img src="/sp%20logo.webp" alt="Srila Prabhupada" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-amber-400 text-sm uppercase tracking-widest" style={{ fontWeight: 600 }}>Srila Prabhupada</p>
                        <p className="text-white/60 text-xs mt-1">Founder-Acharya, Hare Krishna Movement</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </AnimeReveal>
          </div>

          <AnimeReveal direction="up" delay={200}>
            <div className="mt-12 text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-[#072149] leading-relaxed mb-6" style={{ fontWeight: 500 }}>
                As a service to humanity, we present a systematic and practical{" "}
                <span className="text-amber-600 font-semibold">6-session foundation course on Bhagavad Gita</span>, 
                designed to share the essence of eternal Vedic wisdom.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {["Leadership", "Self-Discovery", "Dharma", "Decision Making", "Inner Peace", "Goal Clarity", "Purposeful Living"].map((tag) => (
                  <span key={tag} className="text-sm px-5 py-2.5 rounded-full border border-amber-200 bg-amber-50 text-[#072149] hover:bg-amber-100 transition-colors shadow-sm cursor-default" style={{ fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimeReveal>

        </div>
      </section>


      {/* ══ CURRICULUM — redesigned with image & text ════════════════════ */}
      <section id="modules" className="bg-white/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">

          <AnimeReveal direction="up" delay={80} className="mb-8 max-w-3xl">
            <div className="flex items-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">CURRICULUM</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-4">
              What You Will <span className="text-[#d4af37]">Learn</span>
            </h2>
            <p className="text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-normal">
              The vast knowledge of Vedic literature is condensed in Bhagavad-gita, known as the crown jewel of Vedic wisdom. The course unfolds the mystery of Gita practically and sublimely. It includes,
            </p>
          </AnimeReveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-4">
              {curriculumTabs.map((tab, i) => (
                <AnimeReveal key={i} direction="up" delay={100 + i * 50}>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex gap-5 items-start p-4 rounded-2xl hover:bg-white/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#072149]/5 flex items-center justify-center shrink-0 text-[#072149]">
                      <tab.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#072149] mb-2" style={{ fontWeight: 700 }}>{tab.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{tab.desc}</p>
                    </div>
                  </motion.div>
                </AnimeReveal>
              ))}
            </div>

            <AnimeReveal direction="left" delay={120}>
              <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(7,33,73,0.12)] border border-white/50 group bg-white/40 backdrop-blur-xl p-4 md:p-6 lg:sticky lg:top-24">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/20 to-blue-50/20 pointer-events-none" />
                <img 
                  src="/Vrn1.jpg" 
                  alt="Gita Life Course Curriculum Modules" 
                  className="w-full h-auto object-contain rounded-2xl shadow-sm transform group-hover:scale-[1.01] transition-transform duration-700 ease-out relative z-10" 
                />
              </div>
            </AnimeReveal>
          </div>

        </div>
      </section>

      {/* ══ SCROLLING BANNER ═══════════════════════════════════ */}
      <div className="bg-[#072149] text-[#5c5245] overflow-hidden py-4 border-y border-amber-500/30 relative z-10 flex items-center shadow-lg">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap gap-12 w-max"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-white">Hare Krishna Hare Rama</span>
              <PILotus className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-white">Gita Life Course</span>
              <PISpark className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-white">Transform Your Life</span>
              <PIBookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-white">Spiritual Journey</span>
              <PILotus className="w-5 h-5 text-amber-400" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ══ SPECIAL FEATURES — redesigned with image & text ═════════════════ */}
      <section className="bg-white/80 backdrop-blur-3xl px-5 sm:px-10 lg:px-20 relative overflow-hidden border-y border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] py-8 md:py-12">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #000000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400/30 blur-[80px] -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimeReveal direction="up" delay={80} className="mb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-[#d4af37] mb-2">
                <div className="h-px w-10 bg-current"></div>
                <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">WHAT YOU GET</span>
                <div className="h-px w-10 bg-current"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-4">
                Special <span className="text-[#d4af37]">Features</span>
              </h2>
              <p className="text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-normal">
                Every detail of the Gita Life Course is designed to make your learning immersive,
                practical, and deeply personal. Here&apos;s what comes with your enrollment.
              </p>
            </div>
          </AnimeReveal>

          <div className="flex flex-col gap-12 lg:gap-16 items-center">
            
            {/* Top Image (Larger) */}
            <AnimeReveal direction="up" delay={120} className="w-full max-w-5xl">
              <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(7,33,73,0.12)] border border-white/50 group bg-white/40 backdrop-blur-xl p-4 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/20 to-amber-50/20 pointer-events-none" />
                <img 
                  src="/vrn2.jpg" 
                  alt="Gita Life Course Special Features" 
                  className="w-full h-auto max-h-[400px] object-cover object-center rounded-2xl shadow-sm transform group-hover:scale-[1.01] transition-transform duration-700 ease-out relative z-10" 
                />
              </div>
            </AnimeReveal>

            {/* Bottom Cards (All 6) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {specialFeatures.map(({ Icon, label, desc }, i) => (
                <AnimeReveal key={i} direction="up" delay={100 + i * 50}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,93,183,0.08)] hover:border-white h-full transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B5DB7] mb-5 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg text-[#072149] mb-3" style={{ fontWeight: 700 }}>{label}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                </AnimeReveal>
              ))}
            </div>

          </div>

        </div>
      </section>






        </div>
      </div>
    </div>
  );
}
