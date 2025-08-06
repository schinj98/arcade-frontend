"use client";

import React, { useState, useContext } from 'react';
import { Star, Calendar, User, Clock, Heart, Share2, Bookmark, ArrowLeft, Tag, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ThemeContext } from '@/context/ThemeContext'; // adjust path if needed

const StarRating = ({ rating, totalRatings, interactive = false }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const displayRating = interactive ? (hoveredRating || userRating) : rating;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={22}
            className={`${
              index < fullStars
                ? 'fill-amber-400 text-amber-400'
                : index === fullStars && hasHalfStar
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-all duration-200' : ''}`}
            onMouseEnter={() => interactive && setHoveredRating(index + 1)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && setUserRating(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default function BlogPostClient({ post }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const theme = {
    pageBg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900',
    sheetBg: isDarkMode ? 'bg-slate-900/60' : 'bg-white/80',
    cardBg: isDarkMode ? 'bg-slate-900 border border-slate-800/60 shadow-slate-900/20' : 'bg-white border border-gray-100 shadow-gray-200/50',
    subtleBorder: isDarkMode ? 'border-slate-800' : 'border-gray-100',
    textPrimary: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    muted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    accentBg: isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50',
    buttonPrimary: isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700',
    pill: isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-blue-600 text-white',
    prose: isDarkMode ? 'prose prose-invert' : 'prose',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`${theme.pageBg} min-h-screen transition-colors duration-300`}>
      {/* Header Navigation */}
      <div className={`${isDarkMode ? 'bg-slate-900/60' : 'bg-white/80'} backdrop-blur-sm border-b ${theme.subtleBorder} sticky top-0 z-10`}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button className={`${isDarkMode ? 'text-slate-200' : 'text-slate-600'} group flex items-center gap-3 hover:text-blue-600 transition-all duration-200`}>
            <div className={`${isDarkMode ? 'p-2 rounded-full bg-slate-800 group-hover:bg-slate-700' : 'p-2 rounded-full bg-gray-100 group-hover:bg-blue-100'} transition-colors`}>
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Knowledge</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className={`${isDarkMode ? 'px-4 py-2 bg-sky-700 text-white' : 'px-4 py-2 bg-blue-600 text-white'} text-sm font-semibold rounded-full shadow-lg`}>
              {post.category}
            </div>
            <div className={`${isDarkMode ? 'flex items-center gap-2 text-slate-300' : 'flex items-center gap-2 text-slate-500'}`}>
              <Calendar size={16} />
              <span className="text-sm font-medium">Added {formatDate(post.dateAdded)}</span>
            </div>
          </div>

          <h1 className={`text-5xl font-bold mb-8 leading-tight ${isDarkMode ? 'bg-gradient-to-r from-white/90 via-slate-200 to-white/90 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'}`}>
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <StarRating 
                rating={parseFloat(post.starRating) || 0} 
                totalRatings={parseFloat(post.starTotalRating) || 0}
              />
              <div className={`${isDarkMode ? 'h-6 w-px bg-slate-800' : 'h-6 w-px bg-gray-300'}`}></div>
              <span className={`${isDarkMode ? 'text-slate-300' : 'text-gray-600'} text-sm font-medium`}>
                {parseFloat(post.starTotalRating) || 0} reviews
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`cursor-pointer group flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isLiked 
                    ? 'text-rose-500 bg-rose-50 shadow-lg shadow-rose-100' 
                    : `${isDarkMode ? 'text-slate-200 hover:text-rose-400 hover:bg-rose-900/20' : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'} hover:shadow-lg`
                }`}
              >
                <Heart size={20} className={`${isLiked ? 'fill-current' : ''} transition-transform group-hover:scale-110`} />
                <span>{(parseInt(post.likes) || 0) + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={handleShare}
                className={`${isDarkMode ? 'group p-3 text-slate-200 hover:text-emerald-300 hover:bg-emerald-900/20' : 'group p-3 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50'} rounded-xl transition-all duration-200 hover:shadow-lg`}
              >
                <Share2 size={20} className="cursor-pointer transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <article className={`${theme.cardBg} rounded-2xl overflow-hidden ${isDarkMode ? 'shadow-slate-900/40' : 'shadow-xl'} `}>
              {/* Description */}
              <div className={`${isDarkMode ? 'p-8 bg-slate-900/50 border-b border-slate-800' : 'p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100'}`}>
                <div className="flex items-start gap-4">
                  <div className={`${isDarkMode ? 'w-1 h-16 bg-sky-600 rounded-full' : 'w-1 h-16 bg-blue-600 rounded-full'}`}></div>
                  <div>
                    <h3 className={`${isDarkMode ? 'text-lg font-semibold text-slate-100 mb-3' : 'text-lg font-semibold text-gray-900 mb-3'}`}>Overview</h3>
                    <p className={`${isDarkMode ? 'text-slate-300 text-lg leading-relaxed' : 'text-gray-700 text-lg leading-relaxed'}`}>
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`px-8 py-6 max-w-none ${isDarkMode ? 'bg-slate-900' : 'bg-white'} `}>
                <div className={`${theme.prose} max-w-none`}>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${isDarkMode ? 'text-sky-300 hover:text-sky-400' : 'text-blue-600 hover:text-blue-700'} underline decoration-2 underline-offset-2 font-medium transition-colors`}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className={`${isDarkMode ? 'text-3xl font-bold text-slate-100 mt-12 mb-6 pb-3 border-b border-slate-800' : 'text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200'}`} {...props} />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 className={`${isDarkMode ? 'text-4xl font-extrabold text-slate-100 mt-16 mb-8' : 'text-4xl font-extrabold text-gray-900 mt-16 mb-8'}`} {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className={`${isDarkMode ? 'list-disc list-inside text-slate-300 mb-6 space-y-2' : 'list-disc list-inside text-gray-700 mb-6 space-y-2'}`} {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className={`${isDarkMode ? 'list-decimal list-inside text-slate-300 mb-6 space-y-2' : 'list-decimal list-inside text-gray-700 mb-6 space-y-2'}`} {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-2 leading-relaxed" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className={`${isDarkMode ? 'text-slate-300 mb-6 leading-relaxed text-lg' : 'text-gray-700 mb-6 leading-relaxed text-lg'}`} {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em className={`${isDarkMode ? 'italic text-slate-200 bg-slate-800 px-1 py-0.5 rounded' : 'italic text-gray-600 bg-gray-100 px-1 py-0.5 rounded'}`} {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className={`${isDarkMode ? 'font-bold text-slate-100 bg-yellow-900/30 px-1 py-0.5 rounded' : 'font-bold text-gray-900 bg-yellow-100 px-1 py-0.5 rounded'}`} {...props} />
                      )
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>

            {/* Tags */}
            <div className={`${isDarkMode ? 'px-8 py-6 bg-slate-900/40 border-t border-slate-800' : 'px-8 py-6 bg-gray-50 border-t border-gray-100'}`}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className={`${isDarkMode ? 'flex items-center gap-2 text-slate-300' : 'flex items-center gap-2 text-gray-600'}`}>
                  <Tag size={18} />
                  <span className="font-medium">Topics:</span>
                </div>
                {post.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className={`${isDarkMode ? 'px-4 py-2 bg-slate-800 text-slate-200 text-sm font-medium rounded-full hover:bg-slate-700 transition-colors cursor-pointer shadow-sm border border-slate-700' : 'px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors cursor-pointer shadow-sm border border-gray-200'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Author Card */}
              <div className={`${isDarkMode ? 'bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-slate-900/40' : 'bg-white p-6 rounded-2xl border border-gray-100 shadow-lg'}`}>
                <div className="text-center">
                  <div className={`${isDarkMode ? 'w-16 h-16 bg-sky-700' : 'w-16 h-16 bg-blue-600'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-white font-bold text-xl">
                      {post.authorAvatar || post.author?.[0] || "A"}
                    </span>
                  </div>
                  <h3 className={`${isDarkMode ? 'font-bold text-slate-100 text-lg mb-2' : 'font-bold text-gray-900 text-lg mb-2'}`}>{post.author}</h3>
                  <p className={`${isDarkMode ? 'text-slate-300 text-sm mb-4' : 'text-gray-600 text-sm mb-4'}`}>{post.authorBio}</p>
                  <div className={`pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
                    <p className={`${isDarkMode ? 'text-xs text-slate-400 mb-1' : 'text-xs text-gray-500 mb-1'}`}>Published on</p>
                    <p className={`${isDarkMode ? 'font-semibold text-slate-100' : 'font-semibold text-gray-900'}`}>{formatDate(post.dateAdded)}</p>
                  </div>
                </div>
              </div>

              {/* Reading Stats */}
              <div className={`${isDarkMode ? 'bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-slate-900/40' : 'bg-white p-6 rounded-2xl border border-gray-100 shadow-lg'}`}>
                <h3 className={`${isDarkMode ? 'font-bold text-slate-100 text-lg mb-4' : 'font-bold text-gray-900 text-lg mb-4'}`}>Article Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-rose-500" />
                      <span className={`${isDarkMode ? 'text-slate-300 text-sm font-medium' : 'text-gray-700 text-sm font-medium'}`}>Likes</span>
                    </div>
                    <span className={`${isDarkMode ? 'font-bold text-slate-100' : 'font-bold text-gray-900'}`}>{(parseInt(post.likes) || 0) + (isLiked ? 1 : 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-amber-500" />
                      <span className={`${isDarkMode ? 'text-slate-300 text-sm font-medium' : 'text-gray-700 text-sm font-medium'}`}>Rating</span>
                    </div>
                    <span className={`${isDarkMode ? 'font-bold text-slate-100' : 'font-bold text-gray-900'}`}>{parseFloat(post.starRating) || 0}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="text-blue-500" />
                      <span className={`${isDarkMode ? 'text-slate-300 text-sm font-medium' : 'text-gray-700 text-sm font-medium'}`}>Reviews</span>
                    </div>
                    <span className={`${isDarkMode ? 'font-bold text-slate-100' : 'font-bold text-gray-900'}`}>{parseFloat(post.starTotalRating) || 0}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
