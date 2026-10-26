import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { COLLECTIONS_DATA } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    wishlist,
    lumeMode,
    setLumeMode,
    scrollToSection,
    isMobileNavOpen,
    setIsMobileNavOpen,
    setActiveCollection,
    setSelectedProductId
  } = useWatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCollectionClick = (collectionName: string) => {
    setActiveCollection(collectionName);
    setIsCollectionsHovered(false);
    scrollToSection('products-showcase');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-[#F5F3EF] hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0"
          >
            CHRONOVA
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#929292]">
            {/* Collections with Mega Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsCollectionsHovered(true)}
              onMouseLeave={() => setIsCollectionsHovered(false)}
            >
              <button
                onClick={() => {
                  setActiveCollection('All');
                  scrollToSection('collections-showcase');
                }}
                className="hover:text-[#F5F3EF] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:outline-none"
              >
                <span>Collections</span>
              </button>

              {/* Collections Dropdown Panel */}
              {isCollectionsHovered && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[460px] bg-[#121214] border border-white/10 p-5 rounded-lg shadow-2xl mt-1 backdrop-blur-xl">
                  <div className="text-[11px] font-mono tracking-widest text-[#C6A66B] uppercase mb-3">
                    Curated Lineage
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {COLLECTIONS_DATA.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => handleCollectionClick(col.name)}
                        className="text-left p-3 rounded-md bg-[#18181C] hover:bg-[#202026] border border-white/5 hover:border-[#C6A66B]/40 transition-all group"
                      >
                        <div className="text-sm font-serif text-[#F5F3EF] group-hover:text-[#C6A66B] transition-colors mb-1">
                          {col.name}
                        </div>
                        <div className="text-[10px] text-[#929292] line-clamp-2 leading-relaxed">
                          {col.tagline}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setActiveCollection('Vanguard');
                scrollToSection('products-showcase');
              }}
              className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap shrink-0"
            >
              Men
            </button>

            <button
              onClick={() => {
                setActiveCollection('Heritage');
                scrollToSection('products-showcase');
              }}
              className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap shrink-0"
            >
              Women
            </button>

            <button
              onClick={() => scrollToSection('craftsmanship')}
              className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap shrink-0"
            >
              Craftsmanship
            </button>

            <button
              onClick={() => scrollToSection('brand-story')}
              className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap shrink-0"
            >
              Our Story
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Lume Mode, Wishlist, Bag) */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Lume Night Mode Toggle */}
            <button
              onClick={() => setLumeMode((prev) => !prev)}
              aria-label="Toggle Dial Lume Night Mode"
              title="Toggle Super-LumiNova Night Mode"
              className={`p-2 rounded-full border transition-all ${
                lumeMode
                  ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-400 shadow-[0_0_12px_rgba(43,228,161,0.4)]'
                  : 'border-white/10 hover:border-white/30 text-[#929292] hover:text-[#F5F3EF]'
              }`}
            >
              {lumeMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Timepieces"
              className="p-2 text-[#929292] hover:text-[#F5F3EF] transition-colors"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => {
                scrollToSection('products-showcase');
              }}
              aria-label="View Wishlist"
              className="relative p-2 text-[#929292] hover:text-[#F5F3EF] transition-colors hidden sm:block"
            >
              <Heart size={18} className={wishlist.length > 0 ? 'text-[#C6A66B] fill-[#C6A66B]/20' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C6A66B]" />
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#C6A66B]/50 transition-all text-[#F5F3EF] text-xs font-mono"
            >
              <ShoppingBag size={16} className="text-[#C6A66B]" />
              <span className="tabular-nums font-medium">{cartCount}</span>
            </button>

            {/* Mobile Nav Hamburger */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-[#929292] hover:text-[#F5F3EF] lg:hidden"
            >
              {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-8 pt-24 lg:hidden">
          <div className="flex flex-col gap-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C6A66B] mb-2">
              Navigation
            </div>
            <button
              onClick={() => {
                scrollToSection('hero');
              }}
              className="text-left text-2xl font-serif text-[#F5F3EF] hover:text-[#C6A66B] transition-colors flex items-center justify-between"
            >
              <span>Atelier Home</span>
              <ChevronRight size={18} className="text-[#929292]" />
            </button>
            <button
              onClick={() => {
                setActiveCollection('All');
                scrollToSection('collections-showcase');
              }}
              className="text-left text-2xl font-serif text-[#F5F3EF] hover:text-[#C6A66B] transition-colors flex items-center justify-between"
            >
              <span>Collections</span>
              <ChevronRight size={18} className="text-[#929292]" />
            </button>
            <button
              onClick={() => {
                setActiveCollection('Vanguard');
                scrollToSection('products-showcase');
              }}
              className="text-left text-2xl font-serif text-[#F5F3EF] hover:text-[#C6A66B] transition-colors flex items-center justify-between"
            >
              <span>Men's Timepieces</span>
              <ChevronRight size={18} className="text-[#929292]" />
            </button>
            <button
              onClick={() => {
                setActiveCollection('Heritage');
                scrollToSection('products-showcase');
              }}
              className="text-left text-2xl font-serif text-[#F5F3EF] hover:text-[#C6A66B] transition-colors flex items-center justify-between"
            >
              <span>Women's Lineage</span>
              <ChevronRight size={18} className="text-[#929292]" />
            </button>
            <button
              onClick={() => scrollToSection('craftsmanship')}
              className="text-left text-2xl font-serif text-[#F5F3EF] hover:text-[#C6A66B] transition-colors flex items-center justify-between"
            >
              <span>Craftsmanship</span>
              <ChevronRight size={18} className="text-[#929292]" />
            </button>
            <button
              onClick={() => scrollToSection('brand-story')}
              className="text-left text-2xl font-serif text-[#F5F3EF] hover:text-[#C6A66B] transition-colors flex items-center justify-between"
            >
              <span>Our Story</span>
              <ChevronRight size={18} className="text-[#929292]" />
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setLumeMode((prev) => !prev)}
              className="text-xs uppercase tracking-wider font-mono text-[#929292] hover:text-white flex items-center gap-2"
            >
              {lumeMode ? <Sun size={14} /> : <Moon size={14} />}
              <span>{lumeMode ? 'Lume Glow: Active' : 'Lume Glow: Off'}</span>
            </button>
            <div className="text-xs font-mono text-[#C6A66B]">
              CHRONOVA ATELIER
            </div>
          </div>
        </div>
      )}
    </>
  );
};
