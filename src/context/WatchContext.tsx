import React, { createContext, useContext, useState, useEffect } from 'react';
import { WatchProduct, WatchVariant, CartItem } from '../types/watch';
import { WATCH_PRODUCTS } from '../data/products';

interface WatchContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: WatchProduct, variant?: WatchVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalINR: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // UI States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // Watch Mechanical Simulation
  lumeMode: boolean;
  setLumeMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  sweepSecondMode: boolean;
  setSweepSecondMode: (val: boolean | ((prev: boolean) => boolean)) => void;

  // Filter & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCollection: string;
  setActiveCollection: (col: string) => void;
  sortOption: 'featured' | 'price-asc' | 'price-desc';
  setSortOption: (sort: 'featured' | 'price-asc' | 'price-desc') => void;

  // Quick navigation helper
  scrollToSection: (sectionId: string) => void;
}

const WatchContext = createContext<WatchContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'chronova_cart_v1';
const WISHLIST_STORAGE_KEY = 'chronova_wishlist_v1';

export const WatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Initialize Wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Watch Mechanical Simulator State
  const [lumeMode, setLumeMode] = useState<boolean>(false);
  const [sweepSecondMode, setSweepSecondMode] = useState<boolean>(true); // high-beat mechanical sweep

  // Filtering & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState('All');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const addToCart = (product: WatchProduct, variant?: WatchVariant, quantity = 1) => {
    const chosenVariant = variant || product.variants[0];
    const itemId = `${product.id}-${chosenVariant.id}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedVariant: chosenVariant,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotalINR = cart.reduce(
    (total, item) => total + item.product.priceINR * item.quantity,
    0
  );

  const scrollToSection = (sectionId: string) => {
    setIsMobileNavOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <WatchContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotalINR,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        selectedProductId,
        setSelectedProductId,
        lumeMode,
        setLumeMode,
        sweepSecondMode,
        setSweepSecondMode,
        searchQuery,
        setSearchQuery,
        activeCollection,
        setActiveCollection,
        sortOption,
        setSortOption,
        scrollToSection
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};

export const useWatch = () => {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error('useWatch must be used within a WatchProvider');
  }
  return context;
};
