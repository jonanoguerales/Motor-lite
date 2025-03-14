import { notFound } from "next/navigation"
import { cars } from "@/lib/placeholder-data"
import CarGallery from "@/components/cars/carGallery"
import CarInfo from "@/components/cars/carInfo"
import CarFeatures from "@/components/cars/carFeatures"
import CarContact from "@/components/cars/carContact"
import { Suspense } from "react"
import { CarCardSkeleton } from "@/components/cars/carSkeleton"

export const dynamic = "force-dynamic"
export const revalidate = 60 

interface CarPageProps {
  params: {
    id: string
  }
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = params;
  const car = cars.find((c) => c.id === id)

  if (!car) {
    notFound()
  }
  const adaptedCar = {
    id: car.id,
    brand: car.brand,
    model: car.model,
    variant: car.variant || `${car.power}CV ${car.fuel}`,
    price: car.price,
    financePrice: Math.round(car.price * 0.98), 
    monthlyPrice: car.monthlyPrice || Math.round(car.price / 72),
    fuel: car.fuel,
    mileage: car.mileage,
    year: car.year,
    power: car.power,
    location: car.location || "Madrid",
    condition: car.condition || "Seminuevo",
    rating: car.rating || 4.8,
    ivaDeductible: car.ivaDeductible || false,
    images: car.images && car.images.length > 0 ? car.images : ["/placeholder.svg"],
    kilometers: car.mileage,
    transmission: car.transmission || "Automática",
    color: car.color,
    doors: car.doors || 5,
    features: car.features || [
      "Climatizador automático",
      "Navegador GPS",
      "Bluetooth",
      "Sensores de aparcamiento",
      "Cámara trasera",
      "Control de crucero adaptativo",
      "Asientos calefactables",
      "Techo panorámico",
      "Faros LED",
      "Llantas de aleación",
      "Sistema de sonido premium",
      "Asistente de mantenimiento de carril",
    ],
    description:
      car.description ||
      `Este ${car.brand} ${car.model} ${car.variant || ""} del año ${car.year} es una excelente opción para quienes buscan un vehículo ${car.fuel.toLowerCase()} de alta calidad. Con ${car.mileage.toLocaleString()} kilómetros, este coche ofrece un rendimiento excepcional y un confort superior.`,
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <Suspense fallback={<CarCardSkeleton />}>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div>
              <CarGallery images={adaptedCar.images} />
              <CarInfo car={adaptedCar} />
              <CarFeatures features={adaptedCar.features} />
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <CarContact car={adaptedCar} />
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  )
}
