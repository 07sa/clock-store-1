import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { InteractiveWatchDial } from './InteractiveWatchDial';
import { MEDIA_CONFIG } from '../data/media';

export const HeroSection: React.FC = () => {
  const { scrollToSection, lumeMode, setLumeMode, setSelectedProductId } = useWatch();
  const [activeHeroDial, setActiveHeroDial] = useState<'vanguard' | 'heritage' | 'elite'>('vanguard');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080808] pt-20 pb-12"
    >
      {/* 1. Cinematic Ambient Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            poster={MEDIA_CONFIG.posters.hero}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-25' : 'opacity-0'
            } filter brightness-75 contrast-125`}
          >
            <source src={MEDIA_CONFIG.videos.heroAtmosphere} type="video/mp4" />
          </video>
        )}

        {/* Fallback Static Gradient / Texture if video fails */}
        {(videoError || !videoLoaded) && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50"
            style={{ backgroundImage: `url(${MEDIA_CONFIG.posters.hero})` }}
          />
        )}

        {/* Dark Editorial Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080808]/70 to-[#080808]" />

        {/* Subtle Luxury Film Grain & Metallic Glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C6A66B]/5 rounded-full blur-3xl" />
      </div>

      {/* 2. Main Hero Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & CTAs (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Quiet 1-line text kicker */}
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C6A66B] font-mono mb-4">
              <span>Haute Horlogerie</span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span>Geneva Ateliers</span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span>2026 Collection</span>
            </div>

            {/* Staggered Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05] text-[#F5F3EF] mb-3 text-balance">
              TIME IS AN ART.
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#C6A66B] font-light tracking-wide mb-6">
              PRECISION IS A STATEMENT.
            </div>

            <p className="max-w-xl text-sm sm:text-base text-[#929292] leading-relaxed mb-8 font-light">
              Discover exceptional timepieces designed for those who value every second.
              Uncompromising mechanical movement, synthetic sapphire crystal, and
              architectural surgical steel engineered to transcend fleeting seasons.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => scrollToSection('products-showcase')}
                className="px-7 py-3.5 bg-[#F5F3EF] text-[#080808] hover:bg-[#C6A66B] hover:text-white transition-all duration-300 rounded-sm text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="px-7 py-3.5 border border-white/20 hover:border-[#C6A66B] text-[#F5F3EF] hover:text-[#C6A66B] transition-all duration-300 rounded-sm text-xs uppercase tracking-[0.2em] font-medium bg-black/30 backdrop-blur-sm cursor-pointer"
              >
                <span>DISCOVER OUR CRAFT</span>
              </button>
            </div>

            {/* Model Preview Selector Tabs */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#929292]">
                Dial Architecture:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded border border-white/10">
                {(['vanguard', 'heritage', 'elite'] as const).map((model) => (
                  <button
                    key={model}
                    onClick={() => setActiveHeroDial(model)}
                    className={`px-3 py-1 text-[11px] uppercase tracking-wider font-mono rounded transition-colors ${
                      activeHeroDial === model
                        ? 'bg-[#C6A66B] text-[#080808] font-bold'
                        : 'text-[#929292] hover:text-white'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Interactive Watch Focal Anchor (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Lume Ambient Radial Glow */}
            <div
              className={`absolute w-72 h-72 rounded-full transition-all duration-1000 pointer-events-none ${
                lumeMode ? 'bg-[#2BE4A1]/20 blur-3xl scale-125' : 'bg-[#C6A66B]/10 blur-2xl'
              }`}
            />

            {/* Interactive Mechanical Watch Dial */}
            <div className="relative group cursor-pointer" onClick={() => setSelectedProductId(
              activeHeroDial === 'vanguard' ? 'chronova-vanguard-steel' :
              activeHeroDial === 'heritage' ? 'chronova-heritage-automatic' :
              'chronova-elite-gold'
            )}>
              <InteractiveWatchDial
                type={activeHeroDial}
                size={360}
                className="transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Inspect Tooltip on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full backdrop-blur-[2px] pointer-events-none">
                <span className="px-3 py-1.5 bg-[#080808]/90 border border-[#C6A66B] text-[11px] font-mono uppercase tracking-widest text-[#F5F3EF] rounded">
                  Click to Inspect
                </span>
              </div>
            </div>

            {/* Quick Interactive Tool: Dial Night Mode (Lume) Switch */}
            <div className="mt-6 flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#929292] flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#C6A66B]" />
                Super-LumiNova
              </span>
              <button
                onClick={() => setLumeMode((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all ${
                  lumeMode
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(43,228,161,0.3)]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {lumeMode ? <Sun size={12} /> : <Moon size={12} />}
                <span>{lumeMode ? 'Lume On' : 'Lume Off'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Animated Scroll Indicator */}
      <button
        onClick={() => scrollToSection('marquee-section')}
        aria-label="Scroll to Discover"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#929292] hover:text-[#C6A66B] transition-colors group cursor-pointer"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-[#C6A66B]" />
        </motion.div>
      </button>
    </section>
  );
};
