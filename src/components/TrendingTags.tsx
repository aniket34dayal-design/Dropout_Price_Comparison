import React from 'react';
import { TRENDING_TAGS } from '../data/mockStreetwear';

interface TrendingTagsProps {
  selectedTag: string | null;
  onSelectTag: (tag: string) => void;
}

export const TrendingTags: React.FC<TrendingTagsProps> = ({ selectedTag, onSelectTag }) => {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-sm text-headline-sm uppercase text-white tracking-tight flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#c3f400] text-[22px]">tag</span>
          TRENDING AESTHETICS
        </h2>
        <span className="font-label-code-sm text-label-code-sm text-[#8e9379]">SWIPE →</span>
      </div>

      <div className="flex overflow-x-auto gap-2.5 pb-2 pt-1 no-scrollbar -mx-gutter px-gutter">
        {selectedTag && (
          <button
            onClick={() => onSelectTag('')}
            className="shrink-0 flex items-center gap-1 bg-[#2a2a2a] text-[#c3f400] px-3 py-1.5 rounded-full font-label-code-md text-label-code-md tracking-wider uppercase border border-[#c3f400] shadow-[2px_2px_0px_#000000]"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
            RESET
          </button>
        )}
        {TRENDING_TAGS.map((tag) => {
          const isSelected = selectedTag === tag.label;
          return (
            <button
              key={tag.id}
              onClick={() => onSelectTag(tag.label)}
              className={`hashtag-pill shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-code-md text-label-code-md tracking-wider uppercase transition-all cursor-pointer ${
                tag.bgClass
              } ${isSelected ? 'ring-2 ring-white scale-105' : 'hover:rotate-0'}`}
            >
              <span className="text-[12px] font-bold">#</span>
              {tag.label.replace('#', '')}
            </button>
          );
        })}
      </div>
    </div>
  );
};
