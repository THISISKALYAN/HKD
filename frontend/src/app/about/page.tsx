"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useCms } from '@/components/CmsContext';

function ParallaxTiltImage({ src, alt, className = "w-[300px] h-[300px] md:w-[400px] md:h-[400px]", reverse = false }: { src: string; alt: string; className?: string, reverse?: boolean }) {
  const ref = useRef(null);
  
  // Tie parallax to the scroll position
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [reverse ? -80 : 80, reverse ? 80 : -80]);

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ y: yParallax }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="flex justify-center items-center perspective-1000 cursor-pointer"
      >
        <motion.img 
          src={src} 
          alt={alt} 
          style={{ transform: "translateZ(40px)" }}
          className={`${className} object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300`} 
        />
      </motion.div>
    </motion.div>
  );
}

// Scroll-tied Reveal Section
function ScrollRevealSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.6 1"] // animate from when top enters viewport, finishes when it reaches 60% of viewport
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y, scale, rotateX }}
      className={`${className} perspective-1000`}
    >
      {children}
    </motion.section>
  );
}

export default function AboutPage() {
  const { pageContent, fetchPageContent } = useCms();

  React.useEffect(() => {
    fetchPageContent('about');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aboutData = pageContent['about'] || {};

  const srilaPrabhupadaText = aboutData.srilaPrabhupadaText || `"Just like we have got a tendency to construct a skyscraper building. As in your country, you do. So you should not be attached to the skyscraper building, but you can utilise the tendency by constructing a big temple like skyscraper for Krishna. In this way, you have to purify your material activities." - Srila Prabhupada in a class in front of the Samadhi of Srila Rupa Gosvami in Vrindavan, Oct 29th, 1972\n\n"This is Krishna conscious vision: 'Oh, there are so many skyscrapers. Why not construct a nice skyscraper temple of Krishna?' This is Krishna consciousness." - Srila Prabhupada lecture in Bombay, Feb 25th, 1974`;
  const srilaPrabhupadaImage = aboutData.srilaPrabhupadaImage || "/about-3.webp";

  const chairmanText = aboutData.chairmanText || `Five thousand years ago, when Lord Krishna appeared on this planet, He brought His divine abode Vrindavan to enact transcendental pastimes. This holy dham is non-different from Krishna and is as worshipable as the Lord Himself. Vrindavan, the heart of Braj Bhoomi, is the most important place of pilgrimage for devotees of Lord Krishna. Scriptures state that visiting Vrindavan is equal to having darshan of Lord Hari. Hence, this spiritual town of temples experiences an influx of people from across the globe every year.`;
  const chairmanImage = aboutData.chairmanImage || "/about-4.webp";

  const presidentText = aboutData.presidentText || `Brajbhoomi is one of India's historical and iconic cultural grounds. The life, customs, practices, languages, festivals in Vrindavan Dham form a unique culture, having developed over millennia based on revelations of the great saints of Vrindavan. This sacred land where Krishna spent His childhood serves as the foundation for His grand temple - Vrindavan Chandrodaya Mandir.`;
  const presidentImage = aboutData.presidentImage || "/about-5.webp";

  return (
    <div className="min-h-screen bg-[#6b7c43] text-[#f3eedc] font-sans pb-20 overflow-hidden" style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDgwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2NjYTc1Yicgc3Ryb2tlLXdpZHRoPScxLjUnIG9wYWNpdHk9JzAuMyc+CjxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2MCwgNjApIHNjYWxlKDEuNSknPgo8cGF0aCBkPSdNMjAgNUMyMCA1IDEwIDE1IDIwIDM1QzMwIDE1IDIwIDUgMjAgNVonLz4KPHBhdGggZD0nTTIwIDM1QzEwIDMwIDUgMjAgMTAgMTJDMTUgMTIgMTggMjUgMjAgMzVaJy8+CjxwYXRoIGQ9J00yMCAzNUMzMCAzMCAzNSAyMCAzMCAxMkMyNSAxMiAyMiAyNSAyMCAzNVonLz4KPC9nPgo8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NjAsIDI2MCkgc2NhbGUoMS41KSc+CjxsaW5lIHgxPSc1JyB5MT0nMzUnIHgyPSczNScgeTI9JzUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPgo8Y2lyY2xlIGN4PScxMicgY3k9JzI4JyByPScxJyBmaWxsPScjY2NhNzViJyBzdHJva2U9J25vbmUnLz4KPGNpcmNsZSBjeD0nMTcnIGN5PScyMycgcj0nMScgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJy8+CjxjaXJjbGUgY3g9JzIyJyBjeT0nMTgnIHI9JzEnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMzUgNSBRIDQwIC01IDQ1IDUgUSA0MCAxNSAzNSA1JyBzdHJva2Utd2lkdGg9JzEnLz4KPGNpcmNsZSBjeD0nNDAnIGN5PSc1JyByPScxLjUnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMTAgMzAgUSAxNSAzNSAxMCA0MCBNIDE1IDI1IFEgMjAgMzUgMTUgNDAnIHN0cm9rZS13aWR0aD0nMScvPgo8L2c+CjwvZz4KPHRleHQgeD0nNDAwJyB5PScxODAnIGZvbnQtZmFtaWx5PSdHZW9yZ2lhLCBzZXJpZicgZm9udC1zaXplPScyMCcgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBvcGFjaXR5PScwLjMnIGxldHRlci1zcGFjaW5nPScyJyBmb250LXN0eWxlPSdpdGFsaWMnPkhhcmUgS3Jpc2huYSBIYXJlIEtyaXNobmEsIEtyaXNobmEgS3Jpc2huYSBIYXJlIEhhcmU8L3RleHQ+Cjx0ZXh0IHg9JzQwMCcgeT0nMjEwJyBmb250LWZhbWlseT0nR2VvcmdpYSwgc2VyaWYnIGZvbnQtc2l6ZT0nMjAnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScgdGV4dC1hbmNob3I9J21pZGRsZScgb3BhY2l0eT0nMC4zJyBsZXR0ZXItc3BhY2luZz0nMicgZm9udC1zdHlsZT0naXRhbGljJz5IYXJlIFJhbWEgSGFyZSBSYW1hLCBSYW1hIFJhbWEgSGFyZSBIYXJlPC90ZXh0Pgo8L3N2Zz4=\")", backgroundRepeat: 'repeat', backgroundSize: '800px 400px' }}>
      
      {/* ── CSS for 3D Perspective and Buttons ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .section-title {
          color: #cca75b;
          font-weight: 800;
          letter-spacing: 0.05em;
          font-size: 2.5rem;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 3.5rem;
          }
        }
      ` }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* 1. SRILA PRABHUPADA */}
        <ScrollRevealSection className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-1/3 flex justify-center order-1">
            <ParallaxTiltImage src={srilaPrabhupadaImage} alt="Srila Prabhupada" reverse={true} />
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-end text-center md:text-right order-2">
            <h2 className="section-title uppercase">Srila Prabhupada</h2>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6 drop-shadow-md whitespace-pre-line">
              {srilaPrabhupadaText}
            </p>
          </div>
        </ScrollRevealSection>

        {/* 2. CHAIRMAN'S MESSAGE */}
        <ScrollRevealSection className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            <h2 className="section-title uppercase">Chairman's Message</h2>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6 drop-shadow-md whitespace-pre-line">
              {chairmanText}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
             <ParallaxTiltImage src={chairmanImage} alt="Chairman" />
          </div>
        </ScrollRevealSection>

        {/* 3. PRESIDENT'S MESSAGE */}
        <ScrollRevealSection className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-1/3 flex justify-center order-1">
            <ParallaxTiltImage src={presidentImage} alt="President" reverse={true} />
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-end text-center md:text-right order-2">
            <h2 className="section-title uppercase">President's Message</h2>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6 drop-shadow-md whitespace-pre-line">
              {presidentText}
            </p>
          </div>
        </ScrollRevealSection>


      </div>
    </div>
  );
}
