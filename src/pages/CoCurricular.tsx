import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';

export function CoCurricular() {
  const sections = ['Overview', 'Sports', 'Performing Arts', 'Fine Arts', 'Excursions', 'Gallery Snippets'];

  return (
    <div className="flex-1 w-full bg-canvas-primary">
      <SEO
        title="Co-Curricular Activities"
        description="Discover sports, fine arts, performing arts, and excursion programs at Krishna International School. Holistic development beyond the classroom."
        keywords="co-curricular activities, school sports, fine arts, performing arts, school excursions"
        path="/co-curricular"
      />
      <SectionNav sections={sections} />
      
      {/* Header */}
      <section id="overview" className="py-16 md:py-20 container mx-auto px-4 md:px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl md:text-6xl font-display uppercase tracking-tight mb-4 md:mb-6"
        >
          Beyond the Classroom
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg lg:text-xl font-body max-w-2xl mx-auto"
        >
          Holistic development through diverse Co-Curricular programs at KIS.
        </motion.p>
      </section>

      {/* Main Categories */}
      <section className="py-12 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          <motion.div id="sports" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card hoverable className="p-4 md:p-6 flex flex-col gap-6">
              <h3 className="font-display text-3xl uppercase text-center">Sports</h3>
              <div className="w-full h-[300px] border-brutal overflow-hidden">
                <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop" alt="Basketball game" className="w-full h-full object-cover" />
              </div>
              <Link to="/gallery">
                <Button className="w-full bg-ink text-white hover:bg-ink/90">Explore Sports</Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div id="fine-arts" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card hoverable className="p-4 md:p-6 flex flex-col gap-6">
              <h3 className="font-display text-3xl uppercase text-center">Fine Arts</h3>
              <div className="w-full h-[300px] border-brutal overflow-hidden">
                <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop" alt="Students painting" className="w-full h-full object-cover" />
              </div>
              <Link to="/gallery">
                <Button className="w-full bg-ink text-white hover:bg-ink/90">Discover Fine Arts</Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div id="performing-arts" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card hoverable className="p-4 md:p-6 flex flex-col gap-6">
              <h3 className="font-display text-3xl uppercase text-center">Performing Arts</h3>
              <div className="w-full h-[300px] border-brutal overflow-hidden">
                <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop" alt="Theater performance" className="w-full h-full object-cover" />
              </div>
              <Link to="/gallery">
                <Button className="w-full bg-ink text-white hover:bg-ink/90">View Performances</Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div id="excursions" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card hoverable className="p-4 md:p-6 flex flex-col gap-6">
              <h3 className="font-display text-3xl uppercase text-center">Excursions & Trips</h3>
              <div className="w-full h-[300px] border-brutal overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop" alt="Students hiking" className="w-full h-full object-cover" />
              </div>
              <Link to="/gallery">
                <Button className="w-full bg-ink text-white hover:bg-ink/90">See Adventures</Button>
              </Link>
            </Card>
          </motion.div>

        </div>
      </section>

      {/* Gallery Snippets */}
      <section id="gallery-snippets" className="py-24 bg-canvas-alternate border-t-2 border-ink">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-8 md:mb-12">Gallery Snippets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hoverable className="p-4 bg-canvas-primary">
                  <div className="aspect-square border-brutal overflow-hidden">
                    <img src={img} alt={`Gallery snippet ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
