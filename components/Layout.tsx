import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}
