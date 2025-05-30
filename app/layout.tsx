import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Raleway, Dancing_Script } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import "../app/global.css";
import { SessionProvider } from "next-auth/react"; // ✅ Add SessionProvider

const raleway = Raleway({
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
  title: "The Webbshop",
  description: "Your favorite products online at a great price...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${raleway.className}`}>
        <SessionProvider> {/* ✅ Wrap in SessionProvider */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
