"use client";

import { motion } from "framer-motion";
import { Users, Cpu, ShieldCheck, Heart } from "lucide-react";

export default function Banner() {
  const benefits = [
    {
      icon: Users,
      title: "EXPERT TEAM",
      desc: "Skilled professionals you can trust with your high-end performance vehicles.",
    },
    {
      icon: Cpu,
      title: "MODERN EQUIPMENT",
      desc: "Advanced diagnostic scanners and specialized tools for accurate service.",
    },
    {
      icon: ShieldCheck,
      title: "QUALITY PARTS",
      desc: "100% genuine OEM spare parts to guarantee durability and warranty status.",
    },
    {
      icon: Heart,
      title: "CUSTOMER FOCUS",
      desc: "Honest transparent advice and service packages designed to exceed standards.",
    },
  ];

  return (
    <section className="relative bg-[#0d0d0c] py-20 border-b border-zinc-900 overflow-hidden">
      {/* Mesh/Carbon background effect */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
            ABOUT SANGAT MOTOR CENTRE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
            WELCOME TO SANGAT MOTOR CENTRE <br className="hidden md:block" />
            <span className="text-orange-500">WHERE QUALITY MEETS PERFORMANCE</span>
          </h2>
          <div className="w-16 h-1 bg-orange-600 mx-auto my-4 rounded" />
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto uppercase tracking-wide">
            We are passionate about cars and committed to delivering unmatched service quality. From regular servicing to complete car care, we ensure your ride stays smooth, safe, and reliable. Because your trust drives us forward.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={benefit.title}
                className="group relative bg-zinc-900/50 border border-zinc-805 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300 flex flex-col items-center text-center shadow-xl hover:-translate-y-1"
              >
                {/* Underglow neon lines */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/60 transition-all duration-500" />

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-orange-500 group-hover:scale-110 transition-transform duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {benefit.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
