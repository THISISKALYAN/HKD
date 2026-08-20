"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutDonationSection() {
  const donationSevas = [
    {
      title: "Temple Construction",
      link: "/donate",
      bgClass: "from-indigo-600 to-indigo-800",
      image: "/h3.webp" // Reusing available assets as background hints
    },
    {
      title: "Gau Seva",
      link: "/gau-seva",
      bgClass: "from-blue-600 to-blue-800",
      image: "https://hkmdehradun.org/live-site/assets/12/gau-seva-banner.png"
    },
    {
      title: "Annadana Seva",
      link: "/annadana-seva",
      bgClass: "from-purple-600 to-purple-800",
      image: "https://hkmdehradun.org/live-site/assets/12/annadaan-seva-banner1.png"
    },
    {
      title: "Khichdi Prasadam",
      link: "/khichdi-prasadam-seva",
      bgClass: "from-slate-800 to-slate-900",
      image: "https://hkmdehradun.org/live-site/assets/12/khichdi-seva-banner.png"
    }
  ];

  return (
    <section className="bg-[#faf8f5] relative z-10 font-sans overflow-hidden py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: About Temple Donation */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col justify-center">
            <div className="mb-6">
              <span className="bg-[#072149] text-white font-extrabold text-xs px-5 py-2 rounded-full uppercase tracking-[0.1em] shadow-sm">
                ABOUT TEMPLE DONATION
              </span>
            </div>

            <h2 className="text-3xl sm:text-[42px] font-extrabold text-[#18181b] leading-[1.2] tracking-tight mb-8">
              Temple Donation Online – Donate Online to Hare Krishna Movement Dehradun
            </h2>

            <div className="space-y-5 text-[#4a4a4a] text-base sm:text-[17px] leading-relaxed font-medium">
              <p>
                Hare Krishna Movement Dehradun is a spiritual sanctuary and grand temple project located in Dehradun, Uttarakhand. It is dedicated to uplifting society through a wide range of spiritual and charitable initiatives. This magnificent temple is a symbol of our commitment to spreading the teachings of Lord Krishna, while promoting cultural values and serving humanity.
              </p>
              <p>
                With your generous support, we are able to continue the temple's construction and sustain multiple charitable programs such as Annadana Seva, Khichdi Prasadam, Gau Seva, and spiritual education. These initiatives help us provide food and care to the underprivileged, protect cows, and promote Vedic culture and values.
              </p>
              <p>
                Join us in this divine mission to uplift society, preserve our Vedic heritage, and spread love and compassion. Every contribution is a step towards creating a better, more compassionate world.
              </p>
              <p className="text-[#072149] font-bold text-lg pt-2">
                Thank you for your support!
              </p>
            </div>
          </div>

          {/* Right Column: Only Video */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center h-full min-h-[400px]">
            {/* Video */}
            <div className="w-full max-w-sm mx-auto relative z-10 overflow-hidden rounded-[24px] shadow-2xl border-[6px] border-white">
              <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                <iframe 
                  src="https://player.vimeo.com/video/1219812587?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                  title="donation-video"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
