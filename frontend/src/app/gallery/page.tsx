"use client";

import React, { useState } from 'react';
import { Image as ImageIcon, Play, X, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  type MediaItem = { type: string; url: string; title: string; thumb?: string };

  const mediaItems: MediaItem[] = [
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2020/01/1G1A1661-compressor-400x284.jpg', title: 'Youth Program 1' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2020/01/1G1A2280-compressor-400x284.jpg', title: 'Youth Program 2' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2020/01/1G1A1888-compressor-400x284.jpg', title: 'Youth Program 3' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/11/IMG_1148-400x284.jpg', title: 'Youth Program 4' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/11/IMG_1170-400x284.jpg', title: 'Youth Program 5' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/11/IMG_1222-400x284.jpg', title: 'Youth Program 6' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/11/DSC04183-400x284.jpg', title: 'Youth Program 7' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/11/DSC04072-400x284.jpg', title: 'Youth Program 8' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/11/DSC04089-400x284.jpg', title: 'Youth Program 9' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2020/01/7X2A4606-400x284.jpg', title: 'Youth Program 10' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/09/1G1A9392-400x284.jpg', title: 'Youth Program 11' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/09/1G1A9408-400x284.jpg', title: 'Youth Program 12' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/09/1G1A9427-400x284.jpg', title: 'Youth Program 13' },
    { type: 'image', url: 'https://folknet.in/wp-content/uploads/2019/09/1G1A9541-400x284.jpg', title: 'Youth Program 14' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-saffron-dark">Visual Memories</span>
        <h1 className="text-4xl font-extrabold text-charcoal-900">Youth Program Gallery</h1>
        <p className="text-xs sm:text-sm text-charcoal-700">
          A dynamic visual archive of our youth programs, retreats, and interactive sessions.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveMedia(item.url)}
            className="relative cursor-pointer overflow-hidden rounded-3xl shadow-md hover:shadow-xl group border border-saffron/10 bg-white"
          >
            <img
              src={item.type === 'video' ? item.thumb : item.url}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-charcoal-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white bg-saffron/90 p-3 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                <ImageIcon className="w-6 h-6" />
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox Popups */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/90 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-saffron p-2 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center shadow-2xl">
            {activeMedia.endsWith('.mp4') ? (
              <video src={activeMedia} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg" />
            ) : (
              <img src={activeMedia} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
