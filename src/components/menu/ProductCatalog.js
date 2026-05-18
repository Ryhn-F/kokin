"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Search } from "lucide-react";
import axios from "axios";

export default function ProductCatalog() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Coffee", "Non Coffee", "Others"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          productsData = response.data.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          productsData = response.data.products;
        }
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback mock data with proper image URLs
        setProducts([
          {
            id: 1,
            name: "Es Kopi Susu",
            image_url: "/images/homepage/menu-latte.jpg",
            category: "Coffee",
            price: 25000,
          },
          {
            id: 2,
            name: "Cold Brew",
            image_url: "/images/homepage/menu-cold-brew.jpg",
            category: "Coffee",
            price: 30000,
          },
          {
            id: 3,
            name: "Matcha Latte",
            image_url: "/images/homepage/menu-matcha.jpg",
            category: "Non Coffee",
            price: 35000,
          },
          {
            id: 4,
            name: "Red Velvet",
            image_url: "/images/homepage/menu-latte.jpg",
            category: "Non Coffee",
            price: 32000,
          },
          {
            id: 5,
            name: "Chocolate Fudge",
            image_url: "/images/homepage/menu-matcha.jpg",
            category: "Non Coffee",
            price: 34000,
          },
          {
            id: 6,
            name: "Butter Croissant",
            image_url: "/images/homepage/hero.jpg",
            category: "Others",
            price: 20000,
          },
          {
            id: 7,
            name: "Espresso",
            image_url: "/images/homepage/menu-cold-brew.jpg",
            category: "Coffee",
            price: 20000,
          },
          {
            id: 8,
            name: "Almond Tart",
            image_url: "/images/homepage/hero.jpg",
            category: "Others",
            price: 28000,
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

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" ||
      p.category?.toLowerCase() === activeCategory.toLowerCase();

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      p.name?.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="bg-surface py-xl px-margin-desktop w-full min-h-[600px] z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-lg">
        {/* Header & Search */}
        <div className="flex flex-col gap-6 pt-8 pb-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-on-surface">
            Let&apos;s get started with{" "}
            <span className="text-primary italic">coffee</span>
          </h1>
          <div className="relative  w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for coffee, treats, or anything..."
              className="w-full pl-12 pr-6 py-4 rounded-full bg-surface-container border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md py-4 -mx-margin-desktop px-margin-desktop md:mx-0 md:px-0">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start shrink-0 px-6 py-2.5 rounded-full font-label-lg transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-on-surface text-surface border-on-surface shadow-md"
                    : "bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-variant hover:border-outline-variant/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
            {filteredProducts.map((product) => (
              <Link
                href={`/menu/${product.id}`}
                key={product.id}
                className="bg-surface-container-highest rounded-[2rem] p-4 shadow-sm hover:shadow-xl border border-outline-variant/30 flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden relative bg-surface-container">
                  <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm px-4 py-1.5 rounded-full z-10 shadow-sm border border-outline-variant/10">
                    {product.category || "General"}
                  </div>
                  <Image
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={product.image_url || "/images/homepage/menu-latte.jpg"}
                    onError={(e) => {
                      e.currentTarget.srcset = "";
                      e.currentTarget.src = "/images/homepage/menu-latte.jpg";
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-grow px-2">
                  <h3 className="font-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-body-md text-on-surface-variant flex-grow line-clamp-2 mt-1">
                    {product.description ||
                      `Enjoy our delicious ${product.name}, crafted to perfection with the finest ingredients.`}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-4 px-2 border-t border-outline-variant/30">
                  <span className="font-headline-md text-on-surface">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookProduct(product);
                    }}
                    className="w-12 h-12 rounded-full bg-surface text-on-surface border border-outline-variant/50 flex justify-center items-center group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-surface-container-low rounded-3xl border border-outline-variant/30 mt-4">
            <div className="w-24 h-24 mb-6 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" x2="6" y1="2" y2="4" />
                <line x1="10" x2="10" y1="2" y2="4" />
                <line x1="14" x2="14" y1="2" y2="4" />
              </svg>
            </div>
            <h3 className="font-headline-md text-on-surface mb-2">
              No products found
            </h3>
            <p className="font-body-md text-on-surface-variant text-center ">
              We couldn&apos;t find any products in the &quot;{activeCategory}
              &quot; category. Try selecting another category.
            </p>
            <Button
              onClick={() => setActiveCategory("All")}
              className="mt-6 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-full px-8"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
