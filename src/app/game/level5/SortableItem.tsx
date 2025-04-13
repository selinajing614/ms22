/**
 * @description 可拖拽的视频卡片组件
 * @param {Object} props - 组件属性
 * @param {number} props.id - 视频ID
 * @param {number} props.index - 排序索引
 * @param {string} props.title - 视频标题
 * @param {string} props.publishDate - 发布日期
 * @param {number} props.likes - 点赞数
 * @param {number} props.comments - 评论数
 * @returns {JSX.Element} 可拖拽的视频卡片
 */
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: number;
  index: number;
  title: string;
  publishDate: string;
  likes: number;
  comments: number;
}

export function SortableItem({ id, index, title, publishDate, likes, comments }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 rounded-lg border-2 border-[#2A2B2E] cursor-move
                hover:shadow-lg transition-all duration-200
                ${isDragging ? 'shadow-xl scale-105' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-[#2A2B2E] text-white rounded-lg flex items-center justify-center font-bold pixel-font">
          {index}
        </div>
        <div className="flex-1">
          <h3 className="text-base text-[#2A2B2E] mb-2 pixel-font">{title}</h3>
          <div className="flex items-center gap-6 text-base font-bold text-[#85301C]">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {publishDate}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likes}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 