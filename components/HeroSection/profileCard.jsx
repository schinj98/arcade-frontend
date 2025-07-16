import React from 'react';
import { User, Star, BadgeCheck, Award, Calendar, TrendingUp } from 'lucide-react';

export default function ProfileCard({ user, totalPoints }) {
  
  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-6">
        <div className="animate-pulse flex items-center gap-6 w-full">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate level based on points (example logic)
  const level = Math.floor(totalPoints / 10) + 1;

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
      <div className="bg-gray-50 p-6 flex items-center gap-6">
        {/* Profile Image Section */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
          <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs shadow-lg">
            {level}
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">{user.name}</h3>
          
          {/* League Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-amber-200 mb-3">
            <BadgeCheck size={14} className="text-amber-600 flex-shrink-0" />
            <span>Gold League</span>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
            <Calendar size={14} className="text-gray-400 flex-shrink-0" />
            <span>{user.memberSince}</span>
          </div>
        </div>

        {/* Stats Section (Optional - can be added) */}
        <div className="hidden sm:flex flex-col items-end text-right flex-shrink-0">
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900 mb-1">
            <TrendingUp size={16} className="text-blue-600" />
            <span>{totalPoints} pts</span>
          </div>
          <div className="text-xs text-gray-500">Level {level}</div>
        </div>
      </div>
    </div>
  );
}

// Demo component to show the card in action
const DemoApp = () => {
  const sampleUser = {
    name: "John Doe",
    profileImage: "https://placehold.co/128x128/4F46E5/FFFFFF?text=JD",
    memberSince: "Member since Jan 2024"
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Card - Horizontal Layout</h1>
        
        <ProfileCard user={sampleUser} totalPoints={125} />
        
        {/* Loading state demo */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Loading State:</h2>
          <ProfileCard user={null} totalPoints={0} />
        </div>
        
        {/* Different screen sizes demo */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Responsive Design:</h2>
          <div className="space-y-4">
            <div className="w-full">
              <ProfileCard user={sampleUser} totalPoints={89} />
            </div>
            <div className="w-96">
              <ProfileCard user={{...sampleUser, name: "Jane Smith with a Very Long Name"}} totalPoints={234} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
