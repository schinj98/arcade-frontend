"use client";
import { useEffect, useContext, useRef, useState } from "react";
import { ThemeContext } from '@/context/ThemeContext';

// Global ad counter to ensure unique initialization
let globalAdCounter = 0;
const adInstances = new Map();

export default function AdBanner({ adSlot, desktopStyle, mobileStyle, dataAdFormat, dataFullWidthResponsive, priority = 0 }) {
  const { isDarkMode } = useContext(ThemeContext);
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [adId] = useState(() => `ad-${++globalAdCounter}`);

  useEffect(() => {
    // Monitor container size
    const updateContainerSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        console.log(`Ad ${adId} (slot: ${adSlot}) container width:`, width);
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, [adId, adSlot]);

  useEffect(() => {
    if (containerWidth === 0) return;

    // Don't initialize ads in containers that are too narrow
    if (containerWidth < 250) {
      console.warn(`Ad ${adId} container too narrow (${containerWidth}px), skipping`);
      setAdError(true);
      return;
    }

    const initializeAd = async () => {
      try {
        // Ensure AdSense script is loaded
        if (!window.adsbygoogle) {
          await new Promise((resolve) => {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183171666938196';
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            document.head.appendChild(script);
          });
        }

        // Wait for container to be ready and visible
        await new Promise(resolve => setTimeout(resolve, 1000 + (priority * 500)));

        if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
          console.log(`Initializing ad ${adId} (slot: ${adSlot}) with width: ${containerWidth}px`);
          
          // Store ad instance
          adInstances.set(adId, {
            element: adRef.current,
            slot: adSlot,
            initialized: true
          });

          (window.adsbygoogle = window.adsbygoogle || []).push({});
          
          // Check if ad loaded successfully after a delay
          setTimeout(() => {
            const adStatus = adRef.current?.getAttribute('data-adsbygoogle-status');
            if (adStatus === 'done') {
              console.log(`Ad ${adId} loaded successfully`);
              setAdLoaded(true);
            } else {
              console.warn(`Ad ${adId} failed to load, status: ${adStatus}`);
              setAdError(true);
            }
          }, 2000);
        }
      } catch (error) {
        console.error(`AdSense initialization error for ad ${adId}:`, error);
        setAdError(true);
      }
    };

    initializeAd();

    return () => {
      adInstances.delete(adId);
    };
  }, [containerWidth, adSlot, adId, priority]);

  const themeClasses = {
    cardBg: isDarkMode ? "bg-slate-900/95" : "bg-white/95",
    border: isDarkMode ? "border-slate-700/50" : "border-gray-200",
    gradientBg: isDarkMode ? "from-slate-800 to-slate-900" : "from-gray-50 to-gray-100",
    text: isDarkMode ? "text-slate-300" : "text-gray-500",
  };

  // Show placeholder for narrow containers
  if (containerWidth > 0 && containerWidth < 250) {
    return (
      <div ref={containerRef} className={`rounded-2xl shadow-sm overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border}`}>
        <div className={`relative p-4 bg-gradient-to-br ${themeClasses.gradientBg} min-h-[100px] flex items-center justify-center`}>
          <div className={`text-center ${themeClasses.text} text-sm`}>
            Ad space too narrow<br />
            ({containerWidth}px)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`rounded-2xl shadow-sm overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border}`}>
      <div className={`relative p-4 bg-gradient-to-br ${themeClasses.gradientBg} min-h-[200px] flex items-center justify-center`}>
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border
          bg-gray-50 text-gray-600 border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
        >
          📢 Sponsored
        </div>

        {/* Responsive ad container with size-specific styles */}
        <div className="w-full max-w-full flex justify-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ 
              display: 'block',
              width: '100%',
              minHeight: containerWidth < 400 ? '250px' : '150px',
              maxWidth: '100%',
              ...desktopStyle 
            }}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot={adSlot}
            data-ad-format={containerWidth < 400 ? 'vertical' : (dataAdFormat || 'auto')}
            data-full-width-responsive={dataFullWidthResponsive || 'true'}
          />
        </div>

        {/* Loading state */}
        {!adLoaded && !adError && (
          <div className="absolute inset-4 flex items-center justify-center">
            <div className={`text-center ${themeClasses.text}`}>
              <div className="animate-pulse">
                Loading ad... ({containerWidth}px)
                <br />
                <small>ID: {adId} | Slot: {adSlot}</small>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {adError && (
          <div className="absolute inset-4 flex items-center justify-center">
            <div className={`text-center ${themeClasses.text} text-sm`}>
              <div>Advertisement</div>
              <small>Slot: {adSlot} | Width: {containerWidth}px</small>
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