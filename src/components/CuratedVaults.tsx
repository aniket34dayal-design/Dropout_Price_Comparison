import React from 'react';
import { VaultTheme } from '../types';

interface CuratedVaultsProps {
  vaults: VaultTheme[];
  onSelectVault: (vault: VaultTheme) => void;
}

export const CuratedVaults: React.FC<CuratedVaultsProps> = ({ vaults, onSelectVault }) => {
  return (
    <div className="flex flex-col gap-space-sm mt-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile uppercase text-white tracking-tighter">
            CURATED VAULTS
          </h2>
          <p className="font-body-sm text-body-sm text-[#8e9379]">EDITORIAL DROP COLLECTIONS</p>
        </div>
        <span className="bg-[#353534] px-2 py-1 rounded-sm font-label-code-sm text-label-code-sm text-[#c3f400] border border-[#444933]">
          {vaults.length} THEMES
        </span>
      </div>

      {/* Vault Cards Mosaic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        {vaults.map((vault) => {
          return (
            <div
              key={vault.id}
              onClick={() => onSelectVault(vault)}
              className="relative bg-[#1c1b1b] rounded-xl overflow-hidden transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer group border border-[#2a2a2a]"
              style={{ boxShadow: `4px 4px 0px ${vault.accentColor}` }}
            >
              <div className="relative h-44 w-full">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url('${vault.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-[#0e0e0e]/65 backdrop-blur-[1px]"></div>

                {/* Diagonal Caution Tape Ribbon Graphic */}
                <div
                  className={`absolute -top-3 -right-12 rotate-45 font-label-code-sm text-[10px] py-1 px-12 tracking-widest font-extrabold shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${vault.badgeColorClass}`}
                >
                  {vault.badgeText}
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#0e0e0e] text-white font-label-code-sm text-label-code-sm px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_#000000] border border-[#353534]">
                      {vault.vol}
                    </span>
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ color: vault.accentColor }}
                    >
                      {vault.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md uppercase text-white tracking-tight leading-tight group-hover:text-[#c3f400] transition-colors">
                      {vault.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-[#8e9379] font-label-code-sm text-label-code-sm">
                      <span>{vault.garmentsCount}</span>
                      <span>•</span>
                      <span>{vault.followerCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
