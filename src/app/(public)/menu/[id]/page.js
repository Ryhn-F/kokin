import Footer from "@/components/homepage/Footer";
import ProductDetailClient from "@/components/menu/ProductDetailClient";

export const metadata = {
  title: "Product Detail | Kokin Coffee",
  description: "Discover our premium crafted drinks and treats.",
};

export default function ProductDetailPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen w-full flex flex-col">
      <main className="flex-grow flex flex-col w-full relative">
        <ProductDetailClient />
      </main>
      <Footer />
    </div>
  );
}
