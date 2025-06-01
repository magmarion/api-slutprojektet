import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UnderHeader from "@/components/UnderHeader";
import { Toaster } from "@/components/ui/sonner";
import { Nunito, Dancing_Script, Great_Vibes } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import "../app/global.css";
import QueryProvider from "./QueryProvider";


const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloom",
  description: "Your favorite flowers online at a great price...",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${nunito.className}`}>
        <QueryProvider >
          <Header />
          <UnderHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
