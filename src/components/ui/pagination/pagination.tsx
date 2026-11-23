import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

export function Pagination({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Pagination" className={classNames("pagination", className)} {...props} />;
}
export function PaginationList({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={classNames("pagination__list", className)} {...props} />;
}
export type PaginationLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean };
export function PaginationLink({ active = false, className, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={classNames("pagination__link", active && "pagination__link--active", className)}
      {...props}
    />
  );
}
