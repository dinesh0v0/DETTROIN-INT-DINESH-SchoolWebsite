import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionNav } from '@/components/SectionNav';
import { Card } from '@/components/Card';
import { SEO } from '@/components/SEO';
import { Facebook, Instagram, MessageCircle, Heart, Share2, ThumbsUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import DomeGallery from '@/components/DomeGallery';

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
];

export function Gallery() {
  const sections = ['Images', 'Facebook', 'Instagram'];
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 w-full bg-canvas-primary relative">
      <SEO
        title="Gallery"
        description="Browse the photo gallery of Krishna International School — campus life, events, sports, and cultural activities. Follow us on Facebook and Instagram."
        keywords="school gallery, campus photos, KIS events, school activities"
        path="/gallery"
      />
      <SectionNav sections={sections} />
      
      <div className="container mx-auto px-4 md:px-6 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-center mb-8 md:mb-12"
        >
          KIS Gallery
        </motion.h1>

        {/* Dome Gallery */}
        <div id="images" className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] min-h-[350px] mb-12 md:mb-24 rounded-[30px] overflow-hidden border-brutal bg-[#120F17]">
          <DomeGallery images={GALLERY_IMAGES} grayscale={false} />
        </div>

        {/* Social Feeds Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Facebook Feed */}
          <div id="facebook" className="flex flex-col gap-6 h-full">
            <h2 className="font-display text-4xl uppercase border-b-2 border-ink pb-2">Facebook Feed</h2>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer hover:-translate-y-1 transition-transform">
              <Card className="bg-canvas-alternate p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display uppercase tracking-wider leading-none">KIS</h4>
                    <p className="font-body text-xs text-ink/60 mt-1">Recent Post • 🌎</p>
                  </div>
                </div>
                <p className="font-body text-sm mb-4">Check out our Annual Sports Day photos! What an amazing display of talent and sportsmanship.</p>
                <div className="w-full aspect-video border-brutal overflow-hidden mb-4 bg-canvas-alternate">
                  <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop" alt="Facebook post" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-6 border-t-2 border-ink/10 pt-4 text-ink/60 mt-auto">
                  <button className="flex items-center gap-2 hover:text-ink min-h-[44px] px-2 transition-colors"><ThumbsUp className="w-5 h-5" /> Like</button>
                  <button className="flex items-center gap-2 hover:text-ink min-h-[44px] px-2 transition-colors"><MessageCircle className="w-5 h-5" /> Comment</button>
                  <button className="flex items-center gap-2 hover:text-ink min-h-[44px] px-2 transition-colors"><Share2 className="w-5 h-5" /> Share</button>
                </div>
              </Card>
            </a>
          </div>

          {/* Instagram Feed */}
          <div id="instagram" className="flex flex-col gap-6 h-full">
            <h2 className="font-display text-4xl uppercase border-b-2 border-ink pb-2">Instagram Feed</h2>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer hover:-translate-y-1 transition-transform">
              <Card className="bg-canvas-alternate p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-wider leading-none">KIS</h4>
                  <p className="font-body text-xs text-ink/60 mt-1">Art Exhibition highlights!</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="aspect-square border-brutal overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); setLightboxImage("https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop"); }}><img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                <div className="aspect-square border-brutal overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); setLightboxImage("https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"); }}><img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                <div className="aspect-square border-brutal overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); setLightboxImage("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"); }}><img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                <div className="aspect-square border-brutal overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); setLightboxImage("https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"); }}><img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                <div className="aspect-square border-brutal overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); setLightboxImage("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"); }}><img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                <div className="aspect-square border-brutal overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); setLightboxImage("https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop"); }}><img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
              </div>

              <div className="flex gap-4 pt-2 text-ink mt-auto">
                <button className="hover:text-accent-primary min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"><Heart className="w-6 h-6" /></button>
                <button className="hover:text-ink/60 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"><MessageCircle className="w-6 h-6" /></button>
                <button className="hover:text-ink/60 min-w-[44px] min-h-[44px] ml-auto flex items-center justify-center transition-colors"><Share2 className="w-6 h-6" /></button>
              </div>
              <p className="font-body text-sm mt-3"><strong>124 likes</strong></p>
            </Card>
            </a>
          </div>

        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
              className="absolute top-6 right-6 text-white hover:text-accent-primary transition-colors bg-ink/50 rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage} 
              alt="Lightbox" 
              className="max-w-full max-h-full object-contain border-brutal-lg shadow-brutal-lg bg-white"
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to close
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
