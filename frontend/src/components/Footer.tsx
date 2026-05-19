"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import BookingModal from "./BookingModal";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0b0b0a] border-t border-zinc-900 pt-16 pb-8 text-zinc-400 relative z-10 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-zinc-900">

          {/* Column 1: About Brand */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-7 h-7 bg-orange-600 rounded flex flex-col justify-between items-center p-1.5 shrink-0">
                <div className="w-full h-0.5 bg-white rounded" />
                <div className="w-full h-0.5 bg-white/60 rounded" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-extrabold tracking-wider leading-none uppercase">
                  Sangat
                </span>
                <span className="text-orange-500 text-[9px] font-bold tracking-widest leading-none uppercase mt-0.5">
                  Motor Centre
                </span>
              </div>
            </a>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Your trusted partner for premium car care and performance in Ludhiana. We combine advanced mechanical technology with skilled expertise to keep your vehicle running at its best.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: "#" },
                { Icon: TwitterIcon, href: "#" },
                { Icon: InstagramIcon, href: "#" },
                { Icon: YoutubeIcon, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-orange-500 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-l-2 border-orange-500 pl-2">
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="#home" className="hover:text-white transition-colors uppercase">Home</a>
              <a href="#about" className="hover:text-white transition-colors uppercase">About Us</a>
              <a href="#services" className="hover:text-white transition-colors uppercase">Services</a>
              <a href="#products" className="hover:text-white transition-colors uppercase">Products</a>
              <a href="#testimonials" className="hover:text-white transition-colors uppercase">Testimonials</a>
              <a href="#faq" className="hover:text-white transition-colors uppercase">FAQ</a>
            </div>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-l-2 border-orange-500 pl-2">
              OUR SERVICES
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="#services" className="hover:text-white transition-colors uppercase font-mono">Car Servicing</a>
              <a href="#services" className="hover:text-white transition-colors uppercase font-mono">Diagnostics</a>
              <a href="#services" className="hover:text-white transition-colors uppercase font-mono">Repairs</a>
              <a href="#services" className="hover:text-white transition-colors uppercase font-mono">Car Wash</a>
              <a href="#services" className="hover:text-white transition-colors uppercase font-mono">Detailing</a>
              <a href="#services" className="hover:text-white transition-colors uppercase font-mono">Spare Parts</a>
            </div>
          </div>

          {/* Column 4: Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-l-2 border-orange-500 pl-2">
              CONTACT US
            </h4>
            <div className="flex flex-col gap-3.5 text-xs">
              <a href="tel:+919876543210" className="flex items-start gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="font-mono">+91 93869 92921</span>
              </a>
              <a href="mailto:hello@sangatmotorcentre.com" className="flex items-start gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="break-all">hello@sangatmotorcentre.com</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Digha Nahar Road, Pillar No - 242, Sarder Patel Road Danapur, Patna,Bihar</span>
              </div>
            </div>
          </div>

          {/* Column 5: Operating Hours & Booking */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-l-2 border-orange-500 pl-2">
              OPENING HOURS
            </h4>
            <div className="text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span>MON - SAT:</span>
                <span className="text-white">9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between text-orange-500/70 border-b border-zinc-900 pb-1">
                <span>SUNDAY:</span>
                <span>CLOSED</span>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full mt-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold tracking-widest uppercase rounded transition-all duration-300 shadow-md"
            >
              Book Your Service
            </button>
          </div>

        </div>

        {/* Bottom copyright and Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-zinc-650 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Sangat Motor Centre. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-850">|</span>
            <span>
              Designed & Maintained by{" "}
              <a
                href="https://innvox.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors font-bold"
              >
                innvox.in
              </a>
            </span>
          </div>
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors uppercase group"
          >
            BACK TO TOP
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
