import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_CONFIG } from '../data/media';
import { ArrowUpRight } from 'lucide-react';
import { useWatch } from '../context/WatchContext';

gsap.registerPlugin(ScrollTrigger);

interface GalleryPanel {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  year: string;
  productId: string;
}

const PANELS: GalleryPanel[] = [
  {
    id: 'panel-1',
    tag: 'Chapter 01 · Heritage',
    title: 'THE WARMTH OF ATELIER TRADITION',
    subtitle: 'Florentine Leather & Blued Steel',
    description: 'Each strap is shaped by hand in family-owned Tuscan workshops before pairing with our high-beat automatic calibre.',
    image: MEDIA_CONFIG.campaign.workshopAtmosphere,
    year: '1924 Lineage',
    productId: 'chronova-heritage-automatic'
  },
  {
    id: 'panel-2',
    tag: 'Chapter 02 · Vanguard',
    title: 'COLD STEEL. ARCHITECTURAL FORCE.',
    subtitle: 'Surgical 316L & Faceted Links',
    description: 'Forged from monolithic solid steel bars, machined to 5-micron tolerances and finished with vertical satin brushing.',
    image: MEDIA_CONFIG.campaign.steelReflections,
    year: '100M Water Resistant',
    productId: 'chronova-vanguard-steel'
  },
  {
    id: 'panel-3',
    tag: 'Chapter 03 · Élite',
    title: 'SUMPTUOUS 18K GOLD ARCHITECTURE',
    subtitle: 'Midnight Blue Lacquer & Open Heart',
    description: 'A grand complication statement showcasing the oscillating tourbillon balance wheel framed in 18k champagne gold.',
    image: MEDIA_CONFIG.campaign.goldLuxury,
    year: '72-Hour Reserve',
    productId: 'chronova-elite-gold'
  },
  {
    id: 'panel-4',
    tag: 'Chapter 04 · Calibre Anatomy',
    title: '28,800 BEATS OF PERFECTION',
    subtitle: 'Swiss Ruby Bearings & Escapement',
    description: 'A microscopic choreography of gears, springs, and oscillating balances working in perpetual synchrony.',
    image: MEDIA_CONFIG.campaign.escapementMacro,
    year: 'ISO 3159 Benchmark',
    productId: 'chronova-vanguard-steel'
  }
];

export const HorizontalGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { setSelectedProductId } = useWatch();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Only run GSAP horizontal scroll on desktop (window.innerWidth >= 1024)
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const track = pinTrackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalScroll * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#09090C] overflow-hidden">
      {/* Pinned Desktop Track & Mobile Fallback */}
      <div className="relative lg:h-screen w-full flex flex-col justify-between py-12 lg:py-8">
        {/* Gallery Top Heading */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-1">
              Visual Chronicle
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F3EF]">
              CAMPAIGN ARCHIVES
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[#929292]">
            <span>VERTICAL SCROLL DRIVES HORIZONTAL PERSPECTIVE</span>
            <span className="text-[#C6A66B]">({Math.round(scrollProgress * 100)}%)</span>
          </div>
        </div>

        {/* Horizontal Track (Scrubbed on desktop, horizontal scroll on mobile) */}
        <div
          ref={pinTrackRef}
          className="flex lg:flex-nowrap gap-8 px-6 sm:px-12 w-full overflow-x-auto lg:overflow-visible no-scrollbar pb-6 lg:pb-0"
        >
          {PANELS.map((panel, idx) => (
            <div
              key={panel.id}
              className="w-[85vw] sm:w-[70vw] lg:w-[65vw] xl:w-[55vw] shrink-0 h-[65vh] min-h-[460px] relative rounded-sm overflow-hidden border border-white/10 group bg-[#111116] flex flex-col justify-end p-8 sm:p-12"
            >
              {/* Background Image with Depth Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 filter brightness-60 contrast-110"
                style={{ backgroundImage: `url(${panel.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              {/* Panel Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C6A66B]">
                    {panel.tag}
                  </span>
                  <span className="text-xs font-mono text-white/50 tracking-wider">
                    {panel.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F5F3EF] leading-tight mb-2">
                  {panel.title}
                </h3>

                <p className="text-sm font-serif italic text-[#C6A66B] mb-3">
                  {panel.subtitle}
                </p>

                <p className="max-w-lg text-xs sm:text-sm text-[#929292] font-light leading-relaxed mb-6 line-clamp-2">
                  {panel.description}
                </p>

                <button
                  onClick={() => setSelectedProductId(panel.productId)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-[#C6A66B] hover:text-[#080808] border border-white/20 hover:border-[#C6A66B] text-xs font-mono uppercase tracking-widest text-[#F5F3EF] transition-all rounded-sm cursor-pointer"
                >
                  <span>Inspect Timepiece</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Minimal Progress Indicator Bar (Desktop) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 sm:px-8 w-full pt-6">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#C6A66B] transition-all duration-75"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
