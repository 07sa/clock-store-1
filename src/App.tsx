/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WatchProvider } from './context/WatchContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Marquee } from './components/Marquee';
import { ScrollStorytelling } from './components/ScrollStorytelling';
import { CollectionsShowcase } from './components/CollectionsShowcase';
import { HorizontalGallery } from './components/HorizontalGallery';
import { ProductShowcase } from './components/ProductShowcase';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CampaignSection } from './components/CampaignSection';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';

export default function App() {
  return (
    <WatchProvider>
      <div className="min-h-screen bg-[#080808] text-[#F5F3EF] selection:bg-[#C6A66B]/30 selection:text-[#F5F3EF]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* 1. Cinematic Hero Campaign */}
          <HeroSection />

          {/* 2. Editorial Animated Marquee */}
          <Marquee />

          {/* 3. Immersive GSAP Scroll Storytelling */}
          <ScrollStorytelling />

          {/* 4. Media-Rich Collection Showcase (Heritage, Vanguard, Élite) */}
          <CollectionsShowcase />

          {/* 5. Horizontal Scrolling Gallery */}
          <HorizontalGallery />

          {/* 6. Product Showcase ("The Defining Few" - 4 Products in INR) */}
          <ProductShowcase />

          {/* 7. Craftsmanship & Macro Anatomy */}
          <CraftsmanshipSection />

          {/* 8. Full-Screen Cinematic Campaign */}
          <CampaignSection />

          {/* 9. Brand Story & Horology Philosophy */}
          <BrandStory />
        </main>

        {/* Editorial Oversized Footer */}
        <Footer />

        {/* Full-Screen & Slide-Over Interactive Overlays */}
        <ProductDetailModal />
        <CartDrawer />
        <SearchModal />
      </div>
    </WatchProvider>
  );
}
