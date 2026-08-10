"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export default function GuptVrindavanDhamSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-[#fbf6f0] overflow-hidden text-gray-800 border-t border-b border-[#eae4d5]/30 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Main Grid: Left Circular Image with Organic Blobs + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (6 cols): 5-Wave Spinning Waves + 3D Play Button */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-10 sm:py-4">
            <style>{`
              .gvd-container {
                position: relative;
                width: 520px;
                height: 520px;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .gvd-wave {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 42%;
                background: linear-gradient(
                  135deg,
                  rgba(167,76,255,.35),
                  rgba(211,88,255,.28),
                  rgba(255,120,255,.18)
                );
                filter: blur(1px);
                transform-origin: center;
              }

              .gvd-wave:nth-child(1) {
                transform: rotate(0deg);
                animation: gvdSpin1 14s linear infinite;
              }

              .gvd-wave:nth-child(2) {
                transform: rotate(45deg);
                animation: gvdSpin2 18s linear infinite;
              }

              .gvd-wave:nth-child(3) {
                transform: rotate(90deg);
                animation: gvdSpin3 22s linear infinite;
              }

              .gvd-wave:nth-child(4) {
                transform: rotate(135deg);
                animation: gvdSpin4 26s linear infinite;
              }

              .gvd-wave:nth-child(5) {
                transform: rotate(180deg);
                animation: gvdSpin5 30s linear infinite;
              }

              .gvd-circle {
                position: absolute;
                width: 420px;
                height: 420px;
                border-radius: 50%;
                overflow: hidden;
                z-index: 20;
                border: 3px solid #b44dff;
                box-shadow: 0 20px 60px rgba(0,0,0,.15);
              }

              .gvd-circle img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              @keyframes gvdSpin1 {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }

              @keyframes gvdSpin2 {
                from { transform: rotate(45deg); }
                to   { transform: rotate(405deg); }
              }

              @keyframes gvdSpin3 {
                from { transform: rotate(90deg); }
                to   { transform: rotate(450deg); }
              }

              @keyframes gvdSpin4 {
                from { transform: rotate(135deg); }
                to   { transform: rotate(495deg); }
              }

              @keyframes gvdSpin5 {
                from { transform: rotate(180deg); }
                to   { transform: rotate(540deg); }
              }
            `}</style>

            <div className="gvd-container">
              {/* 5 Spinning Waves */}
              <div className="gvd-wave"></div>
              <div className="gvd-wave"></div>
              <div className="gvd-wave"></div>
              <div className="gvd-wave"></div>
              <div className="gvd-wave"></div>

              {/* Circular Image */}
              <div className="gvd-circle">
                <img
                  src="/mandir-nirman/render-1.webp"
                  alt="Gupt Vrindavan Dham"
                />
              </div>

              {/* Floating 3D Glossy Play Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute z-[110] bottom-[60px] right-[60px] sm:bottom-[80px] sm:right-[80px] cursor-pointer no-underline group hover:scale-110 active:scale-95 transition-transform duration-300"
                title="Play Video"
              >
                <div className="w-[83px] h-[83px] bg-blue-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                  <div className="absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]" />
                  <label className="group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center">
                    <div className="w-8 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                      </svg>
                    </div>
                  </label>
                </div>
              </button>
            </div>

          </div>

          {/* Right Column (6 cols): Copy, Quote & Action Button */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left relative z-10 lg:pl-4 font-sans">
            
            {/* Top right decorative floating lavender ring (Screenshot Match) */}
            <div className="absolute -top-10 right-0 sm:right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[10px] border-[#f3e8ff] pointer-events-none" />

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight pt-2">
              Welcome to Hare Krishna <br className="hidden sm:inline" />
              Movement Dehradun
            </h2>

            {/* Paragraph 1 (Exact bold terms as in screenshot) */}
            <p className="text-base sm:text-lg text-[#374151] leading-relaxed font-normal">
              <strong className="text-[#111827] font-bold">Hare Krishna Movement Dehradun</strong>, lovingly known as the <strong className="text-[#111827] font-bold">&quot;Hare Krishna Mandir,&quot;</strong> is dedicated to spreading the timeless teachings of the <strong className="text-[#111827] font-bold">Bhagavad Gita</strong> and <strong className="text-[#111827] font-bold">Srimad Bhagavatam</strong> while promoting the authentic values of Vedic culture. Through spiritual education, devotional practices, cultural festivals, youth empowerment, prasadam distribution, and community outreach, the movement strives to inspire individuals to lead a life of devotion, compassion, and self-realization.
            </p>

            {/* Paragraph 2 (Quote exact style without custom box) */}
            <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
              <strong className="text-[#111827] font-bold">Srila Prabhupada</strong>, the Founder-Acharya of the International Society for Krishna Consciousness, stated, <span className="">&quot;Unless you change the society, how can you make social welfare?&quot;</span>
            </p>

            {/* Bottom right decorative dot grid pattern (Screenshot Match) */}
            <div className="absolute -bottom-8 right-0 w-32 h-32 bg-[radial-gradient(#f3e8ff_2px,transparent_2px)] [background-size:16px_16px] pointer-events-none opacity-80" />

          </div>

        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                title="Close Video"
              >
                <X size={24} />
              </button>
              
              <video 
                src="/the.mp4" 
                controls 
                autoPlay 
                className="w-full h-auto max-h-[85vh] object-contain outline-none"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
