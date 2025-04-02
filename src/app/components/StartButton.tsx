/**
 * @description 开始按钮组件
 * @returns {JSX.Element} 开始按钮
 */
'use client';

export default function StartButton() {
  return (
    <button 
      className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                 shadow-lg hover:bg-blue-700 transition-colors duration-200"
      onClick={() => console.log('Start clicked')}
    >
      Start
    </button>
  );
} 