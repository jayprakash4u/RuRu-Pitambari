"use client";

import type { ReactNode } from "react";
import { Dialog } from "@/components/ui/dialog";

export type DrawerProps = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  side?: "left" | "right";
  title: ReactNode;
};
export function Drawer({ children, onClose, open, side = "right", title }: DrawerProps) {
  return (
    <Dialog className={`drawer drawer--${side}`} onClose={onClose} open={open} title={title}>
      {children}
    </Dialog>
  );
}
