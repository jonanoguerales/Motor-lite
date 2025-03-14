"use client";

import { Check } from "lucide-react"

interface CarFeaturesProps {
  features: string[]
}

export default function CarFeatures({ features }: CarFeaturesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Equipamiento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

