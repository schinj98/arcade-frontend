"use client";
import { useEffect, useContext, useRef, useState } from "react";
import { ThemeContext } from '@/context/ThemeContext';

export default function AdBanner({ adSlot, desktopStyle, mobileStyle, dataAdFormat, dataFullWidthResponsive }) {
  const { isDarkMode } = useContext(ThemeContext);
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Ensure AdSense script is loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183171666938196';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Wait for the ad container to be ready
    const timer = setTimeout(() => {
      if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        } catch (error) {
          console.error('AdSense initialization error:', error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const themeClasses = {
    cardBg: isDarkMode ? "bg-slate-900/95" : "bg-white/95",
    border: isDarkMode ? "border-slate-700/50" : "border-gray-200",
    gradientBg: isDarkMode ? "from-slate-800 to-slate-900" : "from-gray-50 to-gray-100",
    text: isDarkMode ? "text-slate-300" : "text-gray-500",
  };

  return (
    <div className={`rounded-2xl shadow-sm overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border}`}>
      <div className={`relative p-4 bg-gradient-to-br ${themeClasses.gradientBg} min-h-[200px] flex items-center justify-center`}>
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border
          bg-gray-50 text-gray-600 border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
        >
          📢 Sponsored
        </div>

        {/* Single responsive ad container */}
        <div className="w-full max-w-full flex justify-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ 
              display: 'block',
              width: '100%',
              minHeight: '150px',
              ...desktopStyle 
            }}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot={adSlot}
            data-ad-format={dataAdFormat || 'auto'}
            data-full-width-responsive={dataFullWidthResponsive || 'true'}
          />
        </div>

        {/* Fallback content while ad loads */}
        {!adLoaded && (
          <div className="absolute inset-4 flex items-center justify-center">
            <div className={`text-center ${themeClasses.text}`}>
              <div className="animate-pulse">Loading advertisement...</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 text-center text-sm text-gray-500 dark:text-slate-400">
        Advertisement
      </div>
    </div>
  );
}