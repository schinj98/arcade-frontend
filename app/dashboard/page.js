// DashBoard/page.js

"use client";
import HeroSection from '/components/HeroSection'
import { useEffect, useState } from 'react';



export default function HomePage() {
  const [profileData, setProfileData] = useState(null);
  const stats = [
    { title: 'Active Users', value: '2,847', color: 'primary' },
    { title: 'Courses Completed', value: '1,234', color: 'green' },
    { title: 'Badges Earned', value: '5,678', color: 'orange' },
    { title: 'Total Points', value: '89,234', color: 'purple' },
  ]
  
  useEffect(() => {
    // Direct backend se fetch karo
    async function fetchProfile() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiBase}/api/profile?profile_id=schinj98`);
        const json = await res.json();
        if (json?.data) {
          setProfileData(json.data); // ✅ Store in session-only state
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        Loading profile...
      </div>
    );
  }

  const features = [
    {
      title: 'Interactive Learning',
      description: 'Engage with hands-on courses and practical exercises designed to enhance your skills.',
      icon: '📚'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and personalized insights.',
      icon: '📊'
    },
    {
      title: 'Achievement System',
      description: 'Earn badges and climb leaderboards as you complete challenges and milestones.',
      icon: '🏆'
    },
    {
      title: 'Community Support',
      description: 'Connect with fellow learners and get help from our supportive community.',
      icon: '👥'
    }
  ]

  return (
    <div>
      <HeroSection 
        profileData={profileData} 
        incompleteBadges={profileData?.incompleteBadges} 
      />
    </div>
  )
}