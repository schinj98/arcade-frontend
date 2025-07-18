"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Star, Calendar, User, Tag, Search, Filter, Grid, List, Sparkles, TrendingUp } from 'lucide-react';
import { blogPosts } from './blogData';


export default function BlogList() {
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

  const BlogCard = ({ post, isHovered }) => (
    <div
    className="group bg-white rounded-2xl shadow-lg transform transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-100/50 overflow-hidden border border-gray-100"
  onMouseEnter={() => setHoveredPost(post.slug)}
  onMouseLeave={() => setHoveredPost(null)}
>


      {/* Card Header with Gradient */}
      <div className="h-2 bg-blue-500 to-pink-500"></div>
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">{formatDate(post.dateAdded)}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-700">{post.likes}</span>
          </div>
        </div>

        <Link href={`/knowledge/${post.slug}`} className="block group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600  transition-all duration-300 leading-tight">
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <StarRating rating={post.starTotalRating} />
          <span className="text-sm font-medium text-gray-500">({post.starTotalRating})</span>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">Popular</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:from-blue-200 hover:to-purple-200 transition-all duration-200 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.author[0]}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          <Link 
            href={`/knowledge/${post.slug}`}
            className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-200"
          >
            <span>Read More</span>
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-xs">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  const BlogListItem = ({ post }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-4">
            <Link href={`/knowledge/${post.slug}`} className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-300">
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <StarRating rating={post.starTotalRating} />
              <span className="text-sm font-medium text-gray-500">({post.starTotalRating})</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-base mb-6 max-w-3xl leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {post.author[0]}
                </span>
              </div>
              <span className="font-medium text-gray-700">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-50 rounded-full">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-600">{formatDate(post.dateAdded)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-50 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-medium text-red-700">{post.likes}</span>
            </div>
          </div>
        </div>
        
        <div className="ml-8 flex flex-col items-end">
          <div className="flex flex-wrap gap-2 justify-end mb-4">
            {post.tags.slice(0, 2).map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full cursor-pointer hover:from-blue-200 hover:to-purple-200 transition-all duration-200 transform hover:scale-105"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link 
            href={`/knowledge/${post.slug}`}
            className="group flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl  transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* Header Section */}
        <div className="text-center  mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-36xl font-bold bg-blue-600 bg-clip-text text-transparent">
              Knowledge Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge Articles, comprehensive tutorials, from us.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search articles, authors, or dive into specific topics..."
                className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white/80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4">
              {/* Tag Filter */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Tag className="w-5 h-5" />
                </div>
                <select
                  className="cursor-pointer pl-12 pr-8 py-4 border border-gray-200 rounded-xl  focus:border-transparent appearance-none bg-white/80 min-w-[160px] font-medium text-gray-700"
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
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Filter className="w-5 h-5" />
                </div>
                <select
                  className="cursor-pointer pl-12 pr-8 py-4 border border-gray-200 rounded-xl focus:border-transparent appearance-none bg-white/80 min-w-[160px] font-medium text-gray-700"
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
              <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white/80">
                <button
                  className={`cursor-pointer px-6 py-4 transition-all duration-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  className={`cursor-pointer px-6 py-4 transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
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
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full">
                  <Search className="w-4 h-4" />
                  Search: {`"${searchTerm}"`}
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-600 font-bold">×</button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-medium rounded-full">
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
            <p className="text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-bold">{filteredPosts.length}</span> of <span className="text-gray-900 font-bold">{blogPosts.length}</span> articles
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
                isHovered={hoveredPost === post.slug}
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
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn&rsquo;t find any articles matching your criteria. Try adjusting your search terms or explore different topics.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('');
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}