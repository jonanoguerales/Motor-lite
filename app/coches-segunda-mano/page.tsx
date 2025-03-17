import type { Metadata } from "next";
import { cars } from "@/lib/placeholder-data";
import CatalogClient from "@/components/cars/catalogClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Coches de segunda mano - Concesionario",
  description:
    "Explora nuestra amplia selección de vehículos de segunda mano, de ocasión y km 0",
};

function getFilteredCars(searchParams: {
  brand?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  fuel?: string;
  color?: string;
  minYear?: string;
  maxYear?: string;
  minKm?: string;
  maxKm?: string;
  location?: string;
}) {
  let filteredCars = [...cars];

  const brandParam = searchParams.brand ?? "";
  const modelParam = searchParams.model ?? "";
  const fuelParam = searchParams.fuel ?? "";
  const colorParam = searchParams.color ?? "";
  const locationParam = searchParams.location ?? "";

  if (brandParam || modelParam) {
    const brandArray = brandParam ? brandParam.split(",").filter(Boolean) : [];
    const modelArray = modelParam ? modelParam.split(",").filter(Boolean) : [];

    let brandFiltered: typeof cars = [];
    if (brandArray.length > 0) {
      brandFiltered = filteredCars.filter((car) =>
        brandArray.includes(car.brand)
      );
    }

    let modelFiltered: typeof cars = [];
    if (modelArray.length > 0) {
      modelFiltered = filteredCars.filter((car) =>
        modelArray.includes(car.model)
      );
    }

    const unionSet = new Set([...brandFiltered, ...modelFiltered]);
    filteredCars = [...unionSet];
  }

  if (fuelParam) {
    const fuelArray = fuelParam.split(",").filter(Boolean);
    filteredCars = filteredCars.filter((car) => fuelArray.includes(car.fuel));
  }

  if (colorParam) {
    const colorArray = colorParam.split(",").filter(Boolean);
    filteredCars = filteredCars.filter((car) => colorArray.includes(car.color));
  }

  if (locationParam) {
    const locationArray = locationParam.split(",").filter(Boolean);
    filteredCars = filteredCars.filter(
      (car) => car.location && locationArray.includes(car.location)
    );
  }

  if (searchParams.minPrice) {
    const minPrice = Number(searchParams.minPrice);
    filteredCars = filteredCars.filter((car) => car.price >= minPrice);
  }
  if (searchParams.maxPrice) {
    const maxPrice = Number(searchParams.maxPrice);
    filteredCars = filteredCars.filter((car) => car.price <= maxPrice);
  }

  if (searchParams.minYear) {
    const minYear = Number(searchParams.minYear);
    filteredCars = filteredCars.filter((car) => car.year >= minYear);
  }
  if (searchParams.maxYear) {
    const maxYear = Number(searchParams.maxYear);
    filteredCars = filteredCars.filter((car) => car.year <= maxYear);
  }

  if (searchParams.minKm) {
    const minKm = Number(searchParams.minKm);
    filteredCars = filteredCars.filter((car) => car.mileage >= minKm);
  }
  if (searchParams.maxKm) {
    const maxKm = Number(searchParams.maxKm);
    filteredCars = filteredCars.filter((car) => car.mileage <= maxKm);
  }

  return {
    allCars: cars,
    filteredCars,
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await Promise.resolve(searchParams);
  const { allCars, filteredCars } = getFilteredCars(params);

  const brand = Array.isArray(params.brand)
    ? params.brand.join(",")
    : params.brand || "";
  const model = Array.isArray(params.model)
    ? params.model.join(",")
    : params.model || "";

  return (
    <CatalogClient
      allCars={allCars}
      initialCars={filteredCars}
      brand={brand}
      model={model}
    />
  );
}
