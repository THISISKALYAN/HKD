"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { apiService } from "@/services/api";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/validation";
import Link from "next/link";
import Script from "next/script";
import { ChevronLeft, Check, ShieldCheck, Heart } from "lucide-react";

export interface SevaItem {
  id: string;
  title: string;
  description: string;
  defaultAmount: number;
  image: string;
}

export interface FestivalSection {
  heading: string;
  quote?: string;
  paragraphs: string[];
  highlightPoints?: string[];
}

export interface FestivalData {
  slug: string;
  title: string;
  date: string;
  bannerSubtitle: string;
  heroBg: string;
  heroImage?: string;
  aboutText: string;
  sections?: FestivalSection[];
  sevas: SevaItem[];
}

export const FESTIVALS_DATA: Record<string, FestivalData> = {
  "sri-jagannatha-ratha-yatra": {
    slug: "sri-jagannatha-ratha-yatra",
    title: "SRI JAGANNATHA RATHA YATRA",
    date: "~ JULY 16, 2026 ~",
    bannerSubtitle: "Suna Besha Alankara | Vishesha Alankara | Vishesha Naivedya | Pushpa-vrishti | Annadana",
    heroBg: "from-[#4c166d] via-[#8d2a63] to-[#e4643b]",
    aboutText: "Sri Jagannatha Ratha Yatra is the grand chariot festival where Lord Jagannatha, along with His brother Lord Baladeva and sister Subhadra Devi, comes out of the temple to bless all citizens and bestow His causeless mercy.",
    sevas: [
      {
        id: "suna-besha",
        title: "Suna Besha Alankara Seva",
        description: "Contribute towards the ornaments decorating the Lord in this unique alankara.",
        defaultAmount: 5001,
        image: "/deity-2.webp",
      },
      {
        id: "pushpa-vrishti",
        title: "Pushpa Vrishti Seva",
        description: "Sponsor the colourful and fragrant flowers that will be used throughout the festival for offering to Lord Jagannatha and for the decoration of the Ratha.",
        defaultAmount: 2501,
        image: "/deity-1.webp",
      },
      {
        id: "vishesha-alankara",
        title: "Vishesha Alankara Seva",
        description: "Contribute towards decorating Lord Jagannatha with fine garments and colourful flower garlands in a magnificent Ratha.",
        defaultAmount: 1501,
        image: "/hero-deity-1.webp",
      },
      {
        id: "vishesha-naivedya",
        title: "Vishesha Naivedya Seva",
        description: "Contribute towards the special naivedya offering made to Lord Jagannatha on this day.",
        defaultAmount: 1100,
        image: "/annadanam.jpeg",
      },
      {
        id: "annadana",
        title: "Annadana Seva",
        description: "Contribute towards the feeding of Jagannatha prasadam to all the devotees attending the Ratha Yatra festival.",
        defaultAmount: 501,
        image: "/annadan.webp",
      },
    ],
  },
  "panihati-chida-dahi-utsav": {
    slug: "panihati-chida-dahi-utsav",
    title: "PANIHATI CHIDA DAHI UTSAV",
    date: "~ JUNE 11, 2025 ~",
    bannerSubtitle: "Chida Dahi Bhog | Pushpa Alankara | Maha Aarti | Festival Annadana",
    heroBg: "from-[#0d2b52] via-[#1a3a6b] to-[#462c75]",
    heroImage: "/panihati.png",
    aboutText: "The famous Festival of Chipped Rice celebrated in honor of Lord Nityananda Prabhu at Panihati. Devotees relish chida, dahi, and sweet preparations in joyful Sankirtana, receiving divine blessings.",
    sections: [
      {
        heading: "The Legend of Danda Mahotsav (Panihati Chida Dahi Utsav)",
        quote: "\"Whosoever partakes in the Chida Dahi Mahotsav and serves the Vaishnavas at Panihati receives the supreme causeless mercy of Lord Nityananda and Lord Sri Caitanya Mahaprabhu.\"",
        paragraphs: [
          "More than five hundred years ago, on the sacred banks of the Ganges at Panihati (near Kolkata), the glorious Chida Dahi Utsav—affectionately known as the Danda Mahotsav (the Festival of Divine Punishment)—originated from the boundless mercy of Lord Nityananda Prabhu toward Srila Raghunatha Dasa Goswami.",
          "When young Raghunatha Dasa approached Lord Nityananda seeking His blessings to surrender fully to Lord Caitanya, Lord Nityananda playfully declared that as 'punishment' for sneaking around, Raghunatha must immediately organize a grand feast of chipped rice (chida), sweet curd (dahi), condensed milk, bananas, sugar, and camphor for every single devotee present along the riverbank.",
          "Miraculously, Lord Nityananda invoked the divine presence of Lord Caitanya Mahaprabhu during the ecstatic kirtan. Together, They walked among the thousands of assembled Vaishnavas, personally tasting from each clay pot and blessing everyone with supreme spiritual happiness."
        ],
        highlightPoints: [
          "Divine Appearance of Lord Caitanya during the Kirtan",
          "Feeding Thousands of Vaishnavas on the Ganges Bank",
          "Bestowal of Supreme Renunciation & Pure Bhakti",
          "Eternal Tradition of Summer Chida Dahi Bhog"
        ]
      },
      {
        heading: "Spiritual Significance & Summer Cooling Offering",
        paragraphs: [
          "Observed during the scorching summer month of Jyeshtha, Chida Dahi (chipped rice mixed with cool yogurt, sweet mango pulp, and camphor) provides soothing relief and acts as a cooling nectar for the Deities and sadhus.",
          "By contributing toward the Chida Dahi Mahabhog, Vishesha Pushpa Alankara (floral decorations), Maha Aarti, and grand Annadana at Hare Krishna Movement Dehradun, sponsors participate directly in this 500-year-old Vedic tradition. Every donor receives sacred prasadam and the eternal blessings of Nitai-Gauranga for peace, prosperity, and spiritual elevation."
        ]
      }
    ],
    sevas: [
      {
        id: "chida-dahi-bhog",
        title: "Chida Dahi Mahabhog Seva",
        description: "Sponsor the traditional clay pots of chipped rice mixed with thick sweet curd, fresh mango pulp, ripe bananas, condensed milk, and camphor offered directly to Sri Sri Nitai Gauranga.",
        defaultAmount: 500,
        image: "/deity-1.webp",
      },
      {
        id: "pushpa-alankara",
        title: "Vishesha Pushpa Alankara & Phool Bangla Seva",
        description: "Contribute towards fragrant jasmine, marigold, and tuberose floral garlands and cooling flower decorations keeping the divine couple refreshed during the summer heat.",
        defaultAmount: 1000,
        image: "/hero-deity-2.webp",
      },
      {
        id: "maha-aarti",
        title: "Sandhya Maha Aarti & Deepa Seva",
        description: "Sponsor the grand evening ecstatic kirtan, magnificent 108-lamp deepa aarti, and floral pushpanjali at the temple hall.",
        defaultAmount: 1500,
        image: "/hero-deity-3.webp",
      },
      {
        id: "annadana-panihati",
        title: "Festival Annadana Seva (500+ Devotees)",
        description: "Contribute towards distributing delicious, cooling Chida Dahi and feast prasadam to hundreds of visiting pilgrims, sadhus, and guests.",
        defaultAmount: 2000,
        image: "/annadan.webp",
      },
      {
        id: "sarva-seva-patron",
        title: "Sarva Seva Patrons (Complete Sponsorship)",
        description: "Be a prime patron of the Panihati Chida Dahi Utsav. Covers Mahabhog, Pushpa Alankara, Deepa Aarti, and Annadana together with special sankalpa puja in your family's name.",
        defaultAmount: 2500,
        image: "/krishna.webp",
      }
    ],
  },
  "janmashtami": {
    slug: "janmashtami",
    title: "SRI KRISHNA JANMASHTAMI",
    date: "~ FRIDAY, SEPTEMBER 4, 2026 ~",
    bannerSubtitle: "Maha Abhishek | Chhappan Bhog | Jhulan Alankara | Midnight Aarti | Maha Annadana",
    heroBg: "from-[#101e38] via-[#0b3873] to-[#121c3b]",
    heroImage: "/janmashtami.webp",
    aboutText: "Commemorate the divine appearance of Supreme Lord Sri Krishna with fasting, midnight maha-abhishek, ecstatic kirtans, and grand celebrations.",
    sections: [
      {
        heading: "The Divine Appearance of Lord Sri Krishna",
        quote: "\"One who knows the transcendental nature of My appearance and activities does not, upon leaving the body, take his birth again in this material world, but attains My eternal abode, O Arjuna.\" — Bhagavad-gita 4.9",
        paragraphs: [
          "Sri Krishna Janmashtami commemorates the glorious appearance of the Supreme Personality of Godhead, Lord Sri Krishna, on this earthly planet over five thousand years ago. Observed on the Ashtami tithi of the Krishna Paksha in the month of Bhadrapada, Janmashtami is one of the most vibrant and spiritually ecstatic festivals celebrated across the globe.",
          "At Hare Krishna Movement Dehradun, the temple is transformed into the transcendental realm of Goloka Vrindavana. Devotees engage in continuous kirtans, chanting the holy names, and observing fasting until midnight—the exact hour of Lord Krishna's divine advent.",
          "The highlight of the celebration is the grand midnight Maha-Abhishek, where the transcendental form of the Lord is bathed with pure waters, milk, yogurt, honey, ghee, and sweet fruit juices, accompanied by joyful conch shells and Vedic hymns."
        ],
        highlightPoints: [
          "Grand Midnight Maha-Abhishek Ceremony",
          "Royal Chhappan Bhog Offering (56 Delicacies)",
          "Exquisite Jhulan & Pushpa Alankara (Floral Bangla)",
          "Maha Annadana Prasadam Distribution to Thousands"
        ]
      },
      {
        heading: "The Glories of Janmashtami",
        paragraphs: [
          "Fasting on Janmashtami and staying awake through the night in the divine remembrance of the Lord is considered highly auspicious. It purifies the heart and awakens deep spiritual devotion.",
          "By hearing the pastimes of Lord Krishna, participating in the midnight celebrations, and receiving the Lord's prasadam, one can experience eternal peace and joy, progressing steadily on the path of pure Bhakti."
        ]
      }
    ],
    sevas: [
      {
        id: "maha-abhishek",
        title: "Maha Abhishek Seva",
        description: "Contribute towards the grand midnight ceremonial bathing of Lord Krishna with panchamrita, fruit juices, and sacred waters.",
        defaultAmount: 500,
        image: "/krishna.webp",
      },
      {
        id: "jhulan-alankara",
        title: "Jhulan & Pushpa Alankara Seva",
        description: "Sponsor the divine swing decoration and fragrant floral garlands and cooling flower decorations keeping the Lord refreshed.",
        defaultAmount: 1000,
        image: "/hero-deity-1.webp",
      },
      {
        id: "midnight-aarti",
        title: "Midnight Aarti & Deepa Seva",
        description: "Sponsor the grand midnight ecstatic kirtan, magnificent 108-lamp deepa aarti, and floral pushpanjali at the temple hall.",
        defaultAmount: 1500,
        image: "/hero-deity-3.webp",
      },
      {
        id: "annadana-janmashtami",
        title: "Festival Annadana Seva (500+ Devotees)",
        description: "Contribute towards distributing delicious fasting prasadam (anukalpa) and grand feast prasadam to hundreds of visiting pilgrims and sadhus.",
        defaultAmount: 2000,
        image: "/annadan.webp",
      },
      {
        id: "chhappan-bhog-patron",
        title: "Sarva Seva & Chhappan Bhog Patron",
        description: "Be a prime patron of Sri Krishna Janmashtami. Covers royal Chhappan Bhog offering, Maha Abhishek, and complete sponsorship together with special sankalpa.",
        defaultAmount: 2500,
        image: "/deity-2.webp",
      }
    ],
  },
};

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function FestivalDetail({ slug }: { slug: string }) {
  const festival = FESTIVALS_DATA[slug] || FESTIVALS_DATA["sri-jagannatha-ratha-yatra"];

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    if (slug !== "janmashtami") return;

    // Janmashtami 2026 is Friday, September 4
    const targetDate = new Date("2026-09-04T00:00:00+05:30").getTime(); // IST timezone

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsCountdownComplete(true);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [slug]);

  // Auto-scroll to #donate or any anchor hash on mount or hashchange
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Trigger after initial render & short delays for dynamic heights (images/timers)
    handleHashScroll();
    const t1 = setTimeout(handleHashScroll, 150);
    const t2 = setTimeout(handleHashScroll, 500);
    const t3 = setTimeout(handleHashScroll, 1000);

    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  // Checkboxes state mapping seva id -> boolean
  const [selectedSevas, setSelectedSevas] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    festival.sevas.forEach((item, idx) => {
      // By default, check the first two sevas or let user toggle
      init[item.id] = idx === 0;
    });
    return init;
  });

  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});
  const [generalCustomAmount, setGeneralCustomAmount] = useState<string>("");
  const [donationFrequency, setDonationFrequency] = useState<"onetime" | "monthly">("onetime");
  const [claim80G, setClaim80G] = useState(false);
  const [receivePrasadam, setReceivePrasadam] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    doorNumber: "",
    buildingName: "",
    streetName: "",
    area: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
  });
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const address = receivePrasadam
    ? `${addressDetails.doorNumber}, ${addressDetails.buildingName}, ${addressDetails.streetName}, ${addressDetails.area}, ${addressDetails.city}, ${addressDetails.state} - ${addressDetails.pincode}, ${addressDetails.country}`
    : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    pan: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const isProcessingPayment = useRef(false);

  const selectSeva = (id: string) => {
    setIsOtherSelected(false);
    setSelectedSevas({ [id]: true });
  };

  const getSevaAmount = (item: SevaItem) => {
    if (customAmounts[item.id] !== undefined) {
      return customAmounts[item.id];
    }
    return item.defaultAmount;
  };

  const handleAmountChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    setCustomAmounts((prev) => ({
      ...prev,
      [id]: num,
    }));
  };

  // Compute total
  const totalAmount = isOtherSelected
    ? (parseInt(generalCustomAmount) || 0)
    : festival.sevas.reduce((sum, item) => {
        if (selectedSevas[item.id]) {
          return sum + getSevaAmount(item);
        }
        return sum;
      }, 0) + (parseInt(generalCustomAmount) || 0);

  const getSelectedSevasSummary = () => {
    if (isOtherSelected) {
      return generalCustomAmount ? `Custom Offering (₹${generalCustomAmount})` : "Custom Offering";
    }
    const checked = festival.sevas.filter((item) => selectedSevas[item.id]);
    const labels = checked.map((item) => item.title);
    if (generalCustomAmount && parseInt(generalCustomAmount) > 0) {
      labels.push(`Custom Offering (₹${generalCustomAmount})`);
    }
    return labels.length > 0 ? labels.join(", ") : "General Festival Offering";
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!isValidName(formData.name) || !isValidEmail(formData.email) || !isValidPhone(formData.phone)) {
      alert("Please provide a valid name, email, and phone number.");
      return;
    }
    if (totalAmount <= 0) {
      alert("Please select at least one Seva or enter a donation amount.");
      return;
    }

    setLoading(true);

    try {
      const orderData = await apiService.createPaymentOrder({
        amount: totalAmount,
        currency: "INR",
        receipt: `receipt_${festival.slug}_${Date.now()}`,
        donorName: formData.name,
        email: formData.email,
        phone: formData.phone,
        panNumber: formData.pan,
        sevaCategory: getSelectedSevasSummary(),
        receivePrasadam,
        deliveryAddress: receivePrasadam ? address : null
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // No hardcoded fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Hare Krishna Movement Dehradun",
        description: `${festival.title} Donation`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          isProcessingPayment.current = true;
          try {
            const verifyRes = await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorData: {
                ...formData,
                address,
                donationFrequency,
                claim80G,
                receivePrasadam,
                amount: totalAmount,
                sevaCategory: getSelectedSevasSummary(),
              },
            });
            if (verifyRes.success) {
              window.location.href = `/thank-you?order_id=${verifyRes.orderId || response.razorpay_order_id}`;
            } else {
              alert("Payment verification returned unsuccessful state.");
              setLoading(false);
            }
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verified partially. Our team will contact you.");
            setLoading(false);
          } finally {
            isProcessingPayment.current = false;
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#1c7bcf",
        },
        modal: {
          ondismiss: function () {
            if (!isProcessingPayment.current) {
              setLoading(false);
            }
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setLoading(false);
        setError("Payment Failed: " + (response.error?.description || "Unknown error"));
      });
      rzp.open();
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Could not initiate payment. Please verify your connection or try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 pt-0 pb-16 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      {/* Hero Banner */}
      {festival.heroImage ? (
        <div className="w-full relative bg-[#0a0f1c] flex flex-col items-center justify-center pt-10 sm:pt-16 overflow-hidden">
          {/* Ambient background blur */}
          <div 
             className="absolute inset-0 opacity-50 blur-3xl scale-110 pointer-events-none" 
             style={{ backgroundImage: `url('${festival.heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
          />
          
          {/* Image Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 group bg-black/20">
              <img loading="lazy" src={festival.heroImage}
                alt={festival.title}
                className="w-full h-auto block transform transition-transform duration-1000 group-hover:scale-[1.02]"
              />
              {/* Inner glass ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl sm:rounded-[32px] pointer-events-none"></div>
            </div>
          </div>

          {/* Smooth bottom fade into page */}
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#faf8f5] to-transparent z-20 pointer-events-none" />
        </div>
      ) : (
        <div className={`w-full bg-gradient-to-r ${festival.heroBg} relative overflow-hidden py-4 md:py-6 text-white shadow-lg`}>
          {/* Subtle background decoration */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
            <span className="text-sm md:text-base font-semibold tracking-[0.3em] text-amber-300 uppercase block mb-1">
              Hare Krishna Movement Dehradun Presents
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide drop-shadow-md mb-2">
              {festival.title}
            </h1>
            <p className="text-lg sm:text-2xl font-serif text-amber-200 tracking-wider mb-6 drop-shadow">
              {festival.date}
            </p>

            {/* Sevas Subtitle Box (Dotted border like in input_file_1.png) */}
            <div className="border-2 border-dashed border-white/60 bg-black/20 backdrop-blur-sm rounded-xl py-3 px-6 max-w-4xl shadow-inner">
              <p className="text-xs sm:text-sm md:text-base tracking-wide font-medium text-white/95 leading-relaxed">
                {festival.bannerSubtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area: Left (Sevas List) + Right (Brown Donation Details Card) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 md:mt-14">
        
        {/* Janmashtami Countdown Banner */}
        {festival.slug === "janmashtami" && (
          <div className="mb-12 w-full relative overflow-hidden bg-gradient-to-br from-[#fffefc] via-[#fffdf7] to-[#fff8eb] border border-amber-200/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(251,191,36,0.12)] flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-4 animate-fade-in group">
            
            {/* Decorative subtle background accents */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 transition-transform duration-700 group-hover:scale-110"></div>

            {/* Left Section: Event Info */}
            <div className="flex flex-col items-center xl:items-start text-center xl:text-left relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-amber-500 rounded-full hidden sm:block"></span>
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-amber-600 uppercase">
                  Hare Krishna Movement Dehradun
                </span>
                <span className="w-8 h-[2px] bg-amber-500 rounded-full hidden sm:block xl:hidden"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Janmashtami <span className="text-amber-500">Countdown</span>
              </h2>
              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 flex items-center gap-2 text-amber-800 font-semibold text-sm sm:text-base shadow-sm">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Friday, September 4, 2026
              </div>
            </div>

            {/* Right Section: Countdown Timer or Celebration */}
            {isCountdownComplete ? (
              <div className="flex flex-col items-center justify-center relative z-10 w-full xl:w-auto mt-8 xl:mt-0 px-4">
                <div className="text-3xl sm:text-5xl font-extrabold text-amber-500 animate-bounce tracking-tight text-center drop-shadow-sm">
                  Happy Janmashtami!
                </div>
                <div className="mt-2 text-lg sm:text-xl font-bold text-gray-700 animate-pulse text-center">
                  Join the Grand Celebration Now 🎉
                </div>
                {/* CSS Confetti / Sparkles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-amber-400 rounded-full animate-ping delay-100 -mt-10 ml-32"></div>
                  <div className="absolute w-4 h-4 bg-red-400 rounded-full animate-ping delay-300 mt-12 -ml-24"></div>
                  <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500 -mt-8 -ml-32"></div>
                  <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-ping delay-700 mt-10 ml-20"></div>
                  <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping delay-200 mt-4 ml-4"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4 relative z-10 mt-6 xl:mt-0">
                
                {/* Unit: Days */}
                <div className="flex flex-col items-center justify-center bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-amber-100/80 rounded-2xl w-[72px] h-[80px] sm:w-[90px] sm:h-[100px] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgb(251,191,36,0.15)]">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-800 tabular-nums tracking-tight">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">
                    Days
                  </span>
                </div>
                
                <span className="text-2xl sm:text-3xl font-bold text-amber-300 -mt-4 sm:-mt-5 animate-pulse">:</span>

                {/* Unit: Hours */}
                <div className="flex flex-col items-center justify-center bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-amber-100/80 rounded-2xl w-[72px] h-[80px] sm:w-[90px] sm:h-[100px] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgb(251,191,36,0.15)]">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-800 tabular-nums tracking-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">
                    Hours
                  </span>
                </div>

                <span className="text-2xl sm:text-3xl font-bold text-amber-300 -mt-4 sm:-mt-5 animate-pulse">:</span>

                {/* Unit: Minutes */}
                <div className="flex flex-col items-center justify-center bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-amber-100/80 rounded-2xl w-[72px] h-[80px] sm:w-[90px] sm:h-[100px] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgb(251,191,36,0.15)]">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-800 tabular-nums tracking-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">
                    Mins
                  </span>
                </div>

                <span className="text-2xl sm:text-3xl font-bold text-amber-300 -mt-4 sm:-mt-5 animate-pulse">:</span>

                {/* Unit: Seconds */}
                <div className="flex flex-col items-center justify-center bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-amber-100/80 rounded-2xl w-[72px] h-[80px] sm:w-[90px] sm:h-[100px] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgb(251,191,36,0.15)]">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-800 tabular-nums tracking-tight">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">
                    Secs
                  </span>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Story & Description Section (Moved above grid) */}
        <div className="mb-14">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-gray-100/80">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a3d73] font-serif mb-6 pb-4 border-b border-gray-100">
              About the Festival
            </h2>
            <div className="space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed font-sans">
              {festival.sections && festival.sections.length > 0 ? (
                <>
                  {(isExpanded
                    ? festival.sections.flatMap((sec) => sec.paragraphs)
                    : festival.sections.flatMap((sec) => sec.paragraphs).slice(0, 2)
                  ).map((para, pIdx, arr) => (
                    <p key={pIdx}>
                      {para}
                      {!isExpanded && pIdx === arr.length - 1 && (
                        <>
                          {" "}
                          <span
                            onClick={() => setIsExpanded(true)}
                            className="text-[#0a3d73] font-bold cursor-pointer hover:underline inline-block select-none ml-1"
                          >
                            Read more
                          </span>
                        </>
                      )}
                    </p>
                  ))}

                  {isExpanded && festival.sections.some((sec) => sec.highlightPoints) && (
                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                      <h4 className="text-lg font-bold text-[#0a3d73] font-serif">Key Festival Highlights:</h4>
                      <ul className="list-disc pl-6 space-y-2 text-[#5c5245] font-medium text-base">
                        {festival.sections
                          .flatMap((sec) => sec.highlightPoints || [])
                          .map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {isExpanded && (
                    <div className="pt-4">
                      <span
                        onClick={() => setIsExpanded(false)}
                        className="text-[#0a3d73] font-bold cursor-pointer hover:underline inline-block select-none"
                      >
                        Read less
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <p>
                  {festival.aboutText}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (7 cols): Highlight Video Section */}
          <div className="lg:col-span-7 space-y-8">
            {festival.slug === "janmashtami" && (
              <div className="w-full relative rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgb(251,191,36,0.15)] border-[6px] border-white group bg-amber-50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10 rounded-[26px]"></div>
                <video 
                  src="/jk.mp4" 
                  autoPlay 
                  muted={isVideoMuted}
                  loop 
                  playsInline
                  className="w-full h-auto block transform transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                {/* Mute/Unmute Toggle Button */}
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="absolute bottom-6 right-6 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 shadow-lg border border-white/20"
                  aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                >
                  {isVideoMuted ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.828L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.828L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Blue Donation Details Card */}
          <div id="donate" className="lg:col-span-5 sticky top-28 scroll-mt-28">
            <div className="bg-[#e8f6fc] rounded-[32px] p-6 sm:p-8 text-gray-800 shadow-xl border border-blue-200 relative overflow-hidden">
              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c7bcf] text-center mb-5 tracking-tight font-sans drop-shadow-sm">
                  Contribute To {festival.title}
                </h3>

                {/* Blue Banner Box */}
                <div className="bg-[#1c7bcf] text-white rounded-xl py-3 px-4 text-center font-bold text-xs sm:text-sm tracking-wider shadow-sm mb-6">
                  HARE KRISHNA MANDIR DEHRADUN • PAN NO: AAAAH0992Q
                </div>

                {/* 3-Column Grid of Amount Tiles */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {festival.sevas.map((item) => {
                    const isChecked = !!selectedSevas[item.id] && !isOtherSelected;
                    return (
                      <div
                        key={item.id}
                        onClick={() => selectSeva(item.id)}
                        className={`rounded-2xl p-2 sm:p-3 text-center cursor-pointer transition-all duration-200 flex items-center justify-center min-h-[56px] ${
                          isChecked
                            ? "bg-white border-2 border-[#1c7bcf] shadow-md scale-[1.02]"
                            : "bg-white border border-blue-100 hover:border-blue-300 shadow-sm hover:shadow"
                        }`}
                      >
                        <span className="text-[#1c7bcf] font-bold text-sm sm:text-base">
                          ₹ {getSevaAmount(item).toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}

                  {/* Other Tile */}
                  <div
                    onClick={() => {
                      setIsOtherSelected(true);
                      setSelectedSevas({});
                    }}
                    className={`rounded-2xl p-2 sm:p-3 text-center cursor-pointer transition-all duration-200 flex items-center justify-center min-h-[56px] ${
                      isOtherSelected
                        ? "bg-white border-2 border-[#1c7bcf] shadow-md scale-[1.02]"
                        : "bg-white border border-blue-100 hover:border-blue-300 shadow-sm hover:shadow"
                    }`}
                  >
                    <span className="text-[#1c7bcf] font-bold text-sm sm:text-base">
                      Other
                    </span>
                  </div>
                </div>

                {/* Custom amount field */}
                {isOtherSelected && (
                  <div className="mb-6 animate-fade-in">
                    <input
                      type="number"
                      min="1"
                      max="500000"
                      placeholder="Enter Custom Amount (₹)"
                      autoFocus
                      value={generalCustomAmount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setGeneralCustomAmount('');
                          return;
                        }
                        const num = parseInt(val, 10);
                        if (!isNaN(num) && num > 0 && num <= 500000) {
                          setGeneralCustomAmount(num.toString());
                        }
                      }}
                      className="w-full bg-white rounded-2xl px-5 py-3.5 text-gray-800 placeholder-gray-400 text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                )}

                {/* Form Fields */}
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-500 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-gray-100"
                    />

                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10,15}"
                      placeholder="Phone Number (Digits only) *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-500 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-gray-100"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-500 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-gray-100"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="pt-2 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer select-none pl-1 group">
                      <input
                        type="checkbox"
                        checked={claim80G}
                        onChange={(e) => setClaim80G(e.target.checked)}
                        className="w-4.5 h-4.5 text-[#1c7bcf] rounded border-gray-300 focus:ring-[#1c7bcf] transition-all cursor-pointer"
                      />
                      <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Claim 80G Certificate</span>
                    </label>

                    {claim80G && (
                      <div className="space-y-3 pl-8 animate-fade-in">
                        <input
                          type="text"
                          placeholder="PAN Number (for 80G Tax Benefit) *"
                          required={claim80G}
                          value={formData.pan}
                          onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                          className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                        />
                        <input
                          type="text"
                          placeholder="Date of Birth"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text";
                          }}
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                        />
                      </div>
                    )}

                    <label className="flex items-center gap-3 cursor-pointer select-none pl-1 group">
                      <input
                        type="checkbox"
                        checked={receivePrasadam}
                        onChange={(e) => setReceivePrasadam(e.target.checked)}
                        className="w-4.5 h-4.5 text-[#1c7bcf] rounded border-gray-300 focus:ring-[#1c7bcf] transition-all cursor-pointer"
                      />
                      <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Receive Prasadam (only in India)</span>
                    </label>

                    {receivePrasadam && (
                      <div className="space-y-3 pt-2 pl-6 border-l-2 border-[#1c7bcf]/20 ml-2 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Door Number *"
                            required={receivePrasadam}
                            value={addressDetails.doorNumber}
                            onChange={(e) => setAddressDetails({ ...addressDetails, doorNumber: e.target.value })}
                            className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                          />
                          <input
                            type="text"
                            placeholder="House / Building *"
                            required={receivePrasadam}
                            value={addressDetails.buildingName}
                            onChange={(e) => setAddressDetails({ ...addressDetails, buildingName: e.target.value })}
                            className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Street Name *"
                          required={receivePrasadam}
                          value={addressDetails.streetName}
                          onChange={(e) => setAddressDetails({ ...addressDetails, streetName: e.target.value })}
                          className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                        />

                        <input
                          type="text"
                          placeholder="Location / Area *"
                          required={receivePrasadam}
                          value={addressDetails.area}
                          onChange={(e) => setAddressDetails({ ...addressDetails, area: e.target.value })}
                          className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <select
                            required={receivePrasadam}
                            value={addressDetails.country}
                            onChange={(e) => setAddressDetails({ ...addressDetails, country: e.target.value })}
                            className="w-full bg-gray-50 rounded-2xl px-5 py-3 text-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                          >
                            <option value="India">Country * India</option>
                          </select>

                          <select
                            required={receivePrasadam}
                            value={addressDetails.state}
                            onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
                            className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                          >
                            <option value="">Select State *</option>
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="City *"
                            required={receivePrasadam}
                            value={addressDetails.city}
                            onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                            className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200"
                          />
                          <input
                            type="number"
                            placeholder="Pincode *"
                            required={receivePrasadam}
                            value={addressDetails.pincode}
                            onChange={(e) => setAddressDetails({ ...addressDetails, pincode: e.target.value })}
                            className="w-full bg-white rounded-2xl px-5 py-3 text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1c7bcf] shadow-sm border border-blue-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Message Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm font-medium text-center">
                      {error}
                    </div>
                  )}

                  {/* Donate Button */}
                  <div className="pt-5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#1c7bcf] border-2 border-[#1c7bcf] text-white hover:bg-[#1666ab] hover:border-[#1666ab] rounded-full py-4 px-8 font-extrabold text-lg sm:text-xl text-center transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Contribute ₹ {totalAmount.toLocaleString("en-IN")}</span>
                      )}
                    </button>
                  </div>

                  {/* Terms Note */}
                  <p className="text-center text-gray-500 text-xs sm:text-sm font-medium leading-relaxed pt-3">
                    By continuing, you agree to <Link href="/terms" className="underline hover:text-gray-800 font-semibold transition-colors">Terms of Use</Link> and <Link href="/privacy" className="underline hover:text-gray-800 font-semibold transition-colors">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* Gallery Section */}
        {festival.slug === "janmashtami" && (
          <div className="mt-16 sm:mt-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a3d73] font-serif text-center mb-10 tracking-tight">
              Glimpses of Celebration
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Photo from Vishwas Murthy (2).jpg",
                "Photo from Vishwas Murthy.jpg",
                "Photo from Vishwas Murthy (3).jpg",
                "Photo from Vishwas Murthy (1).jpg"
              ].map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white group bg-gray-100">
                  <img 
                    src={`/${img}`} 
                    alt={`Janmashtami Glimpse ${idx + 1}`} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
