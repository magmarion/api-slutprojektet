"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-slate-800 text-2xl">Det här är startsidan. Här ska alla produkterna visas.</p>
      <Button>Visa produkter</Button>
    </main>
  );
}
