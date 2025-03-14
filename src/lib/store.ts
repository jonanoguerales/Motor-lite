"use client"

import { create } from "zustand"
import type { Car } from "./definitions"

type ViewType = "list" | "grid"

interface ViewState {
  view: ViewType
  setView: (view: ViewType) => void
}

export const useViewStore = create<ViewState>((set) => ({
  view: "list",
  setView: (view) => set({ view }),
}))

interface FiltersData {
  condition?: string[];
  brand?: string[];
  model?: string[];
  fuel?: string[];
  location?: string[];
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minKm?: number;
  maxKm?: number;
}

// Claves que son array de string
type ArrayFilterKey = "condition" | "brand" | "model" | "fuel" | "location" | "color";

// Claves que son numéricas
type NumberFilterKey = "minPrice" | "maxPrice" | "minYear" | "maxYear" | "minKm" | "maxKm";

// Union de todas las claves
type FilterKey = ArrayFilterKey | NumberFilterKey;

interface FilterState {
  filters: FiltersData;
  filteredCars: Car[];
  allCars: Car[];
  isLoading: boolean;

  // setFilter recibe la clave y el valor (string o number)
  setFilter: (key: FilterKey, value: string | number) => void;
  // removeFilter: clave y valor string (en caso de arrays). Si es numérico, se ignora el value.
  removeFilter: (key: FilterKey, value?: string) => void;
  clearFilters: () => void;
  setFilteredCars: (cars: Car[]) => void;
  setAllCars: (cars: Car[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  applyFilters: () => void;
}


export const useFilterStore = create<FilterState>((set, get) => ({
  filters: {},
  filteredCars: [],
  allCars: [],
  isLoading: false,

  setFilter: (key, value) => {
    set((state) => {
      const newFilters = { ...state.filters };

      // Si la clave es de tipo array
      if (
        key === "condition" ||
        key === "brand" ||
        key === "model" ||
        key === "fuel" ||
        key === "location" ||
        key === "color"
      ) {
        // Aseguramos que sea un array
        if (!newFilters[key]) {
          newFilters[key] = [];
        }
        const arr = newFilters[key] as string[];
        // Agregamos el valor si no existe
        if (!arr.includes(value as string)) {
          arr.push(value as string);
        }
      } else {
        // Clave numérica (minPrice, maxPrice, etc.)
        newFilters[key] = value as number;
      }

      return { filters: newFilters, isLoading: true };
    });

    // Aplicas tu lógica de filtrado
    setTimeout(() => get().applyFilters(), 0);
  },

  removeFilter: (key, value) => {
    set((state) => {
      const newFilters = { ...state.filters };

      if (
        key === "condition" ||
        key === "brand" ||
        key === "model" ||
        key === "fuel" ||
        key === "location" ||
        key === "color"
      ) {
        // Es un array de string
        if (value !== undefined) {
          // Eliminamos ese string del array
          const arr = newFilters[key] as string[];
          newFilters[key] = arr.filter((v) => v !== value);
          if ((newFilters[key] as string[]).length === 0) {
            delete newFilters[key];
          }
        } else {
          // Si no se especificó value, borramos toda la propiedad
          delete newFilters[key];
        }
      } else {
        // Clave numérica => simplemente borramos la propiedad
        delete newFilters[key];
      }

      return { filters: newFilters, isLoading: true };
    });

    setTimeout(() => get().applyFilters(), 0);
  },

  clearFilters: () => {
    set({
      filters: {},
      isLoading: true,
    });

    setTimeout(() => {
      const { allCars } = get();
      set({
        filteredCars: [...allCars],
        isLoading: false,
      });
    }, 0);
  },

  setFilteredCars: (cars) => {
    set({ filteredCars: cars, isLoading: false });
  },

  setAllCars: (cars) => {
    set({ allCars: cars, filteredCars: cars });
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },

  applyFilters: () => {
    const { allCars, filters } = get();
    set({ isLoading: true });
  
    setTimeout(() => {
      try {
        if (Object.keys(filters).length === 0) {
          set({ filteredCars: [...allCars], isLoading: false });
          return;
        }
  
        let filtered = [...allCars];

        if ((filters.brand && filters.brand.length > 0) || 
            (filters.model && filters.model.length > 0)) {
          let brandFiltered: Car[] = [];
          if (filters.brand && filters.brand.length > 0) {
            const brandSet = new Set(filters.brand);
            brandFiltered = filtered.filter((car) => brandSet.has(car.brand));
          }
  
          let modelFiltered: Car[] = [];
          if (filters.model && filters.model.length > 0) {
            const modelSet = new Set(filters.model);
            modelFiltered = filtered.filter((car) => modelSet.has(car.model));
          }
  
          const unionSet = new Set([...brandFiltered, ...modelFiltered]);
          filtered = [...unionSet];
        }

        if (filters.condition && filters.condition.length > 0) {
          const condSet = new Set(filters.condition);
          filtered = filtered.filter(
            (car) => car.condition && condSet.has(car.condition)
          );
        }
  
        if (filters.fuel && filters.fuel.length > 0) {
          const fuelSet = new Set(filters.fuel);
          filtered = filtered.filter((car) => fuelSet.has(car.fuel));
        }
  
        if (filters.location && filters.location.length > 0) {
          const locSet = new Set(filters.location);
          filtered = filtered.filter(
            (car) => car.location && locSet.has(car.location)
          );
        }
  
        if (filters.color && filters.color.length > 0) {
          const colorSet = new Set(filters.color);
          filtered = filtered.filter((car) => colorSet.has(car.color));
        }
  
        if (filters.minPrice !== undefined) {
          filtered = filtered.filter(
            (car) => (car.price || 0) >= (filters.minPrice || 0)
          );
        }
        if (filters.maxPrice !== undefined) {
          filtered = filtered.filter(
            (car) => (car.price || 0) <= (filters.maxPrice || 0)
          );
        }

        if (filters.minYear !== undefined) {
          filtered = filtered.filter(
            (car) => (car.year || 0) >= (filters.minYear || 0)
          );
        }
        if (filters.maxYear !== undefined) {
          filtered = filtered.filter(
            (car) => (car.year || 0) <= (filters.maxYear || 0)
          );
        }
  
        if (filters.minKm !== undefined) {
          filtered = filtered.filter(
            (car) => (car.mileage || 0) >= (filters.minKm || 0)
          );
        }
        if (filters.maxKm !== undefined) {
          filtered = filtered.filter(
            (car) => (car.mileage || 0) <= (filters.maxKm || 0)
          );
        }
  
        console.log("Final filtered cars:", filtered.length);
        set({ filteredCars: filtered, isLoading: false });
  
      } catch (error) {
        console.error("Error applying filters:", error);
        set({ filteredCars: [...allCars], isLoading: false });
      }
    }, 0);
  },
  
}));


