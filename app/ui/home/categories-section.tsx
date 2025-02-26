'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CategoriesSection() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Nuestras Categorías
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-4">
            {/* Repite el patrón <CarouselItem> con las categorías que quieras */}
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3">
              <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Vehículos KM0
                </h3>
                <p className="text-gray-600">Coches nuevos con grandes descuentos</p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
