import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useWatch } from '../context/WatchContext';
import { MEDIA_CONFIG } from '../data/media';
import { InteractiveWatchDial } from './InteractiveWatchDial';

export const CampaignSection: React.FC = () => {
  const { scrollToSection } = useWatch();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#080808] border-t border-white/10 py-20">
      {/* Background Video Stream */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            poster={MEDIA_CONFIG.posters.movement}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-30' : 'opacity-0'
            } filter brightness-70 contrast-125`}
          >
            <source src={MEDIA_CONFIG.videos.macroMovement} type="video/mp4" />
          </video>
        )}

        {(videoError || !videoLoaded) && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50"
            style={{ backgroundImage: `url(${MEDIA_CONFIG.posters.movement})` }}
          />
        )}

        {/* Cinematic Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-transparent to-[#080808]/90" />
      </div>

      {/* Main Campaign Editorial Composition */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Floating Timepiece Focal Center */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 rounded-full bg-[#C6A66B]/15 blur-2xl scale-110" />
          <InteractiveWatchDial type="elite" size={260} interactive={false} />
        </div>

        <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6A66B] mb-4">
          The Definitive Campaign
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#F5F3EF] mb-4 text-balance">
          YOUR TIME. YOUR LEGACY.
        </h2>

        <p className="text-lg sm:text-xl font-serif italic text-[#C6A66B] font-light max-w-xl mx-auto mb-8">
          Find the timepiece that tells your story.
        </p>

        <p className="max-w-lg text-xs sm:text-sm text-[#929292] font-light leading-relaxed mb-10">
          A luxury watch is not bought for the fleeting hour. It is acquired to commemorate the milestones,
          the triumphs, and the enduring moments you carry forward.
        </p>

        <button
          onClick={() => scrollToSection('products-showcase')}
          className="px-9 py-4 bg-[#F5F3EF] hover:bg-[#C6A66B] text-[#080808] hover:text-white transition-all duration-300 rounded-sm text-xs font-mono uppercase tracking-[0.25em] font-bold flex items-center gap-2 group cursor-pointer shadow-2xl"
        >
          <span>FIND YOUR WATCH</span>
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
