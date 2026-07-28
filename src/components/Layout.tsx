import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col pt-[100px] bg-canvas-primary selection:bg-accent-primary selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
