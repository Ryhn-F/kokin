"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Coffee,
  LayoutDashboard,
  Package,
  Armchair,
  ShoppingBag,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Set axios interceptor
    const requestInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          router.push("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  const navItems = [
    { name: "Products", href: "/products", icon: Package },
    { name: "Seats", href: "/seats", icon: Armchair },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
  ];

  return (
    <div className="flex h-screen w-full bg-surface-container font-body-md overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-outline-variant/30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <Coffee size={24} />
            </div>
            <span className="font-display text-2xl text-on-surface tracking-wide">
              Kokin
            </span>
          </div>
          <button
            className="lg:hidden text-on-surface-variant"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary"}`}
              >
                <Icon
                  size={22}
                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                />
                <span className="font-label-lg">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-outline-variant/30 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-600 hover:bg-red-50 transition-colors font-label-lg"
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        <header className="h-24 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-on-surface-variant p-2 rounded-xl hover:bg-surface-variant transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="font-display text-2xl text-on-surface hidden md:block">
              {navItems.find((item) => pathname.startsWith(item.href))?.name ||
                "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
              <div className="hidden lg:flex flex-col">
                <span className="font-label-lg text-on-surface leading-tight">
                  Admin User
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 bg-surface-container relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto w-full relative z-10 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
