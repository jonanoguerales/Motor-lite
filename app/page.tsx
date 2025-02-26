import ContactButtons from "./ui/contact-buttons";
import CategoriesSection from "./ui/home/categories-section";
import HeroSection from "./ui/home/hero-section";
import SearchSection from "./ui/home/search-section";

export default function Page() {
  return (
    <main >
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <CategoriesSection />
      <CategoriesSection />
      <ContactButtons />
    </main>
  );
}
