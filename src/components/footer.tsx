import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:justify-items-center">
          <div>
            <h3 className="text-xl font-bold mb-4">Concesionario</h3>
            <p className="text-gray-400 mb-4">
              Tu concesionario de confianza para vehículos nuevos y de segunda
              mano.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/financiacion"
                  className="text-gray-400 hover:text-white"
                >
                  Tasación
                </Link>
              </li>
              <li>
                <Link
                  href="/financiacion"
                  className="text-gray-400 hover:text-white"
                >
                  Financiación
                </Link>
              </li>
              <li>
                <Link
                  href="/garantia"
                  className="text-gray-400 hover:text-white"
                >
                  Garantía
                </Link>
              </li>
              <li>
                <Link href="/taller" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/politica-privacidad" className="text-gray-400 hover:text-white">
                Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-gray-400 hover:text-white"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-condiciones"
                  className="text-gray-400 hover:text-white"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <address className="not-italic text-gray-400">
              <p>Avenida de los Coches, 123</p>
              <p>28001 Madrid, España</p>
              <p className="mt-2">
                <a href="tel:+34912345678" className="hover:text-white">
                  +34 91 234 56 78
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@concesionario.com"
                  className="hover:text-white"
                >
                  info@concesionario.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Concesionario Lebauto. Todos los derechos
            reservados.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacidad" className="hover:text-white">
              Política de privacidad
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Política de cookies
            </Link>
            <Link href="/legal" className="hover:text-white">
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
