"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FolkNavbar from '@/components/FolkNavbar';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ArrowRight,
  X,
  User,
  Sparkles,
  Award,
  TrendingUp,
  Heart,
  CheckCircle2
} from 'lucide-react';

const YOUTH_CATEGORIES = [
  "All Youth Stories",
  "Mind & Stress Management",
  "Career & Leadership",
  "Daily Habits & Productivity",
  "Spiritual Philosophy",
  "Campus Life"
];

const YOUTH_BLOG_DATA = [
  {
    id: 1,
    title: "Overcoming Anxiety & Burnout: Lessons from Bhagavad-Gita for Students",
    category: "Mind & Stress Management",
    readTime: "6 min read",
    date: "July 12, 2026",
    author: {
      name: "Dr. Arvind Sharma",
      role: "Psychologist & FOLK Senior Mentor",
      avatar: "AS"
    },
    excerpt: "Discover how ancient Vedic psychology provides actionable, scientific tools to detach from exam outcome anxiety and master emotional equilibrium amidst competitive stress.",
    image: "https://recovered.sfo3.cdn.digitaloceanspaces.com/media/15844/Anxiety-disorders-(1).jpg?v=1722503273",
    content: `When Arjuna stood on the battlefield of Kurukshetra right before the ultimate test of his life, overwhelmed by grief, confusion, and anxiety, he experienced what modern clinical psychology defines as acute emotional and cognitive burnout. His limbs trembled, his bow slipped from his hand, and his mind was reeling.

Lord Krishna's response in the Bhagavad-gita serves as the world's most comprehensive psychological manual for resilience, mental poise, and emotional mastery.

1. The Principle of Action vs. Outcome (Karma Yoga):
Lord Krishna instructs: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.' Most campus and workplace anxiety stems from obsessing over future placement packages, appraisal ratings, or peer comparisons rather than focusing 100% on present execution.

2. Anchoring the Turbulent Mind:
The mind is compared to the wind—restless, turbulent, obstinate, and strong. Krishna assures Arjuna that through regular practice (Abhyasa) and healthy detachment from distractions (Vairagya), the mind can be trained from a relentless tyrant into our greatest friend and ally.

3. Weekly Practical Steps for Youth:
• Begin your morning with 15 minutes of japa mantra meditation before checking smartphone notifications
• Practice conscious deep breathing and gratitude during study breaks
• Associate with positive, spiritually grounded mentors who elevate your vision above temporary setbacks.`
  },
  {
    id: 2,
    title: "How FOLK Mentorship Transformed My Engineering & Placement Journey",
    category: "Campus Life",
    readTime: "5 min read",
    date: "June 28, 2026",
    author: {
      name: "Siddharth Verma",
      role: "Software Engineer @ Microsoft & FOLK Alumnus",
      avatar: "SV"
    },
    excerpt: "From struggling with chronic procrastination during college placements to achieving top corporate performance through weekly spiritual life coaching.",
    image: "/workshops/lifecoach/hero-4k.jpg",
    content: `During my third year of engineering in Dehradun, I felt completely burnt out and directionless. The peer pressure of coding interviews, late-night social media scrolling habits, and lack of clear long-term vision left me feeling exhausted, anxious, and unmotivated.

That was when a senior friend introduced me to the Sunday FOLK Youth Empowerment sessions at Hare Krishna Movement Dehradun.

What Changed for Me Inside Out:
• Structured Morning Routine: I learned the science of early rising (Brahma-muhurta) and meditative chanting, which immediately cleared my brain fog and doubled my daily focus.
• 1-on-1 Personal Mentorship: Having a dedicated, confidential mentor to discuss both technical career dilemmas and personal emotional struggles gave me tremendous confidence and stability.
• Value-Based Leadership: Instead of viewing my engineering career purely as a stressful rat race for salary packages, I began seeing my skills as an instrument to serve society and glorify the Supreme Lord.

Today, working in a fast-paced corporate environment, the inner poise and disciplined habits I cultivated at FOLK continue to be my secret weapon for clarity and peace.`
  },
  {
    id: 3,
    title: "Helicopter Vision: Setting 10-Year Career Goals Without Stress",
    category: "Career & Leadership",
    readTime: "7 min read",
    date: "May 19, 2026",
    author: {
      name: "HG Ramesvara Das",
      role: "Youth Educator & Corporate Advisor",
      avatar: "RD"
    },
    excerpt: "Why successful leaders use Vedic 'helicopter vision' to navigate career crossroads, overcome indecision, and build lasting professional abundance.",
    image: "/workshops/lifecoach/linkedin-hero.jpg",
    content: `In modern corporate and academic environments, most young professionals suffer from 'tunnel vision'—getting so consumed by immediate quarterly deadlines or semester exams that they lose sight of the bigger picture of life, health, and spiritual purpose.

What is Helicopter Vision?
Helicopter vision is the ability to rise above daily friction and view your life from a higher spiritual wisdom perspective. When you understand the permanent identity of the self beyond temporary designations, career setbacks no longer crush your self-worth.

Integrating Excellence with Ethics:
Vedic leadership teaches that true professional abundance flows when competence is matched with unshakeable character. Leaders who practice integrity, empathy, and service motive naturally inspire loyalty and rise to the highest echelons of management.

Practical Leadership Takeaways:
• Perform quarterly audits of your time, habits, and associations
• Seek wise sounding boards before making irreversible career moves
• Cultivate inner spiritual wealth to balance outer material success.`
  },
  {
    id: 4,
    title: "The Science of Early Rising: Why 5 AM is the Secret to Mental Clarity",
    category: "Daily Habits & Productivity",
    readTime: "4 min read",
    date: "April 05, 2026",
    author: {
      name: "Divya Nair",
      role: "Product Manager & FOLK Volunteer",
      avatar: "DN"
    },
    excerpt: "Unpacking the biological and Vedic science behind Brahma-muhurta, and how waking up 2 hours before sunrise rewires your focus and joy.",
    image: "/workshops/lifecoach/user-google-hero.jpg",
    content: `For years, I believed I was a 'night owl,' staying up until 2 AM finishing reports while fueled by caffeine, only to wake up groggy, irritable, and already behind schedule.

When my FOLK life mentor challenged me to experiment with waking up during Brahma-muhurta (approximately 1.5 hours before sunrise) for just 21 days, my entire cognitive and emotional baseline transformed.

The Vedic & Biological Synchronization:
During the early morning hours, the environment is dominated by Sattva-guna (the mode of goodness and purity). The atmosphere is serene, pollution is low, and the human brain's alpha waves are at their most receptive state for deep learning, meditation, and creative planning.

3 Steps to Effortless Early Rising:
• Eat a light, digestible dinner at least 3 hours before sleep
• Turn off all digital screens by 9:30 PM and read 2 pages of wisdom literature
• Start with cold water splash and immediately chant for 15 minutes to awaken the intellect.`
  },
  {
    id: 5,
    title: "Meditation in Corporate Life: Balancing Deadlines & Inner Peace",
    category: "Mind & Stress Management",
    readTime: "5 min read",
    date: "March 22, 2026",
    author: {
      name: "Aditya Prakash",
      role: "Strategy Consultant & Mentorship Lead",
      avatar: "AP"
    },
    excerpt: "How practicing mantra meditation for 20 minutes daily reduces cortisol levels, sharpens decision-making, and prevents workplace fatigue.",
    image: "/deepostav.webp?v=1",
    content: `In the high-stakes world of corporate strategy consulting, 80-hour workweeks and intense client pressure can quickly erode emotional well-being and personal relationships.

Many young professionals attempt to cope through weekend escapism, which only leaves them more depleted by Monday morning.

Why Sound-Vibration Meditation Works:
Unlike passive mindfulness techniques where the mind often wanders into anxiety, acoustic mantra meditation (Maha-Mantra sound vibration) gives the restless intellect a transcendental focal point. Modern neuroimaging studies confirm that chanting regulates the amygdala, dramatically lowering stress hormones while boosting cognitive clarity.

Your Daily 20-Minute Sanctuary:
Even during my busiest merger consulting projects, my daily morning japa sanctuary remains sacred. It acts as an impenetrable shield of peace that carries me through high-pressure boardroom discussions with complete composure.`
  },
  {
    id: 6,
    title: "Yukta Vairagya: The Art of Living in the World Without Being Absorbed by It",
    category: "Spiritual Philosophy",
    readTime: "6 min read",
    date: "February 14, 2026",
    author: {
      name: "HG Achyuta Krishna Das",
      role: "Spiritual Director, FOLK",
      avatar: "AK"
    },
    excerpt: "Demystifying the common misconception that spirituality requires abandoning ambition, technology, or professional excellence.",
    image: "/carry.webp?v=1",
    content: `A common hesitation among college youth is the misconception that spiritual life demands artificial renunciation—giving up modern careers, technology, or family responsibilities to live in seclusion.

Srila Rupa Goswami, one of the foremost Vedic philosophers, introduced the profound principle of 'Yukta Vairagya'—practical, dynamic renunciation.

What is Yukta Vairagya?
Instead of artificially rejecting material items or professional skills, Yukta Vairagya teaches us to utilize everything—our intelligence, software engineering, financial acumen, leadership, and resources—in the service of the Supreme Lord and the upliftment of human society.

When your ambition is purified from selfish greed into selfless devotion, your career itself transforms into a daily spiritual offering (Seva). You work with the highest dedication and quality, yet remain completely free from greed, envy, and anxiety.`
  }
];

export default function BlogsYouthProgramPage() {
  const [activeCategory, setActiveCategory] = useState("All Youth Stories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<typeof YOUTH_BLOG_DATA[0] | null>(null);

  const filteredBlogs = useMemo(() => {
    return YOUTH_BLOG_DATA.filter(post => {
      const matchesCategory = activeCategory === "All Youth Stories" || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Navigation Header */}
      <FolkNavbar />

      {/* Clean White & Cream Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200 bg-gradient-to-b from-amber-50/70 via-white to-[#FDFCF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              Youth Empowerment & Transformation Stories
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              FOLK Youth Program{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                Blogs & Insights
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
              Real student transformation journeys, practical life hacks, stress mastery techniques, and timeless Vedic philosophy tailored for modern youth and young professionals.
            </p>

            {/* Instant Search Bar */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search youth blogs by topic, habit, or mentor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-300 shadow-md focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 outline-none transition-all text-slate-800 placeholder:text-slate-400 font-medium text-base sm:text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pill Filters */}
      <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          {YOUTH_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Youth Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Youth Stories Found</h3>
            <p className="text-slate-500 mb-6">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo; in this category.
            </p>
            <button
              onClick={() => { setActiveCategory("All Youth Stories"); setSearchQuery(""); }}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm transition-all shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <motion.article
                key={post.id}
                layoutId={`youth-post-${post.id}`}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {/* Image Banner */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-xs uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author & Action Footer */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                        {post.author.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-none mb-1">
                          {post.author.name}
                        </p>
                        <p className="text-[11px] font-medium text-slate-500 leading-none">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Story
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Article Reading Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative border border-slate-200"
            >
              {/* Sticky Modal Header */}
              <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    {selectedPost.readTime} &bull; {selectedPost.date}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Article Body */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                {/* Title & Author Header */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-6">
                    {selectedPost.title}
                  </h1>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold text-base flex items-center justify-center shadow-md">
                        {selectedPost.author.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">
                          {selectedPost.author.name}
                        </p>
                        <p className="text-xs font-medium text-slate-500">
                          {selectedPost.author.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-colors shadow-sm" title="Bookmark Story">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-colors shadow-sm" title="Share Story">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Article Typography Body */}
                <div className="prose prose-lg max-w-none text-slate-700 space-y-6 leading-relaxed font-normal">
                  {selectedPost.content.split('\n\n').map((para, idx) => {
                    if (para.startsWith('3. Weekly Practical Steps for Youth:') || para.startsWith('What Changed for Me Inside Out:') || para.startsWith('Practical Leadership Takeaways:') || para.startsWith('3 Steps to Effortless Early Rising:')) {
                      return (
                        <div key={idx} className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 my-6">
                          <h4 className="text-lg font-bold text-amber-900 mb-3">
                            {para.split('\n')[0]}
                          </h4>
                          <ul className="space-y-2.5 text-amber-800 text-base font-medium">
                            {para.split('\n').slice(1).map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <span>{item.replace('• ', '')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="text-base sm:text-lg leading-relaxed text-slate-700">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Bottom Action Cards inside Modal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col justify-between shadow-xl">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                        Sunday Youth Empowerment
                      </span>
                      <h4 className="text-lg font-bold mb-2">
                        Experience the Vibe in Person
                      </h4>
                      <p className="text-slate-300 text-xs mb-6">
                        Join 200+ vibrant youth every Sunday at HKM Dehradun for music, meditation, wisdom & feast.
                      </p>
                    </div>
                    <Link
                      href="/youth#highlights"
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all text-center"
                    >
                      Explore Sunday Program
                    </Link>
                  </div>

                  <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-slate-900 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
                        Personal 1-on-1 Guidance
                      </span>
                      <h4 className="text-lg font-bold mb-2">
                        Connect With a Life Coach
                      </h4>
                      <p className="text-slate-600 text-xs mb-6">
                        Get tailored mentorship to overcome academic stress, career dilemmas, and gain helicopter vision.
                      </p>
                    </div>
                    <Link
                      href="/life-coach"
                      className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all text-center"
                    >
                      Request a Mentor
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
