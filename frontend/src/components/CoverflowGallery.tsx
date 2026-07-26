"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCms } from '@/components/CmsContext';

const DEFAULT_GALLERY = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  src: `/Photo from Vishwas Murthy(${i + 1}).jpg`,
  title: 'Hare Krishna Dehradun',
  subtitle: `Event Highlights ${i + 1}`,
  pos: 'object-center'
}));

function getOffset(index: number, current: number, total: number) {
  let off = ((index - current) % total + total) % total;
  if (off > Math.floor(total / 2)) off -= total;
  return off;
}

export default function CoverflowGallery() {
  const { pageContent } = useCms();
  
  const galleryItems = useMemo(() => {
    const cmsGallery = pageContent.home?.templeGallery;
    if (cmsGallery && cmsGallery.length > 0) {
      return cmsGallery.map((url: string, idx: number) => ({
        id: idx + 1,
        src: url,
        title: 'Hare Krishna Dehradun',
        subtitle: `Event Highlights ${idx + 1}`,
        pos: 'object-center'
      }));
    }
    return DEFAULT_GALLERY;
  }, [pageContent.home?.templeGallery]);

  const TOTAL = galleryItems.length;

  const [current, setCurrent]           = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const [lightbox, setLightbox]         = useState<string | null>(null);

  const prev = useCallback(() => setCurrent(p => (p - 1 + TOTAL) % TOTAL), [TOTAL]);
  const next = useCallback(() => setCurrent(p => (p + 1) % TOTAL), [TOTAL]);

  // Auto-scroll every 3.5 s
  useEffect(() => {
    if (isPaused || lightbox) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [isPaused, lightbox, next]);

  return (
    <>
      <section
        className="relative w-full bg-white overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* ── Header ─────────────────────────────── */}
        <div className="flex flex-col items-center pt-12 pb-10 px-6">
          <div className="flex items-center gap-3 text-[#d4af37] mb-3">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">Glimpses</span>
            <div className="h-px w-10 bg-current"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-section-heading font-medium leading-[1.1] text-[#3b2b2f] tracking-tight text-center drop-shadow-sm">
            Temple <span className="text-[#d4af37]">Gallery</span>
          </h2>
        </div>

        {/* ── Coverflow track ────────────────────── */}
        <div className="relative h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] flex items-center justify-center">
          {galleryItems.map((item: any, idx: number) => {
            const off    = getOffset(idx, current, TOTAL);
            const absOff = Math.abs(off);

            // Only render center + immediate neighbours + one more each side
            if (absOff > 2) return null;

            const isCenter = off === 0;
            const sign     = Math.sign(off) || 1;

            // Position / visual values per layer
            let translateX: string;
            let scale: number;
            let zIndex: number;
            let brightness: number;
            let borderRadius: string;

            if (isCenter) {
              translateX   = '-50%';
              scale        = 1;
              zIndex       = 10;
              brightness   = 1;
              borderRadius = '18px';
            } else if (absOff === 1) {
              // Immediate neighbour — peeking ~22 % of container from each edge
              translateX   = sign > 0 ? '46%' : '-146%';
              scale        = 0.88;
              zIndex       = 5;
              brightness   = 0.4;
              borderRadius = '14px';
            } else {
              // Far neighbour — mostly hidden
              translateX   = sign > 0 ? '130%' : '-230%';
              scale        = 0.78;
              zIndex       = 1;
              brightness   = 0.2;
              borderRadius = '12px';
            }

            return (
              <div
                key={item.id}
                className="absolute left-1/2 w-[55%] sm:w-[45%] md:w-[42%] lg:w-[40%] h-full overflow-hidden cursor-pointer"
                style={{
                  transform:  `translateX(${translateX}) scale(${scale})`,
                  zIndex,
                  filter:     `brightness(${brightness})`,
                  borderRadius,
                  transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1), filter 0.65s ease, opacity 0.65s ease',
                  boxShadow:  isCenter ? '0 24px 60px rgba(0,0,0,0.22)' : 'none',
                }}
                onClick={() => {
                  if (!isCenter) { setCurrent(idx); }
                  else           { setLightbox(item.src); }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover ${item.pos}`}
                  style={{ borderRadius, display: 'block' }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Navigation arrows ──────────────────── */}
        <div className="flex justify-center items-center gap-5 py-7">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 5 5 12 12 19" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next"
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center cursor-pointer backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <Image
              src={lightbox}
              alt="Gallery fullscreen"
              fill
              className="object-contain p-4"
            />
            <button
              className="absolute top-5 right-7 text-white/70 hover:text-white transition-colors"
              onClick={e => { e.stopPropagation(); setLightbox(null); }}
              aria-label="Close"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
