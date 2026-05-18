import TopNavBar from "@/components/homepage/TopNavBar";
import HeroSection from "@/components/homepage/HeroSection";
import MenuSection from "@/components/homepage/MenuSection";
import SustainabilitySection from "@/components/homepage/SustainabilitySection";
import BestsellersSection from "@/components/homepage/BestsellersSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import BookTableSection from "@/components/homepage/BookTableSection";
import Footer from "@/components/homepage/Footer";

export default function Home() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen w-full flex flex-col">
      <main className="flex-grow flex flex-col w-full">
        <HeroSection />
        <MenuSection />
        <SustainabilitySection />
        <BestsellersSection />
        <TestimonialsSection />
        <BookTableSection />
      </main>
      <Footer />
    </div>
  );
}
