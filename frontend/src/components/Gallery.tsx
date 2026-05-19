"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getGallery } from "@/lib/sanity";
import { GalleryItem } from "@/lib/cmsData";

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getGallery();
      setGallery(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const categories = ["All", ...Array.from(new Set(gallery.map((item) => item.category)))];

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (isHovered || filteredGallery.length <= visibleCards) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex > filteredGallery.length - visibleCards ? 0 : nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, filteredGallery.length, visibleCards]);

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, filteredGallery.length - visibleCards) : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev >= filteredGallery.length - visibleCards ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <section
      id="products"
      className="relative bg-[#f4f4f3] py-24 md:py-32 border-b border-zinc-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header and filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
              GALLERY
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none">
              WORK IN PROGRESS
            </h2>
            <p className="text-zinc-650 text-xs font-mono tracking-wider max-w-lg uppercase">
              ACTUAL PHOTOS OF HIGH-PERFORMANCE CAR MAINTENANCE CARRIED OUT IN OUR BIHAR AUTO CLINIC.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded-lg border transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-350"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Carousel Container */}
        <div 
          className="relative w-full px-1 py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows overlay */}
          {filteredGallery.length > visibleCards && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 border border-zinc-250 shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 border border-zinc-250 shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                x: `calc(-${(currentIndex * 100) / visibleCards}% - ${(currentIndex * 24) / visibleCards}px)`
              }}
              transition={{ type: "spring", stiffness: 185, damping: 26 }}
              className="flex gap-6 w-full"
            >
              {filteredGallery.map((item, idx) => (
                <div
                  key={item._id}
                  onClick={() => setLightboxIndex(idx)}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 group relative aspect-[4/3] bg-white border border-zinc-200 rounded-xl overflow-hidden cursor-pointer shadow-md hover:border-orange-500/50 transition-colors"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Glass Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                    <div className="flex justify-end">
                      <div className="p-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-left space-y-1">
                      <span className="text-[9px] font-mono tracking-widest text-orange-400 uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators / Progress dots */}
          {filteredGallery.length > visibleCards && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: filteredGallery.length - visibleCards + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-6 bg-orange-600" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            {/* Close button outside */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors z-55"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full bg-zinc-900/50 text-zinc-400 hover:text-white border border-zinc-800/50 transition-colors z-55 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full bg-zinc-900/50 text-zinc-400 hover:text-white border border-zinc-800/50 transition-colors z-55 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                fill
                style={{ objectFit: "contain" }}
                className="bg-zinc-950"
              />

              {/* Title Overlay in Lightbox */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-left">
                <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
                  {filteredGallery[lightboxIndex].category}
                </span>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mt-1">
                  {filteredGallery[lightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
