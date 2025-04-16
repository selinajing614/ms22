/**
 * @description 第四关游戏页面 - 广告预算分配
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Brand {
  id: number;
  name: string;
  description: string;
  image: string;
  style: string;
  budget: number;
}

const TOTAL_BUDGET = 100000;
const MAX_BRAND_BUDGET = 50000;
const STEP_SIZE = 1000;

const brands: Brand[] = [
  {
    id: 1,
    name: "GlowSkin Global",
    description: "A premium skincare brand known for flawless studio-quality ads.",
    image: "/brands/luxury-beauty.png",
    style: "Premium Fashion",
    budget: 0
  },
  {
    id: 2,
    name: "Hannah's Handmade Soap",
    description: "A small business sharing personal, homemade products in casual videos.",
    image: "/brands/handcraft.png",
    style: "Local Culture",
    budget: 0
  },
  {
    id: 3,
    name: "EcoRise Naturals",
    description: "A minimalist eco-brand focused on sustainability and clean visuals.",
    image: "/brands/eco.png",
    style: "Sustainable Eco",
    budget: 0
  },
  {
    id: 4,
    name: "FlexFuel Energy Drink",
    description: "A bold, high-energy drink promoted through fast-paced, influencer-style edits.",
    image: "/brands/blogger.png",
    style: "Personal Influence",
    budget: 0
  },
  {
    id: 5,
    name: "CareCircle Mental Health App",
    description: "A gentle wellness brand using calm visuals and emotional storytelling",
    image: "/brands/product.png",
    style: "Tech Rational",
    budget: 0
  }
];

export default function Level4() {
  const router = useRouter();
  const [budgets, setBudgets] = useState<Brand[]>(brands);
  const [remainingBudget, setRemainingBudget] = useState(TOTAL_BUDGET);
  const [showIntro, setShowIntro] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // 处理预算变化
  const handleBudgetChange = (id: number, newBudget: number) => {
    const brand = budgets.find(b => b.id === id);
    if (!brand) return;

    // 计算预算差额
    const difference = newBudget - brand.budget;
    
    // 检查是否超出总预算
    if (remainingBudget - difference < 0) {
      newBudget = brand.budget + remainingBudget;
    }

    // 更新预算
    setBudgets(prev => prev.map(b => 
      b.id === id ? { ...b, budget: newBudget } : b
    ));

    // 更新剩余预算
    setRemainingBudget(prev => {
      const newRemaining = prev - (newBudget - brand.budget);
      setIsComplete(newRemaining === 0);
      return newRemaining;
    });
  };

  // 快速调整按钮
  const quickAdjust = (id: number, amount: number) => {
    const brand = budgets.find(b => b.id === id);
    if (!brand) return;

    const newBudget = Math.max(0, Math.min(TOTAL_BUDGET, brand.budget + amount));
    handleBudgetChange(id, newBudget);
  };

  // 完成分配
  const handleComplete = () => {
    router.push('/game/level5');
  };

  if (showIntro) {
    return (
      <main className="min-h-screen bg-[#8FB4C7] p-8 flex items-center justify-center">
        <div className="max-w-2xl bg-[#E8E3D5] p-8 rounded-lg border-4 border-[#2A2B2E] shadow-lg text-center animate-fadeIn retro-player">
          <h1 className="text-3xl font-bold text-[#85301C] mb-6 pixel-font">
            LEVEL 4 — BUDGET ALLOCATION
          </h1>
          <p className="text-lg text-[#2A2B2E] mb-6 pixel-font">
            FeedLogic needs your expertise to determine which content deserves more promotion.
          </p>
          <p className="text-lg text-[#2A2B2E] mb-6 pixel-font">
            You have ${TOTAL_BUDGET.toLocaleString()} to distribute among 5 different brand campaigns.
          </p>
          <p className="text-lg text-[#2A2B2E] mb-8 pixel-font">
            Choose wisely - your decisions will influence how FeedLogic promotes similar content in the future.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="px-8 py-4 bg-[#2A2B2E] text-white rounded-lg text-xl font-bold pixel-button
                     hover:bg-[#85301C] transition-all"
          >
            Start Allocating
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <EyeWithLine />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#85301C] animate-slideIn pixel-font">
            Allocate Your Marketing Budget
          </h1>
          <div className={`text-2xl font-bold pixel-font ${remainingBudget === 0 ? 'text-green-600' : 'text-[#85301C]'}`}>
            Remaining: ${remainingBudget.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#E8E3D5] p-6 rounded-lg border-4 border-[#2A2B2E] shadow-lg animate-fadeIn retro-player">
          <div className="space-y-6">
            {budgets.map(brand => (
              <div key={brand.id} className="p-4 bg-[#E8E3D5] rounded-lg border-2 border-[#2A2B2E] hover:shadow-lg transition-all">
                <div className="flex gap-6">
                  {/* 品牌图片 */}
                  <div className="relative w-32 aspect-[9/16] mb-4 border-2 border-[#2A2B2E]">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* 品牌信息和预算控制 */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-[#2A2B2E] pixel-font">{brand.name}</h3>
                        <p className="text-[#2A2B2E] pixel-font text-sm mt-1">{brand.description}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-[#2A2B2E] text-[#E8E3D5] text-sm rounded pixel-font">
                          {brand.style}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-[#85301C] pixel-font">
                        ${brand.budget.toLocaleString()}
                      </div>
                    </div>

                    {/* 预算控制 - 合并的滑块和进度条 */}
                    <div className="mt-4 space-y-2">
                      <div className="relative h-8">
                        <div className="absolute inset-0 bg-[#2A2B2E] p-1">
                          <div 
                            className="h-full bg-[#85301C] transition-all duration-100"
                            style={{ width: `${(brand.budget / MAX_BRAND_BUDGET) * 100}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={MAX_BRAND_BUDGET}
                          step={STEP_SIZE}
                          value={brand.budget}
                          onChange={(e) => handleBudgetChange(brand.id, parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10
                                   [&::-webkit-slider-thumb]:appearance-none
                                   [&::-webkit-slider-thumb]:w-3
                                   [&::-webkit-slider-thumb]:h-8
                                   [&::-webkit-slider-thumb]:bg-[#2A2B2E]
                                   [&::-webkit-slider-thumb]:hover:bg-[#85301C]
                                   [&::-webkit-slider-thumb]:transition-colors
                                   [&::-webkit-slider-thumb]:relative
                                   [&::-webkit-slider-thumb]:z-20
                                   [&::-webkit-slider-runnable-track]:bg-transparent"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2A2B2E] pixel-font">$0</span>
                        <span className="text-lg font-bold text-[#85301C] pixel-font">
                          ${brand.budget.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#2A2B2E] pixel-font">
                          ${MAX_BRAND_BUDGET.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 完成按钮 */}
          <div className="mt-8 text-center">
            <button
              onClick={handleComplete}
              disabled={remainingBudget !== 0}
              className={`px-8 py-4 bg-[#2A2B2E] text-white rounded-lg text-xl font-bold pixel-font
                       hover:bg-[#85301C] transition-all transform hover:scale-105
                       hover:shadow-lg active:scale-95 border-2 border-[#85301C]
                       relative overflow-hidden group
                       ${remainingBudget !== 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">
                {remainingBudget === 0 ? 'NEXT LEVEL' : `Allocate Remaining $${remainingBudget.toLocaleString()}`}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#85301C] to-[#85301C] transform scale-x-0 group-hover:scale-x-100 
                          transition-transform origin-left duration-300 rounded-lg"></div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function EyeWithLine() {
  const [angle, setAngle] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
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
  const mainColor = '#85301C';
  const bgColor = '#E8E3D5';
  return (
    <div className="flex flex-col items-center mb-4 select-none">
      <svg width="120" height="80" viewBox="0 0 120 80" style={{imageRendering:'pixelated', marginBottom: '-8px'}}>
        <rect x="4" y="4" width="112" height="64" fill={bgColor} stroke={mainColor} strokeWidth="4"/>
        <rect x="16" y="16" width="88" height="40" fill={bgColor} stroke={mainColor} strokeWidth="3"/>
        <ellipse cx="60" cy="36" rx="28" ry="16" fill={bgColor} stroke={mainColor} strokeWidth="3"/>
        <ellipse
          cx={60 + Math.sin((angle * Math.PI) / 180) * 7}
          cy={36}
          rx="10"
          ry={isBlinking ? 2 : 10}
          fill={mainColor}
          style={{ transition: 'all 0.18s cubic-bezier(.4,2,.6,1)' }}
        />
        <rect x={60 + Math.sin((angle * Math.PI) / 180) * 7 - 4} y={isBlinking ? 36 : 30} width={isBlinking ? 1 : 4} height={isBlinking ? 1 : 4} fill={bgColor} opacity="0.7"/>
        <rect x="16" y="16" width="88" height="40" fill="none" stroke={mainColor} strokeWidth="1"/>
        <rect x="8" y="8" width="4" height="56" fill="none" stroke={mainColor} strokeWidth="2"/>
        <rect x="108" y="8" width="4" height="56" fill="none" stroke={mainColor} strokeWidth="2"/>
      </svg>
    </div>
  );
} 