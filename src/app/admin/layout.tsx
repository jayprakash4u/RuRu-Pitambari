import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminProvider } from "@/features/admin";

export const metadata: Metadata = {
  title: "Admin Portal | Ruru Pitambari",
  description: "Operations and store administration for Ruru Pitambari.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
