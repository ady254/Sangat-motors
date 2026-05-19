"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md py-4 border-b border-zinc-200"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex flex-col justify-between items-center bg-orange-600 rounded p-1.5 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-1 bg-white rounded" />
              <div className="w-full h-1 bg-white/60 rounded" />
              <div className="w-full h-1 bg-orange-200 rounded" />
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-900 text-base font-extrabold tracking-wider leading-none font-sans uppercase">
                Sangat
              </span>
              <span className="text-orange-500 text-[10px] font-bold tracking-widest leading-none font-sans uppercase mt-1">
                Motor Centre
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300 uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:919386992921"
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+91 93869 92921</span>
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold tracking-wider uppercase rounded transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.2)] hover:shadow-[0_4px_25px_rgba(239,68,68,0.3)] hover:-translate-y-0.5"
            >
              Book Service
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slider Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-[#f4f4f3] border-l border-zinc-200 p-8 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded flex flex-col justify-between items-center p-1">
                      <div className="w-full h-0.5 bg-white rounded" />
                      <div className="w-full h-0.5 bg-white/60 rounded" />
                    </div>
                    <span className="text-zinc-900 text-sm font-extrabold tracking-widest uppercase">SANGAT</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded bg-zinc-200 text-zinc-500 hover:text-zinc-950"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-mono tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors uppercase"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-zinc-200">
                <a
                  href="tel:919386992921"
                  className="flex items-center gap-3 text-xs font-mono text-zinc-500 hover:text-zinc-950 transition-colors"
                >
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>+91 93869 92921</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 text-center"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Form Overlay */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
