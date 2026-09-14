import React from 'react';
import { BagItem } from '../types';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearBag: () => void;
  onShowToast: (msg: string) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearBag,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginal = items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price * 1.25) * item.quantity,
    0
  );
  const totalSavings = Math.max(0, Math.round(totalOriginal - totalAmount));

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#131313] border-l-2 border-[#c3f400] h-full flex flex-col shadow-[-8px_0px_20px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="p-4 bg-[#201f1f] border-b border-[#353534] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400] text-[22px]">
              shopping_bag
            </span>
            <span className="font-headline-sm text-headline-sm uppercase text-white font-bold">
              YOUR BAG ({items.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0e0e0e] text-white hover:bg-[#c3f400] hover:text-[#283500] flex items-center justify-center transition-colors cursor-pointer border border-[#353534]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Savings banner */}
        {items.length > 0 && totalSavings > 0 && (
          <div className="bg-[#c3f400] text-[#283500] p-2.5 px-4 font-label-code-sm text-[12px] font-bold uppercase tracking-wider flex items-center justify-between border-b border-[#0e0e0e]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">price_check</span>
              ARBITRAGE RADAR SAVINGS
            </span>
            <span>-${totalSavings} SAVED</span>
          </div>
        )}

        {/* Bag Items list */}
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-3">
              <span className="material-symbols-outlined text-[#8e9379] text-[48px]">
                shopping_bag
              </span>
              <span className="font-headline-sm text-[18px] text-white uppercase">
                YOUR BAG IS EMPTY
              </span>
              <p className="font-body-sm text-body-sm text-[#8e9379]">
                Scan garments or shop the community heat feed to compare prices and lock in deals!
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#c3f400] text-[#283500] font-label-code-sm text-[12px] font-bold px-4 py-2 rounded-full uppercase shadow-[2px_2px_0px_#ffffff]"
              >
                EXPLORE STREETWEAR
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-[#1c1b1b] p-3 rounded-lg border border-[#2a2a2a] flex gap-3 shadow-[2px_2px_0px_#000000]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.itemTitle}
                  className="w-16 h-16 rounded object-cover border border-[#353534] shrink-0 bg-[#0e0e0e]"
                />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-label-code-sm text-[10px] text-[#deb7ff] uppercase">
                        STORE: {item.storeName}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#8e9379] hover:text-[#ffb4ab]"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <span className="font-headline-sm text-[13px] text-white font-bold truncate">
                      {item.itemTitle}
                    </span>
                    <span className="font-label-code-sm text-[10px] text-[#8e9379]">
                      Size: {item.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#2a2a2a]">
                    <span className="font-headline-sm text-[14px] text-[#c3f400] font-bold">
                      ${item.price * item.quantity}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#0e0e0e] rounded border border-[#353534]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-white hover:text-[#c3f400] font-bold text-[12px]"
                        >
                          -
                        </button>
                        <span className="px-1 text-[11px] font-label-code-sm text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-white hover:text-[#c3f400] font-bold text-[12px]"
                        >
                          +
                        </button>
                      </div>

                      <a
                        href={item.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#2a2a2a] hover:bg-white hover:text-[#0e0e0e] text-white p-1 rounded text-[10px] font-label-code-sm uppercase flex items-center"
                        title="View direct store link"
                      >
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {items.length > 0 && (
          <div className="p-4 bg-[#201f1f] border-t border-[#353534] flex flex-col gap-3">
            <div className="flex items-center justify-between font-label-code-sm text-[12px]">
              <span className="text-[#8e9379] uppercase">ESTIMATED TOTAL:</span>
              <span className="font-headline-md text-[22px] text-white font-bold">
                ${totalAmount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onShowToast('CHECKOUT INITIATED ACROSS LOWEST PROVIDERS');
                }}
                className="col-span-2 bg-[#c3f400] text-[#283500] hover:bg-white py-3 rounded-full font-label-code-md text-label-code-md font-bold uppercase tracking-wider shadow-[3px_3px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center cursor-pointer"
              >
                PROCEED TO BEST DEALS ↗
              </button>
              <button
                onClick={onClearBag}
                className="col-span-2 bg-[#0e0e0e] text-[#8e9379] hover:text-white py-2 rounded font-label-code-sm text-[11px] uppercase tracking-wider"
              >
                CLEAR BAG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
