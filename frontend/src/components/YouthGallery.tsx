"use client";

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { useCms } from '@/components/CmsContext';

export default function YouthGallery() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const { pageContent, fetchPageContent } = useCms();

  useEffect(() => {
    fetchPageContent('folk-gallery');
  }, [fetchPageContent]);

  let images: string[] = [];
  const rawGallery = pageContent['folk-gallery']?.gallery;
  if (Array.isArray(rawGallery)) {
    images = rawGallery;
  } else if (rawGallery && typeof rawGallery === 'object') {
    images = Object.values(rawGallery);
  }

  if (images.length === 0) return null;

  return (
    <section className="bg-white relative overflow-hidden py-8 md:py-12" id="gallery">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#02144c] tracking-widest uppercase mb-3">
            Youth Gallery
          </h2>
          <p className="text-[#02144c]/85 text-xs sm:text-sm md:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
            Glimpses of our vibrant youth programs, workshops, and retreats.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url: string, idx: number) => (
            <div
              key={idx}
              onClick={() => setActiveMedia(url)}
              className="relative cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl group border border-gray-100 bg-white aspect-square"
            >
              <img
                src={url}
                alt={`Youth Gallery ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02144c]/60 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold text-xs tracking-wide flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#f5c518]" />
                  View Image
                </span>
              </div>
            </div>
          ))}
        </div>

        {activeMedia && (
          <div className="fixed inset-0 z-50 bg-[#02144c]/95 flex items-center justify-center p-4">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-6 right-6 text-white hover:text-[#f5c518] p-2 bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-5xl w-full max-h-[85vh] flex items-center justify-center">
              <img src={activeMedia} alt="Preview" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
