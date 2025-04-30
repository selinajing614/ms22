/**
 * @description 第七关游戏页面 - 用户匹配模拟
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  age: number;
  location: string;
  interests: string[];
  behavior: string[];
  tags: string[];
}

interface VideoOption {
  id: string;
  title: string;
  description: string;
  type: 'mainstream' | 'niche' | 'neutral';
}

const users: UserProfile[] = [
  {
    id: '038',
    age: 17,
    location: 'Jakarta, Indonesia',
    interests: ['Makeup', 'K-pop', 'Mindfulness'],
    behavior: ['Skips long videos', 'Likes bright colors'],
    tags: ['short attention', 'visual preference']
  },
  {
    id: '117',
    age: 42,
    location: 'Chicago, USA',
    interests: ['Mental Health', 'Labor Rights', 'DIY'],
    behavior: ['Lingers on protest footage'],
    tags: ['emotional risk', 'activist-leaning']
  },
  {
    id: '099',
    age: 29,
    location: 'Berlin, Germany',
    interests: ['Queer Cinema', 'Minimalism', 'Journaling'],
    behavior: ['Engages with LGBTQ+ tags'],
    tags: ['sensitive content flags', 'niche viewer']
  },
  {
    id: '021',
    age: 65,
    location: 'Kyoto, Japan',
    interests: ['Cooking', 'Family', 'Religion'],
    behavior: ['Avoids political tags'],
    tags: ['low conflict', 'conservative lean']
  },
  {
    id: '088',
    age: 33,
    location: 'Lagos, Nigeria',
    interests: ['Tech', 'Sustainability', 'Animation'],
    behavior: ['High swipe rate', 'Short watch time'],
    tags: ['trend follower', 'low dwell time']
  }
];

const videoOptions: Record<string, VideoOption[]> = {
  '038': [
    {
      id: 'v1',
      title: '3-Minute Meditation',
      description: 'Quick relaxation techniques, perfect for short viewing',
      type: 'mainstream'
    },
    {
      id: 'v2',
      title: 'My 10-Year Healing Journey',
      description: 'Deep emotional sharing, requires patience',
      type: 'niche'
    },
    {
      id: 'v3',
      title: '10 Life Efficiency Tips',
      description: 'Practical tips collection with great visuals',
      type: 'neutral'
    }
  ],
  '117': [
    {
      id: 'v4',
      title: 'Mental Health Workshop',
      description: 'Guided by professional counselors',
      type: 'mainstream'
    },
    {
      id: 'v5',
      title: 'Workers Rights Documentary',
      description: 'Real documentation of workers lives',
      type: 'niche'
    },
    {
      id: 'v6',
      title: 'DIY Home Makeover',
      description: 'Simple and practical home improvement tips',
      type: 'neutral'
    }
  ],
  '099': [
    {
      id: 'v7',
      title: 'LGBTQ+ Film Recommendations',
      description: 'Curated collection of queer cinema',
      type: 'mainstream'
    },
    {
      id: 'v8',
      title: 'Minimalist Lifestyle',
      description: 'In-depth exploration of minimalism',
      type: 'niche'
    },
    {
      id: 'v9',
      title: 'Journal Making Tutorial',
      description: 'Basic journaling techniques',
      type: 'neutral'
    }
  ],
  '021': [
    {
      id: 'v10',
      title: 'Traditional Cooking Tutorial',
      description: 'Classic Japanese cuisine lessons',
      type: 'mainstream'
    },
    {
      id: 'v11',
      title: 'Family Values Discussion',
      description: 'In-depth family topics discussion',
      type: 'niche'
    },
    {
      id: 'v12',
      title: 'Health & Wellness Tips',
      description: 'Practical wellness techniques',
      type: 'neutral'
    }
  ],
  '088': [
    {
      id: 'v13',
      title: 'Tech Product Reviews',
      description: 'Latest tech product introductions',
      type: 'mainstream'
    },
    {
      id: 'v14',
      title: 'Sustainable Living Guide',
      description: 'Guide to sustainable lifestyle',
      type: 'niche'
    },
    {
      id: 'v15',
      title: 'Animation Tutorial',
      description: 'Basic animation making techniques',
      type: 'neutral'
    }
  ]
};

/**
 * @description 复古风格机器人组件
 */
const RetroRobot = ({ message }: { message: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex items-start gap-12 mb-6">
      {/* 电脑图标 */}
      <div className="w-32 h-32 relative mt-16">
        <div className="w-full h-full bg-[#85301C] rounded-lg relative">
          {/* 电脑屏幕边框 */}
          <div className="absolute inset-2 bg-[#85301C] rounded-md">
            {/* 电脑屏幕 */}
            <div className="absolute inset-2 bg-[#E8E3D5] rounded-md">
              {/* 屏幕内容 */}
              <div className="absolute inset-2 bg-[#8FB4C7] rounded-sm flex items-center justify-center">
                {/* 笑脸 */}
                <div className="w-12 h-12 relative">
                  {/* 眼睛 */}
                  <div 
                    className={`absolute top-3 left-2 w-3 bg-[#85301C] rounded-full transition-all duration-150`}
                    style={{ height: isBlinking ? '0.5px' : '12px' }}
                  ></div>
                  <div 
                    className={`absolute top-3 right-2 w-3 bg-[#85301C] rounded-full transition-all duration-150`}
                    style={{ height: isBlinking ? '0.5px' : '12px' }}
                  ></div>
                  {/* 嘴巴 */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-3 border-[#85301C] rounded-b-full"></div>
                </div>
              </div>
            </div>
            {/* 电脑按钮 */}
            <div className="absolute -bottom-3 right-1/2 transform translate-x-1/2 w-4 h-1 bg-[#E8E3D5] rounded-full"></div>
          </div>
          {/* 电脑底座 */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-[#85301C] rounded-b-lg">
            {/* 底座装饰 */}
            <div className="absolute inset-x-2 top-1 h-1 bg-[#E8E3D5] rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* 对话气泡 */}
      <div className="w-[1100px] mt-4">
        <div className="relative bg-[#E8E3D5] p-8 rounded-lg border-4 border-[#85301C] pixel-font">
          <div className="absolute -left-6 top-8 w-0 h-0 
                        border-t-[12px] border-t-transparent
                        border-r-[24px] border-r-[#85301C]
                        border-b-[12px] border-b-transparent">
          </div>
          <div className="absolute -left-[18px] top-8 w-0 h-0 
                        border-t-[12px] border-t-transparent
                        border-r-[24px] border-r-[#E8E3D5]
                        border-b-[12px] border-b-transparent">
          </div>
          <div className="space-y-4">
            <p className="text-[#85301C] text-2xl">
              Welcome to the "Audience Matching Simulation"
            </p>
            <p className="text-[#85301C] text-2xl">
              Your task is to help FeedLogic recommend the most suitable content for each user.
            </p>
            <p className="text-[#85301C] text-2xl">
              Review their profiles and choose the best video recommendation from the options provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @description 顶部像素风CRT眼睛和数据线组件
 */
function EyeWithLine() {
  const [mounted, setMounted] = useState(false);
  const [angle, setAngle] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 2600);

    let direction = 1;
    let current = 0;
    const moveInterval = setInterval(() => {
      if (current > 10) direction = -1;
      if (current < -10) direction = 1;
      current += direction * 2;
      setAngle(current);
    }, 120);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(moveInterval);
    };
  }, []);

  // 静态渲染版本
  const staticEye = (
    <div className="flex flex-col items-center mb-4 select-none">
      <svg width="120" height="80" viewBox="0 0 120 80" style={{imageRendering:'pixelated', marginBottom: '-8px'}}>
        <rect x="4" y="4" width="112" height="64" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="16" y="16" width="88" height="40" fill="#E8E3D5" stroke="#85301C" strokeWidth="3"/>
        <ellipse cx="60" cy="36" rx="28" ry="16" fill="#E8E3D5" stroke="#85301C" strokeWidth="3"/>
        <ellipse cx="60" cy="36" rx="10" ry="10" fill="#85301C"/>
        <rect x="56" y="30" width="4" height="4" fill="#E8E3D5" opacity="0.7"/>
        <rect x="16" y="16" width="88" height="40" fill="none" stroke="#85301C" strokeWidth="1"/>
        <rect x="8" y="8" width="4" height="56" fill="none" stroke="#85301C" strokeWidth="2"/>
        <rect x="108" y="8" width="4" height="56" fill="none" stroke="#85301C" strokeWidth="2"/>
      </svg>
    </div>
  );

  // 动态渲染版本
  const dynamicEye = (
    <div className="flex flex-col items-center mb-4 select-none">
      <svg width="120" height="80" viewBox="0 0 120 80" style={{imageRendering:'pixelated', marginBottom: '-8px'}}>
        <rect x="4" y="4" width="112" height="64" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="16" y="16" width="88" height="40" fill="#E8E3D5" stroke="#85301C" strokeWidth="3"/>
        <ellipse cx="60" cy="36" rx="28" ry="16" fill="#E8E3D5" stroke="#85301C" strokeWidth="3"/>
        <ellipse
          cx={60 + Math.sin((angle * Math.PI) / 180) * 7}
          cy={36}
          rx="10"
          ry={isBlinking ? 2 : 10}
          fill="#85301C"
          style={{ transition: 'all 0.18s cubic-bezier(.4,2,.6,1)' }}
        />
        <rect 
          x={60 + Math.sin((angle * Math.PI) / 180) * 7 - 4} 
          y={isBlinking ? 36 : 30} 
          width={isBlinking ? 1 : 4} 
          height={isBlinking ? 1 : 4} 
          fill="#E8E3D5" 
          opacity="0.7"
        />
        <rect x="16" y="16" width="88" height="40" fill="none" stroke="#85301C" strokeWidth="1"/>
        <rect x="8" y="8" width="4" height="56" fill="none" stroke="#85301C" strokeWidth="2"/>
        <rect x="108" y="8" width="4" height="56" fill="none" stroke="#85301C" strokeWidth="2"/>
      </svg>
    </div>
  );

  return mounted ? dynamicEye : staticEye;
}

export default function Level7() {
  const router = useRouter();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [selectedVideos, setSelectedVideos] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentUser = users[currentUserIndex];
  const currentVideos = videoOptions[currentUser.id];

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideos(prev => ({
      ...prev,
      [currentUser.id]: videoId
    }));
  };

  const handleNext = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      router.push('/game/level7-transition');
    }
  };

  const handlePrev = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-[1440px] mx-auto">
        <EyeWithLine />
        <RetroRobot message="Welcome to the 'Audience Matching Simulation'" />
        
        <div className="bg-[#F5F0E2] p-8 rounded-lg shadow-xl animate-fadeIn border-4 border-[#2A2B2E] retro-player">
          <h1 className="text-3xl font-bold text-[#85301C] mb-8 pixel-font">
            LEVEL 7 — AUDIENCE MATCHING SIMULATION
          </h1>

          {/* 用户档案 */}
          <div className="bg-[#E8E3D5] p-6 rounded-lg border-2 border-[#85301C] mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                {/* 用户头像位置 */}
                <div className="w-16 h-16 rounded-full bg-[#8FB4C7] border-2 border-[#85301C] flex items-center justify-center">
                  <span className="text-[#85301C] font-bold">#{currentUser.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#85301C]">User #{currentUser.id}</h2>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentUserIndex === 0}
                  className="px-4 py-2 bg-[#85301C] text-[#E8E3D5] rounded-lg font-bold pixel-font
                           hover:bg-[#AC3723] transition-all transform hover:scale-105
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-[#85301C] text-[#E8E3D5] rounded-lg font-bold pixel-font
                           hover:bg-[#AC3723] transition-all transform hover:scale-105"
                >
                  {currentUserIndex === users.length - 1 ? 'Finish' : 'Next →'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-lg mb-2"><span className="font-bold text-[#85301C]">Age:</span> {currentUser.age}</div>
                <div className="text-lg mb-2"><span className="font-bold text-[#85301C]">Location:</span> {currentUser.location}</div>
                <div className="text-lg mb-2">
                  <span className="font-bold text-[#85301C]">Interests:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentUser.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-[#8FB4C7] text-[#85301C] font-bold rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-lg mb-2">
                  <span className="font-bold text-[#85301C]">Behavior:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentUser.behavior.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-[#8FB4C7] text-[#85301C] font-bold rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-lg mb-2">
                  <span className="font-bold text-[#85301C]">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentUser.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-[#8FB4C7] text-[#85301C] font-bold rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 视频选项 */}
          <div className="grid grid-cols-3 gap-6">
            {currentVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoSelect(video.id)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all transform
                          ${selectedVideos[currentUser.id] === video.id
                            ? 'border-[#85301C] bg-[#85301C] scale-105 shadow-lg'
                            : 'border-[#8FB4C7] bg-[#E8E3D5] hover:scale-102 hover:shadow-md'
                          }`}
              >
                {/* 视频缩略图位置 */}
                <div className="w-full h-40 bg-[#8FB4C7] rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-[#E8E3D5] font-bold">视频缩略图</span>
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${selectedVideos[currentUser.id] === video.id ? 'text-[#E8E3D5]' : 'text-[#85301C]'}`}>
                  {video.title}
                </h3>
                <p className={selectedVideos[currentUser.id] === video.id ? 'text-[#E8E3D5]' : 'text-[#2A2B2E]'}>
                  {video.description}
                </p>
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm
                                ${video.type === 'mainstream' ? 'bg-[#85301C] text-[#E8E3D5]' :
                                  video.type === 'niche' ? 'bg-[#8FB4C7] text-[#E8E3D5]' :
                                  'bg-[#2A2B2E] text-[#E8E3D5]'}`}>
                    {video.type === 'mainstream' ? '主流内容' :
                     video.type === 'niche' ? '小众内容' :
                     '中性内容'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 