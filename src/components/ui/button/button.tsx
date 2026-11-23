import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

type ButtonVariant = "primary" | "secondary" | "brand" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "button",
        `button--${variant}`,
        size !== "md" && `button--${size}`,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
