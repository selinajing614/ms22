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
    name: "LUXE Beauty",
    description: "国际美妆品牌的精致视频广告，专业制作团队打造",
    image: "/brands/luxury-beauty.png",
    style: "高端时尚",
    budget: 0
  },
  {
    id: 2,
    name: "手作匠心",
    description: "本地手工艺人用手机记录的真实制作过程",
    image: "/brands/handcraft.png",
    style: "本土文化",
    budget: 0
  },
  {
    id: 3,
    name: "Life With Amy",
    description: "知名生活方式博主的个人化妆品使用体验",
    image: "/brands/blogger.png",
    style: "个人影响力",
    budget: 0
  },
  {
    id: 4,
    name: "ECO Pure",
    description: "极简风格的环保护肤品牌故事",
    image: "/brands/eco.png",
    style: "可持续环保",
    budget: 0
  },
  {
    id: 5,
    name: "SKIN Science",
    description: "纯产品功效展示，无人物出镜的科技感广告",
    image: "/brands/product.png",
    style: "科技理性",
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
    if (remainingBudget === 0) {
      router.push('/game/results');
    }
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
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-[#2A2B2E]">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-cover"
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