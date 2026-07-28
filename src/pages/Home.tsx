import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SEO } from '@/components/SEO';
import { Play, X } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'UJ3RMxpJpf4';

export function Home() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const y1 = useTransform(scrollY, [0, 500], shouldReduceMotion ? [0, 0] : [0, 50]);
  const y2 = useTransform(scrollY, [0, 500], shouldReduceMotion ? [0, 0] : [0, -50]);
  const [videoOpen, setVideoOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = videoOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [videoOpen]);

  return (
    <div className="flex-1 w-full">
      {/* YouTube Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video border-4 border-white shadow-[12px_12px_0px_0px_#C4411C]"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Krishna International School — Campus Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-5 -right-5 w-10 h-10 bg-ink border-2 border-white flex items-center justify-center text-white hover:bg-accent-primary transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <SEO
        title="Home"
        description="Krishna International School, Aligarh — premier CBSE institution nurturing minds and shaping futures through holistic education for K-12 students."
        keywords="Krishna International School, KIS Aligarh, CBSE school, best school Aligarh, school admissions, holistic education"
        path="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32 container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[0.9] tracking-tight text-ink uppercase"
            >
              Nurturing <br/> Minds, <br/> Shaping <br/> Futures
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-body max-w-md border-l-4 border-accent-primary pl-4"
            >
              Nurturing minds and shaping futures of Krishna International School.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/admission">
                <Button size="lg" className="text-lg">Enroll Now</Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="relative z-0 h-[300px] sm:h-[400px] lg:h-[600px] w-full">
             <motion.div 
               style={{ y: y1 }}
               className="absolute inset-0 bg-canvas-alternate border-brutal-lg shadow-brutal-lg overflow-hidden flex items-center justify-center p-4"
             >
                {/* Video Thumbnail with Play Button */}
                <div className="relative w-full h-full bg-accent-secondary border-brutal flex items-center justify-center group overflow-hidden cursor-pointer" onClick={() => setVideoOpen(true)}>
                   <img src="https://images.unsplash.com/photo-1590402494587-44b71d7772f6?q=80&w=2070&auto=format&fit=crop" alt="Campus aerial view" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
                   <button
                     className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white flex items-center justify-center group-hover:scale-110 transition-transform bg-black/20 backdrop-blur-sm"
                     aria-label="Play campus tour video"
                   >
                     <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
                   </button>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Stats & Info Section */}
      <section className="py-24 bg-canvas-alternate border-y-2 border-ink">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* Left Photo Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-2 gap-4 h-[300px] lg:h-[400px]">
                <Card className="h-full w-full">
                  <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop" alt="Students" className="w-full h-full object-cover" />
                </Card>
                <Card className="h-full w-full">
                  <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" alt="Students" className="w-full h-full object-cover" />
                </Card>
              </div>
              <p className="font-body text-sm lg:text-base border-l-4 border-ink pl-4">
                Krishna International School is a nestied to evenmg tfrom our mission tn mirittrron with conmprenesing, excellence in education, and provtinent and fermnnet to aonvrcsss edior brvodem:.onrroll national.: International Qualiliv, School and meavw:notieneets for ranxing and ehunoring enot leens for then meanc, we developed in compatasiire offilutes to school teer cnormain graduators; prio erish corersnoors in futures.
              </p>
            </motion.div>

            {/* Right Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 h-full">
              {[
                { title: "6,000+", subtitle: "Students & Faculties" },
                { title: "60+", subtitle: "National & International Awards" },
                { title: "100%", subtitle: "Parents Satisfaction" },
                { title: "CBSE", subtitle: "Affiliated School" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card hoverable className="h-full p-6 flex flex-col justify-center items-center text-center gap-2 aspect-square lg:aspect-auto">
                    <h3 className="font-display text-4xl lg:text-5xl text-ink">{stat.title}</h3>
                    <p className="font-display text-sm lg:text-base uppercase tracking-wider">{stat.subtitle}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to="/academics" className="block h-full">
              <Card hoverable className="h-full p-8 bg-canvas-alternate text-ink flex flex-col justify-between min-h-[250px] group border-ink">
                <div>
                  <h3 className="font-display text-3xl mb-4 group-hover:underline decoration-4 underline-offset-4">Academics</h3>
                  <p className="font-body text-ink/80 text-sm font-medium">Academics and unecription and oravirtics and students.</p>
                </div>
                <span className="font-display uppercase tracking-wider text-sm border-b-2 border-ink inline-block self-start pb-1 mt-8">Explore now</span>
              </Card>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/admission" className="block h-full">
              <Card hoverable className="h-full p-8 bg-accent-secondary text-white flex flex-col justify-between min-h-[250px] group border-ink">
                <div>
                  <h3 className="font-display text-3xl mb-4 group-hover:underline decoration-4 underline-offset-4">Admission</h3>
                  <p className="font-body text-white/80 text-sm font-medium">For more details in Admission for detars, dooor on Apply Now.</p>
                </div>
                <span className="font-display uppercase tracking-wider text-sm border-b-2 border-white inline-block self-start pb-1 mt-8">Apply Now</span>
              </Card>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/co-curricular" className="block h-full">
              <Card hoverable className="h-full p-8 bg-ink text-white flex flex-col justify-between min-h-[250px] group border-ink">
                <div>
                  <h3 className="font-display text-3xl mb-4 group-hover:underline decoration-4 underline-offset-4">Co-Curricular</h3>
                  <p className="font-body text-white/80 text-sm font-medium">Co-Curricular is a ouiting and information in engagement.</p>
                </div>
                <span className="font-display uppercase tracking-wider text-sm border-b-2 border-white inline-block self-start pb-1 mt-8">Explore now</span>
              </Card>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/gallery" className="block h-full">
              <Card hoverable className="h-full p-8 bg-accent-primary text-white flex flex-col justify-between min-h-[250px] group border-ink">
                <div>
                  <h3 className="font-display text-3xl mb-4 group-hover:underline decoration-4 underline-offset-4">Gallery</h3>
                  <p className="font-body text-white/80 text-sm font-medium">Explore a docomentsly ver the selivoow view of wverfons gallery.</p>
                </div>
                <span className="font-display uppercase tracking-wider text-sm border-b-2 border-white inline-block self-start pb-1 mt-8">View Gallery</span>
              </Card>
            </Link>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
