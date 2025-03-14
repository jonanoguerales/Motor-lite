"use client";

import type { Car } from "@/lib/definitions"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CarInfoProps {
  car: Car
}

export default function CarInfo({ car }: CarInfoProps) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge>{car.condition}</Badge>
          {car.ivaDeductible && <Badge variant="outline">IVA Deducible</Badge>}
        </div>

        <h1 className="text-3xl font-bold mb-2">
          {car.brand} {car.model}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">{car.variant}</p>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Combustible:</span>{" "}
            <span className="font-medium">{car.fuel}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Año:</span>{" "}
            <span className="font-medium">{car.year}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Potencia:</span>{" "}
            <span className="font-medium">{car.power} CV</span>
          </div>
          <div>
            <span className="text-muted-foreground">Kilómetros:</span>{" "}
            <span className="font-medium">{car.mileage} km</span>
          </div>
          <div>
            <span className="text-muted-foreground">Transmisión:</span>{" "}
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Color:</span>{" "}
            <span className="font-medium">{car.color}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Puertas:</span>{" "}
            <span className="font-medium">{car.doors}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Ubicación:</span>{" "}
            <span className="font-medium">{car.location}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="descripcion">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="detalles">Detalles técnicos</TabsTrigger>
        </TabsList>
        <TabsContent value="descripcion" className="p-4 bg-muted/30 rounded-md mt-2">
          <p>{car.description}</p>
        </TabsContent>
        <TabsContent value="detalles" className="p-4 bg-muted/30 rounded-md mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Motor</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="text-muted-foreground">Combustible:</span> {car.fuel}
                </li>
                <li>
                  <span className="text-muted-foreground">Potencia:</span> {car.power} CV
                </li>
                <li>
                  <span className="text-muted-foreground">Transmisión:</span> {car.transmission}
                </li>
                <li>
                  <span className="text-muted-foreground">Consumo combinado:</span> 5.2 l/100km
                </li>
                <li>
                  <span className="text-muted-foreground">Emisiones CO2:</span> 118 g/km
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dimensiones</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="text-muted-foreground">Longitud:</span> 4.050 mm
                </li>
                <li>
                  <span className="text-muted-foreground">Anchura:</span> 1.800 mm
                </li>
                <li>
                  <span className="text-muted-foreground">Altura:</span> 1.550 mm
                </li>
                <li>
                  <span className="text-muted-foreground">Maletero:</span> 380 litros
                </li>
                <li>
                  <span className="text-muted-foreground">Peso:</span> 1.165 kg
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
