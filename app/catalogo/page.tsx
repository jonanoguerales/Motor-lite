export const dynamic = "force-dynamic";
import { cars } from "@/app/lib/placeholder-data";
import CatalogClient from "../ui/cars/CatalogClient";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { brand?: string; model?: string };
}) {
  const { brand, model } = searchParams;
  
  const brandParam = brand ?? "";
  const modelParam = model ?? "";

  const brandArray = brandParam ? brandParam.split(",").filter(Boolean) : [];
  const modelArray = modelParam ? modelParam.split(",").filter(Boolean) : [];

  let filteredCars = [...cars];
  if (brandArray.length > 0) {
    filteredCars = filteredCars.filter((car) => brandArray.includes(car.brand));
  }
  if (modelArray.length > 0) {
    filteredCars = filteredCars.filter((car) => modelArray.includes(car.model));
  }

  return (
    <CatalogClient
      allCars={cars}
      initialCars={filteredCars}
      brand={brandParam}
      model={modelParam}
    />
  );
}
