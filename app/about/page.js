'use client';
import { Target, BarChart3, Globe, Heart, Users, TrendingUp, Award, Zap, Shield, Star, ChevronRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';



export default function AboutPage() {
  const router = useRouter();
  const team = [
    {
      name: 'Sachin Jangid',
      role: 'Founder & Developer',
      description: 'Built ArcadeTrack to help learners easily track their GCP Arcade progress.',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Community Contributors',
      role: 'Supporters & Testers',
      description: 'Amazing learners who helped test and improve the platform.',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const values = [
    {
      title: 'Clarity',
      description: 'We simplify the Google Cloud Arcade experience for every learner.',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Accuracy',
      description: 'Precise Arcade points calculation, updated in real time.',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
    },
    {
      title: 'Open Access',
      description: 'Free and open for all learners — no sign-ups, no paywalls.',
      icon: Globe,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Community First',
      description: 'Built with feedback and love from real GCP learners.',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200',
    },
  ];

  const stats = [
    { value: '~7K+', label: 'Active Users', icon: Users, color: 'text-blue-600' },
    { value: '~12K+', label: 'Profiles Analyzed', icon: TrendingUp, color: 'text-green-600' },
    { value: '4.9/5', label: 'User Rating', icon: Star, color: 'text-amber-600' },
    { value: '100%', label: 'Ad-Free', icon: Shield, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl text-white">
                <Sparkles size={24} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About ArcadeTrack</h1>
            <p className="text-lg text-gray-600">
              ArcadeTrack is your simple and fast companion to track Google Cloud Arcade
              progress. No logins. No clutter. Just your profile URL and complete insights.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={stat.color} />
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Zap size={20} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How It Started</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                As a GCP learner myself, I found it difficult to track my Arcade badge progress
                quickly. Google&apos;s dashboard didn&apos;t offer enough flexibility or clarity.
              </p>
              <p>
                So I built ArcadeTrack — a fast, clean, and no-login tool that helps thousands of
                students and developers monitor their journey, track weekly badge completions, and
                even compare with friends.
              </p>
              <p>
                Today, the platform serves 50K+ learners and counting — and it&apos;s all driven by
                feedback from the community.
              </p>
            </div>
          </div>

          {/* Platform Journey */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Journey</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">The Problem</h4>
                  <p className="text-sm text-gray-600">Identified the need for better Arcade progress tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">The Solution</h4>
                  <p className="text-sm text-gray-600">Built a simple, no-login tracking tool</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">The Growth</h4>
                  <p className="text-sm text-gray-600">Scaled to serve 50K+ learners worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">The Future</h4>
                  <p className="text-sm text-gray-600">Continuously improving with community feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simplicity. Speed. Support. These values drive ArcadeTrack&apos;s mission to empower every GCP learner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`${value.bgColor} ${value.borderColor} border rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className={value.color} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Meet The Creator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ArcadeTrack was built solo — with love for GCP Arcade and the community learning with it.
            </p>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center w-full sm:w-[320px] hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                >
                  <div className={`w-20 h-20 ${member.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={32} className={member.color} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Track Your Progress?</h3>
          <p className="text-gray-600 mb-6">Join thousands of learners using ArcadeTrack to monitor their GCP Arcade journey.</p>
          <button onClick={() => router.push('/')} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 inline-flex items-center gap-2">
            Start Tracking Now
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}