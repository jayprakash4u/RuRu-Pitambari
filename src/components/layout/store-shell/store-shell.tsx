"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { CartProvider } from "@/features/cart";
import { MobileBottomNav } from "../mobile-bottom-nav";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";

type StoreShellProps = {
  children: ReactNode;
};

export function StoreShell({ children }: StoreShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
    </CartProvider>
  );
}
