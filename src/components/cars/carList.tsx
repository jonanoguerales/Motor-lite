"use client";
import { useViewStore, useFilterStore } from "@/lib/store";
import CarCardGrid from "./carCardGrid";
import CarCardList from "./carCardList";
import { CarCardSkeleton } from "./carSkeleton";
import type { Car } from "@/lib/definitions";
import { useEffect, useState } from "react";

interface CarListProps {
  cars?: Car[];
}

export default function CarList({ cars: carsProp }: CarListProps) {
  const { view } = useViewStore();
  const { filteredCars, isLoading } = useFilterStore();
  const cars = carsProp ?? filteredCars;

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setShowSkeleton(true);
      }, 300);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (showSkeleton) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No se encontraron vehículos</h3>
        <p className="text-muted-foreground">
          Intenta cambiar los filtros de búsqueda para ver más resultados.
        </p>
      </div>
    );
  }

  return view === "grid" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCardGrid key={car.id} car={car} />
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {cars.map((car) => (
        <CarCardList key={car.id} car={car} />
      ))}
    </div>
  );
}
