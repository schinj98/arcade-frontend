'use client';

import React, { useEffect, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function AdSenseAds({ adSlot }) {
  const { isDarkMode } = useContext(ThemeContext);

  const themeClasses = {
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    gradientBg: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-gray-100',
    text: isDarkMode ? 'text-slate-300' : 'text-gray-500',
  };

  useEffect(() => {
    // Load AdSense script only once
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183171666938196';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Push ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}>
      <div className={`relative h-48 flex items-center justify-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}>
        <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          📢 Sponsored
        </div>

        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-5183171666938196"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className={`text-sm text-center ${themeClasses.text}`}>
          Advertisement
        </div>
      </div>
    </div>
  );
}
