"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh]">
      <Image
        src="/imgHome.avif"
        alt="Luxury Car"
        width={2069}
        height={1379}
        className="absolute h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black">
        <div className="container mx-auto h-full flex flex-col justify-center px-6">
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Concesionario de vehículos de ocasión
            </h1>
            <p className="text-xl text-gray-300">
              Los mejores coches de segunda mano con garantía y al mejor precio
            </p>
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              Ver catálogo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}