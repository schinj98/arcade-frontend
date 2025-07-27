

import React, { useState, useEffect, useContext } from 'react';
import { Award, Star, TrendingUp, Activity, Calendar, Target, Flame } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';

const ProgressGraph = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('chart');
  const [hoverX, setHoverX] = useState(null);
  const [nearestIndex, setNearestIndex] = useState(null);

  const {profileData} = useContext(ProfileContext)
  const badgesCompletedInAWeek = profileData?.badgesCompletedInAWeek
  const totalPoints = profileData?.completed_totalPoints
  
  // calculating level for progres section
  let progressToNextLevel = 0;
  let forprogressToNextLevel = 0;
  let level = 0;
  let basePoints = 0;

  if (totalPoints >= 75) {
    level = 5;
    forprogressToNextLevel = 10;
    basePoints = 75;
  } else if (totalPoints >= 65) {
    level = 4;
    forprogressToNextLevel = 10;
    basePoints = 65;
  } else if (totalPoints >= 40) {
    level = 3;
    forprogressToNextLevel = 25;
    basePoints = 40;
  } else if (totalPoints >= 20) {
    level = 2;
    forprogressToNextLevel = 20;
    basePoints = 20;
  } else {
    level = 1;
    forprogressToNextLevel = 20;
    basePoints = 0;
  }

  progressToNextLevel = Math.min(
    ((totalPoints - basePoints) / forprogressToNextLevel) * 100,
    100
  );



  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const dayShortFormMap = {
    "Monday": "Mon",
    "Tuesday": "Tue",
    "Wednesday": "Wed",
    "Thursday": "Thu",
    "Friday": "Fri",
    "Saturday": "Sat",
    "Sunday": "Sun"
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weeklyProgress = daysOfWeek.map((day) => ({
    day: dayShortFormMap[day],
    fullDay: day,
    points: badgesCompletedInAWeek?.[day] || 0
  }));

  const maxWeeklyPoints = Math.max(...weeklyProgress.map(d => d.points), 1);
  const totalWeeklyPoints = weeklyProgress.reduce((sum, day) => sum + day.points, 0);
  const activeDays = weeklyProgress.filter(day => day.points > 0).length;

  const getStreak = () => {
    let currentStreak = 0;
    for (let i = weeklyProgress.length - 1; i >= 0; i--) {
      if (weeklyProgress[i].points > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    return currentStreak;
  };

  const streak = getStreak();

   // Chart Dimensions
   const chartWidth = 400;
   const chartHeight = 200;
   const padding = 35;
   const pointGap = (chartWidth - padding * 2) / (weeklyProgress.length - 1);
 

   const generatePath = (points) => {
    if (points.length < 2) return '';

    const xStep = pointGap;
    const yScale = maxWeeklyPoints > 0 ? (chartHeight - padding * 2) / maxWeeklyPoints : 0;

    let path = '';

    points.forEach((point, i) => {
      const x = padding + i * xStep;
      const y = chartHeight - padding - (point.points * yScale * animationProgress);

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevX = padding + (i - 1) * xStep;
        const prevY = chartHeight - padding - (points[i - 1].points * yScale * animationProgress);
        const cpX = (prevX + x) / 2;
        path += ` Q ${cpX} ${prevY} ${x} ${y}`;
      }
    });


    return path;
  };

  const svgPath = generatePath(weeklyProgress);


  const getPerformanceLabel = (points) => {
    if (points >= 8) return 'Excellent';
    if (points >= 5) return 'Good';
    if (points >= 2) return 'Fair';
    return points > 0 ? 'Started' : 'NA';
  };

  const getPerformanceColor = (points) => {
    if (points >= 8) return 'text-green-600';
    if (points >= 5) return 'text-blue-600';
    if (points >= 2) return 'text-yellow-600';
    return points > 0 ? 'text-orange-600' : 'text-gray-400';
  };

  const getLevelColor = (level) => {
    if (level >= 20) return 'from-purple-500 to-pink-500';
    if (level >= 15) return 'from-blue-500 to-purple-500';
    if (level >= 10) return 'from-green-500 to-blue-500';
    if (level >= 5) return 'from-yellow-500 to-green-500';
    return 'from-gray-500 to-yellow-500';
  };


  return (
    <div className="rounded-xl bg-gray-50 py-6 sm:py-7 px-3 sm:px-4">

      {/* Weekly Progress Chart */}
      {activeTab === 'chart' ? (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-800">Weekly Progress</h4>
            <Activity size={20} className="text-blue-500" />
          </div>
          
          <div className="relative">
          <svg
            width={chartWidth}
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full max-w-full"
            onMouseMove={(e) => {
              const svgElement = e.currentTarget;
              const pt = svgElement.createSVGPoint();
              pt.x = e.clientX;
              pt.y = e.clientY;
              
              const svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
              
              // Calculate nearest index
              const relativeX = svgP.x - padding;
              const index = Math.round(relativeX / pointGap);
              
              if (index >= 0 && index < weeklyProgress.length) {
                setNearestIndex(index);
                setHoverX(padding + index * pointGap);
              }
            }}
            onMouseLeave={() => {
              setNearestIndex(null);
              setHoverX(null);
            }}
          >

              {/* Background gradient */}
              <defs>
                <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Background */}
              <rect width={chartWidth} height={chartHeight} fill="url(#backgroundGradient)" rx="12" />
              
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={i}
                  x1={padding}
                  y1={padding + i * (chartHeight - padding * 2) / 4}
                  x2={chartWidth - padding}
                  y2={padding + i * (chartHeight - padding * 2) / 4}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              ))}
              {hoverX !== null && nearestIndex !== null && (
                <>
                  {/* Vertical Line */}
                  <line
                    x1={hoverX}
                    y1={padding}
                    x2={hoverX}
                    y2={chartHeight - padding}
                    stroke="#94a3b8" // gray-400
                    strokeDasharray="4"
                    strokeWidth="1.5"
                  />

                  {/* Tooltip */}
                  {(() => {
                    const point = weeklyProgress[nearestIndex];
                    const yScale = maxWeeklyPoints > 0 ? (chartHeight - padding * 2) / maxWeeklyPoints : 0;
                    const y = chartHeight - padding - (point.points * yScale * animationProgress);

                    return (
                      <g>
                        <rect
                          x={hoverX - 45}
                          y={y - 50}
                          width="90"
                          height="35"
                          rx="8"
                          fill="#1e293b"
                          opacity="0.95"
                          className="drop-shadow-lg"
                        />
                        <text
                          x={hoverX}
                          y={y - 35}
                          textAnchor="middle"
                          fill="white"
                          fontSize="12"
                          fontWeight="600"
                        >
                          {point.points} badges
                        </text>
                        <text
                          x={hoverX}
                          y={y - 20}
                          textAnchor="middle"
                          fill="#94a3b8"
                          fontSize="10"
                        >
                          {point.fullDay}
                        </text>
                      </g>
                    );
                  })()}
                </>
              )}

              
              {/* Area under curve */}
              {svgPath && animationProgress > 0 && (
                <path
                  d={`${svgPath} L ${chartWidth - padding} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
                  fill="url(#chartGradient)"
                  className="transition-all duration-1000 ease-out"
                />
              )}
              
              {/* Main line */}
              {svgPath && (
                <path
                  d={svgPath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-1000 ease-out"
                />
              )}

              {/* Data points */}
              {weeklyProgress.map((day, index) => {
                const x = padding + index * pointGap;
                const yScale = maxWeeklyPoints > 0 ? (chartHeight - padding * 2) / maxWeeklyPoints : 0;
                const y = chartHeight - padding - (day.points * yScale * animationProgress);

                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r={hoveredPoint === index ? "8" : "6"}
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-200 hover:r-8 drop-shadow-sm"
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {hoveredPoint === index && (
                      <g>
                        <rect
                          x={x - 45}
                          y={y - 50}
                          width="90"
                          height="35"
                          rx="8"
                          fill="#1e293b"
                          opacity="0.95"
                          className="drop-shadow-lg"
                        />
                        <text
                          x={x}
                          y={y - 35}
                          textAnchor="middle"
                          fill="white"
                          fontSize="12"
                          fontWeight="600"
                        >
                          {day.points} badges
                        </text>
                        <text
                          x={x}
                          y={y - 20}
                          textAnchor="middle"
                          fill="#94a3b8"
                          fontSize="10"
                        >
                          {day.fullDay}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* X-axis Labels */}
            <div className="flex justify-between mt-4 px-7">
              {weeklyProgress.map((day, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-200 ${
                    hoveredPoint === index ? 'transform scale-110' : ''
                  }`}
                >
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    hoveredPoint === index ? 'text-blue-600' : 'text-slate-600'
                  }`}>
                    {day.day}
                  </span>
                  <div className={`text-xs mt-1 transition-colors duration-200 ${
                    getPerformanceColor(day.points)
                  }`}>
                    {getPerformanceLabel(day.points)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Daily Breakdown</h4>
              <div className="space-y-3">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        day.points > 0 ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="font-medium text-slate-700">{day.fullDay}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">{day.points} badges</div>
                      <div className={`text-xs ${getPerformanceColor(day.points)}`}>
                        {getPerformanceLabel(day.points)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Performance Insights</h4>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-800">Weekly Performance</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {totalWeeklyPoints > 35 ? 'Outstanding week! Keep up the excellent work!' : 
                     totalWeeklyPoints > 21 ? 'Great progress this week!' : 
                     totalWeeklyPoints > 14 ? 'Good effort, room for improvement!' :
                     'Let\'s aim higher next week!'}
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-green-600" />
                    <span className="font-medium text-green-800">Best Performance</span>
                  </div>
                  <p className="text-sm text-green-700">
                    {weeklyProgress.find(d => d.points === maxWeeklyPoints)?.fullDay} with {maxWeeklyPoints} badges
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame size={16} className="text-purple-600" />
                    <span className="font-medium text-purple-800">Current Streak</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    {streak > 0 ? `${streak} day${streak > 1 ? 's' : ''} of consistent progress!` : 'Start your streak today!'}
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-orange-600" />
                    <span className="font-medium text-orange-800">Next Level</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Only {10 - (totalPoints % 10)} more points to reach Level {level + 1}!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressGraph;