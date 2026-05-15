import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TopNavBar() {
  return (
    <header className="bg-surface/90 backdrop-blur-md shadow-sm flex justify-between items-center w-full px-margin-desktop py-base sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
        <span className="font-display text-headline-md font-bold text-on-surface">Kokin</span>
      </div>
      <nav className="hidden md:flex gap-gutter items-center font-label-lg text-label-lg">
        <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">Our Menu</Link>
        <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">Shop</Link>
        <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">Testimonials</Link>
        <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">About</Link>
      </nav>
      <div className="flex items-center gap-md">
        <div className="hidden md:flex items-center gap-sm">
          <button className="text-on-surface hover:opacity-80 transition-opacity flex items-center justify-center p-2">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="text-on-surface hover:opacity-80 transition-opacity flex items-center justify-center p-2">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
        <Button variant="outline" className="bg-transparent border-on-surface text-on-surface font-label-lg px-6 py-5 hover:bg-on-surface hover:text-surface transition-colors rounded-none h-auto">
          Book a Table
        </Button>
      </div>
    </header>
  );
}
