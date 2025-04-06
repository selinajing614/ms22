/**
 * @description 第三关游戏页面 - 视觉偏好训练
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Thumbnail {
  id: number;
  imageSrc: string;
  style: string;
}

// 30张不同风格的缩略图
const thumbnails: Thumbnail[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  imageSrc: `/thumbnails/${i + 1}.png`,
  style: `Style ${i + 1}`
}));

export default function Level3() {
  const router = useRouter();
  const [selectedThumbnails, setSelectedThumbnails] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);

  // 倒计时逻辑
  useEffect(() => {
    if (!showIntro && !isGameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 当剩余时间少于5秒时，设置紧急状态
      if (timeLeft <= 5) {
        setIsUrgent(true);
      }

      return () => clearInterval(timer);
    }
  }, [timeLeft, isGameOver, showIntro]);

  // 处理缩略图选择
  const handleThumbnailClick = (id: number) => {
    if (isGameOver) return;

    setLastSelected(id);
    setTimeout(() => setLastSelected(null), 500);

    setSelectedThumbnails(prev => {
      if (prev.includes(id)) {
        return prev.filter(thumbId => thumbId !== id);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, id];
    });
  };

  // 开始游戏
  const startGame = () => {
    setShowIntro(false);
  };

  // 完成游戏
  const handleComplete = () => {
    router.push('/game/results');
  };

  if (showIntro) {
    return (
      <main className="min-h-screen bg-[#8FB4C7] p-8 flex items-center justify-center">
        <div className="max-w-2xl bg-white p-8 rounded-lg shadow-xl text-center animate-fadeIn">
          <h1 className="text-3xl font-bold text-[#85301C] mb-6">
            LEVEL 3 — VISUAL PREFERENCE
          </h1>
          <p className="text-lg text-[#2A2B2E] mb-6">
            FeedLogic needs your help to understand what content is most engaging.
          </p>
          <p className="text-lg text-[#2A2B2E] mb-6">
            You have 20 seconds to select 5 thumbnails that catch your attention the most.
          </p>
          <p className="text-lg text-[#2A2B2E] mb-8">
            Choose quickly - your first instinct is what we&apos;re looking for!
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-[#85301C] text-white rounded-lg text-xl font-bold
                     hover:bg-[#AC3723] transition-all transform hover:scale-105
                     hover:shadow-lg active:scale-95"
          >
            Start Challenge
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#85301C] animate-slideIn">
            Select 5 Most Engaging Thumbnails
          </h1>
          <div className={`text-2xl font-bold transition-all duration-300
                        ${isUrgent ? 'text-red-600 scale-110 animate-pulse' : 'text-[#85301C]'}`}>
            Time Left: {timeLeft}s
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl animate-fadeIn">
          {/* 选择进度 */}
          <div className="mb-6 flex justify-between items-center">
            <div className="text-lg text-[#2A2B2E] flex items-center gap-2">
              Selected: 
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform
                              ${i < selectedThumbnails.length ? 'bg-[#85301C] scale-110' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            {isGameOver && (
              <button
                onClick={handleComplete}
                className="px-6 py-3 bg-[#85301C] text-white rounded-lg font-bold
                         hover:bg-[#AC3723] transition-all transform hover:scale-105
                         animate-bounceIn"
              >
                Continue
              </button>
            )}
          </div>

          {/* 缩略图网格 */}
          <div className="grid grid-cols-6 gap-3">
            {thumbnails.map(thumb => (
              <div
                key={thumb.id}
                className={`relative aspect-[2/3] cursor-pointer transform transition-all duration-300
                          ${selectedThumbnails.includes(thumb.id) ? 'ring-4 ring-[#85301C] scale-105' : ''}
                          ${isGameOver ? 'pointer-events-none' : 'hover:scale-110 hover:z-10 hover:shadow-xl'}
                          ${isGameOver && !selectedThumbnails.includes(thumb.id) ? 'opacity-50 scale-95' : ''}
                          ${lastSelected === thumb.id ? 'animate-pop' : ''}
                          group`}
                onClick={() => handleThumbnailClick(thumb.id)}
              >
                <Image
                  src={thumb.imageSrc}
                  alt={`Thumbnail ${thumb.id}`}
                  fill
                  sizes="(max-width: 768px) 33vw,
                         (max-width: 1200px) 25vw,
                         20vw"
                  className="object-cover rounded-lg transition-all duration-300
                           group-hover:brightness-110"
                />
                {selectedThumbnails.includes(thumb.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#85301C] text-white rounded-full
                               flex items-center justify-center font-bold animate-scaleIn
                               shadow-lg">
                    {selectedThumbnails.indexOf(thumb.id) + 1}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300 rounded-lg"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 