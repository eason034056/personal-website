'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import Timeline from '@/components/Timeline'
import { FaUser, FaLightbulb, FaChartLine } from 'react-icons/fa'

// About 頁面
export default function AboutPage() {  
  const [activeCard, setActiveCard] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const cards = [
    {
      title: "Eason Wu",
      subtitle: "Active Learner with Data Science Skills",
      icon: <FaUser size={24} className="text-white" />,
      skills: [
        { name: "Problem Solving", level: "Expert", color: "text-gray-800" },
        { name: "Data Analysis", level: "Proficient", color: "text-gray-800" },
        { name: "AI/ML", level: "Proficient", color: "text-gray-800" }
      ]
    },
    {
      title: "Innovation Driven",
      subtitle: "Cutting-edge Solutions",
      icon: <FaLightbulb size={24} className="text-white" />,
      description: "I'm passionate about leveraging cutting-edge machine learning techniques to solve complex business problems and create data-driven solutions that make a real impact."
    },
    {
      title: "Results Focused",
      subtitle: "Data-Driven Decisions",
      icon: <FaChartLine size={24} className="text-white" />,
      description: "With expertise in statistical analysis and predictive modeling, I transform raw data into actionable insights that drive strategic business decisions."
    }
  ];

  const goToNextCard = useCallback(() => {
    setActiveCard((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const goToPrevCard = useCallback(() => {
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // 自動輪播效果
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoPlay) {
      intervalId = setInterval(goToNextCard, 3000); // 每3秒切換一次
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoPlay, goToNextCard]);

  // 處理手動切換
  const handleNext = () => {
    setAutoPlay(false); // 暫停自動播放
    goToNextCard();
    // 5秒後恢復自動播放
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const handlePrev = () => {
    setAutoPlay(false); // 暫停自動播放
    goToPrevCard();
    // 5秒後恢復自動播放
    setTimeout(() => setAutoPlay(true), 5000);
  };

  // 滑鼠懸停時暫停自動播放
  const handleMouseEnter = () => {
    setAutoPlay(false);
  };

  // 滑鼠離開時恢復自動播放
  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  return (
    <div className="min-h-screen">
      {/* Introduction Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0items-center">
            
            
            
            
            {/* 3D Model */}
            <div className="relative h-[400px] lg:h-[400px] flex items-center justify-center">
              {/* 這裡直接放你自己的SVG圖片，假設檔名為 avatar.svg，放在 public/images 目錄下 */}
              <img
                src="/images/avatar.svg"
                alt="Avatar"
                className="h-72 w-72 object-contain mx-auto"
              />
            </div>

            {/* Stacked Cards */}
            <div 
              className="relative h-[400px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Navigation Buttons */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
                <button
                  onClick={handlePrev}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Cards */}
              {cards.map((card, index) => {
                // 判斷目前是哪一張卡片要顯示在最上面
                const isActive = index === activeCard;
                const isPrevious = (index === ((activeCard - 1 + cards.length) % cards.length));
                const isNext = (index === ((activeCard + 1) % cards.length));

                // 設定卡片的樣式，根據目前是主卡片、上一張、下一張還是其他
                let cardStyle = "absolute w-full transition-all duration-500 flex items-center justify-center";
                if (isActive) {
                  cardStyle += " z-30 transform-none opacity-100";
                } else if (isPrevious) {
                  cardStyle += " z-20 -translate-y-4 scale-95 opacity-80";
                } else if (isNext) {
                  cardStyle += " z-10 -translate-y-8 scale-90 opacity-60";
                } else {
                  cardStyle += " z-0 -translate-y-12 scale-85 opacity-40";
                }

                return (
                  <div
                    key={index}
                    className={cardStyle}
                    style={{ top: 0, left: 0, height: '100%' }} // 讓卡片絕對定位且填滿父容器，確保垂直置中
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 w-full max-w-xl mx-auto">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{card.icon}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
                            <p className="text-gray-600">{card.subtitle}</p>
                          </div>
                        </div>
                        
                        {card.skills ? (
                          <div className="space-y-4">
                            {card.skills.map((skill, skillIndex) => (
                              <div key={skillIndex} className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">{skill.name}</span>
                                <span className="font-semibold text-gray-800">{skill.level}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 leading-relaxed">
                            {card.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive toolkit for modern data science and analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Data Science Skills */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Data Science</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Python/Pandas</span>
                      <span className="text-sm font-semibold text-gray-800">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">AI/ML</span>
                      <span className="text-sm font-semibold text-gray-800">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">AI Agent</span>
                      <span className="text-sm font-semibold text-gray-800">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analytics Skills */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Analytics</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">SQL</span>
                      <span className="text-sm font-semibold text-gray-800">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Data Visualization</span>
                      <span className="text-sm font-semibold text-gray-800">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Automation Workflow</span>
                      <span className="text-sm font-semibold text-gray-800">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tools & Technologies */}
            <div className="group md:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Tools</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">CI/CD</span>
                      <span className="text-sm font-semibold text-gray-800">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Tableau/PowerBI</span>
                      <span className="text-sm font-semibold text-gray-800">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Git/Docker</span>
                      <span className="text-sm font-semibold text-gray-800">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div id="journey" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              My Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
          </div>
          
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-gray-600"></div>
            </div>
          }>
            <Timeline />
          </Suspense>

          {/* CV Buttons */}
          <div className="flex justify-center space-x-4 mt-12">
            <button
              onClick={() => window.open('/documents/cv.pdf', '_blank')}
              className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 border border-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Preview CV</span>
            </button>
            
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/documents/cv.pdf';
                link.download = 'Yu-Sen_Wu_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 