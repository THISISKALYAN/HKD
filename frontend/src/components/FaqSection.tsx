"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: 1,
    question: "1. Why should I donate to Hare Krishna Movement Dehradun?",
    answer: "Your valuable donations support daily Nitya Seva, grand temple construction, free sanctified Annadana meals to thousands of needy people, cow protection (Gau Seva), and spiritual education for children and youth."
  },
  {
    id: 2,
    question: "2. How can my donation help the temple?",
    answer: "Every contribution directly funds essential activities such as deity worship, festival celebrations, distributing hot prasadam, maintaining our Gaushala, and spreading divine Krishna consciousness across Uttarakhand."
  },
  {
    id: 3,
    question: "3. Is 80G Tax Exemption available for my donation?",
    answer: "Yes! All donations made to Hare Krishna Movement Dehradun are eligible for 80G Tax Exemption under the Income Tax Act. You will receive an official 80G tax-exempt receipt immediately upon donation."
  },
  {
    id: 4,
    question: "4. Where is Hare Krishna Mandir Dehradun located?",
    answer: "Hare Krishna Mandir is situated in Dehradun, Uttarakhand. You are warmly welcome to visit for daily darshan, mangala aarti, sanctified prasadam, and inspirational spiritual discourses."
  },
  {
    id: 5,
    question: "5. How will I receive the receipt for my online donation?",
    answer: "Instant digital donation receipts are automatically generated and sent to your registered email address and phone number right after a successful transaction."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Default open first question

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#faf8f5] relative z-10 font-sans overflow-hidden py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Header Column */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            {/* FAQ Tag Badge */}
            <span className="bg-[#072149] text-white font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-[0.15em] mb-4 shadow-sm">
              FAQ
            </span>

            {/* Main Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#3b2b2f] leading-[1.2] tracking-tight mb-4">
              Frequently Asked <br className="hidden sm:inline" />
              <span className="text-[#d4af37]">Questions!</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-[#4a4a4a] text-base sm:text-lg font-medium leading-relaxed max-w-md">
              Hare Krishna Movement Dehradun, a spiritual sanctuary and grand temple project, is not only a place of worship but a beacon of social service and cultural preservation.
            </p>
          </div>

          {/* Right Accordion List Column */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(7,33,73,0.06)] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#072149] text-base sm:text-lg cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="leading-snug">{item.question}</span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#072149] text-white rotate-180 shadow-md"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-[#4a4a4a] text-sm sm:text-base leading-relaxed border-t border-gray-50 font-normal">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
