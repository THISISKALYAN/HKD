"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReelPlayer, { Reel } from '@/components/ReelPlayer';
import { useCms } from '@/components/CmsContext';

// Fallback Mock CMS Data
const MOCK_REELS: Reel[] = [
  {
    id: "reel-1",
    videoUrl: "/vishwas-murthy.mp4",
    likes: 1240,
    caption: "Experience the profound teachings and transcendental bliss! 🙏 #krishna #spirituality"
  },
  {
    id: "reel-2",
    videoUrl: "/donation-video.mp4",
    likes: 856,
    caption: "Your contribution makes a difference. Join our Gau Seva and Annadana initiatives today. 🐄❤️"
  },
  {
    id: "reel-3",
    videoUrl: "/jk.mp4",
    likes: 2104,
    caption: "Beautiful Darshan and ecstatic kirtan! Radhe Radhe! 🌸🕉️ #vrindavan #darshan"
  }
];

export default function ReelsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { pageContent, fetchPageContent, isLoading } = useCms();
  const [reelsData, setReelsData] = useState<Reel[]>(MOCK_REELS);

  useEffect(() => {
    fetchPageContent('reels');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPageContent]);

  const cmsReels = pageContent['reels']?.reels;

  useEffect(() => {
    if (cmsReels && Array.isArray(cmsReels) && cmsReels.some((r: any) => r.url)) {
      setReelsData(cmsReels.filter((r: any) => !!r.url).map((r: any, idx: number) => ({
        id: `cms-reel-${idx}`,
        videoUrl: r.url,
        likes: Math.floor(Math.random() * 2000) + 500, // Simulation of likes since they are not in the new CMS
        caption: r.caption
      })));
    } else {
      setReelsData(MOCK_REELS);
    }
  }, [cmsReels]);

  // Setup Intersection Observer to detect which reel is currently visible
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.6 // Trigger when 60% of the video is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all reel containers
    const elements = containerRef.current?.querySelectorAll('.reel-container');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [fetchPageContent]);

  // Hide Chatling Chatbot and floating widgets when on Reels page
  useEffect(() => {
    const hideChatbot = () => {
      const chatlingElems = document.querySelectorAll(
        '[id*="chtl"], iframe[src*="chatling"], div[class*="chtl"], #chatling-embed-container'
      );
      chatlingElems.forEach((el) => {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
      });
    };

    hideChatbot();
    const interval = setInterval(hideChatbot, 300);

    return () => {
      clearInterval(interval);
      const chatlingElems = document.querySelectorAll(
        '[id*="chtl"], iframe[src*="chatling"], div[class*="chtl"], #chatling-embed-container'
      );
      chatlingElems.forEach((el) => {
        (el as HTMLElement).style.display = '';
      });
    };
  }, []);

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Desktop External Header (Top Left of Screen) */}
      <div className="hidden sm:flex absolute top-8 left-8 md:left-12 xl:left-16 items-center z-30">
        <div className="flex items-center gap-4">
          <img src="/HKM White logo.webp" alt="HKM Logo" className="h-20 w-auto object-contain drop-shadow-md" />
          <span className="text-white font-bold text-5xl tracking-wide drop-shadow-md pb-1">Reels</span>
        </div>
      </div>

      {/* Desktop External Header (Top Right of Screen) */}
      <div className="hidden sm:flex absolute top-10 right-8 md:right-12 xl:right-16 items-center z-30">
        <a href="/" className="text-white font-bold text-lg tracking-wide hover:opacity-90 transition flex items-center gap-3 drop-shadow-md bg-[#ffffff1a] px-6 py-3.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-xl">
          <span className="pb-0.5">Back to Website</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* 
        On mobile: full height and width.
        On desktop: limited height and width with rounded corners to resemble a phone screen.
      */}
      <div 
        ref={containerRef}
        className="h-[100dvh] sm:h-[90vh] sm:max-h-[850px] w-full sm:max-w-[430px] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative bg-black sm:rounded-3xl sm:border-[6px] sm:border-gray-900 shadow-2xl"
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide scrollbar for Chrome, Safari and Opera */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }

            /* Hide chatbot and floating widgets on reels page */
            #chtl-script, [id*="chtl"], iframe[src*="chatling"], div[class*="chtl"], #chatling-embed-container {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
          `
        }} />


        {/* Top navigation gradient (to ensure back button visibility) */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none sm:hidden" />
        {/* Top Header: Back Button, Logo, Title (Mobile Only) */}
        <div className="absolute top-5 left-4 z-30 flex sm:hidden items-center gap-3 pointer-events-auto">
          <a href="/" className="text-white hover:opacity-80 transition flex items-center justify-center p-1 -ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          
          <div className="flex items-center gap-2.5">
            <img src="/HKM White logo.webp" alt="HKM Logo" className="h-9 w-auto object-contain drop-shadow-md" />
            <span className="text-white font-bold text-[22px] tracking-wide drop-shadow-md pb-0.5">Reels</span>
          </div>
        </div>
        {/* Render the reels */}
        {reelsData.map((reel, index) => (
          <div 
            key={reel.id} 
            data-index={index}
            className="reel-container h-full w-full snap-start snap-always relative"
          >
            <ReelPlayer 
              reel={reel} 
              isActive={activeIndex === index} 
              isNearby={Math.abs(activeIndex - index) <= 1}
              onNext={() => {
                const elements = containerRef.current?.querySelectorAll('.reel-container');
                elements?.[index + 1]?.scrollIntoView({ behavior: 'smooth' });
              }}
              onPrev={() => {
                const elements = containerRef.current?.querySelectorAll('.reel-container');
                elements?.[index - 1]?.scrollIntoView({ behavior: 'smooth' });
              }}
              hasNext={index < reelsData.length - 1}
              hasPrev={index > 0}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
