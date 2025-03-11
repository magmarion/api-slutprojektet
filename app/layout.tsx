import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import "../app/global.css";
const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "The Webbshop",
  description: "Your favorite products online at a great price...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
