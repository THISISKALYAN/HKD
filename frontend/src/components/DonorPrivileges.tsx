"use client";

import React from 'react';

const LadduIcon = () => (
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#c084fc]/50 p-1.5 flex items-center justify-center bg-white shadow-sm shrink-0">
    <div className="w-full h-full rounded-full bg-[#c084fc]/25 flex items-center justify-center relative overflow-hidden">
      <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none">
        {/* Plate */}
        <ellipse cx="50" cy="74" rx="34" ry="7" fill="#fff" stroke="#334155" strokeWidth="2.5" />
        <ellipse cx="50" cy="72" rx="28" ry="4.5" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
        {/* Bottom 3 Laddus */}
        <circle cx="34" cy="63" r="9.5" fill="#f59e0b" stroke="#334155" strokeWidth="2.5" />
        <circle cx="50" cy="63" r="9.5" fill="#fbbf24" stroke="#334155" strokeWidth="2.5" />
        <circle cx="66" cy="63" r="9.5" fill="#f59e0b" stroke="#334155" strokeWidth="2.5" />
        {/* Middle 2 Laddus */}
        <circle cx="42" cy="49" r="9.5" fill="#fbbf24" stroke="#334155" strokeWidth="2.5" />
        <circle cx="58" cy="49" r="9.5" fill="#f59e0b" stroke="#334155" strokeWidth="2.5" />
        {/* Top 1 Laddu */}
        <circle cx="50" cy="35" r="9.5" fill="#fbbf24" stroke="#334155" strokeWidth="2.5" />
        {/* Texture dots */}
        <circle cx="48" cy="33" r="1.5" fill="#d97706" />
        <circle cx="52" cy="37" r="1" fill="#d97706" />
        <circle cx="40" cy="47" r="1.5" fill="#d97706" />
        <circle cx="56" cy="47" r="1.5" fill="#d97706" />
        <circle cx="48" cy="61" r="1.5" fill="#d97706" />
      </svg>
    </div>
  </div>
);

const BookIcon = () => (
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#fca5a5]/60 p-1.5 flex items-center justify-center bg-white shadow-sm shrink-0">
    <div className="w-full h-full rounded-full bg-[#f43f5e]/20 flex items-center justify-center relative overflow-hidden">
      <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none">
        {/* Lotus / Light Rays top */}
        <line x1="50" y1="16" x2="50" y2="22" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        <line x1="38" y1="20" x2="42" y2="25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        <line x1="62" y1="20" x2="58" y2="25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        {/* Lotus Petals */}
        <path d="M50 22C44 26 44 34 50 36C56 34 56 26 50 22Z" fill="#ec4899" stroke="#9f1239" strokeWidth="1.5" />
        <path d="M42 30C46 28 50 32 50 36C44 36 40 33 42 30Z" fill="#f472b6" stroke="#9f1239" strokeWidth="1.5" />
        <path d="M58 30C54 28 50 32 50 36C56 36 60 33 58 30Z" fill="#f472b6" stroke="#9f1239" strokeWidth="1.5" />
        
        {/* Open Book Pages */}
        <path d="M22 44C35 40 48 44 50 46C52 44 65 40 78 44V60C65 56 52 60 50 62C48 60 35 56 22 60V44Z" fill="#fff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Book Cover Base */}
        <path d="M22 60C35 56 48 60 50 62C52 60 65 56 78 60" stroke="#1d4ed8" strokeWidth="3" />
        
        {/* Wooden Rehal Stand (X Shape) */}
        <path d="M28 58L72 80M72 58L28 80" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
        <path d="M28 58L72 80M72 58L28 80" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

const TaxIcon = () => (
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#6ee7b7]/60 p-1.5 flex items-center justify-center bg-white shadow-sm shrink-0">
    <div className="w-full h-full rounded-full bg-[#10b981]/20 flex items-center justify-center relative overflow-hidden">
      <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none">
        {/* Document Sheet */}
        <path d="M30 18H62L74 30V76H30V18Z" fill="#fef3c7" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M62 18V30H74" fill="#fde68a" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
        
        {/* TAX Text */}
        <text x="36" y="42" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#1e293b">TAX</text>
        
        {/* Document Lines */}
        <line x1="36" y1="50" x2="60" y2="50" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="57" x2="52" y2="57" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="64" x2="58" y2="64" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Green Checkmark Badge */}
        <circle cx="68" cy="66" r="13" fill="#22c55e" stroke="#fff" strokeWidth="2" />
        <path d="M62 66L66 70L74 61" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

const privileges = [
  {
    title: "Receive Maha Prasadam",
    desc: "Sanctified Maha Prasadam sent from Hare Krishna Movement Dehradun to your home - a divine gift of the Lord's mercy.",
    icon: <LadduIcon />
  },
  {
    title: "Special Gift of Spiritual Books",
    desc: "Enrich your spiritual life with selected books full of timeless wisdom and bhakti.",
    icon: <BookIcon />
  },
  {
    title: "80G Tax Benefit Certificate",
    desc: "Receive tax benefits under Section 80G of the Income Tax Act on your valuable contribution.",
    icon: <TaxIcon />
  }
];

export default function DonorPrivileges() {
  return (
    <div className="w-full max-w-[1240px] mx-auto pt-12 sm:pt-16 pb-4 sm:pb-6 px-4 sm:px-6 relative z-10 font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 relative">
        <div className="flex items-center gap-3 text-[#d4af37] mb-3">
          <div className="h-px w-10 bg-current"></div>
          <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">BENEFITS</span>
          <div className="h-px w-10 bg-current"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight">
          Donor <span className="text-[#d4af37]">Privileges</span>
        </h2>
        <p className="text-[#4a4a4a] text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed mt-3">
          Your support, hope, care, and change where it&apos;s needed most.
        </p>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {privileges.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[24px] p-8 sm:p-10 border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center h-full"
          >
            {/* Double Circle Icon */}
            <div className="mb-8">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#111] mb-3 leading-snug">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-[300px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
