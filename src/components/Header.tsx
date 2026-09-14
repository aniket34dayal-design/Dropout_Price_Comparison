import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenScanner: () => void;
  onOpenBag: () => void;
  bagCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScanner, onOpenBag, bagCount }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(15158); // ~04:12:38

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 15158));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#131313]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-[#2a2a2a]/60">
      <div className="h-16 px-gutter max-w-5xl mx-auto flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            alt="DROPOUT Streetwear Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1WTxqJujr4E-iYFbD5134DcFMN0xiskARBIJ_1_CF5f7_Uekb6L-psjSy6OkdZLbDk4mpODBrvQ3u6Fo54kyIQJN4WP4mbZhsb2b34MHk0Pgovsb0YwU0L06CE6YCRTFV4bexeERRdEwmhmRLhYaLuAbgSbKF-zqiSULPK8JCXJb6gHIQBGpeMeE78vwbrngL0AhGCrZYu1mWowZbDU7Vzi8D0nrLMkG6h5sDViQW3X8dwqcjRc3266Gg"
          />
          <span className="font-headline-sm text-headline-sm uppercase text-white tracking-tighter">
            DROPOUT
          </span>
          <span className="hidden sm:inline-block text-[10px] font-label-code-sm uppercase bg-[#201f1f] text-[#c3f400] px-1.5 py-0.5 rounded border border-[#353534]">
            PRICE RADAR
          </span>
        </div>

        {/* Live Drop Countdown */}
        <div
          onClick={onOpenScanner}
          className="flex items-center gap-1.5 bg-[#c3f400] text-[#283500] px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#ffffff] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-transform"
          title="Upload or Snap photo to compare prices"
        >
          <span className="material-symbols-outlined text-[16px] animate-pulse">bolt</span>
          <span className="font-label-code-sm text-label-code-sm tracking-wider uppercase whitespace-nowrap font-bold">
            DROP: {formatTime(secondsRemaining)}
          </span>
        </div>

        {/* Action icons & Profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenScanner}
            aria-label="Upload garment photo"
            className="w-9 h-9 rounded-full bg-[#201f1f] text-[#c3f400] hover:bg-[#c3f400] hover:text-[#283500] flex items-center justify-center transition-colors border border-[#353534] shadow-[2px_2px_0px_#000000]"
            title="Scan & Compare Article Prices"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>

          <button
            onClick={onOpenBag}
            aria-label="Open Shopping Bag"
            className="relative w-9 h-9 rounded-full bg-[#201f1f] text-white flex items-center justify-center border border-[#353534] shadow-[2px_2px_0px_#000000] active:scale-95"
            title="View Bag & Price Comparison Summary"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c3f400] text-[#283500] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#131313]">
                {bagCount}
              </span>
            )}
          </button>

          <div className="relative flex items-center justify-center min-w-[36px] min-h-[36px]">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#444933]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6KAGd1yv5XzfliGqhLBwYj0IuVo8SRtbO5KRvxAwfGSN7bE_i_SH5pBSk6fWIr7kFRk_1DzouuZXGd_NTJqffRMDDSzK1IEzhEg1d9n1fD1bemQ-mtqPX0JD-0u10kOvRTz2HAV4bAJ-o3vFqSk8uhnMkg4HrQZeOccVCyDn3DuDoZuV-Gvzr6NJUK_SGgEro4Js8cmBGAzhL_QjvCiogeyrce15n2qGnbeoXF1K4AbjkE60l9oU"
            />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#c3006e] rounded-full ring-2 ring-[#131313]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
