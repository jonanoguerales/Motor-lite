"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Car, CatalogClientProps } from "@/app/lib/definitions";

import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function CatalogClient({
  allCars,
  initialCars,
  brand,
  model,
}: CatalogClientProps) {
  const router = useRouter();

  // Listado mostrado en el cliente
  const [cars, setCars] = useState<Car[]>(initialCars);

  // Control de pop-up único
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  function handleOpenChange(popId: string, open: boolean) {
    setOpenPopover(open ? popId : null);
  }
  function isOpen(popId: string) {
    return openPopover === popId;
  }

  // ========== Marca/Modelo ==========
  // Parse de la URL
  const parsedBrands = brand ? brand.split(",").filter(Boolean) : [];
  const parsedModels = model ? model.split(",").filter(Boolean) : [];

  const [selectedBrands, setSelectedBrands] = useState<string[]>(parsedBrands);
  const [selectedModels, setSelectedModels] = useState<string[]>(parsedModels);

  // Búsqueda en pop-up
  const [searchTerm, setSearchTerm] = useState("");

  // Extraer marcas + sus modelos
  const uniqueBrands = Array.from(new Set(allCars.map((c) => c.brand)));
  const brandModelsMap = Object.fromEntries(
    uniqueBrands.map((b) => [
      b,
      Array.from(
        new Set(allCars.filter((x) => x.brand === b).map((x) => x.model))
      ),
    ])
  );

  function toggleBrand(b: string) {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  }
  function toggleModel(m: string) {
    setSelectedModels((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }
  function clearBrandModel() {
    setSelectedBrands([]);
    setSelectedModels([]);
  }
  const brandModelLabel =
    selectedBrands.length === 0 && selectedModels.length === 0
      ? "Marca/Modelo"
      : `${selectedBrands.length} marca(s), ${selectedModels.length} modelo(s)`;

  // ========== Rango PRECIO (inputs numéricos) ==========
  const [priceMin, setPriceMin] = useState("0");
  const [priceMax, setPriceMax] = useState("100000");
  function clearPrice() {
    setPriceMin("0");
    setPriceMax("100000");
  }
  const priceLabel = `Precio: ${priceMin}-${priceMax}`;

  // ========== Rango KM ==========
  const [kmMin, setKmMin] = useState("0");
  const [kmMax, setKmMax] = useState("500000");
  function clearKm() {
    setKmMin("0");
    setKmMax("500000");
  }
  const kmLabel = `Km: ${kmMin}-${kmMax}`;

  // ========== Rango AÑO ==========
  const [yearMin, setYearMin] = useState("1990");
  const [yearMax, setYearMax] = useState("2025");
  function clearYear() {
    setYearMin("1990");
    setYearMax("2025");
  }
  const yearLabel = `Año: ${yearMin}-${yearMax}`;

  // ========== Color (multi-check) ==========
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const uniqueColors = Array.from(new Set(allCars.map((c) => c.color)));
  function toggleColor(c: string) {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }
  function clearColors() {
    setSelectedColors([]);
  }
  const colorLabel =
    selectedColors.length > 0 ? `${selectedColors.length} color(es)` : "Color";

  // ========== Combustible (multi-check) ==========
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const uniqueFuels = Array.from(new Set(allCars.map((c) => c.fuel)));
  function toggleFuel(f: string) {
    setSelectedFuels((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  }
  function clearFuels() {
    setSelectedFuels([]);
  }
  const fuelLabel =
    selectedFuels.length > 0
      ? `${selectedFuels.length} tipo(s)`
      : "Combustible";

  // ========== FILTRAR en el cliente ==========
  function handleFilter() {
    let newList = [...allCars];

    // Marca/Modelo
    if (selectedBrands.length > 0) {
      newList = newList.filter((c) => selectedBrands.includes(c.brand));
    }
    if (selectedModels.length > 0) {
      newList = newList.filter((c) => selectedModels.includes(c.model));
    }
    // Color
    if (selectedColors.length > 0) {
      newList = newList.filter((c) => selectedColors.includes(c.color));
    }
    // Fuel
    if (selectedFuels.length > 0) {
      newList = newList.filter((c) => selectedFuels.includes(c.fuel));
    }

    // Prevenir min > max en tus inputs => clamp
    const prMin = Math.min(
      parseInt(priceMin, 10) || 0,
      parseInt(priceMax, 10) || 9999999
    );
    const prMax = Math.max(
      parseInt(priceMin, 10) || 0,
      parseInt(priceMax, 10) || 9999999
    );

    const kmMi = Math.min(
      parseInt(kmMin, 10) || 0,
      parseInt(kmMax, 10) || 9999999
    );
    const kmMa = Math.max(
      parseInt(kmMin, 10) || 0,
      parseInt(kmMax, 10) || 9999999
    );

    const yMin = Math.min(
      parseInt(yearMin, 10) || 1900,
      parseInt(yearMax, 10) || 2100
    );
    const yMax = Math.max(
      parseInt(yearMin, 10) || 1900,
      parseInt(yearMax, 10) || 2100
    );

    // Precio
    newList = newList.filter((c) => c.price >= prMin && c.price <= prMax);
    // Km
    newList = newList.filter((c) => c.mileage >= kmMi && c.mileage <= kmMa);
    // Año
    newList = newList.filter((c) => c.year >= yMin && c.year <= yMax);

    setCars(newList);
  }

  // ========== Limpiar TODO y recargar SSR sin params ==========
  function clearAll() {
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedColors([]);
    setSelectedFuels([]);
    setPriceMin("0");
    setPriceMax("100000");
    setKmMin("0");
    setKmMax("300000");
    setYearMin("1990");
    setYearMax("2023");
    // Muestra todos en el cliente
    setCars(allCars);
    // Forzar SSR => Quitar params => recarga con todos
    router.push("/catalogo");
  }

  /**
   * Aceptar en un pop-up => cierra pop-up + llama a handleFilter()
   */
  function acceptPopup() {
    setOpenPopover(null);
    handleFilter();
  }

  // ========== Helper para inputs numéricos ==========
  // Para restringir teclado, p.ej. onKeyDown,
  // y además force "desde" <= "hasta" en handleFilter() con clamp.
  return (
    <SidebarProvider>
      <div className="container mx-auto h-full flex min-h-screen">
        {/* Barra lateral */}
        <Sidebar className="w-64 bg-gray-800 text-white mt-16">
          {/* Contenido de los filtros */}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            <div className="flex flex-wrap gap-4 text-black">
              {/* ============ MARCA / MODELO ============ */}
              <Popover
                open={isOpen("brandModel")}
                onOpenChange={(opening) =>
                  handleOpenChange("brandModel", opening)
                }
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="min-w-52 flex-1">
                    {brandModelLabel}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-4 w-72"
                  side="bottom"
                  sideOffset={8}
                >
                  {/* X arriba en otra linea */}
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenPopover(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Barra de búsqueda con X */}
                  <div className="relative mb-3">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-8"
                      placeholder="Buscar marca..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Lista de Marcas */}
                  <div className="max-h-64 overflow-auto space-y-2">
                    {uniqueBrands
                      .filter((b) =>
                        b.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((b) => {
                        const brandChecked = selectedBrands.includes(b);
                        const models = brandModelsMap[b] || [];
                        return (
                          <div key={b} className="border p-2 rounded-md">
                            <div className="flex items-center">
                              <Checkbox
                                id={b}
                                checked={brandChecked}
                                onCheckedChange={() => toggleBrand(b)}
                              />
                              <label htmlFor={b} className="ml-2 font-medium">
                                {b}
                              </label>
                            </div>
                            {brandChecked && (
                              <div className="pl-4 mt-2 space-y-1">
                                {models.map((m) => (
                                  <div key={m} className="flex items-center">
                                    <Checkbox
                                      id={m}
                                      checked={selectedModels.includes(m)}
                                      onCheckedChange={() => toggleModel(m)}
                                    />
                                    <label htmlFor={m} className="ml-2">
                                      {m}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        clearBrandModel();
                        handleFilter();
                      }}
                    >
                      Limpiar
                    </Button>
                    <Button
                      onClick={() => {
                        acceptPopup();
                      }}
                    >
                      Aceptar
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <RangeInputsPopover
                popId="price"
                label={priceLabel}
                isOpen={isOpen}
                handleOpenChange={handleOpenChange}
                minVal={priceMin}
                setMinVal={setPriceMin}
                maxVal={priceMax}
                setMaxVal={setPriceMax}
                maxLimit={999999}
                defaultMin={0}
                defaultMax={100000}
                clearFn={() => {
                  /* ... limpiezas extra si hace falta ... */
                }}
                handleFilter={handleFilter}
              />

              <RangeInputsPopover
                popId="year"
                label={yearLabel}
                isOpen={isOpen}
                handleOpenChange={handleOpenChange}
                minVal={yearMin}
                setMinVal={setYearMin}
                maxVal={yearMax}
                setMaxVal={setYearMax}
                maxLimit={new Date().getFullYear()}
                defaultMin={1990}
                defaultMax={new Date().getFullYear()}
                clearFn={clearYear}
                handleFilter={handleFilter}
              />
              <RangeInputsPopover
                popId="km"
                label={kmLabel}
                isOpen={isOpen}
                handleOpenChange={handleOpenChange}
                minVal={kmMin}
                setMinVal={setKmMin}
                maxVal={kmMax}
                setMaxVal={setKmMax}
                maxLimit={999999}
                defaultMin={0}
                defaultMax={300000}
                clearFn={clearKm}
                handleFilter={handleFilter}
              />

              {/* ============ COLOR ============ */}
              <ColorOrFuelPopover
                popId="color"
                label={colorLabel}
                isOpen={isOpen}
                handleOpenChange={handleOpenChange}
                items={uniqueColors}
                selectedItems={selectedColors}
                toggleItem={toggleColor}
                clearFn={() => {
                  clearColors();
                  handleFilter();
                }}
                handleFilter={handleFilter}
              />

              {/* ============ COMBUSTIBLE ============ */}
              <ColorOrFuelPopover
                popId="fuel"
                label={fuelLabel}
                isOpen={isOpen}
                handleOpenChange={handleOpenChange}
                items={uniqueFuels}
                selectedItems={selectedFuels}
                toggleItem={toggleFuel}
                clearFn={() => {
                  clearFuels();
                  handleFilter();
                }}
                handleFilter={handleFilter}
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="destructive"
                className="bg-transparent text-white"
                onClick={clearAll}
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        </Sidebar>
        <div className="flex-1 bg-white ml-6 mt-16">
          {/* Botón para mostrar/ocultar la barra lateral en dispositivos móviles */}
          <SidebarTrigger className="p-4 md:hidden">
            <button className="text-gray-800">Mostrar Filtros</button>
          </SidebarTrigger>
          {/* LISTADO DE COCHES */}
          {cars.length === 0 ? (
            <p>No se encontraron coches con estos filtros.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((vehicle) => (
                <Link href={`/vehiculo/${vehicle.id}`} key={vehicle.id}>
                  <Card className="overflow-hidden group">
                    {/* Encima de la imagen: IVA + logo */}
                    <div className="relative">
                      <div className="absolute top-2 left-2 z-10 flex gap-2">
                        {/* Ejemplo de IVA deducible */}
                        {vehicle.ivaDeductible && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            IVA Deducible
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 z-10 flex gap-2">
                        {/* Logo Motorevo */}
                        <Image
                          src="/logo.webp"
                          alt="Motorevo"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </div>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={vehicle.image_url || "/coches/placeholder.svg"}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        {/* Ejemplo: 1/7 imágenes */}
                        {vehicle.images && vehicle.currentImage && (
                          <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-sm">
                            {vehicle.currentImage}/{vehicle.images}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Texto */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      {vehicle.variant && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {vehicle.variant}
                        </p>
                      )}

                      <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                        <span>{vehicle.fuel}</span>
                        <span>•</span>
                        <span>{vehicle.mileage} km</span>
                        <span>•</span>
                        <span>{vehicle.year}</span>
                      </div>

                      {/* Precio contado vs mensual */}
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Precio al contado
                          </p>
                          <p className="text-xl font-bold">
                            {vehicle.price.toLocaleString()} €
                          </p>
                        </div>
                        {vehicle.monthlyPrice && (
                          <div className="text-right">
                            <p className="text-green-600 font-bold text-xl">
                              {vehicle.monthlyPrice.toLocaleString()} €
                            </p>
                            <p className="text-sm text-muted-foreground">
                              / mes
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          <p className="py-96">No se encontraron coches con estos filtros.</p>
          <p className="py-96">No se encontraron coches con estos filtros.</p>
          <p className="py-96">No se encontraron coches con estos filtros.</p>
          <p className="py-96">No se encontraron coches con estos filtros.</p>
          <p className="py-96">No se encontraron coches con estos filtros.</p>
          <p className="py-96">No se encontraron coches con estos filtros.</p>
        </div>
      </div>
    </SidebarProvider>
  );
}

/**
 * Componente generico para “Precio, KM, Año” con 2 inputs (min, max).
 */
function RangeInputsPopover({
  popId,
  label,
  isOpen,
  handleOpenChange,
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
  clearFn,
  handleFilter,
  maxLimit,
  defaultMin,
  defaultMax,
}: {
  popId: string;
  label: string;
  isOpen: (id: string) => boolean;
  handleOpenChange: (id: string, open: boolean) => void;
  minVal: string;
  setMinVal: (v: string) => void;
  maxVal: string;
  setMaxVal: (v: string) => void;
  clearFn: () => void;
  handleFilter: () => void;
  maxLimit: number;
  defaultMin: number;
  defaultMax: number;
}) {
  // Forzamos que el input sea solo numeros
  function onKeyDownNum(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    // Control + A/C/V
    if (
      !/[0-9]/.test(e.key) &&
      !allowed.includes(e.key) &&
      !(e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
    ) {
      e.preventDefault();
    }
  }

  // Cuando el usuario escribe:
  function onChangeMin(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value.replace(/\D/g, ""); // Quitar no-dígitos
    if (val === "") val = "0";
    let num = parseInt(val, 10) || 0;
    // Clamp al maxLimit
    if (num > maxLimit) num = maxLimit;
    setMinVal(String(num));
  }
  function onChangeMax(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value.replace(/\D/g, "");
    if (val === "") val = "0";
    let num = parseInt(val, 10) || 0;
    if (num > maxLimit) num = maxLimit;
    setMaxVal(String(num));
  }

  // Al pulsar “Aceptar”
  function accept() {
    // Forzar min <= max
    let minNum = parseInt(minVal, 10) || 0;
    let maxNum = parseInt(maxVal, 10) || 0;
    if (minNum > maxNum) {
      // Intercambiarlos o forzar minNum = maxNum
      [minNum, maxNum] = [maxNum, minNum];
      setMinVal(String(minNum));
      setMaxVal(String(maxNum));
    }

    handleOpenChange(popId, false);
    handleFilter();
  }

  // Al pulsar “Limpiar”
  function doClear() {
    setMinVal(String(defaultMin));
    setMaxVal(String(defaultMax));
    clearFn();
    handleFilter();
  }

  return (
    <Popover
      open={isOpen(popId)}
      onOpenChange={(opening) => handleOpenChange(popId, opening)}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-32 flex-1">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-64" side="bottom" sideOffset={8}>
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(popId, false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Input
            type="text"
            placeholder="Min"
            value={minVal}
            onKeyDown={onKeyDownNum}
            onChange={onChangeMin}
          />
          -
          <Input
            type="text"
            placeholder="Max"
            value={maxVal}
            onKeyDown={onKeyDownNum}
            onChange={onChangeMax}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={doClear}>
            Limpiar
          </Button>
          <Button onClick={accept}>Aceptar</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Componente genérico para “Color” o “Fuel” (multi-check).
 * Simple, con un “Limpiar” y “Aceptar” que filtra.
 */
function ColorOrFuelPopover({
  popId,
  label,
  isOpen,
  handleOpenChange,
  items,
  selectedItems,
  toggleItem,
  clearFn,
  handleFilter,
}: {
  popId: string;
  label: string;
  isOpen: (id: string) => boolean;
  handleOpenChange: (id: string, open: boolean) => void;
  items: string[];
  selectedItems: string[];
  toggleItem: (i: string) => void;
  clearFn: () => void;
  handleFilter: () => void;
}) {
  function accept() {
    handleOpenChange(popId, false);
    handleFilter();
  }

  return (
    <Popover
      open={isOpen(popId)}
      onOpenChange={(opening) => handleOpenChange(popId, opening)}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-32 flex-1">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-56" side="bottom" sideOffset={8}>
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(popId, false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-40 overflow-auto space-y-1 mb-2">
          {items.map((item) => {
            const checked = selectedItems.includes(item);
            return (
              <div key={item} className="flex items-center gap-2">
                <Checkbox
                  id={item}
                  checked={checked}
                  onCheckedChange={() => toggleItem(item)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              clearFn();
            }}
          >
            Limpiar
          </Button>
          <Button onClick={accept}>Aceptar</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
