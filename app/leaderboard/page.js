"use client";
import { useEffect, useState, useContext } from "react";
import { Trophy, Medal, Award, Crown, Star, ChevronLeft, ChevronRight, Users, TrendingUp, Filter, Search } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

export default function DashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  
  const itemsPerPage = 10;

  // Real API call instead of mock data
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

  // Filter profiles based on search term
  useEffect(() => {
    const filtered = profiles.filter(profile =>
      profile.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [profiles, searchTerm]);

  const themeClasses = {
    pageBg: isDarkMode ? "bg-slate-950" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    containerBg: isDarkMode ? "bg-slate-900/60" : "bg-white/0",
    text: isDarkMode ? "text-slate-100" : "text-gray-900",
    textSecondary: isDarkMode ? "text-slate-300" : "text-gray-600",
    muted: isDarkMode ? "text-slate-400" : "text-gray-500",
    cardBg: isDarkMode ? "bg-slate-900" : "bg-white",
    cardHover: isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-gray-50",
    cardBorder: isDarkMode ? "border border-slate-800/60" : "border border-gray-200/60",
    ring1: isDarkMode ? "ring-4 ring-yellow-400/40" : "ring-4 ring-yellow-400/60",
    ring2: isDarkMode ? "ring-4 ring-slate-400/30" : "ring-4 ring-gray-400/40",
    ring3: isDarkMode ? "ring-4 ring-amber-400/35" : "ring-4 ring-amber-400/50",
    badge1: isDarkMode ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900" : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white",
    badge2: isDarkMode ? "bg-gradient-to-r from-slate-400 to-slate-500 text-white" : "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
    badge3: isDarkMode ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900" : "bg-gradient-to-r from-orange-400 to-orange-500 text-white",
    defaultBadge: isDarkMode ? "bg-gradient-to-r from-blue-600/80 to-sky-500/80 text-white" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    searchBg: isDarkMode ? "bg-slate-800" : "bg-white",
    searchBorder: isDarkMode ? "border-slate-700" : "border-gray-300",
    buttonPrimary: isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600",
    buttonSecondary: isDarkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-300  hover:bg-gray-300",
    statsBg: isDarkMode ? "bg-slate-800/60" : "bg-white/80",
    skeletonBg: isDarkMode ? "bg-slate-800/60" : "bg-gray-300",
  };

  const topThree = filteredProfiles.slice(0, 3);
  const totalPages = Math.ceil((filteredProfiles.length - 3) / itemsPerPage);
  const startIndex = 3 + (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProfiles = filteredProfiles.slice(startIndex, endIndex);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-white drop-shadow-md" />;
      case 2:
        return <Medal className="w-5 h-5 text-white drop-shadow-md" />;
      case 3:
        return <Award className="w-5 h-5 text-white drop-shadow-md" />;
      default:
        return <Star className="w-4 h-4 text-white drop-shadow-md" />;
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

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-8">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`${themeClasses.statsBg} rounded-xl p-4 ${themeClasses.cardBorder}`}>
            <div className={`h-8 ${themeClasses.skeletonBg} rounded mb-2`}></div>
            <div className={`h-4 ${themeClasses.skeletonBg} rounded w-2/3`}></div>
          </div>
        ))}
      </div>
      
      {/* Top 3 skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`${themeClasses.cardBg} rounded-2xl shadow-lg p-6 ${themeClasses.cardBorder}`}>
            <div className={`w-20 h-20 ${themeClasses.skeletonBg} rounded-full mx-auto mb-4`}></div>
            <div className={`h-4 ${themeClasses.skeletonBg} rounded mb-2`}></div>
            <div className={`h-6 ${themeClasses.skeletonBg} rounded`}></div>
          </div>
        ))}
      </div>
      
      {/* List skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${themeClasses.cardBg} rounded-xl p-4 flex items-center space-x-4 ${themeClasses.cardBorder}`}>
            <div className={`w-12 h-12 ${themeClasses.skeletonBg} rounded-full`}></div>
            <div className="flex-1">
              <div className={`h-4 ${themeClasses.skeletonBg} rounded mb-2`}></div>
              <div className={`h-3 ${themeClasses.skeletonBg} rounded w-1/2`}></div>
            </div>
            <div className={`h-6 ${themeClasses.skeletonBg} rounded w-20`}></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${themeClasses.pageBg} transition-all duration-300 min-h-screen`}>
      <div className={`container mx-auto px-4 py-8 max-w-7xl ${themeClasses.containerBg}`}>
        
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Trophy className={`${isDarkMode ? "text-yellow-400" : "text-yellow-500"} w-12 h-12 mr-3 animate-pulse`} />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent`}>
              Leaderboard
            </h1>
          </div>
          <p className={`${themeClasses.textSecondary} text-lg mb-6`}>Compete, Excel, and Rise to the Top! 🚀</p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : profiles.length === 0 ? (
          <div className="text-center py-20">
            <div className={`${isDarkMode ? "bg-slate-800" : "bg-gray-100"} w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}>
              <Trophy className={`${isDarkMode ? "text-slate-400" : "text-gray-400"} w-20 h-20`} />
            </div>
            <h3 className={`${themeClasses.text} text-3xl font-bold mb-4`}>No Champions Yet!</h3>
            <p className={`${themeClasses.muted} text-lg`}>Be the first to claim your spot on the leaderboard! 🌟</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className={`${themeClasses.statsBg} backdrop-blur-sm rounded-2xl p-6 ${themeClasses.cardBorder} shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`${themeClasses.text} text-2xl font-bold`}>{profiles.length.toLocaleString()}</h3>
                    <p className={`${themeClasses.muted} text-sm`}>Total Players</p>
                  </div>
                  <Users className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
                </div>
              </div>
              
              <div className={`${themeClasses.statsBg} backdrop-blur-sm rounded-2xl p-6 ${themeClasses.cardBorder} shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`${themeClasses.text} text-2xl font-bold`}>
                      {profiles[0]?.total_points?.toLocaleString() || '0'}
                    </h3>
                    <p className={`${themeClasses.muted} text-sm`}>Top Score</p>
                  </div>
                  <TrendingUp className={`w-8 h-8 ${isDarkMode ? "text-green-400" : "text-green-500"}`} />
                </div>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-center">
                <div className="relative flex-1 max-w-md">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.muted}`} />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl ${themeClasses.searchBg} ${themeClasses.searchBorder} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${themeClasses.text}`}
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`${themeClasses.muted} text-sm`}>
                    {filteredProfiles.length} player{filteredProfiles.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>
            </div>


            {/* Top 3 Podium - Enhanced */}
            {topThree.length > 0 && (
              <div className="mb-12 mt-25">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {topThree.map((profile, index) => {
                    const rank = index + 1;
                    const ringClass = rank === 1 ? themeClasses.ring1 : rank === 2 ? themeClasses.ring2 : themeClasses.ring3;
                    const isWinner = rank === 1;
                    
                    return (
                      <div
                        key={profile.profile_id}
                        className={`relative ${themeClasses.cardBg} ${themeClasses.cardBorder} rounded-3xl shadow-xl ${themeClasses.cardHover} hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-3 hover:scale-105 ${
                          rank === 1 ? 'md:order-2 md:scale-110' : rank === 2 ? 'md:order-1 md:mt-6' : 'md:order-3 md:mt-12'
                        } ${isWinner ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10' : ''}`}
                      >
                        {/* Floating Badge */}
                        <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl ${getRankBadge(rank)} font-bold text-base shadow-xl flex items-center gap-3 border-4 border-white dark:border-slate-900`}>
                          {getRankIcon(rank)}
                          <span>#{rank}</span>
                        </div>

                        {/* Winner Crown */}
                        {isWinner && (
                          <div className="absolute -top-12 left-1/2  transform -translate-x-1/2">
                            <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
                          </div>
                        )}

                        <div className="text-center pt-6">
                          <div className="relative inline-block mb-6">
                            <img 
                              src={profile.user_img} 
                              alt={profile.user_name}
                              className={`w-24 h-24 rounded-full mx-auto shadow-2xl ${ringClass} transition-all duration-300`}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user_name)}&background=random`;
                              }}
                            />
                            {isWinner && (
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                CHAMPION
                              </div>
                            )}
                          </div>
                          
                          <h3 className={`font-bold text-xl mb-3 ${themeClasses.text}`}>
                            {profile.user_name}
                          </h3>
                          
                          <div className="flex items-center justify-center space-x-2 mb-4">
                            <Star className="w-5 h-5 text-yellow-500 fill-current animate-pulse" />
                            <span className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                              {profile.total_points.toLocaleString()}
                            </span>
                            <span className={`${themeClasses.muted} text-sm`}>pts</span>
                          </div>
                          
                          {isWinner && (
                            <div className="mt-4 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                              <span className="text-yellow-700 dark:text-yellow-300 text-sm font-semibold">
                                👑 Current Leader
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rest of the Profiles with Pagination */}
            {filteredProfiles.length > 3 && (
              <div className="max-w-4xl mx-auto px-2 sm:px-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2 sm:gap-0">
                  <h2
                    className={`${themeClasses.text} text-xl sm:text-2xl font-bold flex items-center gap-2`}
                  >
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                    Rising Champions
                  </h2>

                  {totalPages > 1 && (
                    <div className="flex items-center">
                      <span className={`${themeClasses.muted} text-xs sm:text-sm`}>
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                  )}
                </div>

                {/* Profiles List */}
                <div className="space-y-3 mb-8">
                  {currentPageProfiles.map((profile, index) => {
                    const rank = startIndex + index + 1;
                    return (
                      <div
                        key={profile.profile_id}
                        className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center sm:space-x-6 gap-4 sm:gap-0 ${themeClasses.cardBorder} hover:-translate-y-1 group`}
                      >
                        {/* Rank Number */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 ${themeClasses.buttonPrimary} rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform duration-200`}
                        >
                          #{rank}
                        </div>

                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={
                              profile.user_img && profile.user_img.trim() !== ""
                                ? profile.user_img
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    profile.user_name
                                  )}&background=random`
                            }
                            alt={profile.user_name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl shadow-lg ring-2 sm:ring-4 ring-blue-100 dark:ring-slate-700 group-hover:ring-blue-300 dark:group-hover:ring-slate-600 transition-all duration-300"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                profile.user_name
                              )}&background=random`;
                            }}
                          />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h3
                            className={`font-bold text-lg sm:text-xl ${themeClasses.text} mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200`}
                          >
                            {profile.user_name}
                          </h3>
                          <p className={`${themeClasses.muted} text-xs sm:text-sm`}>
                            Player since 2024
                          </p>
                        </div>

                        {/* Points */}
                        <div className="flex-shrink-0 text-center sm:text-right">
                          <div className="flex justify-center sm:justify-end items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                            <span
                              className={`font-bold text-lg sm:text-2xl ${themeClasses.text} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200`}
                            >
                              {profile.total_points.toLocaleString()}
                            </span>
                          </div>
                          <span
                            className={`${themeClasses.muted} text-xs sm:text-sm font-medium`}
                          >
                            points
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              


                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1  sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-200 ${
                        currentPage === 1
                          ? `${themeClasses.muted} cursor-not-allowed opacity-50`
                          : `${themeClasses.buttonSecondary} text-white hover:scale-105 shadow-lg hover:shadow-xl`
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 cursor-pointer sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 sm:w-12 sm:h-12 cursor-pointer rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                              currentPage === pageNum
                                ? `${themeClasses.buttonPrimary} text-white shadow-lg scale-105 sm:scale-110`
                                : `${themeClasses.buttonSecondary} hover:scale-105`
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 cursor-pointer sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-200 ${
                        currentPage === totalPages
                          ? `${themeClasses.muted} cursor-not-allowed opacity-50`
                          : `${themeClasses.buttonSecondary} text-white hover:scale-105 shadow-lg hover:shadow-xl`
                      }`}
                    >
                      <span className="hidden xs:inline">Next</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}

              </div>
            )}
          </>
        )}

        {/* Enhanced Footer */}
        <div className="mt-20 text-center">
          <div className={`${themeClasses.statsBg} backdrop-blur-sm rounded-3xl p-8 ${themeClasses.cardBorder} shadow-lg max-w-2xl mx-auto`}>
            <div className="flex items-center justify-center mb-4">
              <Trophy className={`w-8 h-8 ${isDarkMode ? "text-yellow-400" : "text-yellow-500"} mr-2`} />
              <h3 className={`${themeClasses.text} text-xl font-bold`}>Keep Climbing!</h3>
            </div>
            <p className={`${themeClasses.muted} text-base`}>
              Every point counts towards your journey to the top. Keep pushing your limits! 🚀
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-2xl">
              <span>🏆</span>
              <span>🌟</span>
              <span>🚀</span>
              <span>💪</span>
              <span>🎯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}