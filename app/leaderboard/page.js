"use client";
import { useEffect, useState, useContext } from "react";
import { Trophy, Medal, Award, Crown, Star } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext"; // adjust path if needed

export default function DashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const headers = {
      ...(apiKey && { "X-API-KEY": apiKey })
    };
  
    fetch("https://arcade-backend-4oc3.onrender.com/api/v1/leaderboard", {
      method: "GET",
      headers,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedProfiles = (data.data || []).sort((a, b) => b.total_points - a.total_points);
        setProfiles(sortedProfiles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profiles:", err);
        setLoading(false);
      });
  }, []);

  const themeClasses = {
    pageBg: isDarkMode ? "bg-slate-950" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    containerBg: isDarkMode ? "bg-slate-900/60" : "bg-white/0",
    text: isDarkMode ? "text-slate-100" : "text-gray-900",
    textSecondary: isDarkMode ? "text-slate-300" : "text-gray-600",
    muted: isDarkMode ? "text-slate-400" : "text-gray-500",
    cardBg: isDarkMode ? "bg-slate-900" : "bg-white",
    cardHover: isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-gray-50",
    cardBorder: isDarkMode ? "border border-slate-800/60" : "",
    ring1: isDarkMode ? "ring-4 ring-yellow-400/30" : "ring-4 ring-yellow-400/50",
    ring2: isDarkMode ? "ring-4 ring-slate-400/20" : "ring-4 ring-gray-400/30",
    ring3: isDarkMode ? "ring-4 ring-amber-400/25" : "ring-4 ring-amber-400/40",
    badge1: isDarkMode ? "bg-yellow-500 text-slate-900" : "bg-yellow-400 text-white",
    badge2: isDarkMode ? "bg-slate-500 text-white" : "bg-gray-400 text-white",
    badge3: isDarkMode ? "bg-amber-500 text-slate-900" : "bg-orange-400 text-white",
    defaultBadge: isDarkMode ? "bg-gradient-to-r from-blue-600/80 to-sky-500/80 text-white" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    rankPill: isDarkMode ? "bg-blue-700/60 text-white" : "bg-blue-500 text-white",
    avatarRing: isDarkMode ? "ring-4 ring-slate-700/60" : "ring-4 ring-blue-200",
    skeletonBg: isDarkMode ? "bg-slate-800/60" : "bg-gray-300",
  };

  const topThree = profiles.slice(0, 3);
  const restProfiles = profiles.slice(3);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-white" />;
      case 2:
        return <Medal className="w-6 h-6 text-white" />;
      case 3:
        return <Award className="w-6 h-6 text-white" />;
      default:
        return <Star className="w-5 h-5 text-white" />;
    }
  };

  const getRankBadge = (rank) => {
    const badges = {
      1: themeClasses.badge1,
      2: themeClasses.badge2,
      3: themeClasses.badge3
    };
    return badges[rank] || themeClasses.defaultBadge;
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
          <div key={i} className={`${themeClasses.cardBg} rounded-2xl shadow-lg p-6 ${themeClasses.cardBorder}`}>
            <div className={`w-20 h-20 ${themeClasses.skeletonBg} rounded-full mx-auto mb-4`}></div>
            <div className={`h-4 ${themeClasses.skeletonBg} rounded mb-2`}></div>
            <div className={`h-6 ${themeClasses.skeletonBg} rounded`}></div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`${themeClasses.cardBg} rounded-xl shadow-md p-4 flex items-center space-x-4 ${themeClasses.cardBorder}`}>
            <div className={`w-12 h-12 ${themeClasses.skeletonBg} rounded-full`}></div>
            <div className="flex-1">
              <div className={`h-4 ${themeClasses.skeletonBg} rounded mb-2`}></div>
              <div className={`h-3 ${themeClasses.skeletonBg} rounded w-1/2`}></div>
            </div>
            <div className={`h-6 ${themeClasses.skeletonBg} rounded w-16`}></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${themeClasses.pageBg} transition-colors duration-300 min-h-screen`}>
      <div className={`container mx-auto px-4 py-8 max-w-6xl ${themeClasses.containerBg}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className={`${isDarkMode ? "text-yellow-400" : "text-yellow-500"} w-10 h-10 mr-3`} />
            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
              Leaderboard
            </h1>
          </div>
          <p className={`${themeClasses.textSecondary} text-lg`}>Celebrating our top performers</p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : profiles.length === 0 ? (
          <div className="text-center py-16">
            <div className={`${isDarkMode ? "bg-slate-800" : "bg-gray-100"} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6`}>
              <Trophy className={`${isDarkMode ? "text-slate-400" : "text-gray-400"} w-16 h-16`} />
            </div>
            <h3 className={`${themeClasses.text} text-2xl font-semibold mb-2`}>No Profiles Found</h3>
            <p className={themeClasses.muted}>Check back later for leaderboard updates!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="mb-12">
                <h2 className={`${themeClasses.text} text-2xl font-bold text-center mb-8`}>🏆 Hall of Fame</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topThree.map((profile, index) => {
                    const rank = index + 1;
                    const ringClass = rank === 1 ? themeClasses.ring1 : rank === 2 ? themeClasses.ring2 : themeClasses.ring3;
                    return (
                      <div
                        key={profile.profile_id}
                        className={`relative ${themeClasses.cardBg} ${themeClasses.cardBorder} rounded-2xl shadow-lg ${themeClasses.cardHover} hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2 ${
                          rank === 1 ? 'md:order-2' : rank === 2 ? 'md:order-1 mt-0 md:mt-8' : 'md:order-3 mt-0 md:mt-12'
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
                              className={`w-20 h-20 rounded-full mx-auto shadow-lg ${ringClass}`}
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
                          
                          <h3 className={`font-bold text-lg mb-2 truncate ${themeClasses.text}`}>
                            {profile.user_name}
                          </h3>
                          
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className={`text-2xl font-bold ${themeClasses.text}`}>
                              {profile.total_points.toLocaleString()}
                            </span>
                            <span className={`${themeClasses.muted} text-sm`}>pts</span>
                          </div>
                        </div>

                        {/* Podium Base - kept commented for future use */}
                        {/* <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-full ${getPodiumHeight(rank)} ${getRankBadge(rank)} rounded-b-lg opacity-20`}></div> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rest of the Profiles */}
            {restProfiles.length > 0 && (
              <div className="mx-auto px-4 max-w-full sm:max-w-2xl md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <h2 className={`${themeClasses.text} text-2xl font-bold mb-6`}>🌟 Rising Stars</h2>
                <div className="space-y-4">
                  {restProfiles.map((profile, index) => {
                    const rank = index + 4;
                    return (
                      <div
                        key={profile.profile_id}
                        className={`${themeClasses.cardBg} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex items-center space-x-4 ${themeClasses.cardBorder} ${isDarkMode ? "hover:bg-slate-800/50" : "hover:bg-gray-50"}`}
                      >
                        {/* Rank Number */}
                        <div className={`flex-shrink-0 w-12 h-12 ${isDarkMode ? "bg-sky-700" : "bg-blue-500"} rounded-full flex items-center justify-center text-white font-bold`}>
                          #{rank}
                        </div>

                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <img 
                            src={profile.user_img} 
                            alt={profile.user_name}
                            className={`w-12 h-12 rounded-full shadow-md ${themeClasses.avatarRing}`}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user_name)}&background=random`;
                            }}
                          />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold truncate text-lg ${themeClasses.text}`}>
                            {profile.user_name}
                          </h3>
                        </div>

                        {/* Points */}
                        <div className="flex-shrink-0 text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className={`font-bold text-lg ${themeClasses.text}`}>
                              {profile.total_points.toLocaleString()}
                            </span>
                          </div>
                          <span className={`${themeClasses.muted} text-xs`}>points</span>
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
          <p className={`${themeClasses.muted} text-sm`}>
            Keep climbing the ranks! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
