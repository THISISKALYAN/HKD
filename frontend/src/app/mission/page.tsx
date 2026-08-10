"use client";

import React from 'react';
import { Target, Heart, BookOpen, Sun, Sparkles } from 'lucide-react';
import Link from 'next/link';
import MissionBook from '@/components/MissionBook';

export default function OurMissionPage() {
  return (
    <div className="w-full bg-[#faf8f5] font-sans">
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative overflow-hidden z-10 bg-[#faf8f5] py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Decorative Tag */}
          <div className="flex items-center gap-3 text-[#d4af37] mb-2">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">HARE KRISHNA MOVEMENT DEHRADUN</span>
            <div className="h-px w-10 bg-current"></div>
          </div>

          {/* Page Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-4">
            Our <span className="text-[#d4af37]">Mission</span>
          </h1>

          {/* Subheading */}
          <p className="text-[#5c5245] max-w-2xl text-[16px] sm:text-[18px] leading-relaxed font-medium mb-8">
            Rediscovering real happiness and fulfilling the ultimate goal of human life through spiritual wisdom and divine service.
          </p>

          {/* Hero Banner Card */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#eae4d5]">
            <img 
              src="/ourmission.webp" 
              alt="Our Mission" 
              className="w-full h-auto object-cover max-h-[350px] sm:max-h-[440px] md:max-h-[500px]"
            />
          </div>

        </div>
      </section>

      {/* ── MAIN CONTENT AREA ─────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="max-w-none text-[#5c5245] font-sans text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-[#072149] tracking-tight mb-6 text-center">
              What is the mission of human life?
            </h2>

            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src="/ourmm.png"
                alt="Our Mission"
                className="w-full h-auto object-cover max-h-[480px] hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <p className="mb-6 leading-relaxed font-normal text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px]">
              The mission of human life is to end the miseries of material existence and attain a blissful life. We are constantly searching after happiness, but we often fail in our pursuit. We may get a glimpse of happiness, but it does not last forever. We do not want miseries, but we cannot avoid them.
            </p>
            
            <p className="mb-8 leading-relaxed font-normal text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px]">
              Scriptures inform us that we are spiritual beings, part and parcel of the Supreme Lord Sri Krishna, and by nature we are full of happiness – <em className="text-[#072149] font-medium not-italic">anandamayo &apos;bhyasat</em> (vedanta-sutra). Then, why do we suffer? How do we rediscover the lost happiness and lead a blissful life?
            </p>

            <MissionBook />

            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-[#072149] tracking-tight mb-6 mt-10">
              How does this work?
            </h2>
            
            <p className="mb-6 leading-relaxed font-normal text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px]">
              First, let us understand the root cause of our problems that makes our life miserable. We are entrapped in this material world from time immemorial and the happiness we pursue here is temporary and illusory. In the pursuit of such happiness, we engage in various activities, pious and sinful, that bind us more and more in this material world.
            </p>
            
            <p className="mb-8 leading-relaxed font-normal text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px]">
              Our miseries are due to sinful reactions, and when we follow these three principles, all the material contaminations and sins are washed away; consequently, we are reestablished in our real constitutional position of unlimited bliss and happiness.
            </p>

            <blockquote className="border-l-4 border-amber-500 pl-4 md:pl-6 py-3.5 my-8 bg-amber-50/60 rounded-r-2xl border border-r border-t border-b border-amber-200/50">
              <p className="mb-2 text-[16px] sm:text-[18px] text-[#072149] font-bold">
                Sri Chaitanya Mahaprabhu said: <span className="font-semibold text-amber-700 tracking-wide ml-1">ceto-darpana-marjanam bhava-maha-davagni-nirvapanam</span>
              </p>
              <p className="text-[15px] sm:text-[16px] text-[#5c5245] leading-relaxed m-0">
                "Chanting the holy names of the Lord cleanses the mirror of the heart and stops the miseries of the blazing fire of material existence."
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-[#072149] pl-4 md:pl-6 py-3.5 my-8 bg-blue-50/60 rounded-r-2xl border border-r border-t border-b border-blue-200/50">
              <p className="mb-2 text-[16px] sm:text-[18px] text-[#072149] font-bold">
                Srimad Bhagavatam says: <span className="font-semibold text-[#072149] tracking-wide ml-1">nasta-prayesv abhadresu nityam bhagavata-sevaya</span>
              </p>
              <p className="text-[15px] sm:text-[16px] text-[#5c5245] leading-relaxed m-0">
                "All the inauspicious things in our heart are completely destroyed by reading Srimad Bhagavatam every day. The darkness of ignorance is dissipated and we become situated in the mode of goodness and develop all good qualities equivalent to that of the demigods."
              </p>
            </blockquote>

            <p className="mb-6 leading-relaxed font-normal text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px]">
              By honoring prasadam (food offered to the Lord) we do not incur further sinful reactions. Krishna says in the Bhagavad-gita (3.13): <em className="text-[#072149] font-medium not-italic">"The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice. Others, who prepare food for personal sense enjoyment, verily eat only sin."</em>
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
