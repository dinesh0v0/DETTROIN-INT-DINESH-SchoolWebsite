import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { cn, slugify } from '@/lib/utils';
import { Button } from './Button';

const NAV_ITEMS = [
  { name: 'About KIS', path: '/about', sections: ['Overview', 'Timeline', 'Leadership', 'Vision & Mission'] },
  { name: 'Admission', path: '/admission', sections: ['Overview', 'Process', 'Fee Structure', 'Enroll', 'Fee Payment'] },
  { name: 'Academics', path: '/academics', sections: ['Overview', 'Curriculum', 'Faculty', 'Examination'] },
  { name: 'Co-Curricular', path: '/co-curricular', sections: ['Overview', 'Sports', 'Fine Arts', 'Performing Arts', 'Excursions', 'Gallery Snippets'] },
  { name: 'School Events', path: '/events', sections: ['Upcoming'] },
  { name: 'Portal', path: '/portal', sections: ['Overview', 'Login', 'Alumni', 'Resources'] },
  { name: 'Gallery', path: '/gallery', sections: ['Images', 'Facebook', 'Instagram'] },
  { name: 'Join Us', path: '/join-us', sections: ['Overview', 'Vacancy', 'Why Join Us', 'Registration'] },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDesktopItem, setActiveDesktopItem] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 80], [100, 70]);
  const headerPadding = useTransform(scrollY, [0, 80], [24, 12]);
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(243, 239, 231, 0.8)', 'rgba(243, 239, 231, 0.95)']);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        style={shouldReduceMotion ? { backgroundColor: 'rgba(243, 239, 231, 0.95)' } : { height: headerHeight, backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 border-b-2 border-ink backdrop-blur-md flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 border-brutal bg-canvas-alternate flex items-center justify-center group-hover:bg-ink group-hover:text-canvas-primary transition-colors">
              <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl leading-none tracking-tight">KRISHNA</span>
              <span className="font-display text-xs md:text-sm leading-none text-ink/70">INTERNATIONAL SCHOOL</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDesktopItem(item.name)}
                onMouseLeave={() => setActiveDesktopItem(null)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "px-2 xl:px-3 py-2 font-display text-xs xl:text-sm uppercase tracking-wide flex items-center gap-0.5 transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-sm whitespace-nowrap",
                    isActive ? "text-accent-primary" : "text-ink"
                  )}
                >
                  {item.name}
                  <ChevronDown className="w-3 h-3 opacity-50 hidden xl:block" />
                </NavLink>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDesktopItem === item.name && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-4 w-64 bg-canvas-primary border-brutal shadow-brutal p-4"
                    >
                      <div className="flex flex-col gap-2">
                        {item.sections.map((section) => (
                          <Link
                            key={section}
                            to={`${item.path}#${slugify(section)}`}
                            className="font-body text-sm font-medium hover:text-accent-primary hover:translate-x-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-sm px-1"
                            onClick={() => setActiveDesktopItem(null)}
                          >
                            {section}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 border-brutal bg-canvas-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Drawer panel — slides in from the right, fixed width */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={{ x: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[80vw] max-w-xs bg-canvas-primary border-l-2 border-ink flex flex-col lg:hidden shadow-brutal-lg"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-ink shrink-0">
                <span className="font-display text-sm uppercase tracking-wider">Menu</span>
                <button
                  className="w-10 h-10 flex items-center justify-center border-brutal bg-canvas-alternate hover:bg-ink hover:text-canvas-primary transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="flex flex-col divide-y divide-ink/10">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => cn(
                          "flex items-center justify-between py-3.5 font-display text-sm uppercase tracking-wider transition-colors",
                          isActive ? "text-accent-primary" : "text-ink hover:text-accent-primary"
                        )}
                        onClick={closeMobileMenu}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 opacity-40 shrink-0" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-4 border-t-2 border-ink shrink-0">
                <NavLink
                  to="/admission"
                  onClick={closeMobileMenu}
                  className="block w-full text-center font-display text-sm uppercase tracking-wider bg-accent-primary text-white py-3 border-brutal hover:bg-accent-primary-hover transition-colors"
                >
                  Enroll Now →
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
