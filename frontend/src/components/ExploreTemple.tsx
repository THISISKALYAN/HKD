import React from "react";
import { Utensils, TreePine } from "lucide-react";

export default function ExploreTemple() {
  return (
    <section className="relative w-full bg-[#faf8f5] overflow-hidden font-sans py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 sm:mb-14 flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 text-[#d4af37] mb-3">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">Experience</span>
            <div className="h-px w-10 bg-current"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight text-center sm:text-left">
            Explore <span className="text-[#d4af37]">Temple</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-[repeat(3,220px)] lg:grid-rows-[repeat(3,200px)] gap-5 sm:gap-6 w-full">
          
          {/* Gau Shala */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[6px] border-white group col-span-1 lg:col-span-1 lg:row-span-2 row-span-1 bg-white">
            <img loading="lazy" src="https://pbs.twimg.com/media/FYuBDEzVUAAvfRf.jpg" 
              alt="Gau Shala" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Hare Krishna Movement Dehradun (Center Large Image) */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[6px] border-white group col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 row-span-2 bg-white">
            <img loading="lazy" src="/Photo from Vishwas Murthy (2).jpg" 
              alt="Hare Krishna Movement Dehradun" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/20 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col justify-end z-20 h-full">
              <h3 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-lg transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0 text-center">
                Hare Krishna Movement Dehradun
              </h3>
            </div>
          </div>

          {/* Hare Krishna Gifts */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[6px] border-white group col-span-1 lg:col-span-1 lg:row-span-2 row-span-1 bg-white">
            <img loading="lazy" src="/image_925ffe24.webp" 
              alt="Hare Krishna Gifts" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Vrindavan Garden */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[6px] border-white group col-span-1 lg:col-span-1 lg:row-span-1 row-span-1 bg-white">
            <img loading="lazy" src="https://www.indiasinvitation.com/wp-content/uploads/2016/09/Brindavan-Garden.jpg" 
              alt="Vrindavan Garden" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
          </div>

          {/* Dinning Options (Full width amber card) */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgb(251,191,36,0.15)] border-[6px] border-white group col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1 row-span-1 bg-gradient-to-br from-amber-400 to-amber-600 p-6 sm:p-10 flex flex-col justify-center text-white">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-[60px] h-[60px] shrink-0 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-inner">
                <Utensils className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">Dining Options</h3>
                <p className="text-amber-50 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
                  Renowned for its diligence to spiritual and cultural enrichment, offers a congenial dining experience at its Annakoot Restaurant.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
