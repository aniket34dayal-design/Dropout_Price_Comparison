import React from 'react';
import { VaultTheme } from '../types';

interface VaultDetailsModalProps {
  vault: VaultTheme | null;
  onClose: () => void;
  onScanGarment: (name: string, imageUrl: string) => void;
}

export const VaultDetailsModal: React.FC<VaultDetailsModalProps> = ({
  vault,
  onClose,
  onScanGarment,
}) => {
  if (!vault) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#131313] border-2 border-[#deb7ff] rounded-xl shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Top Banner with Image */}
        <div className="relative h-48 w-full shrink-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${vault.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0e0e0e]/80 text-white hover:bg-[#c3f400] hover:text-[#283500] flex items-center justify-center transition-colors cursor-pointer border border-[#353534]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="absolute bottom-3 inset-x-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-label-code-sm text-[11px] text-[#c3f400] uppercase font-bold">
                {vault.vol} // {vault.badgeText}
              </span>
              <h2 className="font-headline-md text-headline-md text-white uppercase font-extrabold tracking-tight">
                {vault.title}
              </h2>
            </div>
            <span className="font-label-code-sm text-label-code-sm text-[#8e9379]">
              {vault.followerCount}
            </span>
          </div>
        </div>

        {/* Vault description & garments list */}
        <div className="p-4 sm:p-5 overflow-y-auto flex flex-col gap-4">
          <p className="font-body-md text-body-md text-[#e5e2e1] leading-relaxed">
            {vault.description}
          </p>

          <div className="flex flex-col gap-2.5 pt-2 border-t border-[#2a2a2a]">
            <span className="font-label-code-sm text-[11px] text-[#8e9379] uppercase tracking-wider">
              GARMENTS CATALOGED IN THIS VAULT:
            </span>

            <div className="flex flex-col gap-2">
              {vault.garments.map((g) => (
                <div
                  key={g.id}
                  className="bg-[#1c1b1b] p-3 rounded-lg border border-[#2a2a2a] hover:border-[#c3f400] flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={g.imageUrl}
                      alt={g.name}
                      className="w-12 h-12 rounded object-cover border border-[#353534] shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-code-sm text-[10px] text-[#deb7ff] uppercase">
                        {g.brand}
                      </span>
                      <span className="font-headline-sm text-[14px] text-white font-bold group-hover:text-[#c3f400] transition-colors">
                        {g.name}
                      </span>
                      <span className="font-label-code-sm text-[11px] text-[#8e9379]">
                        Best deal: <strong className="text-[#c3f400]">{g.bestStore}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onScanGarment(g.name, g.imageUrl)}
                      className="bg-[#2a2a2a] hover:bg-[#c3f400] hover:text-[#283500] text-white px-2.5 py-1.5 rounded-sm font-label-code-sm text-[10px] uppercase font-bold transition-all shadow-[1.5px_1.5px_0px_#000000]"
                    >
                      COMPARE STORES
                    </button>
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0e0e0e] hover:bg-white hover:text-[#0e0e0e] text-white px-2.5 py-1.5 rounded-sm font-label-code-sm text-[10px] uppercase font-bold border border-[#444933] flex items-center gap-0.5"
                    >
                      BUY ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
