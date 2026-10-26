import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MEDIA_CONFIG } from '../data/media';
import { useWatch } from '../context/WatchContext';

export const BrandStory: React.FC = () => {
  const { scrollToSection } = useWatch();

  return (
    <section id="brand-story" className="py-24 bg-[#080808] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Imagery Stack (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Image */}
            <div className="relative h-[440px] sm:h-[520px] rounded-sm overflow-hidden border border-white/10 bg-[#121216] group">
              <img
                src={MEDIA_CONFIG.campaign.workshopAtmosphere}
                alt="Watchmaker hand assembling a movement"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono text-[#C6A66B] uppercase tracking-wider block mb-1">
                  Atelier Philosophy
                </span>
                <p className="text-sm font-serif text-[#F5F3EF]">
                  Every balance wheel balanced by hand. No compromises.
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Card (Offset) */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 h-48 rounded-sm overflow-hidden border border-white/20 shadow-2xl bg-[#1A1A22]">
              <img
                src={MEDIA_CONFIG.campaign.strapCraft}
                alt="Leather strap craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-85"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-xs font-mono text-[#F5F3EF]">
                <span className="text-[#C6A66B]">Tuscan Tannery</span>
                <span className="text-[10px] text-white/70">60-day vegetable steeping</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-3">
              The CHRONOVA Ethos
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#F5F3EF] leading-[1.1] mb-6">
              DESIGNED TO OUTLIVE TRENDS.
            </h2>

            <blockquote className="text-base sm:text-lg font-serif italic text-[#C6A66B] border-l-2 border-[#C6A66B] pl-4 mb-6 leading-relaxed">
              "We believe a watch is more than an instrument for measuring time. It is a reflection of character, a celebration of precision, and a companion to the moments that matter most."
            </blockquote>

            <p className="text-sm text-[#929292] font-light leading-relaxed mb-6">
              In an age of planned obsolescence and throwaway electronics, mechanical timepieces remain
              one of the few creations capable of operating for a century on kinetic human energy alone.
              We construct each watch to be handed down through generations.
            </p>

            <p className="text-sm text-[#929292] font-light leading-relaxed mb-8">
              From our high-beat automatic calibres to our hand-curated leather bands and surgical steel cases,
              every component is chosen for enduring integrity, tactile warmth, and timeless proportion.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="px-6 py-3.5 bg-white/10 hover:bg-[#C6A66B] hover:text-[#080808] border border-white/15 hover:border-[#C6A66B] transition-all text-xs font-mono uppercase tracking-widest text-[#F5F3EF] rounded-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>Discover Our Craftsmanship</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('products-showcase')}
                className="px-6 py-3.5 border border-white/10 hover:border-white text-xs font-mono uppercase tracking-widest text-[#929292] hover:text-white transition-colors rounded-sm cursor-pointer"
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
