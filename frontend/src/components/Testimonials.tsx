"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestimonials } from "@/lib/sanity";
import { Testimonial } from "@/lib/cmsData";
import Image from "next/image";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    async function loadData() {
      const data = await getTestimonials();
      setTestimonials(data);
    }
    loadData();
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative bg-[#f4f4f3] py-24 md:py-32 border-b border-zinc-200 overflow-hidden"
    >
      {/* Background blueprint details */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header with Nav buttons */}
        <div className="flex items-center justify-between mb-16 border-b border-zinc-200 pb-6">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight uppercase mt-2">
              WHAT OUR <span className="text-orange-500">CUSTOMERS</span> SAY
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2 bg-white border border-zinc-200 rounded-lg hover:border-orange-500 text-zinc-500 hover:text-zinc-900 transition-all duration-300 active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-white border border-zinc-200 rounded-lg hover:border-orange-500 text-zinc-500 hover:text-zinc-900 transition-all duration-300 active:scale-95 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Box */}
        <div className="relative min-h-[250px] flex items-center justify-center bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-md overflow-hidden">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-zinc-100 pointer-events-none" />
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full space-y-6 text-left relative z-10"
            >
              <p className="text-base md:text-lg text-zinc-800 italic leading-relaxed font-sans">
                &ldquo;{current.content}&rdquo;
              </p>

              <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
                      {current.name}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5 block">
                      {current.role}
                    </span>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 text-orange-500 bg-orange-500/5 px-2.5 py-1 rounded-md border border-orange-500/10">
                  {Array.from({ length: current.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-orange-500" : "bg-zinc-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
