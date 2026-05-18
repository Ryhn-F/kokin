"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Minus,
  Plus,
  ChevronDown,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import axios from "axios";

export default function ProductDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [showToast, setShowToast] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        if (response.data && response.data.data) {
          setProduct(response.data.data);
        } else if (response.data) {
          setProduct(response.data);
        }

        // Fetch recommendations
        const allRes = await axios.get(`http://localhost:3000/product`);
        let allProducts = [];
        if (Array.isArray(allRes.data)) allProducts = allRes.data;
        else if (allRes.data && Array.isArray(allRes.data.data))
          allProducts = allRes.data.data;
        else if (allRes.data && Array.isArray(allRes.data.products))
          allProducts = allRes.data.products;

        setRecommendedProducts(
          allProducts.filter((p) => String(p.id) !== String(id)).slice(0, 4),
        );
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleOrderNow = () => {
    handleAddToCart();
    // Simulate routing to checkout
    // router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-margin-desktop py-12 md:py-24 flex flex-col md:flex-row gap-12 animate-pulse min-h-[70vh]">
        <div className="w-full md:w-1/2 aspect-square bg-surface-variant/30 rounded-[3rem]"></div>
        <div className="w-full md:w-1/2 flex flex-col gap-6 pt-8">
          <div className="h-6 w-1/3 bg-surface-variant/30 rounded-full"></div>
          <div className="h-16 w-3/4 bg-surface-variant/30 rounded-lg"></div>
          <div className="h-10 w-1/4 bg-surface-variant/30 rounded-full"></div>
          <div className="h-32 w-full bg-surface-variant/30 rounded-2xl"></div>
          <div className="h-16 w-1/2 bg-surface-variant/30 rounded-full mt-4"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto w-full px-margin-desktop py-32 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <div className="w-24 h-24 bg-surface-variant rounded-full flex items-center justify-center text-on-surface-variant mb-6 shadow-sm">
          <ShoppingBag size={40} />
        </div>
        <h2 className="font-display text-4xl text-on-surface mb-4">
          Product Not Found
        </h2>
        <p className="font-body-lg text-on-surface-variant mb-10 max-w-md leading-relaxed">
          We couldn&apos;t find the product you&apos;re looking for. It may have
          been removed or the link might be incorrect.
        </p>
        <Button
          onClick={() => router.push("/menu")}
          className="bg-primary text-on-primary font-label-lg rounded-full px-8 py-6 shadow-md hover:-translate-y-1 transition-all"
        >
          <ArrowLeft className="mr-2" /> Back to Menu
        </Button>
      </div>
    );
  }

  const toggleAccordion = (panel) => {
    setActiveAccordion(activeAccordion === panel ? null : panel);
  };

  return (
    <>
      {/* Toast Notification */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-surface px-6 py-4 rounded-full shadow-2xl border border-outline-variant/10 flex items-center gap-3 transition-all duration-500 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}`}
      >
        <CheckCircle2 size={20} className="text-primary" />
        <span className="font-label-lg">Added {quantity} item(s) to cart!</span>
      </div>

      <div className="w-full bg-surface pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-margin-desktop py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-label-md text-on-surface-variant mb-8 md:mb-16 overflow-x-auto whitespace-nowrap pb-2 [&::-webkit-scrollbar]:hidden">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <Link href="/menu" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <Link
              href={`/menu?category=${product.category}`}
              className="hover:text-primary transition-colors"
            >
              {product.category || "Beverage"}
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-on-surface font-label-lg">
              {product.name}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            {/* Left side: Image Gallery */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div className="relative w-full aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-surface-container-highest shadow-sm border border-outline-variant/30 group">
                <div className="absolute top-8 left-8 bg-surface/90 backdrop-blur-md text-on-surface font-label-md px-5 py-2.5 rounded-full z-10 shadow-sm border border-outline-variant/20 transition-transform duration-300 group-hover:scale-105">
                  {product.category || "General"}
                </div>
                <Image
                  src={product.image_url || "/images/homepage/menu-latte.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  onError={(e) => {
                    e.currentTarget.srcset = "";
                    e.currentTarget.src = "/images/homepage/menu-latte.jpg";
                  }}
                  priority
                />
              </div>
            </div>

            {/* Right side: Product Info */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="sticky top-32">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-label-lg text-primary uppercase tracking-widest">
                    {product.category || "Coffee"}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  <span className="font-label-md text-on-surface-variant">
                    Freshly Brewed
                  </span>
                </div>

                <h1 className="font-display text-4xl lg:text-6xl text-on-surface mb-6 leading-[1.1]">
                  {product.name}
                </h1>

                <div className="font-headline-lg text-3xl lg:text-4xl text-on-surface mb-8">
                  {formatPrice(product.price)}
                </div>

                <p className="font-body-lg text-on-surface-variant text-lg leading-relaxed mb-10 ">
                  {product.description ||
                    "A perfect balance of our house-blend espresso and velvety steamed milk, topped with a delicate layer of micro-foam and a hint of vanilla."}
                </p>

                <div className="flex items-center gap-6 mb-10">
                  <span className="font-label-lg text-on-surface">
                    Quantity
                  </span>
                  <div className="flex items-center bg-surface-container rounded-full p-1.5 border border-outline-variant/40 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface hover:text-on-surface hover:shadow-sm transition-all"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-14 text-center font-label-lg text-on-surface text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock || 99, quantity + 1))
                      }
                      className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface hover:text-on-surface hover:shadow-sm transition-all"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {product.stock && (
                    <span className="font-label-sm text-primary bg-primary-container px-3 py-1 rounded-full">
                      {product.stock} in stock
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                  <Button
                    onClick={handleOrderNow}
                    className="flex-1 bg-primary text-on-primary text-lg font-label-lg py-8 rounded-[2rem] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Order Now
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="flex-1 bg-transparent border-2 border-on-surface text-on-surface text-lg font-label-lg py-8 rounded-[2rem] hover:bg-on-surface hover:text-surface transition-colors duration-300"
                  >
                    <ShoppingBag className="mr-3" size={22} /> Add to Cart
                  </Button>
                </div>

                {/* Accordion Product Information */}
                <div className="flex flex-col border-t border-outline-variant/30">
                  <div className="border-b border-outline-variant/30">
                    <button
                      onClick={() => toggleAccordion("description")}
                      className="w-full flex justify-between items-center py-7 focus:outline-none group"
                    >
                      <span className="font-headline-sm text-lg text-on-surface group-hover:text-primary transition-colors">
                        Description
                      </span>
                      <ChevronDown
                        size={22}
                        className={`text-on-surface-variant transition-transform duration-300 ${activeAccordion === "description" ? "rotate-180 text-primary" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === "description" ? "max-h-96 opacity-100 pb-7" : "max-h-0 opacity-0"}`}
                    >
                      <p className="font-body-lg text-on-surface-variant leading-relaxed">
                        {product.description ||
                          "Our signature blend features beans carefully sourced from local farmers. The precise roasting profile highlights the natural sweetness and balanced acidity, resulting in a cup that is both complex and comforting."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="w-full bg-surface-container-low py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-margin-desktop">
            <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {recommendedProducts.map((recProduct) => (
                <Link
                  href={`/menu/${recProduct.id}`}
                  key={recProduct.id}
                  className="bg-surface-container-highest rounded-[2rem] p-5 shadow-sm hover:shadow-xl border border-outline-variant/30 flex flex-col gap-5 group hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden relative bg-surface-container">
                    <Image
                      alt={recProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src={
                        recProduct.image_url ||
                        "/images/homepage/menu-latte.jpg"
                      }
                      onError={(e) => {
                        e.currentTarget.srcset = "";
                        e.currentTarget.src = "/images/homepage/menu-latte.jpg";
                      }}
                    />
                  </div>
                  <div className="flex flex-col px-2 flex-grow">
                    <h3 className="font-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors duration-300 mb-1">
                      {recProduct.name}
                    </h3>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/30">
                      <span className="font-headline-sm text-on-surface">
                        {formatPrice(recProduct.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart();
                        }}
                        className="w-12 h-12 rounded-full bg-surface text-on-surface border border-outline-variant/50 flex justify-center items-center group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all duration-300 shadow-sm"
                      >
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 p-5 pb-8 flex items-center justify-between z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">
            Total Price
          </span>
          <span className="font-headline-lg text-on-surface text-2xl">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
        <Button
          onClick={handleOrderNow}
          className="bg-primary text-on-primary font-label-lg px-8 py-7 rounded-full shadow-lg"
        >
          Order Now
        </Button>
      </div>
    </>
  );
}
