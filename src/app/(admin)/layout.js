import "../globals.css";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin Dashboard | Kokin Coffee",
  description: "Premium admin dashboard for Kokin Coffee.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased bg-surface text-on-surface">
      <body className="h-full overflow-hidden flex w-full">
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </body>
    </html>
  );
}
