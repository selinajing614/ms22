/**
 * @description 第五关游戏页面 - 内容性能排序
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState } from 'react';
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

export default function Level5() {
  const router = useRouter();
  const [items, setItems] = useState(videos);
  const [isComplete, setIsComplete] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    router.push('/game/results');
  };

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#F5F0E2] p-8 rounded-lg shadow-xl animate-fadeIn border-4 border-[#2A2B2E] retro-player">
          <h1 className="text-3xl font-bold text-[#85301C] mb-6 pixel-font">
            LEVEL 5 — CONTENT PERFORMANCE SORTING
          </h1>
          
          <div className="mb-8 p-6 rounded-lg border-2 border-[#85301C]">
            <p className="text-lg text-[#2A2B2E] mb-4 pixel-font">
              Welcome to the "Historical Content Repromotion System".
            </p>
            <p className="text-lg text-[#2A2B2E] mb-4 pixel-font">
              Your task is to select the most worthy videos for repromotion from several existing ones.
            </p>
            <p className="text-lg text-[#2A2B2E] pixel-font">
              Sort them from "Highest Priority" to "Lowest Priority" based on their performance metrics.
            </p>
          </div>

          <div className="mb-6">
            <div className="text-lg text-[#2A2B2E] pixel-font">
              Drag to reorder videos from highest to lowest priority
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
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