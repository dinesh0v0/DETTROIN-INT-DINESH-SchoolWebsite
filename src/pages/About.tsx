import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';
import { GraduationCap } from 'lucide-react';

export function About() {
  const sections = ['Overview', 'Timeline', 'Leadership', 'Vision & Mission'];

  return (
    <div className="flex-1 w-full bg-canvas-primary">
      <SEO
        title="About KIS"
        description="Learn about Krishna International School's rich history, visionary leadership, and our mission to create academically brilliant and socially responsible students."
        keywords="about KIS, school history, leadership, vision mission, CBSE school Aligarh"
        path="/about"
      />
      <SectionNav sections={sections} />
      
      {/* Header */}
      <section id="overview" className="py-16 md:py-20 container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-brutal bg-canvas-alternate p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-brutal"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            About KIS
          </h1>
          <div className="w-20 h-20 md:w-24 md:h-24 border-brutal bg-canvas-alternate flex items-center justify-center shrink-0">
            <GraduationCap className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        </motion.div>
      </section>

      {/* Grid Layout for Timeline & Leadership */}
      <section className="py-12 container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Timeline */}
          <div id="timeline" className="relative">
            <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-ink" />
            <div className="flex flex-col gap-12">
              {[
                { year: "1960", title: "FOUNDATION STABLISHED", desc: "The school International School an effective comparles in ingrinte nawuping co exow support and expransed cv:beeing thology." },
                { year: "1985", title: "CAMPUS EXPANSION & CBSE AFFILIATION", desc: "" },
                { year: "2005", title: "MODERN FACILITIES INTEGRATION", desc: "" },
                { year: "2023", title: "GLOBAL LEARNING INITIATIVES", desc: "" }
              ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-12 md:pl-16">
                  <div className="absolute left-[13px] md:left-[23px] top-4 w-4 h-4 rounded-full bg-canvas-primary border-2 border-ink z-10" />
                  <Card className="p-6 bg-canvas-primary relative overflow-visible">
                    {/* Decorative shape for the first item */}
                    {idx === 0 && <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-accent-primary -z-10 rotate-45 transform origin-center" />}
                    <h3 className="font-display text-xl md:text-2xl uppercase"><span className="text-accent-primary">{item.year}:</span> {item.title}</h3>
                    {item.desc && <p className="font-body text-sm mt-3 text-ink/80">{item.desc}</p>}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div id="leadership" className="flex flex-col gap-12">
            <h2 className="font-display text-4xl uppercase border-b-2 border-ink pb-4">Leadership</h2>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Card className="w-full sm:w-40 md:w-48 aspect-[4/3] sm:aspect-auto sm:h-52 md:h-56 shrink-0 bg-canvas-alternate overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Chairman" className="w-full h-full object-cover object-top" />
                </Card>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-wider text-ink/60">Chairman's Message</h3>
                  <h4 className="font-display text-2xl md:text-3xl uppercase leading-none">Mr. Ravi Sharma</h4>
                  <p className="font-display uppercase tracking-widest text-sm mb-4">Chairman</p>
                  <p className="font-body text-sm text-ink/80 leading-relaxed border-l-2 border-ink pl-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor high aocidunt, and skillss for a dynamic world. Ut enim ad minim quis nostrud allamco laboris in laboris nisi ut aliquip ex ea commod consequat.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Card className="w-full sm:w-40 md:w-48 aspect-[4/3] sm:aspect-auto sm:h-52 md:h-56 shrink-0 bg-canvas-alternate overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Principal" className="w-full h-full object-cover object-top" />
                </Card>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-wider text-ink/60">Principal's Message</h3>
                  <h4 className="font-display text-2xl md:text-3xl uppercase leading-none">Mrs. Anjali Gupta</h4>
                  <p className="font-display uppercase tracking-widest text-sm mb-4">Principal</p>
                  <p className="font-body text-sm text-ink/80 leading-relaxed border-l-2 border-ink pl-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing with senim knowledge, integrity, and skillts for a dynamic world. Ut enim ad minim nar, veniam, quis nostrud exarvirotion ularec commodo labors in labortis nisi ut aliquip ex ea commooc interac-to conscecuqut.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Card hoverable className="h-full p-6 md:p-8 lg:p-12 bg-accent-primary text-white flex flex-col justify-center">
              <h3 className="font-display text-xl md:text-2xl uppercase tracking-widest mb-4 md:mb-6">Our Vision</h3>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl uppercase leading-[1.1]">
                To create a generation of socially responsible and academically brilliant innovators.
              </p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card hoverable className="h-full p-6 md:p-8 lg:p-12 bg-accent-secondary text-white flex flex-col justify-center">
              <h3 className="font-display text-xl md:text-2xl uppercase tracking-widest mb-4 md:mb-6">Our Mission</h3>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl uppercase leading-[1.1]">
                To provide holistic education that empowers students with knowledge, integrity, and skills for a dynamic world.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
