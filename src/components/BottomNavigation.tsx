import React from 'react';

export type NavTab = 'drops' | 'explore' | 'vault' | 'bag';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  bagCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  bagCount,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#0e0e0e]/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.6)] border-t border-[#201f1f]">
      <div className="flex items-center justify-around h-20 px-space-xs max-w-5xl mx-auto">
        {/* DROPS TAB */}
        <button
          onClick={() => onTabChange('drops')}
          className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'drops'
              ? 'bg-[#c3f400] text-[#283500] font-bold shadow-[2px_2px_0px_#ffffff]'
              : 'text-[#c4c9ac] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
          <span className="font-label-code-sm text-label-code-sm uppercase">DROPS</span>
        </button>

        {/* EXPLORE TAB (Default active) */}
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'explore'
              ? 'bg-[#c3f400] text-[#283500] font-bold shadow-[2px_2px_0px_#ffffff]'
              : 'text-[#c4c9ac] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">radar</span>
          <span className="font-label-code-sm text-label-code-sm uppercase">EXPLORE</span>
        </button>

        {/* VAULT TAB */}
        <button
          onClick={() => onTabChange('vault')}
          className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'vault'
              ? 'bg-[#c3f400] text-[#283500] font-bold shadow-[2px_2px_0px_#ffffff]'
              : 'text-[#c4c9ac] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">lock</span>
          <span className="font-label-code-sm text-label-code-sm uppercase">VAULT</span>
        </button>

        {/* BAG TAB */}
        <button
          onClick={() => onTabChange('bag')}
          className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'bag'
              ? 'bg-[#c3f400] text-[#283500] font-bold shadow-[2px_2px_0px_#ffffff]'
              : 'text-[#c4c9ac] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          <span className="font-label-code-sm text-label-code-sm uppercase">BAG ({bagCount})</span>
          {bagCount > 0 && activeTab !== 'bag' && (
            <span className="absolute top-1 right-2 w-2 h-2 bg-[#c3f400] rounded-full"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
