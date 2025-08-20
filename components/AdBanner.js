"use client";
import { useEffect, useContext, useRef, useState } from "react";
import { ThemeContext } from '@/context/ThemeContext';

// Global state to manage ad initialization queue
let adInitQueue = [];
let isProcessingQueue = false;

export default function AdBanner({ adSlot, desktopStyle, mobileStyle, dataAdFormat, dataFullWidthResponsive, priority = 0 }) {
  const { isDarkMode } = useContext(ThemeContext);
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Ensure AdSense script is loaded
    const loadAdSenseScript = () => {
      if (!window.adsbygoogle && !document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183171666938196';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    };

    loadAdSenseScript();

    // Add this ad to the initialization queue
    const adConfig = {
      ref: adRef,
      slot: adSlot,
      priority: priority,
      callback: (success) => {
        if (success) {
          setAdLoaded(true);
        } else {
          setAdError(true);
        }
      }
    };

    adInitQueue.push(adConfig);
    adInitQueue.sort((a, b) => b.priority - a.priority); // Higher priority first

    // Process the queue
    processAdQueue();

    return () => {
      // Remove from queue if component unmounts
      adInitQueue = adInitQueue.filter(config => config.ref !== adRef);
    };
  }, [adSlot, priority]);

  const processAdQueue = async () => {
    if (isProcessingQueue || adInitQueue.length === 0) return;
    
    isProcessingQueue = true;

    while (adInitQueue.length > 0) {
      const adConfig = adInitQueue.shift();
      
      if (adConfig.ref.current && !adConfig.ref.current.getAttribute('data-adsbygoogle-status')) {
        try {
          // Wait for AdSense to be available
          await waitForAdSense();
          
          // Initialize the ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          
          // Wait a bit before processing the next ad
          await new Promise(resolve => setTimeout(resolve, 500));
          
          adConfig.callback(true);
        } catch (error) {
          console.error('AdSense initialization error for slot', adConfig.slot, ':', error);
          adConfig.callback(false);
        }
      }
    }

    isProcessingQueue = false;
  };

  const waitForAdSense = () => {
    return new Promise((resolve) => {
      const checkAdSense = () => {
        if (window.adsbygoogle) {
          resolve();
        } else {
          setTimeout(checkAdSense, 100);
        }
      };
      checkAdSense();
    });
  };

  const themeClasses = {
    cardBg: isDarkMode ? "bg-slate-900/95" : "bg-white/95",
    border: isDarkMode ? "border-slate-700/50" : "border-gray-200",
    gradientBg: isDarkMode ? "from-slate-800 to-slate-900" : "from-gray-50 to-gray-100",
    text: isDarkMode ? "text-slate-300" : "text-gray-500",
  };

  if (adError) {
    return (
      <div className={`rounded-2xl shadow-sm overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border}`}>
        <div className={`relative p-4 bg-gradient-to-br ${themeClasses.gradientBg} min-h-[150px] flex items-center justify-center`}>
          <div className={`text-center ${themeClasses.text}`}>
            <div className="text-sm">Advertisement space</div>
          </div>
        </div>
      </div>
    );
  }

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
        {!adLoaded && !adError && (
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