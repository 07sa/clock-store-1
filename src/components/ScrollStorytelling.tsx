import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveWatchDial } from './InteractiveWatchDial';
import { MEDIA_CONFIG } from '../data/media';
import { ShieldCheck, Cpu, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ScrollStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const watchStageRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);
  const callout4Ref = useRef<HTMLDivElement>(null);

  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create master scrub timeline pinned to pinSection
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) setActiveStageIndex(0);
            else if (p < 0.5) setActiveStageIndex(1);
            else if (p < 0.75) setActiveStageIndex(2);
            else setActiveStageIndex(3);
          }
        }
      });

      // 1. Initial watch scale and background text slide
      tl.to(backgroundTextRef.current, {
        x: '-25%',
        ease: 'none',
        duration: 3
      }, 0);

      tl.fromTo(
        watchStageRef.current,
        { scale: 0.85, opacity: 0.8, y: 30 },
        { scale: 1.15, opacity: 1, y: 0, ease: 'power2.out', duration: 1 },
        0
      );

      // 2. Dial Zoom & Callout 1 (Sapphire Crystal)
      tl.fromTo(
        callout1Ref.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5 },
        0.5
      );

      // 3. Zoom shift & Callout 2 (Precision Movement)
      tl.to(callout1Ref.current, { opacity: 0, x: -20, duration: 0.3 }, 1.2);
      tl.to(watchStageRef.current, { scale: 1.25, rotate: 6, ease: 'power1.inOut', duration: 0.8 }, 1.2);
      tl.fromTo(
        callout2Ref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5 },
        1.4
      );

      // 4. Case & Materials Callout 3 (Premium Materials)
      tl.to(callout2Ref.current, { opacity: 0, x: 20, duration: 0.3 }, 2.0);
      tl.to(watchStageRef.current, { scale: 1.1, rotate: -4, ease: 'power1.inOut', duration: 0.8 }, 2.0);
      tl.fromTo(
        callout3Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        2.2
      );

      // 5. Final Masterpiece Composition (Callout 4)
      tl.to(callout3Ref.current, { opacity: 0, duration: 0.3 }, 2.6);
      tl.to(watchStageRef.current, { scale: 1, rotate: 0, ease: 'power2.out', duration: 0.6 }, 2.6);
      tl.fromTo(
        callout4Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5 },
        2.7
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#080808] text-[#F5F3EF]">
      {/* Pinned Scroll Section */}
      <section
        ref={pinSectionRef}
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-12 py-12"
      >
        {/* Background Oversized Parallax Typography */}
        <div
          ref={backgroundTextRef}
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[12vw] font-serif font-black tracking-widest text-white/[0.03] select-none pointer-events-none"
        >
          CHRONOVA HAUTE HORLOGERIE PRECISION GENEVA
        </div>

        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-8">
          <div className="text-xs font-mono uppercase tracking-[0.28em] text-[#C6A66B] mb-2">
            Anatomy of Perfection
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight text-[#F5F3EF]">
            EVERY SECOND. A MASTERPIECE.
          </h2>
        </div>

        {/* Central Stage: Large Watch with Interactive Movement */}
        <div className="relative z-20 flex-1 flex items-center justify-center my-4">
          <div ref={watchStageRef} className="relative will-change-transform">
            <InteractiveWatchDial type="vanguard" size={380} interactive={false} />

            {/* Subtle Metallic Halo */}
            <div className="absolute inset-0 rounded-full border border-[#C6A66B]/20 pointer-events-none scale-110" />
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-125" />
          </div>

          {/* Feature Callouts (Scrubbed by ScrollTrigger) */}
          {/* Callout 1: Sapphire Crystal */}
          <div
            ref={callout1Ref}
            className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-xs p-5 bg-[#121214]/90 border border-white/10 rounded-sm backdrop-blur-md opacity-0 pointer-events-none"
          >
            <div className="flex items-center gap-2 text-[#C6A66B] mb-2">
              <ShieldCheck size={18} />
              <span className="text-xs font-mono uppercase tracking-widest">Sapphire Crystal</span>
            </div>
            <p className="text-xs text-[#929292] leading-relaxed">
              Curved synthetic sapphire crystal with triple anti-reflective coating. Rated 9 on the Mohs hardness scale for near-diamond scratch resistance.
            </p>
          </div>

          {/* Callout 2: Precision Movement */}
          <div
            ref={callout2Ref}
            className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 max-w-xs p-5 bg-[#121214]/90 border border-white/10 rounded-sm backdrop-blur-md opacity-0 pointer-events-none"
          >
            <div className="flex items-center gap-2 text-[#C6A66B] mb-2">
              <Cpu size={18} />
              <span className="text-xs font-mono uppercase tracking-widest">Precision Movement</span>
            </div>
            <p className="text-xs text-[#929292] leading-relaxed">
              Calibre CHR-3100 high-beat automatic. Oscillating at 28,800 vibrations per hour (4Hz) across 28 synthetic ruby jewel bearings with 48h reserve.
            </p>
          </div>

          {/* Callout 3: Premium Materials */}
          <div
            ref={callout3Ref}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-sm w-full p-5 bg-[#121214]/90 border border-white/10 rounded-sm backdrop-blur-md opacity-0 pointer-events-none text-center"
          >
            <div className="flex items-center justify-center gap-2 text-[#C6A66B] mb-2">
              <Layers size={18} />
              <span className="text-xs font-mono uppercase tracking-widest">Premium Materials</span>
            </div>
            <p className="text-xs text-[#929292] leading-relaxed">
              Solid surgical 316L stainless steel case hand-chamfered with satin and mirror polishes, paired with Tuscan vegetable-tanned leather.
            </p>
          </div>

          {/* Callout 4: Exceptional Craftsmanship */}
          <div
            ref={callout4Ref}
            className="absolute top-1/2 -translate-y-1/2 max-w-md w-full p-6 bg-[#0E0E10]/95 border border-[#C6A66B]/30 rounded-sm backdrop-blur-xl opacity-0 pointer-events-none text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 text-[#C6A66B] mb-3">
              <Sparkles size={20} />
              <span className="text-sm font-mono uppercase tracking-widest">Exceptional Craftsmanship</span>
            </div>
            <p className="text-sm text-[#F5F3EF] font-serif leading-relaxed mb-2">
              "Every second calibrated to a tolerance of -2/+4 seconds per day, meeting ISO 3159 chronometer precision benchmarks."
            </p>
            <span className="text-[11px] font-mono text-[#929292] uppercase tracking-wider">
              184 Hand-Assembled Components
            </span>
          </div>
        </div>

        {/* Bottom Progress Steps */}
        <div className="relative z-10 max-w-md mx-auto w-full flex items-center justify-between pb-6">
          {['Sapphire', 'Calibre', 'Materials', 'Mastery'].map((step, idx) => (
            <div key={step} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`h-0.5 w-full transition-all duration-300 ${
                  idx <= activeStageIndex ? 'bg-[#C6A66B]' : 'bg-white/15'
                }`}
              />
              <span
                className={`text-[10px] font-mono uppercase tracking-widest ${
                  idx === activeStageIndex ? 'text-[#C6A66B] font-bold' : 'text-[#929292]'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
