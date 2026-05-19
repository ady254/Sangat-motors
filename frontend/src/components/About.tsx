"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Compass, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="relative bg-[#f4f4f3] py-24 md:py-32 overflow-hidden border-b border-zinc-200"
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-100" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Who We Are */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
                WHO WE ARE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mt-2 uppercase leading-none">
                PRECISION SERVICE.<br />
                EVERY TIME.
              </h2>
            </div>
            <p className="text-zinc-600 text-sm leading-relaxed">
              At Sangat Motor Centre, we combine advanced automotive technology with decades of skilled expertise to keep your high-performance vehicle running at its absolute best. We treat every car with a level of attention and precision that sets the benchmark in premium car maintenance.
            </p>
            <p className="text-zinc-400 text-xs font-mono">
              EST. 2012 • 10,000+ VEHICLES DETAILED & SERVICED
            </p>
            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-950 hover:text-orange-600 transition-colors uppercase group border-b border-zinc-950 hover:border-orange-500 pb-1"
              >
                KNOW MORE
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Center Column: Aesthetic Car Graphic (Remains Dark as in Mockup) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex justify-center relative"
          >
            {/* Blueprint Box Overlay */}
            <div className="absolute inset-0 border border-dashed border-orange-500/20 rounded-2xl pointer-events-none scale-105" />
            
            <div className="relative w-full max-w-[340px] aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between overflow-hidden group shadow-2xl">
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-orange-500" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-orange-500" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-orange-500" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-orange-500" />

              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase">SPEC: CHASSIS TOP</span>
                <h3 className="text-sm font-bold text-white tracking-wider uppercase mt-1">POR-911 STAGE 3</h3>
              </div>

              <div className="my-6 relative w-full h-72 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/hero1.webp"
                  alt="Porsche Blueprint Top View"
                  fill
                  style={{ objectFit: "contain" }}
                  className="filter drop-shadow-[0_15px_30px_rgba(255,90,31,0.15)]"
                />
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-zinc-550">
                <span>ROTATION: ACTIVE</span>
                <span className="text-orange-500">SYSTEM STABLE</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: What We Do */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
                WHAT WE DO
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mt-2 uppercase leading-none">
                PREMIUM REPAIRS.<br />
                TRUSTED RESULTS.
              </h2>
            </div>
            <p className="text-zinc-600 text-sm leading-relaxed">
              From routine software-based diagnostics to complex transmission overhauls, we deliver reliable, fully transparent auto solutions customized for your vehicle.
            </p>

            {/* Checklist items */}
            <div className="space-y-3.5 pt-2">
              {[
                { label: "Expert Technicians", desc: "Factory-trained mechanics" },
                { label: "Genuine Spare Parts", desc: "100% OEM original replacements" },
                { label: "Advanced Diagnostics", desc: "Computerized scanner fault detection" },
                { label: "Fast & Reliable Service", desc: "Same-day turnaround on key tasks" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-zinc-950 block uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-xs text-zinc-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
              >
                OUR SERVICES
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
