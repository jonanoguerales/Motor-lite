"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useViewStore, useFilterStore } from "@/lib/store";
import type { CatalogClientProps } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Filter, FilterX, Grid, List } from "lucide-react";
import CarList from "./carList";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import CarFiltersSkeleton from "./CarFiltersSkeleton";

const CarFilters = dynamic(() => import("./CarFilters"), {
  ssr: false,
  loading: () => <CarFiltersSkeleton />,
});

export default function CatalogClient({
  allCars,
  initialCars,
  brand,
  model,
}: CatalogClientProps) {
  const { view, setView } = useViewStore();
  const { setFilteredCars, filteredCars, setFilter, setAllCars, clearFilters } =
    useFilterStore();
  const [isMounted, setIsMounted] = useState(false);
  const [sortOrder, setSortOrder] = useState("recent");
  const { isLoading } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    if (mediaQuery.matches) {
      setView("list");
    } else {
      setView("grid");
    }

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setView("list");
      } else {
        setView("grid");
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isMounted) return null;

  return (
    <div className="container mx-auto h-full flex flex-col lg:flex-row min-h-screen py-12 gap-8 mt-16">
      <aside className="hidden lg:flex lg:w-80 lg:min-w-80">
        <div className="lg:sticky w-full lg:top-24 bg-white rounded-lg shadow-md max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
          <CarFilters />
        </div>
      </aside>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="relative w-full bg-white max-h-screen overflow-y-auto">
            <CarFilters isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
      )}
      <div className="flex-1">
        <h1 className="text-2xl lg:text-3xl font-bold mb-12">
          Concesionario de coches de segunda mano, de ocasión y km 0
        </h1>

        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-center mb-8">
          <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold w-full">
            Se han encontrado {sortedCars.length} vehículo(s)
          </h2>
          <div className="flex items-center gap-4 w-full justify-end">
            <div className="hidden lg:flex gap-2">
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
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMenu}
              aria-label="Vista en lista"
              className="lg:hidden"
            >
              {isOpen ? (
                <FilterX className="h-4 w-4" />
              ) : (
                <Filter className="h-4 w-4" />
              )}
            </Button>

            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecciona orden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Los más recientes</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">
                  Precio: mayor a menor
                </SelectItem>
                <SelectItem value="km-asc">
                  Kilómetros: menor a mayor
                </SelectItem>
              </SelectContent>
            </Select>
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
