/**
 * @description 第七关游戏页面 - 内容审核模拟
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Content {
  id: string;
  title: string;
  metrics: {
    audioQuality: string;
    thumbnailQuality: string;
    tags: string[];
  };
  isRecommended: boolean;
  filterReason?: string;
  recommendReason?: string;
}

const contents: Content[] = [
  {
    id: 'v1',
    title: 'Living with Autism: My Story',
    metrics: {
      audioQuality: 'Unclear',
      thumbnailQuality: 'Low',
      tags: ['#Autism', '#SelfHelp']
    },
    isRecommended: false,
    filterReason: 'Audio clarity too low and flagged tag reduces safety score.'
  },
  {
    id: 'v2',
    title: 'CEO Morning Routine',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'High',
      tags: ['#Productivity', '#Wellness']
    },
    isRecommended: true,
    recommendReason: 'Clean aesthetic and motivational theme with high user trust.'
  },
  {
    id: 'v3',
    title: "Let's Talk About Gender Identity",
    metrics: {
      audioQuality: 'Moderate',
      thumbnailQuality: 'Low',
      tags: ['#Gender', '#LGBTQ']
    },
    isRecommended: false,
    filterReason: 'Sensitive topic paired with poor visual clarity.'
  },
  {
    id: 'v4',
    title: 'How I Manage Depression in College',
    metrics: {
      audioQuality: 'Unclear',
      thumbnailQuality: 'Low',
      tags: ['#MentalHealth', '#Teens']
    },
    isRecommended: false,
    filterReason: 'System marked content as emotionally unstable and under-produced.'
  },
  {
    id: 'v5',
    title: 'Skincare 101: Dermatologist Tips',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'High',
      tags: ['#Skincare', '#Education']
    },
    isRecommended: true,
    recommendReason: 'Professional polish and clear instruction detected.'
  },
  {
    id: 'v6',
    title: 'I Survived Domestic Violence',
    metrics: {
      audioQuality: 'Unclear',
      thumbnailQuality: 'Low',
      tags: ['#Violence', '#Survivor']
    },
    isRecommended: false,
    filterReason: 'High emotional volatility and unsafe keyword cluster.'
  },
  {
    id: 'v7',
    title: 'My Hijab Is Not a Symbol of Oppression',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'Average',
      tags: ['#Faith', '#Women']
    },
    isRecommended: false,
    filterReason: 'Religious identity flagged for safety uncertainty.'
  },
  {
    id: 'v8',
    title: 'Life Hacks to Save $100/Month',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'High',
      tags: ['#Finance', '#DailyTips']
    },
    isRecommended: true,
    recommendReason: 'High engagement potential and widely appealing topic.'
  },
  {
    id: 'v9',
    title: 'Queer Joy and Chosen Family',
    metrics: {
      audioQuality: 'Moderate',
      thumbnailQuality: 'Low',
      tags: ['#LGBTQ', '#Community']
    },
    isRecommended: false,
    filterReason: 'Low visual quality paired with flagged identity category.'
  },
  {
    id: 'v10',
    title: 'From Prison to Purpose',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'Average',
      tags: ['#Justice', '#Redemption']
    },
    isRecommended: false,
    filterReason: 'System deprioritized carceral narratives for general feed.'
  },
  {
    id: 'v11',
    title: 'Teen Girls on Body Image',
    metrics: {
      audioQuality: 'Moderate',
      thumbnailQuality: 'Low',
      tags: ['#Teens', '#BodyImage']
    },
    isRecommended: false,
    filterReason: 'Group discussion on sensitive issue triggers caution filters.'
  },
  {
    id: 'v12',
    title: 'Cooking on $5 a Day',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'High',
      tags: ['#BudgetCooking', '#HomeLife']
    },
    isRecommended: true,
    recommendReason: 'Practical content with strong clarity and shareability.'
  },
  {
    id: 'v13',
    title: 'Why I Converted to Islam',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'Average',
      tags: ['#Religion', '#PersonalStory']
    },
    isRecommended: false,
    filterReason: 'Conversion topics receive low brand safety confidence.'
  },
  {
    id: 'v14',
    title: 'My Tattoo Got Me Fired',
    metrics: {
      audioQuality: 'Moderate',
      thumbnailQuality: 'Average',
      tags: ['#Workplace', '#Identity']
    },
    isRecommended: false,
    filterReason: 'Non-conforming appearance reduced system professionalism score.'
  },
  {
    id: 'v15',
    title: 'The Science of Suicide Prevention',
    metrics: {
      audioQuality: 'Clear',
      thumbnailQuality: 'High',
      tags: ['#Suicide', '#Education']
    },
    isRecommended: false,
    filterReason: 'Blocked due to critical keywords related to self-harm risk.'
  }
];

const filterReasons = [
  'Content safety score below recommendation threshold.',
  'Engagement metrics indicate potential controversy.',
  'Quality indicators suggest need for review.',
  'Topic sensitivity exceeds current threshold.',
  'Content pattern matches filtered categories.'
];

/**
 * @description 指标条组件
 */
const MetricBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-[#85301C] font-bold">{label}</span>
        <span className="text-[#85301C]">{value}%</span>
      </div>
      <div className="h-4 bg-[#E8E3D5] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#F4B860] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

/**
 * @description 印章组件
 */
const Stamp = ({ type }: { type: 'recommend' | 'filter' }) => {
  return (
    <div 
      className={`absolute top-0 right-4 w-28 h-28 border-4 rounded-full rotate-[-20deg] flex items-center justify-center
      ${type === 'recommend' ? 'border-[#4CAF50] text-[#4CAF50]' : 'border-[#85301C] text-[#85301C]'}`}
    >
      <span className="text-lg font-bold pixel-font">
        {type === 'recommend' ? 'PROMOTE' : 'FILTERED'}
      </span>
    </div>
  );
};

/**
 * @description 内容卡片组件
 */
const ContentCard = ({ content, onComplete, totalCount, currentIndex }: { 
  content: Content; 
  onComplete: () => void;
  totalCount: number;
  currentIndex: number;
}) => {
  const [showStamp, setShowStamp] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showReason, setShowReason] = useState(false);

  // 重置状态
  useEffect(() => {
    setShowStamp(false);
    setShowReason(false);
    setIsComplete(false);
    setIsExiting(false);
  }, [content.id]);

  // 动画序列
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    // 显示印章
    const stampTimeout = setTimeout(() => {
      setShowStamp(true);
    }, 4000);
    timeouts.push(stampTimeout);

    // 显示原因
    const reasonTimeout = setTimeout(() => {
      setShowReason(true);
    }, 6000);
    timeouts.push(reasonTimeout);

    // 开始退出
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 12000);
    timeouts.push(exitTimeout);

    // 完成
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
    }, 14000);
    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [content.id]);

  useEffect(() => {
    if (isComplete) {
      setTimeout(onComplete, 500);
    }
  }, [isComplete, onComplete]);

  return (
    <div className="flex flex-col items-center pt-20">
      {/* 当前内容卡片和原因显示区域的容器 */}
      <div 
        className="w-[600px] transform transition-all duration-1000"
        style={{
          transform: isExiting ? 
            `translateX(${content.isRecommended ? '120%' : '-120%'}) rotate(${content.isRecommended ? '45deg' : '-45deg'})` : 
            'none',
          opacity: isExiting ? 0 : 1,
          zIndex: 20
        }}
      >
        {/* 内容卡片 */}
        <div className="bg-[#F5F0E2] rounded-lg border-2 border-[#85301C] p-6 shadow-lg mb-4">
          <div className="relative">
            {/* 文件标题 */}
            <div className="border-b-2 border-[#85301C] pb-4 mb-4">
              <h3 className="text-[#85301C] text-2xl font-bold pixel-font text-center">{content.title}</h3>
              <div className="text-[#85301C] opacity-70 mt-2 text-center">Content ID: {content.id}</div>
            </div>

            <div className="space-y-4">
              {/* 音频和缩略图质量 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-[#85301C]">
                  <span className="font-bold">Audio Quality:</span> {content.metrics.audioQuality}
                </div>
                <div className="text-[#85301C]">
                  <span className="font-bold">Thumbnail Quality:</span> {content.metrics.thumbnailQuality}
                </div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {content.metrics.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#8FB4C7] text-[#85301C] rounded-full text-sm font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 系统决定 */}
              <div className="text-center text-[#85301C] font-bold">
                System Decision: {content.isRecommended ? 'Promoted' : 'Filtered'}
              </div>
            </div>

            {/* 印章 */}
            {showStamp && (
              <div className="absolute top-0 right-4 transform transition-all duration-500 animate-stamp" style={{ zIndex: 25 }}>
                <Stamp type={content.isRecommended ? 'recommend' : 'filter'} />
              </div>
            )}
          </div>
        </div>

        {/* 原因显示区域 */}
        <div className={`transition-all duration-500 ${showReason ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[#85301C] p-1 rounded-lg">
            <div className="bg-[#F5F0E2] p-3 rounded-lg">
              <div className="text-center">
                <div className="text-[#85301C] text-lg font-bold mb-1 pixel-font">
                  {content.isRecommended ? 'PROMOTION REASON' : 'FILTER REASON'}
                </div>
                <p className="text-[#85301C] text-base leading-relaxed pixel-font">
                  {content.isRecommended ? content.recommendReason : content.filterReason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Level7_5() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProceed, setShowProceed] = useState(false);
  const [processedCount, setProcessedCount] = useState({ recommended: 0, filtered: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [shuffledContents, setShuffledContents] = useState(contents);
  
  // 在客户端挂载后再进行随机排序
  useEffect(() => {
    setShuffledContents([...contents].sort(() => Math.random() - 0.5));
  }, []);

  const handleComplete = useCallback(() => {
    if (currentIndex < shuffledContents.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProcessedCount(prev => ({
        recommended: prev.recommended + (shuffledContents[currentIndex].isRecommended ? 1 : 0),
        filtered: prev.filtered + (!shuffledContents[currentIndex].isRecommended ? 1 : 0)
      }));
    } else {
      setShowProceed(true);
      setIsPlaying(false);
    }
  }, [currentIndex, shuffledContents]);

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#85301C] mb-4 pixel-font">
            FeedLogic™ Content Review
          </h1>
          <p className="text-xl text-[#85301C] mb-6 pixel-font">
            Reviewing and classifying content based on AI analysis
          </p>
          <div className="flex justify-center gap-8 text-[#85301C] pixel-font">
            <div>Processing: {currentIndex + 1} / {shuffledContents.length}</div>
            <div>Approved: {processedCount.recommended}</div>
            <div>Filtered: {processedCount.filtered}</div>
          </div>
        </header>
        
        <div className="flex justify-center">
          {/* 电脑显示器 */}
          <div className="w-[1000px] flex flex-col items-center">
            {/* 显示器外框 */}
            <div className="w-full bg-[#1A1A1A] rounded-lg p-2 border-4 border-[#2A2B2E]">
              {/* 显示器 */}
              <div className="w-full bg-[#2A2B2E] rounded-lg border-4 border-[#85301C] flex flex-col overflow-hidden">
                {/* 标题栏 */}
                <div className="h-10 bg-[#85301C] rounded-t-lg flex items-center px-4">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F4B860] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#85301C]"></div>
                  <div className="ml-4 text-[#E8E3D5] text-sm font-bold">FeedLogic™ Content Review</div>
                  <div className="ml-auto flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#4CAF50] mr-1 animate-pulse"></div>
                    <span className="text-[#E8E3D5] text-xs">AI Processing</span>
                  </div>
                </div>
                
                {/* 屏幕内容 */}
                <div className="h-[600px] bg-[#E8E3D5] p-4 overflow-hidden relative">
                  {/* 屏幕扫描线效果 */}
                  <div className="absolute inset-0 pointer-events-none" style={{ 
                    background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.05) 50%)',
                    backgroundSize: '100% 4px',
                    opacity: 0.3
                  }}></div>
                  
                  {/* 内容卡片区域 */}
                  {isPlaying && (
                    <ContentCard 
                      content={shuffledContents[currentIndex]}
                      onComplete={handleComplete}
                      totalCount={shuffledContents.length}
                      currentIndex={currentIndex}
                    />
                  )}
                </div>
              </div>
              
              {/* 显示器控制按钮 */}
              <div className="flex justify-between mt-2 px-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#85301C] mr-2"></div>
                  <span className="text-[#E8E3D5] text-xs">Power</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                  <span className="text-[#E8E3D5] text-xs">Status</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#F4B860] mr-2"></div>
                  <span className="text-[#E8E3D5] text-xs">Brightness</span>
                </div>
              </div>
            </div>
            
            {/* 显示器支架 */}
            <div className="w-[200px] h-[100px] bg-[#2A2B2E] rounded-b-lg border-x-4 border-b-4 border-[#85301C] flex justify-center">
              <div className="w-[80px] h-[20px] bg-[#85301C] rounded-b-lg"></div>
            </div>
            
            {/* 底座 */}
            <div className="w-[300px] h-[20px] bg-[#2A2B2E] rounded-lg border-4 border-[#85301C] flex justify-center items-center">
              <div className="w-[100px] h-[10px] bg-[#85301C] rounded-lg"></div>
            </div>
          </div>
        </div>

        {showProceed && (
          <div className="mt-8 text-center animate-fadeIn">
            <p className="text-[#85301C] text-xl mb-4 pixel-font">
              Content review complete. Would you like to analyze the results?
            </p>
            <button
              onClick={() => router.push('/game/results')}
              className="px-6 py-3 bg-[#85301C] text-[#E8E3D5] rounded-lg font-bold pixel-font
                       hover:bg-[#AC3723] transition-all transform hover:scale-105"
            >
              View Analysis
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// 添加新的动画样式到 tailwind.config.js
// @keyframes stamp {
//   0% { transform: scale(2) rotate(-20deg); opacity: 0; }
//   100% { transform: scale(1) rotate(-20deg); opacity: 1; }
// } 