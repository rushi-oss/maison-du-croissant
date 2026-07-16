'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroParallax() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffsetY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

      <Image
        src="/hero2.jpeg"
        alt="Maison du Croissant"
        fill
        className="object-cover object-[40%_50%]"
        style={{ transform: `translateY(${offsetY * 0.6}px)` }}
        priority
      />
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
        <h1 className="font-serif text-4xl text-[#FDF6EC] leading-snug">
          Fresh from our oven<br />to your hands
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-36 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <p className="text-[#FDF6EC]/80 text-xs font-medium tracking-widest uppercase">
          Scroll to explore
        </p>
        <svg
          className="w-5 h-5 text-[#FDF6EC]/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  );
}
