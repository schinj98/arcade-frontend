'use client';

import React from 'react';
import ProfileCard from '@/components/HeroSection/profileCard';
import BadgesSection from './BadgesSection';
import RewardsSection from './RewardsSection';
import IncompleteBadges from './IncompleteBadges';
import ProgressGraph from './ProgressGraph';
import Facilitator_section from './Facilitator_section';
import Total_progress from './Total_progress';
import CompletedLabsSection from './CompletedLabsSection';
import AdBanner from '../AdBanner';

export default function HeroSection({ profileData, IncompleteBadges: incompleteBadgesProp, isDarkMode = false  }) {
  const user = profileData?.userDetails;
  const completed_totalPoints = profileData?.completed_totalPoints;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-blue-50'} py-5 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-300`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* First, try a full-width ad at the top */}
      <div className="max-w-7xl mx-auto mb-8">
        <AdBanner 
          adSlot={1818726897} 
          desktopStyle={{ display: "block"}} 
          mobileStyle={{ display: "block"}} 
          dataAdFormat={"auto"} 
          dataFullWidthResponsive={"true"}
          priority={1}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Make it wider on large screens */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileCard />
          <Total_progress />
          <ProgressGraph />
        </div>

        {/* Right Column (2/3rds width on lg and up) */}
        <div className="lg:col-span-2 space-y-8">
          <Facilitator_section />
          <AdBanner 
            adSlot={7539641648} 
            desktopStyle={{ display: "block"}} 
            mobileStyle={{ display: "block"}} 
            dataAdFormat={"auto"} 
            dataFullWidthResponsive={"true"}
            priority={2}
          />
          <BadgesSection />
        </div>
      </div>

      {/* These sections will remain full max-w-7xl width, outside the grid */}
      <div className="mt-10 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <CompletedLabsSection /> 
      </div>
      <div className="mt-10 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <RewardsSection />
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <IncompleteBadges />
      </div>

      {/* Another full-width ad at the bottom */}
      <div className="max-w-7xl mx-auto mt-8">
        <AdBanner 
          adSlot={1818726897} 
          desktopStyle={{ display: "block"}} 
          mobileStyle={{ display: "block"}} 
          dataAdFormat={"auto"} 
          dataFullWidthResponsive={"true"}
          priority={3}
        />
      </div>
    </div>
  );
}