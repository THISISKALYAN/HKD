"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown, ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReelsButton from './ReelsButton';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (
    pathname &&
    (pathname.startsWith('/youth') ||
      pathname.startsWith('/happiness-workshops') ||
      pathname.startsWith('/self-empowerment-workshops') ||
      pathname.startsWith('/life-coach') ||
      pathname.startsWith('/gallery') ||
      pathname.startsWith('/reels'))
  ) {
    return null;
  }

  const isHome = pathname === '/';
  const isFestivalPage = pathname && (pathname.startsWith('/festivals') || pathname === '/panihati-chida-dahi-utsav');

  // Menu items config with liquid glass dropdown items for About Us, Gallery, and Patrons Corner
  const navLinks = [
    { 
      name: 'About Us', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Our Mission', href: '/mission' },
        { name: 'Objectives', href: '/objectives' },
        { name: 'Governance', href: '/governance' }
      ]
    },

    { 
      name: 'Activities', 
      href: '/#initiatives', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Gita Life Courses', href: '/gita-life-course' },
        { name: 'Bhagavad Gita Book Distribution', href: '/book-distribution' },
        { name: 'Volunteer with Us', href: '/volunteer' },
        { name: 'Challenge Yourself', href: '/become-a-monk' }
      ]
    },
    { 
      name: 'Gallery', 
      href: '/gallery', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Daily Darshan', href: '/daily-darshan' },
        { name: 'Latest Events', href: '/events' }
      ]
    },
    { name: 'Youth Programs', href: '/youth', hasDropdown: false },
    { name: 'Blogs', href: '/blogs', hasDropdown: false },
    { name: 'Reels', href: '/reels', hasDropdown: false },
    { name: 'Donate', href: '/donate', hasDropdown: false },
  ];

  return (
    <nav className={`${
      isHome 
        ? 'fixed top-0 left-0 w-full z-50 transition-all duration-250 ease-out bg-transparent' 
        : 'sticky top-0 left-0 w-full z-40 transition-all duration-250 ease-out bg-transparent'
    }`}>
      
      {/* Styles moved to globals.css for faster navigation */}

      {/* NAVIGATION BAR LAYER (White Liquid Glass Style with Black Text or Transparent on Home) */}
      <div className={`transition-all duration-250 ease-out w-full ${
        scrolled 
          ? 'max-w-[1300px] w-[95%] mx-auto mt-2 sm:mt-3 rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.14)] py-1.5 px-4 sm:px-6' 
          : isHome
            ? 'w-full bg-transparent border-none shadow-none py-3 sm:py-4'
            : 'w-full bg-white/85 backdrop-blur-md border-b border-gray-200/40 py-1.5 sm:py-2 shadow-md'
      }`}>
        <div className={scrolled ? "px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
          <div className="flex items-center justify-between gap-8 w-full">
            
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <Link href="/" prefetch={true} className="flex-shrink-0 flex items-center gap-2 sm:gap-3.5">
                <Image
                  src="/fh.webp"
                  alt="Hare Krishna Dehradun Movement Logo"
                  width={200}
                  height={64}
                  priority
                  className="h-12 sm:h-16 w-auto object-contain transition-transform hover:scale-105 drop-shadow-sm"
                />
                <div className={`h-8 sm:h-11 w-[1.5px] rounded-full ${isHome && !scrolled ? 'bg-white/50' : 'bg-gray-300/70'}`} />
                <Image 
                  src="/sp%20logo.webp" 
                  alt="Srila Prabhupada Portrait"
                  width={200}
                  height={64}
                  priority 
                  className="h-12 sm:h-16 w-auto object-contain transition-transform hover:scale-105 drop-shadow-sm"
                />
              </Link>

            </div>

            {/* Desktop Navigation Links - Centered in One Clean Line */}
            <div className="hidden xl:flex items-center gap-4 lg:gap-5 2xl:gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;

                if (link.name === 'Donate Now' || link.name === 'Donate') {
                  return (
                    <div key={link.name} className="relative py-2 group flex items-center">
                      <Link
                        href={link.href}
                        prefetch={true}
                        onClick={() => setIsOpen(false)}
                        className="btn-custom-donate"
                      >
                        Donate
                      </Link>
                    </div>
                  );
                }

                return (
                  <div 
                    key={link.name} 
                    className="relative py-2 group flex items-center"
                  >
                    {link.name === 'Reels' ? (
                      <Link href={link.href} prefetch={true} onClick={() => setIsOpen(false)} className="flex items-center">
                        <ReelsButton isDarkText={!isHome || scrolled} />
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={true}
                        onClick={() => setIsOpen(false)}
                        className={`glass-nav-link ${isActive ? 'glass-nav-link-active' : ''} ${
                          isHome && !scrolled ? '!text-white !font-black tracking-wider hover:!text-[#FF9933] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]' : ''
                        }`}
                      >
                        <span>{link.name}</span>
                        {hasDropdown && (
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${
                            isHome && !scrolled ? '!text-white group-hover:!text-[#FF9933] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]' : 'text-gray-500 group-hover:text-[#0B5DB7]'
                          }`} />
                        )}
                      </Link>
                    )}
                    
                    {hasDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] transition-all duration-300 z-50 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                        {/* Inner card with glass styling and arrow */}
                        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-[0_20px_50px_rgba(11,93,183,0.15)] p-2 relative">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-200/50 rotate-45 pointer-events-none" />
                          
                          <div className="relative space-y-1 z-10">
                            {link.dropdownItems?.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                prefetch={true}
                                onClick={() => {
                                  setIsOpen(false);
                                }}
                                className={`flex items-start gap-3 px-4 py-3 text-left tracking-wide text-gray-800 hover:text-[#0B5DB7] hover:bg-[#0B5DB7]/5 rounded-xl transition-all duration-200 whitespace-normal leading-relaxed group/item ${
                                  link.name === 'Youth Programs'
                                    ? 'text-base sm:text-[1.0625rem] font-semibold'
                                    : 'text-[14px] font-medium'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0B5DB7]/40 group-hover/item:bg-[#0B5DB7] mt-1.5 transition-colors flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Action button spacer */}
            <div className="xl:hidden flex items-center gap-3">
              <Link 
                href="/donate" 
                prefetch={true}
                className="btn-custom-donate !h-8 !min-w-[76px] !text-[12.5px] !px-3 !m-0"
              >
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isHome && !scrolled ? 'text-white hover:text-saffron drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]' : 'text-gray-800 hover:text-[#0B5DB7]'} p-1 focus:outline-none`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200/50 px-5 pt-4 pb-8 space-y-2 shadow-2xl max-h-[85vh] overflow-y-auto z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
            const isDropdownOpen = openMobileDropdown === link.name;
            
            if (link.name === 'Donate') {
              return null; // Remove Donate from the mobile drawer
            }

            if (hasDropdown) {
              return (
                <div key={link.name} className="space-y-1">
                  <button
                    onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : link.name)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[16px] font-semibold tracking-wide transition-colors text-gray-800 hover:bg-gray-100"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#0B5DB7]' : ''}`} />
                  </button>
                  
                  {/* Collapsible Accordion content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-[400px] opacity-100 py-1' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-6 space-y-1 border-l-2 border-gray-200 ml-6">
                      {link.dropdownItems?.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenMobileDropdown(null);
                          }}
                          className="block px-4 py-2.5 text-[15px] font-medium text-gray-600 hover:text-[#0B5DB7] transition-colors tracking-wide whitespace-normal leading-tight"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            if (link.name === 'Reels') {
              return (
                <div key={link.name} className="px-2 mt-4 mb-2 flex items-center">
                  <Link href={link.href} prefetch={true} onClick={() => setIsOpen(false)}>
                    <ReelsButton isDarkText={true} />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  setOpenMobileDropdown(null);
                }}
                className={`block px-4 py-3.5 rounded-xl text-[16px] font-semibold tracking-wide transition-colors ${
                  isActive 
                    ? 'bg-[#0B5DB7]/10 text-[#0B5DB7]' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

    </nav>
  );
};
