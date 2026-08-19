"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  quickLinks?: { label: string; href?: string; query?: string }[];
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; links?: { label: string; href?: string; query?: string }[] }[] = [
  {
    keywords: ["hi", "hello", "hey", "hare krishna", "namaste", "pranam", "greetings", "good morning", "good evening", "good afternoon"],
    answer: "Hare Krishna! 🙏 Welcome to Hare Krishna Movement Dehradun. How may I assist your spiritual journey or seva today?",
    links: [
      { label: "📞 Contact Info", query: "Contact Info" },
      { label: "🐮 Gau Seva", href: "/gau-seva" },
      { label: "🍲 Annadana Seva", href: "/annadana-seva" }
    ]
  },
  {
    keywords: ["contact", "contact info", "info", "phone", "mobile", "number", "prabhu", "call", "reach", "talk", "speak", "address", "location", "email", "mail"],
    answer: "📍 Address:\nNear LP Villas, Suddhowala, Dehradun\n\n📞 Contact Numbers:\n• Hari Krishna Prabhu: +91 82968 75074\n• Anand Narthak Prabhu: +91 78950 68399\n• Janeshwar Prabhu: +91 81211 51508\n• Vasta vardhana Dasa: +91 97622 43256\n\n✉️ Email: contact@hkmdehradun.org"
  },
  {
    keywords: ["timing", "darshan", "time", "open", "schedule", "aarti", "timings"],
    answer: "Hare Krishna! 🙏 Temple timings are currently being updated. We will be updating them soon! Thank you.",
    links: [
      { label: "View Daily Darshan", href: "/daily-darshan" },
      { label: "Explore Temple", href: "/about" }
    ]
  },
  {
    keywords: ["gau", "cow", "gauseva", "surabhi", "gaushala"],
    answer: "Gau Seva (Cow Protection) is one of the highest virtues in Vedic culture. Your support feeds, protects, and nurtures sacred cows at our Gaushala.",
    links: [
      { label: "Donate to Gau Seva", href: "/gau-seva" }
    ]
  },
  {
    keywords: ["annadana", "food", "khichdi", "prasadam", "feed", "meal"],
    answer: "We distribute hot, sanctified Krishna Prasadam daily to sadhus, pilgrims, school children, and underprivileged families across Dehradun.",
    links: [
      { label: "Annadana Seva", href: "/annadana-seva" },
      { label: "Child Annadana", href: "/child-annadana-seva" },
      { label: "Khichdi Prasadam", href: "/khichdi-prasadam-seva" }
    ]
  },
  {
    keywords: ["child", "children", "kid", "school", "midday"],
    answer: "Our Child Annadana Seva provides wholesome, nutritious Krishna Prasadam to underprivileged school children to eliminate hunger and support their education.",
    links: [
      { label: "Child Annadana Seva", href: "/child-annadana-seva" }
    ]
  },
  {
    keywords: ["ekadashi", "fast", "fasting", "vrat", "ekadasi"],
    answer: "Ekadashi is the holiest day to deepen spiritual devotion. Sponsor special Ekadashi Prasadam distribution and deity sevas on auspicious Ekadashi Tithis.",
    links: [
      { label: "Offer Ekadashi Seva", href: "/ekadashi-seva" }
    ]
  },
  {
    keywords: ["donate", "donation", "tax", "80g", "receipt", "deduction", "contribute", "pay"],
    answer: "All donations to Hare Krishna Movement Dehradun are 100% eligible for 80G Income Tax Exemption under the Income Tax Act. Instant digital receipts are issued immediately.",
    links: [
      { label: "Donate Online", href: "/donate" }
    ]
  },
  {
    keywords: ["book", "gita", "prabhupada", "literature", "shastra", "vedic"],
    answer: "We actively distribute Srila Prabhupada's transcendental books, including Bhagavad-gita As It Is, Srimad-Bhagavatam, and life-changing spiritual literature.",
    links: [
      { label: "Book Distribution Seva", href: "/book-distribution" }
    ]
  },
  {
    keywords: ["volunteer", "serve", "service", "help", "join"],
    answer: "We welcome passionate volunteers to offer their talents and time in deity seva, food distribution, IT, event management, and community outreach!",
    links: [
      { label: "Volunteer With Us", href: "/volunteer" }
    ]
  },
  {
    keywords: ["youth", "folk", "student", "college", "gita course"],
    answer: "FOLK (Friends of Lord Krishna) is our youth empowerment initiative offering Gita life courses, personality enrichment, and stress-management workshops for students and young professionals.",
    links: [
      { label: "Youth Programs", href: "/youth" },
      { label: "Gita Life Course", href: "/gita-life-course" }
    ]
  },
  {
    keywords: ["monk", "monkhood", "challenge", "dedicate", "brahmachari"],
    answer: "Experience the transformative monkhood program! Learn timeless self-discipline, meditation, and spiritual leadership in our structured retreat.",
    links: [
      { label: "Become a Monk Program", href: "/become-a-monk" }
    ]
  },
  {
    keywords: ["workshop", "happiness", "empowerment", "life coach", "seminar", "mind", "stress"],
    answer: "Transform your life with our scientific workshops on Gita wisdom, mind control, stress management, and self-empowerment led by experienced spiritual life coaches.",
    links: [
      { label: "Life Coach & Workshops", href: "/life-coach" },
      { label: "Happiness Workshops", href: "/happiness-workshops" },
      { label: "Self Empowerment", href: "/self-empowerment-workshops" }
    ]
  },
  {
    keywords: ["festival", "event", "janmashtami", "ratha yatra", "panihati", "utsav", "celebration"],
    answer: "Experience soul-stirring grand festivals including Sri Krishna Janmashtami, Sri Jagannatha Ratha Yatra, and Panihati Chida-Dahi Utsav at HKM Dehradun!",
    links: [
      { label: "Sri Janmashtami", href: "/janmashtami" },
      { label: "Ratha Yatra", href: "/sri-jagannatha-ratha-yatra" },
      { label: "Panihati Utsav", href: "/panihati-chida-dahi-utsav" },
      { label: "Upcoming Events", href: "/events" }
    ]
  },
  {
    keywords: ["about", "mission", "objective", "governance", "who we are", "hkm"],
    answer: "Hare Krishna Movement Dehradun is dedicated to promoting spiritual clarity, peace, and universal brotherhood based on the teachings of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/mission" },
      { label: "Objectives", href: "/objectives" },
      { label: "Governance", href: "/governance" }
    ]
  },
  {
    keywords: ["media", "gallery", "reels", "photo", "video", "blog"],
    answer: "Explore our rich media collection featuring daily darshan photos, festival highlights, spiritual reels, inspiring articles, and blogs.",
    links: [
      { label: "Photo Gallery", href: "/gallery" },
      { label: "HKM Reels", href: "/reels" },
      { label: "Spiritual Blogs", href: "/blogs" }
    ]
  },
  {
    keywords: ["policy", "privacy", "terms", "refund", "receipt"],
    answer: "Find transparent details regarding our privacy practices, donation refund policies, and terms of service.",
    links: [
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" }
    ]
  }
];

export default function AiChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hare Krishna! 🙏 Welcome to Hare Krishna Movement Dehradun. How may I assist your spiritual journey or seva today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quickLinks: [
        { label: "📞 Contact Info", query: "Contact Info" }
      ]
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (pathname && (pathname.startsWith("/reels") || pathname.startsWith("/admin"))) {
    return null;
  }

  const SYSTEM_PROMPT = `You are Hare Krishna Dehradun Movement AI, an official spiritual assistant and temple guide for Hare Krishna Movement Dehradun.
Always begin your answer with 'Hare Krishna! 🙏'.
Key Temple Info:
- Address: Near LP Villas, Suddhowala, Dehradun
- Contacts: Hari Krishna Prabhu (+91 82968 75074), Anand Narthak Prabhu (+91 78950 68399), Janeshwar Prabhu (+91 81211 51508), Vasta vardhana Dasa (+91 97622 43256)
- Email: contact@hkmdehradun.org
- Programs: Gau Seva (Gaushala), Annadana Seva, Child Annadana Seva, Ekadashi Seva, Book Distribution (Bhagavad-gita), 80G Tax Exemption, Youth Programs (FOLK), Monkhood Program.
- Temple Timings: Currently being updated.
Answer concise, warm, and uplifting responses (2-4 sentences) based on Srila Prabhupada's teachings and Vedic wisdom.`;

  const fetchFreeAiReply = async (userQuery: string): Promise<string> => {
    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userQuery }
          ],
          model: "openai"
        })
      });
      if (response.ok) {
        const data = await response.text();
        if (data && data.trim()) return data.trim();
      }
    } catch (e) {
      console.error("AI API call error:", e);
    }
    return `Hare Krishna! 🙏 Thank you for reaching out to Hare Krishna Movement Dehradun. How may we assist your spiritual journey or seva today?`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    const queryLower = query.toLowerCase().trim();
    const localMatch = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((kw) => queryLower.includes(kw))
    );

    let answerText = "";
    let links = localMatch?.links;

    if (localMatch) {
      answerText = localMatch.answer;
      await new Promise((resolve) => setTimeout(resolve, 300));
    } else {
      answerText = await fetchFreeAiReply(query);
      links = [
        { label: "📞 Contact Info", query: "Contact Info" },
        { label: "Explore Seva Opportunities", href: "/donate" }
      ];
    }

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      text: answerText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quickLinks: links
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* ── FLOATING LAUNCHER BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <>


            {/* Round Icon Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="group relative w-16 h-16 rounded-full bg-[#072149] shadow-[0_8px_30px_rgba(7,33,73,0.45)] border-2 border-amber-400/60 hover:scale-110 hover:border-amber-400 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              {/* Pulsing aura ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-transparent group-hover:from-amber-400/50 blur-sm transition-all duration-300" />

              {/* Inner gold circle */}
              <div className="relative w-11 h-11 rounded-full bg-white flex items-center justify-center p-1 shadow-inner overflow-hidden border border-amber-400">
                <img src="/logo-dehradun.jpg" alt="HKD Logo" className="w-full h-full object-contain rounded-full" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* ── CHATBOX WINDOW ── */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[580px] max-h-[85vh] bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_20px_60px_rgba(7,33,73,0.22)] flex flex-col overflow-hidden font-heading animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#072149] text-white p-4 sm:p-5 flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden border border-amber-400/60">
                <img src="/logo-dehradun.jpg" alt="HKD Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5 leading-snug">
                  Hare Krishna Dehradun Movement AI
                </h3>
                <p className="font-body text-[11px] text-amber-200/90 font-medium tracking-wide">
                  Temple Assistant &amp; Seva Guide
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF9F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#072149] text-white rounded-br-none shadow-md font-medium"
                      : "bg-white text-slate-800 rounded-bl-none border border-slate-200/80 shadow-sm font-normal"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Action Chips */}
                {msg.quickLinks && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.quickLinks.map((link, idx) =>
                      link.query ? (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(link.query)}
                          className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/60 font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-sm inline-flex items-center gap-1 cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          key={idx}
                          href={link.href}
                          className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/60 font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-sm inline-flex items-center gap-1"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs bg-white px-3 py-2 rounded-2xl border border-slate-200 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] text-slate-500">AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>



          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask Hare Krishna AI..."
              className="flex-1 bg-slate-100 text-slate-800 text-sm px-4 py-2.5 rounded-full border border-transparent focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-[#072149] disabled:opacity-40 text-[#F5C518] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
