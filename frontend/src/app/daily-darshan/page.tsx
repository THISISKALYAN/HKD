"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share } from 'lucide-react';


import { useCms } from '@/components/CmsContext';

// --- MOCK CMS DATA ---
type DarshanImage = {
  id: string;
  url: string;
  date: string;
  title: string;
  height?: number; // Simulated aspect ratio height class
};

// We add some simulated height variations to make the masonry look realistic
const MOCK_DATA: DarshanImage[] = [
  { id: 'd6', url: '/darshan/DSC04178.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 450 },
  { id: 'd7', url: '/darshan/DSC04179.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 550 },
  { id: 'd8', url: '/darshan/DSC04180.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 650 },
  { id: 'd9', url: '/darshan/DSC04181.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 500 },
  { id: 'd10', url: '/darshan/DSC04182.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 600 },
  { id: 'd1', url: '/darshan/DSC04071.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 600 },
  { id: 'd2', url: '/darshan/DSC04072.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 500 },
  { id: 'd3', url: '/darshan/DSC04074.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 650 },
  { id: 'd4', url: '/darshan/DSC04083.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 550 },
  { id: 'd5', url: '/darshan/DSC04087.webp', date: '2026-06-06', title: 'Radha Krishna Darshan', height: 700 },
];

export default function DailyDarshanPage() {
  const [columns, setColumns] = useState<DarshanImage[][]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { pageContent, fetchPageContent } = useCms();

  useEffect(() => {
    fetchPageContent('daily-darshan');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageContent]);

  const cmsDarshanGallery = pageContent['daily-darshan']?.gallery;

  const darshanData = React.useMemo(() => {
    if (cmsDarshanGallery && cmsDarshanGallery.length > 0) {
      return cmsDarshanGallery.map((url: string, i: number) => ({
        id: `cms-${i}`,
        url,
        date: new Date().toISOString().split('T')[0],
        title: i === 0 ? 'Latest Daily Darshan' : 'Daily Darshan',
        height: 500 + (i % 3) * 100
      }));
    }
    return MOCK_DATA;
  }, [cmsDarshanGallery]);

  // Distribute images into columns based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let colCount = 4;
      if (width < 640) colCount = 2;
      else if (width < 1024) colCount = 3;

      const newCols: DarshanImage[][] = Array.from({ length: colCount }, () => []);
      
      darshanData.forEach((img: DarshanImage, i: number) => {
        newCols[i % colCount].push(img);
      });

      setColumns(newCols);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [darshanData]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === 'ArrowRight') {
      setSelectedIndex(prev => (prev !== null && prev < darshanData.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowLeft') {
      setSelectedIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Escape') {
      setSelectedIndex(null);
    }
  }, [selectedIndex, darshanData]);

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  const openLightbox = (id: string) => {
    // Find index in the original darshanData array
    const idx = darshanData.findIndex((img: any) => img.id === id);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  };

  const handleDownload = () => {
    if (selectedIndex === null) return;
    const url = darshanData[selectedIndex].url;
    // Create an invisible anchor to trigger download
    const link = document.createElement('a');
    link.href = url;
    // We try to suggest a filename, though cross-origin images might ignore it unless it's same-origin
    link.download = `darshan-${darshanData[selectedIndex].date}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (selectedIndex === null) return;
    if (navigator.share) {
      try {
        const url = window.location.origin + darshanData[selectedIndex].url;
        await navigator.share({
          title: 'Daily Darshan - Hare Krishna Mandir',
          text: 'Check out this divine Darshan!',
          url: url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] pt-0 pb-20 font-sans">
      
      {/* Dark Animated Header Card */}
      <div className="w-full z-20 px-4 pt-2 sm:pt-4 pb-8 flex flex-col items-center">
        <style dangerouslySetInnerHTML={{__html: `
          .header-outer {
            width: 100%;
            max-width: 800px;
            min-height: 280px;
            border-radius: 20px;
            padding: 2px;
            background: radial-gradient(circle 800px at 0% 0%, #ffffff, #0c0d0d);
            position: relative;
          }
          .header-dot {
            width: 8px;
            aspect-ratio: 1;
            position: absolute;
            background-color: #fff;
            box-shadow: 0 0 15px #ffffff;
            border-radius: 100px;
            z-index: 2;
            right: 5%;
            top: 10%;
            animation: moveDot 8s linear infinite;
          }
          @keyframes moveDot {
            0%, 100% { top: 10%; right: 5%; }
            25% { top: 10%; right: calc(100% - 35px); }
            50% { top: calc(100% - 30px); right: calc(100% - 35px); }
            75% { top: calc(100% - 30px); right: 5%; }
          }
          .header-card {
            z-index: 1;
            width: 100%;
            height: 100%;
            border-radius: 18px;
            border: solid 1px #202222;
            background-size: 20px 20px;
            background: radial-gradient(circle 800px at 0% 0%, #333333, #0c0d0d);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-direction: column;
            color: #fff;
            padding: 3rem 2rem;
            text-align: center;
            overflow: hidden;
          }
          .header-ray {
            width: 300px;
            height: 60px;
            border-radius: 100px;
            position: absolute;
            background-color: #c7c7c7;
            opacity: 0.2;
            box-shadow: 0 0 50px #fff;
            filter: blur(15px);
            transform-origin: 10%;
            top: -10%;
            left: -10%;
            transform: rotate(35deg);
          }
          .header-text {
            font-weight: 900;
            background: linear-gradient(45deg, #666 4%, #fff, #666);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            line-height: 1.1;
          }
          .header-line {
            width: 100%;
            height: 1px;
            position: absolute;
            background-color: #2c2c2c;
          }
          .header-topl { top: 10%; background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%); }
          .header-bottoml { bottom: 10%; }
          .header-leftl { left: 5%; width: 1px; height: 100%; background: linear-gradient(180deg, #747474 30%, #222424 70%); }
          .header-rightl { right: 5%; width: 1px; height: 100%; }
        `}} />
        <div className="header-outer shadow-2xl">
          <div className="header-dot" />
          <div className="header-card">
            <div className="header-ray" />
            
            <h1 className="header-text text-5xl md:text-7xl mb-4 relative z-10">
              Daily Darshan
            </h1>
            <p className="text-gray-300 font-medium text-sm md:text-base max-w-md relative z-10 mb-8">
              Experience the divine presence through our daily updated gallery.
            </p>

            <div className="inline-flex flex-wrap justify-center items-center gap-2 md:gap-3 bg-black/40 border border-white/10 rounded-2xl md:rounded-full px-5 py-3 relative z-10">
              <span className="text-sm font-bold text-gray-300">Click any image to</span>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:bg-white/20 transition-colors cursor-default">
                <Share className="w-3.5 h-3.5" /> Share
              </div>
              
              <span className="text-gray-500 font-bold">&</span>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:bg-white/20 transition-colors cursor-default">
                <Download className="w-3.5 h-3.5" /> Download
              </div>
            </div>

            <div className="header-line header-topl" />
            <div className="header-line header-leftl" />
            <div className="header-line header-bottoml" />
            <div className="header-line header-rightl" />
          </div>
        </div>
      </div>

      {/* Standard Masonry Container with Scroll Animations */}
      <div className="max-w-[1600px] mx-auto w-full px-2 md:px-4 flex gap-2 md:gap-4">
        {columns.map((colImages, colIndex) => {
          return (
            <div key={colIndex} className="flex-1">
              <div className="flex flex-col gap-2 md:gap-4 w-full">
                {colImages.map((img, imgIndex) => (
                  <motion.div 
                    key={`${img.id}-${imgIndex}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onClick={() => openLightbox(img.id)}
                    className="w-full relative cursor-pointer group overflow-hidden bg-gray-200 rounded-lg shadow-sm"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col"
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
              <div className="flex flex-col pointer-events-auto">
                <span className="text-sm font-semibold opacity-90">
                  {new Date(darshanData[selectedIndex].date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <span className="text-xs opacity-60">{darshanData[selectedIndex].title}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md pointer-events-auto"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {/* Left Navigation */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer flex items-center pl-4 group"
                onClick={() => setSelectedIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
              >
                {selectedIndex > 0 && (
                  <div className="p-3 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ChevronLeft className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* The Image */}
              <motion.img
                key={darshanData[selectedIndex].id}
                src={darshanData[selectedIndex].url}
                alt={darshanData[selectedIndex].title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl"
                draggable={false}
              />

              {/* Right Navigation */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer flex items-center justify-end pr-4 group"
                onClick={() => setSelectedIndex(prev => prev !== null && prev < darshanData.length - 1 ? prev + 1 : prev)}
              >
                {selectedIndex < darshanData.length - 1 && (
                  <div className="p-3 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Toolbar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center gap-12 items-center bg-gradient-to-t from-black/80 to-transparent z-50 pointer-events-none">
              <button onClick={handleShare} className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all pointer-events-auto">
                <Share className="w-6 h-6" />
                <span className="text-[11px] font-semibold tracking-widest uppercase">Share</span>
              </button>
              <button onClick={handleDownload} className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all pointer-events-auto">
                <Download className="w-6 h-6" />
                <span className="text-[11px] font-semibold tracking-widest uppercase">Download</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
