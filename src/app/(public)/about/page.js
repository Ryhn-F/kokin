"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Coffee,
  Heart,
  Lightbulb,
  Leaf,
  Armchair,
  Users,
  ChevronRight,
  Smartphone,
  LineChart,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Placeholder Images (Unsplash high quality coffee aesthetics)
const IMG_HERO =
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop";
const IMG_STORY =
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop";
const IMG_DIGITAL =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop";
const IMG_EXPERIENCE =
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2000&auto=format&fit=crop";

const GALLERY = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495474472201-4408cebbbdc6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2420] overflow-hidden">
      {/* 1. HERO STORY SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-16 px-6 lg:px-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#FDFBF7]/80 z-10 backdrop-blur-[2px]"></div>
          <Image
            src={IMG_HERO}
            alt="Kokin Barista"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-[#F2EAE1] px-4 py-2 rounded-full w-fit"
            >
              <Coffee size={16} className="text-[#8B5A33]" />
              <span className="font-label-md text-[#8B5A33] tracking-widest uppercase">
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl leading-tight"
            >
              Brewing Tradition Through{" "}
              <span className="text-[#8B5A33] italic">Digital Innovation</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="font-body-lg text-[#5A4F48]  leading-relaxed text-lg"
            >
              Kokin is a local UMKM café that embraces technology to enhance
              your experience, while preserving the warmth, passion, and
              authenticity of traditional coffee culture.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-4">
              <Button
                onClick={() => router.push("/menu")}
                className="rounded-full bg-[#2C2420] text-white px-8 py-6 text-lg hover:bg-[#8B5A33] transition-colors"
              >
                Explore Our Menu
              </Button>
              <Button
                onClick={() => router.push("/order")}
                variant="outline"
                className="rounded-full border-[#2C2420] text-[#2C2420] px-8 py-6 text-lg hover:bg-[#F2EAE1]"
              >
                Visit Our Café
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <Image
              src={IMG_HERO}
              alt="Kokin Coffee Art"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. BRAND STORY SECTION */}
      <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            variants={fadeUp}
            className="order-2 lg:order-1 relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-lg border border-[#E8DCCB]"
          >
            <Image
              src={IMG_STORY}
              alt="Kokin Cafe Ambience"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <h2 className="font-display text-4xl md:text-5xl">Our Journey</h2>
            <div className="space-y-6 font-body-lg text-[#5A4F48] leading-relaxed text-lg">
              <p>
                What started as a humble local coffee shop was born from a deep
                passion for authentic Indonesian beans. We wanted to create more
                than just a place to drink coffee; we wanted to build a
                community.
              </p>
              <p>
                As a growing UMKM, we faced challenges. But rather than standing
                still, we chose courage. We realized that to serve our community
                better, we needed to evolve.
              </p>
              <p>
                Today, Kokin blends the cozy, human-centered warmth of a classic
                café with modern digital systems—allowing us to focus more on
                what matters:{" "}
                <span className="font-bold text-[#2C2420]">
                  You and your coffee.
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. DIGITALIZATION SECTION (CORE IDENTITY) */}
      <section className="py-24 px-6 lg:px-16 bg-[#2C2420] text-[#FDFBF7] relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5A33]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-6xl mb-6">
              Taking Courageous Steps Toward Digitalization
            </h2>
            <p className="font-body-lg text-[#D4A373] text-xl">
              Modernizing our business to serve you better, without losing our
              local touch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {[
                {
                  icon: Smartphone,
                  title: "Online Ordering",
                  desc: "Skip the queue with our seamless digital menu.",
                },
                {
                  icon: Armchair,
                  title: "Digital Reservations",
                  desc: "Book your favorite corner table instantly.",
                },
                {
                  icon: LineChart,
                  title: "Smarter Operations",
                  desc: "Ensuring your coffee is served fast and fresh.",
                },
                {
                  icon: Globe,
                  title: "Digital Community",
                  desc: "Connecting with coffee lovers everywhere.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#8B5A33]/20 flex items-center justify-center shrink-0 group-hover:bg-[#8B5A33] transition-colors">
                    <item.icon
                      className="text-[#D4A373] group-hover:text-white transition-colors"
                      size={24}
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-xl mb-1">{item.title}</h4>
                    <p className="font-body-md text-white/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-7 relative h-[500px] lg:h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src={IMG_DIGITAL}
                alt="Kokin Digital System"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION */}
      <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto bg-[#FDFBF7]">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl">Our Core Values</h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Coffee,
              title: "Authentic Coffee",
              desc: "Sourcing the best local beans with passionate craftsmanship.",
            },
            {
              icon: Users,
              title: "Community First",
              desc: "Building a warm space where everyone belongs.",
            },
            {
              icon: Lightbulb,
              title: "Innovation",
              desc: "Embracing technology to elevate your experience.",
            },
            {
              icon: Heart,
              title: "Warm Hospitality",
              desc: "Serving every cup with a genuine smile.",
            },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#E8DCCB] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F2EAE1] flex items-center justify-center mb-6 group-hover:bg-[#8B5A33] group-hover:text-white transition-colors text-[#8B5A33]">
                <val.icon size={28} />
              </div>
              <h3 className="font-display text-2xl mb-3">{val.title}</h3>
              <p className="font-body-md text-[#5A4F48] leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. EXPERIENCE & STATISTICS */}
      <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative rounded-[3rem] overflow-hidden bg-[#2C2420] text-white"
        >
          <Image
            src={IMG_EXPERIENCE}
            alt="Experience Kokin"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10 p-12 md:p-24 text-center flex flex-col items-center">
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-6xl mb-6"
            >
              More Than Just Coffee
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body-lg text-white/80 max-w-2xl mb-16 text-lg"
            >
              We focus on cozy ambience, comfortable seating, and product
              quality to give you a premium modern café experience.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              {[
                { number: "10k+", label: "Happy Customers" },
                { number: "100+", label: "Daily Orders" },
                { number: "20+", label: "Signature Drinks" },
                { number: "100%", label: "Local Pride" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex flex-col items-center"
                >
                  <span className="font-display text-4xl md:text-5xl text-[#D4A373] mb-2">
                    {stat.number}
                  </span>
                  <span className="font-label-md text-white/80 uppercase tracking-widest text-xs md:text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Aesthetic Moments
          </h2>
          <p className="font-body-lg text-[#5A4F48]">
            Glimpses of our daily craft and atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <div className="relative h-64 md:h-96 rounded-[2rem] overflow-hidden group">
              <Image
                src={GALLERY[0]}
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="relative h-48 md:h-64 rounded-[2rem] overflow-hidden group">
              <Image
                src={GALLERY[1]}
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative h-48 md:h-64 rounded-[2rem] overflow-hidden group">
              <Image
                src={GALLERY[2]}
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="relative h-64 md:h-96 rounded-[2rem] overflow-hidden group">
              <Image
                src={GALLERY[3]}
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION & FOOTER */}
      <section className="bg-[#EBE2D5] py-24 px-6 lg:px-16 text-center rounded-t-[3rem]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="font-display text-4xl md:text-6xl mb-6 text-[#2C2420]">
            Experience the Warmth of Kokin
          </h2>
          <p className="font-body-lg text-[#5A4F48] mb-10 text-lg">
            Whether you are ordering online or reserving a cozy corner, we can't
            wait to serve you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => router.push("/menu")}
              className="rounded-full bg-[#2C2420] text-white px-8 py-6 text-lg hover:bg-[#8B5A33] transition-colors shadow-xl"
            >
              Order Now
            </Button>
            <Button
              onClick={() => router.push("/order")}
              variant="outline"
              className="rounded-full border-[#2C2420] text-[#2C2420] px-8 py-6 text-lg hover:bg-[#FDFBF7] shadow-xl"
            >
              Reserve a Table
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C2420] text-white py-12 px-6 lg:px-16 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="font-display text-3xl tracking-wider">KOKIN</h2>
          <p className="font-body-sm text-white/50">
            © 2026 Kokin Coffee. All rights reserved.
          </p>
          <div className="flex gap-6 font-label-md">
            <span className="cursor-pointer hover:text-[#D4A373] transition-colors">
              Instagram
            </span>
            <span className="cursor-pointer hover:text-[#D4A373] transition-colors">
              WhatsApp
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
