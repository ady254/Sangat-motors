"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowDown, Star, Users } from "lucide-react";
import ThreeCar from "./ThreeCar";
import BookingModal from "./BookingModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Logo items
  const brandLogos = [
    { name: "Castrol", sub: "Lubricants" },
    { name: "Mobil 1", sub: "Synthetic Oil" },
    { name: "BOSCH", sub: "Auto Parts" },
    { name: "MICHELIN", sub: "Premium Tires" },
    { name: "3M", sub: "Car Care" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#f4f4f3] overflow-hidden flex flex-col justify-between pt-24"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 w-full py-8">
        {/* Left Side: Taglines & Content */}
        <div className="lg:col-span-6 space-y-8 z-10 text-left">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 border border-orange-500/20 rounded-full bg-orange-500/5"
            >
              <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
                ESTABLISHED 2012 • BIHAR
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.05]"
            >
              DRIVEN BY <br className="hidden sm:block" />
              <span className="text-zinc-950">EXPERTISE.</span>
              <br />
              <span className="text-orange-500 block mt-1">POWERED BY TRUST.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-zinc-500 max-w-lg uppercase"
            >
              PREMIUM CARE. MAXIMUM PERFORMANCE. YOUR CAR, OUR COMMITMENT.
            </motion.p>
          </div>

          {/* Action buttons & support info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold tracking-widest uppercase rounded transition-all duration-300 shadow-[0_4px_25px_rgba(239,68,68,0.25)] hover:scale-105"
            >
              BOOK AN APPOINTMENT
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest text-zinc-500">NEED ASSISTANCE?</span>
              <a
                href="tel:919386992921"
                className="flex items-center gap-2 text-sm font-mono font-bold text-zinc-900 hover:text-orange-600 transition-colors mt-0.5"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                +91 93869 92921
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: 3D Car & Floating Stats */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Interactive 3D Canvas */}
          <div className="w-full relative">
            <ThreeCar />
          </div>

          {/* Floating Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-12 right-0 md:right-8 bg-white/95 border border-zinc-200 rounded-xl p-4 md:p-6 backdrop-blur-md shadow-2xl space-y-4 max-w-[200px] z-10 pointer-events-none"
          >
            <div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 block uppercase">
                TOP RATED
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 block uppercase mt-0.5">
                SERVICE CENTRE
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl md:text-2xl font-bold text-zinc-950 tracking-tight">4.9</span>
                <span className="text-zinc-500 text-sm font-mono">/ 5</span>
                <div className="flex text-orange-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-600/10 rounded-lg text-orange-500">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-zinc-950 block leading-none">5000+</span>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-500 block mt-1 uppercase">
                    HAPPY CUSTOMERS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">SCROLL DOWN</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="p-1 bg-white border border-zinc-200 rounded-full"
            >
              <ArrowDown className="w-3 h-3 text-orange-500" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Brand Partner Logos (Infinite Loop Slider) */}
      <div className="border-t border-zinc-200 bg-white/90 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            AUTHORIZED SERVICE PARTNERS & PRODUCTS
          </span>
          {/* Logo ticker */}
          <div className="overflow-hidden relative flex-1 max-w-xl">
            <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
              {brandLogos.concat(brandLogos).map((logo, idx) => (
                <div key={idx} className="inline-flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-mono tracking-widest text-zinc-800 uppercase font-bold">
                    {logo.name}
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">
                    ({logo.sub})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styled animation keyframes for the marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Booking Form Overlay */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
