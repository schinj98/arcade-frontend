'use client';

import {React, useContext} from 'react';
import ProfileCard from '@/components/HeroSection/profileCard';
import BadgesSection from './BadgesSection';
import RewardsSection from './RewardsSection';
import IncompleteBadges from './IncompleteBadges';
import ProgressGraph from './ProgressGraph';
import Facilitator_section from './Facilitator_section';
import Total_progress from './Total_progress';
import CompletedLabsSection from './CompletedLabsSection';
import AdBanner from '../AdBanner';
import { ThemeContext } from '@/context/ThemeContext'; 

export default function HeroSection({ profileData, IncompleteBadges: incompleteBadgesProp}) {
  const user = profileData?.userDetails;
  const { isDarkMode } = useContext(ThemeContext);
  const completed_totalPoints = profileData?.completed_totalPoints;

  const adThemeClasses = {
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    topBg: isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 to-gray-100',
    labelBg: isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-50 text-gray-600 border-gray-200',
    footerText: isDarkMode ? 'text-slate-400' : 'text-gray-500'
  };
  

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-blue-50'} py-5 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-300`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col">
          <ProfileCard />
          <Total_progress />
          <ProgressGraph />
          <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${adThemeClasses.cardBg} border ${adThemeClasses.border}`}>
            {/* Top section with Sponsored label */}
            <div className={`relative flex justify-center items-center p-4 ${adThemeClasses.topBg}`}>
              <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border z-10 ${adThemeClasses.labelBg}`}>
                📢 Sponsored
              </div>

              {/* Impact iframe ad */}
              <iframe id="iframe_937" src="//a.impactradius-go.com/gen-ad-code/3880074/2331419/555/" width="300" height="250" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"></iframe>
            </div>

            {/* Footer text */}
            <div className={`p-4 text-center text-sm ${adThemeClasses.footerText}`}>
              Advertisement
            </div>
          </div>



        </div>

        {/* Right Column (2/3rds width on md and up) */}
        <div className="md:col-span-2 space-y-8"> {/* Added space-y for vertical spacing between sections */}
          <Facilitator_section />
          <AdBanner  adSlot={7539641648}/>
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