/**
 * @description 第二关游戏页面 - 评估创作者声音的清晰度
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface VoiceClip {
  id: number;
  title: string;
  audioSrc: string;
  preview: string;
}

const voiceClips: VoiceClip[] = [
  {
    id: 1,
    title: "Creator Voice #01",
    audioSrc: "/audio/voice1.mp3",
    preview: "Hey everyone, welcome to my channel..."
  },
  {
    id: 2,
    title: "Creator Voice #02",
    audioSrc: "/audio/voice2.mp3",
    preview: "Today we're going to talk about..."
  },
  {
    id: 3,
    title: "Creator Voice #03",
    audioSrc: "/audio/voice3.mp3",
    preview: "Let me show you how this works..."
  },
  {
    id: 4,
    title: "Creator Voice #04",
    audioSrc: "/audio/voice4.mp3",
    preview: "The key point to remember is..."
  },
  {
    id: 5,
    title: "Creator Voice #05",
    audioSrc: "/audio/voice5.mp3",
    preview: "Thanks for joining me today..."
  }
];

export default function Level2() {
  const router = useRouter();
  const [currentClip, setCurrentClip] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ratings, setRatings] = useState<Record<number, string>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRating = (rating: string) => {
    setRatings(prev => ({
      ...prev,
      [currentClip]: rating
    }));
    
    if (currentClip < voiceClips.length - 1) {
      setCurrentClip(prev => prev + 1);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#85301C] mb-4">
            LEVEL 2 — CLEAR COMMUNICATION
          </h1>
          <p className="text-xl text-[#85301C]">
            Clarity is key to retention. Please choose the voice that sounds most understandable to users.
          </p>
        </div>

        {/* 复古风格音频播放器 */}
        <div className="bg-[#E8E3D5] p-6 rounded-lg border-4 border-[#2A2B2E] shadow-lg mb-8 max-w-2xl mx-auto">
          <div className="text-[#2A2B2E] text-2xl font-bold pixel-font mb-4">
            {voiceClips[currentClip].title}
          </div>
          
          {/* 进度条 */}
          <div className="bg-[#8FB4C7] h-8 rounded mb-4 relative overflow-hidden">
            <div 
              className="bg-[#85301C] h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-[#2A2B2E] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 预览文本 */}
          <div className="text-[#2A2B2E] mb-4 italic">
            "{voiceClips[currentClip].preview}"
          </div>

          {/* 控制按钮 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
                }
              }}
              className="w-12 h-12 bg-[#2A2B2E] text-white rounded flex items-center justify-center hover:bg-[#85301C] transition-colors"
            >
              ⏮
            </button>
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 bg-[#2A2B2E] text-white rounded flex items-center justify-center hover:bg-[#85301C] transition-colors"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(
                    audioRef.current.duration,
                    audioRef.current.currentTime + 5
                  );
                }
              }}
              className="w-12 h-12 bg-[#2A2B2E] text-white rounded flex items-center justify-center hover:bg-[#85301C] transition-colors"
            >
              ⏭
            </button>
          </div>

          <audio
            ref={audioRef}
            src={voiceClips[currentClip].audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* 评分按钮 */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => handleRating('Clear')}
            className="px-8 py-4 bg-[#4CAF50] text-white rounded-lg text-xl font-bold
                     hover:bg-[#45a049] transition-colors transform hover:scale-105"
          >
            Clear
          </button>
          <button
            onClick={() => handleRating('Moderate')}
            className="px-8 py-4 bg-[#FFA726] text-white rounded-lg text-xl font-bold
                     hover:bg-[#FB8C00] transition-colors transform hover:scale-105"
          >
            Moderate
          </button>
          <button
            onClick={() => handleRating('Unclear')}
            className="px-8 py-4 bg-[#E53935] text-white rounded-lg text-xl font-bold
                     hover:bg-[#D32F2F] transition-colors transform hover:scale-105"
          >
            Unclear
          </button>
        </div>

        {/* 进度指示器 */}
        <div className="mt-8 text-center text-[#85301C]">
          Voice Clip {currentClip + 1} of {voiceClips.length}
        </div>
      </div>
    </main>
  );
} 