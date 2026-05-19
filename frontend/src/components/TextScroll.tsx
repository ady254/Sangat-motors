"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TextScrollProps {
  text: string;
  unit?: "Words" | "Letters";
  textColor?: string;
  ghostColor?: string;
  sectionHeightVh?: number;
}

function tokenizeWordsOrLetters(raw: string, unit: "Words" | "Letters") {
  const lines = raw.split("\n");
  const out: Array<{ kind: "token" | "br"; value: string; animIndex: number | null }> = [];
  let animIndex = 0;
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (unit === "Words") {
      const words = line.trim() ? line.trim().split(/\s+/) : [];
      for (let i = 0; i < words.length; i++) {
        out.push({ kind: "token", value: words[i], animIndex });
        animIndex++;
        if (i !== words.length - 1) {
          out.push({ kind: "token", value: " ", animIndex: null });
        }
      }
      if (!words.length) out.push({ kind: "token", value: "\xa0", animIndex: null });
    } else {
      for (const ch of line) {
        if (ch === " ") {
          out.push({ kind: "token", value: ch, animIndex: null });
        } else {
          out.push({ kind: "token", value: ch, animIndex });
          animIndex++;
        }
      }
      if (!line.length) out.push({ kind: "token", value: "\xa0", animIndex: null });
    }
    if (li !== lines.length - 1) out.push({ kind: "br", value: "", animIndex: null });
  }
  return out;
}

export default function TextScroll({
  text,
  unit = "Words",
  textColor = "#ffffff",
  ghostColor = "rgba(255, 255, 255, 0.15)",
  sectionHeightVh = 250,
}: TextScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section while it is sticky pinned
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to a smooth spring value
  const progressSpring = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 150,
    mass: 0.5,
  });

  const tokens = useMemo(() => tokenizeWordsOrLetters(text, unit), [text, unit]);
  
  const totalAnimated = useMemo(() => {
    let max = -1;
    for (const t of tokens) {
      if (t.kind === "token" && t.animIndex !== null) {
        max = Math.max(max, t.animIndex);
      }
    }
    return max + 1;
  }, [tokens]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0d0d0c] border-b border-zinc-900 overflow-visible"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-12 md:px-24">
        {/* Underglow accent detail */}
        <div className="absolute w-[500px] h-[500px] bg-orange-600/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase block mb-6">
            SANGAT MOTOR CENTRE BELIEF
          </span>

          <div className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight uppercase leading-relaxed text-zinc-650">
            {tokens.map((t, i) => {
              if (t.kind === "br") return <br key={`br-${i}`} />;
              
              if (t.animIndex === null || totalAnimated <= 0) {
                return (
                  <span key={`t-${i}`} style={{ color: ghostColor }}>
                    {t.value}
                  </span>
                );
              }

              // Calculate start and end range for this specific token
              const start = t.animIndex / totalAnimated;
              const end = (t.animIndex + 1.2) / totalAnimated; // slightly overlap for smooth blending

              // Transform color based on scroll progress
              const color = useTransform(
                progressSpring,
                [start, end],
                [ghostColor, textColor]
              );

              return (
                <motion.span
                  key={`t-${i}`}
                  style={{
                    color,
                    display: unit === "Letters" ? "inline-block" : "inline",
                  }}
                >
                  {t.value}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
