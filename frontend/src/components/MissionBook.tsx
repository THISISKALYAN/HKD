"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Heart, ChevronRight, ChevronLeft } from "lucide-react";

export default function MissionBook() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 md:my-16 flex justify-center items-center perspective-[2000px]">
      
      {/* Book Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[5/3] bg-[#e0d5c1] rounded-r-2xl rounded-l-2xl shadow-2xl flex border-4 md:border-8 border-[#5c4033]">
        
        {/* Spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-4 md:w-8 -ml-2 md:-ml-4 bg-gradient-to-r from-[#4a332a] via-[#6d4c41] to-[#4a332a] z-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />

        {/* Left Side (Back of Cover / Static Page 1 & 2) */}
        <div className="w-1/2 h-full bg-[#fdfbf7] rounded-l-xl relative overflow-hidden p-3 sm:p-4 md:p-8 flex flex-col justify-center">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 text-center">
            {isFlipped ? (
              // Page 2 Content: Chant
              <div className="animate-fade-in">
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-2 md:mb-6 shadow-lg border-2 md:border-4 border-white">
                  <img loading="lazy" src="/monk2.webp" alt="Chanting" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-sm md:text-2xl font-serif font-bold text-[#072149] mb-1 md:mb-4">Chant the Holy Names</h3>
                <p className="text-gray-700 text-[10px] md:text-lg leading-snug md:leading-relaxed">
                  Chant the Hare Krishna maha-mantra every day to cleanse the mirror of the heart.
                </p>
              </div>
            ) : (
              // Empty left side or title
              <div className="opacity-50">
                <img loading="lazy" src="/logo-dehradun.webp" alt="Logo" className="w-16 md:w-32 mx-auto mb-2 md:mb-4 grayscale opacity-20 mix-blend-multiply" />
                <p className="font-serif text-sm md:text-2xl text-gray-400">The Core Principles</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side (Base Page 4: Honor Prasadam) */}
        <div className="w-1/2 h-full bg-[#fdfbf7] rounded-r-xl relative overflow-hidden p-3 sm:p-4 md:p-8 flex flex-col justify-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 text-center">
             <div className="w-12 h-12 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-2 md:mb-6 shadow-lg border-2 md:border-4 border-white">
                <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/12/khichdi-2.png" alt="Honor Prasadam" className="w-full h-full object-cover bg-white" />
              </div>
              <h3 className="text-sm md:text-2xl font-serif font-bold text-[#072149] mb-1 md:mb-4">Honor Prasadam</h3>
              <p className="text-gray-700 text-[10px] md:text-lg leading-snug md:leading-relaxed">
                Honor the food sanctified by offering to the Supreme Lord, preventing further sinful reactions.
              </p>
          </div>
        </div>

        {/* FLIPPING PAGE */}
        <motion.div
          className="absolute right-0 w-1/2 h-full origin-left z-40 cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? -180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of flipping page (Page 1: Intro) */}
          <div 
            className="absolute inset-0 bg-[#fdfbf7] rounded-r-xl p-3 sm:p-4 md:p-8 flex flex-col justify-center border-l border-black/10 shadow-[-10px_0_20px_rgba(0,0,0,0.1)] backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10">
              <p className="text-[10px] sm:text-xs md:text-xl leading-snug md:leading-relaxed text-gray-900 font-medium text-center">
                Srila Prabhupada, our beloved spiritual master and the founder-acharya of the worldwide Hare Krishna Movement has blessed us with this opportunity for a happy and peaceful life. We just have to practice the following principles:
              </p>
              <div className="mt-2 md:mt-8 flex justify-center animate-bounce">
                <div className="text-orange-500 flex items-center gap-1 md:gap-2 text-[8px] md:text-sm font-bold uppercase tracking-wider">
                  Turn Page <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Back of flipping page (Page 3: Read Srimad Bhagavatam) */}
          <div 
            className="absolute inset-0 bg-[#fdfbf7] rounded-l-xl p-3 sm:p-4 md:p-8 flex flex-col justify-center border-r border-black/10 shadow-[10px_0_20px_rgba(0,0,0,0.1)] backface-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)" 
            }}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-2 md:mb-6 shadow-lg border-2 md:border-4 border-white">
                <img loading="lazy" src="/gita-cover.webp" alt="Read Srimad Bhagavatam" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm md:text-2xl font-serif font-bold text-[#072149] mb-1 md:mb-4">Read Srimad Bhagavatam</h3>
              <p className="text-gray-700 text-[10px] md:text-lg leading-snug md:leading-relaxed">
                Read the spotless purana that glorifies the Supreme Lord, destroying all inauspicious things in the heart.
              </p>
              <div className="mt-2 md:mt-8 flex justify-center">
                <div className="text-orange-500 flex items-center gap-1 md:gap-2 text-[8px] md:text-sm font-bold uppercase tracking-wider">
                  <ChevronLeft className="w-3 h-3 md:w-5 md:h-5" /> Previous Page
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
