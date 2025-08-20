// googleads.js - Google AdSense Integration for Next.js

/**
 * Initialize Google AdSense
 * Call this function in your _app.js or layout component
 * @param {string} publisherId - Your Google AdSense publisher ID (ca-pub-xxxxxxxxxx)
 */
export const initializeGoogleAds = (publisherId) => {
    if (typeof window !== 'undefined') {
      // Check if script already exists
      if (document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) {
        return;
      }
  
      // Create and append the AdSense script
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
  
      // Initialize adsbygoogle array if it doesn't exist
      window.adsbygoogle = window.adsbygoogle || [];
    }
  };
  
  /**
   * Push ads to Google AdSense
   * This function should be called after an ad unit is mounted
   */
  export const pushAd = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('Error pushing ad:', error);
      }
    }
  };
  
  /**
   * Refresh/reload ads on the page
   * Useful for SPA navigation
   */
  export const refreshAds = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('Error refreshing ads:', error);
      }
    }
  };
  
  /**
   * Check if AdSense is loaded and ready
   * @returns {boolean}
   */
  export const isAdSenseReady = () => {
    return typeof window !== 'undefined' && 
           window.adsbygoogle && 
           document.querySelector(`script[src*="pagead2.googlesyndication.com"]`);
  };
  
  /**
   * Get ad unit configuration
   * @param {string} size - Size preset (e.g., '300x300', '728x90', '320x50')
   * @returns {object} Ad unit dimensions and style
   */
  export const getAdConfig = (size) => {
    const configs = {
      '300x300': {
        width: 300,
        height: 300,
        style: { width: '300px', height: '300px' }
      },
      '728x90': {
        width: 728,
        height: 90,
        style: { width: '728px', height: '90px' }
      },
      '320x50': {
        width: 320,
        height: 50,
        style: { width: '320px', height: '50px' }
      },
      '160x600': {
        width: 160,
        height: 600,
        style: { width: '160px', height: '600px' }
      },
      '300x250': {
        width: 300,
        height: 250,
        style: { width: '300px', height: '250px' }
      },
      'responsive': {
        width: 'auto',
        height: 'auto',
        style: { display: 'block', width: '100%', height: 'auto' }
      }
    };
  
    return configs[size] || configs['300x300'];
  };