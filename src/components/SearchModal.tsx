import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { WATCH_PRODUCTS } from '../data/products';
import { InteractiveWatchDial } from './InteractiveWatchDial';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProductId
  } = useWatch();

  const [query, setQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = WATCH_PRODUCTS.filter((product) => {
    if (selectedCollection !== 'All' && product.collection !== selectedCollection) {
      return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.collection.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.specs.calibre.toLowerCase().includes(q) ||
      product.specs.strapMaterial.toLowerCase().includes(q)
    );
  });

  const getDialType = (col: string): 'heritage' | 'vanguard' | 'elite' | 'classic' => {
    if (col === 'Heritage') return 'heritage';
    if (col === 'Vanguard') return 'vanguard';
    if (col === 'Élite') return 'elite';
    return 'classic';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Search Dialog */}
        <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl bg-[#0F0F14] border border-white/10 rounded-sm shadow-2xl overflow-hidden text-[#F5F3EF] z-10 my-8"
          >
            {/* Search Input Bar */}
            <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-[#14141A]">
              <Search size={22} className="text-[#C6A66B] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by timepiece name, calibre (e.g. CHR-2804), collection, or strap..."
                autoFocus
                className="w-full bg-transparent text-base sm:text-lg font-serif placeholder:font-sans placeholder:text-xs placeholder:tracking-wider placeholder:text-[#929292] text-white focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#929292] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Collection Filter Chips */}
            <div className="px-6 py-3 border-b border-white/5 bg-[#0C0C10] flex items-center gap-2 overflow-x-auto text-xs font-mono">
              <span className="text-[#929292] uppercase tracking-wider text-[11px] shrink-0">Filter:</span>
              {['All', 'Heritage', 'Vanguard', 'Élite', 'Classic'].map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`px-3 py-1 rounded-sm uppercase tracking-wider text-[11px] shrink-0 transition-colors ${
                    selectedCollection === col
                      ? 'bg-[#C6A66B] text-[#080808] font-bold'
                      : 'text-[#929292] hover:text-white bg-white/5'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {results.length === 0 ? (
                <div className="py-12 text-center text-[#929292]">
                  <p className="text-base font-serif text-[#F5F3EF] mb-1">No timepieces found</p>
                  <p className="text-xs font-mono">Try searching "Heritage", "Titanium", "Gold", or "Automatic"</p>
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setIsSearchOpen(false);
                    }}
                    className="p-4 rounded-sm bg-[#15151C] border border-white/5 hover:border-[#C6A66B]/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {/* Mini Dial */}
                      <div className="w-14 h-14 rounded bg-[#0A0A0D] border border-white/10 flex items-center justify-center shrink-0">
                        <InteractiveWatchDial
                          type={getDialType(product.collection)}
                          size={46}
                          interactive={false}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#C6A66B] uppercase tracking-wider">
                          <span>{product.collection}</span>
                          <span>·</span>
                          <span>{product.specs.calibre}</span>
                        </div>
                        <h4 className="text-base font-serif text-[#F5F3EF] group-hover:text-[#C6A66B] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#929292] font-mono">
                          {product.specs.caseDiameter} · {product.specs.strapMaterial}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#929292] block">Price</span>
                        <span className="text-sm font-mono text-[#F5F3EF] font-semibold tabular-nums">
                          ₹{product.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <ArrowUpRight size={16} className="text-[#929292] group-hover:text-[#C6A66B] transition-colors" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
