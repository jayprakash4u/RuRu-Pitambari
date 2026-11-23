import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/layout";
import { CartProvider } from "@/features/cart";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "Ruru Pitambari",
    template: "%s | Ruru Pitambari",
  },
  description: "Traditional care for modern Nepali homes.",
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
