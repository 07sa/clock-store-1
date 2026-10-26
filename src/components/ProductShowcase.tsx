import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check, SlidersHorizontal } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { WATCH_PRODUCTS } from '../data/products';
import { WatchProduct } from '../types/watch';
import { InteractiveWatchDial } from './InteractiveWatchDial';

export const ProductShowcase: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProductId,
    activeCollection,
    setActiveCollection,
    sortOption,
    setSortOption,
    searchQuery
  } = useWatch();

  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filter & Sort logic
  const filteredProducts = WATCH_PRODUCTS.filter((product) => {
    // Collection filter
    if (activeCollection !== 'All' && product.collection !== activeCollection) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCol = product.collection.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCalibre = product.specs.calibre.toLowerCase().includes(q);
      if (!matchName && !matchCol && !matchDesc && !matchCalibre) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.priceINR - b.priceINR;
    if (sortOption === 'price-desc') return b.priceINR - a.priceINR;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const handleQuickAdd = (e: React.MouseEvent, product: WatchProduct) => {
    e.stopPropagation();
    addToCart(product, product.variants[0], 1);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const getDialType = (col: string): 'heritage' | 'vanguard' | 'elite' | 'classic' => {
    if (col === 'Heritage') return 'heritage';
    if (col === 'Vanguard') return 'vanguard';
    if (col === 'Élite') return 'elite';
    return 'classic';
  };

  return (
    <section id="products-showcase" className="py-24 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-2">
              Curated Masterpieces
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#F5F3EF]">
              THE DEFINING FEW.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#929292] font-light leading-relaxed">
            Four signature creations representing distinct calibres, metallurgical finishing,
            and chronometric certifications. Sample timepieces with transparent INR pricing.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Collection Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Heritage', 'Vanguard', 'Élite', 'Classic'].map((col) => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`px-4 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeCollection === col
                    ? 'bg-[#C6A66B] text-[#080808] font-semibold'
                    : 'bg-white/5 text-[#929292] hover:text-[#F5F3EF] hover:bg-white/10 border border-white/5'
                }`}
              >
                {col}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#929292]">
            <SlidersHorizontal size={14} className="text-[#C6A66B]" />
            <span>Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-[#141418] text-[#F5F3EF] border border-white/10 px-3 py-1.5 rounded-sm text-xs font-mono focus:outline-none focus:border-[#C6A66B]"
            >
              <option value="featured">Featured Chronometry</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          /* Polished Empty State */
          <div className="py-20 text-center border border-dashed border-white/10 rounded-sm p-8 bg-[#0E0E12]">
            <p className="text-lg font-serif text-[#F5F3EF] mb-2">No timepieces matched your criteria.</p>
            <p className="text-xs text-[#929292] font-mono mb-6">
              Try adjusting your active filter or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCollection('All');
              }}
              className="px-6 py-2.5 bg-[#C6A66B] text-[#080808] text-xs font-mono uppercase tracking-widest font-semibold rounded-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isHovered = hoveredProductId === product.id;
              const wishlisted = isWishlisted(product.id);
              const isAdded = addedAnimationId === product.id;
              const dialType = getDialType(product.collection);

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="group relative flex flex-col bg-[#0D0D11] border border-white/10 hover:border-[#C6A66B]/50 transition-all duration-500 rounded-sm overflow-hidden cursor-pointer"
                >
                  {/* Top Badges / Metadata */}
                  <div className="p-4 pb-0 flex items-center justify-between text-xs font-mono text-[#929292]">
                    <span className="uppercase tracking-widest text-[#C6A66B]">
                      {product.collection}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      aria-label="Save to Wishlist"
                      className={`p-1.5 rounded-full border transition-all ${
                        wishlisted
                          ? 'border-[#C6A66B] bg-[#C6A66B]/10 text-[#C6A66B]'
                          : 'border-white/10 text-[#929292] hover:text-white hover:border-white/30'
                      }`}
                    >
                      <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Product Visual Container (Interactive Dial & Image Sequence) */}
                  <div className="relative h-64 sm:h-72 w-full flex items-center justify-center p-6 overflow-hidden">
                    {/* Layer 1: Background Subtle Light Reflection */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Layer 2: Interactive Scalable SVG Watch Dial (Crisp, Never Broken) */}
                    <div className="relative z-10 transition-transform duration-700 group-hover:scale-105">
                      <InteractiveWatchDial
                        type={dialType}
                        size={210}
                        interactive={false}
                      />
                    </div>

                    {/* Quick Action Overlay on Hover */}
                    <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F3EF] bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-white/10 flex items-center gap-1">
                        <Eye size={11} /> Quick View
                      </span>
                      <span className="text-[10px] font-mono text-[#C6A66B] bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-[#C6A66B]/40">
                        {product.specs.caseDiameter}
                      </span>
                    </div>
                  </div>

                  {/* Product Details & Purchase Trigger */}
                  <div className="p-5 pt-3 flex flex-col justify-between flex-1 border-t border-white/5">
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="text-[11px] font-mono text-[#929292] mb-1">
                        {product.specs.calibre}
                      </div>

                      <h3 className="text-base font-serif text-[#F5F3EF] group-hover:text-[#C6A66B] transition-colors mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-[#929292] font-light line-clamp-2 leading-relaxed mb-4">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price in INR & Add to Bag */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#929292]">Price</div>
                        <div className="text-base font-mono font-medium text-[#F5F3EF] tabular-nums">
                          ₹{product.priceINR.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`px-3.5 py-2 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/10 hover:bg-[#C6A66B] hover:text-[#080808] text-[#F5F3EF] border border-white/10 hover:border-[#C6A66B]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
