"use client";
import { useEffect, useState } from "react";
import { Trophy, Medal, Award, Crown, Star } from "lucide-react";

export default function DashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://arcade-backend-4oc3.onrender.com/api/v1/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        // Sort profiles by total_points in descending order
        const sortedProfiles = (data.data || []).sort((a, b) => b.total_points - a.total_points);
        setProfiles(sortedProfiles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profiles:", err);
        setLoading(false);
      });
  }, []);

  const topThree = profiles.slice(0, 3);
  const restProfiles = profiles.slice(3);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRankBadge = (rank) => {
    const badges = {
      1: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
      2: "bg-gradient-to-r from-gray-300 to-gray-500 text-white",
      3: "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
    };
    return badges[rank] || "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
  };

  const getPodiumHeight = (rank) => {
    const heights = {
      1: "h-32",
      2: "h-24", 
      3: "h-20"
    };
    return heights[rank] || "h-16";
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-yellow-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Celebrating our top performers</p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : profiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Profiles Found</h3>
            <p className="text-gray-500">Check back later for leaderboard updates!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">🏆 Hall of Fame</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topThree.map((profile, index) => {
                    const rank = index + 1;
                    return (
                      <div
                        key={profile.profile_id}
                        className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2 ${
                          rank === 1 ? 'md:order-2 ring-4 ring-yellow-400 ring-opacity-50' : 
                          rank === 2 ? 'md:order-1 mt-0 md:mt-8' : 
                          'md:order-3 mt-0 md:mt-12'
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full ${getRankBadge(rank)} font-bold text-sm shadow-lg flex items-center gap-2`}>
                          {getRankIcon(rank)}
                          #{rank}
                        </div>

                        {/* Profile Content */}
                        <div className="text-center pt-4">
                          <div className="relative inline-block mb-4">
                            <img 
                              src={profile.user_img} 
                              alt={profile.user_name}
                              className={`w-20 h-20 rounded-full mx-auto shadow-lg ring-4 ${
                                rank === 1 ? 'ring-yellow-400' : 
                                rank === 2 ? 'ring-gray-400' : 
                                'ring-amber-400'
                              }`}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user_name)}&background=random`;
                              }}
                            />
                            {rank === 1 && (
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Crown className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                            {profile.user_name}
                          </h3>
                          
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-2xl font-bold text-gray-900">
                              {profile.total_points.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm">pts</span>
                          </div>
                          
                          <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                            ID: {profile.profile_id}
                          </p>
                        </div>

                        {/* Podium Base */}
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-full ${getPodiumHeight(rank)} ${getRankBadge(rank)} rounded-b-lg opacity-20`}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rest of the Profiles */}
            {restProfiles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">🌟 Rising Stars</h2>
                <div className="space-y-4">
                  {restProfiles.map((profile, index) => {
                    const rank = index + 4;
                    return (
                      <div
                        key={profile.profile_id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex items-center space-x-4 hover:bg-gray-50"
                      >
                        {/* Rank Number */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          #{rank}
                        </div>

                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <img 
                            src={profile.user_img} 
                            alt={profile.user_name}
                            className="w-12 h-12 rounded-full shadow-md ring-2 ring-blue-200"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user_name)}&background=random`;
                            }}
                          />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate text-lg">
                            {profile.user_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ID: {profile.profile_id}
                          </p>
                        </div>

                        {/* Points */}
                        <div className="flex-shrink-0 text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold text-lg text-gray-900">
                              {profile.total_points.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">points</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Keep climbing the ranks! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}