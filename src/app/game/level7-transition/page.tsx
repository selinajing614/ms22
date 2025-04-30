/**
 * @description Level 7 到 Level 7.5 的转场页面
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Level7Transition() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // 每50ms更新一次进度，总共5秒
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowDialog(true);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 弹窗显示5秒后跳转
  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => {
        router.push('/game/level7-5');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showDialog, router]);

  return (
    <main className="min-h-screen bg-[#8FB4C7] flex items-center justify-center">
      <div className="w-[600px] text-center">
        {/* 进度条和文字容器 */}
        <div className="bg-[#E8E3D5] p-8 rounded-lg border-4 border-[#85301C] shadow-xl">
          {/* 进度条 */}
          <div className="relative h-4 bg-[#2A2B2E] rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-[#85301C] rounded-full transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* 百分比数字 */}
          <div className="text-[#85301C] text-lg font-bold pixel-font mb-4">
            {progress}%
          </div>
          
          {/* 文字 */}
          <p className="text-[#85301C] text-xl pixel-font">
            {!showDialog ? 'Processing Data Collected...' : (
              <span className="scale-up inline-block">
                Now AI has learned from the data you provided. Let's see how it works!
              </span>
            )}
          </p>
        </div>
      </div>
    </main>
  );
} 