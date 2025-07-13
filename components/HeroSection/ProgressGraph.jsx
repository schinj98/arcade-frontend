import React from 'react';
import { Award, Star, TrendingUp, Target, Zap, Trophy, Clock, Flame, ChevronUp, Activity } from 'lucide-react';

const ProgressGraph = ({ totalPoints }) => {
  const level = Math.floor(totalPoints / 10) + 1;
  const progressToNextLevel = ((totalPoints % 10) / 10) * 100;
  
  // Mock data for demonstration
  const weeklyProgress = [
    { day: 'Mon', points: 5 },
    { day: 'Tue', points: 8 },
    { day: 'Wed', points: 3 },
    { day: 'Thu', points: 12 },
    { day: 'Fri', points: 7 },
    { day: 'Sat', points: 10 },
    { day: 'Sun', points: 6 },
  ];
  
  const maxWeeklyPoints = Math.max(...weeklyProgress.map(d => d.points));

  return (
    <div className="bg-gray-50 rounded-xl shadow p-3 sm:p-4">
      {/* Stats Section */}
      <div className="p-3 sm:p-4">
        {/* Total Points Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 mb-0.5">Total Arcade Points</p>
              <p className="text-xl font-bold text-gray-900 truncate">{totalPoints}</p>
            </div>
            <div className="p-2 bg-blue-600 rounded-xl text-white flex-shrink-0 ml-2">
              <Award size={18} />
            </div>
          </div>
          
          {/* Progress to Next Level */}
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Level {level}</span>
              <span className="text-xs text-gray-600">Level {level + 1}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="h-1 rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {10 - (totalPoints % 10)} points to next level
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <Star size={16} className="text-yellow-500 flex-shrink-0" />
              <span className="text-lg font-bold text-gray-900 ml-2">{level}</span>
            </div>
            <p className="text-xs text-gray-600">Current Level</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <TrendingUp size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-lg font-bold text-gray-900 ml-2">#{Math.floor(Math.random() * 100) + 1}</span>
            </div>
            <p className="text-xs text-gray-600">League Rank</p>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Weekly Activity</h3>
            <Activity size={16} className="text-indigo-500" />
          </div>
          <div className="flex items-end justify-between gap-1 h-20">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t flex-1 flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t transition-all duration-300"
                    style={{ height: `${(day.points / maxWeeklyPoints) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-1">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressGraph;