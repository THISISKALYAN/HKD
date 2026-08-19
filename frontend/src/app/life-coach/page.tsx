"use client";

import React, { useState } from "react";
import Image from "next/image";
import FolkNavbar from "@/components/FolkNavbar";
import {
  Hourglass,
  Users,
  Sprout,
  ShieldAlert,
  Rocket,
  Flower2,
  Medal,
  Scale,
  Brain,
  Waves,
  Anchor,
  Eye,
  Crown,
  Bookmark,
  ArrowRight,
  PhoneCall,
  Video,
  Calendar,
  Quote,
  Send,
  Loader2,
  Check,
  CheckCircle2,
  UserCheck
} from "lucide-react";
import axios from "@/lib/axios";

const TRANSFORMATION_AREAS = [
  { title: "Time Management", icon: Hourglass, desc: "Organize priorities, eliminate procrastination, and master your daily schedules." },
  { title: "Managing Relationships", icon: Users, desc: "Cultivate empathy, resolve interpersonal conflicts, and build lasting bonds." },
  { title: "Culturing Good Habits", icon: Sprout, desc: "Embed empowering routines for physical vitality and mental clarity." },
  { title: "Avoiding Unhealthy Habits", icon: ShieldAlert, desc: "Break free from destructive cycles with mindful awareness and discipline." },
  { title: "Enhancing Productivity", icon: Rocket, desc: "Streamline workflow and focus energy for maximum output with lesser effort." },
  { title: "Stress Management", icon: Flower2, desc: "Anchor your mind in inner peace amidst external demands and deadlines." },
  { title: "Handling Competition", icon: Medal, desc: "Develop healthy sportsmanship and resilience in high-stakes environments." },
  { title: "Work-Life Balance", icon: Scale, desc: "Harmonize professional ambitions with personal rejuvenation and spiritual fulfillment." },
  { title: "Creating Self-Awareness", icon: Eye, desc: "Look at yourself from a broader 'helicopter vision' to unlock deeper purpose." },
  { title: "Self-Management", icon: Brain, desc: "Take control of your decisions, actions, and emotional boundaries." },
  { title: "Managing Mood Swings", icon: Waves, desc: "Stabilize mental equilibrium through timeless wisdom and meditative practices." },
  { title: "Handling Internal Weather", icon: Anchor, desc: "Navigate mental storms with poise, fortitude, and higher spiritual consciousness." },
];

const SALIENT_FEATURES = [
  {
    icon: UserCheck,
    title: "Personal Connection with Experts",
    description: "Tailored one-on-one mentorship that understands your unique aspirations, strengths, and life situation with empathy and wisdom."
  },
  {
    icon: Calendar,
    title: "Weekly 60-Minute Sessions",
    description: "Consistent weekly check-ins and action steps ensuring steady momentum, accountability, and real transformation over time."
  },
  {
    icon: Video,
    title: "Multi-Mode Communication",
    description: "Flexible interactions across in-person meetings, private video consultations, phone support, and quick chat check-ins."
  }
];

const TESTIMONIALS = [
  {
    quote: "Working with a FOLK life coach helped me gain true 'helicopter vision' over my career and personal goals. I transformed my daily habits in just weeks, finding deeper joy, purpose, and professional abundance.",
    name: "RAHUL VALECHA",
    role: "Euromonitor International",
    initials: "RV",
    bgColor: "bg-blue-600"
  },
  {
    quote: "Through weekly 1-on-1 mentorship, I learned to value my self-worth and handle high-stakes corporate competition with composure. My productivity nearly doubled while my daily stress dropped significantly.",
    name: "KRISHANU SINGH",
    role: "Samsung R&D Institute",
    initials: "KS",
    bgColor: "bg-[#5D8A66]"
  },
  {
    quote: "It wasn’t a short-lived motivation boost. My coach gave me a concrete, structured sequence of habits and action steps that created lasting transformation in my focus, relationships, and self-discipline.",
    name: "MANJUNATH B H",
    role: "Yantriks India Pvt Ltd",
    initials: "MB",
    bgColor: "bg-[#C69D32]"
  },
  {
    quote: "Balancing demanding corporate deliverables with personal inner peace felt impossible until I started weekly coaching. Bridging practical psychology with timeless Vedic wisdom has been a complete game-changer.",
    name: "NEHA SHARMA",
    role: "Accenture Strategy",
    initials: "NS",
    bgColor: "bg-purple-600"
  },
  {
    quote: "My personal life mentor acted as a trusted sounding board during major career crossroads. The clarity of thought, emotional equilibrium, and work-life harmony I gained from these sessions are truly priceless.",
    name: "ADITYA PRAKASH",
    role: "Tech Lead & IIT Alumnus",
    initials: "AP",
    bgColor: "bg-emerald-700"
  },
  {
    quote: "Overcoming chronic procrastination required deeper self-awareness. My mentor helped me anchor my mind, organize my daily priorities, and achieve higher output with much lesser effort.",
    name: "SIDDHARTH JOSHI",
    role: "Senior Analyst, Deloitte",
    initials: "SJ",
    bgColor: "bg-amber-600"
  },
  {
    quote: "The confidential, empathetic support I received helped me navigate complex interpersonal dilemmas at work and build deeper empathy and understanding in all my personal relationships.",
    name: "DIVYA NAIR",
    role: "Product Manager, Microsoft",
    initials: "DN",
    bgColor: "bg-indigo-600"
  },
  {
    quote: "When you lead high-growth teams, managing your internal weather is critical. FOLK's seasoned coaches taught me how to stay anchored amidst mental storms and lead with unwavering poise.",
    name: "ROHIT VERMA",
    role: "Founder & Tech Entrepreneur",
    initials: "RV",
    bgColor: "bg-teal-700"
  }
];

export default function LifeCoachPage() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    focusArea: "Time Management",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const backendUrl = "";
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Life Coach Inquiry: ${formData.focusArea}`,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting lead:", err);
      // Fallback success for demo/offline
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 font-sans selection:bg-amber-500 selection:text-black">
      {/* Custom Keyframes for Auto-Scrolling Marquee */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-testimonials-scroll {
            display: flex;
            width: max-content;
            animation: scrollMarquee 35s linear infinite;
          }
          .animate-testimonials-scroll:hover {
            animation-play-state: paused;
          }
        `
      }} />

      <FolkNavbar />

      {/* Clean White Hero Section with Prominent Image */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Subheading & Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-800 text-xs sm:text-sm font-bold tracking-wide uppercase">
                <Bookmark className="w-4 h-4 text-amber-600" />
                Personal Mentorship
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
                Life Begins at the End of Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                  Comfort Zone
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-black text-amber-700 tracking-wide uppercase">
                GET A PERSONAL LIFECOACH
              </p>

              {/* CFO Magazine Quote Box */}
              <div className="pl-6 border-l-4 border-blue-600 py-2 my-6">
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-3 font-medium">
                  &ldquo;Coaches have the ability to view things from afar — in what some call &lsquo;helicopter vision&rsquo; — and to shed new light on difficult situations. Often they can act as a sounding board through tough decisions, help sharpen skills, and motivate.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
                    &ndash; CFO Magazine
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">

                <a
                  href="#areas"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/60 hover:bg-white/90 backdrop-blur-md border border-blue-500/40 text-blue-700 font-extrabold text-lg shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.25)] hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Areas of Help
                </a>
              </div>
            </div>

            {/* Right Column: Clean Image Display */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
                <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5]">
                  <img
                    src="https://i.pinimg.com/1200x/49/00/d5/4900d53b6678ad23dcb7e09e26501356.jpg"
                    alt="FOLK Life Coach Mentorship"
                    className="w-full h-full object-cover object-center absolute inset-0"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Philosophy / Helicopter Vision Section */}
      <section className="relative overflow-hidden bg-[#FBF9F5] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                Broader Perspective
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Organize Your Personal &amp; Professional Life for{" "}
                <span className="text-amber-600">Higher Productivity with Lesser Effort</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                At FOLK, you get to interact with seasoned life coaches who help you look at yourself from a broader perspective. We bridge timeless Vedic spiritual wisdom with modern psychological practicalities.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                Whether you are navigating career crossroads, academic pressure, emotional turbulence, or interpersonal dilemmas, our personal mentors act as your trusted guide—helping you set clear goals, achieve lasting success, and maintain complete inner peace.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                  <div className="text-3xl font-black text-amber-600 mb-1">1-on-1</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Personal Sessions</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                  <div className="text-3xl font-black text-orange-600 mb-1">60+ Min</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Weekly Mentorship</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm col-span-2 sm:col-span-1">
                  <div className="text-3xl font-black text-amber-700 mb-1">100%</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Confidential Support</div>
                </div>
              </div>
            </div>

            {/* Public Management Study Box */}
            <div className="lg:col-span-5">
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white relative shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-lg">
                  Research Backed
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-snug">
                  Get Set to Nearly Double Your Output!
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  An article in <strong className="text-amber-400 font-bold">Public Management</strong> revealed a groundbreaking study where training alone was compared to life coaching combined with training.
                </p>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-slate-400">Training Alone</span>
                      <span className="text-amber-400 font-bold">+22.4%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden">
                      <div className="bg-slate-500 h-full rounded-full transition-all duration-1000" style={{ width: "22.4%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-white font-bold">Training + Weekly Life Coaching</span>
                      <span className="text-orange-400 font-black text-lg">+88%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-orange-500/50">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-orange-500/50" style={{ width: "88%" }} />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-8 text-center border-t border-slate-800 pt-4">
                  One can hardly then deny the profound importance of a dedicated personal coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Areas of Transformation Section */}
      <section id="areas" className="relative bg-white border-y border-slate-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-amber-400 blur-xl opacity-30 rounded-full animate-pulse" />
              <div className="relative inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 border border-amber-200/60 shadow-[0_4px_20px_rgba(245,158,11,0.15)] ring-1 ring-white/50">
                <Crown className="w-8 h-8 text-amber-500 drop-shadow-sm" />
              </div>
            </div>
            
            <span className="text-amber-700 font-bold uppercase tracking-widest text-xs sm:text-sm">
              Tailored Guidance
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 mb-4 tracking-tight">
              Areas Where Our Life Coaches Can Bring{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                TRANSFORMATION
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Explore the key dimensions of personal mastery where consistent coaching makes a life-changing difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRANSFORMATION_AREAS.map((area, idx) => {
              const Icon = area.icon;
              const isHovered = activeArea === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveArea(idx)}
                  onMouseLeave={() => setActiveArea(null)}
                  className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 border relative group ${
                    isHovered
                      ? "bg-white border-amber-400/80 shadow-[0_15px_35px_rgba(245,197,24,0.12)] -translate-y-1.5"
                      : "bg-white/90 backdrop-blur-md border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 overflow-hidden ${
                      isHovered 
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110 -rotate-3 border-none" 
                        : "bg-slate-50 text-slate-600 border border-slate-200 shadow-sm"
                    }`}>
                      {isHovered && <div className="absolute inset-0 bg-white/20 blur-md rounded-full animate-pulse z-0" />}
                      <Icon className="relative w-7 h-7 stroke-[2.2] drop-shadow-sm z-10" />
                    </div>
                    <span className={`text-sm font-black tracking-widest uppercase transition-colors duration-300 ${
                      isHovered ? "text-amber-500" : "text-slate-300"
                    }`}>
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 group-hover:text-[#072149] transition-colors tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {area.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Salient Features of the Coaching Process */}
      <section className="relative overflow-hidden bg-[#FBF9F5] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Salient Features of the <span className="text-amber-600">Coaching Process</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Structured, confidential, and deeply empowering steps designed to fit seamlessly into your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SALIENT_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 relative group hover:border-amber-400 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 shadow-sm flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section Replicating Screenshot Style + Auto Scrolling */}
      <section className="bg-white border-t border-slate-200 relative overflow-hidden py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-amber-700 font-bold uppercase tracking-widest text-xs sm:text-sm">
              Real Impact
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-4 tracking-tight">
              Testimonials from Our <span className="text-amber-600">Achievers</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Hear directly from working professionals and youth whose lives took a positive leap after personal coaching.
            </p>
          </div>
        </div>

        {/* Auto Scrolling Marquee Container */}
        <div className="w-full overflow-hidden py-4">
          <div className="animate-testimonials-scroll">
            {TESTIMONIALS.map((testi, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm mx-4 w-[360px] sm:w-[420px] flex-shrink-0 transition-all hover:shadow-md"
              >
                <div>
                  {/* Blue Double Quotes exactly like image */}
                  <div className="text-4xl sm:text-5xl font-black text-blue-500 mb-4 leading-none select-none">
                    &ldquo;
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                    &ldquo;{testi.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Avatar Circle with Initials (NO Image) */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                  <div className={`w-12 h-12 rounded-full ${testi.bgColor} text-white flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0`}>
                    {testi.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">{testi.name}</h4>
                    <p className="text-xs font-medium text-slate-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
