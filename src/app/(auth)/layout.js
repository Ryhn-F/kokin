import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Login | Kokin Coffee",
  description: "Secure login for Kokin Coffee administrative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full w-full bg-[#F4F1ED] flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
