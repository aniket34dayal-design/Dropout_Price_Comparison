export interface PriceComparisonItem {
  id: string;
  storeName: string;
  storeBadgeColor: string;
  productTitle: string;
  price: number;
  currency: string;
  originalPrice?: number;
  availability: 'IN_STOCK' | 'LOW_STOCK' | 'VERIFIED_AUTHENTIC' | 'PRE_OWNED';
  condition: string;
  shippingInfo: string;
  productUrl: string;
  isLowestPrice: boolean;
  trustedSeller: boolean;
  rating: number;
  deliveryEstimate: string;
}

export interface SimilarArticleRecommendation {
  id: string;
  title: string;
  brand: string;
  price: number;
  imageUrl: string;
  storeName: string;
  productUrl: string;
  similarityPercentage: number;
  aestheticTag: string;
  category: string;
  reason?: string;
}

export interface ArticleAnalysisResult {
  identifiedItem: {
    name: string;
    brand: string;
    category: string;
    colorway: string;
    aesthetic: string;
    materialOrStyle: string;
    confidence: number;
    estimatedPriceRange: {
      min: number;
      max: number;
    };
    keyFeatures: string[];
    summary: string;
  };
  priceComparisons: PriceComparisonItem[];
  recommendations: SimilarArticleRecommendation[];
  priceAnalytics: {
    lowestPrice: number;
    lowestStore: string;
    highestPrice: number;
    highestStore: string;
    averagePrice: number;
    savingsAmount: number;
    savingsPercentage: number;
    authenticityGuarantee: string;
  };
  analyzedImageUrl?: string;
}

export interface CommunityHeatItem {
  id: string;
  creator: string;
  creatorHandle: string;
  creatorAvatar: string;
  locationViews: string;
  likes: string;
  isLiked?: boolean;
  imageUrl: string;
  badge: string;
  badgeType?: 'hot' | 'vault' | 'pieces';
  tagNumber: string;
  taggedLabel: string;
  itemTitle: string;
  fullItemTitle: string;
  price: number;
  stockAlert?: string;
  aesthetic: string;
  comparisons: PriceComparisonItem[];
  recommendations: SimilarArticleRecommendation[];
}

export interface VaultTheme {
  id: string;
  vol: string;
  title: string;
  subtitle: string;
  followerCount: string;
  garmentsCount: string;
  imageUrl: string;
  badgeText: string;
  badgeColorClass: string;
  accentColor: string;
  icon: string;
  description: string;
  garments: {
    id: string;
    name: string;
    brand: string;
    price: number;
    bestStore: string;
    imageUrl: string;
    url: string;
  }[];
}

export interface BagItem {
  id: string;
  itemTitle: string;
  storeName: string;
  price: number;
  originalPrice?: number;
  size: string;
  imageUrl: string;
  quantity: number;
  productUrl: string;
}
