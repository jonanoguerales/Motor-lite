import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function SellYourCarSection() {
  const benefits = [
    "Valoración gratuita de tu vehículo",
    "Gestión completa de la documentación",
    "Pago inmediato y seguro",
    "Sin complicaciones ni intermediarios",
    "Nos encargamos de todo el proceso",
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Gestionamos la venta de tu coche</h2>
            <p className="text-lg text-gray-700 mb-8">
              ¿Quieres vender tu coche sin complicaciones? Nosotros nos encargamos de todo el proceso, desde la
              valoración hasta la gestión de la documentación, para que tú solo tengas que preocuparte de recibir el
              dinero.
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="group">
              <Link href="/gestion-de-venta">
                Vender mi coche
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/seccion-gestion-coche.webp" alt="Vende tu coche con nosotros" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 rounded-lg shadow-lg">
              <p className="text-xl font-bold">¡Valoración gratuita!</p>
              <p>Sin compromiso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

