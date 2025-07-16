'use client';

import React from 'react';
import ProfileCard from '@/components/HeroSection/profileCard';
import BadgesSection from './BadgesSection';
import RewardsSection from './RewardsSection';
import IncompleteBadges from './IncompleteBadges';
import IncompleteBadges2 from './IncompleteBadges';
import ProgressGraph from './ProgressGraph';

export default function HeroSection({ profileData, IncompleteBadges: incompleteBadgesProp }) {
  const user = profileData?.userDetails;
  const completed_totalPoints = profileData?.completed_totalPoints;
  const badges = IncompleteBadges?.IncompleteBadges;

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6 flex flex-col">
          <ProfileCard user={user} totalPoints={completed_totalPoints} />

          <ProgressGraph 
            totalPoints={completed_totalPoints} 
            badgesCompletedInAWeek={profileData?.badgesCompletedInAWeek}
          />
        </div>

        <div className="md:col-span-2">
          <BadgesSection completed_total_points={completed_totalPoints} />
        </div>
      </div>
      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RewardsSection />
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IncompleteBadges2 badges={profileData?.incompleteBadges} />
      </div>
    </div>
  );
}
