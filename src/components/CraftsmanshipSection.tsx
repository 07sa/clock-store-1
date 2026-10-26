import React, { useState } from 'react';
import { Sparkles, Eye, Shield, Compass } from 'lucide-react';
import { MEDIA_CONFIG } from '../data/media';

export const CraftsmanshipSection: React.FC = () => {
  const [activeDetail, setActiveDetail] = useState(0);

  const CRAFT_DETAILS = [
    {
      title: 'Côtes de Genève & Anglage',
      category: 'Surface Finishing',
      description: 'Micro-parallel lines engraved across bridges and rotors with 45-degree hand-polished bevelled edges (anglage), capturing light with diamond brilliance.',
      image: MEDIA_CONFIG.campaign.escapementMacro
    },
    {
      title: 'Florentine Full-Grain Calfskin',
      category: 'Artisanal Straps',
      description: 'Selected from century-old tanneries in Tuscany, steeped in chestnut tannin baths for 60 days and saddle-stitched with waxed linen thread.',
      image: MEDIA_CONFIG.campaign.strapCraft
    },
    {
      title: 'Surgical 316L Monolithic Steel',
      category: 'Metallurgical Purity',
      description: 'Vacuum-arc remelted austenitic steel offering superior corrosion resistance and an immaculate surface capable of taking ultra-fine satin brushwork.',
      image: MEDIA_CONFIG.campaign.steelReflections
    },
    {
      title: 'Thermally Blued Steel Hands',
      category: 'Flame Oxidation',
      description: 'Steel leaf hands heated with surgical control to exactly 290°C, producing an enduring cobalt-blue oxide layer with zero synthetic dyes.',
      image: MEDIA_CONFIG.campaign.dialMacro
    }
  ];

  return (
    <section id="craftsmanship" className="py-24 bg-[#0A0A0D] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-3">
            <Sparkles size={14} />
            <span>Geneva Horology Standard</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#F5F3EF] mb-4">
            BEAUTY IN EVERY DETAIL.
          </h2>
          <p className="text-sm sm:text-base text-[#929292] font-light leading-relaxed">
            The soul of a timepiece lives in places the naked eye rarely notices.
            Behind the sapphire crystal lies a world of microscopic perfection where
            fractions of a millimeter define lifetime accuracy.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Large Hero Macro Display (7 cols) */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] rounded-sm overflow-hidden border border-white/10 group bg-[#121217]">
            <img
              src={CRAFT_DETAILS[activeDetail].image}
              alt={CRAFT_DETAILS[activeDetail].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-80 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C6A66B] mb-2 block">
                {CRAFT_DETAILS[activeDetail].category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F3EF] mb-2">
                {CRAFT_DETAILS[activeDetail].title}
              </h3>
              <p className="max-w-xl text-xs sm:text-sm text-[#929292] font-light leading-relaxed">
                {CRAFT_DETAILS[activeDetail].description}
              </p>
            </div>
          </div>

          {/* Interactive Inspection List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {CRAFT_DETAILS.map((detail, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDetail(idx)}
                className={`p-5 rounded-sm border text-left transition-all cursor-pointer ${
                  activeDetail === idx
                    ? 'border-[#C6A66B] bg-[#14141B] shadow-lg'
                    : 'border-white/5 hover:border-white/20 bg-[#0E0E12] text-[#929292]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A66B]">
                    0{idx + 1} · {detail.category}
                  </span>
                  <Eye size={14} className={activeDetail === idx ? 'text-[#C6A66B]' : 'text-white/20'} />
                </div>
                <h4 className="text-lg font-serif text-[#F5F3EF] mb-1">
                  {detail.title}
                </h4>
                <p className="text-xs text-[#929292] font-light line-clamp-2">
                  {detail.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Horological Standards Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-[#C6A66B] shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-base font-serif text-[#F5F3EF] mb-1">Chronometer Tolerance</h4>
              <p className="text-xs text-[#929292] font-light leading-relaxed">
                Regulated in 5 positions and under varying temperatures to ensure consistent daily chronometry of -2/+4 seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-[#C6A66B] shrink-0">
              <Compass size={20} />
            </div>
            <div>
              <h4 className="text-base font-serif text-[#F5F3EF] mb-1">Glucydur Balance Wheel</h4>
              <p className="text-xs text-[#929292] font-light leading-relaxed">
                Beryllium-copper alloy offering minimal thermal expansion and non-magnetic immunity against electronic interference.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-[#C6A66B] shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-base font-serif text-[#F5F3EF] mb-1">Hand-Assembled in Geneva</h4>
              <p className="text-xs text-[#929292] font-light leading-relaxed">
                Every single movement is assembled, lubricated with micro-dosed oils, and signed by an accredited master watchmaker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
