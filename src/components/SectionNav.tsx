import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { slugify } from '@/lib/utils';

interface SectionNavProps {
  sections: string[];
}

// Total sticky offset = header (70px scrolled) + section-nav bar (48px) = 118px
// Add 8px buffer so content visually clears the bar: 126px
const SCROLL_OFFSET = 126;

export function SectionNav({ sections }: SectionNavProps) {
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: shouldReduceMotion ? 'instant' : 'smooth' });
    }
  };

  return (
    <div className="sticky top-[70px] z-30 bg-canvas-primary border-b-2 border-ink overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="container mx-auto px-4 md:px-6 flex items-center h-12 gap-4 md:gap-6 pr-8 md:pr-6">
        {sections.map((section) => {
          const id = slugify(section);
          return (
            <button
              key={section}
              onClick={() => scrollTo(id)}
              className="font-display text-xs sm:text-sm uppercase tracking-wider text-ink/70 hover:text-ink transition-colors h-full flex items-center relative group min-w-fit shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              {section}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-ink scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
