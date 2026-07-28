import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';

export function Events() {
  const sections = ['Upcoming'];

  const eventsList = [
    { month: "SEP", day: "25", title: "ANNUAL SPORTS DAY", desc: "A day of friendly competition and school spirit. Students, staff, and parents are invited to participate and cheer.", time: "09:00 AM - 03:00 PM", loc: "KIS Main Ground" },
    { month: "SEP", day: "25", title: "PARENT-TEACHER MEETING", desc: "A day of friendly competition and school spirit. Students, staff, and parents are invited to participate and cheer.", time: "09:00 AM - 03:00 PM", loc: "KIS Main Ground" },
    { month: "SEP", day: "26", title: "SCIENCE FAIR", desc: "A day of friendly competition and school spirit. Students, staff, and parents are invited to participate and cheer.", time: "09:00 AM - 03:00 PM", loc: "KIS Main Ground" },
    { month: "AUG", day: "26", title: "CULTURAL FESTIVAL", desc: "A day of friendly competition and school spirit. Students, staff, and parents are invited to participate and cheer.", time: "09:00 AM - 03:00 PM", loc: "KIS Main Ground" },
    { month: "OCT", day: "25", title: "BOOK WEEK CELEBRATION", desc: "A day of friendly competition and school spirit. Students, staff, and parents are invited to participate and cheer.", time: "09:00 AM - 03:00 PM", loc: "KIS Main Ground" }
  ];

  return (
    <div className="flex-1 w-full bg-ink text-canvas-primary selection:bg-canvas-primary selection:text-ink">
      <SEO
        title="School Events"
        description="Stay updated with upcoming events at Krishna International School — Annual Sports Day, Science Fair, Cultural Festivals, and more."
        keywords="school events, annual sports day, science fair, cultural festival, KIS events"
        path="/events"
      />
      {/* Dark-mode section nav: swap bg/text tokens to match the ink background */}
      <div className="sticky top-[70px] z-30 bg-ink border-b-2 border-canvas-primary/30 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="container mx-auto px-4 md:px-6 flex items-center h-12 gap-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                const el = document.getElementById('upcoming');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 126;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="font-display text-sm uppercase tracking-wider text-canvas-primary/70 hover:text-canvas-primary transition-colors h-full flex items-center relative group min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canvas-primary"
            >
              {section}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-canvas-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-center mb-8 md:mb-16 border-b-4 border-accent-primary pb-4"
        >
          KIS School Events
        </motion.h1>

        <div className="flex flex-col gap-12" id="upcoming">
          {eventsList.map((evt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-start border-b-2 border-accent-primary/30 pb-8 md:pb-12 last:border-0">
                
                {/* Date Block */}
                <Card className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 bg-accent-primary text-white flex flex-col items-center justify-center p-0">
                  <span className="font-display text-xl md:text-2xl uppercase tracking-widest">{evt.month}</span>
                  <span className="font-display text-5xl md:text-6xl leading-none">{evt.day}</span>
                </Card>

                {/* Details */}
                <div className="flex flex-col gap-2 md:gap-3 pt-1 md:pt-2">
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight">{evt.title}</h3>
                  <p className="font-body text-canvas-primary/80 leading-relaxed mb-1 md:mb-2 text-sm md:text-base">
                    {evt.desc}
                  </p>
                  <div className="font-body text-sm flex flex-col gap-1 text-canvas-primary/60">
                    <p><strong className="text-canvas-primary">Time:</strong> {evt.time}</p>
                    <p><strong className="text-canvas-primary">Location:</strong> {evt.loc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
