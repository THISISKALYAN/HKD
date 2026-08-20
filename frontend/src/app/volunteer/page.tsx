"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";

/* ── Scroll-triggered reveal ──────────────────────────── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const sign = direction === "up" || direction === "left" ? 1 : -1;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [axis]: 32 * sign }}
      animate={inView ? { opacity: 1, [axis]: 0 } : {}}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Inline SVG icons ─────────────────────────────────── */
const SvgHeart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const SvgUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const SvgLeaf = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SvgSun = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const SvgCalendar = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SvgGlobe = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const SvgShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SvgCheck = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SvgX = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SvgArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("Temple Services & Maintenance");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg("Please fill out name, email, and phone.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    try {
      const backendUrl = "";
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name, email, phone,
        interestType: "volunteer_registration",
        targetId: areaOfInterest,
        message: msg,
      });
      setIsLoading(false);
      setSuccess(true);
      setShowPopup(true);
      setName(""); setEmail(""); setPhone(""); setMsg("");
    } catch (err) {
      console.error("Volunteer inquiry submission failed:", err);
      setErrorMsg("Failed to submit application. Try again.");
      setIsLoading(false);
    }
  };

  const serviceCategories = [
    {
      icon: <SvgSun className="w-6 h-6" />,
      title: "Daily",
      subtitle: "Services & Maintenance",
      rating: "5.0",
      badge: "High Impact",
      type: "In-Person",
      items: ["Administration", "Book distribution", "Maintenance", "Gardening", "Temple cleaning", "Goshala cleaning"],
    },
    {
      icon: <SvgCalendar className="w-6 h-6" />,
      title: "Occasional",
      subtitle: "Festivals & Events",
      rating: "4.9",
      badge: "Flexible",
      type: "In-Person",
      items: ["Festival sevas", "Japa counter sevas", "Crowd management", "Abhishekam", "Painting"],
    },
    {
      icon: <SvgGlobe className="w-6 h-6" />,
      title: "Online",
      subtitle: "Digital & Media Seva",
      rating: "4.8",
      badge: "Remote Seva",
      type: "Online",
      items: ["Video content", "Social media", "Graphic design", "Blog writing", "Marketing"],
    },
  ];

  return (
    <div className="bg-[#faf8f5] min-h-screen font-sans overflow-x-hidden relative">

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto relative z-10 py-8 md:py-12">
        
        {/* Decorative Tag & Page Heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-3 text-[#d4af37] mb-2">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">HARE KRISHNA MOVEMENT DEHRADUN</span>
            <div className="h-px w-10 bg-current"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-4">
            Volunteer <span className="text-[#d4af37]">With Us</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium max-w-3xl leading-relaxed">
            Offer your talents, and heart in the loving service of Sri Sri Krishna Balaram. Support the temple&apos;s spiritual and outreach activities by volunteering and become an instrument in Srila Prabhupada&apos;s mission. Come serve — and be spiritually transformed.
          </p>
        </div>

        {/* Volunteer Banner */}
        <div 
          className="relative overflow-hidden rounded-[24px] bg-[#072149] text-white shadow-2xl group flex flex-col justify-end items-center min-h-[320px] sm:min-h-[380px] p-6 sm:p-10"
        >
          {/* Clear Full Opacity Background Image */}
          <img loading="lazy" src="/Life in Harmony with Nature.jpg" 
            alt="Volunteer Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Soft Overlay */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Button Centered at Bottom End of Image */}
          <div className="relative z-10 w-full flex justify-center pb-2 sm:pb-4">
            <a href="#register-form">
              <button className="bg-[#F5C518] text-[#072149] px-9 py-4 rounded-full font-black text-[15px] sm:text-base tracking-wider uppercase hover:bg-white hover:text-[#072149] hover:shadow-[0_0_35px_rgba(245,197,24,0.6)] hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-white/40">
                BECOME A VOLUNTEER
              </button>
            </a>
          </div>
        </div>
      </section>

      <section id="register-form" className="bg-[#faf8f5] py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-8 lg:py-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── LEFT COLUMN (Info) ────────────────────── */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Intro Section */}
              <Reveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#072149] leading-tight mb-6 font-extrabold tracking-tight">
                  Offer your time, <span className="text-[#d4af37]">energy and love</span>
                </h2>
                <div className="space-y-6 text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#072149] font-semibold">To be a servant is our true identity, and to serve is our true essence.</strong> According to eternal Vedic philosophy, our deepest purpose and natural state of being is found in devotional service to the Supreme Divine. What better way to serve the divine Lordships of Sri Sri Narasimha Giridhari and the devotee community than to volunteer with us!
                  </p>
                  <p>
                    Nestled in the foothills of Uttarakhand, Hare Krishna Movement Dehradun stands as a vibrant spiritual sanctuary — an oasis of peace, devotion, and wisdom in an otherwise materially surcharged world. Our mission is dedicated to the spiritual and cultural upliftment of society through daily deity worship, mass sanctified prasadam distribution, educational courses, and festival celebrations.
                  </p>
                  <p>
                    Volunteering with us is not just an activity or a duty — it is a soul-transforming privilege. Whether you contribute a few hours a week or participate during major festival celebrations, your selfless service directly supports noble causes such as Gau Seva (Cow Protection), Annadaan (Food Distribution), Gita Daan (Wisdom Sharing), and community welfare.
                  </p>
                  <p>
                    Get on our volunteer team today, connect with like-minded souls, and discover the pure, unalloyed joy of serving selflessly for the pleasure of Lord Sri Krishna and humanity.
                  </p>
                </div>
                
                <div className="mt-8 bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-amber-100 relative overflow-hidden">
                  <div className="absolute -top-10 -left-6 text-[120px] text-amber-100/50 font-serif leading-none pointer-events-none">&ldquo;</div>
                  <div className="relative z-10">
                    <p className="text-xl md:text-2xl text-[#072149] leading-relaxed font-medium">
                      Devotional Service is not a job, it is a privilege.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-10 h-[1px] bg-amber-400"></div>
                      <p className="text-xs font-bold tracking-widest uppercase text-amber-600">
                        Srila Prabhupada
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* ── RIGHT COLUMN (Sticky Form) ────────────── */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-24">
                <Reveal delay={200}>
                  <div className="relative bg-white rounded-[32px] p-8 sm:p-10 border border-[#eae4d5] shadow-[0_20px_80px_rgba(7,33,73,0.08)]">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
                        <div className="h-px w-6 bg-current"></div>
                        <span className="uppercase tracking-[0.2em] font-bold text-xs">REGISTRATION</span>
                        <div className="h-px w-6 bg-current"></div>
                      </div>
                      <h2 className="text-2xl sm:text-3xl text-[#072149] font-extrabold tracking-tight mb-2">
                        Join Our Team
                      </h2>
                      <p className="text-[#5c5245] text-sm">
                        Fill out the form below and we will get in touch.
                      </p>
                    </div>

                    <form ref={formRef} onSubmit={handleRegister} className="space-y-4">
                      {errorMsg && (
                        <div className="bg-red-50 text-red-600 rounded-2xl p-4 text-sm border border-red-100 flex items-center gap-2 font-medium">
                          <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                          {errorMsg}
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#072149] mb-1.5 pl-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#072149] focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-gray-400 transition-all font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase text-[#072149] mb-1.5 pl-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#072149] focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-gray-400 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase text-[#072149] mb-1.5 pl-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#072149] focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-gray-400 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#072149] mb-1.5 pl-1">
                          Area of Interest
                        </label>
                        <select
                          value={areaOfInterest}
                          onChange={(e) => setAreaOfInterest(e.target.value)}
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#072149] focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 appearance-none cursor-pointer transition-all font-medium"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: "right 1rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.25em 1.25em",
                          }}
                        >
                          <option value="Daily Services">Daily Services</option>
                          <option value="Occasional Services">Occasional Services</option>
                          <option value="Online Services">Online Services</option>
                          <option value="Temple Services & Maintenance">Temple Services &amp; Maintenance</option>
                          <option value="Food Distribution (Annadaan)">Food Distribution (Annadaan)</option>
                          <option value="Cow Protection (Gau Seva)">Cow Protection (Gau Seva)</option>
                          <option value="Events & Festivals">Events &amp; Festivals Coordination</option>
                          <option value="IT & Media">IT, Social Media &amp; Design</option>
                          <option value="Other">Other Skills</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#072149] mb-1.5 pl-1">
                          Message (Optional)
                        </label>
                        <textarea
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                          placeholder="Tell us about your background, skills, and availability..."
                          rows={3}
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#072149] focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-gray-400 resize-none transition-all font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#072149] text-white py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-amber-500 hover:text-[#072149] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 shadow-sm"
                      >
                        {isLoading ? "Submitting..." : "Submit Application"}
                        {!isLoading && <SvgArrowRight className="w-4 h-4" />}
                      </button>

                      <div className="flex items-center justify-center gap-2 pt-2 text-gray-400">
                        <SvgShield className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Your information is secure</span>
                      </div>
                    </form>
                  </div>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY VOLUNTEER ──────────── */}
      <section className="bg-[#faf8f5] py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <Reveal className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">TRANSFORMATION & PURPOSE</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-2">
              Why <span className="text-[#d4af37]">Volunteer?</span>
            </h2>
          </Reveal>

          <div className="space-y-0 border-t border-[#072149]/10">
            {[
              {
                num: "01",
                title: "Spiritual Growth",
                desc: "Engage in Seva, the highest form of spiritual practice in Vedic culture. By offering your time and energy, you transform your inner consciousness and connect deeply with the divine.",
                accent: "text-amber-600",
              },
              {
                num: "02",
                title: "Community",
                desc: "Become part of a loving, supportive community of devotees. Build lifelong friendships rooted in shared values, purpose, and a genuine desire to uplift one another.",
                accent: "text-[#072149]",
              },
              {
                num: "03",
                title: "Make an Impact",
                desc: "Directly contribute to food distribution, cow protection, and powerful outreach programs. See the tangible difference your service makes in people's lives every single day.",
                accent: "text-emerald-600",
              },
              {
                num: "04",
                title: "Find Purpose",
                desc: "Step away from the material rush and discover true inner peace. In selfless dedication, you will find the kind of lasting fulfillment that no career or possession can ever provide.",
                accent: "text-indigo-600",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group grid md:grid-cols-12 gap-6 md:gap-12 items-start py-6 border-b border-[#072149]/10 hover:border-[#072149]/30 transition-colors duration-300 cursor-default">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className={`text-sm font-black tracking-widest uppercase ${item.accent}`}>{item.num}</span>
                  </div>
                  {/* Title */}
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#072149] tracking-tight leading-none group-hover:text-amber-600 transition-colors duration-300">{item.title}</h3>
                  </div>
                  {/* Description */}
                  <div className="md:col-span-6">
                    <p className="text-[#5c5245] text-[15px] sm:text-[16px] leading-relaxed font-normal">{item.desc}</p>
                  </div>
                  {/* Arrow */}
                  <div className="md:col-span-1 flex items-start justify-end">
                    <div className="w-9 h-9 rounded-full border border-[#072149]/20 flex items-center justify-center text-[#072149]/40 group-hover:border-[#072149] group-hover:text-[#072149] transition-all duration-300">
                      <SvgArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── AREAS OF SEVA (macOS Sky Blue Cards Style) ──────────── */}
      <section className="bg-[#faf8f5] py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">

          <Reveal className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">OPPORTUNITIES FOR SERVICE</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-2">
              Areas of <span className="text-[#d4af37]">Seva</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceCategories.map((cat, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#f8fafc] via-[#ecfeff]/50 to-[#cffaffe6] p-6 sm:p-7 border border-white/80 shadow-[0_15px_40px_rgba(6,182,212,0.12)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.22)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                  
                  <div>
                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold text-[#072149] tracking-tight mb-0.5">
                      {cat.title} <span className="text-[#d4af37]">Seva</span>
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-800 mb-5">
                      {cat.subtitle}
                    </p>

                    {/* Pill Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-white/90 backdrop-blur-md border border-white/90 text-[#072149] text-sm sm:text-[15px] rounded-full font-bold shadow-2xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <a
                    href="#register-form"
                    onClick={() => setAreaOfInterest(`${cat.title} ${cat.subtitle}`)}
                    className="w-full bg-white/90 hover:bg-[#072149] text-[#072149] hover:text-white font-bold py-3.5 px-6 rounded-full border border-white/80 shadow-sm transition-all text-sm flex items-center justify-center gap-2 group/btn mt-4"
                  >
                    <span>Apply for Seva</span>
                    <SvgArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>


      {/* ── SUCCESS POPUP ────────────────────────────── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md p-10 shadow-2xl text-center relative"
            >
              <button
                onClick={() => { setShowPopup(false); setSuccess(false); }}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <SvgX className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <SvgCheck className="w-8 h-8" />
              </div>

              <h3 className="text-2xl text-gray-900 mb-3 font-bold">
                Thank You!
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Your application has been received. We appreciate your desire to serve and will be in touch soon!
              </p>
              <button
                onClick={() => { setShowPopup(false); setSuccess(false); }}
                className="w-full bg-orange-500 text-white py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase hover:bg-orange-600 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
