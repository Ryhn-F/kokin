"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

export default function MenuSection() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product`,
        );
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          productsData = response.data.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          productsData = response.data.products;
        } else {
          console.error("Unexpected API response format:", response.data);
        }

        // Only show 5 products
        setProducts(productsData.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback data for preview if API is not running
        setProducts([
          {
            id: 1,
            name: "Cold Brew",
            price: 3.0,
            category: "Coffee",
            image_url: "/images/homepage/menu-cold-brew.jpg",
          },
          {
            id: 2,
            name: "Latte",
            price: 2.15,
            category: "New",
            image_url: "/images/homepage/menu-latte.jpg",
          },
          {
            id: 3,
            name: "Matcha Latte",
            price: 1.8,
            category: "Tea",
            image_url: "/images/homepage/menu-matcha.jpg",
          },
          {
            id: 4,
            name: "Espresso",
            price: 1.5,
            category: "Coffee",
            image_url: "/images/homepage/menu-cold-brew.jpg",
          },
          {
            id: 5,
            name: "Mocha",
            price: 2.5,
            category: "Coffee",
            image_url: "/images/homepage/menu-latte.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBookProduct = (product) => {
    const cart = JSON.parse(localStorage.getItem("kokin_cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.cartQuantity += 1;
    } else {
      cart.push({ ...product, cartQuantity: 1 });
    }
    localStorage.setItem("kokin_cart", JSON.stringify(cart));
    router.push("/order");
  };

  return (
    <section className="bg-surface py-xl px-margin-desktop w-full shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col gap-xl">
        <div className="text-center flex flex-col items-center gap-sm">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Our Menu
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Welcome to Kokin. Here, we pride ourselves on offering a diverse
            selection of beverages and treats that cater to every taste.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-surface-container-highest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden mb-2 relative bg-surface-container">
                  {product.category === "New" && (
                    <div className="absolute top-2 left-2 bg-primary-container text-on-primary-fixed font-label-md px-2 py-1 rounded-full z-10">
                      New
                    </div>
                  )}
                  <Image
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.image_url || "/images/homepage/menu-latte.jpg"}
                    onError={(e) => {
                      e.currentTarget.srcset = "";
                      e.currentTarget.src = "/images/homepage/menu-latte.jpg";
                    }}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="font-headline-md text-primary shrink-0 ml-2">
                    Rp. {product.price}.-
                  </span>
                </div>
                <p className="font-body-md text-on-surface-variant flex-grow line-clamp-2">
                  {product.description ||
                    `Enjoy our delicious ${product.name}, crafted with the finest ingredients.`}
                </p>
                <Button
                  onClick={() => handleBookProduct(product)}
                  variant="outline"
                  className="w-full mt-4 bg-transparent text-lg border-on-surface text-on-surface font-label-lg py-6 hover:bg-on-surface hover:text-surface transition-colors rounded-none"
                >
                  Book Product
                </Button>
              </div>
            ))}

            {/* End of scroll link to /menu */}
            <div className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-surface-container-highest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col items-center justify-center gap-4 group hover:-translate-y-1 transition-transform duration-300 min-h-[400px]">
              <Link
                href="/menu"
                className="flex flex-col items-center gap-4 text-on-surface group-hover:text-primary transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary-container group-hover:bg-primary flex items-center justify-center text-on-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                  <ArrowRight size={32} />
                </div>
                <span className="font-headline-md text-headline-md">
                  View Full Menu
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
