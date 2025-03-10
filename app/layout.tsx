import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Navbar from "./ui/nvbar";

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
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
