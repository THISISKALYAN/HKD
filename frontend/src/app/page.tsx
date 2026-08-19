"use client";

import React, { useEffect, useState, useRef } from 'react';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { useCms } from '@/components/CmsContext';

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import CoverflowGallery from '@/components/CoverflowGallery';
import FeatureCard from '@/components/FeatureCard';
import GuptVrindavanDhamSection from '@/components/GuptVrindavanDhamSection';
import ExploreTemple from '@/components/ExploreTemple';
import FolkYouthPrograms from '@/components/FolkYouthPrograms';
import UpcomingFestivals from '@/components/UpcomingFestivals';
import MusicWaves from '@/components/MusicWaves';
import FaqSection from '@/components/FaqSection';
import VolunteerBanner from '@/components/VolunteerBanner';



// Stable constant declared outside component to prevent re-creation on render

const heroSlides = [
  '/h1.webp',
  '/h2.webp',
  '/h3.webp'
];



const defaultBlogs = [

  {

    title: 'The Divine Life of Nanda Baba',

    slug: 'spiritual-significance-of-nanda-baba',

    excerpt: 'Uncover the deep Vedic scripts highlighting the pastimes of Nanda Baba, the beloved foster father of Lord Krishna in the sacred land of Vrindavan.',

    coverImage: '/nanda_baba_blog.webp',

    authorName: 'Swami Gopalananda',

    createdAt: '2026-05-26T12:00:00.000Z'

  },

  {

    title: 'Daily Annadana: Feeding Pilgrims in Vrindavan Dham',

    slug: 'daily-annadana-feeding-pilgrims-vrindavan',

    excerpt: 'Learn how offering hot khichdi prasadam to sadhus, children, and travelers brings immense purity to our lives.',

    coverImage: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800',

    authorName: 'Sri Radha Dasa',

    createdAt: '2026-05-26T12:00:00.000Z'

  }

];



export default function Home() {

  const { pageContent, fetchPageContent, isLoading, editMode } = useCms();

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);  // Fetch latest ashram blog posts for "Latest Updates"

  const heroImagesData = pageContent['home']?.heroImages;
  const currentHeroSlides = (heroImagesData && heroImagesData.length > 0) ? heroImagesData : heroSlides;

  useEffect(() => {
    fetchPageContent('home');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPageContent]);

  useEffect(() => {

    const fetchLatestBlogs = async () => {

      try {

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

        const response = await fetch(`${backendUrl}/api/cms/blogs`);

        if (response.ok) {

          const data = await response.json();

          setLatestBlogs(data.slice(0, 2));

        }

      } catch (err) {

        console.error('Error fetching latest updates:', err);

      }

    };

    fetchLatestBlogs();

  }, []);



  // 3D Tilt Effect Handler

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left; // x position within the element.

    const y = e.clientY - rect.top;  // y position within the element.



    const centerX = rect.width / 2;

    const centerY = rect.height / 2;



    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg

    const rotateY = ((x - centerX) / centerX) * 10;



    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

  };



  const handleMouseLeave = () => {

    if (!cardRef.current) return;

    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

  };



  // 1. Initial CMS Fetch Effect

  useEffect(() => {

    fetchPageContent('home');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPageContent]);



  // 2. Dedicated Auto-scrolling slide interval effect

  useEffect(() => {

    const slideTimer = setInterval(() => {

      if (currentHeroSlides.length > 1) {
        setCurrentSlide((prev) => (prev + 1) % currentHeroSlides.length);
      }

    }, 5000);

    return () => clearInterval(slideTimer);

  }, [currentHeroSlides.length]);



  const prevSlide = () => {

    setCurrentSlide((prev) => (prev - 1 + currentHeroSlides.length) % currentHeroSlides.length);

  };



  const nextSlide = () => {

    setCurrentSlide((prev) => (prev + 1) % currentHeroSlides.length);

  };



  const getSlidePositionClass = (idx: number) => {

    if (idx === currentSlide) {

      return 'left-0 w-full scale-100 z-10 opacity-100';

    }

    return 'left-0 w-full scale-105 z-0 opacity-0 pointer-events-none';

  };







  return (

    <div className="relative overflow-hidden">

      {/* 1. HERO SLIDER SECTION (Vivanta-inspired 3-slide peeking layout) */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-[#0a0a0a] z-0 flex items-center">

        {/* Slides Container */}
        <div className="relative w-full h-full">
          {currentHeroSlides.map((slide: string, idx: number) => (
            <div
              key={idx}
              onClick={() => {
                if (idx !== currentSlide) {
                  setCurrentSlide(idx);
                }
              }}
              className={`absolute top-0 h-full w-full rounded transition-all duration-700 ease-out shadow-2xl overflow-hidden flex items-center justify-center ${getSlidePositionClass(idx)}`}
            >
              {/* Blurred Background to fill space */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-3xl pointer-events-none scale-110"
                style={{ backgroundImage: `url('${slide}')` }}
              />
              {/* Actual Image with Correct Aspect Ratio */}
              <img
                src={slide}
                alt="Deity"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
              />

              {/* Text Overlay for Hero (Removed) */}

              {/* Inset White Outline Border (Reference Image Match) */}
              <div className="absolute inset-4 sm:inset-6 border border-white/20 pointer-events-none z-30" />

              {/* Dark overlay gradient for beautiful text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10" />
            </div>
          ))}
        </div>

        {/* Liquid Glass Navigation Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white/75 hover:bg-white text-gray-800 hover:scale-110 shadow-lg active:scale-95 transition-all duration-300"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Liquid Glass Navigation Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white/75 hover:bg-white text-gray-800 hover:scale-110 shadow-lg active:scale-95 transition-all duration-300"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

      </section>

      {/* 1.5 MINIMALIST SCROLLING BANNER */}
      <div className="relative w-full py-3 bg-[#0a0a0a] border-b border-white/10 overflow-hidden z-30">
        {/* Styles moved to globals.css */}
        <div className="marquee-track-minimal select-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="marquee-item-minimal">
              <span className="text-white/80 text-sm md:text-base tracking-[0.25em] uppercase font-light">
                HARE KRISHNA HARE KRISHNA KRISHNA KRISHNA HARE HARE
              </span>
              <span className="text-[#d4af37] text-xl">♦</span>
              <span className="text-white/80 text-sm md:text-base tracking-[0.25em] uppercase font-light">
                HARE RAMA HARE RAMA RAMA RAMA HARE HARE
              </span>
              <span className="text-[#d4af37] text-xl">♦</span>
            </div>
          ))}
        </div>
      </div>



      {/* 2. ABOUT US SECTION (HKM Dehradun) */}

      <section id="about" className="relative w-full bg-[#fbf6f0] overflow-hidden text-gray-800 flex items-center justify-center py-8 md:py-12">

        {/* Subtle decorative background elements */}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/50 rounded-full blur-[100px] pointer-events-none" />



        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1200px] mx-auto">
            {/* Left: Circular Video Preview */}
            <div className="flex justify-center items-center order-2 lg:order-1 relative min-h-[320px] sm:min-h-[500px]">
              {/* MusicWaves WebGL Background */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-100px',
                  zIndex: 0,
                  background: 'transparent',
                  overflow: 'visible',
                }}
              >
                <MusicWaves />
              </div>

              {/* Main Circle */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden relative group cursor-pointer shadow-2xl"
                  style={{
                    border: "8px solid white",
                    boxShadow: "0 20px 50px -12px rgba(0,0,0,0.3)",
                  }}
                >
                  <video
                    src="/index page.mp4"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </motion.div>

              {/* Play Button */}
              <motion.div
                className="absolute z-20 bottom-[10%] sm:bottom-16 right-[15%] sm:right-[10%]"
              >
                <button className="cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                  <div className="w-[83px] h-[83px] bg-blue-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                    <div className="absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]" />
                    <label className="group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center">
                      <div className="w-8 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24">
                          <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                        </svg>
                      </div>
                    </label>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Right: The Matter */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[#d4af37] justify-center lg:justify-start">
                  <div className="h-px w-12 bg-current"></div>
                  <span className="uppercase tracking-[0.25em] font-medium text-xs sm:text-sm">About Us</span>
                  <div className="h-px w-12 bg-current lg:hidden"></div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-section-heading text-[#3b2b2f] font-medium leading-[1.1] drop-shadow-sm">
                  Hare Krishna Movement <br className="hidden lg:block" />
                  <span className="text-[#d4af37]">Dehradun</span>
                </h2>
              </div>

              <div className="space-y-6 text-[#4a4a4a] text-lg sm:text-xl leading-relaxed max-w-xl">
                <p>
                  We aspire to create a world-class and iconic spiritual centre for Sri Krishna in the picturesque valley of Dehradun in pursuance of Srila Prabhupada&apos;s direction.
                </p>
                <p>
                  Hare Krishna Movement Dehradun will place Krishna proudly on the minds of the people and Dehradun on the global spiritual map.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                src="/index page.mp4"
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <UpcomingFestivals isHomePage={true} />

      {/* 6. ONLINE DONATIONS SECTION */}
      <section className="relative w-full bg-[#faf8f5] overflow-hidden flex flex-col items-center py-8 md:py-12">
        <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-10 relative">
            <div className="flex items-center gap-3 text-[#d4af37] mb-3">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">CHARITABLE SEVAS</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight">
              Online <span className="text-[#d4af37]">Donation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 relative z-20">
            {[
              {
                title: "Gau Seva",
                image: "https://hkmdehradun.org/live-site/assets/12/gau-seva-banner.png",
                desc: "Support Hare Krishna Movement Dehradun's Gaushala and be a part of this noble mission. Your contribution helps provide daily cow care, feeding, and shelter.",
                link: "/gau-seva"
              },
              {
                title: "Annadana Seva",
                image: "/fh.webp",
                desc: "Support Hare Krishna Movement Dehradun's Annadana Seva by providing sanctified meals to devotees and the needy. Over 2.89 crore meals served.",
                link: "/annadana-seva"
              },
              {
                title: "Khichdi Prasadam Seva",
                image: "https://hkmdehradun.org/live-site/assets/12/khichdi-home.png",
                desc: "Every week, more than 10,000 visitors receive sacred khichdi prasadam at Hare Krishna Movement Dehradun. This seva ensures that no one goes hungry.",
                link: "/khichdi-prasadam-seva"
              },
              {
                title: "Ekadashi Seva",
                image: "https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png",
                desc: "Celebrate the holy day of Ekadashi by supporting divine sevas at Hare Krishna Mandir. Donations on this day carry special spiritual merit.",
                link: "/ekadashi-seva"
              }
            ].map((seva, index) => (
              <div key={index} className="bg-white rounded-[40px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl border border-gray-100 transition-shadow duration-300 flex flex-col h-full min-h-[440px] group font-sans">
                <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden mb-6 shrink-0 bg-[#f8f9fa]">
                  <img
                    src={seva.image}
                    alt={seva.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="px-4 flex flex-col flex-grow">
                  <h3 className="text-[28px] lg:text-[32px] font-bold text-[#18181b] tracking-tight mb-1 leading-tight">
                    {seva.title}
                  </h3>
                  <p className="text-[#a1a1aa] text-[15px] mb-6 flex-grow line-clamp-3">
                    {seva.desc}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto pb-2">
                    <Link
                      href={seva.link}
                      className="w-full flex items-center justify-center bg-[#f38312] hover:bg-[#d9710b] text-white font-bold rounded-[24px] py-3.5 text-[16px] transition-colors shadow-md"
                    >
                      Donate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>



        </div>



        {/* Bottom decorative pattern */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.06]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDgwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2NjYTc1Yicgc3Ryb2tlLXdpZHRoPScxLjUnIG9wYWNpdHk9JzAuMyc+CjxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2MCwgNjApIHNjYWxlKDEuNSknPgo8cGF0aCBkPSdNMjAgNUMyMCA1IDEwIDE1IDIwIDM1QzMwIDE1IDIwIDUgMjAgNVonLz4KPHBhdGggZD0nTTIwIDM1QzEwIDMwIDUgMjAgMTAgMTJDMTUgMTIgMTggMjUgMjAgMzVaJy8+CjxwYXRoIGQ9J00yMCAzNUMzMCAzMCAzNSAyMCAzMCAxMkMyNSAxMiAyMiAyNSAyMCAzNVonLz4KPC9nPgo8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NjAsIDI2MCkgc2NhbGUoMS41KSc+CjxsaW5lIHgxPSc1JyB5MT0nMzUnIHgyPSczNScgeTI9JzUnIHN0cm9rZS13aWR0aD0nNCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJy8+CjxjaXJjbGUgY3g9JzEyJyBjeT0nMjgnIHI9JzEnIGZpbGw9JyNmYWY4ZjUnIHN0cm9rZT0nbm9uZScvPgo8Y2lyY2xlIGN4PScxNycgY3k9JzIzJyByPScxJyBmaWxsPScjZmFmOGY1JyBzdHJva2U9J25vbmUnLz4KPGNpcmNsZSBjeD0nMjInIGN5PScxOCcgcj0nMScgZmlsbD0nI2ZhZjhmNScgc3Ryb2tlPSdub25lJy8+CjxjaXJjbGUgY3g9JzI3JyBjeT0nMTMnIHI9JzEnIGZpbGw9JyNmYWY4ZjUnIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMzMgNyBDIDQyIC04IDUyIDUgMzcgMTMnIHN0cm9rZS13aWR0aD0nMScvPgo8ZWxsaXBzZSBjeD0nNDEnIGN5PSczJyByeD0nMi41JyByeT0nMS41JyB0cmFuc2Zvcm09J3JvdGF0ZSg0NSA0MSAzKScgc3Ryb2tlLXdpZHRoPScxJy8+CjxjaXJjbGUgY3g9JzQxJyBjeT0nMycgcj0nMC41JyBmaWxsPScjY2NhNzViJyBzdHJva2U9J25vbmUnLz4KPHBhdGggZD0nTTEyIDI4IFEgNSAzOCAxMCA0NSBNIDE3IDIzIFEgMTIgMzUgMjAgNDInIHN0cm9rZS13aWR0aD0nMScvPgo8L2c+CjwvZz4KPHRleHQgeD0nNDAwJyB5PScxODAnIGZvbnQtZmFtaWx5PSdHZW9yZ2lhLCBzZXJpZicgZm9udC1zaXplPScyMCcgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBvcGFjaXR5PScwLjMnIGxldHRlci1zcGFjaW5nPScyJyBmb250LXN0eWxlPSdpdGFsaWMnPkhhcmUgS3Jpc2huYSBIYXJlIEtyaXNobmEsIEtyaXNobmEgS3Jpc2huYSBIYXJlIEhhcmU8L3RleHQ+Cjx0ZXh0IHg9JzQwMCcgeT0nMjEwJyBmb250LWZhbWlseT0nR2VvcmdpYSwgc2VyaWYnIGZvbnQtc2l6ZT0nMjAnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScgdGV4dC1hbmNob3I9J21pZGRsZScgb3BhY2l0eT0nMC4zJyBsZXR0ZXItc3BhY2luZz0nMicgZm9udC1zdHlsZT0naXRhbGljJz5IYXJlIFJhbWEgSGFyZSBSYW1hLCBSYW1hIFJhbWEgSGFyZSBIYXJlPC90ZXh0Pgo8L3N2Zz4=')" }} />

      </section>

      

      <ExploreTemple />



      {/* 5. LATEST UPDATES SECTION */}
      <section className="relative w-full bg-[#faf8f5] flex flex-col items-center overflow-hidden border-t border-[#eae4d5]/30 py-8 md:py-12">

        {/* Subtle decorative background elements */}
        <div className="absolute top-1/2 left-[-10%] w-80 h-80 bg-[#cca75b]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-[-5%] w-[350px] h-[350px] bg-[#0c4a8a]/5 rounded-full blur-[120px] pointer-events-none" />



        <div className="container mx-auto px-6 relative z-10">



          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-10 relative">
            <div className="flex items-center gap-3 text-[#d4af37] mb-3">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">INSIGHTS</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight">
              Latest <span className="text-[#d4af37]">Blogs</span>
            </h2>
          </div>



          {/* Style tag for custom updates hover cards */}

          <style dangerouslySetInnerHTML={{

            __html: `

            .update-hover-card {
              position: relative;
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 350px;
              margin: 0 auto;
              min-height: 480px;
              height: auto;
              background-color: #ffffff;
              font-family: 'TC EN', sans-serif;
              border-radius: 12px;
              box-shadow: 15px 15px 30px #d9d9d9, -15px -15px 30px #ffffff;
              transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s, transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
              overflow: hidden;
              cursor: pointer;
              z-index: 1;
            }

            .update-hover-card:hover {
              border-bottom-right-radius: 50px;
              border-top-left-radius: 50px;
              transform: scale(1.05);
            }

            .update-hover-card .content-area {
              padding: 20px;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              justify-content: space-between;
              color: #212121;
              transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s, transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
            }

            .update-hover-card .meta-text {
              color: rgba(0, 0, 0, 0.6) !important;
              border-color: rgba(0, 0, 0, 0.1) !important;
            }
            
            .update-hover-card .meta-icon {
              color: #212121 !important;
            }

            .update-hover-card .heading-title {
              color: #212121 !important;
              font-size: 1.1rem !important;
              line-height: 1.3 !important;
            }

            .update-hover-card .paragraph-text {
              color: rgba(0, 0, 0, 0.7) !important;
              font-size: 0.85rem !important;
              display: -webkit-box !important;
              -webkit-line-clamp: 2 !important;
              -webkit-box-orient: vertical !important;
              overflow: hidden !important;
            }



            .update-hover-card .btn-more {
              position: relative;
              overflow: hidden;
              height: 3rem;
              padding: 0 2rem;
              border-radius: 1.5rem;
              background: #3d3a4e;
              background-size: 400%;
              color: #fff;
              border: none;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-weight: 500;
              font-size: 14px;
              text-decoration: none;
              align-self: flex-start;
            }

            .update-hover-card .btn-more::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              transform: scaleX(0);
              transform-origin: 0 50%;
              width: 100%;
              height: 100%;
              border-radius: inherit;
              background: linear-gradient(
                82.3deg,
                rgba(150, 93, 233, 1) 10.8%,
                rgba(99, 88, 238, 1) 94.3%
              );
              transition: all 0.475s;
            }

            .update-hover-card .btn-more:hover::before {
              transform: scaleX(1);
            }

            .update-hover-card .btn-more > span,
            .update-hover-card .btn-more > svg {
              position: relative;
              z-index: 1;
            }

          ` }} />



          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1400px] mx-auto w-full px-2">
            {[
              {
                id: 1,
                titleLines: ["AMALAKI", "EKADASHI"],
                category: "FESTIVAL",
                description: "Amalaki Ekadashi, also known as Amala Ekadashi...",
                fullContent: `# Amalaki Ekadashi\n\nAmalaki Ekadashi, also known as Amala Ekadashi, is observed in the month of Phalguna and is glorified in the Brahmanda Purana. Sage Vasishtha told King Mandhata that observing this Ekadashi destroys sins, grants prosperity, and leads to liberation.\n\nIn the kingdom of Vaidisha, King Chitraratha and his citizens faithfully observed Amalaki Ekadashi by worshipping Lord Vishnu and the sacred Amalaki (Amla) tree. A hunter, who lived by killing animals, unknowingly participated by staying awake all night, hearing the Lord's glories, and fasting.\n\nBy the merit of this observance, the hunter was reborn as the righteous King Vasuratha. Later, when enemies attempted to kill him, Lord Vishnu protected him through a divine manifestation. Realizing the Lord's mercy, he devoted his life to devotional service.\n\nBenefit: Anyone who sincerely observes Amalaki Ekadashi attains Lord Vishnu's blessings, freedom from sins, and ultimately His eternal abode.`,
                image: "/amala.jpeg",
              },
              {
                id: 2,
                titleLines: ["CELEBRATING", "DEEPOTSAV"],
                category: "FESTIVAL",
                description: "Deepotsav, the festival of light, celebrates...",
                fullContent: `# Kartik Deepotsav in Braj – The Divine Festival of Lights\n\n## Introduction\n\nDeepotsav, the festival of light, celebrates Kartik Deepotsav, a sacred celebration observed during the holy month of Kartik (October–November). Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples and holy places with a radiant glow. The festival represents devotion, gratitude, and remembrance of the Lord's loving pastimes.\n\n## Why Kartik Is Special\n\nKartik is regarded as the most auspicious month in the Vedic calendar. Scriptures describe it as especially dear to Lord Vishnu, making devotional practices performed during this time exceptionally beneficial.\n\n## The Story of Lord Damodara\n\nThe festival commemorates the pastime in which Mother Yashoda lovingly tied young Krishna to a wooden mortar after catching Him stealing butter. Although Krishna is the Supreme Lord, He allowed Himself to be bound by the affection of His devotee. This pastime teaches that sincere devotion and the Lord’s mercy go hand in hand.\n\n## Nalakuvara and Manigriva\n\nDuring this pastime, Krishna delivered Nalakuvara and Manigriva, the sons of Kuvera, who had been cursed to become twin trees. By Krishna’s touch, they were freed from the curse and attained spiritual liberation.\n\n## Deepdaan During Kartik\n\nOffering ghee lamps and singing the Damodarashtakam prayer are important practices during Kartik. These devotional activities help devotees express their love for the Lord and receive His blessings.\n\n## Celebrations in Braj\n\nTemples throughout Braj shine with thousands of lamps, devotional songs, kirtans, and special worship ceremonies. The entire atmosphere becomes vibrant with spiritual joy and devotion.\n\n## Kartik Deepotsav at HKM Dehradun\n\nHKM Dehradun celebrates the entire month with:\n\n* Daily Deepdaan Seva at 8:00 PM\n* Damodarashtakam Kirtan\n* Nauka Vihar Festival\n* Yamuna Boat Ride Pastimes\n* Shobha Yatra\n* Special Spiritual Programs\n\nJoin us and experience the divine blessings and spiritual joy of Kartik Deepotsav.`,
                image: "/deepostav.webp?v=1",
              },
              {
                id: 3,
                titleLines: ["CARRY", "THE LORD"],
                category: "DEVOTION",
                description: "In the journey of spiritual life, one of the most profound...",
                fullContent: `# Vaikuntha Ekadashi – Carrying the Lord in Our Hearts\n\n## Introduction\n\nIn the journey of spiritual life, one of the most profound realizations is what Vaikuntha Ekadashi reminds us of: the importance of keeping Lord Krishna at the center of our lives. When we sincerely remember the Lord and follow His instructions, our thoughts become pure, our words become meaningful, and our actions bring happiness to ourselves and others.\n\n## Lord in the Heart\n\nIn the Srimad Bhagavatam, Lord Brahma tells Narada Muni that his words never become false, his mind never wanders toward undesirable thoughts, and his senses never act improperly because Lord Hari always resides in his heart.\n\nWhen we remember Krishna through chanting, hearing, worship, and devotional service, we naturally develop auspicious thoughts, truthful speech, and righteous actions.\n\n## The Example of Srila Prabhupada\n\nGreat devotees like Srila Prabhupada always carried the Lord in their hearts. Because of their deep devotion, their words inspired others, their actions brought spiritual benefit, and their lives became examples of pure service.\n\nSrila Prabhupada dedicated his life to sharing spiritual knowledge through:\n\n* Bhagavad-gita – the science of God\n* Srimad Bhagavatam – the love of God\n* Chaitanya Charitamrita – the process of deepening love for God\n\nHe encouraged everyone to study these scriptures and apply their teachings in daily life.\n\n## The Power of the Holy Name\n\nAlthough Srila Prabhupada wrote many spiritual books, he often said that their ultimate purpose was to inspire people to chant the holy names of the Lord.\n\nIn this age, the most effective spiritual practice is chanting the Hare Krishna Mahamantra:\n\n**Hare Krishna Hare Krishna Krishna Krishna Hare Hare**\n**Hare Rama Hare Rama Rama Rama Hare Hare**\n\n## Conclusion\n\nVaikuntha Ekadashi teaches us that by keeping Lord Krishna in our hearts with sincerity and enthusiasm, we can transform every situation in life. Through devotion, scripture study, and chanting the holy names, we receive the Lord’s guidance, protection, and blessings.`,
                image: "/carry.webp?v=1",
              }
            ].map((blog, index) => (
              <motion.div 
                layoutId={`blog-${blog.id}`}
                key={blog.id} 
                className="relative flex flex-col justify-between rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[6px] border-white group font-card cursor-pointer bg-white min-h-[400px] lg:min-h-[480px]"
                onClick={() => setSelectedBlog(blog)}
              >
                <img 
                  src={blog.image} 
                  alt={blog.titleLines.join(" ")} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70 pointer-events-none z-0"></div>

                <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10">
                  <div className="mt-2">
                    <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow-lg transform transition-transform duration-500 translate-y-1 group-hover:translate-y-0">
                      {blog.titleLines.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h2>
                  </div>
                  
                  <div className="mt-16 flex flex-col items-start transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-[#ff7a59] font-bold text-[0.85rem] uppercase tracking-[0.15em] block mb-2 drop-shadow-md">
                      {blog.category}
                    </span>
                    <p className="text-white font-medium text-xl sm:text-2xl leading-[1.3] max-w-sm pr-4 drop-shadow-md mb-6">
                      {blog.description}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlog(blog);
                      }}
                      className="group/btn inline-flex items-center gap-2 text-white font-bold tracking-wider text-sm uppercase hover:text-[#ff7a59] transition-colors bg-black/40 hover:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20 hover:border-[#ff7a59]/50"
                    >
                      Read More
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>



          {/* Bottom Button */}

          <div className="mt-12 flex justify-center">

            <Link href="/blog" className="no-underline">

              <button className="relative px-10 py-4 rounded-full text-[#0c4a8a] font-medium tracking-widest uppercase text-sm bg-white/40 backdrop-blur-lg border border-white/60 shadow-[0_8px_32px_0_rgba(12,74,138,0.1)] hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(12,74,138,0.2)] hover:-translate-y-1 transition-all duration-500 overflow-hidden group flex items-center justify-center font-serif">
                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                  View All Updates
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
              </button>

            </Link>

          </div>



        </div>



        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDgwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2NjYTc1Yicgc3Ryb2tlLXdpZHRoPScxLjUnIG9wYWNpdHk9JzAuMyc+CjxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2MCwgNjApIHNjYWxlKDEuNSknPgo8cGF0aCBkPSdNMjAgNUMyMCA1IDEwIDE1IDIwIDM1QzMwIDE1IDIwIDUgMjAgNVonLz4KPHBhdGggZD0nTTIwIDM1QzEwIDMwIDUgMjAgMTAgMTJDMTUgMTIgMTggMjUgMjAgMzVaJy8+CjxwYXRoIGQ9J00yMCAzNUMzMCAzMCAzNSAyMCAzMCAxMkMyNSAxMiAyMiAyNSAyMCAzNVonLz4KPC9nPgo8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NjAsIDI2MCkgc2NhbGUoMS41KSc+CjxsaW5lIHgxPSc1JyB5MT0nMzUnIHgyPSczNScgeTI9JzUnIHN0cm9rZS13aWR0aD0nNCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJy8+CjxjaXJjbGUgY3g9JzEyJyBjeT0nMjgnIHI9JzEnIGZpbGw9JyNmYWY4ZjUnIHN0cm9rZT0nbm9uZScvPgo8Y2lyY2xlIGN4PScxNycgY3k9JzIzJyByPScxJyBmaWxsPScjZmFmOGY1JyBzdHJva2U9J25vbmUnLz4KPGNpcmNsZSBjeD0nMjInIGN5PScxOCcgcj0nMScgZmlsbD0nI2ZhZjhmNScgc3Ryb2tlPSdub25lJy8+CjxjaXJjbGUgY3g9JzI3JyBjeT0nMTMnIHI9JzEnIGZpbGw9JyNmYWY4ZjUnIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMzMgNyBDIDQyIC04IDUyIDUgMzcgMTMnIHN0cm9rZS13aWR0aD0nMScvPgo8ZWxsaXBzZSBjeD0nNDEnIGN5PSczJyByeD0nMi41JyByeT0nMS41JyB0cmFuc2Zvcm09J3JvdGF0ZSg0NSA0MSAzKScgc3Ryb2tlLXdpZHRoPScxJy8+CjxjaXJjbGUgY3g9JzQxJyBjeT0nMycgcj0nMC41JyBmaWxsPScjY2NhNzViJyBzdHJva2U9J25vbmUnLz4KPHBhdGggZD0nTTEyIDI4IFEgNSAzOCAxMCA0NSBNIDE3IDIzIFEgMTIgMzUgMjAgNDInIHN0cm9rZS13aWR0aD0nMScvPgo8L2c+CjwvZz4KPHRleHQgeD0nNDAwJyB5PScxODAnIGZvbnQtZmFtaWx5PSdHZW9yZ2lhLCBzZXJpZicgZm9udC1zaXplPScyMCcgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBvcGFjaXR5PScwLjMnIGxldHRlci1zcGFjaW5nPScyJyBmb250LXN0eWxlPSdpdGFsaWMnPkhhcmUgS3Jpc2huYSBIYXJlIEtyaXNobmEsIEtyaXNobmEgS3Jpc2huYSBIYXJlIEhhcmU8L3RleHQ+Cjx0ZXh0IHg9JzQwMCcgeT0nMjEwJyBmb250LWZhbWlseT0nR2VvcmdpYSwgc2VyaWYnIGZvbnQtc2l6ZT0nMjAnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScgdGV4dC1hbmNob3I9J21pZGRsZScgb3BhY2l0eT0nMC4zJyBsZXR0ZXItc3BhY2luZz0nMicgZm9udC1zdHlsZT0naXRhbGljJz5IYXJlIFJhbWEgSGFyZSBSYW1hLCBSYW1hIFJhbWEgSGFyZSBIYXJlPC90ZXh0Pgo8L3N2Zz4=')" }} />

      </section>

      {/* FAQ SECTION */}
      <FaqSection />

      {/* VOLUNTEER BANNER */}
      <VolunteerBanner />









      {/* Modal / Popup for Blog Content (Governance Style) */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex bg-white overflow-y-auto">
            <motion.div
              layoutId={`blog-${selectedBlog.id}`}
              key={`modal-${selectedBlog.id}`}
              className="w-full min-h-screen bg-white relative">
              
              <div className="flex flex-col-reverse md:flex-row px-6 lg:max-w-[1200px] mx-auto xl:p-0 gap-6 md:gap-[49px] sm:mt-[120px] mt-[60px] w-full">
                <div className="flex-1">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <span className="text-[#c74b36] font-bold text-sm uppercase tracking-widest block pb-2">
                        {selectedBlog.category}
                      </span>
                      <h1 className="text-2xl font-medium text-left text-[#0A0A0A] sm:text-[40px] leading-tight">
                        {selectedBlog.titleLines?.join(' ') || selectedBlog.title}
                      </h1>
                    </div>
                    <div className="text-left font-light mt-8 mb-12 whitespace-pre-line text-[#414A5D] sm:text-[20px] sm:mt-12 sm:mb-16">
                      {selectedBlog.fullContent ? (
                        selectedBlog.fullContent.split('\n\n').map((paragraph: string, i: number) => {
                          if (paragraph.startsWith('# ')) {
                            return <h2 key={i} className="text-3xl font-medium text-gray-900 mb-2 mt-4 leading-tight">{paragraph.replace('# ', '')}</h2>;
                          }
                          if (paragraph.startsWith('## ')) {
                            return <h3 key={i} className="text-xl font-medium text-gray-900 mb-2 mt-6">{paragraph.replace('## ', '')}</h3>;
                          }
                          if (paragraph.startsWith('* ')) {
                            const listItems = paragraph.split('\n').filter((item: string) => item.trim() !== '').map((item: string) => item.replace('* ', ''));
                            return (
                              <ul key={i} className="list-disc list-inside space-y-2 ml-4 mt-2">
                                {listItems.map((item: string, idx: number) => <li key={idx} className="font-light">{item}</li>)}
                              </ul>
                            );
                          }
                          return (
                            <p 
                              key={i} 
                              className={paragraph.startsWith('Benefit:') ? 'font-medium mt-4 text-[#c74b36]' : 'mt-4'}
                              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}
                            />
                          );
                        })
                      ) : (
                        <p className="text-gray-400">Full content for this topic is coming soon.</p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setSelectedBlog(null)}
                      className="bg-[#0A0A0A] text-white py-3 px-6 text-sm md:text-base w-max mb-[60px] sm:mb-[120px] hover:bg-black/80 transition-colors">
                      Back to Home
                    </button>
                  </div>
                </div>
                
                <div className="relative w-full aspect-[0.74] md:w-[350px] lg:w-[400px] md:h-[470px] lg:h-[540px] flex-shrink-0">
                  <img 
                    src={selectedBlog.image || selectedBlog.coverImage} 
                    alt={selectedBlog.titleLines?.join(' ') || selectedBlog.title} 
                    className="object-cover block w-full h-full" 
                  />
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );

}
