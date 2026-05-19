"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, Sparkles, CheckCircle } from "lucide-react";
import BookingModal from "./BookingModal";

export default function PromoGallery() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-[#f4f4f3] py-24 border-b border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Suspension close-up */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-zinc-200 aspect-[4/3] lg:aspect-auto min-h-[300px] md:min-h-[400px] group shadow-xl"
          >
            <Image
              src="/brake-repair.webp"
              alt="Brake Repair and Suspension Custom Tuning"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Tech details on overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-orange-500 block uppercase">
                  DIAGNOSTIC CASE STUDY
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase mt-1">
                  Suspension Custom Calibration
                </h3>
              </div>
              <span className="text-[9px] font-mono text-zinc-400 bg-zinc-950/80 px-2 py-1 rounded border border-zinc-800">
                O-SPRING STAGE 2
              </span>
            </div>
          </motion.div>

          {/* Right Column: Combined Info Blocks */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            
            {/* Top Right Card: SANGAT + QR booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-zinc-250 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden"
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-orange-500/50" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-orange-500/50" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-orange-500/50" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-orange-500/50" />

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-orange-600">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    EASY SCHEDULING
                  </span>
                </div>
                <h4 className="text-xl font-bold tracking-tight text-zinc-950 uppercase">
                  SANGAT MOTOR CENTRE
                </h4>
                <p className="text-xs text-zinc-650 max-w-xs">
                  Scan the QR code to instantly schedule a service slot directly from your mobile device.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                  <span>Works in 15 seconds</span>
                </div>
              </div>

              {/* QR Code Graphic container */}
              <div className="flex flex-col items-center gap-2 bg-zinc-50 p-3.5 rounded-xl shrink-0 shadow-sm border border-zinc-200">
                <div className="relative w-28 h-28 bg-white flex items-center justify-center rounded-lg border border-zinc-150">
                  {/* Clean SVG QR code representation */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 text-zinc-900"
                    fill="currentColor"
                  >
                    <rect x="0" y="0" width="20" height="20" />
                    <rect x="5" y="5" width="10" height="10" fill="white" />
                    <rect x="80" y="0" width="20" height="20" />
                    <rect x="85" y="5" width="10" height="10" fill="white" />
                    <rect x="0" y="80" width="20" height="20" />
                    <rect x="5" y="85" width="10" height="10" fill="white" />
                    {/* Random block grids to simulate QR code */}
                    <rect x="30" y="0" width="10" height="10" />
                    <rect x="50" y="0" width="5" height="15" />
                    <rect x="65" y="5" width="10" height="5" />
                    <rect x="10" y="30" width="15" height="10" />
                    <rect x="35" y="25" width="20" height="20" />
                    <rect x="65" y="25" width="10" height="15" />
                    <rect x="0" y="50" width="10" height="10" />
                    <rect x="15" y="60" width="10" height="5" />
                    <rect x="40" y="55" width="15" height="15" />
                    <rect x="80" y="50" width="15" height="10" />
                    <rect x="30" y="80" width="15" height="15" />
                    <rect x="55" y="80" width="20" height="5" />
                    <rect x="65" y="90" width="10" height="10" />
                  </svg>
                </div>
                <span className="text-[8px] font-mono tracking-wider text-zinc-600 font-semibold uppercase">
                  SCAN TO BOOK SERVICE
                </span>
              </div>
            </motion.div>

            {/* Bottom Right Card: EXPERIENCE THE DIFFERENCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-zinc-250 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md flex-1 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase">
                  OUR PHILOSOPHY
                </span>
                <h4 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight uppercase leading-tight">
                  EXPERIENCE THE DIFFERENCE.<br />
                  <span className="text-orange-500">FEEL THE PERFORMANCE.</span>
                </h4>
                <p className="text-xs text-zinc-655 max-w-sm">
                  We don&apos;t just fix problems; we optimize your car for premium responsiveness and speed.
                </p>
              </div>

              {/* Action Button Trigger */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center text-white shrink-0 group self-end md:self-center transition-all duration-300 shadow-[0_4px_15px_rgba(239,68,68,0.2)] hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
