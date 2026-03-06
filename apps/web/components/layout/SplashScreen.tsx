"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          >
            {/* Official Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 140" fill="none" width={72} height={80}>
                <path d="M52 135C22 118 2 88 6 55C9 28 25 8 45 0C35 12 26 30 24 50C22 72 30 98 52 135Z" fill="#7B2D8E"/>
                <path d="M45 0C56-3 70 3 80 18C72 34 66 52 68 66C70 82 60 105 52 135C48 108 46 80 48 60C50 40 48 18 45 0Z" fill="#D6246E"/>
                <path d="M80 18C88 30 94 46 90 62C86 78 76 94 62 108C72 92 74 78 68 66C66 52 72 34 80 18Z" fill="#EE3D24"/>
                <path d="M90 62C94 46 90 32 85 22C95 34 100 48 96 64C93 78 84 90 72 100C82 86 88 74 90 62Z" fill="#F9A01B"/>
              </svg>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide leading-tight">
                  <span className="text-[#4A4A4A]">CONTENT</span>
                  <br />
                  <span className="text-[#702874]">THAILAND</span>
                </h1>
              </div>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-10 flex items-center gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-[#702874]"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
