"use client";

import React from "react";

export default function DonationVideoSection() {

  return (
    <section className="relative z-10 font-sans py-8 md:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Video Card Container */}
        <div className="relative max-w-sm mx-auto">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 via-amber-400/20 to-[#d4af37]/20 rounded-[44px] blur-2xl opacity-60 pointer-events-none" />

          {/* Video Frame */}
          <div className="relative bg-black rounded-[28px] sm:rounded-[36px] overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
            <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
              <iframe 
                src="https://player.vimeo.com/video/1219812595?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=1" 
                frameBorder="0" 
                allow="autoplay; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                title="22"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
