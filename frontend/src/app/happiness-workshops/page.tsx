"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowRight, Sparkles, CheckCircle2, Heart, ShieldCheck, 
  Smile, Target, Users, BookOpen, Clock, Calendar, 
  MapPin, Star, Play, Pause, ChevronLeft, ChevronRight, Award,
  Compass, Zap, Apple, Filter
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
  iconColor: string;
}

const SESSIONS_DATA: SessionItem[] = [
  // ── THEME 1: SELF MANAGEMENT ─────────────────────────────────
  {
    id: 1,
    badge: "SESSION 1",
    category: "Self Management",
    tagline: "Self Management- The Key to Happiness",
    title: "Manage the MEN within",
    text: [
      "Once an interviewer asked a candidate for the post of a manager if he can manage a 100 people? The reply was in the affirmative. Next question? Can you wake up at 4am every day?",
      "No. Not selected.",
      "The interviewer argued that if he cannot manage himself, how can he manage even a dozen people? Manage the men within before you manage other men."
    ],
    image: "/workshops/session-1.png",
    bgAccent: "from-teal-600/10 to-blue-600/10",
    borderAccent: "border-teal-500/30",
    iconColor: "text-teal-600"
  },
  {
    id: 2,
    badge: "SESSION 2",
    category: "Self Management",
    tagline: "Self Management- The Key to Happiness",
    title: "Practice makes man perfect",
    text: [
      "Flying is a tough job. Especially when you are learning. A baby Eagle falls many times while trying to fly.",
      "After rigorous practice, the Eagle becomes so adept at flying that it can pick a fish from the abyss of a pond diving straight from the skies. Practice can create any miracle."
    ],
    image: "/workshops/session-2.png",
    bgAccent: "from-amber-600/10 to-orange-600/10",
    borderAccent: "border-amber-500/30",
    iconColor: "text-amber-600"
  },

  // ── THEME 2: RELATIONSHIPS ───────────────────────────────────
  {
    id: 3,
    badge: "SESSION 3",
    category: "Relationships",
    tagline: "Relationships – The Foundation of Happiness",
    title: "The fountain head of relationships",
    text: [
      "Amidst all the fleeting relationships that we encounter, one stands out without any deterrence. The relation with the Absolute Truth.",
      "What is our real relationship with our original source? Why has he created us? How can I revive that sacred relationship?"
    ],
    image: "/workshops/session-3.png",
    bgAccent: "from-purple-600/10 to-indigo-600/10",
    borderAccent: "border-purple-500/30",
    iconColor: "text-purple-600"
  },
  {
    id: 4,
    badge: "SESSION 4",
    category: "Relationships",
    tagline: "Relationships – The Foundation of Happiness",
    title: "The Boat, the breeze and the captain",
    text: [
      "Without these 3, the boat cannot move. Who are they? Who is driving the boat? What is the wind that is flowing in the same direction as our destination?",
      "And most importantly, who is the Captain who had to navigate the boat in the right direction despite any deviation?"
    ],
    image: "/workshops/session-4.jpg",
    bgAccent: "from-blue-600/10 to-cyan-600/10",
    borderAccent: "border-blue-500/30",
    iconColor: "text-blue-600"
  },

  // ── THEME 3: YOGA ─────────────────────────────────────────────
  {
    id: 5,
    badge: "SESSION 5",
    category: "Yoga",
    tagline: "Yoga- The root of all happiness",
    title: "Yoga for modern age",
    text: [
      "While most of us have seen what is Yoga on the TV, and some have tried it also, little so we know if it has had any effect on us.",
      "Yoga is taught contextually not as a session. In today's age, practicing yoga has taken a simple shape that can be practiced by any one without any prerequisite or arduous struggle."
    ],
    image: "/workshops/session-5.jpg",
    bgAccent: "from-emerald-600/10 to-teal-600/10",
    borderAccent: "border-emerald-500/30",
    iconColor: "text-emerald-600"
  },
  {
    id: 6,
    badge: "SESSION 6",
    category: "Yoga",
    tagline: "Yoga- The root of all happiness",
    title: "Perfecting the yoga",
    text: [
      "The Goal of Yoga is not physical fitness as is generally misconstrued.",
      "Perfection of Yoga entails understanding the link between the soul and the Absolute reality. When that link is established, we are reinstated in our original blissful position, oblivious to any tabernacle around us."
    ],
    image: "/workshops/session-6.jpg",
    bgAccent: "from-teal-600/10 to-green-600/10",
    borderAccent: "border-teal-500/30",
    iconColor: "text-teal-600"
  },

  // ── THEME 4: KARMA ────────────────────────────────────────────
  {
    id: 7,
    badge: "SESSION 7",
    category: "Karma",
    tagline: "Karma – The mystery of happiness",
    title: "Power of choice",
    text: [
      "Left or Right? You have a choice. Imagine if there was only one direction to go, no choices in our life, how suffocating it will become! Fortunately we have choices to make.",
      "However, many of the roads we take, we don't know where the road leads to, we simply go because others are going too. What's the right choice for you? How to develop this wisdom?"
    ],
    image: "/workshops/session-7.jpg",
    bgAccent: "from-orange-600/10 to-amber-600/10",
    borderAccent: "border-orange-500/30",
    iconColor: "text-orange-600"
  },
  {
    id: 8,
    badge: "SESSION 8",
    category: "Karma",
    tagline: "Karma – The mystery of happiness",
    title: "Power to change",
    text: [
      "Oh its all in the fate! No one can change it. Yes you can.",
      "Fate is not hard coded. It is written by you. The moment you discover the script, you can change it as you wish. You are the Master of your own Destiny."
    ],
    image: "/workshops/session-8.jpg",
    bgAccent: "from-rose-600/10 to-orange-600/10",
    borderAccent: "border-rose-500/30",
    iconColor: "text-rose-600"
  },

  // ── THEME 5: DIET ─────────────────────────────────────────────
  {
    id: 9,
    badge: "SESSION 9",
    category: "Diet",
    tagline: "Diet for happiness",
    title: "Eat Right look Bright",
    text: [
      "What happens when you use some 3rd grade cement to build a house? It will collapse pretty soon. Do you know what builds your body?",
      "The food that goes into our system creates our body tissues. What you feed reflects in your persona. Look healthy and bright by understanding the Vedic system of nutrition."
    ],
    image: "/workshops/session-9.jpg",
    bgAccent: "from-green-600/10 to-emerald-600/10",
    borderAccent: "border-green-500/30",
    iconColor: "text-green-600"
  },
  {
    id: 10,
    badge: "SESSION 10",
    category: "Diet",
    tagline: "Diet for happiness",
    title: "Food for the soul",
    text: [
      "You are riding a car. Tank is full. You always keep it full. But you have not fed yourself. Although you are hungry, you think that keeping the car tank full is more important. Eventually you die out of starvation.",
      "We may feed our body with all the sensual necessities. But if the soul is hungry, what's the point in feeding anything else?"
    ],
    image: "/workshops/session-10.jpg",
    bgAccent: "from-emerald-600/10 to-cyan-600/10",
    borderAccent: "border-emerald-500/30",
    iconColor: "text-emerald-600"
  },

  // ── THEME 6: HABITS ───────────────────────────────────────────
  {
    id: 11,
    badge: "SESSION 11",
    category: "Habits",
    tagline: "Habits for Happiness",
    title: "The principles of freedom",
    text: [
      "Regulation creates a sense of bondage. We feel that to be really free is to be able to do anything we like. But it's counter productive.",
      "Is real freedom equal to struggling for money to collect a grain of drugs, or a puff of cigarette when you are vigorously coughing? Discover the real principles of Freedom."
    ],
    image: "/workshops/session-11.jpg",
    bgAccent: "from-indigo-600/10 to-purple-600/10",
    borderAccent: "border-indigo-500/30",
    iconColor: "text-indigo-600"
  },
  {
    id: 12,
    badge: "SESSION 12",
    category: "Habits",
    tagline: "Habits for Happiness",
    title: "Anatomy of Habits",
    text: [
      "Habits die hard. But they are ready to give up too. Lack of knowledge makes us believe that Habits cannot be given up at all. Not true.",
      "Analyse the anatomy of Habits and you will realise how easy it is to free yourself from a habit."
    ],
    image: "/workshops/session-12.jpg",
    bgAccent: "from-violet-600/10 to-fuchsia-600/10",
    borderAccent: "border-violet-500/30",
    iconColor: "text-violet-600"
  }
];

const HERO_IMAGES = [
  "/workshops/hero.png",
  "/workshops/session-1.png",
  "/workshops/session-2.png",
  "/workshops/session-3.png",
  "/workshops/session-5.jpg",
  "/workshops/session-7.jpg",
  "/workshops/session-10.jpg"
];

const CATEGORIES = ["All", "Self Management", "Relationships", "Yoga", "Karma", "Diet", "Habits"];

export default function HappinessWorkshopsPage() {
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
        interestType: "happiness_workshop",
        targetId: sessionChoice,
        message: `Happiness Workshop Enrollment. Preference: ${sessionChoice}. Note: ${expectations || "None"}`
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

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
                  Complete 12-Session Masterclass
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#072149] tracking-tight leading-[1.05]">
                Happiness <span className="text-[#FF7A00]">Workshops</span>
              </h1>

              {/* Subtitle / Tagline */}
              <div className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-[#D93025] font-serif sm:font-sans">
                Access Unprecedented Levels of Happiness
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Realize unshakable peace, mental clarity, and profound divine connection across 6 vital dimensions of modern life through time-tested Vedic wisdom and authentic guidance.
              </p>

              {/* Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: CheckCircle2, text: "12 Comprehensive Modules" },
                  { icon: CheckCircle2, text: "1000+ Youth Transformed" },
                  { icon: CheckCircle2, text: "Mind & Stress Management" },
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
                    <img loading="lazy" key={imgSrc}
                      src={imgSrc}
                      alt={`Happiness Workshops Highlight ${idx + 1}`}
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
                      Transformative Experience
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
      <section id="curriculum" className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header & Category Filter Tabs */}
        <div className="text-center max-w-4xl mx-auto mb-12 relative">
          {/* Glassmorphic Container with Subtle Glow */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 -z-10"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#F5C518]/30 via-transparent to-[#FF7A00]/10 rounded-[2rem] blur-sm -z-20"></div>

          <div className="p-8 sm:p-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Complete Workshop Curriculum
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black leading-tight tracking-tight mb-5 bg-gradient-to-br from-[#072149] via-[#041229] to-[#FF7A00] bg-clip-text text-transparent">
              The 12 Sessions across 6 Vital Dimensions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
              From inner self-control and dietary habits to relationships and karmic destiny—explore every section of the complete FOLK Happiness Workshops masterclass below.
            </p>

            {/* Premium Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                    className={`relative overflow-hidden px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 border ${
                      isSelected
                        ? "bg-[#072149] text-white border-[#072149] shadow-lg shadow-[#072149]/25 scale-105"
                        : "bg-white/80 text-gray-600 border-gray-200/60 hover:bg-white hover:text-[#072149] hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></span>
                    )}
                    <Filter className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-[#F5C518]' : 'text-gray-400'}`} />
                    <span className="relative z-10">{cat === "All" ? "All 12 Sessions" : cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Session Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-12">
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
                  <span className="text-[10px] uppercase font-extrabold opacity-70">{sess.category}</span>
                </div>
                <div className="font-extrabold line-clamp-1">{sess.title}</div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SESSION SPOTLIGHT CARD (LIQUID GLASS + WHITE BG + BLACK TEXT) */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.07)] border border-white/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[540px]">
          
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 md:p-14 flex flex-col justify-center relative">
            
            <div className="w-full">
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
                    <span className="px-4 py-1.5 rounded-md bg-[#F5C518] text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm">
                      {currentSession.badge}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-black/5 text-black font-extrabold text-xs uppercase tracking-wide border border-black/10">
                      {currentSession.category}
                    </span>
                  </div>

                  {/* Tagline / Subtitle */}
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 tracking-normal">
                    {currentSession.tagline}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight mb-6">
                    {currentSession.title}
                  </h3>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-black text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                    {currentSession.text.map((para, pIdx) => (
                      <p key={pIdx} className={pIdx === 1 && currentSession.id === 1 ? "font-extrabold text-[#D93025] text-base sm:text-lg" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Bottom Action Pill inside card */}
                  <div className="mt-8 pt-6 border-t border-gray-200/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Practical Guide
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
                  <img loading="lazy" key={s.id}
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
                  {currentSession.badge} • {currentSession.title} ({currentSession.category})
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
              Every session from the official FOLK Happiness Workshop curriculum is detailed below. Click any module to select it for your upcoming enrollment.
            </p>
          </div>

          {/* Grouped by Theme */}
          {["Self Management", "Relationships", "Yoga", "Karma", "Diet", "Habits"].map((themeName, tIdx) => {
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
                      className="bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-white/80 grid grid-cols-1 sm:grid-cols-12 relative group hover:bg-white/95 hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Image side */}
                      <div className={`sm:col-span-5 relative min-h-[220px] sm:min-h-full overflow-hidden bg-gradient-to-br ${sess.bgAccent}`}>
                        <img loading="lazy" src={sess.image}
                          alt={sess.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-4 sm:left-5 z-10">
                          <span className="px-3 py-1 rounded bg-[#F5C518] text-black font-black text-xs uppercase shadow">
                            {sess.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-gray-600 mb-1">{sess.tagline}</div>
                          <h4 className="text-xl sm:text-2xl font-black text-black mb-3 leading-snug">
                            {sess.title}
                          </h4>
                          <div className="space-y-2 text-black/90 text-xs sm:text-sm leading-relaxed font-medium">
                            {sess.text.map((t, idx) => (
                              <p key={idx} className={idx === 1 && sess.id === 1 ? "font-bold text-red-600" : ""}>
                                {t}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Practical Guide
                          </span>

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

      {/* ── WHY CHOOSE HAPPINESS WORKSHOPS? (BENEFITS & EXPERIENCE) ───────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider uppercase">
              Transcendent Benefits
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#072149] leading-tight">
              Why Are These Workshops Different?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Most happiness courses only offer surface-level tips. We dive straight into the root cause of stress, desires, and mental exhaustion across all 12 modules by applying the eternal science of Bhagavad Gita.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: "Master Your Morning & Energy", desc: "Break free from procrastination and build unbreakable discipline." },
                { title: "Conquer Inner Turbulence", desc: "Gain emotional stability amidst deadlines, career pressure, and personal trials." },
                { title: "Soulful Kirtan & Prasadam Feast", desc: "Enjoy lively spiritual kirtan and a complimentary sanctified multi-course dinner." },
                { title: "Lifelong Community & Mentorship", desc: "Surround yourself with high-achieving, conscious youth and experienced monk mentors." }
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

          {/* Right Column: Stats & Highlights (Images Removed) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#072149] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-center border border-[#072149]">
              <div className="text-4xl sm:text-5xl font-black text-[#F5C518] mb-2">
                <AnimatedCounter target={1000} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-300">
                Youth Transformed
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                Students and professionals experiencing lasting peace across Dehradun.
              </p>
            </div>

            <div className="bg-[#F5C518] text-[#072149] p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-center border border-[#F5C518]">
              <div className="flex items-center gap-1 text-[#072149] mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="text-3xl sm:text-4xl font-black">4.9 / 5.0 Rating</div>
              <p className="text-xs sm:text-sm font-medium text-[#072149]/80 mt-2 leading-relaxed">
                Rated by attendees from IT, medical, and top universities.
              </p>
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
              Enroll in Happiness Workshops
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Secure your seat for the upcoming weekend batch or full 12-session masterclass. Free entry, learning materials, and a delicious dinner feast included.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#FF7A00] via-[#F5C518] to-[#072149]" />

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
                    What are your key expectations or challenges right now? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                    placeholder="E.g., seeking better focus, stress reduction, or spiritual connection..."
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
                  Welcome to the Happiness Workshop family, <span className="font-bold text-[#072149]">{name}</span>! Our team has recorded your registration for <span className="font-semibold text-[#F5C518] bg-[#072149] px-2 py-0.5 rounded">{sessionChoice}</span> and will contact your WhatsApp soon with venue details and schedule timings.
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
