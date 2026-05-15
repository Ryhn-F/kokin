import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function BestsellersSection() {
  return (
    <section className="bg-surface py-xl px-margin-desktop w-full relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-lg items-center">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Our Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Product 1 */}
          <div className="bento-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col items-center gap-4 relative overflow-hidden group">
            <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary font-label-md px-3 py-1 rounded-full text-xs">Save 18%</div>
            <div className="w-full h-48 flex justify-center items-center py-4">
              <div className="w-32 h-40 bg-surface rounded-md shadow-md border border-outline-variant/30 flex items-center justify-center text-on-surface-variant text-center p-2 relative">
                <Image alt="Coffee Bag" fill className="object-cover rounded-sm mix-blend-multiply" src="/images/homepage/product-1.jpg" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 text-center">
              <h4 className="font-label-lg text-on-surface">Decaf Coffee Blend</h4>
              <div className="flex justify-center items-baseline gap-2">
                <span className="font-headline-md text-on-surface">$ 16.99 USD</span>
                <span className="font-body-md text-on-surface-variant line-through text-sm">$ 17.99 USD</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2 bg-transparent border-on-surface text-on-surface font-label-lg py-5 hover:bg-primary-container hover:border-primary-container hover:text-on-surface transition-all flex justify-center items-center gap-2 rounded-none">
              Add To Cart <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </Button>
          </div>
          {/* Product 2 */}
          <div className="bento-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col items-center gap-4 relative overflow-hidden group">
            <div className="w-full h-48 flex justify-center items-center py-4">
              <div className="w-32 h-40 bg-surface rounded-md shadow-md border border-outline-variant/30 flex items-center justify-center text-on-surface-variant text-center p-2 relative">
                <Image alt="Coffee Bag" fill className="object-cover rounded-sm mix-blend-multiply hue-rotate-90" src="/images/homepage/product-2.jpg" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 text-center">
              <h4 className="font-label-lg text-on-surface">English Breakfast Tea</h4>
              <span className="font-headline-md text-on-surface">$ 21.55 USD</span>
            </div>
            <Button variant="outline" className="w-full mt-2 bg-transparent border-on-surface text-on-surface font-label-lg py-5 hover:bg-primary-container hover:border-primary-container hover:text-on-surface transition-all flex justify-center items-center gap-2 rounded-none">
              Add To Cart <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </Button>
          </div>
          {/* Product 3 */}
          <div className="bento-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col items-center gap-4 relative overflow-hidden group">
            <div className="w-full h-48 flex justify-center items-center py-4">
              <div className="w-32 h-40 bg-surface rounded-md shadow-md border border-outline-variant/30 flex items-center justify-center text-on-surface-variant text-center p-2 relative">
                <Image alt="Coffee Bag" fill className="object-cover rounded-sm mix-blend-multiply hue-rotate-180" src="/images/homepage/product-3.jpg" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 text-center">
              <h4 className="font-label-lg text-on-surface">Premium Ground Coffee</h4>
              <span className="font-headline-md text-on-surface">$ 15.99 USD</span>
            </div>
            <Button variant="outline" className="w-full mt-2 bg-transparent border-on-surface text-on-surface font-label-lg py-5 hover:bg-primary-container hover:border-primary-container hover:text-on-surface transition-all flex justify-center items-center gap-2 rounded-none">
              Add To Cart <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </Button>
          </div>
          {/* Product 4 */}
          <div className="bento-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col items-center gap-4 relative overflow-hidden group">
            <div className="w-full h-48 flex justify-center items-center py-4">
              <div className="w-32 h-40 bg-surface rounded-md shadow-md border border-outline-variant/30 flex items-center justify-center text-on-surface-variant text-center p-2 relative">
                <Image alt="Coffee Bag" fill className="object-cover rounded-sm mix-blend-multiply hue-rotate-[270deg]" src="/images/homepage/product-4.jpg" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 text-center">
              <h4 className="font-label-lg text-on-surface">Espresso Beans</h4>
              <span className="font-headline-md text-on-surface">$ 14.99 USD</span>
            </div>
            <Button variant="outline" className="w-full mt-2 bg-transparent border-on-surface text-on-surface font-label-lg py-5 hover:bg-primary-container hover:border-primary-container hover:text-on-surface transition-all flex justify-center items-center gap-2 rounded-none">
              Add To Cart <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <Button variant="outline" className="bg-transparent border-on-surface text-on-surface font-label-lg px-6 py-5 hover:bg-on-surface hover:text-surface transition-colors rounded-none flex items-center gap-2">
            Visit Our Shop <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
