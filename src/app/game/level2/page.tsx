/**
 * @description 第二关游戏页面 - 评估创作者声音的清晰度
 * @returns {JSX.Element} 游戏页面
 */
'use client';

import { useState, useRef, useEffect } from 'react';
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

/**
 * @description 复古录音机组件
 */
function RetroTapeRecorder() {
  const [mounted, setMounted] = useState(false);
  const [speakerScale, setSpeakerScale] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    setMounted(true);
    const talkingInterval = setInterval(() => {
      setSpeakerScale(prev => prev === 1 ? 1.1 : 1);
    }, 300);

    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 5) % 360);
    }, 100);

    return () => {
      clearInterval(talkingInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="relative flex items-start gap-12">
        {/* 静态渲染版本 */}
        <svg width="280" height="240" viewBox="0 0 140 120" style={{imageRendering:'pixelated'}}>
          {/* 录音机主体 */}
          <rect x="10" y="20" width="120" height="90" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
          {/* 上部装饰条 */}
          <rect x="15" y="25" width="110" height="10" fill="#85301C"/>
          {/* 上部按钮 */}
          <rect x="20" y="10" width="10" height="5" fill="#85301C"/>
          <rect x="35" y="10" width="10" height="5" fill="#85301C"/>
          <rect x="95" y="10" width="10" height="5" fill="#85301C"/>
          <rect x="110" y="10" width="10" height="5" fill="#85301C"/>
          {/* 扬声器网格 - 左 */}
          <rect x="20" y="45" width="30" height="50" fill="#2A2B2E" stroke="#85301C" strokeWidth="2"/>
          <circle cx="35" cy="70" r="10" fill="#85301C"/>
          <circle cx="35" cy="70" r="5" fill="#E8E3D5"/>
          <circle cx="35" cy="70" r="2" fill="#85301C"/>
          {/* 磁带窗口 */}
          <rect x="55" y="45" width="30" height="50" fill="#2A2B2E" stroke="#85301C" strokeWidth="2"/>
          {/* 磁带轮 */}
          <circle cx="65" cy="60" r="8" fill="#E8E3D5" stroke="#85301C" strokeWidth="2"/>
          <circle cx="75" cy="80" r="8" fill="#E8E3D5" stroke="#85301C" strokeWidth="2"/>
          {/* 扬声器网格 - 右 */}
          <rect x="90" y="45" width="30" height="50" fill="#2A2B2E" stroke="#85301C" strokeWidth="2"/>
          <circle cx="105" cy="70" r="10" fill="#85301C"/>
          <circle cx="105" cy="70" r="5" fill="#E8E3D5"/>
          <circle cx="105" cy="70" r="2" fill="#85301C"/>
          {/* 控制按钮 */}
          <rect x="20" y="100" width="10" height="5" fill="#85301C"/>
          <rect x="35" y="100" width="10" height="5" fill="#85301C"/>
          <rect x="95" y="100" width="10" height="5" fill="#85301C"/>
          <rect x="110" y="100" width="10" height="5" fill="#85301C"/>
        </svg>
        
        {/* 静态对话气泡 */}
        <div className="w-[800px] mt-4">
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
                Welcome to the "Clear Communication Assessment"
              </p>
              <p className="text-[#85301C] text-2xl">
                Listen to each creator's communication style and rate their clarity.
              </p>
              <p className="text-[#85301C] text-2xl">
                Consider factors like articulation, pacing, and organization of thoughts.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-start gap-12">
      {/* 动态版本的录音机 */}
      <svg width="280" height="240" viewBox="0 0 140 120" style={{imageRendering:'pixelated'}}>
        {/* 录音机主体 */}
        <rect x="10" y="20" width="120" height="90" fill="#E8E3D5" stroke="#85301C" strokeWidth="4"/>
        {/* 上部装饰条 */}
        <rect x="15" y="25" width="110" height="10" fill="#85301C"/>
        {/* 上部按钮 */}
        <rect x="20" y="10" width="10" height="5" fill="#85301C"/>
        <rect x="35" y="10" width="10" height="5" fill="#85301C"/>
        <rect x="95" y="10" width="10" height="5" fill="#85301C"/>
        <rect x="110" y="10" width="10" height="5" fill="#85301C"/>
        {/* 扬声器网格 - 左 */}
        <rect x="20" y="45" width="30" height="50" fill="#2A2B2E" stroke="#85301C" strokeWidth="2"/>
        <g transform={`scale(${speakerScale}) translate(${35 * (1 - speakerScale)}, ${70 * (1 - speakerScale)})`}>
          <circle cx="35" cy="70" r="10" fill="#85301C"/>
          <circle cx="35" cy="70" r="5" fill="#E8E3D5"/>
          <circle cx="35" cy="70" r="2" fill="#85301C"/>
        </g>
        {/* 磁带窗口 */}
        <rect x="55" y="45" width="30" height="50" fill="#2A2B2E" stroke="#85301C" strokeWidth="2"/>
        {/* 磁带轮 - 动态旋转 */}
        <g transform={`rotate(${rotationAngle}, 65, 60)`}>
          <circle cx="65" cy="60" r="8" fill="#E8E3D5" stroke="#85301C" strokeWidth="2"/>
          <line x1="65" y1="52" x2="65" y2="68" stroke="#85301C" strokeWidth="1"/>
          <line x1="57" y1="60" x2="73" y2="60" stroke="#85301C" strokeWidth="1"/>
        </g>
        <g transform={`rotate(${-rotationAngle}, 75, 80)`}>
          <circle cx="75" cy="80" r="8" fill="#E8E3D5" stroke="#85301C" strokeWidth="2"/>
          <line x1="75" y1="72" x2="75" y2="88" stroke="#85301C" strokeWidth="1"/>
          <line x1="67" y1="80" x2="83" y2="80" stroke="#85301C" strokeWidth="1"/>
        </g>
        {/* 扬声器网格 - 右 */}
        <rect x="90" y="45" width="30" height="50" fill="#2A2B2E" stroke="#85301C" strokeWidth="2"/>
        <g transform={`scale(${speakerScale}) translate(${105 * (1 - speakerScale)}, ${70 * (1 - speakerScale)})`}>
          <circle cx="105" cy="70" r="10" fill="#85301C"/>
          <circle cx="105" cy="70" r="5" fill="#E8E3D5"/>
          <circle cx="105" cy="70" r="2" fill="#85301C"/>
        </g>
        {/* 控制按钮 */}
        <rect x="20" y="100" width="10" height="5" fill="#85301C"/>
        <rect x="35" y="100" width="10" height="5" fill="#85301C"/>
        <rect x="95" y="100" width="10" height="5" fill="#85301C"/>
        <rect x="110" y="100" width="10" height="5" fill="#85301C"/>
      </svg>
      
      {/* 对话气泡 */}
      <div className="w-[800px] mt-4">
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
              Welcome to the "Clear Communication Assessment"
            </p>
            <p className="text-[#85301C] text-2xl">
              Listen to each creator's communication style and rate their clarity.
            </p>
            <p className="text-[#85301C] text-2xl">
              Consider factors like articulation, pacing, and organization of thoughts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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

  if (!mounted) {
    return (
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
  }

  return (
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
}

export default function Level2() {
  const router = useRouter();
  const [currentClip, setCurrentClip] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ratings, setRatings] = useState<Record<number, string>>({});
  const [fadeOut, setFadeOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 监听音频加载完成事件
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentClip]);

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
    // 设置淡出动画
    setFadeOut(true);
    
    // 停止当前音频
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // 保存评分
    setRatings(prev => ({
      ...prev,
      [currentClip]: rating
    }));

    // 延迟切换到下一个音频，等待淡出动画完成
    setTimeout(() => {
      if (currentClip < voiceClips.length - 1) {
        setCurrentClip(prev => prev + 1);
        setIsPlaying(false);
        setProgress(0);
      } else {
        // 所有音频评分完成，显示完成信息
        router.push('/game/level3');
      }
      setFadeOut(false);
    }, 500);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <main className="min-h-screen bg-[#8FB4C7] p-8">
      <div className="max-w-[1440px] mx-auto">
        {/* 眼睛和数据线 */}
        <EyeWithLine />
        
        {/* 标题 */}
        <h1 className="text-3xl font-bold text-[#85301C] mb-12 pixel-font text-center">
          LEVEL 2 — CLEAR COMMUNICATION
        </h1>
        
        {/* 录音机和对话框 */}
        <div className="flex justify-center mb-16">
          <RetroTapeRecorder />
        </div>
        
        {/* 音频播放器部分 */}
        <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-[#E8E3D5] p-8 rounded-lg border-4 border-[#2A2B2E] shadow-lg mb-8 max-w-4xl mx-auto retro-player">
            <div className="text-[#2A2B2E] text-2xl font-bold pixel-font mb-6">
              {voiceClips[currentClip].title}
            </div>
            
            {/* 进度条 */}
            <div className="bg-[#2A2B2E] h-10 rounded-none p-1 mb-6 relative overflow-hidden">
              <div 
                className="h-full bg-[#85301C] transition-all duration-100 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 h-full w-2 bg-[#2A2B2E]"></div>
              </div>
            </div>

            <div className="text-[#2A2B2E] mb-6 pixel-font text-lg text-center">
              Is the recording good quality?
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
                  }
                }}
                className="w-14 h-14 bg-[#2A2B2E] text-white rounded pixel-button flex items-center justify-center text-xl"
              >
                ⏮
              </button>
              <button
                onClick={handlePlayPause}
                className="w-14 h-14 bg-[#2A2B2E] text-white rounded pixel-button flex items-center justify-center text-xl"
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
                className="w-14 h-14 bg-[#2A2B2E] text-white rounded pixel-button flex items-center justify-center text-xl"
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
          <div className="flex justify-center gap-8 mt-12">
            <button
              onClick={() => handleRating('Clear')}
              className="px-10 py-5 bg-[#4CAF50] text-white rounded-lg text-xl font-bold pixel-button
                       hover:bg-[#45a049] transition-colors transform hover:scale-105"
            >
              Clear
            </button>
            <button
              onClick={() => handleRating('Moderate')}
              className="px-10 py-5 bg-[#FFA726] text-white rounded-lg text-xl font-bold pixel-button
                       hover:bg-[#FB8C00] transition-colors transform hover:scale-105"
            >
              Moderate
            </button>
            <button
              onClick={() => handleRating('Unclear')}
              className="px-10 py-5 bg-[#E53935] text-white rounded-lg text-xl font-bold pixel-button
                       hover:bg-[#D32F2F] transition-colors transform hover:scale-105"
            >
              Unclear
            </button>
          </div>

          {/* 进度指示器 */}
          <div className="mt-10 text-center text-[#85301C] pixel-font text-lg">
            Voice Clip {currentClip + 1} of {voiceClips.length}
          </div>
        </div>
      </div>
    </main>
  );
} 