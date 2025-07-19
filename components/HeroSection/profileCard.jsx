
import React, { useContext } from 'react';
import { BadgeCheck, Calendar } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';

export default function ProfileCard() {
  const {profileData} = useContext(ProfileContext)
  const user = profileData?.userDetails
  const totalPoints = profileData?.completed_totalPoints
  
  let level  = 0
  if (totalPoints >= 75) {
    level = 5;
  } else if (totalPoints >= 65) {
    level = 4;
  } else if (totalPoints >= 40) {
    level = 3;
  } else if (totalPoints >= 20) {
    level = 2;
  } else {
    level = 1;
  }


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


  return (
    <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 w-full text-center">
      
      {/* Profile Image + Level */}
      <div className="relative w-fit mx-auto mb-4 sm:mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
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
        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
          {level}
        </div>
      </div>

      {/* User Name */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{user.name}</h3>

      {/* League Badge */}
      <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-blue-200 mb-3">
        <BadgeCheck size={14} className="text-amber-600" />
        <span>{user.leagueName}</span>
      </div>

      {/* Member Since */}
      <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
        <Calendar size={14} className="text-gray-400" />
        <span>{user.memberSince}</span>
      </div>
    </div>
  );
}
