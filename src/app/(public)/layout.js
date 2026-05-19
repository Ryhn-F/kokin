import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import TopNavBar from "@/components/homepage/TopNavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Kokin Coffee",
    default: "Kokin Coffee | Premium Coffee & Ambiance",
  },
  description: "Kokin Coffee offers premium crafted drinks, authentic local beans, and a warm, inviting atmosphere. Experience the best coffee and community.",
  keywords: ["coffee", "cafe", "Kokin", "premium coffee", "coffee shop", "espresso", "local cafe"],
  authors: [{ name: "Kokin Coffee" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kokincoffee.com",
    siteName: "Kokin Coffee",
    title: "Kokin Coffee | Premium Coffee & Ambiance",
    description: "Experience premium crafted drinks and authentic local beans at Kokin Coffee.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kokin Coffee Barista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kokin Coffee | Premium Coffee & Ambiance",
    description: "Experience premium crafted drinks and authentic local beans at Kokin Coffee.",
    images: ["https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
