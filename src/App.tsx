/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { SearchHero } from './components/SearchHero';
import { TrendingTags } from './components/TrendingTags';
import { CommunityHeatFeed } from './components/CommunityHeatFeed';
import { CuratedVaults } from './components/CuratedVaults';
import { SnapToIdentifyCard } from './components/SnapToIdentifyCard';
import { CameraScanModal } from './components/CameraScanModal';
import { PriceComparisonModal } from './components/PriceComparisonModal';
import { VaultDetailsModal } from './components/VaultDetailsModal';
import { BagDrawer } from './components/BagDrawer';
import { BottomNavigation, NavTab } from './components/BottomNavigation';
import { DropsView } from './components/DropsView';
import { Toast } from './components/Toast';

import { MOCK_HEAT_ITEMS, CURATED_VAULTS } from './data/mockStreetwear';
import {
  ArticleAnalysisResult,
  CommunityHeatItem,
  VaultTheme,
  BagItem,
  SimilarArticleRecommendation,
} from './types';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Community Heat Feed State
  const [heatItems, setHeatItems] = useState<CommunityHeatItem[]>(MOCK_HEAT_ITEMS);
  const [isUgcFiltered, setIsUgcFiltered] = useState(false);

  // Modals & Drawers
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [activeVault, setActiveVault] = useState<VaultTheme | null>(null);

  // Price Comparison Modal State
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ArticleAnalysisResult | null>(null);

  // Bag State
  const [bagItems, setBagItems] = useState<BagItem[]>([
    {
      id: 'bag-init-1',
      itemTitle: 'Acid Wash Boxy Heavyweight Hoodie',
      storeName: 'Grailed',
      price: 145,
      originalPrice: 195,
      size: 'M',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD271MDiJFZAIeuHaR9px2C0J0ugJcOHSx0GhV_An73SluPxk2Wuxubb3AoZWLEbih4FPIguFw3mq588cHmj0M5ffApcXlCRL4ednbXXWoZriYGQ67o8qPQbWuOjSmRkt2CZ3SuIHwVUHTqkacc54lZuyjouZ9APm40iQFeI9-Etxs4OAfRVUEMwI3a7Wr0MLIVx7mCGNQFrknudibztRuC5ElkHrjav2oTd-QcBbm6c0JChknX9NU',
      productUrl: 'https://www.grailed.com/shop?query=acid+wash+boxy+hoodie',
      quantity: 1,
    },
  ]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Like Community Item handler
  const handleLikeItem = (id: string) => {
    setHeatItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          showToast(isLiked ? `SAVED TO WISHLIST // ${item.creatorHandle}` : 'REMOVED FROM WISHLIST');
          return {
            ...item,
            isLiked,
          };
        }
        return item;
      })
    );
  };

  // Filter UGC items
  const handleFilterUgc = () => {
    setIsUgcFiltered(!isUgcFiltered);
    showToast(!isUgcFiltered ? 'FILTERING: VERIFIED HIGH-HEAT LOOKS' : 'SHOWING ALL COMMUNITY LOOKS');
  };

  // Handle clicking on an item in Community Heat
  const handleOpenItemComparison = (item: CommunityHeatItem) => {
    setCurrentAnalysis({
      identifiedItem: {
        id: item.id,
        name: item.fullItemTitle,
        brand: 'DROPOUT ARCHIVE',
        category: 'Streetwear Apparel',
        silhouette: 'Boxy Oversized Cut',
        colorway: 'Acid Washed Graphite',
        aesthetic: '#AcidCyber #Gorpcore',
        summary: `Spotted on ${item.creatorHandle} (${item.locationViews}). Identified via visual radar with 98.4% match confidence.`,
        confidence: 0.984,
        keyFeatures: ['Heavyweight 500GSM fleece', 'Custom distress finish', 'Double layered hood'],
      },
      priceAnalytics: {
        lowestPrice: item.price,
        lowestStore: 'Grailed',
        highestPrice: Math.round(item.price * 1.45),
        highestStore: 'Farfetch',
        savingsAmount: Math.round(item.price * 0.45),
        savingsPercentage: 31,
        averagePrice: Math.round(item.price * 1.2),
      },
      priceComparisons: [
        {
          id: 'pc-1',
          storeName: 'Grailed',
          price: item.price,
          originalPrice: Math.round(item.price * 1.35),
          currency: 'USD',
          productUrl: `https://www.grailed.com/shop?query=${encodeURIComponent(item.fullItemTitle)}`,
          condition: 'Mint / New',
          shippingInfo: 'Free shipping on orders over $100',
          deliveryEstimate: '2-4 business days',
          inStock: true,
          rating: 4.9,
          isLowestPrice: true,
          badge: 'BEST VALUE',
        },
        {
          id: 'pc-2',
          storeName: 'StockX',
          price: Math.round(item.price * 1.15),
          originalPrice: Math.round(item.price * 1.4),
          currency: 'USD',
          productUrl: `https://stockx.com/search?s=${encodeURIComponent(item.fullItemTitle)}`,
          condition: 'Deadstock (Brand New)',
          shippingInfo: '$14.95 verified authenticity',
          deliveryEstimate: '5-7 business days',
          inStock: true,
          rating: 4.8,
          isLowestPrice: false,
          badge: 'VERIFIED AUTHENTIC',
        },
        {
          id: 'pc-3',
          storeName: 'SSENSE',
          price: Math.round(item.price * 1.25),
          currency: 'USD',
          productUrl: `https://www.ssense.com/en-us/men?q=${encodeURIComponent(item.fullItemTitle)}`,
          condition: 'Brand New',
          shippingInfo: 'Express Delivery Available',
          deliveryEstimate: '2-3 business days',
          inStock: true,
          rating: 4.9,
          isLowestPrice: false,
        },
        {
          id: 'pc-4',
          storeName: 'Farfetch',
          price: Math.round(item.price * 1.45),
          currency: 'USD',
          productUrl: `https://www.farfetch.com/shopping/men/search/items.aspx?q=${encodeURIComponent(item.fullItemTitle)}`,
          condition: 'New in Box',
          shippingInfo: '$20 international courier',
          deliveryEstimate: '3-5 business days',
          inStock: true,
          rating: 4.7,
          isLowestPrice: false,
        },
        {
          id: 'pc-5',
          storeName: 'Amazon Fashion',
          price: Math.round(item.price * 1.1),
          currency: 'USD',
          productUrl: `https://www.amazon.com/s?k=${encodeURIComponent(item.fullItemTitle)}`,
          condition: 'New with tags',
          shippingInfo: 'Prime 1-day delivery',
          deliveryEstimate: 'Tomorrow',
          inStock: true,
          rating: 4.5,
          isLowestPrice: false,
        },
      ],
      recommendations: [
        {
          id: 'rec-1',
          title: 'Distressed Cyber Cargo Pants',
          brand: 'NEO_TOKYO',
          category: 'Pants',
          price: 180,
          storeName: 'SSENSE',
          productUrl: 'https://www.ssense.com/en-us/men?q=cyber+cargo+pants',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB-ncA0iV1daW3_E0n1TWXXer4EdVsgkr-be0aaeQSpkuScAW0sXpxrO1GCD6UcXNOPQoVNu_llPPVQlZobE72jBYgaanaHQIkbZ1ZzZfjRMcfNbX828HWgC3yzb7L-HWXhPS3oinPGC4M-koCZCr2qzfed5iTl834B1AArspoOYlJtjzxOjNNjFK4xk2LcdH5pS3KkY62G-hGDdv7jm7lJJSI_Z7Pscd2QUWrghvrnizEPzGKVx2Y',
          similarityPercentage: 96,
          aestheticTag: '#AcidCyber',
          reason: 'Same cyber-industrial aesthetic matching the silhouette',
        },
        {
          id: 'rec-2',
          title: 'Phantom Rig Puffer Jacket',
          brand: 'VOID_CORP',
          category: 'Outerwear',
          price: 240,
          storeName: 'StockX',
          productUrl: 'https://stockx.com/search?s=phantom+puffer+jacket',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDh9FUKc8WJkgupWNI9kB2mFGVkYR4SO7NQqOf19FMsEsVeG35StMuQtBt-OLQx9aGmKNniT2jeCvGXaliczlmHzaoic_Qpv4_U-1vWonSAOZkmCR9eNR4gbjKWJdu-IWN16HtALvOl-T_zvFtDbNgMCRL7Sxl7Exnup1_eVs2XZ2PCL38LyoGjMTWnkWKVjBLOOGGkfgsIDDEKXQQfDa6TTbpCjXv4GTcc_ngjphXQnNAobZCIoiQ',
          similarityPercentage: 94,
          aestheticTag: '#DeadstockArchive',
          reason: 'Complementary dark techwear outerwear with modular straps',
        },
        {
          id: 'rec-3',
          title: 'Acid Oversized Crewneck Sweater',
          brand: 'ARCHIVE_DEPT',
          category: 'Tops',
          price: 110,
          storeName: 'Grailed',
          productUrl: 'https://www.grailed.com/shop?query=oversized+acid+crewneck',
          imageUrl:
            'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
          similarityPercentage: 91,
          aestheticTag: '#GorpcoreGrunge',
          reason: 'Similar heavy washed pigment treatment at lower price point',
        },
        {
          id: 'rec-4',
          title: 'Titanium Shield Modular Sunglasses',
          brand: 'TEK_LABS',
          category: 'Accessories',
          price: 120,
          storeName: 'End Clothing',
          productUrl: 'https://www.endclothing.com/us/catalogsearch/result/?q=shield+sunglasses',
          imageUrl:
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80',
          similarityPercentage: 88,
          aestheticTag: '#AcidCyber',
          reason: 'Signature metallic accessory completing the outfit',
        },
      ],
      analyzedImageUrl: item.imageUrl,
    });
    setIsComparisonOpen(true);
  };

  // Handle successful image analysis from CameraScanModal
  const handleAnalysisComplete = (result: ArticleAnalysisResult, originalImg: string) => {
    setCurrentAnalysis({
      ...result,
      analyzedImageUrl: originalImg,
    });
    setIsScannerOpen(false);
    setIsComparisonOpen(true);
  };

  // Scan a garment triggered from Vault or Drop
  const handleScanGarmentByName = async (garmentName: string, imageUrl: string) => {
    setActiveVault(null);
    showToast(`ACQUIRING RADAR LOCK ON ${garmentName.toUpperCase()}...`);

    try {
      const res = await fetch('/api/analyze-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userNotes: garmentName, sampleUrl: imageUrl }),
      });
      const data = await res.json();
      if (data.data) {
        setCurrentAnalysis({
          ...data.data,
          analyzedImageUrl: imageUrl,
        });
        setIsComparisonOpen(true);
      }
    } catch {
      // Fallback
      handleOpenItemComparison({
        id: 'vault-scanned',
        creatorHandle: 'vault_archive',
        creatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6KAGd1yv5XzfliGqhLBwYj0IuVo8SRtbO5KRvxAwfGSN7bE_i_SH5pBSk6fWIr7kFRk_1DzouuZXGd_NTJqffRMDDSzK1IEzhEg1d9n1fD1bemQ-mtqPX0JD-0u10kOvRTz2HAV4bAJ-o3vFqSk8uhnMkg4HrQZeOccVCyDn3DuDoZuV-Gvzr6NJUK_SGgEro4Js8cmBGAzhL_QjvCiogeyrce15n2qGnbeoXF1K4AbjkE60l9oU',
        locationViews: 'VAULT CURATION // VERIFIED',
        likes: '1.2K',
        imageUrl,
        badge: 'CURATED',
        tagNumber: '01',
        taggedLabel: 'VAULT GARMENT',
        itemTitle: garmentName,
        fullItemTitle: garmentName,
        price: 160,
        aesthetic: '#AcidCyber',
        comparisons: [],
        recommendations: [],
        creator: 'Vault Archive',
      });
    }
  };

  // Add item to bag
  const handleAddToBag = (item: {
    itemTitle: string;
    storeName: string;
    price: number;
    originalPrice?: number;
    size: string;
    imageUrl: string;
    productUrl: string;
  }) => {
    setBagItems((prev) => [
      ...prev,
      {
        id: `bag-${Date.now()}`,
        ...item,
        quantity: 1,
      },
    ]);
  };

  // Remove item from bag
  const handleRemoveBagItem = (id: string) => {
    setBagItems((prev) => prev.filter((i) => i.id !== id));
    showToast('REMOVED ITEM FROM BAG');
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  // Filter items based on selectedTag or searchQuery
  const filteredHeatItems = heatItems.filter((item) => {
    if (isUgcFiltered && !item.badge.includes('HOT')) return false;
    if (selectedTag) {
      const cleanTag = selectedTag.replace('#', '').toLowerCase();
      const matchTag =
        item.itemTitle.toLowerCase().includes(cleanTag) ||
        item.fullItemTitle.toLowerCase().includes(cleanTag) ||
        item.aesthetic.toLowerCase().includes(cleanTag);
      if (!matchTag) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.itemTitle.toLowerCase().includes(q) ||
        item.fullItemTitle.toLowerCase().includes(q) ||
        item.creatorHandle.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-body-md text-body-md antialiased pb-28 select-none">
      {/* 1. Header (Stitch original fixed header with drop timer, profile, brand logo) */}
      <Header
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenBag={() => setIsBagOpen(true)}
        bagCount={bagItems.length}
      />

      {/* 2. Top Marquee Ribbon */}
      <div className="pt-16">
        <MarqueeRibbon />
      </div>

      {/* 3. Main View Switcher */}
      {activeTab === 'explore' && (
        <main className="px-gutter max-w-5xl mx-auto flex flex-col gap-space-md pt-4">
          {/* Visual Search & Scan Hero Container */}
          <SearchHero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenScanner={() => setIsScannerOpen(true)}
            onClearSearch={() => setSearchQuery('')}
          />

          {/* Trending Aesthetics Sticker Tags */}
          <TrendingTags
            selectedTag={selectedTag}
            onSelectTag={(tag) => {
              setSelectedTag(selectedTag === tag ? null : tag);
              if (tag) showToast(`FILTERED: ${tag}`);
            }}
          />

          {/* Community Heat Feed (Exact Stitch layout & components) */}
          <CommunityHeatFeed
            items={filteredHeatItems}
            onOpenItemModal={handleOpenItemComparison}
            onLikeItem={handleLikeItem}
            onFilterUGC={handleFilterUgc}
          />

          {/* Curated Aesthetic Vaults (Mosaic Grid) */}
          <CuratedVaults
            vaults={CURATED_VAULTS}
            onSelectVault={(vault) => setActiveVault(vault)}
          />

          {/* Visual Search Floating Camera Action Card */}
          <SnapToIdentifyCard onOpenScanner={() => setIsScannerOpen(true)} />
        </main>
      )}

      {activeTab === 'drops' && (
        <main className="pt-4">
          <DropsView
            onScanArticle={(name, img) => handleScanGarmentByName(name, img)}
            onShowToast={showToast}
          />
        </main>
      )}

      {activeTab === 'vault' && (
        <main className="px-gutter max-w-5xl mx-auto flex flex-col gap-space-md pt-4">
          <CuratedVaults
            vaults={CURATED_VAULTS}
            onSelectVault={(vault) => setActiveVault(vault)}
          />
          <SnapToIdentifyCard onOpenScanner={() => setIsScannerOpen(true)} />
        </main>
      )}

      {/* 4. Bottom Navigation Bar */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'bag') {
            setIsBagOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        bagCount={bagItems.length}
      />

      {/* 5. Modals & Drawers */}
      {/* Optical Camera / Image Upload Scanner */}
      <CameraScanModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
        initialQuery={searchQuery}
        onShowToast={showToast}
      />

      {/* Multi-Store Price Comparison Modal */}
      <PriceComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        analysis={currentAnalysis}
        onAddToBag={handleAddToBag}
        onCompareRecommendation={(rec: SimilarArticleRecommendation) => {
          handleScanGarmentByName(rec.title, rec.imageUrl);
        }}
        onShowToast={showToast}
      />

      {/* Vault Details Modal */}
      <VaultDetailsModal
        vault={activeVault}
        onClose={() => setActiveVault(null)}
        onScanGarment={handleScanGarmentByName}
      />

      {/* Shopping Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onRemoveItem={handleRemoveBagItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearBag={() => {
          setBagItems([]);
          showToast('BAG EMPTIED');
        }}
        onShowToast={showToast}
      />

      {/* Micro-interaction Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
