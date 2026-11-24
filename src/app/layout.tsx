import type { Metadata } from "next";
import type { ReactNode } from "react";

import { StoreShell } from "@/components/layout";
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
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
