"use client";

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Play, X, Sparkles } from 'lucide-react';
import FolkNavbar from '@/components/FolkNavbar';
import { useCms } from '@/components/CmsContext';

export default function GalleryPage() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const { pageContent, fetchPageContent } = useCms();

  useEffect(() => {
    fetchPageContent('folk-gallery');
  }, [fetchPageContent]);



  type MediaItem = { type: string; url: string; title: string };

  const rawGallery = pageContent['folk-gallery']?.gallery;
  let cmsImages: string[] = [];
  if (Array.isArray(rawGallery)) {
    cmsImages = rawGallery;
  } else if (rawGallery && typeof rawGallery === 'object') {
    cmsImages = Object.values(rawGallery);
  }
  const displayItems: MediaItem[] = cmsImages.map((img: any, idx: number) => {
    const url = typeof img === 'string' ? img : img?.url || '';
    return {
      type: 'image',
      url,
      title: `FOLK Gallery ${idx + 1}`
    };
  }).filter(item => item.url);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <FolkNavbar />
      <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d99500]">Visual Memories</span>
        <h1 className="text-4xl font-extrabold text-[#04235f]">Youth Program Gallery</h1>
        <p className="text-xs sm:text-sm text-gray-600">
          A dynamic visual archive of our youth programs, retreats, and interactive sessions.
        </p>
      </div>



      {/* Masonry Grid or Empty State */}
      {displayItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#d99500] flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#04235f] mb-2">No Media Available</h3>
          <p className="text-gray-500 text-sm">New videos and photos will appear here soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]"
              onClick={() => setActiveMedia(item.url)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#04235f]/90 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {item.url.toLowerCase().endsWith('.mp4') || item.url.toLowerCase().endsWith('.webm') ? (
                <video 
                  src={item.url} 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              )}<div className="absolute inset-0 bg-[#04235f]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white bg-[#d99500] p-3 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  {item.url.endsWith('.mp4') || item.type === 'video' ? (
                    <Play className="w-6 h-6 fill-current" />
                  ) : (
                    <ImageIcon className="w-6 h-6" />
                  )}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Lightbox Popups */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/90 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-saffron p-2 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
            {activeMedia.endsWith('.mp4') || activeMedia.endsWith('.webm') ? (
              <video
                src={encodeURI(activeMedia)}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl bg-black"
              />
            ) : (
              <img loading="lazy" src={encodeURI(activeMedia)}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            )}</div>
        </div>
      )}

      </div>
    </div>
  );
}
