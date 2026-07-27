"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, Download, Trash2, X } from 'lucide-react';
import axios from '@/lib/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
  
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

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

  const exportToExcel = () => {
    const exportData = leads.map(lead => ({
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      'Interest Type': lead.interestType,
      Target: lead.targetId,
      Date: formatDate(lead.createdAt),
      Message: lead.message || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
    XLSX.writeFile(workbook, "Inquiries.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Inquiries & Leads", 14, 15);
    
    const tableColumn = ["Name", "Contact Info", "Interest", "Date", "Message"];
    const tableRows = leads.map(lead => [
      lead.name,
      `${lead.email}\n${lead.phone}`,
      `${lead.interestType}\n${lead.targetId}`,
      formatDate(lead.createdAt),
      lead.message || '-'
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [0, 75, 44] }
    });
    
    doc.save("Inquiries.pdf");
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteLeadId || !deletePassword) return;

    setDeleteLoading(true);
    setDeleteError('');

    try {
      await axios.delete(`/api/cms/leads/${deleteLeadId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { password: deletePassword }
      });
      setLeads(leads.filter(l => l.id !== deleteLeadId));
      setDeleteLeadId(null);
      setDeletePassword('');
    } catch (err: any) {
      console.error(err);
      setDeleteError(err.response?.data?.error || 'Failed to delete inquiry.');
    } finally {
      setDeleteLoading(false);
    }
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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Inquiries & Leads</h1>
          <p className="text-sm font-medium text-gray-500">View and manage all contact requests and volunteer signups.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors rounded-[10px] px-4 py-2 text-sm font-bold border border-gray-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 transition-colors rounded-[10px] px-4 py-2 text-sm font-bold border border-green-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
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
                <th className="px-6 py-4 text-right">Actions</th>
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
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setDeleteLeadId(lead.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {deleteLeadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Delete Inquiry</h2>
              <button onClick={() => { setDeleteLeadId(null); setDeletePassword(''); setDeleteError(''); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleDelete} className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-6">
                Are you sure you want to delete this inquiry? This action cannot be undone. Please enter your password to confirm.
              </p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#004B2C]/20 focus:border-[#004B2C] outline-none text-sm transition-all"
                  placeholder="Enter your password"
                />
              </div>

              {deleteError && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                  {deleteError}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setDeleteLeadId(null); setDeletePassword(''); setDeleteError(''); }}
                  className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
                  disabled={deleteLoading || !deletePassword}
                >
                  {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {deleteLoading ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
