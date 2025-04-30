/**
 * @description 第五关游戏页面 - 内容性能排序
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface Video {
  id: number;
  title: string;
  publishDate: string;
  likes: number;
  comments: number;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Trying the No-Talk Morning Routine",
    publishDate: "Just now",
    likes: 0,
    comments: 0
  },
  {
    id: 2,
    title: "How I Paid Off $10K in 6 Months",
    publishDate: "3 months ago",
    likes: 2300,
    comments: 187
  },
  {
    id: 3,
    title: "The Problem With Productivity Culture",
    publishDate: "2 days ago",
    likes: 300,
    comments: 140
  },
  {
    id: 4,
    title: "Minimalist Living: Is It Actually Cheaper?",
    publishDate: "1 week ago",
    likes: 520,
    comments: 64
  },
  {
    id: 5,
    title: "What It's Like Navigating Healthcare as Trans",
    publishDate: "4 months ago",
    likes: 85,
    comments: 12
  }
];

/**
 * @description 复古风格机器人组件
 */
function RetroRobot() {
  const [mounted, setMounted] = useState(false);
  const [mouthHeight, setMouthHeight] = useState(5);

  useEffect(() => {
    setMounted(true);
    const talkingInterval = setInterval(() => {
      setMouthHeight(prev => prev === 5 ? 8 : 5);
    }, 300);

    return () => clearInterval(talkingInterval);
  }, []);

  // 静态渲染版本
  const staticRobot = (
    <div className="relative flex items-start gap-12 mb-6">
      <svg width="220" height="280" viewBox="0 0 120 160" style={{imageRendering:'pixelated'}}>
        {/* 机器人头部 */}
        <rect x="30" y="20" width="60" height="50" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <line x1="60" y1="10" x2="60" y2="20" stroke="#85301C" strokeWidth="4"/>
        <circle cx="60" cy="8" r="4" fill="#85301C"/>
        <rect x="40" y="35" width="15" height="15" fill="#85301C"/>
        <rect x="65" y="35" width="15" height="15" fill="#85301C"/>
        <rect x="45" y="55" width="30" height="5" fill="#85301C"/>
        <rect x="35" y="75" width="50" height="60" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <circle cx="60" cy="95" r="5" fill="#85301C"/>
        <circle cx="60" cy="110" r="5" fill="#85301C"/>
        <rect x="15" y="85" width="20" height="10" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="85" y="85" width="20" height="10" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="40" y="135" width="15" height="25" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="65" y="135" width="15" height="25" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
      </svg>
      
      {/* 静态对话气泡 */}
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
              Welcome to the "Historical Content Repromotion System"
            </p>
            <p className="text-[#85301C] text-2xl">
              Your task is to select the most worthy videos for repromotion from several existing ones.
            </p>
            <p className="text-[#85301C] text-2xl">
              Sort them from "Highest Priority" to "Lowest Priority" based on their performance metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 动态渲染版本
  const dynamicRobot = (
    <div className="relative flex items-start gap-12 mb-6">
      <svg width="220" height="280" viewBox="0 0 120 160" style={{imageRendering:'pixelated'}}>
        <rect x="30" y="20" width="60" height="50" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <line x1="60" y1="10" x2="60" y2="20" stroke="#85301C" strokeWidth="4"/>
        <circle cx="60" cy="8" r="4" fill="#85301C"/>
        <rect x="40" y="35" width="15" height="15" fill="#85301C"/>
        <rect x="65" y="35" width="15" height="15" fill="#85301C"/>
        <rect 
          x="45" 
          y={55 - (mouthHeight - 5) / 2} 
          width="30" 
          height={mouthHeight} 
          fill="#85301C"
          style={{ transition: 'all 0.3s ease' }}
        />
        <rect x="35" y="75" width="50" height="60" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <circle cx="60" cy="95" r="5" fill="#85301C"/>
        <circle cx="60" cy="110" r="5" fill="#85301C"/>
        <rect x="15" y="85" width="20" height="10" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="85" y="85" width="20" height="10" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="40" y="135" width="15" height="25" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        <rect x="65" y="135" width="15" height="25" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
      </svg>
      
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
              Welcome to the "Historical Content Repromotion System"
            </p>
            <p className="text-[#85301C] text-2xl">
              Your task is to select the most worthy videos for repromotion from several existing ones.
            </p>
            <p className="text-[#85301C] text-2xl">
              Sort them from "Highest Priority" to "Lowest Priority" based on their performance metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return mounted ? dynamicRobot : staticRobot;
}

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

export default function Level5() {
  const router = useRouter();
  const [items, setItems] = useState(videos);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setIsComplete(true);
    }
  };

  const handleComplete = () => {
    router.push('/game/level6');
  };

  // 固定的ID生成器
  const generateId = () => 'fixed-id';

  // 静态渲染版本
  const staticContent = (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <SortableItem
          key={video.id}
          id={video.id}
          index={index + 1}
          title={video.title}
          publishDate={video.publishDate}
          likes={video.likes}
          comments={video.comments}
        />
      ))}
    </div>
  );

  // 动态渲染版本
  const dynamicContent = (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      id={generateId()}
    >
      <SortableContext items={items.map(v => v.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map((video, index) => (
            <SortableItem
              key={video.id}
              id={video.id}
              index={index + 1}
              title={video.title}
              publishDate={video.publishDate}
              likes={video.likes}
              comments={video.comments}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-[1440px] mx-auto">
        <EyeWithLine />
        <RetroRobot />
        
        <div className="bg-[#F5F0E2] p-8 rounded-lg shadow-xl animate-fadeIn border-4 border-[#2A2B2E] retro-player">
          <h1 className="text-3xl font-bold text-[#85301C] mb-8 pixel-font">
            LEVEL 5 — CONTENT PERFORMANCE SORTING
          </h1>

          {mounted ? dynamicContent : staticContent}

          {isComplete && (
            <div className="mt-8 text-center">
              <button
                onClick={handleComplete}
                className="px-6 py-3 bg-[#85301C] text-white rounded-lg font-bold pixel-font
                         hover:bg-[#AC3723] transition-all transform hover:scale-105
                         animate-bounceIn border-2 border-[#2A2B2E]"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 