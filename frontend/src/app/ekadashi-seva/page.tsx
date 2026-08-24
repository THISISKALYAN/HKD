"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { apiService } from "@/services/api";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/validation";

export default function EkadashiSevaPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [claim80G, setClaim80G] = useState(false);
  const [receivePrasadam, setReceivePrasadam] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [prasadamInfo, setPrasadamInfo] = useState({ address: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch prasadam info
    apiService.fetchCmsPage('prasadam').then(res => {
      if (res) {
        setPrasadamInfo({ address: res.deliveryAddress || '', phone: res.phoneNumber || '' });
      }
    }).catch(console.error);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  const predefinedAmounts = [
    { id: "gauPoshana", label: "Gau Poshana Seva", value: 501, img: "https://hkmdehradun.org/live-site/assets/12/gau-home.png" },
    { id: "cowMedicines", label: "Cow Medicines", value: 2501, img: "https://hkmdehradun.org/live-site/assets/12/gau-3.png" },
    { id: "annadaan", label: "Annadaan Seva", value: 551, img: "https://hkmdehradun.org/live-site/assets/12/annadanam.jpeg" },
    { id: "brahmanBhojan", label: "Brahman Bhojan", value: 1001, img: "https://hkmdehradun.org/live-site/assets/12/annadaan-1.png" },
    { id: "havan", label: "Nitya Narasimha Havan", value: 1501, img: "https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png" },
    { id: "aradhana", label: "Sri Vigraha Aradhana", value: 2101, img: "https://hkmdehradun.org/live-site/assets/12/annadaan-2.png" },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalAmount = predefinedAmounts.reduce((sum, item) => {
    return sum + (quantities[item.id] || 0) * item.value;
  }, 0) + (parseInt(customAmount) || 0);

  const getSelectedSevaLabel = () => {
    const sevas = predefinedAmounts
      .filter(item => (quantities[item.id] || 0) > 0)
      .map(item => `${item.label} x${quantities[item.id]}`);
    if (customAmount) sevas.push(`Custom (₹${customAmount})`);
    return sevas.length > 0 ? sevas.join(", ") : "Select a Seva";
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalAmount = totalAmount;

    if (finalAmount < 1 || finalAmount > 500000) {
      alert("Please enter a donation amount between ₹1 and ₹5,00,000");
      setLoading(false);
      return;
    }

    if (!isValidName(formData.name) || !isValidEmail(formData.email) || !isValidPhone(formData.phone)) {
      alert("Please provide a valid name, email, and phone number.");
      setLoading(false);
      return;
    }

    try {
      const orderData = await apiService.createPaymentOrder({
        amount: finalAmount,
        currency: "INR",
        receipt: `receipt_ekadashi_${Date.now()}`,
        donorName: formData.name,
        email: formData.email,
        phone: formData.phone,
        panNumber: formData.pan,
        sevaCategory: getSelectedSevaLabel(),
        receivePrasadam,
        deliveryAddress: receivePrasadam ? deliveryAddress : null
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // No hardcoded fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Hare Krishna Movement Dehradun",
        description: "Ekadashi Seva Donation",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorData: {
                ...formData,
                amount: finalAmount,
                sevaCategory: getSelectedSevaLabel(),
                receivePrasadam,
                deliveryAddress: receivePrasadam ? deliveryAddress : null
              }
            });
            alert("Payment Successful! Thank you for your Ekadashi Seva.");
            setFormData({ name: "", email: "", phone: "", pan: "" });
            setDeliveryAddress({ line1: "", line2: "", city: "", state: "", pincode: "" });
            setCustomAmount("");
            setQuantities({});
          } catch (err) {
            console.error(err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0A0A0A",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      if ((error as any).response && (error as any).response.data && (error as any).response.data.error) {
        alert((error as any).response.data.error);
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-white relative z-0">
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <section className="relative overflow-hidden z-10 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Decorative Tag */}
          <div className="flex items-center gap-3 text-[#d4af37] mb-2">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">HARE KRISHNA MOVEMENT DEHRADUN</span>
            <div className="h-px w-10 bg-current"></div>
          </div>

          {/* Page Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-3">
            Contribute To <span className="text-[#d4af37]">Ekadashi-Seva</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 max-w-2xl text-[16px] sm:text-[18px] leading-relaxed font-medium mb-8">
            Ekadashi is the day of immense spiritual merit. Perform sacred sevas to earn eternal blessings of Lord Krishna.
          </p>

          {/* Hero Banner Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#eae4d5]"
          >
            <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png" 
              alt="Ekadashi Seva Banner" 
              className="w-full h-auto object-cover max-h-[350px] sm:max-h-[440px] md:max-h-[500px]"
            />
          </motion.div>
        </div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────────── */}
      <section className="px-6 sm:px-10 max-w-[1200px] mx-auto border-b border-gray-100 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <svg className="w-8 h-8 text-[#d4af37] mb-3 opacity-60" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8.6c.8-2 2.7-3.4 4.9-3.9V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-5.4c.8-2 2.7-3.4 4.9-3.9V8z"/>
          </svg>
          <p className="text-base sm:text-lg font-serif text-gray-800 leading-relaxed mb-2">
            "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे। देशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम्॥"
          </p>
          <p className="text-sm sm:text-base font-serif text-gray-600 mb-4">
            "Charity given out of duty, without expectation of return, at the proper time and place, is considered pure (Sattvic)."
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#d4af37]">
            — Bhagavad Gita 17.20
          </p>
        </div>
      </section>

      {/* ── SIGNIFICANCE & SEVAS SECTION ──────────────────── */}
      <section className="px-6 sm:px-12 max-w-[1440px] mx-auto border-b border-gray-100 py-8 md:py-12">
        <div className="flex items-center justify-center gap-3.5 mb-4 text-center">
          <span className="h-10 w-2 bg-[#c89b27] rounded-full"></span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#051937] tracking-tight">
            Blessings Multiply on <span className="text-[#c89b27]">Ekadashi</span>
          </h2>
        </div>
        <p className="text-[#556377] text-base sm:text-lg mb-12 text-center max-w-3xl mx-auto font-normal leading-relaxed">
          Ekadashi is a holy day dedicated to fasting, prayers, and noble charity. At Hare Krishna Movement Dehradun, we perform special sevas to shower Lord Krishna's divine mercy upon donors.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Gau Poshana */}
          <div className="bg-white rounded-[32px] p-6 border border-[#eee8d7] shadow-[0_6px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c89b27]"></span>
                <h3 className="text-lg font-bold text-[#051937]">1. Gau Poshana Seva</h3>
              </div>
              <p className="text-[#4a5568] text-sm leading-relaxed font-medium mb-4">
                Cows are revered as Gaumata in Vedic tradition. Supporting Gau Seva on Ekadashi yields immense spiritual merit and divine protection.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#e8dfc8] bg-[#fffcf5] flex items-center justify-center p-2">
              <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/12/gau-home.png" 
                alt="Gau Poshana" 
                className="w-full h-auto object-cover max-h-[160px] rounded-xl"
              />
            </div>
          </div>

          {/* Card 2: Khichdi Prasadam */}
          <div className="bg-white rounded-[32px] p-6 border border-[#eee8d7] shadow-[0_6px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c89b27]"></span>
                <h3 className="text-lg font-bold text-[#051937]">2. Khichdi Prasadam Seva</h3>
              </div>
              <p className="text-[#4a5568] text-sm leading-relaxed font-medium mb-4">
                Distributing hot, sanctified meals to thousands of visiting pilgrims and underprivileged souls on the holy occasion of Ekadashi.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#e8dfc8] bg-[#fffcf5] flex items-center justify-center p-2">
              <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/12/annadanam.jpeg" 
                alt="Khichdi Prasadam" 
                className="w-full h-auto object-cover max-h-[160px] rounded-xl"
              />
            </div>
          </div>

          {/* Card 3: Nitya Bhog & Aradhana */}
          <div className="bg-white rounded-[32px] p-6 border border-[#eee8d7] shadow-[0_6px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c89b27]"></span>
                <h3 className="text-lg font-bold text-[#051937]">3. Sri Vigraha Aradhana</h3>
              </div>
              <p className="text-[#4a5568] text-sm leading-relaxed font-medium mb-4">
                Offering fresh bhoga, flowers, and elaborate aradhana to Sri Sri Nitai Gauranga for the spiritual well-being of your entire family.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#e8dfc8] bg-[#fffcf5] flex items-center justify-center p-2">
              <img loading="lazy" src="https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png" 
                alt="Sri Vigraha Aradhana" 
                className="w-full h-auto object-cover max-h-[160px] rounded-xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── DONATION FORM SECTION (FULL WIDTH CENTERED) ──────────────── */}
      <section className="px-6 sm:px-12 max-w-[1440px] mx-auto border-b border-gray-100 py-8 md:py-12">
        <div className="flex justify-center">
          
          <div className="w-full max-w-2xl relative">
            <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-2xl border border-[#c89b27]/30">
              
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#051937] tracking-tight">
                  Contribute To <span className="text-[#c89b27]">Ekadashi-Seva</span>
                </h2>
              </div>
              
              <form onSubmit={handlePayment} className="space-y-6">

                {/* PAN Banner */}
                <div className="bg-[#051937] text-white text-center py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm shadow-md tracking-wider">
                  HARE KRISHNA MOVEMENT DEHRADUN • PAN NO: AAAAH0992Q
                </div>
                
                {/* Total Amount Indicator */}
                <div className="bg-[#fffcf5] border-2 border-[#c89b27] rounded-2xl p-4 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4a5568]">Total Donation Amount:</span>
                  <div className="text-3xl font-extrabold text-[#c89b27] mt-0.5">
                    ₹ {totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Seva Selection List with Clean Counters */}
                <div className="space-y-3">
                  {predefinedAmounts.map((opt) => (
                    <div 
                      key={opt.id}
                      className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                        (quantities[opt.id] || 0) > 0 
                          ? "border-[#c89b27] bg-[#fffcf5] shadow-md transform scale-[1.01]"
                          : "border-[#eee8d7] bg-[#fbf9f4] hover:border-[#c89b27]/50 hover:bg-[#fffcf5]"
                      }`}
                    >
                      <div>
                        <h4 className={`font-semibold text-base transition-colors ${(quantities[opt.id] || 0) > 0 ? "text-[#051937]" : "text-gray-700"}`}>
                          {opt.label}
                        </h4>
                        <span className={`font-extrabold text-lg transition-colors ${(quantities[opt.id] || 0) > 0 ? "text-[#c89b27]" : "text-[#051937]"}`}>
                          ₹ {opt.value.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(opt.id, -1)}
                          className="w-9 h-9 rounded-full bg-white border-2 border-[#e8dfc8] hover:bg-[#c89b27] hover:border-[#c89b27] hover:text-white text-[#051937] font-bold text-base transition-colors flex items-center justify-center shadow-sm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-extrabold text-lg text-[#051937]">
                          {quantities[opt.id] || 0}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(opt.id, 1)}
                          className="w-9 h-9 rounded-full bg-white border-2 border-[#e8dfc8] hover:bg-[#c89b27] hover:border-[#c89b27] hover:text-white text-[#051937] font-bold text-base transition-colors flex items-center justify-center shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <input
                  type="number"
                    min="1"
                    max="500000"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+" || e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  placeholder="Enter Custom / Additional Amount"
                  value={customAmount}
                  onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setCustomAmount("");
                        return;
                      }
                      const num = parseInt(val, 10);
                      if (num < 1) {
                        setCustomAmount("1");
                      } else if (num > 500000) {
                        setCustomAmount("500000");
                      } else {
                        setCustomAmount(num.toString());
                      }
                    }}
                  className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3.5 text-[#051937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c89b27]"
                />

                {/* Seva Dynamic Indicator */}
                <div className="text-gray-600 text-xs sm:text-sm font-medium px-1">
                  Selected Seva(s): <span className="font-bold text-[#c89b27]">{getSelectedSevaLabel()}</span>
                </div>

                {/* User Details */}
                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3.5 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3.5 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3.5 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27]"
                  />
                  {claim80G && (
                    <input
                      type="text"
                      required
                      placeholder="PAN Card Number"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                      className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3.5 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27] uppercase"
                    />
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={claim80G}
                      onChange={(e) => setClaim80G(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#c89b27] focus:ring-[#c89b27]"
                    />
                    <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors">Claim 80G Certificate</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={receivePrasadam}
                      onChange={(e) => setReceivePrasadam(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#c89b27] focus:ring-[#c89b27]"
                    />
                    <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors">Receive Prasadam (only in India)</span>
                  </label>
                </div>


                {/* Delivery Address Form */}
                <AnimatePresence>
                  {receivePrasadam && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-4 pt-2 border-t border-[#e8dfc8]"
                    >
                      <h4 className="font-bold text-[#051937] text-sm">Delivery Address</h4>
                      <input
                        type="text"
                        required={receivePrasadam}
                        placeholder="Address Line 1"
                        value={deliveryAddress.line1}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, line1: e.target.value })}
                        className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27] text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Address Line 2 (Optional)"
                        value={deliveryAddress.line2}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, line2: e.target.value })}
                        className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27] text-sm"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          required={receivePrasadam}
                          placeholder="City"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                          className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27] text-sm"
                        />
                        <input
                          type="text"
                          required={receivePrasadam}
                          placeholder="State"
                          value={deliveryAddress.state}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                          className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27] text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        required={receivePrasadam}
                        placeholder="Pincode"
                        value={deliveryAddress.pincode}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                        className="w-full bg-[#fbf9f4] border border-[#e8dfc8] rounded-2xl px-5 py-3 text-[#051937] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b27] text-sm"
                      />
                      
                      {/* CMS Prasadam Info */}
                      {(prasadamInfo.address || prasadamInfo.phone) && (
                        <div className="bg-[#fffcf5] border border-[#f0e4c8] p-3 rounded-xl text-xs text-gray-600 leading-relaxed mt-2">
                          <p className="font-semibold text-[#c89b27] mb-1">Prasadam Support Details</p>
                          {prasadamInfo.address && <p><span className="font-medium text-gray-700">Dispatch Location:</span> {prasadamInfo.address}</p>}
                          {prasadamInfo.phone && <p><span className="font-medium text-gray-700">Support Phone:</span> {prasadamInfo.phone}</p>}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || totalAmount === 0}
                  className="w-full py-4 mt-4 rounded-full bg-[#f38312] hover:bg-[#d9710b] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    `Donate ₹ ${totalAmount.toLocaleString('en-IN')}`
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ── IMAGE GALLERY ───────────────────────────────────── */}
      <section className="px-6 sm:px-10 max-w-[1440px] mx-auto py-8 md:py-12">
        <div className="flex items-center justify-center gap-3.5 mb-3 text-center">
          <span className="h-8 w-1.5 bg-[#c89b27] rounded-full"></span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#051937] tracking-tight">
            Gallery of <span className="text-[#c89b27]">Ekadashi-Seva</span>
          </h2>
        </div>
        <p className="text-[#556377] text-sm sm:text-base mb-10 text-center max-w-2xl mx-auto font-normal leading-relaxed">
          Spiritual highlights, deity worship, and Gau Seva on Ekadashi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            "https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png",
            "https://hkmdehradun.org/live-site/assets/12/gau-home.png",
            "https://hkmdehradun.org/live-site/assets/12/annadanam.jpeg",
            "https://hkmdehradun.org/live-site/assets/12/annadaan-1.png",
            "https://hkmdehradun.org/live-site/assets/12/annadaan-2.png",
            "https://hkmdehradun.org/live-site/assets/12/gau-3.png"
          ].map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => setActiveImage(src)}
              className="relative overflow-hidden rounded-2xl aspect-[16/9] shadow-sm cursor-pointer group border border-[#e8dfc8] bg-[#fffcf5] p-2 flex items-center justify-center"
            >
              <img loading="lazy" src={src} 
                alt={`Ekadashi Seva ${idx + 1}`} 
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                <div className="bg-[#051937]/80 text-white p-3 rounded-full shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FULL SCREEN IMAGE LIGHTBOX MODAL ────────────────── */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
          >
            {/* Top Right Floating Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="fixed top-5 right-5 sm:top-8 sm:right-8 text-white bg-black/60 hover:bg-black/90 border border-white/20 rounded-full p-3.5 transition-all z-[100000] shadow-2xl hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer"
              aria-label="Close full screen image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">Close</span>
            </button>

            {/* Image Wrapper */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-white p-2.5 sm:p-3 border border-white/20 cursor-default flex items-center justify-center"
            >
              <img loading="lazy" src={activeImage} 
                alt="Full View" 
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
