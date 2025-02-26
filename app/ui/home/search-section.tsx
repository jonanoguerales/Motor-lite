'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cars } from "@/app/lib/placeholder-data";
import { Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function SearchSection() {

  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand)));

   const filteredModels =
   selectedBrand === "all" || !selectedBrand
     ? []
     : Array.from(
         new Set(
           cars
             .filter((car) => car.brand === selectedBrand)
             .map((car) => car.model)
         )
       );

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (selectedBrand && selectedBrand !== "all") query.set("brand", selectedBrand);
    if (selectedModel && selectedModel !== "all") query.set("model", selectedModel);

    router.push(`/catalogo?${query.toString()}`);
  };
  return (
      <section className="relative -mt-32 z-10 container mx-auto px-6 h-64 flex items-center justify-center">
        <div className="absolute w-11/12 bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona marca" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="all">Todas las marcas</SelectItem>
          {uniqueBrands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona modelo" />
              </SelectTrigger>
              <SelectContent>
              {filteredModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleSearch}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white px-8 text-lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </div>
        </div>
      </section>
  );
}
