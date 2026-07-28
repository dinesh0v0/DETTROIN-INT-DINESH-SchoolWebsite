import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';
import { FileText } from 'lucide-react';

export function Portal() {
  const sections = ['Overview', 'Login', 'Alumni', 'Resources'];
  
  const [loginState, setLoginState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginState('loading');
    setTimeout(() => {
      setLoginState('success');
      setTimeout(() => setLoginState('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 w-full bg-canvas-primary">
      <SEO
        title="School Portal"
        description="Access the Krishna International School student portal — login, alumni network, and downloadable academic resources."
        keywords="school portal, student login, alumni, KIS resources"
        path="/portal"
        noIndex={true}
      />
      <SectionNav sections={sections} />
      
      <div className="container mx-auto px-4 md:px-6 py-20" id="overview">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight mb-8 md:mb-16 leading-[0.85]"
        >
          KIS <br/> School <br/> Portal
        </motion.h1>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Login Form */}
          <motion.div id="login" className="lg:col-span-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-8 md:p-12 bg-canvas-alternate">
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 md:mb-8">Portal Login</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-display text-lg uppercase tracking-wider">Username</label>
                  <input required type="text" className="h-14 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-lg uppercase tracking-wider">Password</label>
                  <input required type="password" className="h-14 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
                </div>
                
                <Button type="submit" size="lg" className="mt-4 text-xl bg-accent-primary hover:bg-accent-primary-hover" disabled={loginState !== 'idle'}>
                  {loginState === 'loading' ? 'Authenticating...' : loginState === 'success' ? 'Success!' : 'Log In'}
                </Button>
                
                <button type="button" className="font-display text-sm uppercase tracking-wider text-ink/60 hover:text-ink mt-2 min-h-[44px] transition-colors">
                  Forgot Password?
                </button>

                {loginState === 'success' && (
                  <p className="text-accent-secondary font-body text-center mt-2 text-sm font-medium">Logged in successfully (Demo).</p>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Alumni Success Stories */}
          <div id="alumni" className="lg:col-span-7">
            <h2 className="font-display text-4xl uppercase mb-8">Alumni Success Stories</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { name: "Radhi Nama", grad: "Graduating 2015", quote: "This describes how KIS shaped my world.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
                { name: "Machan Roash", grad: "Graduating 2021", quote: "We still concerning both hands in the achievements of future.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
                { name: "Manhan Kamor", grad: "Graduating 2022", quote: "I am growing our educator sincerely. KIS focused on manners.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" },
                { name: "Narean Kanora", grad: "Graduating 2023", quote: "I leave to chronology with realms and time with credits that successfully chose our host.", img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop" }
              ].map((alumni, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <Card className="p-4 bg-canvas-alternate flex flex-col h-full hoverable">
                    <div className="w-full h-48 border-brutal overflow-hidden mb-4 bg-canvas-alternate">
                      <img src={alumni.img} alt={alumni.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display text-xl uppercase">{alumni.name}</h4>
                    <p className="font-display text-xs text-ink/60 mb-3">{alumni.grad}</p>
                    <p className="font-body text-sm text-ink/80 flex-1">"{alumni.quote}"</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources */}
        <section id="resources" className="pt-16 border-t-2 border-ink">
          <h2 className="font-display text-4xl uppercase mb-8">Downloadable Resources</h2>
          <div className="flex flex-col border-brutal bg-canvas-alternate">
            {[
              { title: "Academic Calendar 2024-25", type: "PDF", file: "academic-calendar-2024-25.pdf" },
              { title: "Parent Handbook", type: "PDF", file: "parent-handbook.pdf" },
              { title: "Student Code of Conduct", type: "PDF", file: "student-code-of-conduct.pdf" },
              { title: "Fee Structure", type: "PDF", file: "fee-structure.pdf" }
            ].map((res, idx) => (
              <a href={`/resources/${res.file}`} download={res.file} key={idx} className="flex items-center justify-between p-6 border-b-2 border-ink last:border-b-0 hover:bg-canvas-primary transition-colors group min-h-[56px]">
                <span className="font-display text-xl md:text-2xl uppercase group-hover:text-accent-primary transition-colors">{res.title}</span>
                <div className="w-12 h-12 border-brutal flex items-center justify-center bg-canvas-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
