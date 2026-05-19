"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const fullText = "WELCOME TO SANGAT MOTOR CENTRE";

  useEffect(() => {
    // Disable body scroll while splash screen is active
    document.body.style.overflow = "hidden";

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const char = fullText[index];
        setText((prev) => prev + char);
        index++;
      } else {
        clearInterval(interval);
        // Let it stand for a moment, then fade out
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "unset";
        }, 1200);
      }
    }, 60); // Typist speed (60ms per character)

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#f4f4f3] flex flex-col items-center justify-center"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          {/* Blueprint Corner Accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-zinc-300" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-zinc-300" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-zinc-300" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-zinc-300" />

          {/* Technical Info Header */}
          <div className="absolute top-8 left-20 right-20 flex justify-between items-center text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
            <span>SYS: INITIALIZING</span>
            <span>VER: 4.0.1</span>
          </div>

          <div className="space-y-6 flex flex-col items-center max-w-xl px-6 text-center">
            {/* Logo Icon */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-12 h-12 flex flex-col justify-between items-center bg-orange-600 rounded-lg p-2.5 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
            >
              <div className="w-full h-1.5 bg-white rounded" />
              <div className="w-full h-1.5 bg-white/60 rounded" />
              <div className="w-full h-1.5 bg-orange-200 rounded" />
            </motion.div>

            {/* Typewriter text */}
            <div className="min-h-[40px] flex items-center justify-center">
              <h1 className="text-sm sm:text-base md:text-lg font-mono font-bold tracking-[0.2em] text-zinc-900 uppercase">
                {text}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-4 ml-1.5 bg-orange-500 align-middle"
                />
              </h1>
            </div>
          </div>

          {/* Technical Loading line */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-zinc-200 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-orange-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
