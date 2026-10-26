import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { InteractiveWatchDial } from './InteractiveWatchDial';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotalINR,
    cartCount,
    clearCart,
    scrollToSection
  } = useWatch();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleSimulatedCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const fakeOrderId = 'CHR-' + Math.floor(100000 + Math.random() * 900000);
      setOrderComplete(fakeOrderId);
      clearCart();
    }, 1500);
  };

  const getDialType = (col: string): 'heritage' | 'vanguard' | 'elite' | 'classic' => {
    if (col === 'Heritage') return 'heritage';
    if (col === 'Vanguard') return 'vanguard';
    if (col === 'Élite') return 'elite';
    return 'classic';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsCartOpen(false);
            setOrderComplete(null);
          }}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0D0D11] border-l border-white/10 shadow-2xl flex flex-col justify-between text-[#F5F3EF]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={18} className="text-[#C6A66B]" />
              <h3 className="text-base font-serif tracking-wider uppercase text-[#F5F3EF]">
                Shopping Bag
              </h3>
              <span className="text-xs font-mono text-[#929292]">({cartCount})</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderComplete(null);
              }}
              aria-label="Close Shopping Bag"
              className="p-1.5 rounded-sm text-[#929292] hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderComplete ? (
              /* Order Confirmation Success State */
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-serif text-[#F5F3EF] mb-2">
                  Acquisition Reserved
                </h4>
                <p className="text-xs font-mono text-[#C6A66B] uppercase tracking-wider mb-2">
                  Order Reference: {orderComplete}
                </p>
                <p className="text-xs text-[#929292] font-light max-w-xs leading-relaxed mb-6">
                  Thank you for choosing CHRONOVA. Your timepiece reservation has been logged.
                  A private concierge will reach out via email to coordinate white-glove insured delivery.
                </p>
                <div className="p-3 bg-white/5 border border-white/10 rounded text-[11px] font-mono text-[#929292] mb-6">
                  Note: Demo checkout simulation. No real payment charged.
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setOrderComplete(null);
                  }}
                  className="px-6 py-2.5 bg-[#C6A66B] text-[#080808] text-xs font-mono uppercase tracking-widest font-semibold rounded-sm cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart State */
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#929292] mb-4">
                  <ShoppingBag size={24} />
                </div>
                <h4 className="text-lg font-serif text-[#F5F3EF] mb-2">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#929292] font-mono max-w-xs leading-relaxed mb-6">
                  Explore our curated collections of mechanical and architectural timepieces.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToSection('products-showcase');
                  }}
                  className="px-6 py-2.5 bg-[#C6A66B] text-[#080808] text-xs font-mono uppercase tracking-widest font-semibold rounded-sm cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              /* Itemized List */
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-sm bg-[#121217] border border-white/5"
                >
                  {/* Miniature Vector Watch Dial Representation */}
                  <div className="w-20 h-20 bg-[#090A0D] border border-white/10 rounded flex items-center justify-center shrink-0">
                    <InteractiveWatchDial
                      type={getDialType(item.product.collection)}
                      size={65}
                      interactive={false}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#C6A66B] uppercase tracking-wider block">
                            {item.product.collection}
                          </span>
                          <h5 className="text-sm font-serif text-[#F5F3EF] line-clamp-1">
                            {item.product.name}
                          </h5>
                          <span className="text-[11px] font-mono text-[#929292] block">
                            {item.selectedVariant.name}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-[#929292] hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/15 rounded bg-[#18181E] text-xs font-mono">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#929292] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#929292] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-mono font-medium text-[#F5F3EF] tabular-nums">
                        ₹{(item.product.priceINR * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-white/10 bg-[#0E0E12] space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#929292]">
                  <span>Subtotal</span>
                  <span className="text-[#F5F3EF] tabular-nums">
                    ₹{cartTotalINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#929292]">
                  <span>Insured Express Courier</span>
                  <span className="text-emerald-400">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#F5F3EF] pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-[#C6A66B] tabular-nums">
                    ₹{cartTotalINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[#929292]">
                <ShieldCheck size={14} className="text-[#C6A66B] shrink-0" />
                <span>Encrypted Demo Checkout · 5-Year International Atelier Warranty</span>
              </div>

              <button
                onClick={handleSimulatedCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-[#C6A66B] hover:bg-white text-[#080808] transition-all rounded-sm text-xs font-mono uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                {isCheckingOut ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <>
                    <span>Proceed to Concierge Checkout</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
