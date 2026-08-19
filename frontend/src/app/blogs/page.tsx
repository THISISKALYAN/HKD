"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_BLOGS } from '@/lib/mockBlogs';
import axios from '@/lib/axios';

// Categories will be generated dynamically

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [dbBlogs, setDbBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/cms/blogs');
        // Map db format to frontend format
        const fetchedBlogs = res.data.map((blog: any, index: number) => ({
          id: blog.slug || index.toString(),
          title: blog.title,
          category: blog.category || "All Articles",
          readTime: "5 min read", // Assuming standard
          date: new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          description: blog.excerpt,
          image: blog.coverImage || "/deepostav.webp",
          fullContent: blog.content,
          published: blog.published
        })).filter((b: any) => b.published !== false);
        
        setDbBlogs(fetchedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayedBlogs = (dbBlogs.length === 0 && !loading) ? MOCK_BLOGS.map((blog, idx) => ({
    id: blog.slug,
    title: blog.title,
    category: blog.category,
    readTime: blog.readTime,
    date: blog.createdAt,
    description: blog.excerpt,
    image: blog.coverImage || "/deepostav.webp",
    fullContent: blog.content
  })) : dbBlogs;

  const filteredBlogs = selectedCategory === "All Articles"
    ? displayedBlogs
    : displayedBlogs.filter(blog => blog.category === selectedCategory);

  const dynamicCategories = ["All Articles", ...Array.from(new Set(displayedBlogs.map(blog => blog.category).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      {/* Main Container */}
      <main className="flex-grow pt-8 sm:pt-12 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Page Header */}
          <div className="flex flex-col items-center text-center mb-12 relative">
            <div className="flex items-center gap-3 text-[#d4af37] mb-3">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">ARTICLES & INSIGHTS</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#3b2b2f] tracking-tight mb-4">
              Latest <span className="text-[#d4af37]">Blogs</span>
            </h1>
            <p className="text-[#5c5245] max-w-2xl text-[16px] leading-relaxed">
              Explore timeless Vedic wisdom, festival highlights, community updates, and spiritual insights from Hare Krishna Movement Dehradun.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
            {dynamicCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as string)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#0a3d73] text-white shadow-md'
                    : 'bg-white text-[#5c5245] hover:bg-[#f4efe6] border border-[#eae4d5]'
                }`}
              >
                {category as string}
              </button>
            ))}
          </div>

          {/* Blog Cards Grid — Index Page Style */}
          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0a3d73]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <motion.div
                key={blog.id}
                layoutId={`blog-card-${blog.id}`}
                onClick={() => setSelectedBlog(blog)}
                className="flex flex-col rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group font-card cursor-pointer bg-[#f8f9fa] hover:shadow-md transition-shadow"
              >
                {/* Image Section - Top Half */}
                <div className="w-full h-[220px] overflow-hidden relative">
                  <img
                    src={blog.image || blog.coverImage}
                    alt={blog.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/deepostav.webp';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Text Section - Bottom Half */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 text-center">
                  <div>
                    <h2 className="text-[22px] sm:text-[24px] font-bold leading-[1.3] text-[#111827] mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-[#6b7280] font-medium text-sm sm:text-[15px] leading-[1.6] line-clamp-3">
                      {blog.description || blog.excerpt}
                    </p>
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlog(blog);
                      }}
                      className="px-8 py-2.5 bg-white text-[#111827] font-bold text-[13px] uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Read
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}

        </div>
      </main>

      {/* Full Article Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-5xl mx-auto min-h-screen bg-white p-6 sm:p-10 lg:p-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[110] w-12 h-12 bg-gray-100/80 backdrop-blur hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold shadow-md transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Side-by-Side Full Article Layout (Text Left, Image Right) */}
              <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-12 items-start mt-4">
                {/* Left Side: Header + Full Article Content (Continuous) */}
                <div className="w-full lg:w-7/12 flex-grow">
                  <div className="mb-6">
                    <span className="text-[#ff7a59] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] block mb-3">
                      {selectedBlog.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181b] leading-tight mb-4">
                      {selectedBlog.title}
                    </h2>
                    <div className="text-sm text-[#71717a] font-medium flex items-center gap-3">
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-[#3f3f46] leading-relaxed whitespace-pre-line">
                    {selectedBlog.fullContent}
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="px-6 py-3 bg-[#18181b] hover:bg-black text-white font-semibold rounded-full text-sm transition-colors cursor-pointer"
                    >
                      Close Article
                    </button>
                  </div>
                </div>

                {/* Right Side: Sticky Image - Pure Image, No Empty White Box */}
                <div className="w-full lg:w-5/12 flex-shrink-0 lg:sticky lg:top-8 flex justify-center lg:justify-end items-start">
                  <img
                    src={selectedBlog.image || selectedBlog.coverImage}
                    alt={selectedBlog.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/deepostav.webp';
                    }}
                    className="max-w-full max-h-[550px] w-auto h-auto rounded-2xl shadow-md"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
