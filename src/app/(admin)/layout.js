import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Search, Bell } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel",
};

export default function AdminLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-[#F4F1ED] text-gray-800 flex overflow-hidden">
        <SidebarProvider>
          <AdminSidebar />

          {/* Main Content */}
          <main className="flex-1 flex flex-col h-full w-full overflow-hidden">
            {/* Header */}
            <header className="h-24 px-6 md:px-10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4 w-full max-w-md">
                <SidebarTrigger className="text-gray-500 hover:text-gray-700" />
                <div className="relative w-full">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#1E3023]/20 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
                  <Bell size={24} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="font-semibold text-sm">
                      Cameron Williamson
                    </div>
                    <div className="text-xs text-gray-400">Admin</div>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
