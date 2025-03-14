import "./global.css";
import { inter } from "@/components/fonts";
import Footer from "@/components/footer";
import Navbar from "@/components/nvbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Concesionario de Coches de Segunda Mano",
  description: "Encuentra tu coche ideal entre nuestra amplia selección de vehículos de segunda mano",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lebauto</title>
        <meta
          name="description"
          content="Concesionario de coches de segunda mano"
        />
        <link rel="icon" href="/logo.webp" type="image/webp"/>
      </head>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen overflow-x-hidden`}>
        <Navbar />
        <main className="flex-1 w-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
