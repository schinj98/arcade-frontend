
import React, { useContext } from 'react';
import { BadgeCheck, Calendar, User } from 'lucide-react';
import { ProfileContext } from '../../context/ProfileContext';

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
      <div className="bg-white rounded-2xl border border-blue-200 p-6 sm:p-8 text-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-slate-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 rounded-2xl border border-blue-200 p-6 sm:p-2 w-full text-center">
      
      {/* Profile Image + Level */}
      <div className="relative w-fit mx-auto mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-100 mx-auto">
          <img
            src={user.profileImage}
            alt="User Profile"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/128x128/e2e8f0/64748b?text=" + (user.name ? user.name.charAt(0) : "U");
            }}
          />
        </div>

        {/* Level Badge */}
        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-xs sm:text-sm border-2 border-white">
          {level}
        </div>
      </div>

      {/* User Name */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{user.name}</h3>

      {/* League Badge */}
      <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl text-sm font-medium border border-yellow-200 mb-4">
        <BadgeCheck size={16} className="text-yellow-600" />
        <span>{user.leagueName}</span>
      </div>

      {/* Member Since */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-slate-50 px-4 py-2 rounded-xl">
        <Calendar size={16} className="text-gray-500" />
        <span>{user.memberSince}</span>
      </div>
    </div>
  );
}