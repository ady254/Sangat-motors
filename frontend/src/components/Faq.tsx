"use client";

import { useEffect, useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFAQs } from "@/lib/sanity";
import { FAQ } from "@/lib/cmsData";
import ScrollReveal from "./ScrollReveal";

export default function Faq() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getFAQs();
      setFaqs(data);
    }
    loadData();
  }, []);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="relative bg-[#f4f4f3] py-24 md:py-32 border-b border-zinc-200 overflow-hidden"
    >
      {/* Background blueprint details */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight uppercase">
              FREQUENTLY ASKED <span className="text-orange-500">QUESTIONS</span>
            </h2>
            <div className="w-12 h-1 bg-orange-600 mx-auto my-4 rounded" />
          </div>
        </ScrollReveal>

        {/* Accordions */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq._id}
                  className="bg-white border border-zinc-200 rounded-xl overflow-hidden transition-colors duration-300 hover:border-zinc-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-zinc-950 tracking-wider uppercase font-mono">
                        {faq.question}
                      </span>
                    </div>
                    <div className="p-1 rounded bg-zinc-50 border border-zinc-150 text-zinc-500 transition-colors shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-650 leading-relaxed border-t border-zinc-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
