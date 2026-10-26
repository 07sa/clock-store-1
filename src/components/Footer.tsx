import React, { useState } from 'react';
import { ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import { useWatch } from '../context/WatchContext';

export const Footer: React.FC = () => {
  const { scrollToSection, setActiveCollection } = useWatch();
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setNewsletterStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setNewsletterStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-[#050507] text-[#F5F3EF] border-t border-white/10 pt-20 pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Section: Oversized Editorial Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A66B] mb-3 block">
              Atelier Correspondence
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif text-[#F5F3EF] leading-tight mb-4">
              RECEIVE PRIVATE HOROLOGICAL DISPATCHES.
            </h3>
            <p className="text-sm text-[#929292] font-light max-w-lg leading-relaxed">
              Invitations to private complication debuts, horological essays, and limited atelier production allocations.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            {newsletterStatus === 'success' ? (
              <div className="p-5 bg-white/5 border border-emerald-500/40 rounded-sm flex items-center gap-3 text-emerald-400">
                <Check size={20} />
                <div className="text-xs font-mono">
                  <p className="font-semibold text-white">Subscription Registered (Demo)</p>
                  <p className="text-[#929292]">Thank you. You will receive previews of future calibre allocations.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex rounded-sm overflow-hidden border border-white/15 focus-within:border-[#C6A66B] transition-colors bg-[#0D0D12]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus('idle');
                    }}
                    placeholder="Enter your email for private dispatches"
                    className="w-full bg-transparent px-4 py-3.5 text-xs font-mono text-[#F5F3EF] placeholder:text-[#929292] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#C6A66B] hover:bg-white text-[#080808] transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
                {newsletterStatus === 'error' && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-red-400">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <p className="text-[10px] font-mono text-[#929292]">
                  We respect your privacy. Unsubscribe at any time. Demo validation enabled.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs font-mono">
          {/* Col 1: Collections */}
          <div>
            <h4 className="uppercase tracking-widest text-[#C6A66B] mb-5 font-semibold">
              Collections
            </h4>
            <ul className="space-y-3 text-[#929292]">
              <li>
                <button
                  onClick={() => {
                    setActiveCollection('Heritage');
                    scrollToSection('products-showcase');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Heritage Lineage
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCollection('Vanguard');
                    scrollToSection('products-showcase');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Vanguard Monolith
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCollection('Élite');
                    scrollToSection('products-showcase');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Élite Tourbillon
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCollection('Classic');
                    scrollToSection('products-showcase');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Minimal Classic
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Atelier Craft */}
          <div>
            <h4 className="uppercase tracking-widest text-[#C6A66B] mb-5 font-semibold">
              Craft & Calibre
            </h4>
            <ul className="space-y-3 text-[#929292]">
              <li>
                <button onClick={() => scrollToSection('craftsmanship')} className="hover:text-white transition-colors">
                  Calibre Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('craftsmanship')} className="hover:text-white transition-colors">
                  Côtes de Genève Finish
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('craftsmanship')} className="hover:text-white transition-colors">
                  Tuscan Leather Tanneries
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('brand-story')} className="hover:text-white transition-colors">
                  Atelier Heritage Story
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care */}
          <div>
            <h4 className="uppercase tracking-widest text-[#C6A66B] mb-5 font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-3 text-[#929292]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  5-Year Atelier Warranty
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Complimentary Insured Courier
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Strap Sizing & Alteration
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Concierge: care@chronova-atelier.com
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Horology House */}
          <div>
            <h4 className="uppercase tracking-widest text-[#C6A66B] mb-5 font-semibold">
              Private Showroom
            </h4>
            <p className="text-[#929292] leading-relaxed mb-4">
              By appointment only.<br />
              Rue du Rhône 42, 1204 Genève<br />
              Confédération Suisse
            </p>
            <div className="flex items-center gap-3 text-white/50">
              <span className="hover:text-[#C6A66B] transition-colors cursor-pointer">Instagram</span>
              <span>·</span>
              <span className="hover:text-[#C6A66B] transition-colors cursor-pointer">YouTube</span>
              <span>·</span>
              <span className="hover:text-[#C6A66B] transition-colors cursor-pointer">Journal</span>
            </div>
          </div>
        </div>

        {/* Bottom Giant Brand Wordmark */}
        <div className="pt-16 pb-8 text-center overflow-hidden">
          <div
            className="text-[13vw] font-serif font-light tracking-[0.2em] text-white/[0.04] leading-none select-none hover:text-white/[0.08] transition-colors cursor-default"
            aria-hidden="true"
          >
            CHRONOVA
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#929292] gap-4">
          <div>
            © {new Date().getFullYear()} CHRONOVA Haute Horlogerie. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Warranty Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
