import React from 'react';

interface SnapToIdentifyCardProps {
  onOpenScanner: () => void;
}

export const SnapToIdentifyCard: React.FC<SnapToIdentifyCardProps> = ({ onOpenScanner }) => {
  return (
    <div className="flex flex-col gap-3 mt-2">
      {/* Visual Search Floating Camera Action Card */}
      <div className="relative bg-[#c3f400] text-[#283500] p-4 rounded-xl shadow-[5px_5px_0px_#ffffff] flex items-center justify-between gap-4 border-2 border-[#000000]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#131313] text-[#c3f400] flex items-center justify-center shadow-[2px_2px_0px_#000000] shrink-0 border border-[#c3f400]">
            <span className="material-symbols-outlined text-[26px]">photo_camera</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm leading-tight uppercase font-extrabold">
              SNAP TO IDENTIFY
            </span>
            <span className="font-body-sm text-body-sm font-medium opacity-90">
              Saw heat on the street? Upload or snap to compare prices across stores.
            </span>
          </div>
        </div>
        <button
          onClick={onOpenScanner}
          className="bg-[#0e0e0e] text-white hover:bg-white hover:text-[#0e0e0e] px-3.5 py-2 rounded-full font-label-code-sm text-label-code-sm uppercase tracking-wider shadow-[2px_2px_0px_#000000] whitespace-nowrap active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-bold shrink-0"
          id="camera-launch-btn"
        >
          OPEN CAM
        </button>
      </div>

      {/* Community Activity Ticker & Drop Stats */}
      <div className="p-3 bg-[#2a2a2a] rounded-lg flex items-center justify-between text-[#8e9379] font-label-code-sm text-label-code-sm border border-[#353534]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-pulse"></span>
          <span>VISUAL SEARCH: 98.4% ACCURACY // 6 STORES CONNECTED</span>
        </span>
        <span className="text-[#c3f400] font-bold">SERVER: TOKYO-01</span>
      </div>
    </div>
  );
};
