"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, UploadCloud, Save, Video, Trash2, CheckCircle2, AlertCircle, Heart } from 'lucide-react';

type Reel = {
 url: string;
 caption: string;
 id?: string;
};

export default function ReelsCmsPage() {
 const { pageContent, fetchPageContent, savePageContent, uploadFile, isLoading } = useCms();
 const [saving, setSaving] = useState(false);
 const [msg, setMsg] = useState({ text: '', type: '' });
 
 const [reels, setReels] = useState<Reel[]>([]);

 useEffect(() => {
 fetchPageContent('reels');
 }, [fetchPageContent]);

  useEffect(() => {
   if (pageContent['reels'] && pageContent['reels'].reels) {
   let fetchedReels = pageContent['reels'].reels;
   const fetchedLikes = pageContent['reels'].reelLikes || {};
   if (!Array.isArray(fetchedReels) && typeof fetchedReels === 'object') {
     fetchedReels = Object.values(fetchedReels);
   }
   let initial = fetchedReels.length > 0 ? [...fetchedReels] : [];
   while (initial.length < 3) {
     initial.push({ url: '', caption: '' });
   }
   setReels(initial.map((r: any, idx: number) => ({ ...r, likes: fetchedLikes[idx] || 0, id: Math.random().toString(36).substr(2, 9) })));
   }
  }, [pageContent]);

 const handleReelUpload = async (index: number, file: File) => {
 const uploadedUrl = await uploadFile(file);
 if (uploadedUrl) {
 const newReels = [...reels];
 newReels[index].url = uploadedUrl;
 setReels(newReels);
 } else {
 setMsg({ text: 'Failed to upload image', type: 'error' });
 }
 };

 const updateCaption = (index: number, caption: string) => {
 const newReels = [...reels];
 newReels[index].caption = caption;
 setReels(newReels);
 };

  const removeReel = async (index: number) => {
  const newReels = [...reels];
  
  if (reels.length <= 3) {
    // Clear the specific slot without shifting others to prevent confusion
    newReels[index] = { url: '', caption: '', likes: 0, id: Math.random().toString(36).substr(2, 9) };
  } else {
    // Actually remove the element if there are more than 3
    newReels.splice(index, 1);
  }
  
  setReels(newReels);
  
  // Call the reset API for this reel to clear its likes in the database
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
    await fetch(`${baseUrl}/api/cms/reels/${index}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' })
    });
  } catch (err) {
    console.error('Failed to reset likes on server:', err);
  }
  
  // Automatically save upon deletion so the user doesn't have to manually click save
  const dataToSave = newReels.map(({ id, likes, ...rest }) => rest);
  const { reelLikes, ...safePageContent } = pageContent['reels'] || {};
  const updatedContent = { ...safePageContent, reels: dataToSave };
  await savePageContent('reels', updatedContent);
  };

 const addEmptyReel = () => {
  setReels([...reels, { url: '', caption: '', id: Math.random().toString(36).substr(2, 9) }]);
 };

 const handleSave = async () => {
 setSaving(true);
 setMsg({ text: '', type: '' });
 
  const dataToSave = reels.map(({ id, likes, ...rest }) => rest);
  const { reelLikes, ...safePageContent } = pageContent['reels'] || {};
  const updatedContent = { ...safePageContent, reels: dataToSave };
  const success = await savePageContent('reels', updatedContent);
 if (success) {
 setMsg({ text: 'Reels saved successfully', type: 'success' });
 } else {
 setMsg({ text: 'Failed to save content', type: 'error' });
 }
 setSaving(false);
 };

 if (isLoading && !pageContent['reels']) {
 return (
 <div className="flex h-[60vh] items-center justify-center">
 <Loader2 className="w-10 h-10 animate-spin text-gray-900" />
 </div>
 );
 }

 return (
 <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans pt-4">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
 <div>
 <h1 className="text-2xl font-black text-gray-900 tracking-tight">HKM Reels</h1>
 <p className="text-sm font-medium text-gray-900 mt-1">Manage your reels and their captions.</p>
 </div>
 <div className="flex items-center gap-3">
 <button 
 onClick={addEmptyReel} 
 className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-6 py-2.5 text-sm font-bold"
 >
 <UploadCloud className="w-4 h-4" />
 Add Reel
 </button>
 <button 
 onClick={handleSave} 
 disabled={saving}
 className="flex items-center gap-2 bg-gray-900 text-white shadow-sm hover:bg-gray-800 transition-all rounded-[12px] px-6 py-2.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
 Save Changes
 </button>
 </div>
 </div>

 {msg.text && (
 <div className={`mb-6 p-4 rounded-2xl text-sm flex items-center gap-3 border shadow-sm ${msg.type === 'success' ? 'bg-green-50/80 text-green-700 border-green-200/50' : 'bg-red-50/80 text-red-600 border-red-200/50'}`}>
 {msg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
 <span className="font-bold">{msg.text}</span>
 </div>
 )}

 <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-8">
 <h2 className="text-lg font-black text-gray-900 flex items-center gap-3 mb-8 border-b border-gray-200/50 pb-6">
 <div className="p-2 bg-gray-100 rounded-[10px]">
 <Video className="w-4 h-4" />
 </div>
 Reels Thumbnails
 </h2>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {reels.map((reel, idx) => (
 <div key={reel.id || idx} className="space-y-4">
 <div className="relative aspect-[9/16] bg-white border-2 border-dashed border-gray-200 rounded-[24px] overflow-hidden group">
 {reel.url ? (
 <>
 {reel.url.match(/\.(mp4|webm|ogg|mov|mkv)(?:$|\?)/i) ? (
  <video src={reel.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop autoPlay playsInline />
 ) : (
  <img src={reel.url} alt={`Reel ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 )}
 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
 <label className="bg-white text-gray-900 px-5 py-2.5 rounded-[12px] text-sm font-bold cursor-pointer hover:shadow-lg transition-colors flex items-center gap-2">
 <UploadCloud className="w-4 h-4" /> Replace
 <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { if(e.target.files?.[0]) handleReelUpload(idx, e.target.files[0]) }} />
 </label>
 </div>
 </>
 ) : (
 <label className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-all">
 <UploadCloud className="w-10 h-10 mb-3" />
 <span className="text-sm font-bold">Upload Reel {idx + 1}</span>
 <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { if(e.target.files?.[0]) handleReelUpload(idx, e.target.files[0]) }} />
 </label>
 )}
 </div>
 <div className="bg-white p-4 rounded-[20px] border border-gray-200/50 ">
 <div className="flex items-center justify-between mb-2">
   <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest">Caption {idx + 1}</label>
   {reel.url && (
     <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
       <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
       <span className="text-xs font-bold text-gray-700">{reel.likes || 0}</span>
     </div>
   )}
 </div>
 <textarea 
 rows={3}
 placeholder="Enter caption here..."
 value={reel.caption}
 onChange={(e) => updateCaption(idx, e.target.value)}
 className="w-full bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[12px] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none text-gray-900"
 />
 <div className="flex justify-end mt-3">
    <button onClick={() => removeReel(idx)} className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1.5 transition-colors">
      <Trash2 className="w-4 h-4" /> Delete Reel
    </button>
  </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
