import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex-1 w-full flex items-center justify-center bg-canvas-primary min-h-[60vh]">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        noIndex={true}
      />
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-[10rem] md:text-[15rem] leading-none text-ink/10 select-none">
            404
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-6 -mt-8"
        >
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight">
            Page Not Found
          </h2>
          <p className="text-lg font-body max-w-md opacity-70">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-brutal shadow-brutal px-6 py-3 font-display text-sm uppercase tracking-wider hover:bg-ink hover:text-canvas-primary transition-colors"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
