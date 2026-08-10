import React from 'react';
import Link from 'next/link';

export default function VolunteerBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto relative z-10 py-8 md:py-12">
      <div 
        className="relative overflow-hidden rounded-[24px] bg-[#072149] text-white shadow-2xl group cursor-pointer flex flex-col justify-end items-center min-h-[320px] sm:min-h-[380px] p-6 sm:p-10"
      >
        {/* Clear Full Opacity Background Image */}
        <img 
          src="/Life in Harmony with Nature.jpg" 
          alt="Volunteer Banner" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Button Centered at Bottom End of Image */}
        <div className="relative z-10 w-full flex justify-center pb-2 sm:pb-4">
          <Link href="/volunteer">
            <button className="bg-[#F5C518] text-[#072149] px-9 py-4 rounded-full font-black text-[15px] sm:text-base tracking-wider uppercase hover:bg-white hover:text-[#072149] hover:shadow-[0_0_35px_rgba(245,197,24,0.6)] hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-white/40">
              Become a Volunteer
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
