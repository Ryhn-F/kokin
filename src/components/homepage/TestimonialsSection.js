import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-surface-container py-xl px-margin-desktop w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-lg">
        <div className="max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
            What Our Guests Have To Say
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Read genuine reviews from our satisfied guests and see how our
            exceptional coffee, delicious food, and welcoming atmosphere have
            made their experiences memorable.
          </p>
        </div>
        <Button className="bg-primary-container text-on-surface font-label-lg px-8 py-3 text-lg  border-2 border-on-surface shadow-[4px_4px_0px_0px_#182B2B] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#182B2B] transition-all rounded-none h-auto">
          Share Your Feedback
        </Button>
        <div className="flex gap-6 overflow-x-auto w-full pb-8 pt-4 snap-x no-scrollbar mt-8">
          {/* Review 1 */}
          <div className="min-w-[300px] md:min-w-[400px] bg-surface rounded-[32px] p-8 border border-on-surface shadow-[4px_4px_0px_0px_#182B2B] flex flex-col gap-6 snap-center text-left relative">
            <Quote className="text-on-surface/20 absolute top-6 left-6 w-10 h-10" />
            <p className="font-body-md text-on-surface relative z-10 pt-4">
              &quot;Best coffee in town! The atmosphere is cozy and the baristas
              are super friendly. Highly recommend the iced latte!&quot;
            </p>
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/30">
              <Image
                alt="Sarah M"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                src="/images/homepage/testimonial-1.jpg"
              />
              <span className="font-label-lg text-on-surface">Sarah M</span>
            </div>
          </div>
          {/* Review 2 */}
          <div className="min-w-[300px] md:min-w-[400px] bg-surface rounded-[32px] p-8 border border-on-surface shadow-[4px_4px_0px_0px_#182B2B] flex flex-col gap-6 snap-center text-left relative">
            <Quote className="text-on-surface/20 absolute top-6 left-6 w-10 h-10" />
            <p className="font-body-md text-on-surface relative z-10 pt-4">
              &quot;Love this place for a quick coffee break. The service is
              fast and efficient, and the pastries are delicious. Perfect for a
              mid-afternoon pick-me-up.&quot;
            </p>
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/30">
              <Image
                alt="David L"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                src="/images/homepage/testimonial-2.jpg"
              />
              <span className="font-label-lg text-on-surface">David L.</span>
            </div>
          </div>
          {/* Review 3 */}
          <div className="min-w-[300px] md:min-w-[400px] bg-surface rounded-[32px] p-8 border border-on-surface shadow-[4px_4px_0px_0px_#182B2B] flex flex-col gap-6 snap-center text-left relative">
            <Quote className="text-on-surface/20 absolute top-6 left-6 w-10 h-10" />
            <p className="font-body-md text-on-surface relative z-10 pt-4">
              &quot;Kokin is my go-to spot for catching up with friends. The
              vibe is relaxed and the coffee is always on point. Great local
              spot!&quot;
            </p>
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/30">
              <Image
                alt="Maria S"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                src="/images/homepage/testimonial-3.jpg"
              />
              <span className="font-label-lg text-on-surface">Maria S</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end w-full max-w-7xl">
          <button className="w-10 h-10 rounded-full border border-on-surface flex items-center justify-center hover:bg-surface-variant transition-colors">
            <ArrowLeft />
          </button>
          <button className="w-10 h-10 rounded-full border border-on-surface bg-primary-container text-on-surface flex items-center justify-center hover:opacity-90 transition-opacity">
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
