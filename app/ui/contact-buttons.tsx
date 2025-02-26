"use client";

import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ContactButtons() {
  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="bg-gray-900 hover:bg-gray-700 text-white rounded-full h-12 w-12"
              onClick={() => (window.location.href = "tel:+34600000000")}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Llamar ahora</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip >
          <TooltipTrigger asChild >
            <Button
              size="icon"
              className="bg-gray-900 hover:bg-gray-700 text-white rounded-full h-12 w-12"
              onClick={() => window.open("https://wa.me/34600000000", "_blank")}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Contactar por WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}