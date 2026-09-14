import React, { useState } from 'react';
import { ArticleAnalysisResult, PriceComparisonItem, SimilarArticleRecommendation } from '../types';

interface PriceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ArticleAnalysisResult | null;
  onAddToBag: (item: {
    itemTitle: string;
    storeName: string;
    price: number;
    originalPrice?: number;
    size: string;
    imageUrl: string;
    productUrl: string;
  }) => void;
  onCompareRecommendation: (rec: SimilarArticleRecommendation) => void;
  onShowToast: (msg: string) => void;
}

export const PriceComparisonModal: React.FC<PriceComparisonModalProps> = ({
  isOpen,
  onClose,
  analysis,
  onAddToBag,
  onCompareRecommendation,
  onShowToast,
}) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'speed'>('price');

  if (!isOpen || !analysis) return null;

  const { identifiedItem, priceComparisons, recommendations, priceAnalytics, analyzedImageUrl } = analysis;

  const sortedComparisons = [...priceComparisons].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.deliveryEstimate.localeCompare(b.deliveryEstimate);
  });

  const lowestDeal = priceComparisons.find((p) => p.isLowestPrice) || sortedComparisons[0];

  const handleAddDealToBag = (deal: PriceComparisonItem) => {
    onAddToBag({
      itemTitle: identifiedItem.name,
      storeName: deal.storeName,
      price: deal.price,
      originalPrice: deal.originalPrice,
      size: selectedSize,
      imageUrl: analyzedImageUrl || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
      productUrl: deal.productUrl,
    });
    onShowToast(`ADDED TO BAG VIA ${deal.storeName.toUpperCase()} ($${deal.price})`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#131313] border-2 border-[#c3f400] rounded-xl shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-3.5 bg-[#201f1f] border-b border-[#353534] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-[#c3f400] text-[#283500] font-label-code-sm text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase">
              RADAR COMPARISON
            </span>
            <span className="font-headline-sm text-[15px] sm:text-[18px] text-white uppercase tracking-tight truncate max-w-[200px] sm:max-w-md">
              {identifiedItem.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0e0e0e] text-white hover:bg-[#c3f400] hover:text-[#283500] flex items-center justify-center transition-colors cursor-pointer border border-[#353534] shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-3 sm:p-5 overflow-y-auto flex flex-col gap-5">
          {/* ARTICLE IDENTIFICATION HERO */}
          <div className="bg-[#1c1b1b] rounded-xl p-3.5 sm:p-4 border border-[#2a2a2a] shadow-[4px_4px_0px_#0e0e0e] flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            {analyzedImageUrl && (
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-lg overflow-hidden border-2 border-[#c3f400] shadow-[3px_3px_0px_#000000] shrink-0 bg-[#0e0e0e]">
                <img
                  src={analyzedImageUrl}
                  alt={identifiedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 bg-[#0e0e0e]/85 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-label-code-sm text-[#c3f400] font-bold">
                  {Math.round((identifiedItem.confidence || 0.98) * 100)}% MATCH
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#2a2a2a] text-[#deb7ff] px-2 py-0.5 rounded font-label-code-sm text-[11px] font-bold uppercase border border-[#6b13af]/40">
                  {identifiedItem.brand}
                </span>
                <span className="bg-[#2a2a2a] text-[#8e9379] px-2 py-0.5 rounded font-label-code-sm text-[11px] uppercase">
                  {identifiedItem.category}
                </span>
                <span className="bg-[#2a2a2a] text-[#ffd9e3] px-2 py-0.5 rounded font-label-code-sm text-[11px] uppercase">
                  {identifiedItem.aesthetic}
                </span>
              </div>

              <h2 className="font-headline-md text-[20px] sm:text-[24px] text-white uppercase leading-tight font-extrabold tracking-tight">
                {identifiedItem.name}
              </h2>

              <p className="font-body-sm text-body-sm text-[#8e9379]">
                {identifiedItem.summary}
              </p>

              {/* Key features */}
              {identifiedItem.keyFeatures && identifiedItem.keyFeatures.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {identifiedItem.keyFeatures.slice(0, 4).map((feat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-label-code-sm bg-[#131313] text-[#e5e2e1] px-2 py-0.5 rounded border border-[#353534]"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              )}

              {/* Size selector */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-label-code-sm text-[11px] text-[#8e9379] uppercase">SIZE:</span>
                {['S', 'M', 'L', 'XL', 'OS'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-7 h-7 rounded font-label-code-sm text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#c3f400] text-[#283500] shadow-[1.5px_1.5px_0px_#ffffff]'
                        : 'bg-[#0e0e0e] text-white hover:border-[#c3f400] border border-[#2a2a2a]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* REAL-TIME ARBITRAGE STATS BANNER */}
          <div className="bg-gradient-to-r from-[#201f1f] via-[#1c1b1b] to-[#201f1f] p-3.5 sm:p-4 rounded-xl border-2 border-[#c3f400] shadow-[4px_4px_0px_#ffffff] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-label-code-sm text-[10px] text-[#8e9379] uppercase tracking-wider">
                LOWEST WEB PRICE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-[32px] text-[#c3f400] leading-none font-extrabold">
                  ${priceAnalytics.lowestPrice}
                </span>
                <span className="font-label-code-sm text-[12px] text-white bg-[#0e0e0e] px-2 py-0.5 rounded border border-[#353534]">
                  at {priceAnalytics.lowestStore}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-label-code-sm text-[10px] text-[#8e9379] uppercase tracking-wider">
                HIGHEST WEB PRICE
              </span>
              <span className="font-headline-md text-[20px] text-white/80 line-through">
                ${priceAnalytics.highestPrice}
              </span>
            </div>

            <div className="bg-[#c3006e] text-[#ffd9e3] px-3 py-1.5 rounded-full font-label-code-sm text-[12px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000000] border border-[#ffd9e3]/40">
              SAVE ${priceAnalytics.savingsAmount} ({priceAnalytics.savingsPercentage}% SPREAD)
            </div>
          </div>

          {/* MULTI-STORE PRICE COMPARISON LIST */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm uppercase text-white tracking-tight flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#c3f400] text-[20px]">
                  storefront
                </span>
                PRICES ACROSS E-COMMERCE STORES ({sortedComparisons.length})
              </h3>

              {/* Sort controls */}
              <div className="flex items-center gap-1 bg-[#1c1b1b] p-1 rounded-md border border-[#2a2a2a]">
                <button
                  onClick={() => setSortBy('price')}
                  className={`px-2 py-0.5 rounded text-[10px] font-label-code-sm uppercase cursor-pointer ${
                    sortBy === 'price' ? 'bg-[#c3f400] text-[#283500] font-bold' : 'text-[#8e9379]'
                  }`}
                >
                  Lowest $
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`px-2 py-0.5 rounded text-[10px] font-label-code-sm uppercase cursor-pointer ${
                    sortBy === 'rating' ? 'bg-[#c3f400] text-[#283500] font-bold' : 'text-[#8e9379]'
                  }`}
                >
                  Top Rated
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {sortedComparisons.map((storeDeal) => {
                return (
                  <div
                    key={storeDeal.id}
                    className={`relative bg-[#1c1b1b] p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border transition-all ${
                      storeDeal.isLowestPrice
                        ? 'border-2 border-[#c3f400] shadow-[3px_3px_0px_#c3f400]'
                        : 'border-[#2a2a2a] hover:border-[#8e9379]'
                    }`}
                  >
                    {storeDeal.isLowestPrice && (
                      <span className="absolute -top-2.5 right-3 bg-[#c3f400] text-[#283500] text-[10px] font-label-code-sm font-bold px-2 py-0.5 rounded-full uppercase shadow-[1px_1px_0px_#000000]">
                        ★ LOWEST PRICE LEADER
                      </span>
                    )}

                    {/* Store info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#0e0e0e] text-white flex items-center justify-center font-label-code-lg text-[13px] font-bold border border-[#353534] shrink-0">
                        {storeDeal.storeName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-headline-sm text-[15px] text-white font-bold">
                            {storeDeal.storeName}
                          </span>
                          <span className="text-[10px] font-label-code-sm bg-[#2a2a2a] text-[#deb7ff] px-1.5 py-0.2 rounded uppercase">
                            {storeDeal.condition}
                          </span>
                          <span className="text-[10px] font-label-code-sm text-[#8e9379] flex items-center">
                            ★ {storeDeal.rating}
                          </span>
                        </div>
                        <span className="font-body-sm text-[12px] text-[#8e9379] line-clamp-1">
                          {storeDeal.shippingInfo} • Est: {storeDeal.deliveryEstimate}
                        </span>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <div className="flex flex-col text-right">
                        <span className="font-headline-sm text-[20px] text-[#c3f400] font-bold leading-tight">
                          ${storeDeal.price}
                        </span>
                        {storeDeal.originalPrice && storeDeal.originalPrice > storeDeal.price && (
                          <span className="text-[11px] font-label-code-sm text-[#8e9379] line-through">
                            ${storeDeal.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Direct Store Link (Requirement: direct link to their websites) */}
                      <a
                        href={storeDeal.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0e0e0e] hover:bg-white hover:text-[#0e0e0e] text-white px-3 py-2 rounded-full font-label-code-sm text-[11px] font-bold tracking-wider uppercase border border-[#444933] shadow-[2px_2px_0px_#000000] flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap"
                        title={`Open direct shopping link on ${storeDeal.storeName}`}
                      >
                        VISIT {storeDeal.storeName.toUpperCase()}
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>

                      {/* Add to internal bag */}
                      <button
                        onClick={() => handleAddDealToBag(storeDeal)}
                        className="bg-[#c3f400] hover:bg-white text-[#283500] p-2 rounded-full font-label-code-sm font-bold shadow-[2px_2px_0px_#000000] active:scale-95 transition-all cursor-pointer"
                        title="Add this deal to bag"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RECOMMENDATIONS AND SUGGESTIONS OF SAME TYPE OF ARTICLES */}
          <div className="flex flex-col gap-3 pt-2 border-t border-[#2a2a2a]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase text-white tracking-tight flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#deb7ff] text-[20px]">
                    auto_awesome
                  </span>
                  SAME-TYPE SUGGESTIONS & RECOMMENDATIONS
                </h3>
                <p className="font-body-sm text-[12px] text-[#8e9379]">
                  Curated alternative garments of same silhouette & complementary aesthetics
                </p>
              </div>
              <span className="font-label-code-sm text-[11px] text-[#deb7ff] bg-[#6b13af]/40 px-2 py-0.5 rounded uppercase border border-[#deb7ff]/30">
                {recommendations.length} MATCHES
              </span>
            </div>

            {/* Recommendation Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-[#1c1b1b] p-3 rounded-xl border border-[#2a2a2a] hover:border-[#deb7ff] transition-all flex gap-3 shadow-[3px_3px_0px_#0e0e0e] group"
                >
                  <img
                    src={rec.imageUrl}
                    alt={rec.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-[#353534] shrink-0 bg-[#0e0e0e]"
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-label-code-sm text-[#deb7ff] uppercase">
                          {rec.brand}
                        </span>
                        <span className="text-[10px] font-label-code-sm bg-[#c3f400] text-[#283500] font-bold px-1.5 py-0.2 rounded-xs">
                          {rec.similarityPercentage}% MATCH
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-[13px] text-white uppercase font-bold truncate mt-0.5 group-hover:text-[#c3f400] transition-colors">
                        {rec.title}
                      </h4>
                      <span className="font-body-sm text-[11px] text-[#8e9379] line-clamp-1 mt-0.5">
                        {rec.reason || `${rec.category} • ${rec.aestheticTag}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2a2a2a]">
                      <span className="font-headline-sm text-[15px] text-[#c3f400] font-bold">
                        ${rec.price}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onCompareRecommendation(rec)}
                          className="bg-[#2a2a2a] hover:bg-[#c3f400] hover:text-[#283500] text-white px-2 py-1 rounded text-[10px] font-label-code-sm uppercase transition-colors"
                          title="Run full multi-store price scan on this article"
                        >
                          SCAN THIS
                        </button>
                        <a
                          href={rec.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0e0e0e] hover:bg-white hover:text-black text-white px-2 py-1 rounded text-[10px] font-label-code-sm uppercase flex items-center gap-0.5 border border-[#444933]"
                          title={`Open ${rec.storeName}`}
                        >
                          DIRECT LINK ↗
                        </a>
                      </div>
                    </div>
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
