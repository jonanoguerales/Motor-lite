export interface Car {
  id: string;
  brand: string;
  model: string;
  variant?: string;
  price: number;
  financePrice?: number;
  monthlyPrice?: number;
  fuel: string;
  year: number;
  power?: number;
  location?: string;
  condition?: string;
  rating?: number;
  ivaDeductible?: boolean;
  images: string[]; // ahora es un array de rutas (URLs)
  currentImage?: number; // índice de la imagen actual (opcional)
  mileage: number;
  transmission?: string;
  color: string;
  doors?: number;
  features?: string[];
  description?: string;
}

export interface CatalogClientProps {
  allCars: Car[]
  initialCars: Car[]
  brand?: string | string[]
  model?: string | string[]
}

export interface FilterState {
  brands: string[]
  models: string[]
  colors: string[]
  fuels: string[]
  locations: string[]
  minPrice: number
  maxPrice: number
  minYear: number
  maxYear: number
  minKm: number
  maxKm: number
}

