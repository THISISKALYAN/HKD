"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingReelsWidget() {
  const pathname = usePathname();
  
  if (pathname === '/reels') return null;

  return (
    <Link href="/reels" className="fixed bottom-[100px] sm:bottom-[104px] right-6 z-[40] hover:scale-110 transition-transform drop-shadow-xl group">
      <div className="relative">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img 
          src="https://img.icons8.com/?size=100&id=YoIaSvIehcuI&format=png&color=000000" 
          alt="Reels" 
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] object-cover rounded-xl relative z-10" 
        />
      </div>
    </Link>
  );
}
