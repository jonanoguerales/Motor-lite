type Car = {
  id: string;
  brand: string;
  model: string;
  variant?: string;           // Ej. "1.6 TDI 115cv"
  color: string;
  fuel: string;
  price: number;
  mileage: number;
  year: number;
  image_url: string;
  images?: number;            // Cantidad total de imágenes (opcional)
  currentImage?: number;      // Imagen actual (opcional)
  monthlyPrice?: number;      // Precio financiado/mes (opcional)
  ivaDeductible?: boolean;    // true o false
};

type CatalogClientProps = {
  allCars: Car[]; // Para pop-ups (opciones completas)
  initialCars: Car[]; // Filtrado SSR
  brand: string; // Ej. "BMW,Audi"
  model: string; // Ej. "Q3,Serie 3"
};

export type { Car, CatalogClientProps };