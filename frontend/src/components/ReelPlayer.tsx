"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown, Forward } from 'lucide-react';

export type Reel = {
  id: string;
  videoUrl: string;
  likes: number;
  caption?: string;
};

interface ReelPlayerProps {
  reel: Reel;
  isActive: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  isNearby: boolean;
}

export default function ReelPlayer({ reel, isActive, onNext, onPrev, hasNext, hasPrev, isNearby }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const lastTapRef = useRef<number>(0);

  // Play/Pause logic based on intersection observer (isActive prop)
  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(console.error);
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleVideoTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected
      if (!isLiked) {
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
      }
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 800);
      
      // Ensure video keeps playing if it was paused by the first tap
      if (videoRef.current?.paused) {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    } else {
      // Single tap
      togglePlay();
    }
    lastTapRef.current = now;
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'HKD Reels',
          text: 'Watch this amazing reel from Hare Krishna Movement Dehradun!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="relative w-full h-full bg-black snap-start flex justify-center items-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={isNearby ? reel.videoUrl : undefined}
        preload={isActive ? "auto" : "metadata"}
        className="w-full h-full object-cover sm:rounded-3xl bg-black"
        loop
        playsInline
        muted={isMuted}
        onClick={handleVideoTap}
      />

      {/* Big Heart Animation for Double Tap */}
      {showHeartAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <Heart className="w-32 h-32 text-red-500 fill-current animate-ping" style={{ animationDuration: '0.8s' }} />
        </div>
      )}

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20"
        >
          <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Top Header / Audio & Play Control */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition flex items-center justify-center w-10 h-10"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>
        <button 
          onClick={toggleMute}
          className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition flex items-center justify-center w-10 h-10"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 fill-current" />}
        </button>
      </div>

      {/* Bottom Information Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 pb-8 sm:pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end">
        
        {/* Left Side: Title & Caption */}
        <div className="text-white max-w-[80%] pb-1 sm:pb-0">
          <h2 className="text-[17px] font-bold mb-1 flex items-center gap-1.5 drop-shadow-md">
            Hare Krishna Dehradun
            <svg className="w-4 h-4 text-blue-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </h2>
          <p className="text-[14px] text-white/95 font-medium drop-shadow-md leading-snug line-clamp-2">
            {reel.caption || "Ecstatic Kirtan and transcendental bliss at Hare Krishna Dehradun 🙏 #harekrishna #kirtan"}
          </p>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col gap-6 items-center">
          <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
            <div className="p-3 bg-black/20 backdrop-blur-sm rounded-full group-hover:bg-black/40 transition hover:scale-110 active:scale-95">
              <Heart className={`w-7 h-7 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
            </div>
            <span className="text-white text-xs font-semibold drop-shadow-md">{likesCount}</span>
          </button>
          
          <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
            <div className="p-3 bg-black/20 backdrop-blur-sm rounded-full group-hover:bg-black/40 transition hover:scale-110 active:scale-95">
              <Forward className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xs font-semibold drop-shadow-md">Share</span>
          </button>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:flex flex-col gap-4 mt-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
              disabled={!hasPrev}
              className="p-2.5 bg-[#2a2a2a]/80 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#3a3a3a] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronUp className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              disabled={!hasNext}
              className="p-2.5 bg-[#2a2a2a]/80 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#3a3a3a] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
