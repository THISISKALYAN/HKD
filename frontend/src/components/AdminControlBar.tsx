"use client";

import React, { useState } from 'react';
import { useCms } from './CmsContext';
import { Save, LogOut, LayoutGrid, Check, AlertCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminControlBar() {
  const { editMode, setEditMode, role, logout, savePageContent, token } = useCms();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const pathname = usePathname();

  if (!role || !token) return null;
  if (pathname === '/') return null;

  // Extract page ID from URL (e.g. '/' -> 'home')
  const getPageId = () => {
    if (pathname === '/') return 'home';
    const firstPart = pathname.split('/')[1];
    return firstPart || 'home';
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    const pageId = getPageId();
    const success = await savePageContent(pageId);
    if (success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-xl">
      <div className="bg-charcoal-900 border border-saffron/30 rounded-full py-3 px-6 shadow-2xl flex items-center justify-between text-white glass-nav">
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-saffron-light">
            {role} Mode
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Edit Mode Toggle */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              editMode 
                ? 'bg-saffron text-white shadow-md' 
                : 'hover:bg-charcoal-700 text-charcoal-100'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{editMode ? 'Edit ON' : 'Edit OFF'}</span>
          </button>

          {/* Commit Changes */}
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-1.5 bg-saffron-dark hover:bg-saffron text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all disabled:opacity-50"
          >
            {saveStatus === 'saving' && <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />}
            {saveStatus === 'success' && <Check className="w-3.5 h-3.5 text-green-300" />}
            {saveStatus === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-300" />}
            {saveStatus === 'idle' && <Save className="w-3.5 h-3.5" />}
            <span>
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'success' ? 'Saved!' :
               saveStatus === 'error' ? 'Error' : 'Save Page'}
            </span>
          </button>

          {/* Sign Out */}
          <button
            onClick={logout}
            className="hover:bg-red-900/40 text-red-300 p-2 rounded-full transition-all"
            title="Log Out Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
