"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r-0 bg-[#1E3023] text-white">
      <SidebarHeader className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E3023] font-bold text-xl">
            K
          </div>
          <span className="font-semibold text-xl tracking-wide">Kokin</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} className="h-12 px-4 rounded-2xl hover:bg-white/10 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-colors text-white/70">
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <LayoutDashboard size={20} className="opacity-80" />
                    <span className="font-medium text-base">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/products"} className="h-12 px-4 rounded-2xl hover:bg-white/10 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-colors text-white/70">
                  <Link href="/products" className="flex items-center gap-3">
                    <Package size={20} className="opacity-80" />
                    <span className="font-medium text-base">Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/orders"} className="h-12 px-4 rounded-2xl hover:bg-white/10 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-colors text-white/70">
                  <Link href="/orders" className="flex items-center gap-3">
                    <ShoppingCart size={20} className="opacity-80" />
                    <span className="font-medium text-base">Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"} className="h-12 px-4 rounded-2xl hover:bg-white/10 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-colors text-white/70">
                  <Link href="#" className="flex items-center gap-3">
                    <Settings size={20} className="opacity-80" />
                    <span className="font-medium text-base">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 px-4 hover:bg-transparent hover:text-white text-white/70 transition-colors">
              <Link href="#" className="flex items-center gap-3">
                <HelpCircle size={20} />
                <span className="text-sm">Help & Centre</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 px-4 hover:bg-transparent hover:text-white text-white/70 transition-colors">
              <Link href="/login" className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
