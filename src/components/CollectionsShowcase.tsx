import React, { useState } from 'react';
import { ArrowUpRight, Compass, Shield, Award } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { MEDIA_CONFIG } from '../data/media';
import { InteractiveWatchDial } from './InteractiveWatchDial';

export const CollectionsShowcase: React.FC = () => {
  const { setActiveCollection, scrollToSection, setSelectedProductId } = useWatch();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleExplore = (collectionName: string) => {
    setActiveCollection(collectionName);
    scrollToSection('products-showcase');
  };

  return (
    <section id="collections-showcase" className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-2">
              Three Distinct Philosophies
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#F5F3EF]">
              THE COLLECTIONS
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#929292] font-light leading-relaxed">
            Each collection represents a distinct architectural vision: from centuries of atelier tradition
            to cold-forged aeronautical engineering and open-heart golden complications.
          </p>
        </div>

        {/* Collection A: HERITAGE (Warm Atelier, Asymmetrical Split) */}
        <div
          onMouseEnter={() => setHoveredCard('heritage')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative mb-20 rounded-sm overflow-hidden border border-white/10 bg-[#0E0E11] transition-all duration-700 hover:border-[#C6A66B]/50 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Narrative (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-14 z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6A66B] mb-4">
                  <Compass size={14} />
                  <span>Lineage 01 · Heritage Collection</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F5F3EF] leading-tight mb-4 group-hover:text-[#C6A66B] transition-colors">
                  TIMELESS BY NATURE.
                </h3>
                <p className="text-sm text-[#929292] leading-relaxed mb-6 font-light">
                  Hand-stitched Florentine calfskin straps, ivory sunray dials, and thermally blued feuille hands.
                  A tribute to mid-century Geneva horology, where time was marked with deliberate grace.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-8">
                  <span>CHR-2804 Calibre</span>
                  <span>·</span>
                  <span>40.5mm 316L</span>
                  <span>·</span>
                  <span>Geneva Stripes</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleExplore('Heritage')}
                  className="px-6 py-3 bg-[#C6A66B] text-[#080808] hover:bg-white transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 rounded-sm cursor-pointer"
                >
                  <span>Explore Heritage</span>
                  <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={() => setSelectedProductId('chronova-heritage-automatic')}
                  className="px-5 py-3 border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-[#F5F3EF] transition-colors rounded-sm cursor-pointer"
                >
                  Technical Sheet
                </button>
              </div>
            </div>

            {/* Right Media Display (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[500px] overflow-hidden bg-[#141418] flex items-center justify-center p-8">
              {/* Background Atelier Photography with Warm Grain */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 filter brightness-50 contrast-110"
                style={{ backgroundImage: `url(${MEDIA_CONFIG.campaign.workshopAtmosphere})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E11] via-transparent to-black/60" />

              {/* Layered Interactive Watch Dial */}
              <div className="relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                <InteractiveWatchDial type="heritage" size={320} interactive={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Collection B: VANGUARD (Monolithic Steel, Inverted Layout) */}
        <div
          onMouseEnter={() => setHoveredCard('vanguard')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative mb-20 rounded-sm overflow-hidden border border-white/10 bg-[#0A0B0E] transition-all duration-700 hover:border-slate-400/50 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Media (7 cols) - Inverted */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative min-h-[420px] lg:min-h-[500px] overflow-hidden bg-[#101217] flex items-center justify-center p-8">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 filter brightness-45 contrast-125"
                style={{ backgroundImage: `url(${MEDIA_CONFIG.campaign.steelReflections})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0A0B0E] via-transparent to-black/70" />

              {/* Layered Modern Vanguard Dial with Steel Accents */}
              <div className="relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]">
                <InteractiveWatchDial type="vanguard" size={330} interactive={false} />
              </div>
            </div>

            {/* Right Narrative (5 cols) */}
            <div className="lg:col-span-5 order-1 lg:order-2 p-8 sm:p-14 z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-4">
                  <Shield size={14} />
                  <span>Lineage 02 · Vanguard Collection</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F5F3EF] leading-tight mb-4 group-hover:text-slate-200 transition-colors">
                  BUILT TO STAND APART.
                </h3>
                <p className="text-sm text-[#929292] leading-relaxed mb-6 font-light">
                  Aeronautical 316L stainless steel, integrated chamfered link bracelet, and carbon-slate guilloché.
                  Designed for modern velocity and uncompromising structural rigidity.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-8">
                  <span>10 ATM (100m)</span>
                  <span>·</span>
                  <span>BGW9 Lume</span>
                  <span>·</span>
                  <span>Integrated H-Link</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleExplore('Vanguard')}
                  className="px-6 py-3 bg-[#E2E8F0] text-[#080808] hover:bg-[#C6A66B] hover:text-white transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 rounded-sm cursor-pointer"
                >
                  <span>Explore Vanguard</span>
                  <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={() => setSelectedProductId('chronova-vanguard-steel')}
                  className="px-5 py-3 border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-[#F5F3EF] transition-colors rounded-sm cursor-pointer"
                >
                  Technical Sheet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collection C: ÉLITE (Champagne Gold, Full-Width Dramatic Editorial) */}
        <div
          onMouseEnter={() => setHoveredCard('elite')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative rounded-sm overflow-hidden border border-[#C6A66B]/30 bg-[#0B0C10] transition-all duration-700 hover:border-[#C6A66B] group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Narrative (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-14 z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E6C687] mb-4">
                  <Award size={14} />
                  <span>Lineage 03 · Élite Complications</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F5F3EF] leading-tight mb-4 group-hover:text-[#E6C687] transition-colors">
                  AN EXPRESSION OF EXCELLENCE.
                </h3>
                <p className="text-sm text-[#929292] leading-relaxed mb-6 font-light">
                  18K champagne gold ion-vapor deposition, open-heart tourbillon architecture, and deep sunburst royal navy lacquer.
                  A high-complication statement for life's most elevated moments.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-8">
                  <span>CHR-5000 Tourbillon</span>
                  <span>·</span>
                  <span>72H Reserve</span>
                  <span>·</span>
                  <span>18K Champagne Gold</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleExplore('Élite')}
                  className="px-6 py-3 bg-[#C6A66B] text-[#080808] hover:bg-white transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 rounded-sm cursor-pointer"
                >
                  <span>Explore Élite</span>
                  <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={() => setSelectedProductId('chronova-elite-gold')}
                  className="px-5 py-3 border border-white/20 hover:border-[#C6A66B] text-xs font-mono uppercase tracking-wider text-[#F5F3EF] transition-colors rounded-sm cursor-pointer"
                >
                  Technical Sheet
                </button>
              </div>
            </div>

            {/* Right Media (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[500px] overflow-hidden bg-[#0A0D14] flex items-center justify-center p-8">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 filter brightness-45 contrast-120"
                style={{ backgroundImage: `url(${MEDIA_CONFIG.campaign.goldLuxury})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-transparent to-black/70" />

              {/* Layered Gold Tourbillon Dial */}
              <div className="relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_25px_50px_rgba(198,166,107,0.25)]">
                <InteractiveWatchDial type="elite" size={340} interactive={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
