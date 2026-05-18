import MenuHeroSection from "@/components/menu/MenuHeroSection";
import ProductCatalog from "@/components/menu/ProductCatalog";
import Footer from "@/components/homepage/Footer";

export const metadata = {
  title: "Menu | Kokin Coffee",
  description:
    "Explore our thoughtfully curated menu of crafted drinks and treats.",
};

export default function MenuPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen w-full flex flex-col">
      <main className="flex-grow flex flex-col w-full">
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
}
