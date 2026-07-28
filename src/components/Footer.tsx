import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  return (
    <footer className="bg-ink text-canvas-primary border-t-brutal pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-canvas-primary flex items-center justify-center bg-canvas-primary text-ink">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl leading-none tracking-tight">KRISHNA</span>
                <span className="font-display text-sm leading-none text-canvas-primary/70">INTERNATIONAL SCHOOL</span>
              </div>
            </Link>
            <p className="font-body text-canvas-primary/80 leading-relaxed">
              Altening minds and otmoting futures of Krishna International school. A foundation of excellence in education.
            </p>
          </div>

          {/* Sitemap Col */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display tracking-wider text-lg uppercase border-b-2 border-canvas-primary/20 pb-2 inline-block">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 font-body text-sm text-canvas-primary/80">
              <li><Link to="/about" className="hover:text-white transition-colors">About KIS</Link></li>
              <li><Link to="/admission" className="hover:text-white transition-colors">Admission</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Academics</Link></li>
              <li><Link to="/co-curricular" className="hover:text-white transition-colors">Co-Curricular</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">School Events</Link></li>
              <li><Link to="/portal" className="hover:text-white transition-colors">Portal</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/join-us" className="hover:text-white transition-colors">Join Us</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display tracking-wider text-lg uppercase border-b-2 border-canvas-primary/20 pb-2 inline-block">Contact</h4>
            <ul className="flex flex-col gap-4 font-body text-sm text-canvas-primary/80">
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=Krishna+International+School,+Aligarh,+UP,+India" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors group">
                  <MapPin className="w-5 h-5 shrink-0 group-hover:text-accent-primary transition-colors" />
                  <span>Krishna International School, NX, Road Rhain, 20941<br/>Aligarh, U.P. INDIA</span>
                </a>
              </li>
              <li>
                <a href="tel:+919136510570" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 shrink-0 group-hover:text-accent-primary transition-colors" />
                  <span>+91 913651 0570</span>
                </a>
              </li>
              <li>
                <a href="mailto:krishnah@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 shrink-0 group-hover:text-accent-primary transition-colors" />
                  <span>krishnah@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social / App Col */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display tracking-wider text-lg uppercase border-b-2 border-canvas-primary/20 pb-2 inline-block">Social Media</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-canvas-primary flex items-center justify-center hover:bg-canvas-primary hover:text-ink transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-canvas-primary flex items-center justify-center hover:bg-canvas-primary hover:text-ink transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-canvas-primary flex items-center justify-center hover:bg-canvas-primary hover:text-ink transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-canvas-primary flex items-center justify-center hover:bg-canvas-primary hover:text-ink transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-4 p-4 border-2 border-canvas-primary bg-ink inline-block">
              <h5 className="font-display text-sm mb-3 text-center">School App Download</h5>
              <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center gap-1">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=android-app" alt="Android App QR" className="w-16 h-16 bg-white p-1 border-2 border-canvas-primary" />
                  <span className="text-[10px] font-display uppercase tracking-widest text-canvas-primary">Android</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ios-app" alt="iOS App QR" className="w-16 h-16 bg-white p-1 border-2 border-canvas-primary" />
                  <span className="text-[10px] font-display uppercase tracking-widest text-canvas-primary">iOS</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-canvas-primary/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-canvas-primary/60">
          <p>&copy; {new Date().getFullYear()} KRISHNA INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
          <a href="https://wa.me/919136510570" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent-secondary font-bold hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
