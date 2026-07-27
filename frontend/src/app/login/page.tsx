"use client";

import React, { useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, verifyMfa } = useCms();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // MFA states
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [tempToken, setTempToken] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      if (result.mfaRequired) {
        setTempToken(result.tempToken || '');
        setMfaStep(true);
      } else {
        router.push('/admin');
      }
    } else {
      setErrorMsg(result.error || 'Invalid administrative email address or password.');
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode) {
      setErrorMsg('Please enter your MFA code.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    const result = await verifyMfa(tempToken, mfaCode);
    setIsLoading(false);

    if (result.success) {
      router.push('/admin');
    } else {
      setErrorMsg(result.error || 'Invalid MFA code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfb] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-[420px]">
        
        <div className="mb-8">
          <img src="/logo-dehradun.webp" alt="HKD Logo" className="h-16 md:h-20 w-auto object-contain mb-6" />
          <h2 className="text-[26px] font-bold text-gray-900 tracking-tight mb-2">
            Authentication
          </h2>
          <p className="text-[15px] text-gray-500 font-medium leading-relaxed pr-8">
            Manage temple activities, publish content and boost your digital presence
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-[14px] p-4 text-[13px] font-medium mb-6">
            {errorMsg}
          </div>
        )}

        {!mfaStep ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
            <input
              type="email"
              required
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[14px] px-4 py-3.5 text-[15px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all placeholder:text-gray-400 shadow-sm"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[14px] pl-4 pr-12 py-3.5 text-[15px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all placeholder:text-gray-400 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-[14px] shadow-sm text-[15px] font-bold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-70 mt-6"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In to Dashboard
            </button>
          </div>
        </form>
        ) : (
          <form onSubmit={handleMfaVerify} className="space-y-4">
            <p className="text-[14px] text-gray-600 mb-4">
              Please enter the 6-digit code from your Authenticator app.
            </p>
            <div>
              <input
                type="text"
                placeholder="000000"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-[14px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF4655]/20 focus:border-[#FF4655] transition-all placeholder:text-gray-400 text-center tracking-widest font-mono text-lg"
                required
              />
            </div>
            
            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-[14px] shadow-sm text-[15px] font-bold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-70 mt-6"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Verify & Sign In
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
