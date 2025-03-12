import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactInfo() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Dirección</h3>
              <p className="text-muted-foreground">
                Avenida de los Coches, 123
                <br />
                28001 Madrid, España
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Teléfono</h3>
              <p className="text-muted-foreground">
                <a href="tel:+34912345678" className="hover:text-primary">
                  +34 91 234 56 78
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-muted-foreground">
                <a href="mailto:info@concesionario.com" className="hover:text-primary">
                  info@concesionario.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Horario</h3>
              <p className="text-muted-foreground">
                Lunes a Viernes: 9:00 - 20:00
                <br />
                Sábados: 10:00 - 14:00
                <br />
                Domingos: Cerrado
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Síguenos en redes sociales</h3>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" asChild>
            <a href="#" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="bg-muted/40 rounded-lg">
        <h3 className="text-xl font-medium mb-4">¿Necesitas ayuda inmediata?</h3>
        <p className="mb-4">
          Nuestro equipo de atención al cliente está disponible para ayudarte con cualquier consulta.
        </p>
        <Button asChild>
          <a href="tel:+34912345678">Llamar ahora</a>
        </Button>
      </div>
    </div>
  )
}

