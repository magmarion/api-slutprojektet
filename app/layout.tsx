import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import "../app/global.css";

import { Bangers, Inter, Roboto } from "next/font/google";

const bangers = Bangers({ weight: ["400"], subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

// Describe your site for SEO
export const metadata: Metadata = {
  title: "The Webbshop",
  description: "Your favorite products online at a great price...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${roboto.className}`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
