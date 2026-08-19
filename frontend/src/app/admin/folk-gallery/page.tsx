"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, UploadCloud, Save, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FolkGalleryCmsPage() {
 const { pageContent, fetchPageContent, savePageContent, uploadFile, isLoading } = useCms();
 const [saving, setSaving] = useState(false);
 const [msg, setMsg] = useState({ text: '', type: '' });
 
 const [gallery, setGallery] = useState<string[]>([]);
 const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
 fetchPageContent('folk-gallery');
 }, [fetchPageContent]);

  useEffect(() => {
    if (pageContent['folk-gallery']) {
      const raw = pageContent['folk-gallery'].gallery;
      if (Array.isArray(raw)) {
        setGallery(raw.map((img: any) => typeof img === 'string' ? img : img?.url || '').filter(Boolean));
      } else if (raw && typeof raw === 'object') {
        setGallery(Object.values(raw).map((img: any) => typeof img === 'string' ? img : img?.url || '').filter(Boolean) as string[]);
      } else {
        setGallery([]);
      }
    }
  }, [pageContent]);

 const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 const newUrls = [];
 for (let i = 0; i < e.target.files.length; i++) {
 const url = await uploadFile(e.target.files[i]);
 if (url) newUrls.push(url);
 }
 setGallery([...gallery, ...newUrls]);
 }
 };

 const removeGalleryImage = (index: number) => {
 const updated = [...gallery];
 updated.splice(index, 1);
 setGallery(updated);
 };

  const handleSave = async () => {
    setSaving(true);
    setMsg({ text: '', type: '' });
    
    const updatedContent = {
      ...(pageContent['folk-gallery'] || {}),
      gallery: gallery
    };
    
    const success = await savePageContent('folk-gallery', updatedContent);
    if (success) {
      setMsg({ text: 'Gallery saved successfully', type: 'success' });
    } else {
      setMsg({ text: 'Failed to save content', type: 'error' });
    }
    setSaving(false);
  };

 if (isLoading && !pageContent['folk-gallery']) {
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
 <h1 className="text-2xl font-black text-gray-900 tracking-tight">Folk Gallery</h1>
 <p className="text-sm font-medium text-gray-900 mt-1">Manage images for the Folk page.</p>
 </div>
 <button 
 onClick={handleSave} 
 disabled={saving}
 className="flex items-center gap-2 bg-gray-900 text-white shadow-sm hover:bg-gray-800 transition-all transition-all rounded-[12px] px-6 py-2.5 text-sm font-bold disabled"
 >
 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
 Save Changes
 </button>
 </div>

 {msg.text && (
 <div className={`mb-6 p-4 rounded-2xl text-sm flex items-center gap-3 border shadow-sm ${msg.type === 'success' ? 'bg-green-50/80 text-green-700 border-green-200/50' : 'bg-red-50/80 text-red-600 border-red-200/50'}`}>
 {msg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
 <span className="font-bold">{msg.text}</span>
 </div>
 )}

 <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-8">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200/50 pb-6 mb-8 gap-4">
 <h2 className="text-lg font-black text-gray-900 flex items-center gap-3">
 <div className="p-2 bg-gray-100 rounded-[10px]">
 <ImageIcon className="w-4 h-4" />
 </div>
 Folk Photos
 </h2>
 <button 
 onClick={() => fileInputRef.current?.click()}
 className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-900 "
 >
 <UploadCloud className="w-4 h-4" />
 Upload New Images
 </button>
 <input 
 type="file" 
 accept="image/*" 
 multiple
 className="hidden" 
 ref={fileInputRef} 
 onChange={handleGalleryUpload} 
 />
 </div>
 
  {(!Array.isArray(gallery) || gallery.length === 0) ? (
  <div className="text-center py-16 text-gray-400 bg-white rounded-[20px] border-2 border-gray-200/50 border-dashed flex flex-col items-center justify-center">
  <ImageIcon className="w-12 h-12 mb-3 text-gray-300 " />
  <p className="font-bold text-sm">No images in the gallery</p>
  <p className="text-xs mt-1">Click 'Upload New Images' to begin.</p>
  </div>
  ) : (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {(Array.isArray(gallery) ? gallery : []).map((url, idx) => (
 <div key={idx} className="relative group rounded-[16px] overflow-hidden aspect-square border border-gray-200 shadow-sm">
 {url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') ? (
   <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 ) : (
   <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 )}
 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
 <button 
 onClick={() => removeGalleryImage(idx)}
 className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center transition-colors shadow-lg border border-red-500/50"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
