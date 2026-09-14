import React from 'react';

export const MarqueeRibbon: React.FC = () => {
  return (
    <div className="w-full bg-[#c3f400] py-1.5 overflow-hidden flex items-center shadow-[0_4px_0px_#0e0e0e] select-none border-y border-[#131313]">
      <div className="flex whitespace-nowrap gap-4 animate-marquee text-[#283500] font-label-code-sm text-label-code-sm tracking-wider uppercase items-center font-bold">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">local_fire_department</span> LIVE FIT RADAR ACTIVE
        </span>
        <span>//</span>
        <span>COMMUNITY HEAT: +4.8K TAGS TODAY</span>
        <span>//</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">verified</span> 100% VERIFIED STREETWEAR VAULTS
        </span>
        <span>//</span>
        <span>DROP #088 LIVE IN 03:41:12</span>
        <span>//</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">price_check</span> MULTI-STORE PRICE ARBITRAGE LIVE
        </span>
        <span>//</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">local_fire_department</span> LIVE FIT RADAR ACTIVE
        </span>
        <span>//</span>
        <span>COMMUNITY HEAT: +4.8K TAGS TODAY</span>
        <span>//</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">verified</span> 100% VERIFIED STREETWEAR VAULTS
        </span>
        <span>//</span>
        <span>DROP #088 LIVE IN 03:41:12</span>
      </div>
    </div>
  );
};
