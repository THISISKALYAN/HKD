"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const scripturalCards = [
  {
    id: "01",
    source: "01. Srimad Bhagavatam 10.11.11",
    sanskrit: ["फलविक्रयिणी तस चुतधानकरद्वयम् ।", "फलैरपूरयदग्रतैः फलभाणमपूरि च ॥"],
    english: "While Kṛṣṇa was going to the fruit vendor very hastily, most of the grains He was holding fell. Nonetheless, the fruit vendor filled Kṛṣṇa's hands with fruits, and her fruit basket was immediately filled with jewels and gold.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ivayp8_JJnYbEnWbsQ3wNv7XGEJ-DjAHJ5KXik0sqzrK8k0t2kub_xWI&s=10"
  },
  {
    id: "02",
    source: "02. Srimad Bhagavatam 11.27.51",
    sanskrit: ["पूजादीनां प्रवाहार्थं महापर्वस्थान्वहम् ।", "क्षेत्रापणपुरग्रामान् दत्त्वा मत्सार्ष्टितामियात् ॥"],
    english: "One who offers the Deity gifts of land, markets, cities and villages so that the regular daily worship and special festivals of the Deity may go on continually will achieve opulence equal to My own.",
    image: "/h3.webp"
  },
  {
    id: "03",
    source: "03. Bhagavad Gita 2.40",
    sanskrit: ["नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते ।", "स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् ॥"],
    english: "In this endeavour of offering service to Lord Kṛṣṇa, you get eternal credit, and a little service offer to Lord Kṛṣṇa can protect one from the most dangerous type of fear.",
    image: "https://hkmguwahati.org/wp-content/uploads/2022/12/bhagavad-gita-jayanti-1200x800-1.jpg"
  },
  {
    id: "04",
    source: "04. Srimad Bhagavatam 8.19.41",
    sanskrit: ["नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते ।", "स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् ॥"],
    english: "If one has money, it should be used to push forward the Krishna consciousness movement so that all of human society will become happy, prosperous and hopeful of being promoted back home, back to Godhead.",
    image: "https://prabhupadabooks.com/welcome.jpg"
  },
  {
    id: "05",
    source: "05. Gita Mahatmya 68",
    sanskrit: ["नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते ।", "स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् ॥"],
    english: "One who makes a gift of one hundred copies of the Gita attains to the plane of the Absolute wherefrom rebirth practically never occurs.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0xwnF_yQYXU78PPEzeJKLs2SM5rSSxxAF_jpVzseayHqq7yWgkHIVYva&s=10"
  },
  {
    id: "06",
    source: "06. Srimad Bhagavatam 10.22.35",
    sanskrit: ["एतावज्जन्मसाफल्यं देहिनामिह देहिषु ।", "प्राणैरर्थैर्धिया वाचा श्रेयआचरणं सदा ॥"],
    english: "It is the duty of every living being to perform welfare activities for the benefit of others with his life, wealth, intelligence and words.",
    image: "https://m.media-amazon.com/images/I/8107kx7HAAL.jpg"
  },
  {
    id: "07",
    source: "07. Atharva Veda: Kand 3 Sukta 24 Mantra 5",
    sanskrit: ["शतहस्त समाहर सहस्रहस्त सं किर ।", "कृतस्य कार्यस्य चेह स्फातिं समावह ॥ ५ ॥"],
    english: "One may amass wealth with hundreds of hands but one should also distribute it with thousands of hands. If someone keeps all that he accumulates for himself and does not give it to others the horded wealth will eventually prove to be the cause of ruin.",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQWu_UrgWwhYHZZgEN8hCwRbVXTVlRY45BY11i8463XZZKPyMI8"
  },
  {
    id: "08",
    source: "08. Vamana Purana 95.38",
    sanskrit: ["पितामहस्य पुरतः कुलान्यष्टौ तु यानि च।", "तारयेदात्मना सार्धं विष्णोर्मन्दिरकारकः।।"],
    english: "\"Whoever constructs or helps to construct a temple will protect eight generations of father, grandfathers and forefathers from falling into Hell\"",
    image: "https://sanatanweb.com/wp-content/uploads/2025/12/vaman-avatar-1.jpeg"
  }
];

export default function ScripturalImportanceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef<number>(0);

  // Dedicated Auto-scrolling interval effect
  useEffect(() => {
    const timer = setInterval(() => {
      // If user recently clicked an arrow button, pause auto-scroll for 30 seconds
      if (Date.now() < pauseUntilRef.current) {
        return;
      }

      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 440, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const pauseAutoScroll = () => {
    pauseUntilRef.current = Date.now() + 30000; // Pause auto-scrolling for 30 seconds
  };

  const scrollLeft = () => {
    pauseAutoScroll();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -440, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    pauseAutoScroll();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 440, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#faf8f5] relative z-10 font-sans border-t border-[#eae4d5]/40 overflow-hidden py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-3 sm:mb-4 relative">
          <div className="flex items-center gap-3 text-[#d4af37] mb-3">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">
              THE GLORY OF DEVOTIONAL GIVING & SERVICES
            </span>
            <div className="h-px w-10 bg-current"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight">
            Scriptural <span className="text-[#d4af37]">Importance</span>
          </h2>
          <p className="text-[#4a4a4a] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed mt-3">
            Scriptural wisdom that reveals the power of offering and selfless service to Lord Krsna.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group px-2 sm:px-6">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#072149] hover:bg-[#0c4a8a] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            aria-label="Next Slide"
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#072149] hover:bg-[#0c4a8a] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden py-4 px-2 select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {scripturalCards.map((card) => (
              <div
                key={card.id}
                className="w-[340px] sm:w-[400px] md:w-[420px] h-auto min-h-[560px] shrink-0 bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(7,33,73,0.08)] transition-all duration-300 flex flex-col relative font-sans group/card"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
                  <img loading="lazy" src={card.image}
                    alt={card.source}
                    className="w-full h-full object-cover object-center transform group-hover/card:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/h1.webp";
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 pt-6 flex flex-col justify-between flex-grow text-center">
                  <div>
                    {/* Source Heading with Number included */}
                    <h3 className="text-[#072149] font-bold text-base sm:text-lg mb-2 tracking-tight">
                      {card.source}
                    </h3>

                    {/* Sanskrit Shloka */}
                    <div className="mb-3">
                      {card.sanskrit.map((line, idx) => (
                        <p
                          key={idx}
                          className="text-[#18181b] font-bold text-sm sm:text-base leading-snug"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* English Translation */}
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal overflow-hidden line-clamp-4">
                    {card.english}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
