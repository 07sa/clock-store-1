export interface WatchSpecification {
  calibre: string;
  movementType: 'Automatic Self-Winding' | 'Manual Wind' | 'High-Precision Quartz' | 'Automatic Self-Winding with Open Heart' | 'High-Precision Slimline Mechanical';
  powerReserve: string;
  jewels: number;
  frequency: string;
  caseMaterial: string;
  caseDiameter: string;
  caseThickness: string;
  waterResistance: string;
  crystal: string;
  strapMaterial: string;
  strapWidth: string;
}

export interface WatchVariant {
  id: string;
  name: string;
  dialColor: string;
  strapColor: string;
  strapType: string;
  image: string;
  secondaryImage?: string;
}

export interface WatchProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  collection: 'Heritage' | 'Vanguard' | 'Élite' | 'Classic';
  priceINR: number;
  description: string;
  story: string;
  primaryImage: string;
  secondaryImage: string;
  macroImage: string;
  angles: string[];
  specs: WatchSpecification;
  variants: WatchVariant[];
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  product: WatchProduct;
  selectedVariant: WatchVariant;
  quantity: number;
}
