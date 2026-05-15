import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-dim grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-xl w-full border-t border-surface-container-high dark:border-surface-container">
      {/* Column 1: Newsletter */}
      <div className="flex flex-col gap-4">
        <h4 className="font-headline-md text-on-surface">Stay Up to Date</h4>
        <div className="flex w-full mt-2">
          <input className="w-full bg-surface border border-on-surface px-4 py-2 text-on-surface font-body-md outline-none focus:border-primary" placeholder="john@example.com" type="email" />
          <button className="bg-primary-container text-on-surface border border-l-0 border-on-surface px-4 font-label-lg hover:opacity-90 transition-opacity">Submit</button>
        </div>
        <p className="font-body-md text-on-surface-variant text-sm mt-2">Subscribe to receive communication about our latest products, discount offerings and stories.</p>
      </div>
      {/* Column 2: Hours/Location */}
      <div className="flex flex-col gap-4 md:pl-8">
        <h4 className="font-label-lg text-on-surface">Opening Hours</h4>
        <p className="font-body-md text-on-surface-variant text-sm">Monday - Friday: 07:00 AM - 08:00 PM<br />Saturday - Sunday: 07:00 AM - 08:00 PM</p>
        <h4 className="font-label-lg text-on-surface mt-4">Location</h4>
        <p className="font-body-md text-on-surface-variant text-sm">Uptown branch, 456 Uptown Avenue,<br />Uptown City, 20002</p>
      </div>
      {/* Column 3: Links */}
      <div className="flex gap-12 md:col-span-2 md:justify-end">
        <div className="flex flex-col gap-3">
          <h4 className="font-label-lg text-on-surface mb-2">Home</h4>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Our Menu</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Shop</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Testimonials</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">About</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-label-lg text-on-surface mb-2">Orders &amp; Support</h4>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">FAQ</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Contact Us</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Shipping &amp; Returns</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-label-lg text-on-surface mb-2">Social</h4>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Instagram</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Facebook</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Twitter</Link>
        </div>
      </div>
      {/* Bottom Row */}
      <div className="md:col-span-4 flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-outline-variant/30 w-full">
        <span className="font-body-md text-body-md text-on-surface-variant">© 2025 Kokin Coffee. All rights reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Privacy Policy</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
