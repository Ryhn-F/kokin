import Image from "next/image";

export default function MenuHeroSection() {
  return (
    <section className="bg-surface-container pt-xl pb-xl px-margin-desktop w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-surface-variant rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 py-12 md:py-20">
        <div className="inline-block bg-surface-variant/60 px-5 py-2 rounded-full border border-outline-variant/30 backdrop-blur-sm mb-6 shadow-sm">
          <span className="font-label-md text-on-surface-variant uppercase tracking-widest">100+ Signature Drinks</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-on-surface leading-tight mb-6">
          Crafted Drinks for <br /> Every Mood
        </h1>
        
        <p className="font-body-lg text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore our thoughtfully curated menu. From our classic espresso blends to refreshing non-coffee alternatives, find your perfect match.
        </p>
        
        {/* Decorative element */}
        <div className="w-20 h-1 bg-primary rounded-full opacity-80"></div>
      </div>
    </section>
  );
}
