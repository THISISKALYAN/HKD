"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Download, Calendar, Mail, FileText, HardDrive, Users, Activity } from 'lucide-react';
import axios from '@/lib/axios';

import dynamic from 'next/dynamic';

const AdminDashboardChart = dynamic(() => import('./AdminDashboardChart'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-gray-400">Loading chart...</div>
});

type DashboardStats = {
  totalLeads: number;
  totalInquiries: number;
  totalBlogs: number;
  totalDonations: number;
  totalStaff: number;
  totalHeroImages: number;
  totalTempleGallery: number;
  totalDailyDarshan: number;
  totalFolkGallery: number;
  totalReels: number;
  totalImagesUploaded: number;
  storageUsed: number;
};

type Log = {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  createdAt: { _seconds: number } | string;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  sourcePage: string;
  createdAt: { _seconds: number } | string;
};

export default function AdminDashboard() {
  const { token, user } = useCms();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = React.useCallback(async () => {
    if (!token) return;
    try {
      const [statsRes, logsRes, leadsRes] = await Promise.all([
        axios.get(`/api/cms/dashboard-stats`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/cms/logs`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
        axios.get(`/api/cms/leads`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] }))
      ]);
      
      setStats(statsRes.data);
      setLogs(logsRes.data.slice(0, 5)); // Just recent 5 for dashboard
      setLeads(leadsRes.data.slice(0, 5)); // Just recent 5 for dashboard
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [token, fetchData]);

  if (loading && !stats) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#004B2C]" />
      </div>
    );
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const formatDate = (dateObj: any) => {
    if (!dateObj) return 'N/A';
    if (typeof dateObj === 'string') return new Date(dateObj).toLocaleDateString();
    if (dateObj._seconds) return new Date(dateObj._seconds * 1000).toLocaleDateString();
    return 'N/A';
  };

  // Mock chart data derived from stats for the main BarChart
  const contentData = [
    { name: 'Oct', Hero: stats?.totalHeroImages ?? 0, Temple: stats?.totalTempleGallery ?? 0, Darshan: stats?.totalDailyDarshan ?? 0 },
    { name: 'Nov', Hero: 3, Temple: 35, Darshan: 15 },
    { name: 'Dec', Hero: 3, Temple: 40, Darshan: 20 },
  ];
  
  const totalItems = (stats?.totalHeroImages ?? 0) + (stats?.totalTempleGallery ?? 0) + (stats?.totalDailyDarshan ?? 0);

  return (
    <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans pt-4">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-base font-medium text-gray-500 mt-1">Welcome back, {user?.name}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400" />
            Oct 18 - Nov 18
          </button>
          
          <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700">
            Monthly
          </button>
          
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          
          <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          
          <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-[16px] border border-red-200 mb-6 shadow-sm font-medium text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white border border-gray-200 shadow-sm transition-all rounded-[24px] p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="p-2 bg-gray-50 rounded-[10px] border border-gray-100 text-gray-600">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Total Inquiries</span>
            </div>
            <button className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-end gap-3 mt-2 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.totalInquiries || 0}</h2>
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-[6px] text-sm font-bold mb-1.5">
              15.8% <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm transition-all rounded-[24px] p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="p-2 bg-gray-50 rounded-[10px] border border-gray-100 text-gray-600">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Total Blogs</span>
            </div>
            <button className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-end gap-3 mt-2 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.totalBlogs || 0}</h2>
            <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-[6px] text-sm font-bold mb-1.5">
              34.0% <ArrowDownRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm transition-all rounded-[24px] p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="p-2 bg-gray-50 rounded-[10px] border border-gray-100 text-gray-600">
                <HardDrive className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Storage Used</span>
            </div>
            <button className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-end gap-3 mt-2 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{formatBytes(stats?.storageUsed || 0)}</h2>
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-[6px] text-sm font-bold mb-1.5">
              24.2% <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="mb-8">
        {/* Main Bar Chart */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-6 w-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-gray-900">
              <div className="p-1.5 bg-gray-50 border border-gray-100 rounded-[8px]">
                <Activity className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-base font-bold">Content Overview</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[10px] px-3 py-1.5 text-sm font-bold text-gray-700">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">+{totalItems} items</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-green-700 text-sm font-bold bg-green-50 px-2 py-0.5 rounded-[6px]">
                15.8% <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="text-gray-500 text-sm font-medium">+14 items increased</span>
            </div>
          </div>

          <div className="flex-1 min-h-[350px] w-full">
            <AdminDashboardChart contentData={contentData} />
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#76bb76]"></div><span className="text-sm text-gray-500 font-bold">Hero Images</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#274724]"></div><span className="text-sm text-gray-500 font-bold">Temple Gallery</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-[#8b9b82] overflow-hidden relative"><div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #8b9b82 2px, #8b9b82 3px)' }}></div></div><span className="text-sm text-gray-500 font-bold">Daily Darshan</span></div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div>
        {/* Table */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-6 w-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-gray-900">
              <div className="p-1.5 bg-gray-50 border border-gray-100 rounded-[8px]">
                <Users className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-base font-bold">Recent Inquiries</span>
            </div>
            <a href="/admin/leads" className="text-base font-bold text-gray-600 hover:text-gray-900">
              See All
            </a>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-3 text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2">Name</th>
                  <th className="py-3 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Phone</th>
                  <th className="py-3 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Source</th>
                  <th className="py-3 text-[12px] font-bold text-gray-400 uppercase tracking-widest text-right pr-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500 font-medium text-base">No recent inquiries found.</td>
                  </tr>
                ) : (
                  leads.map((lead, idx) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-bold text-sm shadow-sm border ${idx % 2 === 0 ? 'bg-[#004B2C] text-white border-[#003820]' : 'bg-gray-800 text-white border-gray-900'}`}>
                            {lead.name ? lead.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <span className="text-base font-bold text-gray-900">{lead.name || 'Anonymous'}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-base font-medium text-gray-600">{lead.phone || 'N/A'}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-base font-medium text-gray-500 capitalize">{lead.sourcePage || 'General'}</span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <span className="text-base font-bold text-gray-900">
                          {formatDate(lead.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
