"use client";
import { useEffect, useContext, useRef } from "react";
import { ThemeContext } from '@/context/ThemeContext';

export default function AdBanner({ adSlot }) {
  const { isDarkMode } = useContext(ThemeContext);
  const adRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) return;
    
    try {
      if (typeof window !== "undefined" && adRef.current) {
        // Check if this specific ad element is already processed
        if (!adRef.current.getAttribute('data-adsbygoogle-status')) {
          // Mark as initialized to prevent duplicate calls
          isInitialized.current = true;
          
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
              console.error("AdSense push error", e);
              // Reset flag on error to allow retry
              isInitialized.current = false;
            }
          }, 100);
        }
      }
    } catch (e) {
      console.error("AdSense error", e);
      isInitialized.current = false;
    }
  }, []); // Remove adSlot dependency to prevent re-initialization

  const themeClasses = {
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    gradientBg: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-gray-100',
    text: isDarkMode ? 'text-slate-300' : 'text-gray-500',
  };

  return (
    <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}>
      <div className={`relative min-h-[250px] max-h-[400px] flex justify-center items-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}>
        <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${
          isDarkMode
            ? "bg-slate-800 text-slate-300 border-slate-700"
            : "bg-gray-50 text-gray-600 border-gray-200"
        }`}>
          📢 Sponsored
        </div>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-5183171666938196"
          data-ad-slot={adSlot}
          data-full-width-responsive="true"
        />
      </div>
      <div className="p-6 text-center text-sm text-gray-500">
        Advertisement
      </div>
    </div>
  );
}