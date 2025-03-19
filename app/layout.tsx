import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { Bangers, Inter, Roboto } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import "../app/global.css";

const bangers = Bangers({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],   
})
/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "The Webbshop",
  description: "Your favorite products online at a great price...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
