import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UnderHeader from "@/components/UnderHeader";
import { Toaster } from "@/components/ui/sonner";
import { Raleway, Dancing_Script } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import "../app/global.css";

const raleway = Raleway({
  weight: ["400", "700"],  // Specify available weights
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],  // Specify available weights
  subsets: ["latin"],
  display: "swap",
});

/* Metadata for SEO */
export const metadata: Metadata = {
  title: "Bloom Webbshop",
  description: "Dina favoritprodukter online till fantastiska priser...",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="sv">
      <body className={`flex flex-col min-h-screen ${raleway.className}`}>
        <Header />
        <UnderHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
