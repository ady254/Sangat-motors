"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

interface SlideButtonProps {
  onSuccess: () => void;
  text?: string;
}

export default function SlideButton({ onSuccess, text = "SLIDE TO BOOK" }: SlideButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragRange, setDragRange] = useState(240);
  
  const x = useMotionValue(0);

  // Dynamically calculate drag range based on track width
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        // Track padding is 4px on each side (8px total)
        // Handle width is 48px
        setDragRange(trackRef.current.clientWidth - 48 - 8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map drag position to text opacity
  const textOpacity = useTransform(x, [0, dragRange * 0.7], [1, 0]);

  const handleDragEnd = () => {
    const currentX = x.get();

    // Trigger success if dragged 85% of the range
    if (currentX >= dragRange * 0.85) {
      setIsSuccess(true);
      x.set(dragRange); // Snap to the end
      onSuccess();

      // Reset after a short delay
      setTimeout(() => {
        x.set(0);
        setIsSuccess(false);
      }, 1500);
    } else {
      // Snap back to start
      x.set(0);
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full max-w-[290px] sm:max-w-[320px] h-14 bg-zinc-950/95 border border-zinc-800 rounded-full flex items-center p-1 overflow-hidden select-none shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
    >
      {/* Background slide feedback highlight */}
      <motion.div
        style={{ width: x }}
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-600/10 to-orange-600/30 rounded-l-full pointer-events-none"
      />

      {/* Guide text which fades out as handle moves */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold pl-12 pr-2 uppercase">
          {isSuccess ? "BOOKING MODAL OPENED" : text}
        </span>
      </motion.div>

      {/* Slide Handle */}
      <motion.div
        drag="x"
        dragElastic={0.02}
        dragConstraints={{ left: 0, right: dragRange }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`w-12 h-12 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center text-white shadow-md z-10 transition-colors duration-200 ${
          isSuccess ? "bg-green-600 hover:bg-green-500" : "bg-orange-600 hover:bg-orange-500"
        }`}
      >
        {isSuccess ? (
          <Check className="w-5 h-5" />
        ) : (
          <ArrowRight className="w-5 h-5 animate-pulse" />
        )}
      </motion.div>
    </div>
  );
}
