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

          {/* Right Column: Your Support, Divine Impact */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe] rounded-[32px] p-8 sm:p-10 shadow-[0_4px_30px_rgb(0,0,0,0.04)] border border-indigo-50 relative overflow-hidden flex flex-col justify-center">
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4c1d95] leading-tight mb-4 tracking-tight">
                Your Support, <br />
                Divine Impact
              </h2>
              <p className="text-[#5b21b6]/80 font-medium text-sm sm:text-base leading-relaxed px-4">
                Your Contribution helps us build the temple and sustain life-changing initiatives.
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              {donationSevas.map((seva, idx) => (
                <Link
                  key={idx}
                  href={seva.link}
                  className={`group relative block w-full overflow-hidden rounded-[20px] bg-gradient-to-r ${seva.bgClass} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-300 mix-blend-overlay">
                    <img 
                      src={seva.image} 
                      alt={seva.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative px-6 py-5 flex items-center justify-between">
                    <span className="text-white font-bold text-lg sm:text-xl tracking-tight z-10">
                      {seva.title}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-gray-900 group-hover:scale-110 transition-transform duration-300 z-10 shadow-sm">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Subtle bottom graphic/pattern for temple silhouette effect */}
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-10 pointer-events-none bg-[url('/mandir_nitya_seva.webp')] bg-cover bg-bottom mix-blend-luminosity"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
