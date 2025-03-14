"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useViewStore, useFilterStore } from "@/lib/store";
import type { CatalogClientProps } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import CarList from "./carList";

const CarFilters = dynamic(() => import("./CarFilters"), {
  ssr: false,
  loading: () => (
    <div className="w-full lg:w-80 h-screen bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

export default function CatalogClient({
  allCars,
  initialCars,
  brand,
  model,
}: CatalogClientProps) {
  const { view, setView } = useViewStore();
  const {
    setFilteredCars,
    filteredCars,
    setFilter,
    setAllCars,
    clearFilters,
  } = useFilterStore();
  const [isMounted, setIsMounted] = useState(false);
  const [sortOrder, setSortOrder] = useState("recent");
  const { isLoading } = useFilterStore();

  useEffect(() => {
    clearFilters();
    const brandrc = brand?.toString() || "all";
    const modelrc = model?.toString() || "all";
    const brandArray = brandrc.split(",").filter(Boolean);
    const modelArray = modelrc.split(",").filter(Boolean);
    if (brand) {
      brandArray.forEach((b) => setFilter("brand", b));
    }
    if (model) {
      modelArray.forEach((m) => setFilter("model", m));
    }

    setAllCars(allCars);
    setFilteredCars(initialCars);

    setIsMounted(true);
  }, []);

  const sortedCars = useMemo(() => {
    let cars = [...filteredCars];
    if (sortOrder === "price-asc") {
      cars.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      cars.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "km-asc") {
      cars.sort((a, b) => a.mileage - b.mileage);
    }
    return cars;
  }, [filteredCars, sortOrder]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  if (!isMounted) return null;

  return (
    <div className="container mx-auto h-full flex flex-col lg:flex-row min-h-screen py-12 gap-8 mt-16">
      <aside className="w-full lg:w-80 lg:min-w-80">
        <div className="lg:sticky lg:top-24 bg-white rounded-lg shadow-md h-max">
          <CarFilters />
        </div>
      </aside>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-12">
          Concesionario de coches de segunda mano, de ocasión y km 0
        </h1>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Se han encontrado {sortedCars.length} vehículo(s)
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
                aria-label="Vista en cuadrícula"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("list")}
                aria-label="Vista en lista"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <select
              className="border rounded-md px-4 py-2"
              onChange={handleSortChange}
              value={sortOrder}
            >
              <option value="recent">Los más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="km-asc">Kilómetros: menor a mayor</option>
            </select>
          </div>
        </div>
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <CarList cars={sortedCars} />
        </div>
      </div>
    </div>
  );
}
