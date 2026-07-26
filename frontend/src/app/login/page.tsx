"use client";

import React, { useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useCms();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      // Redirect back home with administration session initialized
      router.push('/admin');
    } else {
      setErrorMsg(result.error || 'Invalid administrative email address or password.');
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
            <div className="button-borders w-full">
              <button
                type="submit"
                disabled={isLoading}
                className="primary-button flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'AUTHENTICATION'}
              </button>
            </div>

            <style>{`
              .primary-button {
               font-family: 'Ropa Sans', sans-serif;
               color: white;
               cursor: pointer;
               font-size: 13px;
               font-weight: bold;
               letter-spacing: 0.05rem;
               border: 1px solid #0E1822;
               padding: 0.8rem 2.1rem;
               background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23FF4655 %7D %3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpolygon class='shape' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
               background-color: #0E1822;
               background-size: 200%;
               background-position: 200%;
               background-repeat: no-repeat;
               transition: 0.3s ease-in-out;
               transition-property: background-position, border, color;
               position: relative;
               z-index: 1;
               width: 100%;
               height: 52px;
              }

              .primary-button:hover {
               border: 1px solid #FF4655;
               color: white;
               background-position: 40%;
              }

              .primary-button:before {
               content: "";
               position: absolute;
               background-color: #0E1822;
               width: 0.2rem;
               height: 0.2rem;
               top: -1px;
               left: -1px;
               transition: background-color 0.15s ease-in-out;
              }

              .primary-button:hover:before, .primary-button:hover:after {
               background-color: white;
              }

              .primary-button:after {
               content: "";
               position: absolute;
               background-color: #FF4655;
               width: 0.3rem;
               height: 0.3rem;
               bottom: -1px;
               right: -1px;
               transition: background-color 0.15s ease-in-out;
              }

              .button-borders {
               position: relative;
               width: 100%;
               height: fit-content;
              }

              .button-borders:before {
               content: "";
               position: absolute;
               width: calc(100% + 0.5em);
               height: 50%;
               left: -0.3em;
               top: -0.3em;
               border: 1px solid #0E1822;
               border-bottom: 0px;
              }

              .button-borders:after {
               content: "";
               position: absolute;
               width: calc(100% + 0.5em);
               height: 50%;
               left: -0.3em;
               bottom: -0.3em;
               border: 1px solid #0E1822;
               border-top: 0px;
               z-index: 0;
              }
            `}</style>
          </div>
        </form>

      </div>
    </div>
  );
}
