"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Download, Calendar, Mail, FileText, HardDrive, Users, Activity, Truck, Package, Clock, Send, CheckCircle2, ChevronDown, X } from 'lucide-react';
import axios from '@/lib/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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
  totalPrasadamRequests?: number;
  pendingDeliveries?: number;
  outForDelivery?: number;
  delivered?: number;
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
  
  const [timeframe, setTimeframe] = useState('All Time');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getQueryDates = () => {
    let start = '';
    let end = '';
    const now = new Date();
    
    if (timeframe === 'Today') {
      start = new Date(now.setHours(0,0,0,0)).toISOString();
      end = new Date(now.setHours(23,59,59,999)).toISOString();
    } else if (timeframe === 'This Week') {
      const first = now.getDate() - now.getDay();
      start = new Date(new Date(now.setDate(first)).setHours(0,0,0,0)).toISOString();
      end = new Date(new Date(now.setDate(first + 6)).setHours(23,59,59,999)).toISOString();
    } else if (timeframe === 'This Month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();
    } else if (timeframe === 'Custom') {
      start = customStartDate ? new Date(customStartDate).toISOString() : '';
      end = customEndDate ? new Date(customEndDate + 'T23:59:59.999Z').toISOString() : '';
    }
    
    return { start, end };
  };

  const fetchData = React.useCallback(async () => {
    if (!token) return;
    try {
      const { start, end } = getQueryDates();
      let query = '';
      if (start || end) {
        query = `?startDate=${start}&endDate=${end}`;
      }
      
      const [statsRes, logsRes, leadsRes] = await Promise.all([
        axios.get(`/api/cms/dashboard-stats${query}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/cms/logs${query}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
        axios.get(`/api/cms/leads${query}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] }))
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
  }, [token, timeframe, customStartDate, customEndDate]);

  useEffect(() => {
    fetchData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

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

  const handleExportData = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Dashboard Overview Report', 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Timeframe: ${timeframe}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [['Metric', 'Value']],
      body: [
        ['Total Inquiries', stats?.totalInquiries || 0],
        ['Total Blogs', stats?.totalBlogs || 0],
        ['Prasadam Orders', stats?.totalPrasadamRequests || 0],
        ['Pending Deliveries', stats?.pendingDeliveries || 0],
        ['Dispatched Deliveries', stats?.outForDelivery || 0],
        ['Delivered', stats?.delivered || 0],
        ['Storage Used', formatBytes(stats?.storageUsed || 0)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 75, 44] }
    });

    doc.save(`dashboard_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const getDateDisplay = () => {
    if (timeframe === 'All Time') return 'All Time';
    if (timeframe === 'Custom') {
      if (customStartDate && customEndDate) return `${new Date(customStartDate).toLocaleDateString()} - ${new Date(customEndDate).toLocaleDateString()}`;
      return 'Custom Range';
    }
    return timeframe;
  };

  return (
    <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans pt-4">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-base font-medium text-gray-500 mt-1">Hare Krishna, {user?.name}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 relative">
          <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700 cursor-default">
            <Calendar className="w-4 h-4 text-gray-400" />
            {getDateDisplay()}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700"
            >
              {timeframe}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {isTimeframeOpen && (
              <div className="absolute top-full mt-2 right-0 w-40 bg-white border border-gray-200 shadow-lg rounded-xl z-50 py-2">
                {['All Time', 'Today', 'This Week', 'This Month', 'Custom'].map(t => (
                  <button 
                    key={t}
                    onClick={() => { setTimeframe(t); setIsTimeframeOpen(false); if (t !== 'Custom') { setCustomStartDate(''); setCustomEndDate(''); } }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${timeframe === t ? 'font-bold text-[#004B2C] bg-green-50' : 'text-gray-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsFilterOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-6">Custom Date Range</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                <input 
                  type="date" 
                  value={customStartDate} 
                  onChange={e => setCustomStartDate(e.target.value)} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                <input 
                  type="date" 
                  value={customEndDate} 
                  onChange={e => setCustomEndDate(e.target.value)} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2" 
                />
              </div>
            </div>
            <button 
              onClick={() => { setTimeframe('Custom'); setIsFilterOpen(false); }}
              className="w-full bg-[#004B2C] text-white font-bold py-3 rounded-xl hover:bg-[#003B22] transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-[16px] border border-red-200 mb-6 shadow-sm font-medium text-sm">
          {error}
        </div>
      )}

      {/* Quick Shortcuts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Prasadam Delivery', href: '/admin/prasadam', icon: Truck, color: 'bg-orange-50/80 text-orange-700 border-orange-200/60 hover:bg-orange-100/80' },
          { label: 'Manage Blogs', href: '/admin/blogs', icon: FileText, color: 'bg-blue-50/80 text-blue-700 border-blue-200/60 hover:bg-blue-100/80' },
          { label: 'View Inquiries', href: '/admin/leads', icon: Users, color: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/80' },
          { label: 'Folk Gallery', href: '/admin/folk-gallery', icon: HardDrive, color: 'bg-purple-50/80 text-purple-700 border-purple-200/60 hover:bg-purple-100/80' }
        ].map((action, i) => (
          <a
            key={i}
            href={action.href}
            className="bg-white border border-gray-200/80 hover:border-gray-300 p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className={`p-2.5 rounded-xl border transition-colors ${action.color}`}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-gray-800 group-hover:text-gray-900">{action.label}</span>
          </a>
        ))}
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Total Prasadam Requests */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-orange-100/80 rounded-2xl border border-orange-200/60 text-orange-700">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Prasadam Orders</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.totalPrasadamRequests || 0}</h2>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-yellow-100/80 rounded-2xl border border-yellow-200/60 text-yellow-700">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Pending</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.pendingDeliveries || 0}</h2>
          </div>
        </div>

        {/* Out for Delivery */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-blue-100/80 rounded-2xl border border-blue-200/60 text-blue-700">
                <Send className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Dispatched</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.outForDelivery || 0}</h2>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-green-100/80 rounded-2xl border border-green-200/60 text-green-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Delivered</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.delivered || 0}</h2>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 text-gray-700">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Total Inquiries</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.totalInquiries || 0}</h2>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 text-gray-700">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Total Blogs</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats?.totalBlogs || 0}</h2>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 text-gray-700">
                <HardDrive className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-500">Storage Used</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 relative z-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{formatBytes(stats?.storageUsed || 0)}</h2>
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
