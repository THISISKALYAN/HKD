"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { apiService } from "@/services/api";
import Link from "next/link";

interface DonationDetails {
  orderId: string;
  paymentId: string;
  donorName: string;
  sevaCategory: string;
  amount: number;
  status: string;
  createdAt: { _seconds: number } | string;
  completedAt: { _seconds: number } | string;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [details, setDetails] = useState<DonationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No Order ID provided.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const data = await apiService.getDonationDetails(orderId);
        setDetails(data);
      } catch (err) {
        console.error(err);
        setError("Could not load donation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans text-[#0A0A0A]">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-[#c89b27]/30 border-t-[#c89b27] rounded-full animate-spin"></span>
          <p className="text-gray-500 font-medium">Loading your receipt...</p>
        </div>
      </main>
    );
  }

  if (error || !details) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans text-[#0A0A0A] p-6">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-red-100 max-w-lg w-full text-center">
          <svg className="w-16 h-16 mx-auto text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error || "Could not retrieve donation details."}</p>
          <Link href="/donate" className="bg-[#f38312] hover:bg-[#d9710b] text-white font-bold py-3.5 px-8 rounded-full transition-colors inline-block shadow-md hover:shadow-lg">
            Return to Donations
          </Link>
        </div>
      </main>
    );
  }

  const dateStr = details.createdAt
    ? new Date(
        typeof details.createdAt === 'object' && '_seconds' in details.createdAt 
          ? details.createdAt._seconds * 1000 
          : details.createdAt
      ).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    : new Date().toLocaleDateString('en-IN');

  const receiptUrl = apiService.getReceiptUrl(details.orderId);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-white py-12 px-6 sm:px-12 flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-[#eee8d7] flex flex-col">
          
          {/* Header */}
          <div className="bg-[#051937] text-white px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
              <svg width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="currentColor"/></svg>
            </div>
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 text-white mb-6 shadow-[0_0_20px_rgba(34,197,94,0.4)] relative z-10">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 relative z-10">
              Thank You!
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-medium relative z-10">
              Your payment was completely successful.
            </p>
          </div>

          {/* Details Body */}
          <div className="p-8 sm:p-12 relative bg-white">
            
            <div className="text-center mb-10">
              <p className="text-gray-600 text-[17px] leading-relaxed mb-1">
                Dear <span className="font-bold text-gray-900">{details.donorName}</span>,
              </p>
              <p className="text-gray-600 text-[17px] leading-relaxed">
                Thank you for your generous contribution towards <span className="font-bold text-[#c89b27]">{details.sevaCategory}</span>.
              </p>
            </div>

            <div className="bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl p-6 sm:p-8 space-y-4 mb-10">
              
              <div className="flex justify-between items-center py-2 border-b border-[#e8dfc8]/50">
                <span className="text-gray-500 font-medium">Amount Donated</span>
                <span className="text-xl font-bold text-[#f38312]">₹ {details.amount.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-[#e8dfc8]/50">
                <span className="text-gray-500 font-medium">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {details.status}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#e8dfc8]/50">
                <span className="text-gray-500 font-medium">Order ID</span>
                <span className="text-gray-900 font-mono text-sm">{details.orderId}</span>
              </div>

              {details.paymentId && (
                <div className="flex justify-between items-center py-2 border-b border-[#e8dfc8]/50">
                  <span className="text-gray-500 font-medium">Payment ID</span>
                  <span className="text-gray-900 font-mono text-sm">{details.paymentId}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500 font-medium">Date & Time</span>
                <span className="text-gray-900 text-sm">{dateStr}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={receiptUrl}
                download
                className="flex items-center justify-center gap-2 bg-[#f38312] hover:bg-[#d9710b] text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_8px_20px_rgba(243,131,18,0.25)] hover:shadow-[0_12px_25px_rgba(243,131,18,0.35)] hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Receipt PDF
              </a>
              <Link
                href="/donate"
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-full transition-all"
              >
                Explore More Sevas
              </Link>
            </div>

          </div>
        </div>
      </motion.div>

    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans text-[#0A0A0A]">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-[#c89b27]/30 border-t-[#c89b27] rounded-full animate-spin"></span>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
