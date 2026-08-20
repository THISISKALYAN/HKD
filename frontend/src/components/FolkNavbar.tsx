"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const FOLK_NAV = [
  { label: "Back to Website", href: "/" },
  { label: "About Us", href: "/youth#about" },
  { label: "Workshops", href: "/youth#highlights" },
  { label: "Life Coach", href: "/life-coach" },
  { label: "Gallery", href: "/gallery" },
];

export default function FolkNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky z-50 transition-all duration-300 ${scrolled ? "top-3 px-3 sm:px-6" : "top-0 w-full"}`}>
      <header
        style={{ fontFamily: "'TC EN', sans-serif" }}
        className={`transition-all duration-300 ${
          scrolled
            ? `max-w-6xl mx-auto ${mobileMenuOpen ? "rounded-3xl" : "rounded-full"} bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.14)]`
            : "w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/youth" prefetch={true} className="flex items-center gap-2">
            <img loading="lazy" src="/channels4_profile-removebg-preview.png"
              alt="FOLK Logo"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {FOLK_NAV.map((item) => {
              if (item.label === "Back to Website") {
                return (
                  <div key={item.label} className="relative py-2 flex items-center">
                    <Link
                      href={item.href}
                      className="btn-custom-donate !m-0 !px-4 !py-1.5 !text-[14px]"
                    >
                      ← {item.label}
                    </Link>
                  </div>
                );
              }
              if (item.label === "Workshop" || item.label === "Workshops") {
                return (
                  <div key={item.label} className="relative py-2 group flex items-center">
                    <Link
                      href={item.href}
                      className="glass-nav-link transition-colors duration-200 flex items-center gap-1"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] opacity-70 group-hover:rotate-180 transition-transform duration-200">▼</span>
                    </Link>

                    {/* Header Dropdown Menu for Workshops */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl border border-gray-200/80 shadow-[0_15px_35px_rgba(2,20,76,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3 z-50 flex flex-col gap-2">
                      <Link
                        href="/happiness-workshops"
                        className="px-4 py-3 rounded-xl hover:bg-[#02144c]/[0.06] transition-colors flex flex-col"
                      >
                        <span className="text-base sm:text-[1.0625rem] font-semibold text-[#02144c] tracking-wide">Happiness Workshops</span>
                        <span className="text-xs text-gray-500 font-normal">Joy & Stress-Free Living</span>
                      </Link>
                      <Link
                        href="/self-empowerment-workshops"
                        className="px-4 py-3 rounded-xl hover:bg-[#02144c]/[0.06] transition-colors flex flex-col"
                      >
                        <span className="text-base sm:text-[1.0625rem] font-semibold text-[#02144c] tracking-wide">Self Empowerment Workshops</span>
                        <span className="text-xs text-gray-500 font-normal">Focus & Mind Mastery</span>
                      </Link>
                    </div>
                  </div>
                );
              }
              return (
                <div key={item.label} className="relative py-2 group flex items-center">
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="glass-nav-link transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-[#0B5DB7] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            className="md:hidden w-full bg-white/95 backdrop-blur-xl border-t border-gray-100/50 px-6 py-4 flex flex-col gap-4 rounded-b-3xl"
            style={{ fontFamily: "'TC EN', sans-serif" }}
          >
            {FOLK_NAV.map((item) => {
              if (item.label === "Back to Website") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-custom-donate !m-0 w-full text-center"
                  >
                    ← {item.label}
                  </Link>
                );
              }
              if (item.label === "Workshop" || item.label === "Workshops") {
                return (
                  <div key={item.label} className="flex flex-col gap-2">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="glass-nav-link py-1.5 flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-gray-400">▼</span>
                    </Link>
                    <div className="pl-4 flex flex-col gap-2 border-l-2 border-[#02144c]/20 py-1">
                      <Link
                        href="/happiness-workshops"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base sm:text-[1.0625rem] font-semibold text-[#02144c] hover:text-[#0B5DB7] py-1.5 tracking-wide"
                      >
                        → Happiness Workshops
                      </Link>
                      <Link
                        href="/self-empowerment-workshops"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base sm:text-[1.0625rem] font-semibold text-[#02144c] hover:text-[#0B5DB7] py-1.5 tracking-wide"
                      >
                        → Self Empowerment Workshops
                      </Link>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="glass-nav-link py-1.5"
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}
