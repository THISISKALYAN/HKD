"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bot, X, Send } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  quickLinks?: { label: string; href: string }[];
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; links?: { label: string; href: string }[] }[] = [
  {
    keywords: ["timing", "darshan", "time", "open", "schedule", "aarti"],
    answer: "Hare Krishna! 🙏 Daily Temple Timings at Hare Krishna Movement Dehradun:\n• Morning Darshan & Mangala Aarti: 4:30 AM - 1:00 PM\n• Evening Darshan & Sandhya Aarti: 4:30 PM - 8:30 PM",
    links: [
      { label: "View Daily Darshan", href: "/daily-darshan" },
      { label: "Explore Temple", href: "/#about" }
    ]
  },
  {
    keywords: ["gau", "cow", "gauseva", "surabhi"],
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
      { label: "Khichdi Prasadam", href: "/khichdi-prasadam-seva" }
    ]
  },
  {
    keywords: ["donate", "donation", "tax", "80g", "receipt", "deduction"],
    answer: "All donations to Hare Krishna Movement Dehradun are 100% eligible for 80G Income Tax Exemption under the Income Tax Act. Instant digital receipts are issued immediately.",
    links: [
      { label: "Donate Online", href: "/donate" }
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
    keywords: ["youth", "folk", "student", "workshop", "college"],
    answer: "FOLK (Friends of Lord Krishna) is our youth empowerment initiative offering Gita life courses, personality enrichment, and stress-management workshops for students and young professionals.",
    links: [
      { label: "Youth Programs", href: "/youth" },
      { label: "Gita Life Course", href: "/gita-life-course" }
    ]
  },
  {
    keywords: ["monk", "monkhood", "challenge", "dedicate", "life"],
    answer: "Experience the transformative monkhood program! Learn timeless self-discipline, meditation, and spiritual leadership in our structured retreat.",
    links: [
      { label: "Become a Monk Program", href: "/become-a-monk" }
    ]
  },
  {
    keywords: ["location", "address", "reach", "contact", "phone", "where"],
    answer: "📍 Address: Khasra No. 801, Suddhowala, Near IIM Kashipur Satellite Campus, Dehradun 248015\n📞 Phone: +91 9398710996\n✉️ Email: contact@hkmdehradun.org"
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
        { label: "🕉️ Temple Timings", href: "/daily-darshan" },
        { label: "🐮 Gau Seva", href: "/gau-seva" },
        { label: "🍲 Annadana Seva", href: "/annadana-seva" },
        { label: "🤝 Volunteer", href: "/volunteer" }
      ]
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (pathname && (pathname.startsWith("/reels") || pathname.startsWith("/admin"))) {
    return null;
  }

  const generateAiReply = (userQuery: string) => {
    const queryLower = userQuery.toLowerCase();
    
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => queryLower.includes(kw))) {
        return { answer: item.answer, links: item.links };
      }
    }

    return {
      answer: `Hare Krishna! 🙏 Thank you for your inquiry about "${userQuery}". Our temple team is dedicated to serving you. You can connect with us directly or explore our Seva programs below.`,
      links: [
        { label: "Explore Seva Opportunities", href: "/donate" },
        { label: "Contact Temple Team", href: "/volunteer#register-form" }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
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

    setTimeout(() => {
      const reply = generateAiReply(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: reply.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickLinks: reply.links
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* ── FLOATING LAUNCHER BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <>
            {/* Label badge above button */}
            <div className="flex items-center gap-1.5 bg-[#072149] text-amber-300 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full shadow-lg border border-amber-400/40">
              <span className="flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Ask AI
            </div>

            {/* Round Icon Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="group relative w-16 h-16 rounded-full bg-[#072149] shadow-[0_8px_30px_rgba(7,33,73,0.45)] border-2 border-amber-400/60 hover:scale-110 hover:border-amber-400 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              {/* Pulsing aura ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-transparent group-hover:from-amber-400/50 blur-sm transition-all duration-300" />

              {/* Inner gold circle */}
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#F5C518] to-amber-500 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-[#072149]" strokeWidth={2.5} />
              </div>
            </button>
          </>
        )}
      </div>

      {/* ── CHATBOX WINDOW ── */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[580px] max-h-[85vh] bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_20px_60px_rgba(7,33,73,0.22)] flex flex-col overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#072149] text-white p-4 sm:p-5 flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#072149] rounded-[14px] flex items-center justify-center text-[#F5C518]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#072149] rounded-full" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  Hare Krishna AI <span className="text-[#F5C518]">✨</span>
                </h3>
                <p className="text-[11px] text-amber-200/90 font-medium">
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
                    {msg.quickLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/60 font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-sm inline-flex items-center gap-1"
                      >
                        {link.label}
                      </a>
                    ))}
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

          {/* Suggested Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage("Temple Timings")}
              className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-full transition-colors"
            >
              ⏱️ Timings
            </button>
            <button
              onClick={() => handleSendMessage("How to offer Gau Seva?")}
              className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-full transition-colors"
            >
              🐮 Gau Seva
            </button>
            <button
              onClick={() => handleSendMessage("Annadana Seva details")}
              className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-full transition-colors"
            >
              🍲 Annadana
            </button>
            <button
              onClick={() => handleSendMessage("80G Tax Exemption")}
              className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-full transition-colors"
            >
              📜 80G Tax
            </button>
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
