"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/lib/axios';

interface CmsContextType {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  role: 'superadmin' | 'admin' | 'staff' | null;
  setRole: (role: 'superadmin' | 'admin' | 'staff' | null) => void;
  user: { name?: string; email?: string; role: string; permissions?: string[] } | null;
  setUser: (user: any) => void;
  token: string | null;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  logout: () => void;
  pageContent: Record<string, any>;
  fetchPageContent: (pageId: string) => Promise<void>;
  updatePageField: (pageId: string, section: string, field: string, value: any) => void;
  savePageContent: (pageId: string) => Promise<boolean>;
  uploadFile: (file: File) => Promise<string | null>;
  isLoading: boolean;
  isHydrated: boolean;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used within a CmsProvider");
  return context;
};

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState<'superadmin' | 'admin' | 'staff' | null>(null);
  const [user, setUser] = useState<{ name?: string; email?: string; role: string; permissions?: string[] } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore session from localStorage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('hkd_admin_token');
    const savedRole = localStorage.getItem('hkd_admin_role');
    const savedUser = localStorage.getItem('hkd_admin_user');
    
    if (savedToken && savedRole && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setRole(savedRole as any);
        setUser(parsedUser);
      } catch (e) {
        // Corrupted session
        localStorage.removeItem('hkd_admin_token');
        localStorage.removeItem('hkd_admin_role');
        localStorage.removeItem('hkd_admin_user');
      }
    } else {
      // Incomplete session, clear it to prevent infinite loops
      localStorage.removeItem('hkd_admin_token');
      localStorage.removeItem('hkd_admin_role');
      localStorage.removeItem('hkd_admin_user');
    }
    
    setIsHydrated(true);
  }, []);

  const login = async (email: string, password: string): Promise<{success: boolean; error?: string}> => {
    try {
      const response = await apiClient.post(`/api/cms/auth/login`, {
        email,
        password
      });
      const { token: jwtToken, user } = response.data;
      
      setToken(jwtToken);
      setRole(user.role);
      setUser(user);
      localStorage.setItem('hkd_admin_token', jwtToken);
      localStorage.setItem('hkd_admin_role', user.role);
      localStorage.setItem('hkd_admin_user', JSON.stringify(user));
      return { success: true };
    } catch (error: any) {
      console.error("Sign-in failed:", error);
      if (error.response?.data?.error) {
        return { success: false, error: error.response.data.error };
      }
      return { success: false, error: "Network error: Unable to connect to backend server." };
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    setEditMode(false);
    localStorage.removeItem('hkd_admin_token');
    localStorage.removeItem('hkd_admin_role');
    localStorage.removeItem('hkd_admin_user');
  };

  const fetchPageContent = React.useCallback(async (pageId: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/api/cms/pages/${pageId}`);
      setPageContent(prev => ({
        ...prev,
        [pageId]: response.data
      }));
    } catch (error) {
      console.error(`Failed to load visual page sections for ${pageId}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePageField = (pageId: string, section: string, field: string, value: string) => {
    setPageContent(prev => {
      const updatedPage = { ...prev[pageId] };
      if (!updatedPage[section]) {
        updatedPage[section] = {};
      }
      updatedPage[section][field] = value;
      return {
        ...prev,
        [pageId]: updatedPage
      };
    });
  };

  const savePageContent = async (pageId: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const response = await apiClient.put(
        `/api/cms/pages/${pageId}`,
        pageContent[pageId]
      );
      return true;
    } catch (error) {
      console.error(`Failed to save visual CMS page content for ${pageId}:`, error);
      return false;
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!token) return null;
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post(`/api/cms/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      return response.data.url;
    } catch (error) {
      console.error('File upload failed:', error);
      setIsLoading(false);
      return null;
    }
  };

  return (
    <CmsContext.Provider value={{
      editMode,
      setEditMode,
      role,
      setRole,
      user,
      setUser,
      token,
      login,
      logout,
      pageContent,
      fetchPageContent,
      updatePageField,
      savePageContent,
      uploadFile,
      isLoading,
      isHydrated
    }}>
      {children}
    </CmsContext.Provider>
  );
};
