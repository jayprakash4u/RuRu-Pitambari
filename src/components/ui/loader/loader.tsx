import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

export type LoaderProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  size?: "sm" | "md" | "lg";
};
export function Loader({ className, label = "Loading", size = "md", ...props }: LoaderProps) {
  return (
    <span
      aria-label={label}
      className={classNames("loader", `loader--${size}`, className)}
      role="status"
      {...props}
    />
  );
}
