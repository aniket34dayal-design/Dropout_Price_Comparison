import React from 'react';

interface DropItem {
  id: string;
  name: string;
  brand: string;
  dropTime: string;
  retailPrice: number;
  estResalePrice: number;
  imageUrl: string;
  status: 'LIVE NOW' | 'DROPPING SOON' | 'RESTOCK';
  statusColor: string;
  storeLinks: { storeName: string; url: string }[];
}

const UPCOMING_DROPS: DropItem[] = [
  {
    id: 'drop-1',
    name: 'Acid Bleach Boxy Tactical Hoodie',
    brand: 'DROPOUT STUDIO',
    dropTime: 'LIVE NOW (DROP #088)',
    retailPrice: 145,
    estResalePrice: 195,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD271MDiJFZAIeuHaR9px2C0J0ugJcOHSx0GhV_An73SluPxk2Wuxubb3AoZWLEbih4FPIguFw3mq588cHmj0M5ffApcXlCRL4ednbXXWoZriYGQ67o8qPQbWuOjSmRkt2CZ3SuIHwVUHTqkacc54lZuyjouZ9APm40iQFeI9-Etxs4OAfRVUEMwI3a7Wr0MLIVx7mCGNQFrknudibztRuC5ElkHrjav2oTd-QcBbm6c0JChknX9NU',
    status: 'LIVE NOW',
    statusColor: 'bg-[#c3f400] text-[#283500]',
    storeLinks: [
      { storeName: 'Grailed', url: 'https://www.grailed.com/shop?query=acid+wash+boxy+hoodie' },
      { storeName: 'StockX', url: 'https://stockx.com/search?s=acid+heavyweight+hoodie' },
    ],
  },
  {
    id: 'drop-2',
    name: 'Reflective Parachute Multi-Zip Cargos',
    brand: 'NEO_TOKYO',
    dropTime: 'IN 03:41:12',
    retailPrice: 180,
    estResalePrice: 240,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-ncA0iV1daW3_E0n1TWXXer4EdVsgkr-be0aaeQSpkuScAW0sXpxrO1GCD6UcXNOPQoVNu_llPPVQlZobE72jBYgaanaHQIkbZ1ZzZfjRMcfNbX828HWgC3yzb7L-HWXhPS3oinPGC4M-koCZCr2qzfed5iTl834B1AArspoOYlJtjzxOjNNjFK4xk2LcdH5pS3KkY62G-hGDdv7jm7lJJSI_Z7Pscd2QUWrghvrnizEPzGKVx2Y',
    status: 'DROPPING SOON',
    statusColor: 'bg-[#deb7ff] text-[#4a007f]',
    storeLinks: [
      { storeName: 'SSENSE', url: 'https://www.ssense.com/en-us/men?q=parachute+cargo+pants' },
      { storeName: 'Farfetch', url: 'https://www.farfetch.com/shopping/men/search/items.aspx?q=techwear+pants' },
    ],
  },
  {
    id: 'drop-3',
    name: 'Phantom Modular Rig Puffer Jacket',
    brand: 'VOID_CORP',
    dropTime: 'TOMORROW 12:00 EST',
    retailPrice: 240,
    estResalePrice: 310,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh9FUKc8WJkgupWNI9kB2mFGVkYR4SO7NQqOf19FMsEsVeG35StMuQtBt-OLQx9aGmKNniT2jeCvGXaliczlmHzaoic_Qpv4_U-1vWonSAOZkmCR9eNR4gbjKWJdu-IWN16HtALvOl-T_zvFtDbNgMCRL7Sxl7Exnup1_eVs2XZ2PCL38LyoGjMTWnkWKVjBLOOGGkfgsIDDEKXQQfDa6TTbpCjXv4GTcc_ngjphXQnNAobZCIoiQ',
    status: 'DROPPING SOON',
    statusColor: 'bg-[#ffd9e3] text-[#640036]',
    storeLinks: [
      { storeName: 'StockX', url: 'https://stockx.com/search?s=phantom+puffer+jacket' },
      { storeName: 'End Clothing', url: 'https://www.endclothing.com/us/catalogsearch/result/?q=down+puffer+jacket' },
    ],
  },
];

interface DropsViewProps {
  onScanArticle: (name: string, imageUrl: string) => void;
  onShowToast: (msg: string) => void;
}

export const DropsView: React.FC<DropsViewProps> = ({ onScanArticle, onShowToast }) => {
  return (
    <div className="flex flex-col gap-space-md p-gutter max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile uppercase text-white tracking-tighter flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400]">local_fire_department</span>
            STREETWEAR DROPS RADAR
          </h1>
          <p className="font-body-sm text-body-sm text-[#8e9379]">
            Live launch countdowns and price arbitrage spreads across secondary markets
          </p>
        </div>
        <span className="bg-[#201f1f] text-[#c3f400] px-2.5 py-1 rounded font-label-code-sm text-[11px] font-bold uppercase border border-[#353534]">
          RADAR LOCK: ON
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {UPCOMING_DROPS.map((drop) => (
          <div
            key={drop.id}
            className="bg-[#1c1b1b] rounded-xl border-2 border-[#2a2a2a] hover:border-[#c3f400] transition-all p-4 flex flex-col sm:flex-row gap-4 shadow-[4px_4px_0px_#000000]"
          >
            <img
              src={drop.imageUrl}
              alt={drop.name}
              className="w-full sm:w-40 h-44 rounded-lg object-cover border border-[#353534] shrink-0 bg-[#0e0e0e]"
            />
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className={`font-label-code-sm text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${drop.statusColor}`}>
                    {drop.status}
                  </span>
                  <span className="font-label-code-sm text-[11px] text-[#c3f400]">
                    {drop.dropTime}
                  </span>
                </div>

                <span className="font-label-code-sm text-[11px] text-[#deb7ff] uppercase mt-1">
                  {drop.brand}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-white uppercase font-bold">
                  {drop.name}
                </h3>

                <div className="flex items-center gap-3 mt-1 font-label-code-sm text-[12px]">
                  <span className="text-[#8e9379]">Retail: <strong className="text-white">${drop.retailPrice}</strong></span>
                  <span>•</span>
                  <span className="text-[#8e9379]">Est. Resale: <strong className="text-[#c3f400]">${drop.estResalePrice}</strong></span>
                  <span>•</span>
                  <span className="text-[#c3006e] font-bold">Spread: +${drop.estResalePrice - drop.retailPrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#2a2a2a]">
                <button
                  onClick={() => onScanArticle(drop.name, drop.imageUrl)}
                  className="bg-[#c3f400] text-[#283500] hover:bg-white px-3.5 py-2 rounded-full font-label-code-sm text-[11px] font-bold uppercase shadow-[2px_2px_0px_#ffffff] active:scale-95 transition-all cursor-pointer"
                >
                  RUN LIVE PRICE COMPARISON
                </button>

                <div className="flex items-center gap-1.5">
                  {drop.storeLinks.map((link) => (
                    <a
                      key={link.storeName}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0e0e0e] hover:bg-white hover:text-black text-white px-2.5 py-1.5 rounded text-[10px] font-label-code-sm uppercase font-bold border border-[#353534] flex items-center gap-0.5"
                    >
                      {link.storeName} ↗
                    </a>
                  ))}
                  <button
                    onClick={() => onShowToast(`DROP ALERT ARMED FOR ${drop.name}`)}
                    className="p-1.5 rounded bg-[#201f1f] text-white hover:text-[#c3f400] border border-[#353534]"
                    title="Set Alert"
                  >
                    <span className="material-symbols-outlined text-[16px]">notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
