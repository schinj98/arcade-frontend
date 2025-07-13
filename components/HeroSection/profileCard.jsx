import React from 'react';
import { User, Star, BadgeCheck, Award, Calendar, TrendingUp } from 'lucide-react';

export default function ProfileCard({ user, totalPoints }) {
  
  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Calculate level based on points (example logic)
  const level = Math.floor(totalPoints / 10) + 1;

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
      {/* Header Section */}
      <div className="bg-gray50 p-6 sm:p-5.5 text-center border-sm border-gray-200">
        {/* Profile Image */}
        <div className="relative inline-block mb-4 sm:mb-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={user.profileImage} 
              alt="User Profile" 
              className="object-cover w-full h-full"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/128x128/CCCCCC/333333?text=Profile"; 
              }} 
            />
          </div>
          {/* Level Badge */}
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-blue-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg">
            {level}
          </div>
        </div>

        {/* User Info */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 px-2">{user.name}</h3>
        
        {/* League Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-100 text-amber-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-amber-200">
          <BadgeCheck size={14} className="text-amber-600 sm:w-4 sm:h-4" />
          <span>Gold League</span>
        </div>

        {/* Member Since */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
          <Calendar size={14} className="text-gray-400 sm:w-4 sm:h-4" />
          <span>{user.memberSince}</span>
        </div>
      </div>

      
    </div>
  );
}