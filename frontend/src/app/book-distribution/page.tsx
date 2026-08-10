"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

const SvgShare = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const SvgGradCap = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10l-10-5L2 10l10 5 10-5z" />
    <path d="M6 12v5c0 2 3 4 6 4s6-2 6-4v-5" />
    <line x1="22" y1="10" x2="22" y2="16" />
  </svg>
);

const SvgHandHeart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 14h2a2 2 0 100-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
    <path d="M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 00-2.75-2.91l-3.07 2.57" />
    <path d="M2 15l6 5.4" />
    <path d="M12.56 6.6A3 3 0 0017 4.56" />
    <path d="M18 3a3 3 0 00-4.44 3.6" />
  </svg>
);

const SvgSprout = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" />
    <path d="M12 20v-8" />
    <path d="M12 12c-3.5 0-7-2-7-7 4.5 0 7 2.5 7 7z" />
    <path d="M12 12c3.5 0 7-2 7-7-4.5 0-7 2.5-7 7z" />
  </svg>
);

const SvgArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const governanceBgStyle = { backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDgwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2NjYTc1Yicgc3Ryb2tlLXdpZHRoPScxLjUnIG9wYWNpdHk9JzAuMyc+CjxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2MCwgNjApIHNjYWxlKDEuNSknPgo8cGF0aCBkPSdNMjAgNUMyMCA1IDEwIDE1IDIwIDM1QzMwIDE1IDIwIDUgMjAgNVonLz4KPHBhdGggZD0nTTIwIDM1QzEwIDMwIDUgMjAgMTAgMTJDMTUgMTIgMTggMjUgMjAgMzVaJy8+CjxwYXRoIGQ9J00yMCAzNUMzMCAzMCAzNSAyMCAzMCAxMkMyNSAxMiAyMiAyNSAyMCAzNVonLz4KPC9nPgo8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NjAsIDI2MCkgc2NhbGUoMS41KSc+CjxsaW5lIHgxPSc1JyB5MT0nMzUnIHgyPSczNScgeTI9JzUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPgo8Y2lyY2xlIGN4PScxMicgY3k9JzI4JyByPScxJyBmaWxsPScjY2NhNzViJyBzdHJva2U9J25vbmUnLz4KPGNpcmNsZSBjeD0nMTcnIGN5PScyMycgcj0nMScgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJy8+CjxjaXJjbGUgY3g9JzIyJyBjeT0nMTgnIHI9JzEnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMzUgNSBRIDQwIC01IDQ1IDUgUSA0MCAxNSAzNSA1JyBzdHJva2Utd2lkdGg9JzEnLz4KPGNpcmNsZSBjeD0nNDAnIGN5PSc1JyByPScxLjUnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMTAgMzAgUSAxNSAzNSAxMCA0MCBNIDE1IDI1IFEgMjAgMzUgMTUgNDAnIHN0cm9rZS13aWR0aD0nMScvPgo8L2c+CjwvZz4KPHRleHQgeD0nNDAwJyB5PScxODAnIGZvbnQtZmFtaWx5PSdHZW9yZ2lhLCBzZXJpZicgZm9udC1zaXplPScyMCcgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBvcGFjaXR5PScwLjMnIGxldHRlci1zcGFjaW5nPScyJyBmb250LXN0eWxlPSdpdGFsaWMnPkhhcmUgS3Jpc2huYSBIYXJlIEtyaXNobmEsIEtyaXNobmEgS3Jpc2huYSBIYXJlIEhhcmU8L3RleHQ+Cjx0ZXh0IHg9JzQwMCcgeT0nMjEwJyBmb250LWZhbWlseT0nR2VvcmdpYSwgc2VyaWYnIGZvbnQtc2l6ZT0nMjAnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScgdGV4dC1hbmNob3I9J21pZGRsZScgb3BhY2l0eT0nMC4zJyBsZXR0ZXItc3BhY2luZz0nMicgZm9udC1zdHlsZT0naXRhbGljJz5IYXJlIFJhbWEgSGFyZSBSYW1hLCBSYW1hIFJhbWEgSGFyZSBIYXJlPC90ZXh0Pgo8L3N2Zz4=\")", backgroundRepeat: 'repeat', backgroundSize: '800px 400px' };

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function BookDistributionPage() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isBookOpen, setIsBookOpen] = React.useState(false);

  const initiatives = [
    {
      icon: <SvgGradCap className="w-5 h-5 text-amber-600" />,
      title: "Schools & Colleges",
      desc: "Interactive sessions, storytelling, and discussions help students apply Gita teachings in daily life.",
      image: "https://hkmdehradun.org/live-site/assets/uploads/gallery/BGBD4.webp",
      stats: "15,000+ Students",
      action: "Sponsor Books",
    },
    {
      icon: <SvgHandHeart className="w-5 h-5 text-amber-600" />,
      title: "Old Age Homes",
      desc: "Spiritual guidance offering comfort, purpose, and inner peace to senior citizens in our community.",
      image: "https://hkmdehradun.org/live-site/assets/uploads/gallery/BGBD7.webp",
      stats: "2,500+ Elders Served",
      action: "Sponsor Books",
    },
    {
      icon: <SvgSprout className="w-5 h-5 text-amber-600" />,
      title: "Villages & Rural Areas",
      desc: "Gita satsangs and free book distribution to rural families in need across mountain regions.",
      image: "https://hkmdehradun.org/live-site/assets/uploads/gallery/BGBD2.webp",
      stats: "100+ Villages Reached",
      action: "Sponsor Books",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f5] font-sans selection:bg-amber-100">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden py-8 md:py-12">
        {/* Background Video - Clear Sky */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            disablePictureInPicture 
            controls={false}
            preload="none" 
            className="w-full h-full object-cover pointer-events-none"
          >
            <source src="/214409.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf8f5]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 relative z-10 w-full pt-16 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <div className="order-2 lg:order-1 lg:col-span-5 text-center lg:text-left">
              <Reveal direction="up" delay={100}>
                <div className="inline-block px-5 py-2 rounded-full border border-amber-500/30 bg-white/40 backdrop-blur-md mb-6 shadow-sm">
                  <p className="text-[#072149] text-xs md:text-sm tracking-[0.2em] uppercase font-bold">
                    Share the Gyan, Spread the Light
                  </p>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#072149] mb-6 leading-[1.1] font-bold drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
                  Bhagavad Gita <br className="hidden md:block" />
                  <span className="font-instrument text-amber-600 font-medium">
                    Book Distribution
                  </span>
                </h1>
                
                <p className="text-[#072149] text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-medium drop-shadow-[0_1px_5px_rgba(255,255,255,0.8)]">
                  Help us bring the timeless wisdom of the Gita to schools, elderly homes, villages, and more. Plant the seeds of wisdom today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center gap-2 bg-[#072149] text-white px-8 py-4 rounded-full text-sm tracking-wider hover:bg-amber-600 hover:shadow-[0_10px_30px_rgba(217,119,6,0.3)] transition-all duration-300 font-bold"
                  >
                    Donate Now
                    <SvgArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Hero Image (hbk.png) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Reveal direction="left" delay={200} className="relative w-full">
                <div className="relative w-full max-w-lg mx-auto lg:max-w-full rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(7,33,73,0.15)] border border-white/50 group bg-white/10 backdrop-blur-sm p-4">
                  <img src="/hbk.webp" alt="Gita Daan - Bhagavad Gita Distribution" className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#072149]/10 to-transparent pointer-events-none rounded-[2rem]" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT GITA DISTRIBUTION ──────────────────── */}
      <section className="bg-[#faf8f5] relative py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-20 relative z-10 hidden md:block">
          <motion.div 
            className="relative w-full aspect-[2/1.3] flex items-center justify-center perspective-[2500px] cursor-pointer"
            onClick={() => setIsBookOpen(!isBookOpen)}
            initial={{ x: "-25%" }}
            animate={{ x: isBookOpen ? "0%" : "-25%" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* RIGHT PAGE (Static, underneath cover initially) */}
            <div className="absolute right-0 w-1/2 h-full bg-[#FFFBF2] p-8 md:p-14 rounded-r-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] border-y border-r border-[#072149]/10 z-0 flex flex-col justify-center">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/60 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed mb-8 font-normal">
                  The teachings of the Gita go beyond religion, addressing universal themes such as purpose, duty, self-realization, and liberation.
                </p>
                <p className="text-amber-700 text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-semibold">
                  Gita distribution is about planting seeds of wisdom that inspire positive change. Studies show improvements in mental well-being, academic focus, and social behavior.
                </p>
              </div>
              {/* Decorative Book Pages Edge (Right side) */}
              <div className="absolute right-0 top-4 bottom-4 w-1 bg-white/60 rounded-r-lg shadow-sm" />
              <div className="absolute right-1 top-3 bottom-3 w-1 bg-white/40 rounded-r-lg shadow-sm" />
            </div>

            {/* LEFT PAGE FLIPPING MECHANISM (Cover) */}
            <motion.div 
              className="absolute right-0 w-1/2 h-full origin-left z-10"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isBookOpen ? -180 : 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face: Book Cover */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#072149] rounded-r-2xl shadow-[10px_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden border border-white/10"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img 
                  src="/gita-cover.webp"
                  alt="Bhagavad Gita Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none" />
                <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-black/40 pointer-events-none" />
              </div>

              {/* Back Face: Inside Left Page */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#FFFBF2] p-8 md:p-14 rounded-l-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] border-y border-l border-[#072149]/10 flex flex-col justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#072149]/20 pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-[#072149] tracking-tight mb-4">
                    About Gita <span className="text-[#d4af37]">Distribution</span>
                  </h2>
                  <div className="w-16 h-[3px] bg-amber-500 mb-6 rounded-full" />
                  <p className="text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-normal">
                    The Bhagavad Gita is a 700-verse poem embedded within the Mahabharata. It presents a divine conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile View (Static Cards) */}
        <div className="md:hidden max-w-5xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs">TRANSFORMATION & WISDOM</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl text-[#072149] font-extrabold">About Gita <span className="text-[#d4af37]">Distribution</span></h2>
          </Reveal>
          
          <div className="flex flex-col gap-6">
            <div className="bg-[#FFFBF2] p-6 rounded-2xl shadow-sm border border-[#072149]/10">
              <p className="text-[#5c5245] text-[16px] leading-relaxed font-normal">
                The Bhagavad Gita is a 700-verse poem embedded within the Mahabharata. It presents a divine conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.
              </p>
            </div>
            <div className="bg-[#FFFBF2] p-6 rounded-2xl shadow-sm border border-[#072149]/10">
               <p className="text-[#5c5245] text-[16px] leading-relaxed mb-4 font-normal">
                  The teachings of the Gita go beyond religion, addressing universal themes such as purpose, duty, self-realization, and liberation.
                </p>
                <p className="text-amber-700 text-[16px] leading-relaxed font-semibold">
                  Gita distribution is about planting seeds of wisdom that inspire positive change. Studies show improvements in mental well-being, academic focus, and social behavior.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR INITIATIVES ─────────────────── */}
      <section className="bg-[#faf8f5] relative py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 relative z-10">
          <Reveal className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">OUR INITIATIVES</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-2">
              Where We <span className="text-[#d4af37]">Reach</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((item, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(7,33,73,0.1)] transition-all duration-500 flex flex-col h-full group">
                  
                  {/* Top Image Container with rounded corners */}
                  <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100 mb-5">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>

                  {/* Card Content */}
                  <div className="px-2 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Title & Verified Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#072149] tracking-tight">
                          {item.title}
                        </h3>
                        <img 
                          src="https://img.icons8.com/?size=100&id=poVlgAcqxww6&format=png&color=000000" 
                          alt="Verified Program" 
                          className="w-5 h-5 shrink-0 object-contain" 
                        />
                      </div>

                      {/* Description */}
                      <p className="text-[#5c5245] text-[15px] leading-relaxed mb-6 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Footer Row */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
                      <div className="flex items-center gap-2 text-[#072149] font-semibold text-xs sm:text-sm">
                        {item.icon}
                        <span>{item.stats}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-10 w-full max-w-3xl mx-auto">
            <div className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(7,33,73,0.12)] border border-[#072149]/10 bg-white/50 backdrop-blur-sm p-2 sm:p-4">
              <img 
                src="/Gita dan.webp" 
                alt="Gita Daan Outreach" 
                className="w-full h-auto max-h-[320px] sm:max-h-[380px] object-cover object-center rounded-xl sm:rounded-2xl shadow-sm" 
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GET INVOLVED ─────────────────────────────── */}
      <section className="bg-[#faf8f5] relative overflow-hidden py-8 md:py-12">
        {/* Background Decorative Rings */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#072149]/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#072149]/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#072149]/10 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 relative z-10">
          <Reveal className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">JOIN THE MISSION</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#072149] font-extrabold tracking-tight">
              Get <span className="text-[#d4af37]">Involved</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <SvgHeart className="w-6 h-6" />,
                title: "Donate",
                desc: "Support book printing, logistics, and outreach programs. Every contribution counts.",
                action: "Donate Now",
                link: "/donate",
              },
              {
                icon: <SvgUsers className="w-6 h-6" />,
                title: "Volunteer",
                desc: "Help distribute books, organize events, or share knowledge in your local community.",
                action: "Join Us",
                link: "/volunteer",
              },
              {
                icon: <SvgShare className="w-6 h-6" />,
                title: "Spread the Word",
                desc: "Share our mission on social media and inspire others to participate in this noble cause.",
                action: "Follow Us",
                link: "/#social",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className="bg-[#f0f9ff] border border-sky-200/80 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(7,33,73,0.06)] hover:shadow-[0_20px_40px_rgba(14,165,233,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full z-[1]">
                  
                  {/* macOS Style Window Tools Bar */}
                  <div className="flex items-center px-4 py-3 bg-[#e0f2fe] border-b border-sky-200/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff605c] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd44] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00ca4e] inline-block" />
                    </div>
                    <span className="ml-auto text-[11px] font-mono text-[#072149]/50 uppercase tracking-wider font-semibold">
                      {item.title}
                    </span>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-xl bg-[#072149] text-amber-400 flex items-center justify-center mb-5 shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl text-[#072149] mb-3 font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[#5c5245] text-[15px] sm:text-[16px] leading-relaxed mb-6 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <Link
                      href={item.link}
                      className="inline-flex items-center justify-between w-full bg-[#072149] hover:bg-amber-500 text-white hover:text-[#072149] px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm mt-auto group"
                    >
                      <span>{item.action}</span>
                      <SvgArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
