import React from 'react';

interface SearchHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenScanner: () => void;
  onClearSearch?: () => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenScanner,
  onClearSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenScanner();
    }
  };

  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
        <span className="font-label-code-sm text-label-code-sm tracking-widest text-[#c3f400] uppercase bg-[#2a2a2a] px-2 py-0.5 rounded-sm border border-[#353534]">
          RADAR SYSTEM v2.4
        </span>
        <span className="font-label-code-sm text-label-code-sm text-[#8e9379] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-ping"></span>
          FEED SYNCED // E-COMMERCE LIVE
        </span>
      </div>

      {/* Neo-brutalist Search Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center w-full shadow-[4px_4px_0px_#c3f400] border-2 border-[#c3f400] transition-transform active:translate-x-0.5 active:translate-y-0.5">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-[#c3f400]">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#0e0e0e] text-[#e5e2e1] font-body-md text-body-md pl-11 pr-24 py-3.5 focus:outline-none placeholder:text-[#8e9379]/70 transition-colors"
          placeholder="Search by aesthetic, drop #, or barcode..."
          type="text"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {searchQuery && onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="text-[#8e9379] hover:text-white p-1 rounded"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            type="button"
            onClick={onOpenScanner}
            aria-label="Scan garment barcode or photo"
            className="flex items-center gap-1 bg-[#2a2a2a] text-[#c3f400] hover:bg-[#c3f400] hover:text-[#283500] px-2.5 py-1.5 rounded-sm active:bg-[#c3f400] active:text-[#283500] transition-all text-label-code-sm font-label-code-sm shadow-[2px_2px_0px_#000000] cursor-pointer"
            id="scan-barcode-btn"
          >
            <span className="material-symbols-outlined text-[16px]">barcode_scanner</span>
            <span className="hidden sm:inline font-bold">SCAN</span>
          </button>
        </div>
      </form>
    </div>
  );
};
