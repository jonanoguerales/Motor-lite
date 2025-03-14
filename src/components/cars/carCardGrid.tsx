import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/utils";
import type { Car } from "@/lib/definitions";

interface CarCardGridProps {
  car: Car;
}

export default function CarCardGrid({ car }: CarCardGridProps) {
  const mainImage = car.images && car.images.length > 0
    ? car.images[0]
    : "/placeholder.svg";

  return (
    <Link
      href={`/vehiculo/${car.id}`}
      className="block bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
    >
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
        <Image
              src="/logo.webp"
              width={32}
              height={32}
              alt="Logo empresa"
              className="rounded-full"
            />
        </div>
        <div className="relative h-48">
          <Image
            src={mainImage}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
            1/{car.images?.length || 0}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">
            {car.brand} {car.model}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{car.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{car.variant}</p>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Combustible</p>
            <p className="font-medium">{car.fuel}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Año</p>
            <p className="font-medium">{car.year}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Potencia</p>
            <p className="font-medium">{car.power} CV</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ubicación</p>
            <p className="font-medium">{car.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">En stock</Badge>
          <Badge variant="secondary">{car.condition}</Badge>
          {car.ivaDeductible && <Badge variant="outline">IVA Deducible</Badge>}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xl font-bold text-primary">{formatPrice(car?.price || 0)} €</p>
            <p className="text-sm text-muted-foreground">{formatPrice(car?.monthlyPrice || 0)} €/mes*</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
