"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Maximize, Play, Pause } from "lucide-react";

export default function DonationVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <section className="relative z-10 font-sans py-8 md:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Video Card Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 via-amber-400/20 to-[#d4af37]/20 rounded-[44px] blur-2xl opacity-60 pointer-events-none" />

          {/* Video Frame */}
          <div className="relative bg-black rounded-[28px] sm:rounded-[36px] overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
            <video
              ref={videoRef}
              src="/22.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover rounded-[20px] sm:rounded-[28px] cursor-pointer"
              onClick={togglePlay}
            />

            {/* Floating Control Overlay Bar (Quick access for Audio & Fullscreen) */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2.5 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-xl opacity-90 hover:opacity-100 transition-opacity">
              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Sound On / Off Toggle */}
              <button
                onClick={toggleMute}
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-green-400" />}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                title="Fullscreen Mode"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
