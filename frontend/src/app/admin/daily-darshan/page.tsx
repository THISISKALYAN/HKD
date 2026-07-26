"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, UploadCloud, Save, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DailyDarshanCmsPage() {
 const { pageContent, fetchPageContent, savePageContent, uploadFile, isLoading } = useCms();
 const [saving, setSaving] = useState(false);
 const [msg, setMsg] = useState({ text: '', type: '' });
 
 const defaultGallery = [
 '/darshan/DSC04178.webp',
 '/darshan/DSC04179.webp',
 '/darshan/DSC04180.webp',
 '/darshan/DSC04181.webp',
 '/darshan/DSC04182.webp',
 '/darshan/DSC04071.webp',
 '/darshan/DSC04072.webp',
 '/darshan/DSC04074.webp',
 '/darshan/DSC04083.webp',
 '/darshan/DSC04087.webp',
 ];

 const [gallery, setGallery] = useState<string[]>(defaultGallery);
 const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
 fetchPageContent('daily-darshan');
 }, [fetchPageContent]);

 useEffect(() => {
 if (pageContent['daily-darshan']) {
 if (pageContent['daily-darshan'].gallery && pageContent['daily-darshan'].gallery.length > 0) {
 setGallery(pageContent['daily-darshan'].gallery);
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

 const handleGalleryReplace = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
 if (e.target.files && e.target.files[0]) {
 const url = await uploadFile(e.target.files[0]);
 if (url) {
 const updated = [...gallery];
 updated[index] = url;
 setGallery(updated);
 }
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
 
 // Update context state manually before saving
 if (!pageContent['daily-darshan']) pageContent['daily-darshan'] = {};
 pageContent['daily-darshan'].gallery = gallery;
 
 const success = await savePageContent('daily-darshan');
 if (success) {
 setMsg({ text: 'Gallery saved successfully', type: 'success' });
 } else {
 setMsg({ text: 'Failed to save content', type: 'error' });
 }
 setSaving(false);
 };

 if (isLoading && !pageContent['daily-darshan']) {
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
 <h1 className="text-2xl font-black text-gray-900 tracking-tight">Daily Darshan Gallery</h1>
 <p className="text-sm font-medium text-gray-900 mt-1">Manage images for the Daily Darshan page.</p>
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
 Darshan Photos
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
 
 {gallery.length === 0 ? (
 <div className="text-center py-16 text-gray-400 bg-white rounded-[20px] border-2 border-gray-200/50 border-dashed flex flex-col items-center justify-center">
 <ImageIcon className="w-12 h-12 mb-3 text-gray-300 " />
 <p className="font-bold text-sm">No images in the gallery</p>
 <p className="text-xs mt-1">Click 'Upload New Images' to begin.</p>
 </div>
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
 {gallery.map((url, idx) => (
 <div key={idx} className="relative group rounded-[16px] overflow-hidden aspect-square border border-gray-200 shadow-sm">
 <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
 <label className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center transition-colors cursor-pointer shadow-lg border border-gray-200/20">
 <UploadCloud className="w-4 h-4" />
 <input 
 type="file" 
 accept="image/*" 
 className="hidden" 
 onChange={(e) => handleGalleryReplace(e, idx)} 
 />
 </label>
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
