import React from 'react';
import Link from 'next/link';

export default function UpcomingFestivals({ isHomePage = false }: { isHomePage?: boolean }) {
  // trigger recompile
  return (
    <>
      {/* 3. UPCOMING FESTIVALS SECTION */}

      <section className="relative w-full bg-[#faf8f5] flex flex-col items-center overflow-hidden py-8 md:py-12">



        {/* Style tags for advanced, premium animations (bird gliding and flapping) & Uiverse custom glowing blob cards */}

        <style dangerouslySetInnerHTML={{

          __html: `

          @keyframes birdFlapping {

            0%, 100% { transform: scaleY(1); }

            50% { transform: scaleY(0.4) translateY(2px); }

          }

          @keyframes birdGlide1 {

            0%, 100% { transform: translate(0, 0) scale(1); }

            50% { transform: translate(-25px, -12px) scale(1.02); }

          }

          @keyframes birdGlide2 {

            0%, 100% { transform: translate(0, 0) scale(0.85); }

            50% { transform: translate(-18px, -18px) scale(0.87); }

          }

          @keyframes birdGlide3 {

            0%, 100% { transform: translate(0, 0) scale(0.7); }

            50% { transform: translate(-12px, -8px) scale(0.72); }

          }

          

          .animate-bird-flap {

            animation: birdFlapping 0.75s ease-in-out infinite;

          }

          .animate-bird-glide-1 {

            animation: birdGlide1 8s ease-in-out infinite;

          }

          .animate-bird-glide-2 {

            animation: birdGlide2 10s ease-in-out infinite;

          }

          .animate-bird-glide-3 {

            animation: birdGlide3 7s ease-in-out infinite;

          }



          /* Glowing/bouncing aurora card styles adapted from Uiverse.io by ali-sazzad */
          .sazzad-card {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: stretch;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow:
              0 8px 30px rgba(0, 0, 0, 0.08),
              -10px -10px 30px rgba(255, 255, 255, 0.5);
            transition: all 0.4s ease;
          }

          .sazzad-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.15),
              -10px -10px 30px rgba(255, 255, 255, 0.65);
          }

          /* Inner Glow Panel */
          .sazzad-bg {
            position: relative;
            margin: 6px;
            flex: 1;
            background: linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.95),
              rgba(248, 246, 242, 0.85)
            );
            border-radius: 16px;
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.7);
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
          }

          /* Animated Aurora Blob */

          .sazzad-aurora {

            position: absolute;

            top: 50%;

            left: 50%;

            width: 180px;

            height: 180px;

            border-radius: 50%;

            filter: blur(28px);

            z-index: 1;

            animation: sazzad-aurora-move 6.5s infinite ease-in-out;

            opacity: 0.95;

          }



          /* Aurora Animation */

          @keyframes sazzad-aurora-move {

            0% {

              transform: translate(-60%, -60%) scale(1);

            }

            30% {

              transform: translate(10%, -40%) scale(1.15);

            }

            60% {

              transform: translate(20%, 20%) scale(1.05);

            }

            80% {

              transform: translate(-40%, 10%) scale(1.2);

            }

            100% {

              transform: translate(-60%, -60%) scale(1);

            }

          }



          /* Aurora Color Variants */

          .sazzad-aurora-cyan {

            background: radial-gradient(circle, rgba(0, 164, 239, 0.85), rgba(0, 210, 255, 0.4), transparent);

          }

          .sazzad-aurora-gold {

            background: radial-gradient(circle, rgba(212, 175, 55, 0.85), rgba(255, 232, 163, 0.4), transparent);

          }

          .sazzad-aurora-rose {

            background: radial-gradient(circle, rgba(255, 0, 127, 0.85), rgba(255, 182, 193, 0.4), transparent);

          }

          .sazzad-aurora-orange {

            background: radial-gradient(circle, rgba(255, 153, 51, 0.85), rgba(255, 94, 0, 0.4), transparent);

          }

          .sazzad-aurora-green {

            background: radial-gradient(circle, rgba(34, 139, 34, 0.85), rgba(144, 238, 144, 0.4), transparent);

          }

          .sazzad-aurora-indigo {

            background: radial-gradient(circle, rgba(75, 0, 130, 0.85), rgba(138, 43, 226, 0.4), transparent);

          }



          /* Custom Animated Button adapted from Uiverse.io by adamgiebl */

          .cssbuttons-io-button {

            background: #0a3d73;

            color: white;

            font-family: inherit;

            padding: 0.35em;

            padding-left: 1.2em;

            font-size: 18px;

            font-weight: 700;

            border-radius: 0.9em;

            border: 2px solid #cca75b;

            letter-spacing: 0.05em;

            display: flex;

            align-items: center;

            box-shadow: inset 0 0 1.6em -0.6em #0c4a8a;

            overflow: hidden;

            position: relative;

            height: 2.8em;

            padding-right: 3.2em;

            cursor: pointer;

            transition: all 0.3s ease;

          }



          .cssbuttons-io-button:hover {

            box-shadow: 0 4px 15px rgba(81, 12, 42, 0.2);

            border-color: #d4af37;

          }



          .cssbuttons-io-button .icon {

            background: #cca75b;

            margin-left: 1em;

            position: absolute;

            display: flex;

            align-items: center;

            justify-content: center;

            height: 2.2em;

            width: 2.2em;

            border-radius: 0.7em;

            box-shadow: 0.1em 0.1em 0.6em 0.2em rgba(204, 167, 91, 0.3);

            right: 0.3em;

            transition: all 0.3s;

          }



          .cssbuttons-io-button:hover .icon {

            width: calc(100% - 0.6em);

            background: #d4af37;

          }



          .cssbuttons-io-button .icon svg {

            width: 1.1em;

            transition: transform 0.3s;

            color: #0a3d73;

          }



          .cssbuttons-io-button:hover .icon svg {

            transform: translateX(0.15em);

          }



          .cssbuttons-io-button:active .icon {

            transform: scale(0.95);

          }



          /* Creatlydev Premium Button adapted from Uiverse.io */

          .creatly-btn {

            line-height: 1;

            text-decoration: none;

            display: inline-flex;

            border: none;

            cursor: pointer;

            align-items: center;

            gap: 0.75rem;

            background-color: var(--clr);

            color: #fff;

            border-radius: 10rem;

            font-weight: 600;

            padding: 0.55rem 1.25rem;

            padding-left: 18px;

            white-space: nowrap;

            overflow: hidden;

            text-overflow: ellipsis;

            transition: background-color 0.3s;

          }



          .creatly-btn__icon-wrapper {

            flex-shrink: 0;

            width: 24px;

            height: 24px;

            position: relative;

            color: var(--clr);

            background-color: #fff;

            border-radius: 50%;

            display: grid;

            place-items: center;

            overflow: hidden;

          }



          .creatly-btn:hover {

            background-color: #0a3d73; /* Branded deep maroon */

          }



          .creatly-btn:hover .creatly-btn__icon-wrapper {

            color: #0a3d73; /* Branded deep maroon */

          }



          .creatly-btn__icon-svg--copy {

            position: absolute;

            transform: translate(-150%, 150%);

          }



          .creatly-btn:hover .creatly-btn__icon-svg:first-child {

            transition: transform 0.3s ease-in-out;

            transform: translate(150%, -150%);

          }



          .creatly-btn:hover .creatly-btn__icon-svg--copy {

            transition: transform 0.3s ease-in-out 0.1s;

            transform: translate(0);

          }

        `}} />



        {/* Peach/Orange Sky Glow behind Gopuram */}
        <div className="absolute -top-2 md:-top-4 left-[75%] -translate-x-1/2 w-[320px] md:w-[420px] lg:w-[460px] h-[100%] pointer-events-none z-0 hidden sm:block overflow-visible">
          <div className="absolute top-24 left-6 w-72 h-72 bg-[#fde9d2]/90 rounded-full blur-3xl opacity-85" />
          <div className="absolute top-48 left-24 w-56 h-56 bg-[#ebd9b3]/60 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-64 left-12 w-64 h-64 bg-[#ebd5c2]/80 rounded-full blur-[100px] opacity-80" />
        </div>



        {/* Center Temple Illustration & Clouds Background */}
        <div className="absolute -top-2 md:-top-4 left-[75%] -translate-x-1/2 w-[320px] lg:w-[360px] h-full pointer-events-none z-0 hidden sm:block overflow-visible">
          <img
            src="/iskcon-blr-line-art-removebg-preview.png"
            alt="Temple Gopuram"
            className="absolute top-4 md:top-2 left-1/2 -translate-x-1/2 h-[85%] w-[260px] md:w-[320px] lg:w-[360px] object-contain object-top opacity-[0.94] transition-all duration-700 select-none"

            style={{

              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',

              maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)'

            }}

          />

        </div>


        {/* Animated Flying Birds in the Sky (above gopuram) */}
        <div className="absolute top-0 md:top-2 left-[75%] -translate-x-1/2 w-48 h-32 pointer-events-none z-10 hidden md:block select-none">

          {/* Bird 1 */}

          <div className="absolute top-[10%] left-[20%] animate-bird-glide-1">

            <svg width="28" height="14" viewBox="0 0 30 15" fill="none" className="text-[#0a3d73] animate-bird-flap">

              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />

            </svg>

          </div>



          {/* Bird 2 */}

          <div className="absolute top-[40%] left-[48%] animate-bird-glide-2" style={{ animationDelay: '1.2s' }}>

            <svg width="24" height="12" viewBox="0 0 30 15" fill="none" className="text-[#0a3d73]/85 animate-bird-flap" style={{ animationDelay: '0.15s' }}>

              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />

            </svg>

          </div>



          {/* Bird 3 */}

          <div className="absolute top-[25%] left-[76%] animate-bird-glide-3" style={{ animationDelay: '0.6s' }}>

            <svg width="18" height="9" viewBox="0 0 30 15" fill="none" className="text-[#0a3d73]/75 animate-bird-flap" style={{ animationDelay: '0.3s' }}>

              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />

            </svg>

          </div>

        </div>



        <div className="container mx-auto px-6 relative z-20">



          {/* Section Header matching website design */}
          <div className="flex flex-col items-center text-center space-y-2 mb-8 relative">
            <div className="flex items-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">CELEBRATIONS</span>
              <div className="h-px w-10 bg-current"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight mb-1">
              {isHomePage ? (
                <>Upcoming <span className="text-[#d4af37]">Festivals</span></>
              ) : (
                <>Latest <span className="text-[#d4af37]">Events</span></>
              )}
            </h2>
            <p className="text-[#5c5245] max-w-2xl text-[15px] leading-relaxed pt-3 font-medium">

              Celebrate divine moments and spiritual traditions with us. <br className="hidden md:block" />

              Join our upcoming festivals and be a part of the divine experience.

            </p>
          </div>

          {/* Festivals Grid */}
          <div className="grid grid-cols-1 gap-8 max-w-md mx-auto relative z-20 mt-4 md:mt-6">

            {/* Card 2: Janmashtami */}
            <div className="bg-white rounded-[40px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl border border-gray-100 transition-shadow duration-300 flex flex-col h-full min-h-[440px] group font-sans">
              <div className="relative w-full h-full flex-grow flex flex-col justify-end rounded-[32px] overflow-hidden pb-4 px-4 pt-32">
                <img
                  src="/janmashtami-cover.jpg"
                  alt="Janmashtami Temple"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none"></div>

                <div className="relative z-10 px-2 pb-2">
                  <h3 className="text-[38px] lg:text-[46px] font-extrabold text-[#FCD34D] drop-shadow-lg tracking-tight mb-4 leading-tight">
                    Janmashtami
                  </h3>
                  
                  <div className="flex gap-3">
                    <Link
                      href="/festivals/janmashtami#donate"
                      className="flex-1 flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white rounded-[24px] py-3.5 font-semibold text-[16px] transition-colors shadow-lg no-underline"
                    >
                      Donate
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>





        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.08]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>
    </>
  );
}
