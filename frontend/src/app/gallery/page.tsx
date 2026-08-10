"use client";

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Play, X, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import FolkNavbar from '@/components/FolkNavbar';
import { useCms } from '@/components/CmsContext';

export default function GalleryPage() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { pageContent, fetchPageContent } = useCms();

  useEffect(() => {
    fetchPageContent('folk-gallery');
  }, [fetchPageContent]);

  const videos = [
    {
      url: '/folk%20event%20video.mp4',
      title: 'FOLK Youth Festival & Kirtan Night',
      desc: 'Immerse in high-energy youth celebrations, uplifting kirtans, and transformative wisdom sessions with FOLK Dehradun.',
    },
    {
      url: '/Residency.mp4',
      title: 'FOLK Leadership & Residential Camp',
      desc: 'A peek into our life-changing residential retreats—mastering focus, character, and spiritual leadership.',
    },
    {
      url: '/Vrindavan%20trip.mp4',
      title: 'Sacred Vrindavan Heritage Yatra',
      desc: 'Unforgettable spiritual expeditions with youth exploring ancient temples, wisdom satsangs, and sacred culture.',
    },
    {
      url: '/New%20year%20video.mp4',
      title: 'FOLK New Year Spiritual Celebration',
      desc: 'Welcoming the new year with soul-stirring kirtan, mantra meditation, and joyous spiritual fellowship.',
    },
    {
      url: '/Holi.mp4',
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

  type MediaItem = { type: string; url: string; title: string };

  const rawGallery = pageContent['folk-gallery']?.gallery;
  let cmsImages: string[] = [];
  if (Array.isArray(rawGallery)) {
    cmsImages = rawGallery;
  } else if (rawGallery && typeof rawGallery === 'object') {
    cmsImages = Object.values(rawGallery);
  }
  const displayItems: MediaItem[] = cmsImages.map((url: string, idx: number) => ({
    type: 'image',
    url,
    title: `FOLK Gallery ${idx + 1}`
  }));

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

      {/* ── FEATURED VIDEO SHOWCASE (Centered, correct aspect ratio, forward & backward arrows) ── */}
      <div className="max-w-4xl mx-auto mb-16 relative">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-black/90 shadow-[0_25px_60px_rgba(4,35,95,0.2)] border border-amber-500/20 group">
          
          {/* Top Control Bar (Mute/Unmute & Status) */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-[#d99500] text-white font-semibold text-xs backdrop-blur-md border border-white/20 transition-all duration-300 shadow-md"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-400" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>

          {/* Autoplay Video Container with Uncropped Ratio */}
          <div className="relative w-full aspect-video flex items-center justify-center bg-black">
            <video
              key={videos[currentVideoIndex].url}
              src={videos[currentVideoIndex].url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          {/* Overlay Info Bar */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end justify-between pointer-events-none">
            <div className="max-w-lg pr-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#f5c518] mb-1 block">
                Featured Video {currentVideoIndex + 1} of {videos.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                {videos[currentVideoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                {videos[currentVideoIndex].desc}
              </p>
            </div>
            
            <button
              onClick={() => setActiveMedia(videos[currentVideoIndex].url)}
              className="pointer-events-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d99500] to-amber-600 hover:from-amber-600 hover:to-[#d99500] text-white font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 active:scale-95 shrink-0"
            >
              <Maximize2 className="w-4 h-4" /> Watch Full Screen
            </button>
          </div>

        </div>

        {/* Backward Navigation Arrow (Outside Video) */}
        <button
          onClick={prevVideo}
          aria-label="Previous Video"
          className="absolute -left-5 sm:-left-7 lg:-left-14 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#d99500] text-[#04235f] hover:text-white flex items-center justify-center border border-gray-200 hover:border-[#d99500] transition-all duration-300 shadow-xl group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Forward Navigation Arrow (Outside Video) */}
        <button
          onClick={nextVideo}
          aria-label="Next Video"
          className="absolute -right-5 sm:-right-7 lg:-right-14 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#d99500] text-[#04235f] hover:text-white flex items-center justify-center border border-gray-200 hover:border-[#d99500] transition-all duration-300 shadow-xl group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

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
              onClick={() => setActiveMedia(item.url)}
              className="relative cursor-pointer overflow-hidden rounded-3xl shadow-md hover:shadow-xl group border border-amber-500/10 bg-white"
            >
              {item.url.endsWith('.mp4') || item.type === 'video' ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              <div className="absolute inset-0 bg-[#04235f]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
    </div>
  );
}
