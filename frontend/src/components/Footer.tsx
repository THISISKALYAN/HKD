'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/* ─────────────────────────────────────────────
   Animated birds (Subtle gliding near spire)
───────────────────────────────────────────── */
const BirdSVG = ({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 60 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g className="bird-flap">
      <path className="wing" d="M30 15 Q18 2 2 8" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path className="wing" d="M30 15 Q42 2 58 8" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   Nav data
───────────────────────────────────────────── */
const NAV_COLS = [
  {
    title: 'About Us',
    links: [
      { label: 'Our Mission',    href: '/mission' },
      { label: 'Objectives',     href: '/objectives' },
      { label: 'Governance',     href: '/governance' },
      { label: 'Youth Programs', href: '/youth' },
    ],
  },
  {
    title: 'Activities',
    links: [
      { label: 'Gita Life Courses',  href: '/gita-life-course' },
      { label: 'Book Distribution',  href: '/book-distribution' },
      { label: 'Volunteer With Us',  href: '/volunteer' },
      { label: 'Challenge Yourself',  href: '/become-a-monk' },
    ],
  },
  {
    title: 'Gallery & Events',
    links: [
      { label: 'Daily Darshan',  href: '/daily-darshan' },
      { label: 'Mandir Nirman', href: '/mandir-nirman' },
      { label: 'Latest Blogs',  href: '/blog' },
      { label: 'Latest Events', href: '/events' },
    ],
  },
  {
    title: 'Donate Now',
    links: [
      { label: 'Gau Seva',              href: '/gau-seva' },
      { label: 'Annadana Seva',         href: '/annadana-seva' },
      { label: 'Khichdi Prasadam Seva', href: '/khichdi-prasadam-seva' },
      { label: 'Ekadashi Seva',         href: '/ekadashi-seva' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Footer Component
───────────────────────────────────────────── */
export function Footer() {
  const pathname = usePathname();

  if (pathname && (pathname.startsWith('/reels') || pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return null;
  }

  return (
    <footer className="relative bg-white pt-8 pb-4 overflow-hidden border-t border-gray-100 font-sans">
      
      {/* Styles moved to globals.css for faster navigation */}

      {/* ── Background Temple (Sitting Above Gold Passing Line) ── */}
      <div className="absolute z-0 pointer-events-none select-none hidden xl:block transition-all duration-500" style={{ width: '560px', right: '0%', bottom: '70px' }}>
        <div className="relative w-full h-full">
          {/* Subtle gold ambient glow halo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#eab308]/12 to-transparent blur-3xl rounded-full scale-95" />
          <Image
            src="/bottom_corner_side-removebg-preview.png"
            alt="Temple Illustration"
            width={560}
            height={560}
            className="w-full h-auto object-contain block transform origin-bottom hover:scale-[1.02] transition-transform duration-700"
            style={{
              mixBlendMode: 'multiply',
              opacity: 0.6,
              filter: 'sepia(0.6) saturate(1.4) brightness(0.92) contrast(0.95)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 15%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 15%)',
            }}
          />
        </div>
      </div>

      {/* ── Realistic Birds flying near temple spire ── */}
      <div className="absolute top-0 right-0 bottom-0 z-0 pointer-events-none select-none" style={{ width: '500px' }}>
        <div className="absolute bird-1" style={{ right: '12%', top: '18%', width: '45px' }}>
          <BirdSVG className="w-full h-auto" />
        </div>
        <div className="absolute bird-2" style={{ right: '18%', top: '24%', width: '45px' }}>
          <BirdSVG className="w-full h-auto" />
        </div>
      </div>

      {/* ── Main content (Wider container max-w-[1520px]) ── */}
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-start gap-8 lg:gap-12 xl:gap-16 mb-12">
          
          {/* Left Column: Brand Logo & Info */}
          <div className="w-full lg:w-auto lg:max-w-[280px]">
            <div className="mb-4">
              {/* Clean, border-less original logo-dehradun.jpg as shown in mockup */}
              <Image 
                src="/fh.webp" 
                alt="Srila Prabhupada's Hare Krishna Movement Dehradun Logo" 
                width={300}
                height={96}
                className="h-24 w-auto object-contain block"
              />
            </div>
            
            <div className="text-gray-500 text-[16.5px] leading-relaxed mb-4 max-w-full font-medium space-y-3">
              <p>
                <strong>Address:</strong><br />
                Khasra No. 801, Suddhowala,<br />
                Near IIM Kashipur Satellite Campus,<br />
                Dehradun 248015
              </p>
              <p>
                <strong>Phone:</strong> +91 9398710996<br />
                <strong>Email:</strong> contact@hkmdehradun.org
              </p>
            </div>

            {/* Follow Us Social Links */}
            <div className="mt-5">
              <h4 className="font-bold text-[#0f4c81] text-[17.5px] tracking-wide mb-3 uppercase text-center lg:text-left">
                Follow Us
              </h4>
              <div className="flex justify-center lg:justify-start items-center bg-[#f2f2f2] shadow-[0px_0px_15px_#00000027] py-[10px] px-[8px] rounded-[5em] w-fit mx-auto lg:mx-0">
                <a href="#" className="flex justify-center items-center w-[38px] h-[38px] rounded-full mx-[6px] bg-[#0077b5] shadow-[0px_0px_4px_#00000027] transition-all duration-300 hover:bg-[#f2f2f2] hover:shadow-[0px_0px_6px_3px_#00000027] group" aria-label="LinkedIn">
                  <svg className="h-[16px] fill-[#f2f2f2] group-hover:fill-[#0077b5] transition-colors duration-300" viewBox="0 -2 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="Icons" stroke="none" strokeWidth={1}>
                      <g transform="translate(-702.000000, -265.000000)">
                        <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" id="LinkedIn"></path>
                      </g>
                    </g>
                  </svg>
                </a>
                <a href="#" className="flex justify-center items-center w-[38px] h-[38px] rounded-full mx-[6px] bg-[#3b5998] shadow-[0px_0px_4px_#00000027] transition-all duration-300 hover:bg-[#f2f2f2] hover:shadow-[0px_0px_6px_3px_#00000027] group" aria-label="Facebook">
                  <svg className="h-[16px] fill-[#f2f2f2] group-hover:fill-[#3b5998] transition-colors duration-300" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xmlSpace="preserve">
                    <g id="XMLID_834_">
                      <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z" />
                    </g>
                  </svg>
                </a>
                <a href="#" className="flex justify-center items-center w-[38px] h-[38px] rounded-full mx-[6px] bg-[#c13584] shadow-[0px_0px_4px_#00000027] transition-all duration-300 hover:bg-[#f2f2f2] hover:shadow-[0px_0px_6px_3px_#00000027] group" aria-label="Instagram">
                  <svg className="h-[16px] fill-[#f2f2f2] group-hover:fill-[#c13584] transition-colors duration-300" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" strokeWidth={1}>
                      <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7439.000000)">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                          <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7288.98792 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" id="instagram-[#167]"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Columns: Links with Gold Underline */}
          <div className="w-full lg:flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 xl:pr-[120px]">
              {NAV_COLS.map((col) => (
                <div key={col.title}>
                  <h4 className="font-bold text-[#0f4c81] text-[17.5px] tracking-wide">
                    {col.title}
                  </h4>
                  {/* Horizontal Gold Line under Header */}
                  <div className="w-8 h-[2px] bg-[#eab308] mt-1.5 mb-3" />
                  
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="footer-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* ── Bottom Bar ── */}
        <div className="relative pt-6 flex flex-col items-center justify-center gap-3.5 text-center text-sm text-gray-500 font-medium w-full">
          {/* Elegant Gradient Border */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#eab308]/50 to-transparent"></div>
          
          <p className="tracking-wide">
            © {new Date().getFullYear()} <span className="text-gray-700 font-semibold">Hare Krishna Movement Dehradun</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mt-1">
            <Link href="/privacy" className="relative group transition-colors duration-300 hover:text-[#0f4c81]">
              <span className="relative z-10">Privacy Policy</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#0f4c81] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span className="text-[#eab308]/70 hidden sm:inline select-none text-xs">✦</span>
            <Link href="/terms" className="relative group transition-colors duration-300 hover:text-[#0f4c81]">
              <span className="relative z-10">Terms &amp; Conditions</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#0f4c81] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span className="text-[#eab308]/70 hidden sm:inline select-none text-xs">✦</span>
            <Link href="/refund-policy" className="relative group transition-colors duration-300 hover:text-[#0f4c81]">
              <span className="relative z-10">Refund Policy</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#0f4c81] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
