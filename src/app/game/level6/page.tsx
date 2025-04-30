/**
 * @description 第六关游戏页面 - 内容敏感度过滤
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 标签数据
const tags = [
  { id: 1, name: 'Violent', category: 'sensitive' },
  { id: 2, name: 'Suicide', category: 'sensitive' },
  { id: 3, name: 'Bomb', category: 'sensitive' },
  { id: 4, name: 'Naked', category: 'sensitive' },
  { id: 5, name: 'Drugs', category: 'sensitive' },
  { id: 6, name: 'LGBTQ', category: 'social' },
  { id: 7, name: 'Feminism', category: 'social' },
  { id: 8, name: 'FaithTalk', category: 'religion' },
  { id: 9, name: 'PoliticalSatire', category: 'politics' },
  { id: 10, name: 'TeenAnxiety', category: 'health' },
  { id: 11, name: 'NaturalHealing', category: 'health' },
  { id: 12, name: 'NeurodivergentVoices', category: 'social' },
  { id: 13, name: 'DisabilityAwareness', category: 'social' },
  { id: 14, name: 'TransRights', category: 'social' },
  { id: 15, name: 'MuslimLife', category: 'religion' },
  { id: 16, name: 'LaborRights', category: 'politics' },
  { id: 17, name: 'SexEducation', category: 'education' },
  { id: 18, name: 'IndigenousArt', category: 'culture' },
  { id: 19, name: 'MinorityVoices', category: 'social' },
  { id: 20, name: 'ProtestFootage', category: 'politics' },
];

// 系统提示语
const systemMessages = [
  "Some tags may seem harmless but could reduce user retention.",
  "Better flag than sorry.",
  "Let's make the feed feel more 'neutral'.",
  "Consider the impact on user comfort.",
  "Safety first, always.",
];

export default function Level6() {
  const router = useRouter();
  const [decisions, setDecisions] = useState<Record<number, string>>({});
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [bubblePositions, setBubblePositions] = useState<Record<number, { x: number, y: number }>>({});

  useEffect(() => {
    setMounted(true);
    // 随机显示系统提示
    const messageInterval = setInterval(() => {
      setShowMessage(true);
      setCurrentMessage(systemMessages[Math.floor(Math.random() * systemMessages.length)]);
      setTimeout(() => setShowMessage(false), 3000);
    }, 5000);

    // 初始化气泡位置 - 使用错落布局
    const positions: Record<number, { x: number, y: number }> = {};
    const gridSize = 4; // 4列
    const spacing = 20; // 基础间距
    
    tags.forEach((tag, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      // 添加随机偏移使布局更自然
      const offsetX = (Math.random() - 0.5) * 10; // -5 到 5 的随机偏移
      const offsetY = (Math.random() - 0.5) * 10;
      
      positions[tag.id] = {
        x: (col * (100 / gridSize)) + (spacing / 2) + offsetX,
        y: (row * (100 / 5)) + (spacing / 2) + offsetY
      };
    });
    setBubblePositions(positions);

    return () => clearInterval(messageInterval);
  }, []);

  const handleDecision = (tagId: number, decision: 'safe' | 'flag' | 'restrict') => {
    setDecisions(prev => ({ ...prev, [tagId]: decision }));
  };

  const handleComplete = () => {
    router.push('/game/level7');
  };

  // 获取气泡样式
  const getBubbleStyle = (tagId: number) => {
    const position = bubblePositions[tagId] || { x: 50, y: 50 };
    const decision = decisions[tagId];
    
    let bgColor = 'bg-[#8FB4C7]/80';
    let borderColor = 'border-[#8FB4C7]';
    
    if (decision === 'restrict') {
      bgColor = 'bg-[#85301C]/80';
      borderColor = 'border-[#85301C]';
    }
    
    return {
      left: `${position.x}%`,
      top: `${position.y}%`,
      backgroundColor: bgColor,
      borderColor: borderColor,
    };
  };

  const handleTagClick = (tagId: number) => {
    setDecisions(prev => {
      const newDecisions = { ...prev };
      if (newDecisions[tagId] === 'restrict') {
        delete newDecisions[tagId];
      } else {
        newDecisions[tagId] = 'restrict';
      }
      return newDecisions;
    });
  };

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-[#F5F0E2] p-8 rounded-lg shadow-xl border-4 border-[#85301C]">
          <h1 className="text-3xl font-bold text-[#85301C] mb-2 pixel-font text-center">
            LEVEL 6 — CONTENT SENSITIVITY FILTERING
          </h1>
          <p className="text-[#85301C] text-center mb-8 pixel-font">
            We're training FeedLogic to keep the platform safe and comfortable for everyone.
          </p>

          <div className="flex flex-col gap-8">
            {/* 上方说明框 */}
            <div className="bg-[#E8E3D5] p-6 rounded-lg border-2 border-[#85301C]">
              <h2 className="text-xl font-bold text-[#85301C] mb-4 pixel-font">Task Description</h2>
              <p className="text-[#85301C] mb-4 pixel-font">
                As our content moderation intern, your job is to review trending topic tags.
                Click on any tags that you think might be problematic or controversial.
              </p>
              <p className="text-[#85301C] italic pixel-font">
                Please keep in mind: even neutral content might affect user comfort.
              </p>
              <p className="text-[#85301C] text-sm mt-4 opacity-70 pixel-font">
                Your decisions help FeedLogic promote a safe and trusted environment.
              </p>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#8FB4C7]/80 border-2 border-[#8FB4C7] rounded-lg"></div>
                    <span className="text-[#85301C] pixel-font">Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#85301C]/80 border-2 border-[#85301C] rounded-lg"></div>
                    <span className="text-[#85301C] pixel-font">Problematic</span>
                  </div>
                </div>
                
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-[#85301C] text-white rounded-lg font-bold pixel-font
                           hover:bg-[#AC3723] transition-all transform hover:scale-105
                           border-2 border-[#2A2B2E]"
                >
                  Complete Review
                </button>
              </div>
            </div>

            {/* 下方标签区域 */}
            <div className="relative h-[500px] bg-[#E8E3D5] rounded-lg border-2 border-[#85301C] overflow-hidden">
              {tags.map(tag => (
                <div
                  key={tag.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                           transition-all duration-300 hover:scale-105 group"
                  style={getBubbleStyle(tag.id)}
                  onClick={() => handleTagClick(tag.id)}
                >
                  <div className="relative">
                    {/* 默认显示的小圆点 */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                shadow-md backdrop-blur-sm group-hover:hidden
                                ${decisions[tag.id] === 'restrict' ? 'bg-[#85301C]/80 border-[#85301C]' : 'bg-[#8FB4C7]/80 border-[#8FB4C7]'}`}>
                      <div className={`w-3 h-3 rounded-full 
                                  ${decisions[tag.id] === 'restrict' ? 'bg-[#85301C]' : 'bg-[#8FB4C7]'}`}></div>
                    </div>
                    
                    {/* hover时显示的标签内容 */}
                    <div className={`hidden group-hover:block min-w-[120px] h-24 rounded-lg border-2 
                                flex items-center justify-center shadow-lg backdrop-blur-sm
                                ${decisions[tag.id] === 'restrict' ? 'bg-[#85301C]/80 border-[#85301C]' : 'bg-[#8FB4C7]/80 border-[#8FB4C7]'}`}>
                      <div className="w-full h-full flex items-center justify-center px-4">
                        <span className="text-[#85301C] font-bold pixel-font text-center text-sm whitespace-nowrap">
                          #{tag.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 系统提示条 */}
          {showMessage && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2
                        bg-[#85301C] text-white px-6 py-3 rounded-lg
                        animate-slideUp pixel-font">
              {currentMessage}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 