"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, Plus, X } from 'lucide-react';
import axios from '@/lib/axios';

type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  createdAt: any;
  published: boolean;
};

export default function BlogsDashboard() {
  const { token } = useCms();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    excerpt: '',
    content: ''
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/cms/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setCreating(true);
    try {
      await axios.post('/api/cms/blogs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setFormData({ title: '', authorName: '', excerpt: '', content: '' });
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('Error creating blog post.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await axios.delete(`/api/cms/blogs/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('Error deleting blog post.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#004B2C]" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Manage Blogs</h1>
          <p className="text-sm font-medium text-gray-500">Publish and manage articles and temple updates.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-[12px] font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Article</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.slug} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-200 flex flex-col h-full group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{blog.title}</h3>
              <span className={`px-2.5 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-wider border ${blog.published ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                {blog.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-gray-500 font-medium text-sm mb-6 flex-grow leading-relaxed">{blog.excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">By {blog.authorName}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDelete(blog.slug)}
                  className="text-red-500 font-bold text-xs hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
                <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-xs hover:text-blue-700 transition-colors">
                  View Article &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative my-8 border border-gray-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all rounded-xl p-1.5"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black tracking-tight text-gray-900 mb-6">Create New Article</h2>
            
            <form onSubmit={handleCreateSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all"
                  placeholder="Article Title"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Author Name</label>
                <input
                  required
                  type="text"
                  value={formData.authorName}
                  onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all"
                  placeholder="E.g. Swami Gopalananda"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all"
                  placeholder="Short description for preview..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Content (HTML/Markdown)</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none font-mono text-[13px] transition-all"
                  placeholder="<p>Write your article here...</p>"
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-[12px] text-sm font-bold hover:bg-gray-800 transition-all disabled:opacity-50 shadow-sm"
                >
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{creating ? 'Publishing...' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
