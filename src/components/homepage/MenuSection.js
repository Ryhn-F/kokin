import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function MenuSection() {
  return (
    <section className="bg-surface py-xl px-margin-desktop w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-xl">
        <div className="text-center flex flex-col items-center gap-sm">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Our Menu</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Welcome to Kokin. Here, we pride ourselves on offering a diverse selection of beverages and treats that cater to every taste.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="bg-surface-container-highest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-full h-48 rounded-xl overflow-hidden mb-2 relative">
              <Image alt="Cold Brew" fill className="object-cover group-hover:scale-105 transition-transform duration-500" src="/images/homepage/menu-cold-brew.jpg" />
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-headline-md text-headline-md text-on-surface">Cold Brew</h3>
              <span className="font-headline-md text-primary">$ 3.00</span>
            </div>
            <p className="font-body-md text-on-surface-variant flex-grow">Brewed slowly for a smooth, bold finish.</p>
            <Button variant="outline" className="w-full mt-4 bg-transparent border-on-surface text-on-surface font-label-lg py-6 hover:bg-on-surface hover:text-surface transition-colors rounded-none">
              Book Product
            </Button>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-highest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-full h-48 rounded-xl overflow-hidden mb-2 relative">
              <div className="absolute top-2 left-2 bg-primary-container text-on-primary-fixed font-label-md px-2 py-1 rounded-full z-10">New</div>
              <Image alt="Latte" fill className="object-cover group-hover:scale-105 transition-transform duration-500" src="/images/homepage/menu-latte.jpg" />
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-headline-md text-headline-md text-on-surface">Latte</h3>
              <span className="font-headline-md text-primary">$ 2.15</span>
            </div>
            <p className="font-body-md text-on-surface-variant flex-grow">Smooth and creamy classic espresso with steamed milk.</p>
            <Button variant="outline" className="w-full mt-4 bg-transparent border-on-surface text-on-surface font-label-lg py-6 hover:bg-on-surface hover:text-surface transition-colors rounded-none">
              Book Product
            </Button>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-highest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-full h-48 rounded-xl overflow-hidden mb-2 relative">
              <Image alt="Matcha Latte" fill className="object-cover group-hover:scale-105 transition-transform duration-500" src="/images/homepage/menu-matcha.jpg" />
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-headline-md text-headline-md text-on-surface">Matcha Latte</h3>
              <span className="font-headline-md text-primary">$ 1.80</span>
            </div>
            <p className="font-body-md text-on-surface-variant flex-grow">A creamy and vibrant green tea experience.</p>
            <Button variant="outline" className="w-full mt-4 bg-transparent border-on-surface text-on-surface font-label-lg py-6 hover:bg-on-surface hover:text-surface transition-colors rounded-none">
              Book Product
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button className="bg-primary-container text-on-surface font-label-lg px-8 py-7 border-2 border-on-surface shadow-[4px_4px_0px_0px_#182B2B] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#182B2B] transition-all flex items-center gap-2 rounded-none h-auto">
            View Full Menu <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
