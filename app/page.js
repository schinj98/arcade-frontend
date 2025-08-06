// app/page.js  (or app/home/page.js - adjust path/name as needed)
'use client';

import Link from "next/link";
import Head from 'next/head';
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from '@/context/ThemeContext'; // ensure this path is correct

// Custom Alert/Message component
function MessageModal({ message, onClose, themeClasses }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`${themeClasses.cardBg} rounded-lg shadow-xl p-6 max-w-sm w-full relative z-10 border ${themeClasses.border}`}>
        <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Notification</h3>
        <p className={`${themeClasses.textSecondary} mb-6`}>{message}</p>
        <button
          onClick={onClose}
          className={`w-full ${themeClasses.primaryBtn} text-white px-4 py-2 rounded-lg font-medium hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ProfileUrlInputSection() {
  const { isDarkMode } = useContext(ThemeContext);
  const [profileUrl, setProfileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(''); // State for custom message
  const router = useRouter();

  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    inputBg: isDarkMode ? 'bg-slate-900/80' : 'bg-white',
    inputBorder: isDarkMode ? 'border-slate-700' : 'border-gray-300',
    placeholder: isDarkMode ? 'placeholder-slate-500' : 'placeholder-gray-400',
    primaryBtn: 'bg-blue-600 hover:bg-blue-700',
  };

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
    setMessage('');
    const profileId = extractProfileId(profileUrl);

    if (profileId) {
      sessionStorage.setItem("temp_profile_id", profileId);
      localStorage.removeItem(`cachedProfileData-${profileId}`);

      router.push('/dashboard');
      setProfileUrl('');
    } else {
      setMessage("Please enter any valid profile URL.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${themeClasses.bg} border-b ${themeClasses.border} py-16`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-semibold ${themeClasses.text} mb-3`}>
            Connect Your Public Profile
          </h2>
          <p className={`${themeClasses.textSecondary} max-w-2xl mx-auto`}>
            Enter Google Cloud Public Profile URL to Calculate Arcade Points Instantly.
          </p>
        </div>

        <div className={`${themeClasses.cardBg} rounded-lg shadow-sm border ${themeClasses.border} p-6`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="profile-url" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>
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
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.inputBg} ${themeClasses.inputBorder} ${themeClasses.placeholder} ${themeClasses.text}`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer w-full text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.primaryBtn}`}
            >
              {isSubmitting ? 'Connecting...' : 'Connect Profile'}
            </button>
          </form>

          <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-slate-800/60' : 'bg-gray-50'} border ${isDarkMode ? 'border-slate-700/40' : 'border-gray-100'}`}>
            <p className={`${themeClasses.textSecondary} text-sm text-center`}>
              Your profile information is secure and will only be used to enhance your learning experience.
            </p>
          </div>
        </div>
      </div>
      <MessageModal message={message} onClose={() => setMessage('')} themeClasses={themeClasses} />
    </section>
  );
}

export default function HomePage() {
  const { isDarkMode } = useContext(ThemeContext);

  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-white',
    pageBgSection: isDarkMode ? 'bg-slate-900/95' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    lightBorder: isDarkMode ? 'border-slate-600/30' : 'border-gray-100',
    inputBg: isDarkMode ? 'bg-slate-900/80' : 'bg-white',
    inputBorder: isDarkMode ? 'border-slate-700' : 'border-gray-200',
    placeholder: isDarkMode ? 'placeholder-slate-500' : 'placeholder-gray-400',
    cardHover: isDarkMode ? 'hover:shadow-slate-800/50' : 'hover:shadow-md',
    gradientBlue: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-blue-50 to-indigo-50',
    primaryBtn: 'bg-blue-600 hover:bg-blue-700'
  };

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
        <meta name="description" content="Calculate and Cloud Arcade Points using our accurate and user-friendly platform. Checkout the Swags you're Eligible for. Monitor your Google Cloud Arcade journey in real-time. Track points, badges, and swag eligibility. Get personalized insights, progress analytics, and achievement recommendations to accelerate your cloud certification path." />
        <meta name="keywords" content="arcade calculator, arcade profile, cloud skill badge tracker, facilitator Points calculate, calculate arcade points, learning tracker" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Arcade Points Calculator" />
        <meta property="og:description" content="calculate your cloud arcade points easily!" />
        <meta property="og:image" content="https://arcadetrack.com/" />
        <meta property="og:url" content="https://arcadetrack.com/" />
      </Head>

      <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg}`}>
        <ProfileUrlInputSection />

        <section className={`py-16 ${themeClasses.pageBgSection}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-bold ${themeClasses.text} mb-4`}>
                Welcome to Arcade Platform
              </h1>
              <p className={`${themeClasses.textSecondary} text-xl max-w-3xl mx-auto`}>
                Transform your learning experience with our comprehensive platform designed for modern professionals
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className={`${themeClasses.cardBg} rounded-lg border ${themeClasses.border} p-6 text-center ${themeClasses.cardHover} transition-shadow`}>
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{stat.value}</div>
                  <div className={`${themeClasses.textSecondary} font-medium`}>{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-16 ${isDarkMode ? 'bg-transparent' : 'bg-gray-50'}`} aria-labelledby="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header id="features" className="text-center mb-12">
              <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>Why Choose Arcade?</h2>
              <p className={`${themeClasses.textSecondary} max-w-2xl mx-auto`}>
                Discover the features that make learning engaging and effective for professionals
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <article key={index} className={`${themeClasses.cardBg} rounded-lg border ${themeClasses.border} p-6 ${themeClasses.cardHover} transition-shadow`}>
                  <div className={`w-12 h-12 ${isDarkMode ? 'bg-slate-800/60' : 'bg-blue-50'} rounded-lg flex items-center justify-center mb-4`}>
                    <span className={`text-xl ${themeClasses.text}`}>{feature.icon}</span>
                  </div>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{feature.title}</h3>
                  <p className={`${themeClasses.textSecondary} text-sm leading-relaxed`}>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
