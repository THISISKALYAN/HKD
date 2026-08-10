"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCms } from '@/components/CmsContext';
import { 
  LayoutDashboard, 
  Home, 
  Image as ImageIcon, 
  Video, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Flower2,
  Search,
  Bell,
  Menu,
  X,
  CheckCircle2,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, user, token, logout, isHydrated } = useCms();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && (!token || !role || !user)) {
      router.replace('/login');
    }
  }, [isHydrated, token, role, user, router]);

  if (!isHydrated || !token || !role || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 fixed inset-0 z-[99999]">
        <div className="w-12 h-12 border-4 border-[#072149]/20 border-t-[#072149] rounded-full animate-spin"></div>
      </div>
    );
  }

  const allModules = [
    { name: 'Dashboard', id: 'dashboard', href: '/admin', icon: LayoutDashboard, exact: true, category: 'GENERAL' },
    { name: 'Inquiries', id: 'leads', href: '/admin/leads', icon: Users, category: 'GENERAL' },
    { name: 'Manage Blogs', id: 'blogs', href: '/admin/blogs', icon: FileText, category: 'GENERAL' },
    { name: 'Homepage', id: 'home', href: '/admin/home', icon: Home, category: 'TOOLS' },
    { name: 'Daily Darshan', id: 'daily-darshan', href: '/admin/daily-darshan', icon: Flower2, category: 'TOOLS' },
    { name: 'Folk Gallery', id: 'folk-gallery', href: '/admin/folk-gallery', icon: ImageIcon, category: 'TOOLS' },
    { name: 'HKM Reels', id: 'reels', href: '/admin/reels', icon: Video, category: 'TOOLS' },
    { name: 'Settings & Users', id: 'settings', href: '/admin/settings', icon: Settings, category: 'SUPPORT', superadminOnly: true },
  ];

  const navItems = allModules.filter(module => {
    if (module.superadminOnly && role !== 'superadmin') return false;
    if (role === 'superadmin') return true;
    if (module.id === 'dashboard') return true;
    return user.permissions?.includes(module.id);
  });

  return (
    <AdminLayoutContent navItems={navItems} allModules={allModules}>
      {children}
    </AdminLayoutContent>
  );
}

function AdminLayoutContent({ navItems, allModules, children }: { navItems: any[], allModules: any[], children: React.ReactNode }) {
  const { role, user, logout } = useCms();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New lead received', time: '5m ago', read: false },
    { id: 2, title: 'Hero image updated', time: '2h ago', read: false },
    { id: 3, title: 'System backup completed', time: '1d ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const clearNotifications = () => setNotifications([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.notification-dropdown') && !(e.target as Element).closest('.notification-trigger')) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = ['GENERAL', 'TOOLS', 'SUPPORT'];

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex fixed inset-0 z-[99999] overflow-hidden text-gray-900">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Sleek Minimalist Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[270px] bg-white border-r border-gray-200/80 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:flex-shrink-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo Area */}
        <div className="h-[76px] flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0 relative">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image 
                src="/logo-dehradun.webp" 
                alt="Hare Krishna Dehradun Movement" 
                width={140}
                height={42}
                priority
                className="h-9 w-auto object-contain"
              />
              <span className="px-2 py-0.5 rounded-full bg-[#072149]/5 border border-[#072149]/10 text-[#072149] text-[9px] font-black tracking-widest uppercase">
                CMS
              </span>
            </Link>
          </div>
          <button 
            className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar">
          {categories.map(category => {
            const categoryItems = navItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="px-3 text-[10px] font-black text-gray-400 mb-2.5 tracking-[0.2em] uppercase">{category}</h3>
                <div className="space-y-1">
                  {categoryItems.map((item) => {
                    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-200 group relative ${
                          isActive 
                            ? 'bg-[#072149] text-white shadow-md shadow-[#072149]/20 font-bold' 
                            : 'hover:bg-gray-100/80 text-gray-600 hover:text-gray-900 font-medium border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-xl flex items-center justify-center transition-colors ${
                            isActive 
                              ? 'bg-white/15 text-white' 
                              : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-gray-900 border border-gray-200/50'
                          }`}>
                            <item.icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                          </div>
                          <span className="text-xs sm:text-sm tracking-tight">
                            {item.name}
                          </span>
                        </div>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-[#F5C518]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Profile Area */}
        <div className="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-md">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-3.5 mb-3 border border-gray-200/80 shadow-sm transition-all hover:shadow-md group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#072149] flex items-center justify-center text-white font-black text-sm shadow-inner overflow-hidden border border-white/20">
                  <Image src="/logo-dehradun.webp" alt="Admin Logo" width={36} height={36} className="w-full h-full object-contain p-1" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-black text-gray-900 truncate">{user?.name === 'System Admin' ? 'Admin' : user?.name}</p>
                <p className="text-[10px] font-bold text-emerald-700 truncate capitalize flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {role}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-gray-200 text-xs font-extrabold text-gray-600 transition-all flex items-center justify-center gap-2 group"
          >
            <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-transparent relative z-10">
        
        {/* Top Navbar */}
        <header className="h-[76px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sm:px-8 flex-shrink-0 z-30 relative">
          
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors "
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Elegant Search Bar */}
            <div className="relative hidden md:block max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="pl-11 pr-16 py-2.5 bg-gray-50 border border-gray-200 rounded-[12px] text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all w-full placeholder-gray-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                <span className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">⌘K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="notification-trigger relative p-2.5 text-gray-600 hover:text-gray-900 transition-all rounded-[12px] bg-white hover:bg-gray-50 border border-gray-200"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-[16px] shadow-lg z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                    <div className="flex gap-1.5">
                      <button onClick={markAllRead} className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-1.5 rounded-lg transition-colors" title="Mark all as read">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button onClick={clearNotifications} className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors" title="Clear all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                        <Bell className="w-8 h-8 text-gray-200" />
                        <p className="text-gray-500 text-sm font-medium">You're all caught up!</p>
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.read ? 'bg-transparent' : 'bg-blue-600'}`} />
                          <div>
                            <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{notif.title}</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-transparent">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #D1D5DB;
        }
      `}</style>
    </div>
  );
}
