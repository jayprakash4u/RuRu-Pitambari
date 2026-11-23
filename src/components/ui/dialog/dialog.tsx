"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type DialogProps = Omit<HTMLAttributes<HTMLDialogElement>, "onClose" | "title"> & {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title: ReactNode;
};

export function Dialog({ children, className, onClose, open, title, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      className={classNames("dialog", className)}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      ref={ref}
      {...props}
    >
      <div className="dialog__header">
        <h2 className="dialog__title">{title}</h2>
        <button aria-label="Close dialog" className="dialog__close" onClick={onClose} type="button">
          ×
        </button>
      </div>
      <div className="dialog__content">{children}</div>
    </dialog>
  );
}
