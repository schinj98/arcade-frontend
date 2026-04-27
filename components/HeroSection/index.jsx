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
          <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${adThemeClasses.cardBg} border ${adThemeClasses.border}`}>
            {/* Top section with Sponsored label */}
            <div className={`relative flex justify-center items-center p-4 ${adThemeClasses.topBg}`}>
              <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border z-10 ${adThemeClasses.labelBg}`}>
                📢 Sponsored
              </div>

              {/* Site123 ad */}
              <a rel="sponsored" href="https://site123ltd.sjv.io/c/2669430/2088282/26011" target="_top" id="2088282">
                <img src="//a.impactradius-go.com/display-ad/26011-2088282" border="0" alt="" width="180" height="150"/>
              </a>
              <img height="0" width="0" src="https://imp.pxf.io/i/2669430/2088282/26011" style={{ position: 'absolute', visibility: 'hidden' }} border="0" alt=""/>
            </div>

            {/* Footer text */}
            <div className={`p-4 text-center text-sm ${adThemeClasses.footerText}`}>
              Advertisement
            </div>
          </div>
          <ProgressGraph />
          <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${adThemeClasses.cardBg} border ${adThemeClasses.border}`}>
            {/* Top section with Sponsored label */}
            <div className={`relative flex justify-center items-center p-4 ${adThemeClasses.topBg}`}>
              <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border z-10 ${adThemeClasses.labelBg}`}>
                📢 Sponsored
              </div>

              {/* Network Solutions ad */}
              <a rel="sponsored" href="https://network-solutions.7eer.net/c/3880074/2331412/555" target="_top" id="2331412">
                <img src="//a.impactradius-go.com/display-ad/555-2331412" border="0" alt="" width="250" height="250"/>
              </a>
              <img height="0" width="0" src="https://network-solutions.7eer.net/i/3880074/2331412/555" style={{ position: 'absolute', visibility: 'hidden' }} border="0" alt=""/>
            </div>
            

            {/* Footer text */}
            <div className={`p-4 text-center text-sm ${adThemeClasses.footerText}`}>
              Advertisement
            </div>
          </div>
          


          {/* staart  */}
          <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${adThemeClasses.cardBg} border ${adThemeClasses.border}`}>
            {/* Top section with Sponsored label */}
            <div className={`relative flex justify-center items-center p-4 ${adThemeClasses.topBg}`}>
              <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border z-10 ${adThemeClasses.labelBg}`}>
                📢 Sponsored
              </div>

              {/* Domain.com ad */}
              <a rel="sponsored" href="https://domain.mno8.net/c/3880074/3796917/9560" target="_top" id="3796917">
                <img src="//a.impactradius-go.com/display-ad/9560-3796917" border="0" alt="" width="250" height="250"/>
              </a>
              <img height="0" width="0" src="https://imp.pxf.io/i/3880074/3796917/9560" style={{ position: 'absolute', visibility: 'hidden' }} border="0" alt=""/>
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
          <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${adThemeClasses.cardBg} border ${adThemeClasses.border}`}>
            <div className="relative">
              <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border z-10 ${adThemeClasses.labelBg}`}>
                📢 Sponsored
              </div>
              {/* LiquidWeb ad */}
              <a rel="sponsored" href="https://liquidweb.i3f2.net/c/2669430/3862117/4464" target="_top" id="3862117">
                <img src="//a.impactradius-go.com/display-ad/4464-3862117" border="0" alt="" style={{ display: 'block', width: '100%', height: 'auto' }}/>
              </a>
              <img height="0" width="0" src="https://liquidweb.i3f2.net/i/2669430/3862117/4464" style={{ position: 'absolute', visibility: 'hidden' }} border="0" alt=""/>
            </div>
          </div>
          
          
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