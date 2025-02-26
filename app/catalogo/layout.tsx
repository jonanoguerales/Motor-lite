import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "@/app/ui/global.css";

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="container mx-auto h-full flex min-h-screen">
        {/* Barra lateral */}
        <Sidebar className="w-64 bg-gray-800 text-white mt-16">
          {/* Contenido de los filtros */}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            {/* Aquí puedes agregar tus componentes de filtro */}
          </div>
        </Sidebar>

        {/* Contenido principal */}
        <div className="flex-1 bg-white">
          {/* Botón para mostrar/ocultar la barra lateral en dispositivos móviles */}
          <SidebarTrigger className="p-4 md:hidden">
            <button className="text-gray-800">Mostrar Filtros</button>
          </SidebarTrigger>

          {/* Contenido de la página */}
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
