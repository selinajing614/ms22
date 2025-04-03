/**
 * @description 第一关游戏页面 - 评估创作者可信度
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Creator {
  id: string;
  image: string;
}

const creators: Creator[] = Array.from({ length: 12 }, (_, i) => ({
  id: `creator-${i + 1}`,
  image: `/creator/${i + 1}.png`
}));

function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <>
      <div
        draggable
        className="w-28 h-28 relative rounded-lg overflow-hidden shadow-lg 
                   hover:shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing
                   hover:scale-125 hover:z-10 active:scale-95"
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', creator.id);
          e.currentTarget.classList.add('opacity-50');
        }}
        onDragEnd={(e) => {
          e.currentTarget.classList.remove('opacity-50');
        }}
        onClick={() => setIsEnlarged(true)}
      >
        <Image
          src={creator.image}
          alt={`Creator ${index + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* 放大查看模态框 */}
      {isEnlarged && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="relative w-[80vh] h-[80vh] max-w-3xl max-h-3xl">
            <Image
              src={creator.image}
              alt={`Creator ${index + 1}`}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function Level1() {
  const router = useRouter();
  const [unassignedCreators, setUnassignedCreators] = useState<Creator[]>(creators);
  const [prioritizedCreators, setPrioritizedCreators] = useState<Creator[]>([]);
  const [holdCreators, setHoldCreators] = useState<Creator[]>([]);
  const [progress, setProgress] = useState(0);
  const [lastDropped, setLastDropped] = useState<string | null>(null);

  useEffect(() => {
    // 计算进度
    const totalAssigned = prioritizedCreators.length + holdCreators.length;
    const newProgress = Math.round((totalAssigned / creators.length) * 100);
    setProgress(newProgress);
  }, [prioritizedCreators, holdCreators]);

  const handleDrop = (e: React.DragEvent, targetArea: 'prioritize' | 'hold') => {
    e.preventDefault();
    const creatorId = e.dataTransfer.getData('text/plain');
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    // 从源数组中移除
    setUnassignedCreators(prev => prev.filter(c => c.id !== creatorId));
    setPrioritizedCreators(prev => prev.filter(c => c.id !== creatorId));
    setHoldCreators(prev => prev.filter(c => c.id !== creatorId));

    // 添加到目标数组
    if (targetArea === 'prioritize') {
      setPrioritizedCreators(prev => [...prev, creator]);
    } else {
      setHoldCreators(prev => [...prev, creator]);
    }

    // 设置最后放置的区域以触发动画
    setLastDropped(targetArea);
    setTimeout(() => setLastDropped(null), 500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.add('bg-opacity-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.remove('bg-opacity-50');
  };

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#85301C] mb-4">
            LEVEL 1 — TRUSTWORTHY CREATOR
          </h1>
          <p className="text-xl text-[#85301C]">
            We&apos;re calibrating our trust-detection module. Do these creators seems trustworthy?
          </p>
        </div>

        {/* 未分类的创作者区域 */}
        <div className="mb-8">
          <div className="min-h-[180px] bg-white/30 rounded-lg p-6 flex flex-wrap gap-6">
            {unassignedCreators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index} />
            ))}
          </div>
        </div>

        {/* 两个目标区域 */}
        <div className="grid grid-cols-2 gap-8">
          {/* Prioritize Exposure 区域 */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#85301C] mb-4 text-center">
              Prioritize Exposure
            </h2>
            <div
              onDrop={(e) => handleDrop(e, 'prioritize')}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`min-h-[200px] bg-[#D6996D]/30 rounded-lg p-6 flex flex-wrap gap-6
                         transition-all duration-300
                         ${lastDropped === 'prioritize' ? 'scale-105 bg-[#D6996D]/50' : ''}`}
            >
              {prioritizedCreators.map((creator, index) => (
                <CreatorCard key={creator.id} creator={creator} index={index} />
              ))}
            </div>
          </div>

          {/* Hold for Further Evaluation 区域 */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#85301C] mb-4 text-center">
              Hold for Further Evaluation
            </h2>
            <div
              onDrop={(e) => handleDrop(e, 'hold')}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`min-h-[200px] bg-[#AC3723]/20 rounded-lg p-6 flex flex-wrap gap-6
                         transition-all duration-300
                         ${lastDropped === 'hold' ? 'scale-105 bg-[#AC3723]/40' : ''}`}
            >
              {holdCreators.map((creator, index) => (
                <CreatorCard key={creator.id} creator={creator} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mt-8">
          <div className="w-full bg-white/30 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-[#85301C] h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.5s ease-out'
              }}
            />
          </div>
          <div className="flex justify-between text-[#85301C] font-bold">
            <span>{progress}% Complete</span>
            {progress === 100 && (
              <button
                onClick={() => router.push('/game/level2')}
                className="px-6 py-2 bg-[#85301C] text-white rounded-lg
                          hover:bg-[#AC3723] transition-colors duration-300
                          transform hover:scale-105 active:scale-95"
              >
                Next Level
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 