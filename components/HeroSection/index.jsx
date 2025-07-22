'use client';

import React from 'react';
import ProfileCard from '@/components/HeroSection/profileCard';
import BadgesSection from './BadgesSection';
import RewardsSection from './RewardsSection';
import IncompleteBadges from './IncompleteBadges';
// import IncompleteBadges2 from './IncompleteBadges'; // This was duplicated, removed
import ProgressGraph from './ProgressGraph';
import CompletedLabsSection from './CompletedLabsSection';

export default function HeroSection({ profileData, IncompleteBadges: incompleteBadgesProp }) {
  const user = profileData?.userDetails;
  const completed_totalPoints = profileData?.completed_totalPoints;
  // const badges = IncompleteBadges?.IncompleteBadges; // This line seems to be incorrect, IncompleteBadges is a component, not an object with a property called IncompleteBadges

  return (
    <div className="min-h-screen bg-blue-50 py-5 px-4 sm:px-6 lg:px-8 font-inter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col">
          <ProfileCard />
          <ProgressGraph />
        </div>

        {/* Right Column (2/3rds width on md and up) */}
        <div className="md:col-span-2 space-y-8"> {/* Added space-y for vertical spacing between sections */}
          <BadgesSection />
          {/* Moved CompletedLabsSection here */}
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
    </div>
  );
}