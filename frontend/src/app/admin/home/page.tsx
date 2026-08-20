"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, UploadCloud, Save, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function HomeCmsPage() {
  const { pageContent, fetchPageContent, savePageContent, uploadFile, isLoading } = useCms();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  
  // Local state for edits
  const defaultHero = ['/h1.webp', '/h2.webp', '/h3.webp'];
  const defaultGallery = Array.from({ length: 29 }, (_, i) => `/Photo from Vishwas Murthy(${i + 1}).jpg`);
  
  const [heroImages, setHeroImages] = useState<string[]>(defaultHero);
  const [gallery, setGallery] = useState<string[]>(defaultGallery);
  
  const fileInputRefHero = useRef<HTMLInputElement>(null);
  const [uploadingHeroIdx, setUploadingHeroIdx] = useState<number | null>(null);
  const fileInputRefGallery = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPageContent('home');
  }, [fetchPageContent]);

  useEffect(() => {
    if (pageContent['home']) {
      const home = pageContent['home'];
      if (home.heroImages) {
        if (Array.isArray(home.heroImages)) {
          setHeroImages(home.heroImages);
        } else if (typeof home.heroImages === 'object') {
          setHeroImages(Object.values(home.heroImages));
        }
      }
      if (home.templeGallery) {
        if (Array.isArray(home.templeGallery)) {
          setGallery(home.templeGallery);
        } else if (typeof home.templeGallery === 'object') {
          setGallery(Object.values(home.templeGallery));
        }
      }
    }
  }, [pageContent]);

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && uploadingHeroIdx !== null) {
      const url = await uploadFile(e.target.files[0]);
      if (url) {
        const newImages = [...heroImages];
        newImages[uploadingHeroIdx] = url;
        setHeroImages(newImages);
      } else {
        setMsg({ text: 'Failed to upload hero image', type: 'error' });
      }
      setUploadingHeroIdx(null);
    }
  };

  const removeHeroImage = (index: number) => {
    const updated = [...heroImages];
    updated.splice(index, 1);
    setHeroImages(updated);
  };
  
  const addHeroImage = () => {
    if (heroImages.length < 10) {
      setHeroImages([...heroImages, '']);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Multiple uploads
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
    pageContent['home'].heroImages = heroImages;
    pageContent['home'].templeGallery = gallery;
    
    const success = await savePageContent('home');
    if (success) {
      setMsg({ text: 'Homepage content saved successfully', type: 'success' });
    } else {
      setMsg({ text: 'Failed to save content', type: 'error' });
    }
    setSaving(false);
  };

  if (isLoading && !pageContent['home']) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#004B2C]" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Homepage CMS</h1>
          <p className="text-sm font-medium text-gray-500">Manage hero section and temple gallery.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-sm transition-all rounded-[12px] px-6 py-2.5 text-sm font-bold disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {msg.text && (
        <div className={`mb-6 p-4 rounded-[16px] text-sm flex items-center gap-3 border shadow-sm font-medium ${msg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-[10px]">
              <ImageIcon className="w-4 h-4 text-gray-500" />
            </div>
            Hero Section
          </h2>
          <button 
            onClick={addHeroImage}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700"
          >
            <UploadCloud className="w-4 h-4" />
            Add Image
          </button>
        </div>
        
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRefHero} 
          onChange={handleHeroUpload} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroImages.map((imgUrl, idx) => (
            <div key={idx} className="bg-white p-3 rounded-[20px] border border-gray-200 flex flex-col shadow-sm">
              <div 
                className="relative rounded-[16px] overflow-hidden border border-gray-200 bg-gray-50 flex flex-col items-center justify-center group cursor-pointer aspect-[16/9] transition-all"
                onClick={() => {
                  setUploadingHeroIdx(idx);
                  fileInputRefHero.current?.click();
                }}
              >
                {imgUrl ? (
                  <>
                    <img loading="lazy" src={imgUrl} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-[2px]">
                      <UploadCloud className="w-8 h-8" />
                      <span className="font-bold text-sm bg-white text-gray-900 px-3 py-1.5 rounded-[8px]">Replace Image</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <span className="font-bold text-sm group-hover:text-gray-600 transition-colors">Click to upload</span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => removeHeroImage(idx)}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-[12px] transition-colors font-bold border border-red-100"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Temple Gallery Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-[10px]">
              <ImageIcon className="w-4 h-4 text-gray-500" />
            </div>
            Temple Gallery
          </h2>
          <button 
            onClick={() => fileInputRefGallery.current?.click()}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all rounded-[12px] px-4 py-2 text-sm font-bold text-gray-700"
          >
            <UploadCloud className="w-4 h-4" />
            Add Images
          </button>
          <input 
            type="file" 
            accept="image/*" 
            multiple
            className="hidden" 
            ref={fileInputRefGallery} 
            onChange={handleGalleryUpload} 
          />
        </div>
        
        {gallery.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-[20px] border border-gray-200 border-dashed flex flex-col items-center justify-center">
            <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
            <p className="font-bold text-sm text-gray-600">No images in the gallery</p>
            <p className="text-xs mt-1 font-medium text-gray-500">Click 'Add Images' to upload.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {gallery.map((url, idx) => (
              <div key={idx} className="relative group rounded-[16px] overflow-hidden aspect-square border border-gray-200 shadow-sm">
                <img loading="lazy" src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <label className="w-10 h-10 rounded-[12px] bg-white text-gray-900 flex items-center justify-center transition-colors cursor-pointer shadow-sm border border-gray-200">
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
                    className="w-10 h-10 rounded-[12px] bg-red-50 text-red-600 flex items-center justify-center transition-colors shadow-sm border border-red-200 hover:bg-red-100"
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
