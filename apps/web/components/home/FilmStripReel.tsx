"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const filmPosters = [
  { src: "/posters/bad-genius.jpg", title: "Bad Genius" },
  { src: "/posters/how-to-make-millions.jpg", title: "How to Make Millions" },
  { src: "/posters/pee-mak.jpg", title: "Pee Mak" },
  { src: "/posters/ong-bak.jpg", title: "Ong-Bak" },
  { src: "/posters/bad-genius.jpg", title: "Bad Genius 2" },
  { src: "/posters/how-to-make-millions.jpg", title: "How to Make Millions 2" },
  { src: "/posters/pee-mak.jpg", title: "Pee Mak 2" },
  { src: "/posters/ong-bak.jpg", title: "Ong-Bak 2" },
];

function PosterCard({ src, title, index }: { src: string; title: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
      className="relative flex-shrink-0 w-[120px] h-[170px] md:w-[140px] md:h-[200px] rounded-xl overflow-hidden group"
    >
      {/* Film sprocket holes top */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-black/80 z-10 flex items-center justify-around px-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-700" />
        ))}
      </div>
      {/* Film sprocket holes bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/80 z-10 flex items-center justify-around px-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-700" />
        ))}
      </div>

      <Image
        src={src}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="140px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      <div className="absolute inset-0 border border-white/10 rounded-xl" />
    </motion.div>
  );
}

export function FilmStripReel() {
  // Double the array for seamless loop
  const doubledPosters = [...filmPosters, ...filmPosters];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A1B] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A1B] to-transparent z-10" />

      {/* Row 1 - scroll left */}
      <motion.div
        animate={{ x: [0, -1280] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 mb-3"
      >
        {doubledPosters.map((p, i) => (
          <PosterCard key={`row1-${i}`} src={p.src} title={p.title} index={i % filmPosters.length} />
        ))}
      </motion.div>

      {/* Row 2 - scroll right */}
      <motion.div
        animate={{ x: [-1280, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex gap-3"
      >
        {doubledPosters.reverse().map((p, i) => (
          <PosterCard key={`row2-${i}`} src={p.src} title={p.title} index={i % filmPosters.length} />
        ))}
      </motion.div>
    </div>
  );
}
