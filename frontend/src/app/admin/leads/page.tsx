"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2 } from 'lucide-react';
import axios from '@/lib/axios';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestType: string;
  targetId: string;
  message?: string;
  createdAt: { _seconds: number; _nanoseconds: number } | string;
};

export default function LeadsDashboard() {
  const { token } = useCms();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    
    const fetchLeads = async () => {
      try {
        const res = await axios.get('/api/cms/leads', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLeads(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load leads.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, [token]);

  const formatDate = (dateObj: any) => {
    if (!dateObj) return 'N/A';
    if (dateObj._seconds) {
      return new Date(dateObj._seconds * 1000).toLocaleString();
    }
    return new Date(dateObj).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#004B2C]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Inquiries & Leads</h1>
        <p className="text-sm font-medium text-gray-500">View and manage all contact requests and volunteer signups.</p>
      </div>
      
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Interest / Target</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{lead.email}</div>
                    <div className="text-gray-500 font-medium text-xs mt-0.5">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-gray-100 text-gray-700 text-[10px] px-2.5 py-1 rounded-[8px] font-bold uppercase tracking-wider mb-1.5 border border-gray-200">
                      {lead.interestType}
                    </span>
                    <br />
                    <span className="text-gray-500 font-medium text-xs">{lead.targetId}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium text-xs whitespace-nowrap">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600 max-w-xs truncate" title={lead.message}>
                    {lead.message || '-'}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
