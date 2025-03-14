import { CarDetailSkeleton } from "@/components/cars/carSkeleton"

export default function CarLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <CarDetailSkeleton />
      </div>
    </main>
  )
}

