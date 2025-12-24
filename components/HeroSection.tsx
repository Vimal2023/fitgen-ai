"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="
          absolute inset-0 -z-10
          bg-linear-to-b
          from-white via-neutral-50 to-white
          dark:from-black dark:via-neutral-900 dark:to-black
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl px-6 text-center"
      >
        {/* Heading */}
        <h1
          className="
            text-4xl md:text-6xl font-bold tracking-tight
            text-neutral-900 dark:text-white
          "
        >
          Transform Your{" "}
          <span
            className="
              bg-linear-to-r
              from-emerald-500 to-cyan-500
              dark:from-emerald-400 dark:to-cyan-400
              bg-clip-text text-transparent
            "
          >
            Fitness Journey
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-6 text-lg md:text-xl
            text-neutral-600 dark:text-neutral-400
          "
        >
          Get your personalized workout and diet plan powered by AI.
          Tailored to your goals, lifestyle, and preferences.
        </p>

        {/* Powered by */}
        <div
          className="
            mt-8 flex items-center justify-center gap-2 text-sm
            text-neutral-500 dark:text-neutral-400
          "
        >
          <Sparkles className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <span>Powered by Google Gemini AI</span>
        </div>
      </motion.div>
    </section>
  );
}
