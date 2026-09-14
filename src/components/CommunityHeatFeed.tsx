import React from 'react';
import { CommunityHeatItem } from '../types';

interface CommunityHeatFeedProps {
  items: CommunityHeatItem[];
  onOpenItemModal: (item: CommunityHeatItem) => void;
  onLikeItem: (id: string) => void;
  onFilterUGC: () => void;
}

export const CommunityHeatFeed: React.FC<CommunityHeatFeedProps> = ({
  items,
  onOpenItemModal,
  onLikeItem,
  onFilterUGC,
}) => {
  const mainCard = items[0];
  const gridCards = items.slice(1);

  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile uppercase text-white tracking-tighter">
            COMMUNITY HEAT
          </h2>
          <span className="bg-[#ffb4ab] text-[#0e0e0e] px-1.5 py-0.5 rounded-xs font-label-code-sm text-label-code-sm font-bold animate-pulse">
            LIVE
          </span>
        </div>
        <button
          onClick={onFilterUGC}
          className="font-label-code-sm text-label-code-sm text-[#c3f400] underline uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
        >
          FILTER UGC
        </button>
      </div>

      {/* Feed Card 1: Kai.glitch (Featured Hero Fit) */}
      {mainCard && (
        <div className="relative bg-[#1c1b1b] rounded-xl overflow-hidden shadow-[5px_5px_0px_#c3f400] border-2 border-[#2a2a2a] flex flex-col">
          {/* Card Top Bar / Creator Info */}
          <div className="p-3 bg-[#2a2a2a] flex items-center justify-between z-10 border-b border-[#353534]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-full bg-cover bg-center shadow-[1px_1px_0px_#c3f400] border border-[#444933]"
                  style={{ backgroundImage: `url('${mainCard.creatorAvatar}')` }}
                />
                <span className="absolute -bottom-1 -right-1 bg-[#c3f400] text-[#283500] text-[10px] rounded-full p-0.5 flex items-center justify-center font-bold">
                  ✓
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[16px] text-white leading-tight tracking-tight">
                  {mainCard.creatorHandle}
                </span>
                <span className="font-label-code-sm text-label-code-sm text-[#8e9379]">
                  {mainCard.locationViews}
                </span>
              </div>
            </div>
            <button
              onClick={() => onLikeItem(mainCard.id)}
              className={`bg-[#0e0e0e] px-2.5 py-1 rounded-full font-label-code-sm text-label-code-sm tracking-wider uppercase shadow-[2px_2px_0px_#ffffff] flex items-center gap-1 active:scale-95 transition-all cursor-pointer ${
                mainCard.isLiked ? 'text-[#c3006e] border border-[#c3006e]' : 'text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">favorite</span>
              {mainCard.likes}
            </button>
          </div>

          {/* UGC Visual Viewport */}
          <div className="relative w-full h-[400px] overflow-hidden group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${mainCard.imageUrl}')` }}
            />

            {/* Neo-brutalist Sticker Badge Overlay */}
            <div className="absolute top-4 right-3 -rotate-6 bg-[#c3006e] text-[#ffd9e3] px-2.5 py-1 rounded-xs font-label-code-sm text-label-code-sm font-bold tracking-widest uppercase shadow-[3px_3px_0px_#000000] border border-[#ffd9e3]/40">
              {mainCard.badge}
            </div>

            {/* Interactive Fit Inspector Tag Overlaid on image */}
            <div
              onClick={() => onOpenItemModal(mainCard)}
              className="absolute top-1/2 left-8 transform -translate-y-1/2 cursor-pointer group/tag"
              title="Click to inspect price comparison across stores"
            >
              <div className="relative flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#c3f400] animate-ping absolute"></div>
                <div className="w-4 h-4 rounded-full bg-[#c3f400] shadow-[0_0_10px_#c3f400] flex items-center justify-center text-[#283500] font-bold text-[9px] relative z-10">
                  {mainCard.tagNumber}
                </div>
                <div className="ml-2 bg-[#0e0e0e]/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-[3px_3px_0px_#c3f400] border border-[#c3f400]/50 flex flex-col group-hover/tag:scale-105 transition-transform">
                  <span className="font-label-code-sm text-[10px] text-[#c3f400]">
                    {mainCard.taggedLabel}
                  </span>
                  <span className="font-headline-sm text-[12px] text-white leading-none">
                    {mainCard.itemTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Fit Detail Drawer / Action */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/85 to-transparent flex items-end justify-between gap-2">
              <div className="flex flex-col bg-[#2a2a2a]/95 backdrop-blur-sm p-2.5 rounded-lg shadow-[2px_2px_0px_#000000] border border-[#353534] max-w-[65%]">
                <span className="font-label-code-sm text-[11px] text-[#8e9379] uppercase tracking-wider">
                  FIT PIECE 01
                </span>
                <span className="font-headline-sm text-headline-sm text-white tracking-tight truncate">
                  {mainCard.fullItemTitle}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="bg-[#c3f400] text-[#283500] px-1.5 py-0.5 rounded-xs font-label-code-sm text-label-code-sm font-bold">
                    ${mainCard.price}
                  </span>
                  <span className="font-label-code-sm text-[10px] text-[#ffb4ab]">
                    {mainCard.stockAlert || 'ONLY 14 LEFT'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenItemModal(mainCard)}
                className="bg-[#c3f400] text-[#283500] px-4 py-3 rounded-full font-label-code-md text-label-code-md font-bold tracking-wider uppercase shadow-[3px_3px_0px_#ffffff] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#ffffff] transition-all shrink-0 cursor-pointer hover:bg-white"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                SHOP FIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feed Card 2 & 3: Double Grid for Rapid Discovery */}
      {gridCards.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-1">
          {gridCards.map((card, idx) => {
            const shadowColor = idx % 2 === 0 ? '#deb7ff' : '#ffd9e3';
            const badgeBg = idx % 2 === 0 ? 'bg-[#6b13af] text-[#deb7ff]' : 'bg-[#c3006e] text-[#ffd9e3]';

            return (
              <div
                key={card.id}
                className="relative bg-[#1c1b1b] rounded-xl overflow-hidden flex flex-col border border-[#2a2a2a]"
                style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}
              >
                <div className="p-2 bg-[#2a2a2a] flex items-center justify-between border-b border-[#353534]">
                  <span className="font-headline-sm text-[13px] text-white truncate">
                    {card.creatorHandle}
                  </span>
                  <button
                    onClick={() => onLikeItem(card.id)}
                    className="font-label-code-sm text-[10px] text-[#deb7ff] flex items-center gap-0.5 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[12px]">favorite</span>
                    {card.likes}
                  </button>
                </div>

                <div className="relative h-56 w-full group overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${card.imageUrl}')` }}
                  />

                  <div className={`absolute top-2 left-2 rotate-2 ${badgeBg} px-1.5 py-0.5 rounded-xs font-label-code-sm text-[10px] font-bold shadow-[2px_2px_0px_#000000]`}>
                    {card.badge}
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent flex flex-col">
                    <span className="font-headline-sm text-[12px] text-white truncate">
                      {card.itemTitle}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[#c3f400] font-label-code-sm text-[11px] font-bold">
                        ${card.price}
                      </span>
                      <button
                        onClick={() => onOpenItemModal(card)}
                        className="bg-[#353534] text-white px-2 py-1 rounded-sm font-label-code-sm text-[10px] uppercase shadow-[1.5px_1.5px_0px_#ffffff] active:scale-95 transition-all hover:bg-[#c3f400] hover:text-[#283500] cursor-pointer"
                      >
                        COMPARE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
