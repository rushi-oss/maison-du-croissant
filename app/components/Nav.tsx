"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "/menu" },
  { label: "Pre-order", href: "/preorder" },
  { label: "About Us", href: "/about" },
  { label: "Location", href: "/location" },
  { label: "Follow Us", href: "/follow-us" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[998]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#FDF6EC] z-[999] transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-24" />
        <nav className="flex flex-col px-6 py-6 gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#540244] text-base font-medium tracking-wide border-b border-[#e0d5c5] pb-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Top bar — transparent over hero, cream backdrop after scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 py-3 transition-all duration-300 ${
          scrolled ? "bg-[#FDF6EC]/95 backdrop-blur-md shadow-sm" : ""
        }`}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-[#540244] rounded-lg"
        >
          <span
            className={`w-6 h-0.5 bg-[#FDF6EC] block transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#FDF6EC] block transition-all duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#FDF6EC] block transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>

        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="Maison du Croissant"
            width={110}
            height={110}
            priority
            className="rounded-full"
          />
        </Link>
      </header>
    </>
  );
}
