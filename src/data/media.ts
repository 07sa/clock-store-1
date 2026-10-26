/**
 * Centralized media configuration for CHRONOVA luxury timepieces.
 * Includes looping background video streams, high-resolution horological photography,
 * and high-contrast macro textures.
 */

export const MEDIA_CONFIG = {
  // Cinematic background videos (high-performance, muted, looping, with fallback posters)
  videos: {
    heroAtmosphere: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-gears-in-a-clock-1725-large.mp4',
    macroMovement: 'https://assets.mixkit.co/videos/preview/mixkit-watchmaker-repairing-the-gears-of-a-watch-41130-large.mp4',
    atelierCraft: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-watchmaker-repairing-a-mechanism-41131-large.mp4',
  },

  // Fallback posters in case video autoplay is restricted or network is constrained
  posters: {
    hero: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
    movement: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop',
    atelier: 'https://images.unsplash.com/photo-1547996160-71dfabb18b0c?q=80&w=1600&auto=format&fit=crop',
  },

  // High-resolution campaign & editorial imagery
  campaign: {
    heroWatch: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    dialMacro: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop',
    escapementMacro: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1200&auto=format&fit=crop',
    strapCraft: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
    workshopAtmosphere: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop',
    steelReflections: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop',
    goldLuxury: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop',
    minimalistStudio: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
  },

  // Collection mood covers
  collections: {
    heritage: {
      cover: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
      watch: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop',
    },
    vanguard: {
      cover: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop',
      watch: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900&auto=format&fit=crop',
    },
    elite: {
      cover: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop',
      watch: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=900&auto=format&fit=crop',
    }
  }
};
