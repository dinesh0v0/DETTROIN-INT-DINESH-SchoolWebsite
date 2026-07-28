import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';
import { BookOpen, FlaskConical, GraduationCap } from 'lucide-react';

export function Academics() {
  const sections = ['Overview', 'Curriculum', 'Faculty', 'Examination'];

  return (
    <div className="flex-1 w-full bg-canvas-primary">
      <SEO
        title="Academics"
        description="Explore the CBSE curriculum, experienced faculty, and examination framework at Krishna International School. Academic excellence from Primary to Senior Secondary."
        keywords="CBSE curriculum, KIS academics, school faculty, examination system, primary secondary education"
        path="/academics"
      />
      <SectionNav sections={sections} />
      
      {/* Header */}
      <section id="overview" className="py-16 md:py-20 container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-4 md:gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight leading-[0.9]"
            >
              Academic <br/> Excellence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg lg:text-xl font-body max-w-xl"
            >
              Empowering minds through rigorous and innovative curriculum.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-brutal shadow-brutal p-4 bg-canvas-alternate"
          >
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" alt="Students in library" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section id="curriculum" className="py-16 md:py-24 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase mb-8 md:mb-12">Curriculum Overview</h2>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Primary */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="h-full bg-ink text-white p-8 flex flex-col gap-8 hoverable">
              <div className="flex justify-between items-start">
                <h3 className="font-display text-4xl lg:text-5xl uppercase leading-[0.9]">Primary<br/>Wing<br/>(K-5)</h3>
                <BookOpen className="w-16 h-16 opacity-80" />
              </div>
              <ul className="flex flex-col gap-4 font-body text-sm mt-auto">
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Foundational learning:</strong> Focus on core literacy and numeracy skills.</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Creativity:</strong> Encouraging creative expression and critical thinking early on.</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Core subjects:</strong> Introduction to science, social studies, and languages.</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Middle */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-accent-primary text-white p-8 flex flex-col gap-8 hoverable">
              <div className="flex justify-between items-start">
                <h3 className="font-display text-4xl lg:text-5xl uppercase leading-[0.9]">Middle<br/>Wing<br/>(6-8)</h3>
                <FlaskConical className="w-16 h-16 opacity-80" />
              </div>
              <ul className="flex flex-col gap-4 font-body text-sm mt-auto">
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Subject specialization:</strong> Deep dive into sciences, mathematics, and humanities.</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Critical Thinking:</strong> Development of analytical skills and independent research.</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Collaborative projects:</strong> Team-based learning and presentations.</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Senior */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Card className="h-full bg-accent-secondary text-white p-8 flex flex-col gap-8 hoverable">
              <div className="flex justify-between items-start">
                <h3 className="font-display text-4xl lg:text-5xl uppercase leading-[0.9]">Senior<br/>Wing<br/>(9-12)</h3>
                <GraduationCap className="w-16 h-16 opacity-80" />
              </div>
              <ul className="flex flex-col gap-4 font-body text-sm mt-auto">
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Advanced Placement:</strong> Rigorous coursework for higher education prep.</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Career counseling:</strong> Guidance for college admissions and career paths.</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span><strong>Board Preparations:</strong> Focused coaching for national and state board exams.</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Faculty Highlights */}
      <section id="faculty" className="py-24 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-5xl uppercase mb-12">Faculty Highlights</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Dr. Anya Sharma", role: "Principal", edu: "PhD in Education, Cambridge Univ.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
            { name: "Dr. Gara Pianna", role: "Science", edu: "PhD in Physics, Oxford Univ.", img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop" },
            { name: "Dr. Nahat Sharma", role: "Mathematics", edu: "PhD in Math, MIT", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
            { name: "Dr. Nam Sharma", role: "Provost", edu: "PhD in Admin, Stanford Univ.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" }
          ].map((faculty, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
              <Card className="h-full flex flex-col p-4 bg-canvas-primary">
                <div className="w-full aspect-square border-brutal overflow-hidden mb-4 bg-canvas-alternate">
                  <img src={faculty.img} alt={faculty.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display text-xl uppercase leading-tight">{faculty.name}, {faculty.role}</h4>
                <p className="font-body text-sm text-ink/70 mt-1">{faculty.edu}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Examination Policy */}
      <section id="examination" className="py-24 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-5xl uppercase mb-12">Examination Policy</h2>
        <Card className="p-8 md:p-12 bg-canvas-alternate">
          <ul className="flex flex-col gap-6 font-display text-lg md:text-xl">
            <li className="flex gap-4 items-start">
              <span className="text-accent-secondary shrink-0">•</span>
              <p><span className="text-ink">TRANSPARENT ASSESSMENT:</span> Clear grading rubrics and feedback.</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-accent-secondary shrink-0">•</span>
              <p><span className="text-accent-primary">INTERNAL & EXTERNAL EVALUATION:</span> Periodic tests and CBSE Board integration.</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-accent-primary shrink-0">•</span>
              <p><span className="text-ink">HOLISTIC DEVELOPMENT:</span> Focus on skills beyond rote learning.</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-accent-primary shrink-0">•</span>
              <p><span className="text-accent-secondary">REMEDIAL SUPPORT:</span> Personalized attention for improvement.</p>
            </li>
          </ul>
        </Card>
      </section>

    </div>
  );
}
