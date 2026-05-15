import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="bg-surface-container pt-xl pb-xl px-margin-desktop w-full relative overflow-hidden">
      {/* Abstract background elements simulation */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-surface-variant rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-xl items-center relative z-10">
        <div className="flex flex-col gap-lg">
          <div className="flex items-center gap-sm bg-surface-variant/50 w-fit px-4 py-2 rounded-full border border-outline-variant/30 backdrop-blur-sm">
            <div className="flex -space-x-2">
              <Image alt="Customer 1" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="/images/homepage/customer-1.jpg" />
              <Image alt="Customer 2" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="/images/homepage/customer-2.jpg" />
              <Image alt="Customer 3" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="/images/homepage/customer-3.jpg" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-on-surface">10,000+</span>
              <span className="font-label-md text-on-surface-variant">Happy Customers</span>
            </div>
          </div>
          <h1 className="font-display text-display text-on-surface leading-tight">
            The Perfect Blend of <br /> Aroma &amp; Ambiance
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-md">
            We&apos;re committed to ethical sourcing and sustainable practices for a better coffee experience.
          </p>
          <div>
            <Button className="bg-primary-container text-on-surface font-label-lg px-8 py-7 border-2 border-on-surface shadow-[4px_4px_0px_0px_#182B2B] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#182B2B] transition-all rounded-none h-auto">
              Explore Our Specials
            </Button>
          </div>
        </div>
        <div className="relative w-full h-[600px] flex justify-end items-center">
          <div className="absolute w-[90%] h-[90%] organic-border -translate-x-4 translate-y-4"></div>
          <Image alt="Coffee and Croissant" fill className="object-cover custom-shape-hero relative z-10 !w-[90%] !h-[90%] !left-auto" src="/images/homepage/hero.jpg" />
        </div>
      </div>
    </section>
  );
}
