import BrandGrid from "@/components/home/brandGrid";
import ContactButtons from "@/components/contactButtons";
import Faq from "@/components/faq";
import CategoriesSection from "@/components/home/categories-section";
import HeroSection from "@/components/home/hero-section";
import SearchSection from "@/components/home/search-section";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Encuentra tu marca favorita
          </h2>
          <BrandGrid />
          <Link
            href="/coches-segunda-mano"
            className="bg-black text-white font-semibold px-8 py-3 text-base md:text-lg rounded-[0.5rem] hover:bg-gray-300 transition-colors hover:text-black w-max"
          >
            Ver todas las marcas
          </Link>
        </div>
      </section>
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto sm:px-28">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Preguntas frecuentes</h2>
          <Faq />
        </div>
      </section>
      <ContactButtons/>
    </>
  );
}
