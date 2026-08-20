"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Package, Search, Download, ExternalLink, Calendar, Phone, MapPin, Truck } from 'lucide-react';
import axios from '@/lib/axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function PrasadamDeliveryCmsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/cms/prasadam-requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch prasadam requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);
      await axios.put(`/api/cms/prasadam-requests/${orderId}/status`, { deliveryStatus: newStatus });
      
      setRequests(prev => prev.map(req => 
        req.id === orderId ? { ...req, deliveryStatus: newStatus } : req
      ));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update delivery status.');
    } finally {
      setUpdating(null);
    }
  };

  const formatAddress = (addr: any) => {
    if (!addr) return 'No Address Provided';
    const parts = [addr.line1, addr.line2, addr.city, addr.state, addr.pincode].filter(Boolean);
    return parts.join(', ');
  };

  const filteredRequests = requests.filter(req => 
    req.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.phone?.includes(searchTerm) ||
    formatAddress(req.deliveryAddress).toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToPdf = () => {
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(20);
    doc.text('Prasadam Delivery Requests', 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Total Records: ${filteredRequests.length}`, 14, 36);

    const tableColumn = ["Order ID", "Customer Name", "Phone Number", "Delivery Address", "Status", "Date"];
    const tableRows: any[] = [];

    filteredRequests.forEach(req => {
      const dateObj = req.createdAt ? new Date(req.createdAt._seconds ? req.createdAt._seconds * 1000 : req.createdAt) : new Date();
      const rowData = [
        req.id,
        req.donorName || 'N/A',
        req.phone || 'N/A',
        formatAddress(req.deliveryAddress),
        req.deliveryStatus || 'Pending',
        dateObj.toLocaleDateString()
      ];
      tableRows.push(rowData);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [7, 33, 73], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 40 }
    });

    doc.save(`Prasadam_Deliveries_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="px-4 sm:px-6 max-w-[1400px] mx-auto pb-20 font-sans pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#072149] tracking-tight flex items-center gap-3">
            <Truck className="w-8 h-8 text-[#c89b27]" /> Prasadam Delivery
          </h1>
          <p className="text-gray-500 mt-2 text-base max-w-2xl">
            Manage customer requests for Prasadam delivery and track their dispatch statuses.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers, phone, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c89b27] focus:border-transparent outline-none w-full sm:w-64 text-sm"
            />
          </div>
          <button
            onClick={exportToPdf}
            className="bg-[#072149] hover:bg-[#0a2e66] text-white px-4 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap text-sm shadow-sm"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Delivery Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Donation Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#c89b27] mx-auto mb-4" />
                    <p className="text-gray-500">Loading delivery requests...</p>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-lg font-medium text-gray-900 mb-1">No requests found</p>
                    <p>There are currently no prasadam delivery requests matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 mb-1">{req.donorName || 'N/A'}</div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Phone className="w-3.5 h-3.5" /> {req.phone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed line-clamp-3" title={formatAddress(req.deliveryAddress)}>
                          {formatAddress(req.deliveryAddress)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={req.deliveryStatus || 'Pending'}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          disabled={updating === req.id}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border appearance-none cursor-pointer outline-none transition-colors pr-8 relative ${getStatusColor(req.deliveryStatus || 'Pending')} ${updating === req.id ? 'opacity-50 cursor-wait' : ''}`}
                          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        {updating === req.id && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 mb-1">₹{req.amount} - {req.sevaCategory}</div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" /> 
                        {req.createdAt ? new Date(req.createdAt._seconds ? req.createdAt._seconds * 1000 : req.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 font-mono">{req.id}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
