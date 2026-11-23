import type { SelectHTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select className={classNames("input select", className)} {...props}>
      {children}
    </select>
  );
}
