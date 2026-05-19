"use client";

import { useEffect, useState, useRef } from "react";
import { Wrench, Cpu, Droplets, Sparkles, ShieldAlert, Settings, ArrowRight, Check } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { getServices } from "@/lib/sanity";
import { Service } from "@/lib/cmsData";
import BookingModal from "./BookingModal";

const iconMap: Record<string, any> = {
  Wrench: Wrench,
  Cpu: Cpu,
  Droplets: Droplets,
  Sparkles: Sparkles,
  ShieldAlert: ShieldAlert,
  Settings: Settings,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getServices();
      setServices(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBookService = (title: string) => {
    setSelectedService(title);
    setModalOpen(true);
  };

  // scroll range calculation
  const [xRange, setXRange] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => {
      if (scrollRef.current) {
        const totalWidth = scrollRef.current.scrollWidth;
        const visibleWidth = window.innerWidth;
        // set translation range to align the last card with the right side of the screen
        setXRange(Math.max(0, totalWidth - visibleWidth + 96));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 600);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [services, isMobile, mounted]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -xRange]);
  const xSpring = useSpring(xTransform, { damping: 45, stiffness: 220, mass: 0.8 });

  // Fallback for SSR and Mobile layouts
  if (!mounted || isMobile) {
    return (
      <section
        ref={containerRef}
        id="services"
        className="relative bg-[#f4f4f3] py-24 md:py-32 border-b border-zinc-200 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
                OUR EXPERTISE
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none">
                PREMIUM AUTO SOLUTIONS
              </h2>
              <p className="text-zinc-650 text-xs font-mono tracking-wider max-w-xl uppercase">
                REPAIR, MAINTENANCE, DETAILED DETAILING & DIAGNOSTICS BUILT TO RESTORE ORIGINAL CAR POWER.
              </p>
            </div>
            <div className="shrink-0 text-left">
              <span className="text-[10px] font-mono text-zinc-550 uppercase">
                ALL WORK CARRIED OUT BY OEM EXPERT TEAM
              </span>
              <div className="w-32 h-[1px] bg-zinc-200 mt-2" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Wrench;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  key={service._id}
                  className="group bg-white border border-zinc-200 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-md relative overflow-hidden text-left"
                >
                  <div className="absolute inset-0 border border-transparent group-hover:border-orange-500/10 rounded-2xl pointer-events-none" />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl text-orange-500">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-zinc-400 font-bold">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-zinc-950 tracking-wide uppercase group-hover:text-orange-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-zinc-650 leading-relaxed min-h-[48px]">
                        {service.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-zinc-100">
                      {service.features?.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="text-[11px] font-mono tracking-wider text-zinc-550 uppercase">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleBookService(service.title)}
                    className="w-full mt-8 py-2.5 bg-zinc-50 border border-zinc-200 hover:bg-orange-600 hover:border-orange-600 text-zinc-700 hover:text-white rounded-lg text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Book Service
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={selectedService}
        />
      </section>
    );
  }

  // Premium Horizontal Scroll layout on Desktop
  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#f4f4f3] border-b border-zinc-200">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col">
          {/* Section Header */}
          <div className="flex flex-row items-end justify-between mb-16 gap-6">
            <div className="text-left space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
                OUR EXPERTISE
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none">
                ELITE AUTO SOLUTIONS
              </h2>
              <p className="text-zinc-650 text-xs font-mono tracking-wider max-w-xl uppercase">
                REPAIR, MAINTENANCE, DETAILED DETAILING & DIAGNOSTICS BUILT TO RESTORE ORIGINAL CAR POWER.
              </p>
            </div>
            <div className="shrink-0 text-left">
              <span className="text-[10px] font-mono text-zinc-550 uppercase font-bold tracking-wider">
                SCROLL DOWN TO EXPLORE SERVICES →
              </span>
              <div className="w-40 h-[1px] bg-zinc-300 mt-2" />
            </div>
          </div>

          {/* Horizontal Scroller Container */}
          <div className="w-full relative overflow-visible">
            <motion.div
              ref={scrollRef}
              style={{ x: xSpring }}
              className="flex gap-8 pl-4 pr-[25vw] py-4 w-max"
            >
              {services.map((service, idx) => {
                const IconComponent = iconMap[service.icon] || Wrench;
                return (
                  <div
                    key={service._id}
                    className="w-[360px] sm:w-[380px] shrink-0 bg-white border border-zinc-200 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-md relative overflow-hidden text-left group"
                  >
                    <div className="absolute inset-0 border border-transparent group-hover:border-orange-500/10 rounded-2xl pointer-events-none" />

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl text-orange-500 group-hover:scale-105 transition-transform duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-zinc-400 font-bold">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-zinc-950 tracking-wide uppercase group-hover:text-orange-500 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-zinc-650 leading-relaxed min-h-[48px]">
                          {service.description}
                        </p>
                      </div>

                      <ul className="space-y-2 pt-2 border-t border-zinc-100">
                        {service.features?.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            <span className="text-[11px] font-mono tracking-wider text-zinc-550 uppercase">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleBookService(service.title)}
                      className="w-full mt-8 py-2.5 bg-zinc-50 border border-zinc-200 hover:bg-orange-600 hover:border-orange-600 text-zinc-700 hover:text-white rounded-lg text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      Book Service
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
