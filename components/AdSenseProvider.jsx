// components/AdSenseProvider.jsx - Client-side AdSense initialization wrapper

'use client';

import { useEffect } from 'react';
import { initializeGoogleAds } from '../lib/googleads';

const AdSenseProvider = ({ 
  children, 
  publisherId = 'ca-pub-5183171666938196' // Replace with your publisher ID
}) => {
  useEffect(() => {
    initializeGoogleAds(publisherId);
  }, [publisherId]);

  return <>{children}</>;
};

export default AdSenseProvider;