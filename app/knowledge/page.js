"use client"

import Link from 'next/link';
import { useState, useContext } from 'react';
import { Heart, Star, Calendar, User, Tag, Search, Filter, Grid, List, Sparkles, TrendingUp } from 'lucide-react';
import { blogPosts } from './blogData';
import { ThemeContext } from '@/context/ThemeContext'; // adjust path if needed

export default function BlogList() {
  const { isDarkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredPost, setHoveredPost] = useState(null);

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  const filteredPosts = blogPosts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => selectedTag === '' || post.tags.includes(selectedTag))
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'rating':
          return b.totalStarRating - a.totalStarRating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Theme-aware classes
  const theme = {
    pageBg: isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
    containerBg: isDarkMode ? 'bg-transparent' : 'bg-white/0',
    cardBg: isDarkMode ? 'bg-slate-900 border border-slate-800/60' : 'bg-white border border-gray-100',
    cardHover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50',
    textPrimary: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    muted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    accentBg: isDarkMode ? 'bg-slate-800/60' : 'bg-white/80',
    inputBg: isDarkMode ? 'bg-slate-800/60 placeholder-slate-400 text-slate-100' : 'bg-white/80 placeholder-gray-400 text-gray-700',
    pillBg: isDarkMode ? 'bg-slate-800/50 text-slate-200' : 'bg-blue-100 text-blue-800',
    tagHover: isDarkMode ? 'hover:bg-slate-700/60' : 'hover:from-blue-200 hover:to-purple-200',
    buttonPrimary: isDarkMode ? 'bg-blue-700 text-white shadow-lg hover:bg-blue-600' : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700',
    gradientAccentText: 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
  };

  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-amber-400/50 text-amber-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const BlogCard = ({ post }) => (
    <div
      className={`group ${theme.cardBg} rounded-2xl shadow-lg transform transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl overflow-hidden ${theme.cardHover}`}
      onMouseEnter={() => setHoveredPost(post.slug)}
      onMouseLeave={() => setHoveredPost(null)}
    >
      {/* Card Header with Gradient */}
      <div className={`h-2 ${isDarkMode ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700' : 'bg-gradient-to-r from-blue-500 to-pink-500'}`}></div>
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`${isDarkMode ? 'p-2 bg-slate-800 rounded-full' : 'p-2 bg-blue-50 rounded-full'}`}>
              <Calendar className={`${isDarkMode ? 'text-slate-200' : 'text-blue-600'} w-4 h-4`} />
            </div>
            <span className={`text-sm font-medium ${theme.textSecondary}`}>{formatDate(post.dateAdded)}</span>
          </div>
          <div className={`${isDarkMode ? 'flex items-center gap-2 px-3 py-1 bg-rose-900/30 rounded-full' : 'flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full'}`}>
            <Heart className={`${isDarkMode ? 'text-rose-300' : 'text-red-500'} w-4 h-4`} />
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-rose-200' : 'text-red-700'}`}>{post.likes}</span>
          </div>
        </div>

        <Link href={`/knowledge/${post.slug}`} className="block group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
          <h3 className={`text-2xl font-bold mb-4 group-hover:text-blue-400 transition-all duration-300 leading-tight ${theme.textPrimary}`}>
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <StarRating rating={post.starTotalRating} />
          <span className={`text-sm font-medium ${theme.muted}`}>({post.starTotalRating})</span>
          <div className={`h-4 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">Popular</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className={`px-3 py-1 ${theme.pillBg} text-xs font-medium rounded-full transition-all duration-200 cursor-pointer transform hover:scale-105 ${theme.tagHover}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className={`px-3 py-1 ${isDarkMode ? 'bg-slate-800/50 text-slate-300' : 'bg-gray-100 text-gray-600'} text-xs font-medium rounded-full`}>
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        <div className={`flex items-center justify-between pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`${isDarkMode ? 'w-8 h-8 bg-blue-800' : 'w-8 h-8 bg-blue-600'} rounded-full flex items-center justify-center`}>
              <span className="text-white font-semibold text-sm">
                {post.author[0]}
              </span>
            </div>
            <span className={`text-sm font-medium ${theme.textPrimary}`}>{post.author}</span>
          </div>
          <Link 
            href={`/knowledge/${post.slug}`}
            className={`${isDarkMode ? 'flex items-center gap-2 text-sky-300 hover:text-sky-400' : 'group flex items-center gap-2 text-blue-600 hover:text-blue-700'} text-sm font-semibold transition-all duration-200`}
          >
            <span>Read More</span>
            <div className={`${isDarkMode ? 'w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center' : 'w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center'} group-hover:bg-blue-200 transition-colors`}>
              <span className="text-xs">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  const BlogListItem = ({ post }) => (
    <div className={`${theme.cardBg} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 ${theme.cardHover}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-4">
            <Link href={`/knowledge/${post.slug}`} className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
              <h3 className={`text-2xl font-bold group-hover:text-blue-400 transition-all duration-300 ${theme.textPrimary}`}>
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <StarRating rating={post.starTotalRating} />
              <span className={`text-sm font-medium ${theme.muted}`}>({post.starTotalRating})</span>
            </div>
          </div>
          
          <p className={`text-base mb-6 max-w-3xl leading-relaxed ${theme.textSecondary}`}>
            {post.description}
          </p>

          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className={`${isDarkMode ? 'w-6 h-6 bg-blue-700' : 'w-6 h-6 bg-blue-600'} rounded-full flex items-center justify-center`}>
                <span className="text-white font-semibold text-xs">
                  {post.author[0]}
                </span>
              </div>
              <span className={`font-medium ${theme.textPrimary}`}>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`${isDarkMode ? 'p-1 bg-slate-800 rounded-full' : 'p-1 bg-blue-50 rounded-full'}`}>
                <Calendar className={`${isDarkMode ? 'text-slate-200' : 'text-blue-600'} w-4 h-4`} />
              </div>
              <span className={`font-medium ${theme.textSecondary}`}>{formatDate(post.dateAdded)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`${isDarkMode ? 'p-1 bg-rose-900/30 rounded-full' : 'p-1 bg-red-50 rounded-full'}`}>
                <Heart className={`${isDarkMode ? 'text-rose-300' : 'text-red-500'} w-4 h-4`} />
              </div>
              <span className={`${isDarkMode ? 'text-rose-200' : 'text-red-700'} font-medium`}>{post.likes}</span>
            </div>
          </div>
        </div>
        
        <div className="ml-8 flex flex-col items-end">
          <div className="flex flex-wrap gap-2 justify-end mb-4">
            {post.tags.slice(0, 2).map(tag => (
              <span 
                key={tag}
                className={`px-3 py-1 ${theme.pillBg} text-xs font-medium rounded-full cursor-pointer ${theme.tagHover} transition-all duration-200 transform hover:scale-105`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link 
            href={`/knowledge/${post.slug}`}
            className={`${isDarkMode ? 'group flex items-center gap-3 bg-sky-600 text-white px-6 py-3 rounded-xl' : 'group flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl'} transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            <span>Read Article</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <span className="text-xs">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${theme.pageBg} transition-colors duration-300 min-h-screen`}>
      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* Header Section */}
        <div className="text-center  mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`${isDarkMode ? 'p-2 bg-sky-700 rounded-2xl' : 'p-2 bg-blue-600 rounded-2xl'}`}>
              <Sparkles className={`${isDarkMode ? 'text-white' : 'text-white'} w-8 h-8`} />
            </div>
            <h1 className={`text-4xl md:text-36xl font-bold ${theme.gradientAccentText}`}>
              Knowledge Hub
            </h1>
          </div>
          <p className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Discover cutting-edge Articles, comprehensive tutorials, from us.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className={`${isDarkMode ? 'bg-slate-900/60' : 'bg-white/80'} backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search articles, authors, or dive into specific topics..."
                className={`w-full pl-12 pr-6 py-4 rounded-xl focus:border-transparent transition-all duration-200 ${theme.inputBg} border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4">
              {/* Tag Filter */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                  <Tag className="w-5 h-5" />
                </div>
                <select
                  className={`cursor-pointer pl-12 pr-8 py-4 rounded-xl  focus:border-transparent appearance-none ${theme.inputBg} min-w-[160px] font-medium ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">All Topics</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                  <Filter className="w-5 h-5" />
                </div>
                <select
                  className={`cursor-pointer pl-12 pr-8 py-4 rounded-xl focus:border-transparent appearance-none ${theme.inputBg} min-w-[160px] font-medium ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Latest First</option>
                  <option value="likes">Most Liked</option>
                  <option value="rating">Top Rated</option>
                  <option value="title">A to Z</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className={`flex rounded-xl overflow-hidden ${isDarkMode ? 'border border-slate-700 bg-slate-900/50' : 'border border-gray-200 bg-white/80'}`}>
                <button
                  className={`cursor-pointer px-6 py-4 transition-all duration-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : `${isDarkMode ? 'text-slate-300 hover:bg-slate-800/40' : 'text-gray-600 hover:bg-gray-50'}`}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  className={`cursor-pointer px-6 py-4 transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : `${isDarkMode ? 'text-slate-300 hover:bg-slate-800/40' : 'text-gray-600 hover:bg-gray-50'}`}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedTag) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {searchTerm && (
                <span className={`inline-flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-slate-800/40 text-sky-200' : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'} text-sm font-medium rounded-full`}>
                  <Search className="w-4 h-4" />
                  Search: {`"${searchTerm}"`}
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-600 font-bold">×</button>
                </span>
              )}
              {selectedTag && (
                <span className={`inline-flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-slate-800/40 text-emerald-300' : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800'} text-sm font-medium rounded-full`}>
                  <Tag className="w-4 h-4" />
                  Topic: {selectedTag}
                  <button onClick={() => setSelectedTag('')} className="ml-1 hover:text-emerald-600 font-bold">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            <p className={`${theme.textSecondary} font-medium`}>
              Showing <span className="text-blue-600 font-bold">{filteredPosts.length}</span> of <span className={`${theme.textPrimary} font-bold`}>{blogPosts.length}</span> articles
            </p>
          </div>
        </div>

        {/* Blog Posts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[85%] mx-auto">
            {filteredPosts.map(post => (
              <BlogCard 
                key={post.slug} 
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6 w-[85%] mx-auto">
            {filteredPosts.map(post => (
              <BlogListItem key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-blue-100'} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8`}>
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className={`text-2xl font-bold ${theme.textPrimary} mb-4`}>No articles found</h3>
            <p className={`${theme.textSecondary} mb-8 max-w-md mx-auto`}>
              We couldn&rsquo;t find any articles matching your criteria. Try adjusting your search terms or explore different topics.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('');
              }}
              className={`${theme.buttonPrimary} px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
