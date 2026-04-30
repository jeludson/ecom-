"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopPromoBar from "@/components/TopPromoBar";
import Providers from "@/components/Providers";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    return (
      <Providers>
        <main className="flex-grow">{children}</main>
      </Providers>
    );
  }

  return (
    <Providers>
      <TopPromoBar />
      <Navbar />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </Providers>
  );
}
