// app/knowledge/[slug]/BlogPostClient.js
"use client";

import React, { useState } from 'react';
import { Star, Calendar, User, Clock, Heart, Share2, Bookmark, ArrowLeft, Tag, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


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
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);


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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-all duration-200">
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
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
            <div className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
              {post.category}
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar size={16} />
              <span className="text-sm font-medium">Added {formatDate(post.dateAdded)}</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <StarRating 
                rating={parseFloat(post.starRating) || 0} 
                totalRatings={parseFloat(post.starTotalRating) || 0}
              />
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600 font-medium">
                {parseFloat(post.starTotalRating) || 0} reviews
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`cursor-pointer group flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isLiked 
                    ? 'cursor-pointer text-red-500 bg-red-50 shadow-lg shadow-red-100' 
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50 hover:shadow-lg hover:shadow-red-100'
                }`}
              >
                <Heart size={20} className={`${isLiked ? 'fill-current' : ''} transition-transform group-hover:scale-110`} />
                <span>{(parseInt(post.likes) || 0) + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="cursor-pointer group p-3 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-100"
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
            <article className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
              {/* Description */}
              <div className="p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-2 prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 font-medium transition-colors"
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200" {...props} />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 className="text-4xl font-extrabold text-gray-900 mt-16 mb-8" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-2 leading-relaxed" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-700 mb-6 leading-relaxed text-lg" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-gray-600 bg-gray-100 px-1 py-0.5 rounded" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-gray-900 bg-yellow-100 px-1 py-0.5 rounded" {...props} />
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>
            {/* Tags */}
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={18} />
                    <span className="font-medium">Topics:</span>
                  </div>
                  {post.tags?.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors cursor-pointer shadow-sm border border-gray-200"
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
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {post.authorAvatar || post.author?.[0] || "A"}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{post.author}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.authorBio}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Published on</p>
                    <p className="font-semibold text-gray-900">{formatDate(post.dateAdded)}</p>
                  </div>
                </div>
              </div>

              {/* Reading Stats */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Article Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-red-500" />
                      <span className="text-sm font-medium text-gray-700">Likes</span>
                    </div>
                    <span className="font-bold text-gray-900">{(parseInt(post.likes) || 0) + (isLiked ? 1 : 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">Rating</span>
                    </div>
                    <span className="font-bold text-gray-900">{parseFloat(post.starRating) || 0}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Reviews</span>
                    </div>
                    <span className="font-bold text-gray-900">{parseFloat(post.starTotalRating) || 0}</span>
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