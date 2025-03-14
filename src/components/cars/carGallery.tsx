"use client";

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarGalleryProps {
  images: string[]
}

export default function CarGallery({ images }: CarGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="mb-8">
      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt="Imagen del vehículo"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative h-20 rounded-md overflow-hidden ${
              currentImage === index ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Imagen ${index + 1} del vehículo`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

