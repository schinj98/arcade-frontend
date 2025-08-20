// components/AdBanner.jsx - Reusable Google AdSense Component

import { useEffect, useRef } from 'react';
import { pushAd, getAdConfig } from '../lib/googleads';

const AdBanner = ({ 
  adSlot, 
  size = '300x300', 
  publisherId = 'ca-pub-xxxxxxxxxx', // Replace with your publisher ID
  className = '',
  responsive = false 
}) => {
  const adRef = useRef(null);
  const adConfig = getAdConfig(size);

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return;

    // Push the ad to Google AdSense
    const timer = setTimeout(() => {
      pushAd();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle responsive ads
  const getDataAdFormat = () => {
    if (responsive || size === 'responsive') {
      return 'auto';
    }
    return undefined;
  };

  const getDataFullWidthResponsive = () => {
    if (responsive || size === 'responsive') {
      return 'true';
    }
    return undefined;
  };

  return (
    <div 
      className={`ad-container ${className}`}
      style={{
        textAlign: 'center',
        margin: '10px 0',
        ...(!responsive && size !== 'responsive' ? adConfig.style : {})
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          ...adConfig.style
        }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={getDataAdFormat()}
        data-full-width-responsive={getDataFullWidthResponsive()}
      />
    </div>
  );
};

export default AdBanner;