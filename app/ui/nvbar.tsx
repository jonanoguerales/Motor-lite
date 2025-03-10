"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); 

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

  const isHome = pathname === "/";
  const navbarClasses = `fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
    isHome
      ? scrolled
        ? "bg-white shadow-md text-black"
        : "bg-transparent text-white"
      : 
      scrolled
        ? "bg-white shadow-md text-black"
        : "bg-white text-black"
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
        Levauto
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="/" className="hover:opacity-80">Inicio</Link>
          <Link href="/catalogo" className="hover:opacity-80">Catálogo</Link>
          <Link href="/valuation" className="hover:opacity-80">Tasación</Link>
          <Link href="/contact" className="hover:opacity-80">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}
