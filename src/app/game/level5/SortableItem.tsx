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
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-disabled={false}
      aria-roledescription="sortable"
      className="bg-white p-4 rounded-lg border-2 border-[#2A2B2E] cursor-move
                hover:bg-gray-50 transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center bg-[#2A2B2E] text-white rounded-full">
          {index}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-[#2A2B2E]">{title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>{publishDate}</span>
            <span>❤️ {likes}</span>
            <span>💬 {comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 