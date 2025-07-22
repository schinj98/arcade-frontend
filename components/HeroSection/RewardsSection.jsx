import React, { useState } from 'react';
import { Trophy, Gift, Sparkles, ChevronRight, Info } from 'lucide-react';

export default function RewardsSection() {
  const [hoveredTier, setHoveredTier] = useState(null);

  const tierImages = {
    Novice: "/images/arcade-swags-images/Novice.png",
    Trooper: "/images/arcade-swags-images/Trooper.png",
    Ranger: "/images/arcade-swags-images/Ranger.png",
    Champion: "/images/arcade-swags-images/Champion.png",
    Legend: "/images/arcade-swags-images/Legend.png",
  };

  const tiers = [
    { name: 'Novice', points: 20, image: tierImages.Novice, color: 'from-green-400 to-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    { name: 'Trooper', points: 40, image: tierImages.Trooper, color: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'Ranger', points: 65, image: tierImages.Ranger, color: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { name: 'Champion', points: 75, image: tierImages.Champion, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { name: 'Legend', points: 85, image: tierImages.Legend, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  ];

  return (
    <div className=" rounded-xl bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                  <Trophy size={24} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Swag Rewards</h1>
              </div>
              <p className="text-gray-600">
                Earn points to unlock exclusive swag rewards from previous seasons
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Gift size={16} className="text-indigo-500 mr-1" />
                  <span className="font-medium text-gray-900">5</span>
                  <span className="ml-1">reward tiers</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Sparkles size={16} className="text-amber-500 mr-1" />
                  <span className="font-medium text-gray-900">Season 1</span>
                </div>
              </div>
            </div>

            {/* Season Badge */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <p className="text-sm text-gray-600">Previous Season</p>
                  <p className="font-semibold text-gray-900">Season 1 Rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredTier(tier.name)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {/* Tier Image */}
              <div className={`relative h-48 ${tier.bgColor} flex items-center justify-center p-4 overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white to-transparent rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-white to-transparent rounded-full"></div>
                </div>
                
                <img
                  src={tier.image}
                  alt={`${tier.name} Badge`}
                  className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/160x160?text=Tier';
                  }}
                />
                
                {/* Points Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-lg ${tier.bgColor} ${tier.borderColor} border backdrop-blur-sm`}>
                  {tier.points} pts
                </div>
              </div>

              {/* Tier Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  <ChevronRight 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-200 ${
                      hoveredTier === tier.name ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
                
                <p className="text-sm text-blue-600">
                  Tier {index + 1} Reward
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Season Notice */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
              <Info size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Season 2 Coming Soon!</h3>
              <p className="text-gray-600">
                The prizes shown are from Season 1. New exclusive rewards for Season 2 are being prepared and will be announced soon.
              </p>
            </div>
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
              Get Notified
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}