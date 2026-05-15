import Image from 'next/image';

export default function SustainabilitySection() {
  return (
    <section className="bg-surface-container-low py-xl px-margin-desktop w-full relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-8">Our Commitment to Sustainability</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-5 h-[500px] rounded-[40px] overflow-hidden border border-outline-variant/30 relative">
            <Image alt="Barista working" fill className="object-cover" src="/images/homepage/sustainability.jpg" />
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 content-center pl-0 lg:pl-8">
            {/* Feature 1 */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full border border-primary-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>eco</span>
              </div>
              <h4 className="font-headline-md text-[20px] text-on-surface">Cozy Atmosphere</h4>
              <p className="font-body-md text-on-surface-variant">We are committed to eco-friendly practice, from using biodegradable materials to sourcing locally.</p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full border border-primary-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>coffee_maker</span>
              </div>
              <h4 className="font-headline-md text-[20px] text-on-surface">Artisanal Coffee</h4>
              <p className="font-body-md text-on-surface-variant">Our coffee is sourced from the finest regions around the world and roasted to perfection.</p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full border border-primary-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>groups</span>
              </div>
              <h4 className="font-headline-md text-[20px] text-on-surface">Community Engagement</h4>
              <p className="font-body-md text-on-surface-variant">We believe in giving back to our community through events, and local collaboration.</p>
            </div>
            {/* Feature 4 */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full border border-primary-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>volunteer_activism</span>
              </div>
              <h4 className="font-headline-md text-[20px] text-on-surface">Exceptional Service</h4>
              <p className="font-body-md text-on-surface-variant">Our friendly and knowledgeable staff are dedicated to providing you with the best service.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
