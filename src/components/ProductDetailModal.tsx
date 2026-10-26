import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { WATCH_PRODUCTS } from '../data/products';
import { InteractiveWatchDial } from './InteractiveWatchDial';
import { WatchVariant } from '../types/watch';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductId,
    setSelectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    lumeMode,
    setLumeMode
  } = useWatch();

  const product = WATCH_PRODUCTS.find((p) => p.id === selectedProductId);

  const [selectedVariant, setSelectedVariant] = useState<WatchVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0); // 0 = Live Interactive Dial, 1+ = High-res angle imagery
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      setActiveAngleIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProductId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProductId]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const dialType =
    product.collection === 'Heritage'
      ? 'heritage'
      : product.collection === 'Vanguard'
      ? 'vanguard'
      : product.collection === 'Élite'
      ? 'elite'
      : 'classic';

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const relatedProducts = WATCH_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-[#080808] text-[#F5F3EF]"
      >
        {/* Sticky Top Bar within Product View */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#080808]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#929292]">
            <button
              onClick={() => setSelectedProductId(null)}
              className="hover:text-white transition-colors"
            >
              Collections
            </button>
            <span>/</span>
            <span className="text-[#C6A66B]">{product.collection}</span>
            <span>/</span>
            <span className="text-white hidden sm:inline">{product.name}</span>
          </div>

          <button
            onClick={() => setSelectedProductId(null)}
            aria-label="Close Product View"
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-[#929292] hover:text-white transition-all cursor-pointer"
          >
            <span>Close (ESC)</span>
            <X size={16} />
          </button>
        </div>

        {/* Main PDP Layout */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Interactive Watch Gallery (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Main Visual Display */}
              <div className="relative min-h-[460px] sm:min-h-[540px] bg-[#0E0E12] border border-white/10 rounded-sm flex items-center justify-center p-8 overflow-hidden">
                {/* Radial Lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

                {activeAngleIndex === 0 ? (
                  /* Angle 0: Live Interactive Mechanical Watch Dial */
                  <div className="relative z-10 flex flex-col items-center">
                    <InteractiveWatchDial type={dialType} size={360} interactive={true} />
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#929292]">
                        Live Mechanical Sweep (28,800 vph)
                      </span>
                      <button
                        onClick={() => setLumeMode((prev) => !prev)}
                        className="text-[11px] font-mono text-[#C6A66B] hover:underline flex items-center gap-1"
                      >
                        <Sparkles size={12} />
                        {lumeMode ? 'Disable Lume' : 'Inspect Dial Lume'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Photographic Angle */
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src={product.angles[activeAngleIndex - 1] || product.primaryImage}
                      alt={`${product.name} angle inspection`}
                      referrerPolicy="no-referrer"
                      className="max-h-[460px] object-contain drop-shadow-2xl rounded-sm"
                    />
                  </div>
                )}
              </div>

              {/* Angle Selector Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveAngleIndex(0)}
                  className={`p-3 rounded-sm border text-left flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeAngleIndex === 0
                      ? 'border-[#C6A66B] bg-[#18181F]'
                      : 'border-white/10 hover:border-white/25 bg-[#0E0E12]'
                  }`}
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A66B]">
                    Live Dial
                  </span>
                  <span className="text-[10px] text-[#929292] font-mono">Real-Time</span>
                </button>

                {product.angles.slice(0, 3).map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAngleIndex(idx + 1)}
                    className={`relative h-20 rounded-sm border overflow-hidden transition-all cursor-pointer ${
                      activeAngleIndex === idx + 1
                        ? 'border-[#C6A66B] ring-1 ring-[#C6A66B]'
                        : 'border-white/10 hover:border-white/25 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt="Thumbnail view"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8 bg-[#0D0D11] p-8 border border-white/10 rounded-sm">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#929292] mb-2">
                  <span className="uppercase tracking-[0.2em] text-[#C6A66B]">
                    {product.collection} Lineage
                  </span>
                  <span>{product.specs.calibre}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F3EF] tracking-tight mb-2">
                  {product.name}
                </h1>

                <div className="text-2xl font-mono text-[#F5F3EF] tabular-nums font-semibold mb-4">
                  ₹{product.priceINR.toLocaleString('en-IN')}
                  <span className="text-xs font-mono font-normal text-[#929292] ml-2">
                    (Inclusive of all taxes & insurance)
                  </span>
                </div>

                <p className="text-sm text-[#929292] font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variant Selector */}
              {product.variants.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#929292] mb-3">
                    Selected Variant: <span className="text-white font-medium">{selectedVariant?.name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-sm border text-left flex items-center justify-between text-xs font-mono transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'border-[#C6A66B] bg-[#1A1A22] text-[#F5F3EF]'
                            : 'border-white/10 hover:border-white/25 text-[#929292] bg-[#101014]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: v.dialColor }}
                          />
                          <span>{v.name}</span>
                        </div>
                        <span className="text-[10px] text-[#C6A66B] uppercase tracking-wider">
                          {selectedVariant?.id === v.id ? 'Selected' : 'Select'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Primary Buy Action */}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/15 rounded-sm bg-[#141418]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-sm text-[#929292] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-mono font-medium text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                      className="px-3.5 py-2.5 text-sm text-[#929292] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-sm text-xs font-mono uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedNotice
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#C6A66B] hover:bg-white text-[#080808]'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check size={16} />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        <span>Add to Bag · ₹{(product.priceINR * quantity).toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist Timepiece"
                    className={`p-3.5 rounded-sm border transition-all ${
                      wishlisted
                        ? 'border-[#C6A66B] text-[#C6A66B] bg-[#C6A66B]/10'
                        : 'border-white/15 text-[#929292] hover:text-white'
                    }`}
                  >
                    <Heart size={18} className={wishlisted ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Delivery & Warranty Guarantees */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-[#929292]">
                  <div className="flex items-center gap-1.5">
                    <Truck size={13} className="text-[#C6A66B]" />
                    <span>Free Insured Transit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#C6A66B]" />
                    <span>5-Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw size={13} className="text-[#C6A66B]" />
                    <span>14-Day Returns</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C6A66B] mb-4">
                  Calibre & Case Specifications
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-mono">
                  <div>
                    <span className="text-[#929292]">Movement:</span>
                    <p className="text-[#F5F3EF]">{product.specs.movementType}</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Power Reserve:</span>
                    <p className="text-[#F5F3EF]">{product.specs.powerReserve}</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Jewel Count:</span>
                    <p className="text-[#F5F3EF]">{product.specs.jewels} Synthetic Rubies</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Frequency:</span>
                    <p className="text-[#F5F3EF]">{product.specs.frequency}</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Diameter:</span>
                    <p className="text-[#F5F3EF]">{product.specs.caseDiameter}</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Thickness:</span>
                    <p className="text-[#F5F3EF]">{product.specs.caseThickness}</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Crystal:</span>
                    <p className="text-[#F5F3EF]">{product.specs.crystal}</p>
                  </div>
                  <div>
                    <span className="text-[#929292]">Water Rating:</span>
                    <p className="text-[#F5F3EF]">{product.specs.waterResistance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Timepieces Strip */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-2">
              Discover Alternate Calibres
            </div>
            <h3 className="text-2xl font-serif text-[#F5F3EF] mb-8">
              COMPANION CREATIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedProductId(rel.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 bg-[#0E0E12] border border-white/10 hover:border-[#C6A66B]/50 transition-all rounded-sm flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#C6A66B] uppercase tracking-wider">
                      {rel.collection}
                    </span>
                    <h4 className="text-sm font-serif text-[#F5F3EF] group-hover:text-[#C6A66B] transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs font-mono text-[#929292] mt-1">
                      ₹{rel.priceINR.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-[#929292] group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
