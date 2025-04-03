/**
 * @description 开始按钮组件
 * @returns {JSX.Element} 开始按钮
 */
'use client';

import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();

  return (
    <button 
      className="px-8 py-2 retro-button text-xl font-bold rounded-md
                 tracking-widest transform transition-all duration-300 
                 hover:scale-105 w-[150px]
                 border-[3px] border-[#85301C] hover:border-[#AC3723]
                 shadow-lg hover:shadow-[#AC3723]/50 hover:shadow-xl
                 bg-gradient-to-r from-[#85301C] to-[#AC3723]
                 hover:from-[#AC3723] hover:to-[#85301C]
                 text-white hover:text-white"
      onClick={() => router.push('/game/level1')}
    >
      START
    </button>
  );
} 