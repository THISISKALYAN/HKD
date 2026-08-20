"use client";

import React from 'react';
import { ArrowRight, BookOpen, Heart, Shield, Quote, GraduationCap, TrendingDown, Home } from 'lucide-react';

export default function BecomeAMonkPage() {
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-3">
            Challenge <span className="text-[#d4af37]">Yourself</span>
          </h1>

          {/* Subheading */}
          <p className="text-[#5c5245] max-w-2xl text-[16px] sm:text-[18px] leading-relaxed font-medium mb-6">
            Step away from worldly pursuits, embrace spiritual discipline, and discover profound fulfillment through monastic dedication to Lord Sri Krishna.
          </p>

          {/* Hero Banner Card */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#eae4d5]">
            <img loading="lazy" src="/challenge%20.png"
              alt="Challenge Yourself"
              width={1672}
              height={940}
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="relative w-full bg-white overflow-hidden py-3 shadow-2xs z-20 border-y border-gray-100">
        <div className="flex whitespace-nowrap marquee-container">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="text-[#072149] font-sans font-bold text-xs sm:text-sm px-2 uppercase tracking-[0.2em] flex items-center">
              <span className="mx-8 text-[#d4af37] text-lg">○</span> DEDICATE TO KRISHNA
              <span className="mx-8 text-[#d4af37] text-lg">○</span> FIND INNER PEACE
              <span className="mx-8 text-[#d4af37] text-lg">○</span> SPREAD KNOWLEDGE
              <span className="mx-8 text-[#d4af37] text-lg">○</span> DAILY SADHANA
              <span className="mx-8 text-[#d4af37] text-lg">○</span> SIMPLE LIVING
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}} />
      
      {/* Three Pillars Section */}
      <section className="bg-[#faf8f5] relative z-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">THE MONASTIC JOURNEY</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-2">
              Challenge <span className="text-[#d4af37]">Yourself</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-16 pb-8 text-[#5c5245] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-sans">
            
            {/* The Story */}
            <div className="space-y-12">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="mb-6">
                    While distributing spiritual literature on the streets of Dehradun, I once met a group of software professionals. Their manager became quite surprised when he learned that we live in an ashram and follow the principles of Brahmacarya (celibacy).
                  </p>
                  <p>
                    As he asked about our daily routine, I explained that we usually rise between 3:30 and 4:00 in the morning and spend our day engaged in various forms of devotional service. Before I could continue, he interrupted and exclaimed, <span className="font-bold text-[#072149]">“You must be crazy!”</span> He could not imagine how anyone could be happy waking up so early, especially when he and his colleagues often stayed awake until those hours on weekends enjoying parties and nightlife.
                  </p>
                </div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(7,33,73,0.08)] h-[380px] border-4 border-white group">
                  <img loading="lazy" src="/kik.webp" alt="Monk meditating on Krishna" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(7,33,73,0.08)] h-[380px] border-4 border-white group">
                  <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/images/monk2.jpg" alt="Morning prayer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="order-1 md:order-2">
                  <p>
                    What shocked him even more was our commitment to celibacy. I gently explained that we find genuine happiness in this way of life and that our spiritual practices bring us a sense of fulfillment far greater than temporary material pleasures. However, my explanation did little to convince him. He and his colleagues looked at me with disbelief, politely ended the conversation, and hurried off to work, leaving me wondering whether society considers people like us unusual.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlighted Middle Section */}
            <div className="bg-white p-8 md:p-12 lg:p-14 rounded-[2.5rem] border border-[#eae4d5] shadow-[0_10px_40px_rgba(7,33,73,0.05)] relative overflow-hidden">
               
               <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
                 <div className="lg:col-span-3 space-y-5 text-[#5c5245]">
                   <p>
                     Although celibate monks may be rare in today’s world, they are certainly not abnormal. Throughout history, countless spiritual seekers have embraced celibacy and lived meaningful, contented lives. In the Vaishnava tradition, great personalities such as Haridas Thakur and Bhaktisiddhanta Sarasvati Thakura demonstrated extraordinary character, devotion, and purpose while living as celibates.
                   </p>
                   <p>
                     Even in our own monastery, there are many monks who have dedicated decades of their lives to spiritual service. They continue to live happily and peacefully by following devotional principles and maintaining a strong connection with God.
                   </p>
                   <p>
                     <span className="font-bold text-[#072149]">The true source of happiness is not merely celibacy itself.</span> Rather, it is the deep and meaningful relationship with Sri Krishna that brings genuine satisfaction. Early morning prayers, meditation, and devotional practices help strengthen this connection. As one experiences higher spiritual happiness, the attraction to temporary material pleasures gradually diminishes.
                   </p>
                 </div>
                 <div className="lg:col-span-2 relative rounded-[2rem] overflow-hidden shadow-xl h-[400px] w-full border-4 border-white group transition-transform duration-500">
                   <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/images/monk3.jpg" alt="Reading scripture" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                 </div>
               </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(7,33,73,0.08)] h-[380px] border-4 border-white group">
                <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/images/monk5.jpg" alt="Selfless service" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#072149] tracking-tight">
                  Profound Fulfillment
                </h3>
                <p>
                  For sincere practitioners, spiritual life offers profound fulfillment. While material desires may occasionally arise, they no longer dominate the mind. Instead, they are viewed as distractions that can be overcome through sincere devotional practice. When one's spiritual practices are strong and focused, material attractions lose much of their appeal. Conversely, when spiritual discipline weakens, worldly pleasures can appear more attractive.
                </p>
              </div>
            </div>

            {/* The Quote block with Animated Book */}
            <div className="py-10 md:py-12 my-12 bg-white rounded-[2.5rem] border border-[#eae4d5] relative overflow-hidden shadow-[0_10px_30px_rgba(7,33,73,0.04)]">
              <div className="max-w-5xl mx-auto px-8 md:px-12 grid md:grid-cols-3 gap-10 items-center">
                
                {/* The Animated Book */}
                <div className="md:col-span-1 flex justify-center gita-book-wrapper">
                  <div className="book shadow-2xl">
                    <div className="bg-amber-50 w-full h-full p-6 flex flex-col items-center justify-center text-center border-l-8 border-gray-300">
                      <p className="font-serif text-lg font-bold text-amber-900 mb-2">BG 2.69</p>
                      <Quote className="w-8 h-8 text-amber-400 mx-auto" />
                    </div>
                    <div className="cover bg-cover bg-center border-l-8 border-[#2e1507]" style={{ backgroundImage: "url('/gita-cover.webp')" }}>
                      <div className="absolute inset-0 bg-black/10 rounded-r-[10px] shadow-[inset_8px_0_15px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* The Quote Text */}
                <div className="md:col-span-2 space-y-4">
                  <p className="text-xs font-bold text-[#d4af37] tracking-[0.2em] uppercase">Lord Krishna explains:</p>
                  <blockquote className="text-xl md:text-2xl font-serif font-extrabold text-[#072149] leading-snug relative z-10">
                    <Quote className="absolute -left-8 -top-6 w-12 h-12 text-amber-300/30 rotate-180 -z-10" />
                    &ldquo;What is night for all beings is the time of awakening for the self-controlled, and what is the time of awakening for all beings is night for the introspective sage.&rdquo;
                  </blockquote>
                  <p className="text-[#5c5245] text-sm leading-relaxed">
                    This teaches that what the world often considers normal may appear misguided from a spiritual perspective, while the lifestyle of a sincere spiritual seeker may seem unusual to those absorbed in material pursuits.
                  </p>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{__html: `
                .gita-book-wrapper .book {
                  position: relative;
                  border-radius: 4px 12px 12px 4px;
                  width: 220px;
                  height: 320px;
                  background-color: whitesmoke;
                  transform-style: preserve-3d;
                  perspective: 2000px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #000;
                  transition: transform 0.5s ease;
                }

                .gita-book-wrapper .book:hover {
                  transform: scale(1.05);
                }

                .gita-book-wrapper .cover {
                  top: 0;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 4px 12px 12px 4px;
                  cursor: pointer;
                  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                  transform-origin: left center;
                  box-shadow: inset 4px 0 10px rgba(0,0,0,0.1), 2px 0 12px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  backface-visibility: hidden;
                }

                .gita-book-wrapper .book:hover .cover {
                  transform: rotateY(-80deg);
                  box-shadow: inset 4px 0 10px rgba(0,0,0,0.1), 15px 0 25px rgba(0,0,0,0.2);
                }
              `}} />
            </div>

            {/* Daily Activities & Application Form Split Section */}
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start mt-16">
              
              {/* Left Column: Activities List */}
              <div className="lg:col-span-3 space-y-6">
                <div className="mb-8">
                  <div className="flex items-center gap-3 text-[#d4af37] mb-2">
                    <div className="h-px w-8 bg-current"></div>
                    <span className="uppercase tracking-[0.2em] font-bold text-xs">MONASTIC DISCIPLINE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072149] tracking-tight">
                    What are the <span className="text-[#d4af37]">Daily Activities</span> of a Monk?
                  </h3>
                </div>
                
                <div className="space-y-6 font-sans">
                  {[
                    { num: "1", title: "Spreading Krishna Consciousness", text: "Participate in the distribution of spiritual literature such as Bhagavad Gita As It Is, Srimad Bhagavatam, Ramayana, Sri Caitanya Caritamrita, Isopanishad, Upadesamrita, Science of Self-Realization, Mahabharata, Krishna Book, and other devotional publications to help share spiritual knowledge with society." },
                    { num: "2", title: "Study and Practice the Scriptures", text: "Regularly study the sacred scriptures and imbibe their teachings in your daily life. Over time, develop a thorough understanding and mastery of these spiritual texts." },
                    { num: "3", title: "Maintain a Disciplined Daily Routine", text: "Retire early at around 8:30 PM and rise early at approximately 3:45 AM to begin the day with spiritual practices and devotional activities." },
                    { num: "4", title: "Cultivate Personal Cleanliness", text: "Maintain high standards of cleanliness by washing your clothes and utensils, keeping your room tidy, and regularly cleaning common areas such as bathrooms and living spaces." },
                    { num: "5", title: "Honor Only Krishna Prasadam", text: "Consume only food that has been offered to Lord Krishna. Eating at hotels, restaurants, or roadside stalls is not permitted. The use of tea, coffee, alcohol, cigarettes, and other intoxicants is strictly prohibited." },
                    { num: "6", title: "Develop a Strong Sense of Responsibility", text: "Understand and faithfully perform your assigned duties. Take ownership of your service and remain accountable for the results of your efforts." },
                    { num: "7", title: "Utilize Time Wisely", text: "Make the best use of every moment by engaging in chanting the Hare Krishna Maha Mantra, studying spiritual literature, and performing devotional service." },
                    { num: "8", title: "Learn and Develop New Skills", text: "Acquire practical and devotional skills such as playing the Mridanga, Kartals, and Harmonium, cooking, devotional singing, vehicle driving, and caring for cows." },
                    { num: "9", title: "Follow the Daily Schedule Strictly", text: "Adhere to the prescribed daily timetable with discipline, sincerity, and consistency." },
                    { num: "10", title: "Listen, Understand, and Execute Instructions", text: "Develop the ability to carefully hear instructions, understand them properly, and carry them out with dedication and attention to detail." },
                  ].map((act) => (
                    <div key={act.num} className="bg-white p-5 rounded-2xl border border-[#eae4d5] shadow-2xs">
                      <h4 className="text-base font-bold text-[#072149] mb-1.5 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-[#072149] text-xs flex items-center justify-center shrink-0 font-extrabold">{act.num}</span>
                        {act.title}
                      </h4>
                      <p className="text-[#5c5245] leading-relaxed text-sm sm:text-[15px] pl-8">{act.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-2 sticky top-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl font-sans">
                  <h3 className="text-2xl font-bold text-[#072149] mb-2">Experience Monk Life – Take the 30-Day Challenge</h3>
                  <p className="text-gray-500 mb-8 text-sm">Submit your details below...</p>
                  
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Full Name *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
                      <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-wide">Preferably Whatsapp</p>
                      <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                      <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white text-gray-600" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Educational Qualification *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Occupation *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Photo *</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-white transition-colors cursor-pointer group">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-orange-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center mt-4">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" required />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 submit-button-wrapper">
                      <button type="submit">
                        <div className="svg-wrapper-1">
                          <div className="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} className="icon">
                              <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
                            </svg>
                          </div>
                        </div>
                        <span>Submit Details</span>
                      </button>
                      
                      <style dangerouslySetInnerHTML={{__html: `
                        .submit-button-wrapper button {
                          font-family: inherit;
                          font-size: 20px;
                          background: #212121;
                          color: white;
                          fill: rgb(155, 153, 153);
                          padding: 0.7em 1em;
                          padding-left: 0.9em;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          cursor: pointer;
                          border: none;
                          border-radius: 15px;
                          font-weight: 1000;
                          width: 100%;
                          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        }

                        .submit-button-wrapper button span {
                          display: block;
                          margin-left: 0.5em;
                          transition: all 0.3s ease-in-out;
                        }

                        .submit-button-wrapper button svg {
                          display: block;
                          transform-origin: center center;
                          transition: transform 0.3s ease-in-out;
                        }

                        .submit-button-wrapper button:hover {
                          background: #000;
                        }

                        .submit-button-wrapper button:hover .svg-wrapper {
                          transform: scale(1.25);
                          transition: 0.5s linear;
                        }

                        .submit-button-wrapper button:hover svg {
                          transform: translateX(3em) scale(1.1);
                          fill: #fff;
                        }

                        .submit-button-wrapper button:hover span {
                          opacity: 0;
                          transform: translateX(1em);
                          transition: 0.5s linear;
                        }

                        .submit-button-wrapper button:active {
                          transform: scale(0.98);
                        }
                      `}} />
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
