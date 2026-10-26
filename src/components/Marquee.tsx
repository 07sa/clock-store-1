import React from 'react';

const MARQUEE_ITEMS = [
  'TIMELESS DESIGN',
  'PRECISION ENGINEERING',
  'EXCEPTIONAL CRAFTSMANSHIP',
  '28,800 VIBRATIONS PER HOUR',
  'SYNTHETIC SAPPHIRE CRYSTAL',
  'FLORENTINE LEATHER ATELIER',
  'SURGICAL 316L STAINLESS STEEL',
  '18K CHAMPAGNE GOLD FINISH',
];

export const Marquee: React.FC = () => {
  return (
    <div id="marquee-section" className="relative py-8 bg-[#0D0D10] border-y border-white/10 overflow-hidden select-none">
      {/* Edge Blur Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0D0D10] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0D0D10] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center">
        {/* Render sequence twice for seamless loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
          <div key={idx} className="flex items-center mx-6 shrink-0">
            <span className="text-sm md:text-base font-serif tracking-[0.25em] text-[#C6A66B]/90 font-light uppercase">
              {text}
            </span>
            <span className="mx-6 text-[#C6A66B] text-xs font-serif opacity-60">✦</span>
            {/* Small Watch Silhouette Icon in between every 2 items */}
            {idx % 2 === 0 && (
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 mx-4 text-white/30 stroke-current fill-none"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="7" />
                <polyline points="12 9 12 12 14 13" />
                <path d="M9 5 L9 2 L15 2 L15 5" />
                <path d="M9 19 L9 22 L15 22 L15 19" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
