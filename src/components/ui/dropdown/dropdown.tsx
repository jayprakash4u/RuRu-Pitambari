import type { ButtonHTMLAttributes, DetailsHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type DropdownProps = DetailsHTMLAttributes<HTMLDetailsElement> & { trigger: ReactNode };
export function Dropdown({ children, className, trigger, ...props }: DropdownProps) {
  return (
    <details className={classNames("dropdown", className)} {...props}>
      <summary className="dropdown__trigger">{trigger}</summary>
      <div className="dropdown__content">{children}</div>
    </details>
  );
}
export function DropdownItem({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames("dropdown__item", className)}
      role="menuitem"
      type={type}
      {...props}
    />
  );
}
