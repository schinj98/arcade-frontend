"use client";

import Link from "next/link";
import Head from 'next/head';
import { useState } from "react";
import { useRouter } from "next/navigation";


// Custom Alert/Message component
function MessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ProfileUrlInputSection() {
  const [profileUrl, setProfileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(''); // State for custom message
  const router = useRouter();

  const extractProfileId = (url) => {
    try {
      const match = url.match(/public_profiles\/([a-z0-9-]+)/i);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); // Clear previous messages
    
    const profileId = extractProfileId(profileUrl);

    if (profileId) {
      // Store profile ID in sessionStorage for dashboard to pick up
      sessionStorage.setItem("temp_profile_id", profileId);
      
      // Clear any existing cached data for this profile to force fresh API call
      localStorage.removeItem(`cachedProfileData-${profileId}`);
      
      // Redirect to dashboard without URL parameters
      router.push('/dashboard');
      setProfileUrl(''); // Clear input after submission
    } else {
      setMessage("Please enter a valid profile URL.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Connect Your Public Profile
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Link your achievements and progress to personalize your learning experience.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="profile-url" className="block text-sm font-medium text-gray-700 mb-2">
                Profile URL
              </label>
              <input
                id="profile-url"
                type="url"
                placeholder="e.g., https://www.cloudskillsboost.google/public_profiles/xxxx.xx"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Connecting...' : 'Connect Profile'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Your profile information is secure and will only be used to enhance your learning experience.
            </p>
          </div>
        </div>
      </div>
      <MessageModal message={message} onClose={() => setMessage('')} />
    </section>
  );
}

export default function HomePage() {
  const stats = [
    { title: 'Active Users', value: '2,847', icon: '👥' },
    { title: 'Courses Completed', value: '1,234', icon: '📚' },
    { title: 'Badges Earned', value: '5,678', icon: '🏆' },
    { title: 'Total Points', value: '89,234', icon: '⭐' },
  ];

  const features = [
    {
      title: 'Interactive Learning',
      description: 'Engage with hands-on courses and practical exercises designed to enhance your skills through real-world applications.',
      icon: '📚'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and personalized insights to track your improvement.',
      icon: '📊'
    },
    {
      title: 'Achievement System',
      description: 'Earn badges and unlock rewards as you complete challenges and reach new milestones in your learning path.',
      icon: '🏆'
    },
    {
      title: 'Community Support',
      description: 'Connect with fellow learners and get help from our supportive community of professionals and experts.',
      icon: '👥'
    }
  ];

  return (
    <>
      <Head>
        <title>Arcade Points Calculator | Personalized Score Tracker</title>
        <meta name="description" content="Calculate and Cloud Arcade Points using our accurate and user-friendly platform. Checkout the Swags you're Eligible for." />
        <meta name="keywords" content="arcade calculator, arcade profile, cloud skill badge tracker, facilitator Points calculate, calculate arcade points, learning tracker" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Arcade Points Calculator" />
        <meta property="og:description" content="calculate your cloud arcade points easily!" />
        <meta property="og:image" content="https://arcadetrack.com/" />
        <meta property="og:url" content="https://arcadetrack.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arcade Points Calculator" />
        <meta name="twitter:description" content="Calculate google cloud arcade points fast!" />
        <meta name="twitter:image" content="https://arcadetrack.com/" />
      </Head>

      <div className="min-h-screen bg-white">
        <ProfileUrlInputSection />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome to Arcade Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your learning experience with our comprehensive platform designed for modern professionals
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50" aria-labelledby="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header id="features" className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Arcade?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the features that make learning engaging and effective for professionals
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <article key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}