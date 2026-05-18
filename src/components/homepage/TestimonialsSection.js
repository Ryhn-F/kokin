"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Quote, ArrowLeft, ArrowRight, X, Loader2 } from "lucide-react";
import axios from "axios";

export default function TestimonialsSection() {
  const scrollContainerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/testimonial`);
      // Handle different wrapper types to be safe
      if (response.data && response.data.data) {
        setTestimonials(response.data.data);
      } else if (Array.isArray(response.data)) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    try {
      setSubmitLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/testimonial`, formData);
      setIsModalOpen(false);
      setFormData({ name: "", message: "" });
      fetchTestimonials(); // Refresh the list
    } catch (error) {
      console.error("Failed to submit testimonial", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="bg-surface py-xl px-margin-desktop w-full relative overflow-hidden">
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
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-on-surface font-label-lg px-8 py-3 text-lg border-2 border-on-surface shadow-[4px_4px_0px_0px_#182B2B] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#182B2B] transition-all rounded-none h-auto"
        >
          Share Your Feedback
        </Button>

        {loading ? (
          <div className="py-12 flex justify-center w-full">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : testimonials.length > 0 ? (
          <>
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto w-full pb-8 pt-4 snap-x no-scrollbar mt-8"
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="min-w-[300px] md:min-w-[400px] bg-surface rounded-[32px] p-8 border border-on-surface shadow-[4px_4px_0px_0px_#182B2B] flex flex-col gap-6 snap-center text-left relative"
                >
                  <Quote className="text-on-surface/20 absolute top-6 left-6 w-10 h-10" />
                  <p className="font-body-md text-on-surface relative z-10 pt-4">
                    &quot;{t.message}&quot;
                  </p>
                  <div className="mt-auto pt-4 border-t border-outline-variant/30">
                    <span className="font-label-lg text-on-surface">
                      - {t.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-end w-full max-w-7xl">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-on-surface bg-primary-container flex items-center justify-center hover:opacity-90  transition-colors"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-on-surface bg-primary-container text-on-surface flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <ArrowRight />
              </button>
            </div>
          </>
        ) : (
          <p className="text-on-surface-variant mt-8 py-12">
            No testimonials yet. Be the first to share your feedback!
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface rounded-2xl p-6 md:p-8 w-[50%]  border border-on-surface shadow-[8px_8px_0px_0px_#182B2B] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="font-headline-md text-on-surface mb-6">
              Share Your Feedback
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-left">
                <label className="font-label-md text-on-surface">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="font-label-md text-on-surface">
                  Your Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md min-h-[120px] resize-y"
                  placeholder="Great coffee and nice place!"
                />
              </div>
              <Button
                type="submit"
                disabled={submitLoading}
                className="mt-4 bg-primary text-on-primary w-full py-4 rounded-xl text-lg hover:opacity-90 transition-opacity flex justify-center items-center"
              >
                {submitLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
