import { WatchProduct } from '../types/watch';
import { MEDIA_CONFIG } from './media';

export const WATCH_PRODUCTS: WatchProduct[] = [
  {
    id: 'chronova-heritage-automatic',
    name: 'Chronova Heritage Automatic',
    slug: 'heritage-automatic',
    tagline: 'Timeless by nature. Hand-finished Florentine leather with high-beat mechanical heart.',
    collection: 'Heritage',
    priceINR: 24999,
    description: 'An homage to early 20th-century artisanal horology. Features a sunray ivory dial with thermal-blued feuille hands, applied Roman hour markers, and an exhibition crystal revealing the Geneva stripes on the winding rotor.',
    story: 'Conceived in homage to traditional atelier watchmaking, the Heritage Automatic combines warm organic textures with cold mechanical precision. Each Florentine calfskin strap is hand-stitched by master leather artisans, developing a bespoke patina unique to its wearer.',
    primaryImage: MEDIA_CONFIG.campaign.heroWatch,
    secondaryImage: MEDIA_CONFIG.campaign.dialMacro,
    macroImage: MEDIA_CONFIG.campaign.escapementMacro,
    angles: [
      MEDIA_CONFIG.campaign.heroWatch,
      MEDIA_CONFIG.campaign.dialMacro,
      MEDIA_CONFIG.campaign.strapCraft,
      MEDIA_CONFIG.campaign.workshopAtmosphere
    ],
    features: [
      'Calibre CHR-2804 Automatic (28,800 vph)',
      'Double-domed anti-reflective sapphire crystal',
      'Hand-stitched Tuscan vegetable-tanned leather',
      'Exhibition caseback with Côtes de Genève finish',
      '50-meter water resistance rating'
    ],
    specs: {
      calibre: 'CHR-2804 High-Beat Calibre',
      movementType: 'Automatic Self-Winding',
      powerReserve: '42 Hours',
      jewels: 26,
      frequency: '28,800 vph (4 Hz)',
      caseMaterial: '316L Mirror-Polished Stainless Steel',
      caseDiameter: '40.5 mm',
      caseThickness: '10.8 mm',
      waterResistance: '5 ATM (50 meters)',
      crystal: 'Double-Curved Sapphire with Triple AR Coating',
      strapMaterial: 'Full-Grain Florentine Calfskin',
      strapWidth: '20 mm tapering to 18 mm'
    },
    variants: [
      {
        id: 'var-heritage-ivory-cognac',
        name: 'Sunray Ivory / Cognac Leather',
        dialColor: '#F5EFEB',
        strapColor: '#7A431D',
        strapType: 'Cognac Florentine Leather',
        image: MEDIA_CONFIG.campaign.heroWatch,
        secondaryImage: MEDIA_CONFIG.campaign.dialMacro
      },
      {
        id: 'var-heritage-midnight-espresso',
        name: 'Midnight Black / Espresso Leather',
        dialColor: '#121214',
        strapColor: '#362319',
        strapType: 'Deep Espresso Leather',
        image: MEDIA_CONFIG.campaign.steelReflections,
        secondaryImage: MEDIA_CONFIG.campaign.escapementMacro
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'chronova-vanguard-steel',
    name: 'Chronova Vanguard Steel',
    slug: 'vanguard-steel',
    tagline: 'Built to stand apart. Monolithic architectural lines in surgical 316L stainless steel.',
    collection: 'Vanguard',
    priceINR: 32499,
    description: 'An architectural sculpture for the wrist. Defined by faceted chamfers, vertically brushed 316L stainless steel, an integrated H-link bracelet, and a carbon-black guilloché dial with Super-LumiNova luminescence.',
    story: 'Engineered for contemporary velocity, the Vanguard Steel removes all superfluous ornament. Its integrated case flows seamlessly into the bracelet links, distributing weight evenly for all-day ergonomic balance.',
    primaryImage: MEDIA_CONFIG.campaign.steelReflections,
    secondaryImage: MEDIA_CONFIG.campaign.escapementMacro,
    macroImage: MEDIA_CONFIG.campaign.heroWatch,
    angles: [
      MEDIA_CONFIG.campaign.steelReflections,
      MEDIA_CONFIG.campaign.escapementMacro,
      MEDIA_CONFIG.campaign.heroWatch,
      MEDIA_CONFIG.campaign.minimalistStudio
    ],
    features: [
      'Calibre CHR-3100 Monolithic Automatic',
      'Integrated H-Link solid stainless steel bracelet',
      'Grade A Swiss Super-LumiNova BGW9 indices',
      'Screw-down crown with double gasket seal',
      '100-meter professional water resistance'
    ],
    specs: {
      calibre: 'CHR-3100 Dynamic Calibre',
      movementType: 'Automatic Self-Winding',
      powerReserve: '48 Hours',
      jewels: 28,
      frequency: '28,800 vph (4 Hz)',
      caseMaterial: 'Surgical 316L Stainless Steel with Satin Finish',
      caseDiameter: '41.0 mm',
      caseThickness: '11.2 mm',
      waterResistance: '10 ATM (100 meters)',
      crystal: 'Flat Beveled Sapphire with Anti-Smudge Coating',
      strapMaterial: 'Solid 316L Integrated Steel Bracelet',
      strapWidth: '22 mm integrated taper'
    },
    variants: [
      {
        id: 'var-vanguard-slate-steel',
        name: 'Slate Anthracite / Steel Bracelet',
        dialColor: '#1A1A1E',
        strapColor: '#8C9098',
        strapType: 'Integrated 316L Steel',
        image: MEDIA_CONFIG.campaign.steelReflections,
        secondaryImage: MEDIA_CONFIG.campaign.escapementMacro
      },
      {
        id: 'var-vanguard-glacier-steel',
        name: 'Glacier Silver / Steel Bracelet',
        dialColor: '#D8DEE9',
        strapColor: '#8C9098',
        strapType: 'Integrated 316L Steel',
        image: MEDIA_CONFIG.campaign.heroWatch,
        secondaryImage: MEDIA_CONFIG.campaign.minimalistStudio
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'chronova-elite-gold',
    name: 'Chronova Élite Gold',
    slug: 'elite-gold',
    tagline: 'An expression of excellence. 18K champagne gold ion-plating with open-heart tourbillon architecture.',
    collection: 'Élite',
    priceINR: 39999,
    description: 'The pinnacle of the CHRONOVA atelier. Cloaked in multi-layer 18K champagne gold with an open-heart dial revealing the pulsating balance wheel, framed by midnight navy lacquer and diamond-cut indices.',
    story: 'Reserved for epochal milestones, the Élite Gold translates golden ratio geometry into mechanical art. Every mirror-bevelled surface is inspected under 20x magnification to ensure unblemished light refraction.',
    primaryImage: MEDIA_CONFIG.campaign.goldLuxury,
    secondaryImage: MEDIA_CONFIG.campaign.dialMacro,
    macroImage: MEDIA_CONFIG.campaign.escapementMacro,
    angles: [
      MEDIA_CONFIG.campaign.goldLuxury,
      MEDIA_CONFIG.campaign.dialMacro,
      MEDIA_CONFIG.campaign.escapementMacro,
      MEDIA_CONFIG.campaign.workshopAtmosphere
    ],
    features: [
      'Calibre CHR-5000 Tourbillon-Inspired Open Heart',
      'Heavy 18K Champagne Gold Ion-Vapor Plating',
      'Deep Sunburst Royal Navy dial lacquer',
      'Alligator-embossed genuine leather with butterfly clasp',
      '72-Hour extended power reserve'
    ],
    specs: {
      calibre: 'CHR-5000 Grand Complication',
      movementType: 'Automatic Self-Winding with Open Heart',
      powerReserve: '72 Hours',
      jewels: 32,
      frequency: '21,600 vph (3 Hz)',
      caseMaterial: '18K Champagne Gold PVD over 316L Steel',
      caseDiameter: '42.0 mm',
      caseThickness: '12.0 mm',
      waterResistance: '5 ATM (50 meters)',
      crystal: 'Scratch-Proof Curved Sapphire Crystal',
      strapMaterial: 'Embossed Louisiana Alligator Pattern Leather',
      strapWidth: '22 mm'
    },
    variants: [
      {
        id: 'var-elite-navy-gold',
        name: 'Royal Navy / Champagne Gold & Leather',
        dialColor: '#0E1726',
        strapColor: '#1A1817',
        strapType: 'Black Alligator Texture Leather',
        image: MEDIA_CONFIG.campaign.goldLuxury,
        secondaryImage: MEDIA_CONFIG.campaign.dialMacro
      },
      {
        id: 'var-elite-obsidian-gold',
        name: 'Obsidian Black / Champagne Gold Link',
        dialColor: '#0A0A0A',
        strapColor: '#C6A66B',
        strapType: '18K Gold PVD Mesh Bracelet',
        image: MEDIA_CONFIG.campaign.heroWatch,
        secondaryImage: MEDIA_CONFIG.campaign.steelReflections
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'chronova-minimal-classic',
    name: 'Chronova Minimal Classic',
    slug: 'minimal-classic',
    tagline: 'Quiet precision. Ultra-thin 7.2mm profile with stark minimalist Bauhaus geometry.',
    collection: 'Classic',
    priceINR: 18999,
    description: 'Distilled to the purest essence of time. An ultra-thin 7.2mm case crowned with an unadorned matte monochrome dial, razor-thin baton indices, and a quick-release Milanese mesh band.',
    story: 'Designed for the purist who finds beauty in quiet restraint. The Minimal Classic disappears beneath tailored cuffs, announcing its presence only with silent, effortless grace.',
    primaryImage: MEDIA_CONFIG.campaign.minimalistStudio,
    secondaryImage: MEDIA_CONFIG.campaign.dialMacro,
    macroImage: MEDIA_CONFIG.campaign.steelReflections,
    angles: [
      MEDIA_CONFIG.campaign.minimalistStudio,
      MEDIA_CONFIG.campaign.dialMacro,
      MEDIA_CONFIG.campaign.steelReflections,
      MEDIA_CONFIG.campaign.strapCraft
    ],
    features: [
      'Calibre CHR-100 Slimline Mechanical',
      'Ultra-thin 7.2mm case silhouette',
      'Micro-woven Milanese stainless mesh strap',
      'Sapphire crystal with anti-scratch coating',
      'Quick-release strap swap mechanism'
    ],
    specs: {
      calibre: 'CHR-100 Ultra-Slim Calibre',
      movementType: 'High-Precision Slimline Mechanical',
      powerReserve: '38 Hours',
      jewels: 21,
      frequency: '21,600 vph',
      caseMaterial: 'Matte Brushed 316L Stainless Steel',
      caseDiameter: '38.5 mm',
      caseThickness: '7.2 mm',
      waterResistance: '3 ATM (30 meters)',
      crystal: 'Flat Sapphire with Beveled Edge',
      strapMaterial: 'Surgical Milanese Stainless Steel Mesh',
      strapWidth: '18 mm'
    },
    variants: [
      {
        id: 'var-minimal-monochrome-mesh',
        name: 'Monochrome Silver / Milanese Mesh',
        dialColor: '#E2E8F0',
        strapColor: '#94A3B8',
        strapType: 'Milanese Steel Mesh',
        image: MEDIA_CONFIG.campaign.minimalistStudio,
        secondaryImage: MEDIA_CONFIG.campaign.steelReflections
      },
      {
        id: 'var-minimal-pitch-leather',
        name: 'Pitch Black / Matte Nappa Leather',
        dialColor: '#0F172A',
        strapColor: '#1E293B',
        strapType: 'Matte Black Nappa Leather',
        image: MEDIA_CONFIG.campaign.heroWatch,
        secondaryImage: MEDIA_CONFIG.campaign.strapCraft
      }
    ],
    inStock: true,
    isFeatured: false
  }
];

export const COLLECTIONS_DATA = [
  {
    id: 'heritage',
    name: 'Heritage',
    headline: 'TIMELESS BY NATURE.',
    tagline: 'Artisanal leather, blued steel hands, and warm mechanical tradition.',
    story: 'Rooted in classic horological discipline. Inspired by centuries of hand-crafted mechanical timekeeping where patience and mastery govern every stroke.',
    watchId: 'chronova-heritage-automatic',
    coverImage: MEDIA_CONFIG.collections.heritage.cover,
    accentColor: '#C6A66B'
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    headline: 'BUILT TO STAND APART.',
    tagline: 'Surgical 316L steel, architectural chamfers, and modern velocity.',
    story: 'Forged from industrial aerospace engineering. Built for those who demand unrelenting durability without forfeiting refined aesthetic poise.',
    watchId: 'chronova-vanguard-steel',
    coverImage: MEDIA_CONFIG.collections.vanguard.cover,
    accentColor: '#94A3B8'
  },
  {
    id: 'elite',
    name: 'Élite',
    headline: 'AN EXPRESSION OF EXCELLENCE.',
    tagline: '18K champagne gold, open-heart complexity, and regal midnight tones.',
    story: 'The absolute zenith of the CHRONOVA atelier. An uncompromising synthesis of precious metallics and haute horlogerie finishing.',
    watchId: 'chronova-elite-gold',
    coverImage: MEDIA_CONFIG.collections.elite.cover,
    accentColor: '#E6C687'
  }
];
