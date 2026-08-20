"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronLeft, ChevronRight, Pause, Play, BookOpen, Mic, Music, Utensils, Sparkles, User, Mail, Phone, Calendar, CheckCircle2, ShieldCheck, Volume2, VolumeX, Maximize2, BadgeCheck, UserSearch } from 'lucide-react';
import Link from 'next/link';
import axios from '@/lib/axios';
import FolkNavbar from '@/components/FolkNavbar';


const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ end, duration = 2.2, suffix = "", prefix = "", formatComma = false }: { end: number, duration?: number, suffix?: string, prefix?: string, formatComma?: boolean }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * end);
      setCount(currentVal);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  const displayVal = formatComma ? count.toLocaleString() : count.toString();

  return (
    <span ref={ref} className="inline-block">
      {prefix}{displayVal}{suffix}
    </span>
  );
};


const EMPOWERED_PROGRAMS = [
  {
    title: 'Spiritual Retreats',
    desc: 'Enter the Spiritual Domain. Discover the Mysteries of the Self.',
    img: '/empowered-1.png',
    bg: '#A68A00',
  },
  {
    title: 'Web Events',
    desc: 'Sit in your place and access Priceless wisdom.',
    img: '/empowered-2.png',
    bg: '#F6AD55',
  },
  {
    title: 'Clubs',
    desc: 'Explore your hidden Skills. Unleash your Talents.',
    img: '/empowered-3.png',
    bg: '#ED8936',
  },
  {
    title: 'Re-Life Workshops',
    desc: 'Discover a new way of living. Enrich your Lifestyle.',
    img: '/empowered-4.png',
    bg: '#ECC94B',
  },
  {
    title: 'Happiness Workshops',
    desc: 'Experience genuine joy, stress-free living, and inner fulfillment.',
    img: '/empowered-4.png',
    bg: '#ED8936',
    href: '/happiness-workshops',
  },
  {
    title: 'Self Empowerment Workshops',
    desc: 'Unleash your ultimate focus, resilience, and leadership potential.',
    img: '/empowered-1.png',
    bg: '#D69E2E',
    href: '/self-empowerment-workshops',
  },
  {
    title: 'Residency',
    desc: 'Reside with Like Minded and Progressive companions.',
    img: '/empowered-5.png',
    bg: '#F6AD55',
  },
  {
    title: 'Expeditions',
    desc: 'Enter the Divine Realms. Experience the Transcendence.',
    img: '/empowered-6.png',
    bg: '#A68A00',
  },
];

export default function YouthFOLKPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('Talk');
  const [workshopType, setWorkshopType] = useState('Happiness Workshops');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const globalMutedRef = React.useRef(true);
  const globalPlayingRef = React.useRef(true);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [currentIframeUrl, setCurrentIframeUrl] = useState('');

  const videos = [
    {
      url: 'https://player.vimeo.com/video/1219812601?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=1',
      title: 'FOLK Youth Festival & Kirtan Night',
      desc: 'Immerse in high-energy youth celebrations, uplifting kirtans, and transformative wisdom sessions with FOLK Dehradun.',
    },
    {
      url: 'https://player.vimeo.com/video/1219812678?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=1',
      title: 'FOLK Leadership & Residential Camp',
      desc: 'A peek into our life-changing residential retreats—mastering focus, character, and spiritual leadership.',
    },
    {
      url: 'https://player.vimeo.com/video/1219812681?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=1',
      title: 'Sacred Vrindavan Heritage Yatra',
      desc: 'Unforgettable spiritual expeditions with youth exploring ancient temples, wisdom satsangs, and sacred culture.',
    },
    {
      url: 'https://player.vimeo.com/video/1219812642?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=1',
      title: 'FOLK New Year Spiritual Celebration',
      desc: 'Welcoming the new year with soul-stirring kirtan, mantra meditation, and joyous spiritual fellowship.',
    },
    {
      url: 'https://player.vimeo.com/video/1219812614?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=1',
      title: 'Ecstatic Holi & Gaura Purnima Utsav',
      desc: 'Vibrant colors of devotion, ecstatic dancing, and blissful floral Holi celebrations with the youth community.',
    },
  ];

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  // Compute URL when index changes
  useEffect(() => {
    let url = videos[currentVideoIndex].url;
    // Remove loop, muted, and autoplay so we can control them dynamically
    url = url.replace('&loop=1', '').replace('&muted=1', '').replace('&muted=0', '').replace('&autoplay=1', '').replace('&autoplay=0', '');
    // Append the correct muted and autoplay state based on global refs
    url += `&muted=${globalMutedRef.current ? '1' : '0'}&autoplay=${globalPlayingRef.current ? '1' : '0'}`;
    setCurrentIframeUrl(url);
  }, [currentVideoIndex]);

  // Load Vimeo Script
  useEffect(() => {
    if (!(window as any).Vimeo) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Attach Vimeo Player Listeners
  useEffect(() => {
    if (!currentIframeUrl || !iframeRef.current) return;

    let player: any = null;
    let initInterval: any = null;

    const tryInitPlayer = () => {
      if ((window as any).Vimeo && (window as any).Vimeo.Player) {
        clearInterval(initInterval);
        try {
          player = new (window as any).Vimeo.Player(iframeRef.current);
          
          player.on('volumechange', (data: any) => {
            globalMutedRef.current = (data.volume === 0);
          });
          
          player.on('play', () => {
            globalPlayingRef.current = true;
          });

          player.on('pause', () => {
            globalPlayingRef.current = false;
          });

          player.on('ended', () => {
            globalPlayingRef.current = true; // Auto-moving means it should continue playing
            nextVideo();
          });
        } catch(e) {
          console.error("Vimeo Player init error", e);
        }
      }
    };

    initInterval = setInterval(tryInitPlayer, 500);
    tryInitPlayer();

    return () => {
      clearInterval(initInterval);
      if (player && player.off) {
        player.off('volumechange');
        player.off('play');
        player.off('pause');
        player.off('ended');
      }
    };
  }, [currentIframeUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSending(true);
    const finalTargetId = program === 'Workshop' ? `Workshop: ${workshopType}` : program;
    try {
      const backendUrl = "";
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name, email, phone,
        interestType: 'folk_registration',
        targetId: finalTargetId,
        message: `Interested in: ${finalTargetId}`,
      });
      setSent(true);
    } catch (err) {
      console.error('FOLK registration failed:', err);
    }
    setSending(false);
  };

  return (
    <div className="w-full">

      {/* ── CUSTOM FOLK NAVBAR (Liquid Glass Style with Round Edges on Scroll) ──────────────── */}
      <FolkNavbar />

      {/* ── FEATURED VIDEO HERO SHOWCASE ── */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-0 pb-8 md:pt-2 md:pb-12">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-black/90 shadow-[0_25px_60px_rgba(4,35,95,0.2)] border border-amber-500/20 group">
          {/* Autoplay Video Container with Uncropped Ratio */}
          <div className="relative w-full aspect-video flex items-center justify-center bg-black">
            {currentIframeUrl && (
              <iframe
                ref={iframeRef}
                key={currentVideoIndex}
                src={currentIframeUrl}
                frameBorder="0"
                allow="autoplay; picture-in-picture; clipboard-write; encrypted-media; web-share"
                className="w-full h-full"
                title={videos[currentVideoIndex].title}
              ></iframe>
            )}
          </div>

          {/* Overlay Floating Info Text */}
          <div className="absolute left-4 bottom-12 sm:left-6 sm:bottom-16 md:left-8 md:bottom-20 max-w-2xl p-4 sm:p-6 flex flex-col gap-4 pointer-events-none z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            <div className="w-full">
              <span className="text-xs uppercase font-bold tracking-widest text-[#f5c518] mb-1 block">
                Featured Video {currentVideoIndex + 1} of {videos.length}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {videos[currentVideoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-2 mb-4 leading-relaxed max-w-lg">
                {videos[currentVideoIndex].desc}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto pointer-events-auto">
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-white/10 hover:-translate-y-0.5 active:scale-95 shrink-0"
                >
                  <BadgeCheck className="w-5 h-5 text-emerald-400" /> Register Now
                </a>
                <a
                  href="#contact"
                  onClick={() => setProgram('LifeCoach')}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-white/10 hover:-translate-y-0.5 active:scale-95 shrink-0"
                >
                  <UserSearch className="w-4 h-4 text-[#f5c518]" /> Explore
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Arrows (Inside Video Container) */}
          <button
            onClick={prevVideo}
            aria-label="Previous Video"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#d99500] text-white backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all duration-300 shadow-xl group opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextVideo}
            aria-label="Next Video"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#d99500] text-white backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all duration-300 shadow-xl group opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>



        {/* Video Slider Indicators */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {videos.map((vid, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentVideoIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentVideoIndex === idx ? 'w-8 bg-[#d99500]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              title={vid.title}
            />
          ))}
        </div>
      </section>

      {/* ── ABOUT US (Redesigned Modern Editorial Showcase) ─────────────────────────────────────── */}
      <section id="about" className="bg-gradient-to-b from-white via-[#FAF8F5] to-white relative overflow-hidden py-8 md:py-12">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#04235f]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image Showcase (5 Cols) */}
            <Reveal className="lg:col-span-5">
              <div className="relative group mx-auto max-w-md lg:max-w-none">
                {/* Background decorative accent card */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#02144c]/10 via-[#d99500]/20 to-[#02144c]/10 rounded-[3rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                
                {/* Main Image Container */}
                <div className="relative rounded-[2.5rem] overflow-hidden bg-white p-3 border border-amber-200/60 shadow-[0_20px_50px_rgba(4,35,95,0.08)] group-hover:shadow-[0_25px_60px_rgba(4,35,95,0.15)] transition-all duration-500">
                  <div className="relative overflow-hidden rounded-[2rem]">
                    <img loading="lazy" src="/Add%20this%20pic%20in%20main%20page.png"
                      alt="FOLK Community"
                      className="w-full h-auto object-contain rounded-[2rem] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Content Column (7 Cols) */}
            <Reveal delay={0.2} className="lg:col-span-7">
              <div className="flex flex-col justify-center">
                
                {/* Tagline */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d99500] text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 w-fit">
                  <span>ABOUT FOLK DEHRADUN</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-5xl font-black text-[#04235f] tracking-tight leading-tight mb-6">
                  Transforming Youth Through <span className="text-[#d99500]">Timeless Wisdom</span>
                </h2>

                {/* Description */}
                <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed font-medium mb-5">
                  Welcome to <strong className="text-[#04235f]">FOLK Dehradun</strong>, the Youth Empowerment initiative of Hare Krishna Movement Dehradun. We are dedicated to fostering a deeper understanding of life&apos;s ultimate purpose and the art of joyful living through the practical teachings of the Shrimad Bhagavad Gita.
                </p>

                <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed font-medium">
                  Our interactive programs equip young professionals and students to navigate modern challenges effortlessly—offering proven techniques for mental focus, emotional poise, stress management, and true character building.
                </p>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER: REDESIGNED EDITORIAL ARCH-SHOWCASE (White Theme) ───────────── */}
      <section id="programs" className="w-full bg-white text-[#04235f] overflow-hidden relative py-8 md:py-12">
        {/* Subtle decorative background accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#EBF8FF]/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FEFCBF]/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (7 Cols): Editorial Wisdom & Typography on Clean White */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center px-5 py-1.5 rounded-full bg-[#f5c518]/25 border border-[#d99500]/40 text-[#8c6000] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-6 w-fit">
                WE HELP YOU
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-6">
                <span className="block text-[#04235f]">UNDERSTAND</span>
                <span className="block text-[#d99500] drop-shadow-sm">
                  YOUR SELF
                </span>
                <span className="block text-[#04235f]">BETTER</span>
              </h2>

              <p className="text-[#4A5568] text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mb-8">
                Any instrument is inoperable if the user does not know its mechanism. Have you ever wondered how little we are aware of our self? Did you even consider how optimally we are utilizing our capacity? We help you understand the hardware and the software that runs you and guide you achieve the desired objective out of it.
              </p>

              {/* Pillars list */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all">
                  <div className="text-[#d99500] font-black text-sm mb-1">01. Hardware</div>
                  <div className="text-[#334155] font-semibold text-xs">Mastering Senses & Mind</div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all">
                  <div className="text-[#d99500] font-black text-sm mb-1">02. Software</div>
                  <div className="text-[#334155] font-semibold text-xs">Intellect & Consciousness</div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all">
                  <div className="text-[#d99500] font-black text-sm mb-1">03. Objective</div>
                  <div className="text-[#334155] font-semibold text-xs">True Self-Realization</div>
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center h-12 w-[250px] rounded-full border-2 border-[#02144c] overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#02144c] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-left" />
                  <span className="relative z-10 inline-flex items-center gap-2 text-[#02144c] group-hover:text-white font-bold tracking-[0.18em] text-xs sm:text-sm uppercase transition-colors duration-300">
                    JOIN THE SESSION <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column (5 Cols): Arch Window Showcase (Matching Attached Arch Image) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] bg-gradient-to-b from-[#6ECDE2] via-[#74D1E6] to-[#5BBCD4] rounded-[40px] p-6 sm:p-8 flex items-center justify-center shadow-2xl border border-[#BCE1F1]">
                {/* Decorative Sunburst symbol top-right */}
                <div className="absolute top-5 right-5 text-white/90 pointer-events-none">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* ARCH FRAME */}
                <div className="w-full h-[440px] sm:h-[520px] rounded-t-[220px] sm:rounded-t-[240px] rounded-b-2xl overflow-hidden border-8 sm:border-[10px] border-white shadow-2xl relative group bg-black/10">
                  <img loading="lazy" src="https://media.licdn.com/dms/image/v2/C5612AQEfRkB6S8KRXQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520183426542?e=2147483647&v=beta&t=VjqtHGpqOvkLKptJfLB9nvQ5MqE6w0wUNx7to4cU04Q"
                    alt="FOLK Deities & Wisdom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GET EMPOWERED SECTION ────────────────────────── */}
      <section id="highlights" className="bg-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-[#333E4F] tracking-tight uppercase mb-3 sm:mb-4">
                GET EMPOWERED
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
                Learning is a lifelong process. But the right lessons can scale your personality to unprecedented levels. Get connected with our wide array of programs.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
            {EMPOWERED_PROGRAMS.map((item, i) => {
              const CardContent = (
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center text-center p-5 rounded-2xl transition-colors duration-300 hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2D8C5]/50 group cursor-pointer shadow-sm hover:shadow-lg h-full"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center mb-4 shadow-md group-hover:shadow-xl relative overflow-hidden bg-white"
                  >
                    {/* Animated glowing pulse aura ring widget */}
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-ping pointer-events-none"
                      style={{ backgroundColor: item.bg }}
                    />
                    <img loading="lazy" src={item.img}
                      alt={item.title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  </motion.div>
                  <h3 className="text-base sm:text-lg font-bold text-[#333E4F] mb-1.5 group-hover:text-[#04235f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-[260px]">
                    {item.desc}
                  </p>
                </motion.div>
              );

              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  {item.href ? (
                    <Link href={item.href} className="block h-full">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ──────────────────────────────────── */}
      <section id="mission" className="bg-[#faf8f5] py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Mission Content */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5c518]/10 border border-[#f5c518]/30 text-[#8c6000] text-xs font-bold tracking-[0.2em] uppercase w-fit">
                  OUR CORE MISSION
                </div>
              </Reveal>
              
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3">
                  <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#02144c] leading-tight tracking-tight">
                    Empowering Youth,<br />
                    <span className="text-[#d99500] bg-gradient-to-r from-[#d99500] to-[#b7791f] bg-clip-text text-transparent">Enlightening Minds.</span>
                  </h2>
                  <img loading="lazy" src="https://img.icons8.com/?size=100&id=poVlgAcqxww6&format=png&color=000000" alt="Verified" className="w-10 h-10 md:w-12 md:h-12 object-contain shrink-0 mt-1 drop-shadow-md hover:scale-110 transition-transform duration-300" />
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg sm:text-xl font-medium text-[#4A5568] leading-relaxed border-l-4 border-[#f5c518] pl-4">
                  At FOLK Dehradun, our mission is to empower youth with spiritual knowledge and practical wisdom. We believe that every young person deserves access to the transformative teachings that can help them lead a life of purpose, balance, and genuine happiness.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-base text-[#64748B] leading-relaxed">
                  Through engaging events, expert life coaching, rejuvenating retreats, and a caring community, we provide a holistic environment for personal and spiritual growth rooted in the ancient Vedic tradition.
                </p>
              </Reveal>

              {/* 2x2 Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  {
                    title: 'Mindfulness & Meditation',
                    desc: 'Overcome stress and anxiety through structured practice.',
                  },
                  {
                    title: 'Authentic Connection',
                    desc: 'Build meaningful, value-based relationships.',
                  },
                  {
                    title: 'Leadership Skills',
                    desc: 'Unlock team-building, confidence, and leadership.',
                  },
                  {
                    title: 'Higher Purpose',
                    desc: 'Find a deep, spiritual meaning and direction in life.',
                  },
                ].map((item, idx) => (
                  <Reveal key={idx} delay={0.4 + idx * 0.1}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="bg-white border border-[#E2D8C5]/30 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#f5c518]/40 transition-all duration-300 flex gap-3 h-full"
                    >
                      <div className="w-6 h-6 shrink-0 mt-0.5">
                        <img loading="lazy" src="https://img.icons8.com/?size=100&id=poVlgAcqxww6&format=png&color=000000" alt="Verified" className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#02144c] mb-0.5">{item.title}</h4>
                        <p className="text-xs text-[#64748B] leading-normal">{item.desc}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right Column: Layered Collage with Floating Badges */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              {/* Decorative background shape */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f5c518]/10 rounded-full blur-2xl -z-10 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#02144c]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5]">
                {/* Dotted Grid Decoration */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[radial-gradient(#d99500_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-35 -z-10" />

                {/* Main Image Frame (Editorial Arch Style) */}
                <Reveal delay={0.2} className="absolute inset-0 w-[85%] h-[85%] rounded-[30px] overflow-hidden shadow-2xl border-4 border-white z-10 hover:scale-[1.02] transition-transform duration-500">
                  <img loading="lazy" src="/darshan/DSC04180.webp"
                    alt="FOLK Dehradun Youth"
                    className="w-full h-full object-cover object-top"
                  />
                </Reveal>

                {/* Overlapping Secondary Image */}
                <Reveal delay={0.4} className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white z-20 hover:scale-[1.03] transition-transform duration-500">
                  <img loading="lazy" src="/darshan/DSC04178.webp"
                    alt="FOLK Interactive Sessions"
                    className="w-full h-full object-cover object-center"
                  />
                </Reveal>


              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ── THE BIG PICTURE (STATS BANNER - LIQUID GLASS & COUNT-UP) ───────────────── */}
      <section className="bg-white relative overflow-hidden py-8 md:py-12">
        {/* Subtle decorative background glow circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f5c518]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#02144c]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#02144c] tracking-widest uppercase mb-3">
              THE BIG PICTURE
            </h2>
            <p className="text-[#02144c]/85 text-xs sm:text-sm md:text-base font-semibold max-w-2xl mx-auto mb-14 leading-relaxed">
              Some stats. Although mathematical, behind each number is a person whose life has been made sweeter and meaningful by our team
            </p>
          </Reveal>

          {/* LIQUID GLASS BANNER CONTAINER */}
          <Reveal delay={0.2}>
            <div className="relative pt-12 sm:pt-16 pb-10 sm:pb-14 px-6 sm:px-10 rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-white/95 via-[#FAF8F5]/90 to-[#FDFBF7]/95 backdrop-blur-2xl border-2 border-[#E2D8C5]/60 shadow-[0_20px_50px_rgba(2,20,76,0.08),0_0_80px_rgba(245,197,24,0.15)] overflow-visible">
              
              {/* Little Krishna playing flute resting on the top-right corner of liquid glass banner with Divine Music Notes Animation */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-16 sm:-top-24 right-4 sm:right-10 w-28 sm:w-40 md:w-48 z-20 pointer-events-none drop-shadow-2xl select-none"
              >
                {/* Floating Golden Musical Notes emanating EXCLUSIVELY from the tip of Krishna's Flute */}
                <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
                  {/* Note 1: Golden Double Beamed Note originating right at the flute opening */}
                  <motion.div
                    animate={{
                      x: [0, -35, -75, -115],
                      y: [0, -15, -35, -60],
                      opacity: [0, 1, 0.9, 0],
                      scale: [0.5, 1.15, 1, 0.7],
                      rotate: [0, -15, 10, -25]
                    }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                    className="absolute left-[21%] top-[29%] text-[#d99500] drop-shadow-[0_2px_8px_rgba(217,149,0,0.6)]"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </motion.div>

                  {/* Note 2: Lucide Music Note originating right at the flute opening */}
                  <motion.div
                    animate={{
                      x: [0, -45, -90, -135],
                      y: [0, -10, -30, -55],
                      opacity: [0, 0.95, 0.8, 0],
                      scale: [0.5, 1.2, 0.9, 0.6],
                      rotate: [10, 25, -15, 10]
                    }}
                    transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    className="absolute left-[21%] top-[29%] text-[#ECC94B] drop-shadow-[0_2px_8px_rgba(236,201,75,0.6)]"
                  >
                    <Music className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
                  </motion.div>

                  {/* Note 3: Warm Amber Single Note originating right at the flute opening */}
                  <motion.div
                    animate={{
                      x: [0, -25, -60, -100],
                      y: [0, -25, -50, -80],
                      opacity: [0, 1, 0.85, 0],
                      scale: [0.6, 1.3, 1, 0.8],
                      rotate: [-10, 15, -20, 30]
                    }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2.3 }}
                    className="absolute left-[21%] top-[29%] text-[#D69E2E] drop-shadow-[0_2px_8px_rgba(214,158,46,0.6)]"
                  >
                    <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-current" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </motion.div>

                  {/* Note 4: Divine Sparkle originating right at the flute opening */}
                  <motion.div
                    animate={{
                      x: [0, -40, -85, -125],
                      y: [0, -10, -35, -65],
                      opacity: [0, 1, 0.7, 0],
                      scale: [0.4, 1.2, 0.8, 0.4],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 3.0 }}
                    className="absolute left-[21%] top-[29%] text-[#f5c518]"
                  >
                    </motion.div>
                </div>

                <img loading="lazy" src="/krishna-flute.png"
                  alt="Little Krishna Flute"
                  className="w-full h-auto object-contain animate-bounce-subtle relative z-10"
                />
              </motion.div>

              {/* Glossy top specular highlight for true liquid glass depth */}
              <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/80 to-transparent rounded-t-[36px] sm:rounded-t-[48px] pointer-events-none" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                {[
                  { num: 5808, label: 'WORKSHOPS' },
                  { num: 30, label: 'SPEAKERS' },
                  { num: 8, label: 'ONGOING EVENTS' },
                  { num: 270405, label: 'PARTICIPANTS' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center justify-center p-5 sm:p-7 rounded-3xl bg-white/60 hover:bg-white/95 border border-white shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default relative overflow-hidden"
                  >
                    {/* Subtle warm glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f5c518]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="text-3xl sm:text-4xl md:text-[48px] lg:text-[52px] font-black text-[#d99500] group-hover:text-[#02144c] leading-tight mb-2 tracking-tight transition-colors duration-300 relative z-10">
                      <AnimatedCounter end={stat.num} duration={2.5} formatComma={stat.num > 1000} />
                    </div>
                    <div className="text-[11px] sm:text-xs font-black text-[#02144c] tracking-widest uppercase relative z-10">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CLEAN STRUCTURED REGISTRATION FORM (JOIN FOLK DEHRADUN) ──────────────────────── */}
      <section id="contact" className="bg-[#f0f4f9] font-sans text-[#202124] relative py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Reveal>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Header Card */}
                <div className="bg-white rounded-xl border border-[#dadce0] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-2.5 bg-[#02144c]" />
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight pt-2">
                    Join FOLK Dehradun
                  </h2>
                  <p className="mt-2 text-[#70757a] text-sm sm:text-base leading-relaxed">
                    Step into a transformative community of conscious youth. Register for our upcoming sessions below.
                  </p>
                  
                  <hr className="border-t border-[#dadce0] my-5" />
                  
                  <div className="text-sm text-[#d93025] font-medium">
                    * Indicates required question
                  </div>
                </div>

                {/* Question Card 1: Full Name */}
                <div className="bg-white rounded-xl border border-[#dadce0] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 focus-within:border-[#02144c] focus-within:shadow-md">
                  <div className="text-base sm:text-lg font-medium text-[#202124] mb-4 flex items-center">
                    <span>Full Name</span>
                    <span className="text-[#d93025] ml-1 font-bold">*</span>
                  </div>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your answer"
                    required
                    className="w-full sm:w-3/4 border-b border-[#dadce0] focus:border-[#02144c] focus:border-b-2 py-2 text-base text-[#202124] bg-transparent outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Question Card 2: Email Address */}
                <div className="bg-white rounded-xl border border-[#dadce0] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 focus-within:border-[#02144c] focus-within:shadow-md">
                  <div className="text-base sm:text-lg font-medium text-[#202124] mb-4 flex items-center">
                    <span>Email Address</span>
                    <span className="text-[#d93025] ml-1 font-bold">*</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your answer"
                    required
                    className="w-full sm:w-3/4 border-b border-[#dadce0] focus:border-[#02144c] focus:border-b-2 py-2 text-base text-[#202124] bg-transparent outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Question Card 3: Phone Number */}
                <div className="bg-white rounded-xl border border-[#dadce0] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 focus-within:border-[#02144c] focus-within:shadow-md">
                  <div className="text-base sm:text-lg font-medium text-[#202124] mb-4 flex items-center">
                    <span>Phone Number</span>
                    <span className="text-[#d93025] ml-1 font-bold">*</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Your answer"
                    required
                    className="w-full sm:w-3/4 border-b border-[#dadce0] focus:border-[#02144c] focus:border-b-2 py-2 text-base text-[#202124] bg-transparent outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Question Card 4: Preferred Program Area (Interactive Radio Cards) */}
                <div className="bg-white rounded-xl border border-[#dadce0] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 focus-within:border-[#02144c] focus-within:shadow-md">
                  <div className="text-base sm:text-lg font-medium text-[#202124] mb-5 flex items-center">
                    <span>Preferred Program Area</span>
                    <span className="text-[#d93025] ml-1 font-bold">*</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'Talk', label: 'Flagship Youth Talks & Seminars' },
                      { id: 'Workshop', label: 'FOLK Workshops & Specialized Training' },
                      { id: 'LifeCoach', label: 'Get in Touch with a Life Coach Right Now' },
                      { id: 'Meditation', label: 'Mantra Meditation & Inner Peace' },
                      { id: 'Kirtan', label: 'Ecstatic Kirtan & Spiritual Music' },
                      { id: 'Prasadam', label: 'Divine Prasadam & Conscious Cooking' },
                      { id: 'All Programs', label: 'All FOLK Programs & Expeditions' }
                    ].map((opt) => {
                      const isSelected = program === opt.id;
                      return (
                        <div key={opt.id} className="flex flex-col">
                          <label
                            onClick={() => setProgram(opt.id)}
                            className={`flex items-center gap-4 p-3.5 rounded-lg cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#02144c]/[0.05] text-[#02144c] font-semibold'
                                : 'hover:bg-gray-50 text-[#202124]'
                            }`}
                          >
                            {/* Custom Radio Indicator */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                                isSelected ? 'border-[#02144c]' : 'border-[#5f6368]'
                              }`}
                            >
                              <div
                                className={`w-2.5 h-2.5 rounded-full bg-[#02144c] transition-transform duration-200 ${
                                  isSelected ? 'scale-100' : 'scale-0'
                                }`}
                              />
                            </div>
                            <span className="text-sm sm:text-base leading-snug">{opt.label}</span>
                          </label>

                          {/* Google-Forms Style Dropdown for Workshop Categories */}
                          {opt.id === 'Workshop' && isSelected && (
                            <div className="ml-9 mt-1.5 mb-2 p-3.5 bg-[#FAF8F5] border border-[#dadce0] rounded-lg shadow-inner">
                              <label className="block text-xs font-bold text-[#70757a] uppercase tracking-wider mb-2">
                                Select Workshop Category:
                              </label>
                              <select
                                value={workshopType}
                                onChange={(e) => setWorkshopType(e.target.value)}
                                className="w-full sm:w-96 p-3 rounded-md border border-[#dadce0] bg-white text-[#202124] font-medium text-base sm:text-[1.0625rem] focus:border-[#02144c] focus:ring-1 focus:ring-[#02144c] transition-all outline-none cursor-pointer shadow-sm"
                              >
                                <option value="Happiness Workshops">Happiness Workshops & Joyful Living</option>
                                <option value="Self Empowerment Workshops">Self Empowerment & Mind Mastery Workshops</option>
                              </select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit & Clear Buttons Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-8 py-3 rounded-md bg-[#02144c] hover:bg-[#173978] text-white font-medium text-sm tracking-wide shadow-sm hover:shadow transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {sending ? 'Submitting...' : 'Submit'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setPhone('');
                      setProgram('Talk');
                      setWorkshopType('Happiness Workshops');
                    }}
                    className="px-4 py-2 rounded text-[#02144c] font-medium text-sm hover:bg-[#02144c]/[0.06] transition-colors cursor-pointer"

                  >
                    Clear form
                  </button>
                </div>

              </form>
            ) : (
              /* Success Card */
              <div className="bg-white rounded-xl border border-[#dadce0] p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2.5 bg-[#1e8e3e]" />
                
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-[#1e8e3e] mx-auto mb-5 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#202124] mb-2">Join FOLK Dehradun</h3>
                <p className="text-[#70757a] text-base max-w-md mx-auto leading-relaxed mb-8">
                  Your response has been recorded. Our team will get in touch with you shortly regarding session schedules and venue updates.
                </p>
                
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2.5 rounded-md bg-[#02144c] hover:bg-[#173978] text-white font-medium text-sm transition-colors shadow-sm"
                >
                  Submit another response
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>


      {/* Lightbox Popups */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-[#04235f]/90 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-amber-500 p-2 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center shadow-2xl">
            {activeMedia.endsWith('.mp4') ? (
              <video src={activeMedia} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg" />
            ) : (
              <img loading="lazy" src={activeMedia} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
